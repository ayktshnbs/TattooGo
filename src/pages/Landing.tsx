import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Marquee } from '../components/Marquee';
import { HeroReveal } from '../components/HeroReveal';
import { SectionHeader } from '../components/SectionHeader';
import { ArtistCard, RequestCard, TattooCard } from '../components/Cards';
import { ARTISTS, DESIGNS, REQUESTS, STYLES, SECTION_NUMBERS } from '../data/mock';
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
            paddingBottom: 36, paddingTop: 28,
            pointerEvents: 'none',
          }}
        >
          <div className="row between" style={{ gap: 40, alignItems: 'flex-end', flexWrap: 'wrap' }}>
            <div className="col" style={{ flex: '1 1 380px', pointerEvents: 'auto' }}>
              <h1 className="display" style={{ fontSize: 'clamp(56px, 10vw, 156px)', margin: 0, color: '#F5F2EB', textShadow: '0 12px 48px rgba(0,0,0,1), 0 4px 16px rgba(0,0,0,0.4), 0 2px 4px rgba(0,0,0,0.4)', letterSpacing: '-0.04em', lineHeight: 0.86 }}>
                Tattoo<span className="italic">Go</span>
              </h1>
              <h2 className="display display-md" style={{ margin: '14px 0 0', color: '#F5F2EB', textShadow: '0 15px 30px rgba(0,0,0,1), 0 2px 8px rgba(0,0,0,0.6)', maxWidth: 540 }}>
                {lang === 'tr' ? 'Bir amaçla' : 'Ink,'} <span className="italic">{lang === 'tr' ? 'tene kazınan mürekkep.' : 'revealed with intention.'}</span>
              </h2>
            </div>
            <div className="col" style={{ flex: '0 1 440px', gap: 18, pointerEvents: 'auto' }}>
              <div className="hero-intro" style={{ maxWidth: 400 }}>
                <p style={{ color: '#F5F2EB', margin: 0, fontSize: 15 }}>{t('brand.intro')}</p>
              </div>
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
            description={t('section.about.body')}
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
              <Stat label={lang === 'tr' ? 'Sözleşmeye dayalı teklif' : 'Contracted offers'} value="9,206" />
              <Stat label={lang === 'tr' ? 'Ortalama yanıt süresi' : 'Median first reply'} value="38 min" />
            </div>
          </div>
        </div>
      </section>

      {/* 02 How it works */}
      <section className="section" style={{ background: 'var(--paper-warm)' }}>
        <div className="container">
          <SectionHeader
            num={SECTION_NUMBERS.how}
            eyebrow={lang === 'tr' ? 'Süreç' : 'Process'}
            title={t('section.how')}
          />
          <div className="col" style={{ marginTop: 60, borderTop: '1px solid var(--hairline)' }}>
            {([
              ['01', t('how.01.title'), t('how.01.body')],
              ['02', t('how.02.title'), t('how.02.body')],
              ['03', t('how.03.title'), t('how.03.body')],
              ['04', t('how.04.title'), t('how.04.body')],
            ] as const).map(([n, ttl, body], i) => (
              <div key={n} className="ledger-row reveal" style={{ alignItems: 'flex-start', padding: 'clamp(40px, 6vw, 80px) 0', borderBottom: '1px solid var(--hairline)' }}>
                <div className="col" style={{ flexShrink: 0, width: 'clamp(100px, 15vw, 240px)' }}>
                  <span className="display" style={{ fontSize: 'clamp(60px, 10vw, 140px)', lineHeight: 0.8, color: 'var(--hairline-strong)' }}>{n}</span>
                </div>
                <div className="col" style={{ flex: 1, maxWidth: 640 }}>
                  <h3 className="display" style={{ margin: '0 0 16px', fontSize: 'clamp(28px, 4vw, 44px)' }}>{ttl}</h3>
                  <p className="text-muted" style={{ margin: 0, fontSize: 16 }}>{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 03 Styles */}
      <section className="section">
        <div className="container">
          <SectionHeader
            num={SECTION_NUMBERS.styles}
            eyebrow={lang === 'tr' ? 'Stiller' : 'Styles'}
            title={lang === 'tr' ? 'İncelenmiş' : 'Considered'}
            italic={lang === 'tr' ? 'dövme stilleri.' : 'tattoo styles.'}
            description={lang === 'tr'
              ? 'TattooGo, sanatçıları stillerine göre kategorize eder — böylece daha hızlı doğru kişiye ulaşırsınız.'
              : 'TattooGo categorises artists by style — so the right hand reaches you sooner.'}
          />
          <div className="col" style={{ marginTop: 60, borderTop: '1px solid var(--hairline)' }}>
            {STYLES.map((s, i) => (
              <Link key={s.key} to="/designs" className="reveal ledger-row" style={{ padding: 'clamp(32px, 5vw, 64px) 0', borderBottom: '1px solid var(--hairline)' }}>
                <span className="display" style={{ fontSize: 'clamp(40px, 7vw, 110px)', lineHeight: 0.8, letterSpacing: '-0.02em' }}>{s[lang]}</span>
                <div className="row center gap-4">
                  <span className="mono text-muted" style={{ fontSize: 14 }}>/{String(i + 1).padStart(2, '0')}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 04 Selected artists */}
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
              {ARTISTS.slice(1, 6).map((a, i) => (
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

      {/* 05 Recent requests */}
      <section className="section">
        <div className="container">
          <SectionHeader
            num={SECTION_NUMBERS.requests}
            eyebrow={lang === 'tr' ? 'Müşteriler' : 'Customers'}
            title={lang === 'tr' ? 'Güncel' : 'Recent'}
            italic={lang === 'tr' ? 'dövme istekleri.' : 'customer briefs.'}
            description={lang === 'tr'
              ? 'Sanatçılar bu açık brief’lere bu hafta teklif veriyor.'
              : 'Artists are sending offers on these open briefs this week.'}
          />
          <div className="col" style={{ marginTop: 60, borderTop: '1px solid var(--hairline)' }}>
            {REQUESTS.slice(0, 4).map((r, i) => (
              <Link key={r.id} to={`/dashboard/request/${r.id}`} className="reveal ledger-row" style={{ padding: 'clamp(32px, 5vw, 56px) 0', alignItems: 'center', ['--delay' as any]: `${i * 60}ms` }}>
                <div className="col gap-2" style={{ flex: 1, paddingRight: 20 }}>
                   <span className="mono text-accent">#{r.id.toUpperCase()} · {r.status}</span>
                   <span className="display" style={{ fontSize: 'clamp(28px, 4vw, 44px)', margin: '8px 0 0', lineHeight: 1.1 }}>{r.title}</span>
                   <span className="mono text-muted" style={{ marginTop: 4 }}>{r.style} · {r.placement} · {r.city}</span>
                </div>
                <div className="col gap-2" style={{ alignItems: 'flex-end', flexShrink: 0 }}>
                   <span className="mono" style={{ fontSize: 13 }}>₺{r.budgetMin.toLocaleString()} – ₺{r.budgetMax.toLocaleString()}</span>
                   <span className="mono text-muted">{r.offerCount} {lang === 'tr' ? 'teklif' : 'offers'}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 06 Trust */}
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
              [t('trust.hygiene.title'),  t('trust.hygiene.body')],
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
          {DESIGNS.slice(0, 12).map((d, i) => (
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
