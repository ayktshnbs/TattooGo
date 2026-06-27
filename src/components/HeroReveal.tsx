import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import portraitTopUrl from '../assets/hero/clean.png';
import portraitBottomUrl from '../assets/hero/tattooed.png';
import { vertexShader, fluidFragmentShader, displayFragmentShader } from './heroShaders';

/**
 * Hero — full-viewport WebGL fluid-trail reveal.
 *
 * Architecture matches the project's hero specification verbatim:
 *   - Three.js WebGLRenderer + OrthographicCamera + full-screen quad.
 *   - Two ping-pong WebGLRenderTargets (simSize × simSize, Float RGBA)
 *     hold the trail mask. Each frame we read from the previous target
 *     and write to the next.
 *   - fluidFragmentShader paints a soft line between prevMouse and mouse
 *     into the mask, with a 0.97 decay multiplier on the prior frame.
 *   - displayFragmentShader composites top + bottom + halo on screen.
 *   - When the user is idle (> idleThresholdMs), a synthetic cursor
 *     drifts on layered incommensurate sines and is written into the
 *     same uniforms the real cursor uses.
 *
 * Wrapping the vanilla three logic in a React component lets the rest
 * of the marketplace stay React-based; the inside of the effect is
 * framework-agnostic.
 */
const CONFIG = {
  // Simulation render-target size (square, ping-pong)
  simSize: 500,
  // Trail mask falloff
  decay: 0.97,
  lineWidth: 0.09,
  perFrameIntensity: 0.3,
  // Reveal threshold (display shader)
  revealThreshold: 0.02,
  edgeWidthBase: 0.004, // divided by uDpr in shader
  // Soft gray halo overlay (display shader)
  haloUpperMul: 2.0, // halo upper bound = revealThreshold * this
  haloMixStrength: 0.35,
  haloGray: [0.12, 0.12, 0.12] as [number, number, number],
  // Idle auto-trail
  idleThresholdMs: 2500,
  idleEaseInMs: 1500,
  autoLerp: 0.05,
  // Mouse stop detection
  stopAfterMs: 50,
  // Max texture size — downscale source images larger than this
  maxTextureSize: 4096,
};

