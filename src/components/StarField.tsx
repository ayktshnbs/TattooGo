import { useEffect, useRef } from 'react';

/**
 * Lightweight animated starfield for the hero.
 *
 * Deliberately Canvas 2D, not WebGL: it renders identically on every device
 * (no float-texture / GPU-extension pitfalls) and is cheap enough to run at
 * 60fps on phones. Stars drift slowly with a parallax feel and twinkle; the
 * whole thing sits on a deep-space radial gradient. Honours reduced-motion by
 * drawing a single static frame.
 */
export function StarField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let w = 0;
    let h = 0;
    let raf = 0;

    interface Star {
      x: number;
      y: number;
      r: number;      // radius
      a: number;      // base alpha
      tw: number;     // twinkle phase
      twSpeed: number;
      vx: number;     // drift (parallax: nearer stars move faster)
      vy: number;
    }
    let stars: Star[] = [];

    function build() {
      const count = Math.round((w * h) / 6200); // density scales with area
      stars = [];
      for (let i = 0; i < count; i++) {
        const depth = Math.random(); // 0 = near, 1 = far
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: (1 - depth) * 1.3 + 0.35,
          a: 0.35 + Math.random() * 0.65,
          tw: Math.random() * Math.PI * 2,
          twSpeed: 0.4 + Math.random() * 1.6,
          vx: 0.02 + (1 - depth) * 0.13,
          vy: 0.008 + (1 - depth) * 0.05,
        });
      }
    }

    function resize() {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
      if (reduced) draw(0); // static repaint on resize
    }

    function draw(dt: number) {
      // deep-space background, a touch lighter toward the upper-middle
      const g = ctx.createRadialGradient(w * 0.5, h * 0.42, 0, w * 0.5, h * 0.42, Math.max(w, h) * 0.78);
      g.addColorStop(0, '#0c0c14');
      g.addColorStop(0.5, '#070709');
      g.addColorStop(1, '#000000');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      for (const s of stars) {
        if (!reduced) {
          s.x += s.vx * dt * 0.06;
          s.y += s.vy * dt * 0.06;
          if (s.x > w + 2) s.x = -2;
          if (s.y > h + 2) s.y = -2;
          s.tw += s.twSpeed * dt * 0.001;
        }
        const twinkle = reduced ? 1 : 0.6 + 0.4 * Math.sin(s.tw);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${(s.a * twinkle).toFixed(3)})`;
        ctx.fill();
      }
    }

    let last = performance.now();
    function frame(now: number) {
      const dt = Math.min(50, now - last);
      last = now;
      draw(dt);
      raf = requestAnimationFrame(frame);
    }

    resize();
    if (!reduced) raf = requestAnimationFrame(frame);

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }}
    />
  );
}
