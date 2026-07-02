import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Marquee } from '../components/Marquee';
import { HeroReveal } from '../components/HeroReveal';
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
      <Header />

      {/* Hero — full-viewport WebGL fluid-trail reveal. The canvas is the
          entire stage; copy overlays the bottom edge so the cursor reveals
          the tattooed portrait beneath the clean portrait edge-to-edge.
          This is the only theatrical motion moment on the site. */}
      <section style={{ position: 'relative', height: '100vh', minHeight: 560, overflow: 'hidden', background: '#F1F1F1' }} className="hero">
        <HeroReveal />

        {/* Legibility scrim — a soft dark vignette anchored to the bottom of the
            canvas. It sits above the WebGL stage but beneath the copy, so the
            cream headline reads cleanly over BOTH the light (clean portrait) and
            dark (revealed tattoo) states without heavy per-glyph shadows. The
            gradient stays transparent through the upper ~55% so the model's face
            and the cursor-reveal remain untouched. */}
        <div
          aria-hidden
          style={{
            position: 'absolute', left: 0, right: 0, bottom: 0, height: '78%',
            zIndex: 1, pointerEvents: 'none',
            background:
              'linear-gradient(to top, rgba(0,0,0,0.68) 0%, rgba(0,0,0,0.52) 22%, rgba(0,0,0,0.34) 42%, rgba(0,0,0,0.14) 60%, transparent 80%)',
          }}
        />

        {/* Top metadata row — sits below the header */}
        <div className="container" style={{ position: 'absolute', top: 96, left: 0, right: 0, zIndex: 2, pointerEvents: 'none' }}>
          <div className="row">
            <span className="mono hero-chip">TG · 2026 · Edition №1</span>
          </div>
        </div>

        {/* Copy overlay — sits at the bottom of the hero canvas. Click-through
            disabled on the wrapper; re-enabled per element so the canvas behind
            still receives mousemove from the empty space. */}
        <div
          className="container"
          style={{
            position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 3,
            paddingBottom: 36, paddingTop: 28, paddingLeft: 'clamp(2px, 0.6vw, 16px)',
            pointerEvents: 'none',
          }}
        >
          <div className="row between" style={{ gap: 40, alignItems: 'flex-end', flexWrap: 'wrap' }}>
            <div className="col" style={{ flex: '1 1 380px', pointerEvents: 'auto' }}>
              <h1 className="display" style={{ fontSize: 'clamp(56px, 10vw, 156px)', margin: 0, color: '#F5F2EB', textShadow: '0 2px 24px rgba(0,0,0,0.55), 0 1px 3px rgba(0,0,0,0.4)', letterSpacing: '-0.04em', lineHeight: 0.86 }}>
                Tattoo<span className="italic">Go</span>
              </h1>
              <h2 className="display display-md" style={{ margin: '14px 0 0', color: '#F5F2EB', textShadow: '0 2px 20px rgba(0,0,0,0.7), 0 1px 2px rgba(0,0,0,0.5)', maxWidth: 540 }}>
                {lang === 'tr' ? 'Bir amaçla' : 'Ink,'} <span className="italic">{lang === 'tr' ? 'tene kazınan mürekkep.' : 'revealed with intention.'}</span>
              </h2>
            </div>
            <div className="col" style={{ flex: '0 1 440px', gap: 18, pointerEvents: 'auto' }}>
              <div className="row gap-3 wrap">
                <Link to="/dashboard/create-request" className="btn btn-primary">{t('cta.createRequest')}<span className="dot" /></Link>
                <Link to="/register" className="btn btn-glass">{t('cta.joinAsArtist')}</Link>
              </div>
              <div className="row gap-3 wrap" style={{ marginTop: 2 }}>
                <Badge label={t('badge.verified')} />
                <Badge label={t('badge.custom')} />
                <Badge label={t('badge.booking')} />
              </div>
            </div>
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

      {/* 01 About */}
      <section className="section">
        <div className="container">
          <SectionHeader
            num={SECTION_NUMBERS.about}
            eyebrow={lang === 'tr' ? 'Hakkında' : 'About'}
            title={lang === 'tr' ? 'Seçilmiş' : 'A curated'}
            italic={lang === 'tr' ? 'bir dövme pazarı.' : 'tattoo marketplace.'}
          />
          <div className="editorial-split reveal" style={{ marginTop: 60 }}>
            <div>
              <p className="display" style={{ fontSize: 'clamp(36px, 6vw, 72px)', margin: 0, maxWidth: 800 }}>
                {lang === 'tr'
                  ? 'TattooGo, dövmeyi bir karar olarak ele alır — ortaya çıkmak için doğru ele ihtiyacı olan bir karar.'
                  : 'TattooGo treats a tattoo as a decision — one that deserves the right hand to bring it to life.'}
              </p>
            </div>
            <div className="col" style={{ alignSelf: 'flex-end', width: '100%' }}>
              <Stat label={lang === 'tr' ? 'Onaylı sanatçı' : 'Verified artists'} value="412" />
              <Stat label={lang === 'tr' ? 'Tamamlanan randevu' : 'Bookings completed'} value="2,184" />
              <Stat label={lang === 'tr' ? 'Ortalama yanıt süresi' : 'Median first reply'} value="38 min" />
            </div>
          </div>
        </div>
      </section>

      {/* 02 Selected artists */}
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

      {/* 03 Trust */}
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

function Badge({ label }: { label: string }) {
  return (
    <span className="row center gap-2 mono hero-badge">
      <span style={{ width: 6, height: 6, borderRadius: 999, background: 'currentColor' }} />
      {label}
    </span>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="stat-row">
      <span className="mono text-muted">{label}</span>
      <span className="display" style={{ fontSize: 32, lineHeight: 1 }}>{value}</span>
    </div>
  );
}
