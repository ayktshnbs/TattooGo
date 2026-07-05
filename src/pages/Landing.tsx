import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Marquee } from '../components/Marquee';
import { StarField } from '../components/StarField';
import { Icon } from '../components/Icon';
import { SectionHeader } from '../components/SectionHeader';
import { ARTISTS, DESIGNS, SECTION_NUMBERS } from '../data/mock';
import { useLang } from '../i18n/LangContext';
import { useReveal } from '../hooks/useReveal';
import { Swatch, BackgroundPattern } from '../components/Visual';

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

      <Marquee
        items={[
          'TattooGo',
          lang === 'tr' ? 'Özel dövme teklifleri' : 'Custom tattoo offers',
          lang === 'tr' ? 'Onaylı sanatçılar' : 'Verified artists',
          lang === 'tr' ? 'Stüdyo randevuları' : 'Studio appointments',
          'Istanbul · Amsterdam · Lisbon',
          'TR / EN',
        ]}
      />

      {/* 01 Selected artists */}
      <section className="section" style={{ background: 'var(--paper-warm)' }}>
        <div className="container">
          <SectionHeader
            num={SECTION_NUMBERS.artists}
            eyebrow={lang === 'tr' ? 'Seçki' : 'Selection'}
            title={lang === 'tr' ? 'Bu hafta' : 'This week,'}
            italic={lang === 'tr' ? 'seçili sanatçılar.' : 'selected hands.'}
            description={lang === 'tr'
              ? 'Yorumları, portföyleri ve aktif tekliflerine göre öne çıkan sanatçılar.'
              : 'Artists drawn forward by their reviews, portfolios, and active offers.'}
          />
          <div className="editorial-split" style={{ marginTop: 60 }}>
            {/* Featured Artist */}
            <div className="reveal">
              <Link to="/artists" style={{ display: 'block' }}>
                <Swatch id="sw-4" ratio={1.1} />
                <div style={{ paddingTop: 32 }}>
                  <div className="row between center">
                    <span className="mono text-muted">{ARTISTS[0].city}</span>
                    <span className="mono text-accent">FEATURED</span>
                  </div>
                  <h3 className="display" style={{ fontSize: 'clamp(40px, 6vw, 80px)', margin: '16px 0 8px', lineHeight: 0.9 }}>{ARTISTS[0].name}</h3>
                  <span className="mono text-muted">{ARTISTS[0].styles.join(' · ')}</span>
                </div>
              </Link>
            </div>
            {/* Artist Ledger */}
            <div className="col" style={{ borderTop: '1px solid var(--hairline)' }}>
              {ARTISTS.slice(1, 4).map((a, i) => (
                <Link key={a.id} to="/artists" className="reveal ledger-row" style={{ padding: '32px 0', ['--delay' as any]: `${i * 60}ms` }}>
                  <div className="col gap-2">
                    <span className="display" style={{ fontSize: 32, margin: 0 }}>{a.name}</span>
                    <span className="mono text-muted" style={{ fontSize: 11 }}>{a.city} · {a.styles[0]}</span>
                  </div>
                  <span className="mono text-accent">★ {a.rating}</span>
                </Link>
              ))}
            </div>
          </div>
          <div className="row" style={{ justifyContent: 'flex-end', marginTop: 24 }}>
            <Link to="/artists" className="mono">{t('common.viewAll')} →</Link>
          </div>
        </div>
      </section>

      {/* 02 Trust */}
      <section className="section" style={{ background: 'var(--paper-warm)' }}>
        <div className="container">
          <SectionHeader
            num={SECTION_NUMBERS.trust}
            eyebrow={lang === 'tr' ? 'Güven' : 'Trust'}
            title={t('section.trust')}
          />
          <div className="col" style={{ marginTop: 60, borderTop: '1px solid var(--hairline)' }}>
            {([
              [t('trust.verified.title'), t('trust.verified.body')],
              [t('trust.reviews.title'),  t('trust.reviews.body')],
              [t('trust.booking.title'),  t('trust.booking.body')],
            ] as const).map(([ttl, body], i) => (
              <div key={ttl} className="reveal ledger-row" style={{ padding: 'clamp(40px, 6vw, 80px) 0', alignItems: 'flex-start', cursor: 'default', ['--delay' as any]: `${i * 60}ms` }}>
                <div className="col" style={{ flexShrink: 0, width: 'clamp(80px, 12vw, 180px)' }}>
                  <span className="display" style={{ fontSize: 'clamp(56px, 9vw, 120px)', lineHeight: 0.8, color: 'var(--hairline-strong)' }}>0{i + 1}</span>
                </div>
                <div className="col" style={{ flex: 1, maxWidth: 560 }}>
                  <h3 className="display" style={{ margin: '0 0 16px', fontSize: 'clamp(26px, 3.5vw, 40px)', lineHeight: 1.1 }}>{ttl}</h3>
                  <p className="text-muted" style={{ margin: 0, fontSize: 15 }}>{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery — zero-gap moodboard */}
      <section className="section">
        <div className="container">
          <SectionHeader
            num="—"
            eyebrow={lang === 'tr' ? 'Galeri' : 'Gallery'}
            title={lang === 'tr' ? 'Yeni' : 'Newly'}
            italic={lang === 'tr' ? 'eklenen tasarımlar.' : 'added designs.'}
          />
        </div>
        <div className="moodboard" style={{ marginTop: 60 }}>
          {DESIGNS.slice(0, 8).map((d, i) => (
            <Link key={d.id} to="/designs" className="moodboard-cell reveal" style={{ ['--delay' as any]: `${(i % 4) * 60}ms` }}>
              <Swatch id={d.swatch} ratio={d.imageRatio} />
              <div className="moodboard-caption">
                <span className="display" style={{ fontSize: 18, lineHeight: 1.1 }}>{d.title}</span>
                <span className="mono" style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)' }}>{d.artistName}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 07 CTA dark */}
      <section className="section dark" style={{ position: 'relative' }}>
        <BackgroundPattern />
        <div className="container split center" style={{ position: 'relative', zIndex: 1 }}>
          <div className="reveal">
            <span className="mono" style={{ color: 'var(--night-muted)' }}>{SECTION_NUMBERS.cta} · {t('section.cta')}</span>
            <h2 className="display display-lg" style={{ marginTop: 16, color: 'var(--night-text)' }}>
              {lang === 'tr' ? 'Brief’inizi yazın.' : 'Write your brief.'}
              <br />
              <span className="italic shimmer-text">{lang === 'tr' ? 'Doğru el size yazsın.' : 'Let the right hand reply.'}</span>
            </h2>
          </div>
          <div className="reveal col gap-4">
            <p className="text-muted" style={{ color: 'var(--night-muted)', maxWidth: 460, margin: 0 }}>
              {lang === 'tr'
                ? 'Müşteriyseniz brief’inizi paylaşın. Sanatçıysanız sıraya girin — verified artist olmaya 12 saat içinde başvurabilirsiniz.'
                : 'If you are a customer, share your brief. If you are an artist, apply to become verified in under 12 hours.'}
            </p>
            <div className="row gap-4" style={{ marginTop: 8 }}>
              <Link to="/dashboard/create-request" className="btn btn-accent" style={{ background: 'var(--night-text)', color: 'var(--night)', borderColor: 'var(--night-text)' }}>{t('cta.createRequest')}</Link>
              <Link to="/register" className="btn">{t('cta.joinAsArtist')}</Link>
            </div>
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
