import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { StarField } from '../components/StarField';
import { Icon } from '../components/Icon';
import { DESIGNS } from '../data/mock';
import { useLang } from '../i18n/LangContext';
import { useReveal } from '../hooks/useReveal';
import { Swatch } from '../components/Visual';

export function Landing() {
  const { t, lang } = useLang();
  useReveal();

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
          <OrbitLogo />
          <h1 className="display" style={{ margin: '-6px 0 0', color: '#F5F2EB', fontSize: 'clamp(40px, 7vw, 84px)', letterSpacing: '-0.01em', lineHeight: 0.95 }}>
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
            {DESIGNS.map((d, i) => (
              <Link key={d.id} to="/designs" className="pin reveal" style={{ ['--delay' as any]: `${(i % 4) * 50}ms` }}>
                <div className="pin-media">
                  <Swatch id={d.swatch} ratio={d.imageRatio} />
                </div>
                <div className="pin-caption">
                  <strong>{d.title}</strong>
                  <span>{d.artistName}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

/* Cosmic orbit around the brand mark — a faint vortex plus two bold
   elliptical rings (one behind, one in front) rotating in opposite
   directions. Motion + layering live in globals.css (.orbit*). */
function OrbitLogo() {
  return (
    <div className="orbit" aria-hidden>
      <svg className="orbit-vortex" viewBox="0 0 200 200">
        <g fill="none" stroke="rgba(245,242,235,0.16)">
          <ellipse cx="100" cy="100" rx="96" ry="80" transform="rotate(18 100 100)" strokeWidth="0.6" />
          <ellipse cx="100" cy="100" rx="82" ry="95" transform="rotate(-30 100 100)" strokeWidth="0.6" />
          <circle cx="100" cy="100" r="70" strokeWidth="0.5" opacity="0.7" />
          <ellipse cx="100" cy="100" rx="58" ry="70" transform="rotate(52 100 100)" strokeWidth="0.5" />
        </g>
      </svg>

      <svg className="orbit-ring-back" viewBox="0 0 200 200">
        <ellipse cx="100" cy="100" rx="88" ry="30" transform="rotate(-26 100 100)" fill="none" stroke="rgba(245,242,235,0.7)" strokeWidth="2.4" />
      </svg>

      <span className="orbit-mark"><Icon name="logo" size="100%" /></span>

      <svg className="orbit-ring-front" viewBox="0 0 200 200">
        <ellipse cx="100" cy="100" rx="84" ry="26" transform="rotate(34 100 100)" fill="none" stroke="rgba(245,242,235,0.95)" strokeWidth="2.8" />
      </svg>

      <span className="orbit-spark" style={{ position: 'absolute', right: '11%', bottom: '15%', width: 18, height: 18 }}>
        <svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z" /></svg>
      </span>
    </div>
  );
}
