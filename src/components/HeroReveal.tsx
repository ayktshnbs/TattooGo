import { useEffect, useRef } from 'react';
import portraitCleanUrl from '../assets/hero/portrait-clean.png';
import portraitTattooedUrl from '../assets/hero/portrait-tattooed.png';

/**
 * Editorial portrait reveal.
 *
 *   Layer A (top, default visible)  — clean portrait, no tattoo.
 *   Layer B (bottom, revealed)      — same woman, full face tattoo.
 *
 * A feathered cursor mask erases the top so the tattooed version reads
 * through. The mask decays (~1.4s) so the tattoo softly disappears when
 * the cursor moves away. Both desktop and touch inputs supported.
 *
 * Implementation: one visible canvas + three offscreen canvases (the two
 * portrait images and the live mask). Two drawImage calls per frame, no
 * per-pixel work — performant on mobile.
 *
 * The portrait dominates the centre; the surrounding canvas is filled
 * with the soft cream + flowing-line background so the image blends
 * with the page regardless of viewport size.
 */
export function HeroReveal() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const visibleRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current!;
    const visible = visibleRef.current!;
    const ctxV = visible.getContext('2d')!;

    const mask = document.createElement('canvas');
    const topCompose = document.createElement('canvas');
    const bgImg = document.createElement('canvas');
    const ctxMask = mask.getContext('2d')!;
    const ctxCompose = topCompose.getContext('2d')!;
    const ctxBg = bgImg.getContext('2d')!;

    const points: { x: number; y: number; t: number }[] = [];
    let touched = false;
    let raf = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0, H = 0;
    let ready = false;

    // Where the portrait sits inside the canvas (CSS pixels).
    let imgRect = { x: 0, y: 0, w: 0, h: 0 };

    const portraitClean = new Image();
    const portraitTattooed = new Image();
    portraitClean.crossOrigin = 'anonymous';
    portraitTattooed.crossOrigin = 'anonymous';

    let loaded = 0;
    const onLoad = () => { if (++loaded === 2) { ready = true; resize(); raf = requestAnimationFrame(frame); } };
    portraitClean.onload = onLoad;
    portraitTattooed.onload = onLoad;
    portraitClean.src = portraitCleanUrl;
    portraitTattooed.src = portraitTattooedUrl;

    function sizeCanvas(c: HTMLCanvasElement, w: number, h: number) {
      c.width = Math.floor(w * dpr);
      c.height = Math.floor(h * dpr);
    }

    function computeImgRect() {
      const aspect = portraitClean.naturalWidth / portraitClean.naturalHeight; // ~1.78 wide
      // We want the portrait to fill the visible area, biased so the face
      // sits in the upper-middle of the canvas (the bottom CTA band overlays
      // the lower portion of the canvas, so anchoring the face up keeps it
      // centred visually).
      let drawH = H;
      let drawW = drawH * aspect;
      if (drawW < W) {
        drawW = W;
        drawH = drawW / aspect;
      }
      // Bias the image slightly up so the face is centred above the CTA band.
      const x = (W - drawW) / 2;
      const y = -drawH * 0.04;
      imgRect = { x, y, w: drawW, h: drawH };
    }

    function paintBg() {
      const ctx = ctxBg;
      ctx.fillStyle = '#F1F1F1';
      ctx.fillRect(0, 0, W, H);
    }

    function resize() {
      const r = wrap.getBoundingClientRect();
      W = r.width; H = r.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      [visible, mask, topCompose, bgImg].forEach(c => sizeCanvas(c, W, H));
      visible.style.width = W + 'px';
      visible.style.height = H + 'px';
      [ctxV, ctxMask, ctxCompose, ctxBg].forEach(ctx => ctx.setTransform(dpr, 0, 0, dpr, 0, 0));
      paintBg();
      computeImgRect();
    }

    function drawMaskFromPoints(now: number) {
      // Fade existing mask alpha so trail decays smoothly.
      ctxMask.save();
      ctxMask.globalCompositeOperation = 'destination-in';
      ctxMask.fillStyle = 'rgba(0,0,0,0.93)';
      ctxMask.fillRect(0, 0, W, H);
      ctxMask.restore();

      for (let i = points.length - 1; i >= 0; i--) {
        const p = points[i];
        const age = now - p.t;
        if (age > 1400) { points.splice(i, 1); continue; }
        const a = 1 - age / 1400;
        const radius = 120 + (1 - a) * 60;
        const g = ctxMask.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius);
        g.addColorStop(0, `rgba(0,0,0,${0.95 * a})`);
        g.addColorStop(0.55, `rgba(0,0,0,${0.50 * a})`);
        g.addColorStop(1, 'rgba(0,0,0,0)');
        ctxMask.fillStyle = g;
        ctxMask.beginPath();
        ctxMask.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctxMask.fill();
      }
    }

    function frame() {
      if (!ready) { raf = requestAnimationFrame(frame); return; }
      const now = performance.now();
      drawMaskFromPoints(now);

      // Compose: clean portrait, then erase under the mask so the tattooed
      // version underneath bleeds through.
      ctxCompose.clearRect(0, 0, W, H);
      ctxCompose.drawImage(portraitClean, imgRect.x, imgRect.y, imgRect.w, imgRect.h);
      ctxCompose.save();
      ctxCompose.globalCompositeOperation = 'destination-out';
      ctxCompose.drawImage(mask, 0, 0, W, H);
      ctxCompose.restore();

      // Paint: bg, then tattooed portrait, then composed clean-with-cutout.
      ctxV.clearRect(0, 0, W, H);
      ctxV.drawImage(bgImg, 0, 0, W, H);
      ctxV.drawImage(portraitTattooed, imgRect.x, imgRect.y, imgRect.w, imgRect.h);
      ctxV.drawImage(topCompose, 0, 0, W, H);

      raf = requestAnimationFrame(frame);
    }

    function pushPoint(x: number, y: number) {
      const last = points[points.length - 1];
      const now = performance.now();
      if (last) {
        const dx = x - last.x, dy = y - last.y;
        const dist = Math.hypot(dx, dy);
        const steps = Math.min(10, Math.ceil(dist / 22));
        for (let s = 1; s <= steps; s++) {
          points.push({ x: last.x + (dx * s) / steps, y: last.y + (dy * s) / steps, t: now });
        }
      } else {
        points.push({ x, y, t: now });
      }
    }

    function onMove(e: MouseEvent | TouchEvent) {
      const r = wrap.getBoundingClientRect();
      const point = 'touches' in e ? e.touches[0] : e;
      if (!point) return;
      const x = point.clientX - r.left;
      const y = point.clientY - r.top;
      if (x < 0 || y < 0 || x > r.width || y > r.height) return;
      touched = true;
      pushPoint(x, y);
    }

    function onLeave() {
      // Stop adding points — the existing trail decays naturally and the
      // clean portrait returns. Touched flag persists so ambient drift
      // does not restart.
    }

    const onResize = () => resize();
    window.addEventListener('resize', onResize);
    wrap.addEventListener('mousemove', onMove);
    wrap.addEventListener('touchmove', onMove, { passive: true });
    wrap.addEventListener('mouseleave', onLeave);
    wrap.addEventListener('touchend', onLeave);

    // One-shot demo sweep on load — a single graceful arc across the face
    // hints at the interaction, then we stop. After this, the surface stays
    // clean until the cursor enters.
    let demoStart = 0;
    let demoDone = false;
    const driftId = window.setInterval(() => {
      if (touched || !ready || demoDone) return;
      if (!demoStart) demoStart = performance.now();
      const elapsed = performance.now() - demoStart;
      const dur = 1800;
      if (elapsed > dur + 400) { demoDone = true; return; }
      const t = Math.min(1, elapsed / dur);
      const ease = 1 - Math.pow(1 - t, 3); // easeOutCubic
      const cx = imgRect.x + imgRect.w * 0.5;
      const cy = imgRect.y + imgRect.h * 0.42;
      // Sweep left-to-right across the face with a gentle arc
      const span = imgRect.w * 0.30;
      const x = cx - span / 2 + ease * span;
      const y = cy - Math.sin(ease * Math.PI) * imgRect.h * 0.05;
      pushPoint(x, y);
    }, 32);

    // Kick off layout immediately so background paints before images decode.
    resize();

    return () => {
      cancelAnimationFrame(raf);
      window.clearInterval(driftId);
      window.removeEventListener('resize', onResize);
      wrap.removeEventListener('mousemove', onMove);
      wrap.removeEventListener('touchmove', onMove);
      wrap.removeEventListener('mouseleave', onLeave);
      wrap.removeEventListener('touchend', onLeave);
    };
  }, []);

  return (
    <div ref={wrapRef} style={{ position: 'absolute', inset: 0, overflow: 'hidden', cursor: 'crosshair', background: '#F1F1F1' }}>
      <canvas ref={visibleRef} style={{ position: 'absolute', inset: 0, display: 'block' }} />
    </div>
  );
}
