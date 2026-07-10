import { useEffect, useRef } from 'react';

/**
 * Cinematic deep-space hero background.
 *
 * Deliberately Canvas 2D, not WebGL: it renders identically on every device
 * (no float-texture / GPU-extension pitfalls) and is cheap enough to run at
 * 60fps on phones. Two layers:
 *
 *  1. NEBULA (offscreen, pre-rendered once per resize, one drawImage/frame):
 *     restrained indigo/violet depth, a faint diagonal galactic band, baked
 *     far-stars, plus a center darkening + edge vignette so the wordmark,
 *     tagline and CTAs always sit on near-black — atmosphere never wins
 *     over readability.
 *  2. STARS (animated): slow parallax drift and twinkle, with a handful of
 *     brighter "hero" stars that carry a soft diffraction cross.
 *
 * Honours reduced-motion by drawing a single static frame.
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
      hero: boolean;  // bright star with a soft diffraction cross
    }
    let stars: Star[] = [];

    // Pre-rendered nebula/background layer — repainted only on resize.
    const nebula = document.createElement('canvas');
    const nctx = nebula.getContext('2d')!;

    /** One soft cloud: a large radial gradient fading to transparent. */
    function cloud(cx: number, cy: number, radius: number, rgb: string, alpha: number) {
      const g = nctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
      g.addColorStop(0, `rgba(${rgb},${alpha})`);
      g.addColorStop(0.55, `rgba(${rgb},${alpha * 0.38})`);
      g.addColorStop(1, `rgba(${rgb},0)`);
      nctx.fillStyle = g;
      nctx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);
    }

    function paintNebula() {
      nebula.width = Math.round(w * dpr);
      nebula.height = Math.round(h * dpr);
      nctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Deep-space base — near-black with the faintest blue lift up top.
      const base = nctx.createLinearGradient(0, 0, 0, h);
      base.addColorStop(0, '#05060d');
      base.addColorStop(0.55, '#030308');
      base.addColorStop(1, '#000000');
      nctx.fillStyle = base;
      nctx.fillRect(0, 0, w, h);

      const m = Math.max(w, h);

      // Cosmic depth — desaturated indigo/violet masses kept away from the
      // center column, plus one whisper of warm ember echoing the paper tone.
      cloud(w * 0.16, h * 0.24, m * 0.52, '70,74,150', 0.20);   // indigo, upper left
      cloud(w * 0.86, h * 0.68, m * 0.55, '104,62,140', 0.15);  // violet, lower right
      cloud(w * 0.78, h * 0.14, m * 0.34, '48,86,132', 0.14);   // cold blue, upper right
      cloud(w * 0.30, h * 0.86, m * 0.36, '138,80,56', 0.09);   // warm ember, lower left

      // Diagonal galactic band — many faint overlapping blobs along one axis.
      const bandAngle = -0.42;
      const cos = Math.cos(bandAngle), sin = Math.sin(bandAngle);
      for (let i = 0; i < 60; i++) {
        const t = (i / 60 - 0.5) * m * 1.7;
        const spread = (Math.random() - 0.5) * m * 0.10;
        const cx = w * 0.5 + t * cos - spread * sin;
        const cy = h * 0.44 + t * sin + spread * cos;
        const r = m * (0.05 + Math.random() * 0.09);
        const tone = Math.random() < 0.7 ? '150,160,210' : '195,178,215';
        cloud(cx, cy, r, tone, 0.03 + Math.random() * 0.035);
      }

      // Baked far-field stars — a fine, static dusting behind the animated ones.
      const dustCount = Math.round((w * h) / 3400);
      for (let i = 0; i < dustCount; i++) {
        const a = 0.08 + Math.random() * 0.3;
        nctx.fillStyle = `rgba(220,228,255,${a.toFixed(3)})`;
        const r = Math.random() * 0.7 + 0.2;
        nctx.beginPath();
        nctx.arc(Math.random() * w, Math.random() * h, r, 0, Math.PI * 2);
        nctx.fill();
      }

      // Readability guard — darken the center column where the wordmark,
      // tagline and CTAs live, then vignette the edges for cinematic focus.
      const guard = nctx.createRadialGradient(w * 0.5, h * 0.5, 0, w * 0.5, h * 0.5, m * 0.42);
      guard.addColorStop(0, 'rgba(0,0,0,0.55)');
      guard.addColorStop(1, 'rgba(0,0,0,0)');
      nctx.fillStyle = guard;
      nctx.fillRect(0, 0, w, h);

      const vig = nctx.createRadialGradient(w * 0.5, h * 0.5, m * 0.38, w * 0.5, h * 0.5, m * 0.75);
      vig.addColorStop(0, 'rgba(0,0,0,0)');
      vig.addColorStop(1, 'rgba(0,0,0,0.5)');
      nctx.fillStyle = vig;
      nctx.fillRect(0, 0, w, h);
    }

    function build() {
      const count = Math.round((w * h) / 2900); // density scales with area
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
          hero: i % 90 === 0, // a rare bright accent, roughly a dozen on desktop
        });
      }
    }

    function resize() {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      paintNebula();
      build();
      draw(0, performance.now()); // paint immediately — no black flash before the first rAF
    }

    /** Soft 4-point diffraction cross for hero stars. */
    function heroGlow(x: number, y: number, alpha: number) {
      const len = 9;
      const g = ctx.createRadialGradient(x, y, 0, x, y, len);
      g.addColorStop(0, `rgba(235,240,255,${(alpha * 0.5).toFixed(3)})`);
      g.addColorStop(1, 'rgba(235,240,255,0)');
      ctx.fillStyle = g;
      ctx.fillRect(x - len, y - len, len * 2, len * 2);
      ctx.strokeStyle = `rgba(235,240,255,${(alpha * 0.55).toFixed(3)})`;
      ctx.lineWidth = 0.7;
      ctx.beginPath();
      ctx.moveTo(x - len, y); ctx.lineTo(x + len, y);
      ctx.moveTo(x, y - len); ctx.lineTo(x, y + len);
      ctx.stroke();
    }

    function draw(dt: number, now: number) {
      // Nebula layer with an imperceptibly slow drift — alive, never busy.
      const ox = reduced ? 0 : Math.sin(now * 0.00003) * 6;
      const oy = reduced ? 0 : Math.cos(now * 0.000022) * 4;
      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(nebula, ox - 8, oy - 8, w + 16, h + 16);

      for (const s of stars) {
        if (!reduced) {
          s.x += s.vx * dt * 0.06;
          s.y += s.vy * dt * 0.06;
          if (s.x > w + 2) s.x = -2;
          if (s.y > h + 2) s.y = -2;
          s.tw += s.twSpeed * dt * 0.001;
        }
        const twinkle = reduced ? 1 : 0.6 + 0.4 * Math.sin(s.tw);
        const alpha = s.a * twinkle;
        if (s.hero) heroGlow(s.x, s.y, alpha);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.hero ? s.r + 0.4 : s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${alpha.toFixed(3)})`;
        ctx.fill();
      }
    }

    let last = performance.now();
    function frame(now: number) {
      const dt = Math.min(50, now - last);
      last = now;
      draw(dt, now);
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