export function HeroReveal() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current!;
    const canvas = canvasRef.current!;

    /* ----- renderer + scene ----- */
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, precision: 'highp' });
    renderer.setSize(wrap.clientWidth, wrap.clientHeight, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    const scene = new THREE.Scene();
    const simScene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    /* ----- ping-pong render targets ----- */
    const pingPongOpts: THREE.RenderTargetOptions = {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
      type: THREE.FloatType,
    };
    const pingPong: [THREE.WebGLRenderTarget, THREE.WebGLRenderTarget] = [
      new THREE.WebGLRenderTarget(CONFIG.simSize, CONFIG.simSize, pingPongOpts),
      new THREE.WebGLRenderTarget(CONFIG.simSize, CONFIG.simSize, pingPongOpts),
    ];
    // Clear both once at startup so we don't sample undefined memory on the first frame.
    pingPong.forEach((t) => {
      renderer.setRenderTarget(t);
      renderer.clear();
    });
    renderer.setRenderTarget(null);
    let currentTarget = 0;

    /* ----- mouse state ----- */
    const mouse = new THREE.Vector2(0.5, 0.5);
    const prevMouse = new THREE.Vector2(0.5, 0.5);
    let isMoving = false;
    let lastMoveTime = 0;

    const autoMouse = new THREE.Vector2(0.5, 0.5);
    const prevAutoMouse = new THREE.Vector2(0.5, 0.5);

    /* ----- placeholder textures (used until images decode) ----- */
    function solidTexture(hex: string): THREE.CanvasTexture {
      const c = document.createElement('canvas');
      c.width = c.height = 2;
      const ctx = c.getContext('2d')!;
      ctx.fillStyle = hex;
      ctx.fillRect(0, 0, 2, 2);
      const tex = new THREE.CanvasTexture(c);
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.generateMipmaps = false;
      return tex;
    }
    const topTexture = solidTexture('#0000ff');
    const bottomTexture = solidTexture('#ff0000');
    const topTextureSize = new THREE.Vector2(0, 0);
    const bottomTextureSize = new THREE.Vector2(0, 0);

    /* ----- shader materials ----- */
    const dpr = renderer.getPixelRatio();
    const resolutionVec = new THREE.Vector2(wrap.clientWidth * dpr, wrap.clientHeight * dpr);

    const trailsMaterial = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader: fluidFragmentShader,
      uniforms: {
        uPrevTrails: { value: pingPong[currentTarget].texture },
        uMouse: { value: mouse.clone() },
        uPrevMouse: { value: prevMouse.clone() },
        uResolution: { value: resolutionVec.clone() },
        uDecay: { value: CONFIG.decay },
        uIsMoving: { value: false },
      },
    });

    const displayMaterial = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader: displayFragmentShader,
      uniforms: {
        uFluid: { value: pingPong[currentTarget].texture },
        uTopTexture: { value: topTexture },
        uBottomTexture: { value: bottomTexture },
        uResolution: { value: resolutionVec.clone() },
        uTopTextureSize: { value: topTextureSize },
        uBottomTextureSize: { value: bottomTextureSize },
        uDpr: { value: dpr },
      },
    });

    const planeGeo = new THREE.PlaneGeometry(2, 2);
    const simMesh = new THREE.Mesh(planeGeo, trailsMaterial);
    const displayMesh = new THREE.Mesh(planeGeo, displayMaterial);
    simScene.add(simMesh);
    scene.add(displayMesh);

    /* ----- image loading with maxTextureSize clamp ----- */
    function loadImageAsTexture(
      url: string,
      sizeVec: THREE.Vector2,
      onReady: (tex: THREE.CanvasTexture) => void,
    ) {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.onload = () => {
        let { naturalWidth: w, naturalHeight: h } = img;
        let drawW = w;
        let drawH = h;
        if (Math.max(w, h) > CONFIG.maxTextureSize) {
          const scale = CONFIG.maxTextureSize / Math.max(w, h);
          drawW = Math.round(w * scale);
          drawH = Math.round(h * scale);
        }
        const off = document.createElement('canvas');
        off.width = drawW;
        off.height = drawH;
        const ctx = off.getContext('2d')!;
        ctx.drawImage(img, 0, 0, drawW, drawH);
        const tex = new THREE.CanvasTexture(off);
        tex.minFilter = THREE.LinearFilter;
        tex.magFilter = THREE.LinearFilter;
        tex.generateMipmaps = false;
        tex.needsUpdate = true;
        sizeVec.set(drawW, drawH);
        onReady(tex);
        // eslint-disable-next-line no-console
        console.info(`[hero] loaded ${url} as ${drawW}×${drawH}`);
      };
      img.onerror = (e) => {
        // eslint-disable-next-line no-console
        console.warn(`[hero] failed to load ${url}`, e);
      };
      img.src = url;
    }

    // We deliberately drive both texture-size uniforms from the *clean*
    // image's natural dimensions so `getCoverUV` produces the same UV map
    // for both samplers. Since the woman is composed identically in both
    // source PNGs (face centered horizontally, face centre at ratio ~0.58
    // vertically, same crop), this makes the cursor reveal pixel-overlay
    // the tattooed face exactly where the clean face is — no horizontal
    // drift, no vertical drift, no scale difference. The actual tattooed
    // texture can be any size; the shader still samples it at the same
    // normalised UV as the clean texture.
    loadImageAsTexture(portraitTopUrl, topTextureSize, (tex) => {
      displayMaterial.uniforms.uTopTexture.value = tex;
      // Lock the bottom's reference size to the top so the two share a UV map.
      bottomTextureSize.copy(topTextureSize);
    });
    loadImageAsTexture(portraitBottomUrl, new THREE.Vector2(), (tex) => {
      displayMaterial.uniforms.uBottomTexture.value = tex;
      // Do NOT update bottomTextureSize here — it mirrors topTextureSize.
    });

    /* ----- input ----- */
    function rectOf(): DOMRect {
      return canvas.getBoundingClientRect();
    }
    function setMouseFromClient(cx: number, cy: number) {
      const r = rectOf();
      // Coords in [0,1], y flipped to GL convention.
      const x = (cx - r.left) / r.width;
      const y = 1 - (cy - r.top) / r.height;
      prevMouse.copy(mouse);
      mouse.set(x, y);
      isMoving = true;
      lastMoveTime = performance.now();
    }
    function pointerInsideRect(cx: number, cy: number): boolean {
      const r = rectOf();
      return cx >= r.left && cx <= r.right && cy >= r.top && cy <= r.bottom;
    }

    function onMouseMove(e: MouseEvent) {
      if (pointerInsideRect(e.clientX, e.clientY)) {
        setMouseFromClient(e.clientX, e.clientY);
      } else {
        isMoving = false;
      }
    }
    function onTouchMove(e: TouchEvent) {
      if (e.touches.length === 0) return;
      const t = e.touches[0];
      if (pointerInsideRect(t.clientX, t.clientY)) {
        e.preventDefault();
        setMouseFromClient(t.clientX, t.clientY);
      } else {
        isMoving = false;
      }
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });

    /* ----- resize ----- */
    function resize() {
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      if (w === 0 || h === 0) return;
      const newDpr = Math.min(window.devicePixelRatio || 1, 2);
      renderer.setPixelRatio(newDpr);
      renderer.setSize(w, h, false);
      displayMaterial.uniforms.uResolution.value.set(w * newDpr, h * newDpr);
      displayMaterial.uniforms.uDpr.value = newDpr;
      trailsMaterial.uniforms.uResolution.value.set(w * newDpr, h * newDpr);
    }
    const ro = new ResizeObserver(() => resize());
    ro.observe(wrap);
    window.addEventListener('resize', resize);
    resize();

    /* ----- render loop ----- */
    let raf = 0;
    function animate() {
      raf = requestAnimationFrame(animate);
      const now = performance.now();

      // Drop isMoving if no movement for stopAfterMs.
      if (isMoving && now - lastMoveTime > CONFIG.stopAfterMs) {
        isMoving = false;
      }
      const idleTime = now - lastMoveTime;
      const autoActive = idleTime > CONFIG.idleThresholdMs;

      // Swap ping-pong
      const prevTarget = pingPong[currentTarget];
      currentTarget = (currentTarget + 1) % 2;
      const writeTarget = pingPong[currentTarget];
      trailsMaterial.uniforms.uPrevTrails.value = prevTarget.texture;

      if (autoActive) {
        // Idle auto-trail — layered incommensurate sines for an organic
        // never-repeating path that stays inside the canvas. Easing in
        // over idleEaseInMs prevents a sudden segment on first wake.
        const easeIn = Math.min(1, (idleTime - CONFIG.idleThresholdMs) / CONFIG.idleEaseInMs);
        const t = now * 0.001;
        const targetX = 0.5 + 0.30 * Math.sin(t * 0.41) + 0.12 * Math.sin(t * 0.93 + 1.3);
        const targetY = 0.5 + 0.28 * Math.cos(t * 0.37 + 0.5) + 0.10 * Math.cos(t * 1.11 + 2.7);
        prevAutoMouse.copy(autoMouse);
        autoMouse.x += (targetX - autoMouse.x) * CONFIG.autoLerp * easeIn;
        autoMouse.y += (targetY - autoMouse.y) * CONFIG.autoLerp * easeIn;
        trailsMaterial.uniforms.uMouse.value.copy(autoMouse);
        trailsMaterial.uniforms.uPrevMouse.value.copy(prevAutoMouse);
        trailsMaterial.uniforms.uIsMoving.value = true;
        // Mirror onto mouse/prevMouse so the handoff to a real input
        // doesn't draw a long stale segment.
        mouse.copy(autoMouse);
        prevMouse.copy(prevAutoMouse);
      } else {
        trailsMaterial.uniforms.uMouse.value.copy(mouse);
        trailsMaterial.uniforms.uPrevMouse.value.copy(prevMouse);
        trailsMaterial.uniforms.uIsMoving.value = isMoving;
        // Mirror so the next idle cycle starts from the user's last position.
        autoMouse.copy(mouse);
        prevAutoMouse.copy(mouse);
      }

      renderer.setRenderTarget(writeTarget);
      renderer.render(simScene, camera);

      displayMaterial.uniforms.uFluid.value = writeTarget.texture;
      renderer.setRenderTarget(null);
      renderer.render(scene, camera);
    }
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('resize', resize);
      ro.disconnect();
      pingPong.forEach((t) => t.dispose());
      planeGeo.dispose();
      trailsMaterial.dispose();
      displayMaterial.dispose();
      topTexture.dispose();
      bottomTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={wrapRef} style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: '#F1F1F1' }}>
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block', cursor: 'crosshair' }}
      />
    </div>
  );
}
