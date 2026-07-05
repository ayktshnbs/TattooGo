import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { StarField } from '../components/StarField';
import { Icon } from '../components/Icon';
import { DESIGNS } from '../data/mock';
import { getUploads, fetchUploads, UPLOADS_EVENT } from '../data/uploads';
import { useLang } from '../i18n/LangContext';
import { useReveal } from '../hooks/useReveal';
import { Swatch } from '../components/Visual';

const FEED_BATCH = 8;

export function Landing() {
  const { t, lang } = useLang();
  useReveal();

  // Community uploads (artists + customers) float on top of the seeded
  // designs. Local cache paints instantly, then the shared feed from the API
  // replaces it; re-fetch when a publish happens in this tab or another one.
  const [uploads, setUploads] = useState(getUploads);
  useEffect(() => {
    let alive = true;
    const refresh = () => { fetchUploads().then(list => { if (alive) setUploads(list); }); };
    refresh();
    window.addEventListener(UPLOADS_EVENT, refresh);
    window.addEventListener('storage', refresh);
    return () => {
      alive = false;
      window.removeEventListener(UPLOADS_EVENT, refresh);
      window.removeEventListener('storage', refresh);
    };
  }, []);
  const feed = useMemo(() => [...uploads, ...DESIGNS], [uploads]);

  // Infinite scroll — reveal the feed in batches as the sentinel enters view.
  const [visible, setVisible] = useState(FEED_BATCH);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || visible >= feed.length) return;
    const io = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) setVisible(v => Math.min(v + FEED_BATCH, feed.length)); },
      { rootMargin: '600px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [visible, feed.length]);

  return (
    <>
      <Header overHero />

      {/* Hero — an animated deep-space starfield (Canvas 2D, mobile-safe) with
          the brand mark centered on top. Kept intentionally calm: the logo is
          the focus, the stars drift quietly behind it. */}
      <section style={{ position: 'relative', height: '100vh', minHeight: 560, overflow: 'hidden', background: '#000' }} className="hero">
        <StarField />

        <div
          style={{
            position: 'absolute', inset: 0, zIndex: 2,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            textAlign: 'center', padding: '0 24px', gap: 12,
          }}
        >
          <AnimatedLogo />
          <h1 className="display notranslate" translate="no" style={{ margin: '-6px 0 0', color: '#F5F2EB', fontSize: 'clamp(40px, 7vw, 84px)', letterSpacing: '-0.01em', lineHeight: 0.95 }}>
            Tattoo<span className="italic">Go</span>
          </h1>
          <p style={{ margin: 0, color: 'rgba(245,242,235,0.72)', fontSize: 'clamp(14px, 2.4vw, 18px)', maxWidth: 440, lineHeight: 1.5 }}>
            {lang === 'tr' ? 'Bir amaçla tene kazınan mürekkep.' : 'Ink, revealed with intention.'}
          </p>
          <div className="row gap-3 wrap" style={{ justifyContent: 'center', marginTop: 8 }}>
            <Link to="/dashboard/create-request" className="btn" style={{ background: '#F5F2EB', color: '#000', borderColor: '#F5F2EB' }}>{t('cta.createRequest')}<span className="dot" /></Link>
            <Link to="/register" className="btn btn-glass">{t('cta.joinAsArtist')}</Link>
          </div>
        </div>
      </section>

      {/* Design feed — Pinterest-style masonry. No section chrome, no
          textures: just the work on paper-white, one quiet label row. */}
      <section style={{ padding: 'clamp(48px, 7vw, 96px) 0 clamp(64px, 9vw, 120px)' }}>
        <div className="container">
          <div className="row between center" style={{ marginBottom: 'clamp(28px, 4vw, 48px)' }}>
            <span className="mono text-muted">{lang === 'tr' ? 'Tasarımlar' : 'Designs'}</span>
            <Link to="/designs" className="mono">{t('common.viewAll')} →</Link>
          </div>
          <div className="pin-feed">
            {feed.slice(0, visible).map((d, i) => (
              <Link key={d.id} to="/designs" className="pin reveal" style={{ ['--delay' as any]: `${(i % 4) * 50}ms` }}>
                <div className="pin-media">
                  {d.imageUrl
                    ? <img src={d.imageUrl} alt={d.title} loading="lazy" style={{ width: '100%', aspectRatio: d.imageRatio, objectFit: 'cover', display: 'block' }} />
                    : <Swatch id={d.swatch} ratio={d.imageRatio} />}
                </div>
                <div className="pin-caption">
                  <strong>{d.title}</strong>
                  <span>{d.artistName}</span>
                </div>
              </Link>
            ))}
          </div>
          {visible < feed.length && <div ref={sentinelRef} aria-hidden style={{ height: 1 }} />}
        </div>
      </section>

      <Footer />
    </>
  );
}

/* Animated brand mark — no rings, the mark itself moves. Mimics the look of
   an AI-animated logo video: the swirl arms sweep in a slow continuous spin
   while the whole mark floats with subtle depth (scale + drift) and its glow
   breathes. Layered CSS transforms in globals.css (.logo-motion*). */
function AnimatedLogo() {
  return (
    <div className="logo-motion" aria-hidden>
      <span className="logo-motion-mark"><Icon name="logo" size="100%" /></span>
    </div>
  );
}
