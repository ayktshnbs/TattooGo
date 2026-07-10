import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { StarField } from '../components/StarField';
import { Icon } from '../components/Icon';
import { getUploads, fetchUploads, UPLOADS_EVENT } from '../data/uploads';
import { useLang } from '../i18n/LangContext';
import { useReveal } from '../hooks/useReveal';

const FEED_BATCH = 8;

export function Landing() {
  const { t, lang } = useLang();
  useReveal();

  // The feed is real artist work only — approved portfolio uploads from the
  // API. Local cache paints instantly, then the shared feed replaces it;
  // re-fetch when a publish happens in this tab or another one.
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
  const feed = uploads;

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
          {/* Value proposition — the one sentence that says what this is. */}
          <p style={{ margin: '4px 0 0', color: 'rgba(245,242,235,0.82)', fontSize: 'clamp(14px, 1.6vw, 17px)', lineHeight: 1.55, maxWidth: 460 }}>
            {lang === 'tr'
              ? 'Dövme fikrini paylaş, doğrulanmış sanatçılardan gerçek teklifler al.'
              : 'Share your tattoo idea and receive real offers from verified artists.'}
          </p>
          <div className="row gap-3 wrap" style={{ justifyContent: 'center', marginTop: 8 }}>
            <Link to="/dashboard/create-request" className="btn" style={{ background: '#F5F2EB', color: '#000', borderColor: '#F5F2EB' }}>{t('cta.createRequest')}<span className="dot" /></Link>
            <Link to="/register" className="btn btn-glass">{t('cta.joinAsArtist')}</Link>
          </div>
        </div>
      </section>

      {/* How it works, in one glance — three compact steps so a first-time
          visitor understands the marketplace before the feed. */}
      <section style={{ borderBottom: '1px solid var(--hairline)' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 1 }}>
          {[
            { num: '01', tr: 'Fikrini paylaş', en: 'Share your idea', trBody: 'Dövme isteğini kısaca anlat.', enBody: 'Describe the tattoo you want.' },
            { num: '02', tr: 'Teklifleri al', en: 'Receive offers', trBody: 'Doğrulanmış sanatçılar fiyat ve tarih önersin.', enBody: 'Verified artists reply with price and date.' },
            { num: '03', tr: 'Sanatçını seç', en: 'Choose your artist', trBody: 'Portfolyoları karşılaştır, randevunu ayarla.', enBody: 'Compare portfolios and book your session.' },
          ].map(s => (
            <Link key={s.num} to="/how-it-works" className="row gap-4 center" style={{ padding: 'clamp(20px, 3vw, 32px) clamp(4px, 1vw, 16px)' }}>
              <span className="mono" style={{ color: 'var(--accent)' }}>{s.num}</span>
              <span className="col" style={{ gap: 2 }}>
                <span className="display" style={{ fontSize: 19 }}>{lang === 'tr' ? s.tr : s.en}</span>
                <span className="text-muted" style={{ fontSize: 13 }}>{lang === 'tr' ? s.trBody : s.enBody}</span>
              </span>
            </Link>
          ))}
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
          {feed.length === 0 ? (
            <div className="col center" style={{ padding: 'clamp(48px, 7vw, 96px) 24px', textAlign: 'center', gap: 12, border: '1px dashed var(--hairline-strong)' }}>
              <span className="display" style={{ fontSize: 24 }}>{lang === 'tr' ? 'İlk işler yolda' : 'First pieces are on their way'}</span>
              <p className="text-muted" style={{ margin: 0, maxWidth: 460, fontSize: 14 }}>
                {lang === 'tr'
                  ? 'Onaylı sanatçılar çalışmalarını yükledikçe akış burada canlanacak.'
                  : 'As verified artists publish their work, the feed comes alive here.'}
              </p>
              <Link to="/register" className="btn btn-sm btn-accent" style={{ marginTop: 8 }}>{t('cta.joinAsArtist')}</Link>
            </div>
          ) : (
            <div className="pin-feed">
              {feed.slice(0, visible).map((d, i) => (
                <Link key={d.id} to="/designs" className="pin reveal" style={{ ['--delay' as any]: `${(i % 4) * 50}ms` }}>
                  <div className="pin-media">
                    <img src={d.imageUrl} alt={d.title} loading="lazy" style={{ width: '100%', aspectRatio: d.imageRatio, objectFit: 'cover', display: 'block' }} />
                  </div>
                  <div className="pin-caption">
                    <strong>{d.title}</strong>
                    <span>{d.artistName}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
          {visible < feed.length && <div ref={sentinelRef} aria-hidden style={{ height: 1 }} />}
        </div>
      </section>

      <Footer />
    </>
  );
}

/* Animated brand mark — the swirl spins slowly while the whole mark floats
   and its glow breathes (as before), now seated in the space scene: a soft
   indigo aura behind it and a thin tilted orbit ring with a small glint
   travelling it, so the mark reads as the planet of the hero. CSS-only,
   in globals.css (.logo-motion*, .logo-aura, .logo-orbit). */
function AnimatedLogo() {
  return (
    <div className="logo-motion" aria-hidden>
      <span className="logo-aura" />
      <span className="logo-orbit"><i /></span>
      <span className="logo-motion-mark"><Icon name="logo" size="100%" /></span>
    </div>
  );
}
