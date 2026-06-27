import { useEffect, useRef } from 'react';
import portraitCleanUrl from '../assets/hero/clean.png';
import portraitTattooedUrl from '../assets/hero/tattooed.png';  

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
    // Both source images are drawn into this same rect — they have the
    // same aspect (1.777) and the same face landmark ratios (top of head
    // ~0.335, face centre ~0.58, chin ~0.825), measured by
    // .claude/skills/run-tattoogo/probe-portraits.mjs. So drawing each
    // image to imgRect makes the eyes/nose/mouth/lips align pixel-for-pixel
    // even though the two source PNGs have different natural dimensions
    // (clean is 1365×768, tattooed is 1672×941).
    let imgRect = { x: 0, y: 0, w: 0, h: 0 };

    const portraitClean = new Image();
    const portraitTattooed = new Image();
    portraitClean.crossOrigin = 'anonymous';
    portraitTattooed.crossOrigin = 'anonymous';

    let loaded = 0;
    const onLoad = () => {
      if (++loaded === 2) {
        ready = true;
        resize();
        // One initial paint of the clean portrait; the RAF loop will only
        // start when a trail point is added (via wake()).
        if (W > 0 && H > 0) paintFrame();
      }
    };
    portraitClean.onload = onLoad;
    portraitTattooed.onload = onLoad;
    portraitClean.src = portraitCleanUrl;
    portraitTattooed.src = portraitTattooedUrl;

    function sizeCanvas(c: HTMLCanvasElement, w: number, h: number) {
      c.width = Math.floor(w * dpr);
      c.height = Math.floor(h * dpr);
    }

    function computeImgRect() {
      // Cover-fit. Scale uses the clean image's natural dimensions; the
      // tattooed image gets scaled to the same drawW × drawH by drawImage
      // and the aspect matches (1.777) so it isn't distorted.
      //
      // Position the FACE centre (at vertical ratio 0.58 in the source —
      // measured by probe-portraits.mjs) at the canvas vertical centre.
      // This crops the top of the hair and the bottom of the turtleneck
      // by an equal amount as the stage gets shorter, instead of eating
      // only the bottom.
      const natW = portraitClean.naturalWidth;
      const natH = portraitClean.naturalHeight;
      const scale = Math.max(W / natW, H / natH);
      const drawW = natW * scale;
      const drawH = natH * scale;

      const x = W / 2 - drawW * 0.50;
      const y = H / 2 - drawH * 0.58;

      imgRect = { x, y, w: drawW, h: drawH };
    }

    function paintBg() {
      const ctx = ctxBg;
      ctx.fillStyle = '#F1F1F1';
      ctx.fillRect(0, 0, W, H);
    }

    function resize() {
      const r = wrap.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) return; // wait until parent has size
      // Skip if nothing actually changed — prevents ResizeObserver feedback.
      const newDpr = Math.min(window.devicePixelRatio || 1, 2);
      if (r.width === W && r.height === H && newDpr === dpr) return;
      W = r.width; H = r.height;
      dpr = newDpr;
      [visible, mask, topCompose, bgImg].forEach(c => sizeCanvas(c, W, H));
      visible.style.width = W + 'px';
      visible.style.height = H + 'px';
      [ctxV, ctxMask, ctxCompose, ctxBg].forEach(ctx => ctx.setTransform(dpr, 0, 0, dpr, 0, 0));
      paintBg();
      computeImgRect();
      // Repaint immediately after a resize so the clean portrait is
      // visible even while idle.
      if (ready) paintFrame();
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

    function paintFrame() {
      // Compose: clean portrait, then erase under the mask so the tattooed
      // version underneath bleeds through.
      ctxCompose.clearRect(0, 0, W, H);
      ctxCompose.drawImage(portraitClean, imgRect.x, imgRect.y, imgRect.w, imgRect.h);
      ctxCompose.save();
      ctxCompose.globalCompositeOperation = 'destination-out';
      ctxCompose.drawImage(mask, 0, 0, W, H);
      ctxCompose.restore();

      // Paint: bg, then tattooed portrait, then composed clean-with-cutout.
      // Both images are drawn into the same imgRect — each scales from its
      // own natural dimensions, and shared face landmark ratios make the
      // features overlap pixel-for-pixel where the mask reveals.
      ctxV.clearRect(0, 0, W, H);
      ctxV.drawImage(bgImg, 0, 0, W, H);
      ctxV.drawImage(portraitTattooed, imgRect.x, imgRect.y, imgRect.w, imgRect.h);
      ctxV.drawImage(topCompose, 0, 0, W, H);
    }

    /**
     * Driven RAF — the loop only runs while there are active trail points
     * (i.e. a reveal is in progress). When the trail empties, we paint one
     * clean frame and stop, so the browser can go idle (and the screenshot
     * tooling can settle). Any new input wakes the loop back up.
     */
    function frame() {
      raf = 0;
      if (!ready || W === 0 || H === 0) return;
      const now = performance.now();
      drawMaskFromPoints(now);
      paintFrame();
      if (points.length > 0) {
        raf = requestAnimationFrame(frame);
      } else {
        // Trail empty — wipe the mask so no residual alpha bleeds the
        // tattoo through, then paint one final clean frame.
        ctxMask.save();
        ctxMask.globalCompositeOperation = 'copy';
        ctxMask.fillStyle = 'rgba(0,0,0,0)';
        ctxMask.fillRect(0, 0, W, H);
        ctxMask.restore();
        paintFrame();
      }
    }

    function wake() {
      if (raf === 0 && ready && W !== 0 && H !== 0) {
        raf = requestAnimationFrame(frame);
      }
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
      wake();
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
    // ResizeObserver catches the case where the parent flex container
    // had 0 height during the first effect tick (which gave us a 0x0
    // canvas) and then settles to its final size on layout.
    const ro = new ResizeObserver(() => resize());
    ro.observe(wrap);
    wrap.addEventListener('mousemove', onMove);
    wrap.addEventListener('touchmove', onMove, { passive: true });
    wrap.addEventListener('mouseleave', onLeave);
    wrap.addEventListener('touchend', onLeave);

    // Kick off layout immediately so background paints before images decode.
    resize();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      ro.disconnect();
      wrap.removeEventListener('mousemove', onMove);
      wrap.removeEventListener('touchmove', onMove);
      wrap.removeEventListener('mouseleave', onLeave);
      wrap.removeEventListener('touchend', onLeave);
    };
  }, []);

  return (
    <div ref={wrapRef} style={{ position: 'absolute', inset: 0, overflow: 'hidden', cursor: 'crosshair', background: '#F1F1F1' }}>
      <canvas
        ref={visibleRef}
        style={{
          position: 'absolute',
          inset: 0,
          display: 'block',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center center',
        }}
      />
    </div>
  );
}
