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
import { Swatch } from '../components/Visual';

export function Landing() {
  const { t, lang } = useLang();
  useReveal();

  return (
    <>
      <Header />

      {/* Hero — portrait stage on top, copy band below, never overlapping */}
      <section style={{ position: 'relative', overflow: 'hidden', background: '#F1F1F1', display: 'flex', flexDirection: 'column' }}>
        {/* Portrait stage — sized wide so the uploaded artwork fills without face zoom. */}
        <div style={{ position: 'relative', height: 'clamp(520px, calc(100vw / 2.4), 820px)', flex: '0 0 auto' }}>
          <HeroReveal />

          {/* Top metadata row — sits below the header */}
          <div className="container" style={{ position: 'absolute', top: 96, left: 0, right: 0, zIndex: 2, pointerEvents: 'none' }}>
            <div className="row between center">
              <span className="mono" style={{ color: 'var(--ink)' }}>TG · 2026 · Edition №1</span>
              <span className="mono row center" style={{ color: 'var(--ink)' }}>
                <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: 999, background: 'var(--ink)', marginRight: 8 }} />
                {lang === 'tr' ? 'İmleci hareket ettir' : 'Move cursor · reveal ink'}
              </span>
            </div>
          </div>

          {/* Side mono labels */}
          <div style={{ position: 'absolute', left: 18, top: '50%', transform: 'translateY(-50%) rotate(-90deg)', transformOrigin: 'left center', zIndex: 2, pointerEvents: 'none' }}>
            <span className="mono" style={{ color: 'var(--ink)' }}>—— surface · identity · ink</span>
          </div>
          <div style={{ position: 'absolute', right: 18, top: '50%', transform: 'translateY(-50%) rotate(90deg)', transformOrigin: 'right center', zIndex: 2, pointerEvents: 'none' }}>
            <span className="mono" style={{ color: 'var(--ink)' }}>TR / EN · 01 · cover</span>
          </div>
        </div>

        {/* Copy band — solid white, sits below the portrait, never crops the face */}
        <div
          style={{
            position: 'relative', zIndex: 3,
            background: 'var(--paper)',
            borderTop: '1px solid var(--hairline-strong)',
          }}
        >
          <div className="container" style={{ paddingBlock: 32 }}>
            <div className="row between" style={{ gap: 40, alignItems: 'flex-end', flexWrap: 'wrap' }}>
              <div className="col" style={{ flex: '1 1 380px' }}>
                <h1 className="display" style={{ fontSize: 'clamp(56px, 10vw, 156px)', margin: 0, color: 'var(--ink)', letterSpacing: '-0.04em', lineHeight: 0.86 }}>
                  Tattoo<span className="italic">Go</span>
                </h1>
                <h2 className="display display-md" style={{ margin: '14px 0 0', color: 'var(--ink)', maxWidth: 540 }}>
                  {lang === 'tr' ? 'Niyetle' : 'Ink,'} <span className="italic">{lang === 'tr' ? 'açığa çıkmış mürekkep.' : 'revealed with intention.'}</span>
                </h2>
              </div>
              <div className="col" style={{ flex: '0 1 440px', gap: 18 }}>
                <p style={{ color: 'var(--muted)', margin: 0, fontSize: 15, maxWidth: 400 }}>{t('brand.intro')}</p>
                <div className="row gap-3 wrap">
                  <Link to="/dashboard/create-request" className="btn btn-primary">{t('cta.createRequest')}<span className="dot" /></Link>
                  <Link to="/register" className="btn">{t('cta.joinAsArtist')}</Link>
                </div>
                <div className="row gap-3 wrap" style={{ marginTop: 2 }}>
                  <Badge label={t('badge.verified')} />
                  <Badge label={t('badge.custom')} />
                  <Badge label={t('badge.booking')} />
                </div>
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
          <div className="split reveal" style={{ marginTop: 60 }}>
            <p className="display display-md" style={{ margin: 0, maxWidth: 520 }}>
              {lang === 'tr'
                ? 'TattooGo, dövmeyi bir karar olarak ele alır — ortaya çıkmak için doğru ele ihtiyacı olan bir karar.'
                : 'TattooGo treats a tattoo as a decision — one that deserves the right hand to bring it to life.'}
            </p>
            <div className="col gap-4">
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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 32, marginTop: 40 }}>
            {([
              ['01', t('how.01.title'), t('how.01.body')],
              ['02', t('how.02.title'), t('how.02.body')],
              ['03', t('how.03.title'), t('how.03.body')],
              ['04', t('how.04.title'), t('how.04.body')],
            ] as const).map(([n, ttl, body], i) => (
              <div key={n} className="reveal col gap-3" style={{ ['--delay' as any]: `${i * 80}ms`, borderTop: '1px solid var(--hairline-strong)', paddingTop: 18 }}>
                <span className="display" style={{ fontSize: 56, lineHeight: 0.9, color: 'var(--accent)' }}>{n}</span>
                <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 22 }}>{ttl}</h3>
                <p className="text-muted" style={{ margin: 0 }}>{body}</p>
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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 1, marginTop: 40, border: '1px solid var(--hairline)' }}>
            {STYLES.map((s, i) => (
              <Link key={s.key} to="/designs" className="reveal col" style={{ ['--delay' as any]: `${i * 60}ms`, borderRight: '1px solid var(--hairline)', borderBottom: '1px solid var(--hairline)', padding: 24, background: 'var(--paper)' }}>
                <Swatch id={`sw-${(i % 6) + 1}`} ratio={1.2} dark />
                <div className="row between center" style={{ marginTop: 14 }}>
                  <span className="display" style={{ fontSize: 26 }}>{s[lang]}</span>
                  <span className="mono text-muted">{String(i + 1).padStart(2, '0')}</span>
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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24, marginTop: 40 }}>
            {ARTISTS.slice(0, 6).map((a, i) => (
              <div key={a.id} className="reveal" style={{ ['--delay' as any]: `${i * 60}ms` }}>
                <ArtistCard artist={a} large={i === 0} />
              </div>
            ))}
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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24, marginTop: 40 }}>
            {REQUESTS.slice(0, 4).map((r, i) => (
              <div key={r.id} className="reveal" style={{ ['--delay' as any]: `${i * 60}ms` }}>
                <RequestCard request={r} />
              </div>
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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24, marginTop: 40 }}>
            {([
              [t('trust.verified.title'), t('trust.verified.body')],
              [t('trust.reviews.title'),  t('trust.reviews.body')],
              [t('trust.booking.title'),  t('trust.booking.body')],
              [t('trust.hygiene.title'),  t('trust.hygiene.body')],
            ] as const).map(([ttl, body], i) => (
              <div key={ttl} className="reveal card card-pad col gap-3" style={{ ['--delay' as any]: `${i * 60}ms` }}>
                <span className="mono text-accent">0{i + 1}</span>
                <h3 className="display" style={{ fontSize: 22, margin: 0 }}>{ttl}</h3>
                <p className="text-muted" style={{ margin: 0 }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Selected designs */}
      <section className="section">
        <div className="container">
          <SectionHeader
            num="6.5"
            eyebrow={lang === 'tr' ? 'Galeri' : 'Gallery'}
            title={lang === 'tr' ? 'Yeni' : 'Newly'}
            italic={lang === 'tr' ? 'eklenen tasarımlar.' : 'added designs.'}
          />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24, marginTop: 40 }}>
            {DESIGNS.slice(0, 8).map((d, i) => (
              <div key={d.id} className="reveal" style={{ ['--delay' as any]: `${i * 50}ms` }}>
                <TattooCard design={d} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 07 CTA dark */}
      <section className="section dark">
        <div className="container split center">
          <div className="reveal">
            <span className="mono" style={{ color: 'var(--night-muted)' }}>{SECTION_NUMBERS.cta} · {t('section.cta')}</span>
            <h2 className="display display-lg" style={{ marginTop: 16, color: 'var(--night-text)' }}>
              {lang === 'tr' ? 'Brief’inizi yazın.' : 'Write your brief.'}
              <br />
              <span className="italic" style={{ color: 'var(--accent-soft)' }}>{lang === 'tr' ? 'Doğru el size yazsın.' : 'Let the right hand reply.'}</span>
            </h2>
          </div>
          <div className="reveal col gap-4">
            <p className="text-muted" style={{ color: 'var(--night-muted)', maxWidth: 460, margin: 0 }}>
              {lang === 'tr'
                ? 'Müşteriyseniz brief’inizi paylaşın. Sanatçıysanız sıraya girin — verified artist olmaya 12 saat içinde başvurabilirsiniz.'
                : 'If you are a customer, share your brief. If you are an artist, apply to become verified in under 12 hours.'}
            </p>
            <div className="row gap-3">
              <Link to="/dashboard/create-request" className="btn btn-accent">{t('cta.createRequest')}</Link>
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
    <span
      className="row center gap-2 mono"
      style={{
        padding: '6px 12px',
        border: '1px solid var(--hairline-strong)',
        borderRadius: 999,
        color: 'var(--ink)',
      }}
    >
      <span style={{ width: 6, height: 6, borderRadius: 999, background: 'var(--ink)' }} />
      {label}
    </span>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="row between" style={{ borderBottom: '1px solid var(--hairline)', paddingBlock: 12 }}>
      <span className="mono text-muted">{label}</span>
      <span className="display" style={{ fontSize: 30, lineHeight: 1 }}>{value}</span>
    </div>
  );
}
