import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SectionHeader } from '../components/SectionHeader';
import { Field, Input, Select, Textarea, ChoiceGroup } from '../components/Form';
import { Empty, Loading } from '../components/Empty';
import { STYLES, CITIES } from '../data/mock';
import { auth, artists as artistsApi, type ApiArtist, type ApiPortfolioItem } from '../lib/api';
import { useAuth, isArtistRole } from '../auth/AuthContext';
import { useLang } from '../i18n/LangContext';
import { useReveal } from '../hooks/useReveal';
import { AvatarBubble } from '../components/Visual';

function Page({ title, italic, eyebrow, num, children }: { title: string; italic?: string; eyebrow?: string; num: string; children: React.ReactNode }) {
  useReveal();
  return (
    <>
      <Header />
      <div style={{ paddingTop: 120 }}>
        <section className="section-tight">
          <div className="container">
            <SectionHeader num={num} eyebrow={eyebrow} title={title} italic={italic} />
            <div style={{ marginTop: 48 }}>{children}</div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

/* ---------- How it works ---------- */
export function HowItWorks() {
  const { t, lang } = useLang();
  const steps = [
    [t('how.01.title'), t('how.01.body')],
    [t('how.02.title'), t('how.02.body')],
    [t('how.03.title'), t('how.03.body')],
    [t('how.04.title'), t('how.04.body')],
  ];
  return (
    <Page num="01" eyebrow={lang === 'tr' ? 'Süreç' : 'Process'} title={lang === 'tr' ? 'Nasıl' : 'How it'} italic={lang === 'tr' ? 'çalışır.' : 'works.'}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 1, border: '1px solid var(--hairline)' }}>
        {steps.map(([ttl, body], i) => (
          <div key={ttl} className="row" style={{ background: 'var(--paper)', borderBottom: '1px solid var(--hairline)', padding: 32, gap: 32, flexWrap: 'wrap' }}>
            <span className="display" style={{ fontSize: 96, lineHeight: 0.9, color: 'var(--accent)', minWidth: 120 }}>{String(i + 1).padStart(2, '0')}</span>
            <div className="col" style={{ flex: 1, minWidth: 240 }}>
              <h3 className="display" style={{ fontSize: 34, margin: 0 }}>{ttl}</h3>
              <p className="text-muted" style={{ marginTop: 12, maxWidth: 640 }}>{body}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="row gap-3" style={{ marginTop: 40 }}>
        <Link to="/dashboard/create-request" className="btn btn-accent">{t('cta.createRequest')}</Link>
        <Link to="/register" className="btn">{t('cta.joinAsArtist')}</Link>
      </div>
    </Page>
  );
}

/* ---------- Browse Artists (real registered accounts) ---------- */
export function BrowseArtists() {
  const { lang } = useLang();
  const [city, setCity] = useState('all');
  const [style, setStyle] = useState<string>('all');
  const [list, setList] = useState<ApiArtist[] | null>(null);
  useEffect(() => { artistsApi.list().then(setList).catch(() => setList([])); }, []);
  const filtered = (list ?? []).filter(a =>
    (city === 'all' || a.city === city) && (style === 'all' || (a.styles ?? []).includes(style)));
  return (
    <Page num="02" eyebrow={lang === 'tr' ? 'Sanatçılar' : 'Artists'} title={lang === 'tr' ? 'Sanatçıları' : 'Browse'} italic={lang === 'tr' ? 'keşfet.' : 'artists.'}>
      <div className="row gap-3 wrap" style={{ marginBottom: 24 }}>
        <Select
          options={[{ value: 'all', label: lang === 'tr' ? 'Tüm şehirler' : 'All cities' }, ...CITIES.map(c => ({ value: c, label: c }))]}
          value={city} onChange={(e) => setCity(e.target.value)}
        />
        <Select
          options={[{ value: 'all', label: lang === 'tr' ? 'Tüm stiller' : 'All styles' }, ...STYLES.map(s => ({ value: s.key, label: s[lang] }))]}
          value={style} onChange={(e) => setStyle(e.target.value)}
        />
      </div>
      {list === null ? (
        <Loading />
      ) : filtered.length === 0 ? (
        <Empty
          title={lang === 'tr' ? 'Henüz sanatçı yok' : 'No artists yet'}
          body={lang === 'tr' ? 'Sanatçılar katıldıkça burada listelenecek.' : 'Artists appear here as they join the platform.'}
          cta={lang === 'tr' ? 'Sanatçı olarak katıl' : 'Join as artist'}
          to="/register"
        />
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
          {filtered.map(a => (
            <article key={a.id} className="card card-pad col gap-3">
              <div className="row center gap-3">
                <AvatarBubble name={a.name} size={44} />
                <div className="col">
                  <strong>{a.name}</strong>
                  <span className="mono text-muted" style={{ fontSize: 11 }}>
                    {a.role === 'studio' ? 'Studio' : 'Artist'}{a.city ? ` · ${a.city}` : ''}
                  </span>
                </div>
              </div>
              {a.bio && <p className="text-muted" style={{ margin: 0, fontSize: 14 }}>{a.bio}</p>}
              <div className="row between center">
                <span className="mono text-muted" style={{ fontSize: 11 }}>{(a.styles ?? []).join(' · ') || '—'}</span>
                <span className="mono">{a.rating != null ? `★ ${a.rating} (${a.reviewCount})` : (lang === 'tr' ? 'Yeni' : 'New')}</span>
              </div>
            </article>
          ))}
        </div>
      )}
    </Page>
  );
}

/* ---------- Browse Designs (real approved portfolio uploads) ---------- */
export function BrowseDesigns() {
  const { lang } = useLang();
  const [style, setStyle] = useState('all');
  const [list, setList] = useState<ApiPortfolioItem[] | null>(null);
  useEffect(() => {
    fetch('/api/uploads').then(r => r.json()).then(d => setList(Array.isArray(d) ? d : [])).catch(() => setList([]));
  }, []);
  const filtered = (list ?? []).filter(d => style === 'all' || d.style === style);
  return (
    <Page num="03" eyebrow={lang === 'tr' ? 'Tasarımlar' : 'Designs'} title={lang === 'tr' ? 'Tasarımları' : 'Browse'} italic={lang === 'tr' ? 'keşfet.' : 'designs.'}>
      <div className="row gap-2 wrap" style={{ marginBottom: 24 }}>
        <ChoiceGroup
          value={style}
          onChange={(v) => setStyle(v)}
          options={[{ value: 'all', label: lang === 'tr' ? 'Tümü' : 'All' }, ...STYLES.map(s => ({ value: s.key, label: s[lang] }))]}
        />
      </div>
      {list === null ? (
        <Loading />
      ) : filtered.length === 0 ? (
        <Empty
          title={lang === 'tr' ? 'Henüz tasarım yok' : 'No designs yet'}
          body={lang === 'tr' ? 'Sanatçılar çalışmalarını yükledikçe burada görünecek.' : 'Approved artist work appears here as it is published.'}
        />
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 24 }}>
          {filtered.map(d => (
            <article key={d.id} className="card" style={{ overflow: 'hidden' }}>
              <img src={d.imageUrl} alt={d.title} loading="lazy" style={{ width: '100%', aspectRatio: d.imageRatio || 1, objectFit: 'cover', display: 'block' }} />
              <div className="card-pad col gap-1">
                <strong>{d.title}</strong>
                <span className="mono text-muted" style={{ fontSize: 11 }}>{d.artistName} · {d.style}</span>
              </div>
            </article>
          ))}
        </div>
      )}
    </Page>
  );
}

/* ---------- Categories ---------- */
export function Categories() {
  const { lang } = useLang();
  return (
    <Page num="04" eyebrow={lang === 'tr' ? 'Kategoriler' : 'Categories'} title={lang === 'tr' ? 'Dövme' : 'Tattoo'} italic={lang === 'tr' ? 'kategorileri.' : 'categories.'}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 1, border: '1px solid var(--hairline)' }}>
        {STYLES.map((s, i) => (
          <Link key={s.key} to="/designs" style={{ background: 'var(--paper)', borderRight: '1px solid var(--hairline)', borderBottom: '1px solid var(--hairline)', padding: 32, display: 'block' }}>
            <span className="mono text-muted">{String(i + 1).padStart(2, '0')}</span>
            <h3 className="display" style={{ fontSize: 38, margin: '8px 0 12px' }}>{s[lang]}</h3>
            <p className="text-muted" style={{ margin: 0 }}>
              {lang === 'tr'
                ? 'Sanatçılar bu stilde aktif olarak teklif veriyor.'
                : 'Artists currently working in this style send offers daily.'}
            </p>
          </Link>
        ))}
      </div>
    </Page>
  );
}

/* ---------- Login / Register ---------- */
export function Login() {
  const { lang } = useLang();
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  return (
    <Page num="05" eyebrow={lang === 'tr' ? 'Giriş' : 'Sign in'} title={lang === 'tr' ? 'Tekrar' : 'Welcome'} italic={lang === 'tr' ? 'hoş geldiniz.' : 'back.'}>
      <div className="split">
        <form
          className="col gap-4"
          style={{ maxWidth: 460 }}
          onSubmit={async (e) => {
            e.preventDefault();
            setBusy(true); setError('');
            try {
              const me = await auth.login(email, password);
              setUser(me);
              navigate(isArtistRole(me.role) ? '/studio' : '/dashboard');
            } catch (err) {
              setError(err instanceof Error ? err.message : 'Login failed');
            } finally {
              setBusy(false);
            }
          }}
        >
          {error && <span className="mono" style={{ color: 'var(--ink)' }}>⚠ {error}</span>}
          <Field label="Email"><Input type="email" placeholder="hello@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required /></Field>
          <Field label={lang === 'tr' ? 'Şifre' : 'Password'}><Input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required /></Field>
          <div className="row gap-3" style={{ marginTop: 12 }}>
            <button className="btn btn-primary" type="submit" disabled={busy}>{busy ? '…' : (lang === 'tr' ? 'Giriş yap' : 'Sign in')}</button>
            <Link to="/register" className="btn btn-ghost">{lang === 'tr' ? 'Hesap oluştur' : 'Create account'}</Link>
          </div>
        </form>
        <div className="col gap-3">
          <span className="mono text-muted">{lang === 'tr' ? 'Yeni misiniz?' : 'New here?'}</span>
          <p className="display display-md" style={{ margin: 0 }}>
            {lang === 'tr' ? 'Dövme yaptırmak ya da yapmak. İkisi de tek hesapla.' : 'Get tattooed, or tattoo. Both with one account.'}
          </p>
          <div className="row gap-3" style={{ marginTop: 12 }}>
            <Link to="/register" className="btn">{lang === 'tr' ? 'Kayıt ol' : 'Sign up'}</Link>
          </div>
        </div>
      </div>
    </Page>
  );
}

export function Register() {
  const { lang } = useLang();
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [role, setRole] = useState<'customer' | 'artist' | 'studio'>('customer');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState(CITIES[0]);
  const [bio, setBio] = useState('');
  const [style, setStyle] = useState(STYLES[0].key);
  const [password, setPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  return (
    <Page num="06" eyebrow={lang === 'tr' ? 'Kayıt' : 'Sign up'} title={lang === 'tr' ? 'Hesap' : 'Create'} italic={lang === 'tr' ? 'oluştur.' : 'your account.'}>
      <div className="row gap-2 wrap" style={{ marginBottom: 32 }}>
        <ChoiceGroup
          value={role}
          onChange={(v) => setRole(v)}
          options={[
            { value: 'customer', label: lang === 'tr' ? 'Müşteri' : 'Customer' },
            { value: 'artist',   label: lang === 'tr' ? 'Sanatçı' : 'Artist' },
            { value: 'studio',   label: lang === 'tr' ? 'Stüdyo'  : 'Studio' },
          ]}
        />
      </div>
      <form
        className="col gap-4"
        style={{ maxWidth: 580 }}
        onSubmit={async (e) => {
          e.preventDefault();
          if (!agreed) { setError(lang === 'tr' ? 'Şartları onaylamanız gerekiyor.' : 'Please accept the Terms.'); return; }
          setBusy(true); setError('');
          try {
            const me = await auth.register({
              email, password, name, role, city,
              bio: role !== 'customer' ? bio : undefined,
              styles: role !== 'customer' ? [style] : undefined,
            });
            setUser(me);
            navigate(isArtistRole(me.role) ? '/studio' : '/dashboard');
          } catch (err) {
            setError(err instanceof Error ? err.message : 'Registration failed');
          } finally {
            setBusy(false);
          }
        }}
      >
        {error && <span className="mono" style={{ color: 'var(--ink)' }}>⚠ {error}</span>}
        <Field label={lang === 'tr' ? (role === 'studio' ? 'Stüdyo adı' : 'Adınız') : (role === 'studio' ? 'Studio name' : 'Full name')}>
          <Input value={name} onChange={(e) => setName(e.target.value)} required />
        </Field>
        <Field label="Email"><Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></Field>
        <Field label={lang === 'tr' ? 'Şehir' : 'City'}>
          <Select options={CITIES.map(c => ({ value: c, label: c }))} value={city} onChange={(e) => setCity(e.target.value)} />
        </Field>
        {role !== 'customer' && (
          <>
            <Field label={lang === 'tr' ? 'Kısa biyografi' : 'Short bio'}><Textarea rows={3} value={bio} onChange={(e) => setBio(e.target.value)} /></Field>
            <Field label={lang === 'tr' ? 'Ana stil' : 'Primary style'}>
              <Select options={STYLES.map(s => ({ value: s.key, label: s[lang] }))} value={style} onChange={(e) => setStyle(e.target.value as typeof style)} />
            </Field>
          </>
        )}
        <Field label={lang === 'tr' ? 'Şifre (en az 8 karakter)' : 'Password (min 8 characters)'}>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} />
        </Field>
        <label className="row gap-2 center" style={{ marginTop: 8 }}>
          <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
          <span className="mono text-muted">{lang === 'tr' ? '18 yaşından büyüğüm ve Şartları okudum.' : 'I am 18+ and I agree to the Terms.'}</span>
        </label>
        <div className="row gap-3" style={{ marginTop: 12 }}>
          <button className="btn btn-primary" type="submit" disabled={busy}>{busy ? '…' : (lang === 'tr' ? 'Hesap oluştur' : 'Create account')}</button>
          <Link to="/login" className="btn btn-ghost">{lang === 'tr' ? 'Zaten hesabım var' : 'I have an account'}</Link>
        </div>
      </form>
    </Page>
  );
}

/* ---------- FAQ ---------- */
export function FAQ() {
  const { lang } = useLang();
  const qs = lang === 'tr'
    ? [
        ['Sanatçılar nasıl doğrulanıyor?', 'Her sanatçı kimlik ve portföy değerlendirmesinden geçer.'],
        ['Bir teklifi kabul edersem ne olur?', 'Randevu otomatik olarak oluşturulur ve sohbet açılır.'],
        ['Birden fazla sanatçıya brief gönderebilir miyim?', 'Tek brief gönderirsiniz; teklifler size gelir.'],
        ['Ücreti nasıl ödüyorum?', 'Stüdyoda doğrudan ödersiniz; depozito için planlanmış güvenli ödeme yakında.'],
        ['Yorum bırakmak için ne gerekli?', 'Randevu tamamlanmış olmalı; aksi halde yorum açılmaz.'],
      ]
    : [
        ['How are artists verified?', 'Each artist passes identity and portfolio review.'],
        ['What happens if I accept an offer?', 'A booking is created and a private chat opens.'],
        ['Can I send my brief to multiple artists?', 'One brief, many offers come to you.'],
        ['How do I pay?', 'In-studio for now; secured deposits coming soon.'],
        ['Who can leave a review?', 'Only customers with completed bookings.'],
      ];
  return (
    <Page num="07" eyebrow="FAQ" title={lang === 'tr' ? 'Sık' : 'Frequently'} italic={lang === 'tr' ? 'sorulanlar.' : 'asked.'}>
      <div className="col">
        {qs.map(([q, a], i) => (
          <details key={q} style={{ borderBottom: '1px solid var(--hairline)', padding: '22px 0' }}>
            <summary style={{ cursor: 'pointer', listStyle: 'none', display: 'flex', justifyContent: 'space-between', gap: 24 }}>
              <span className="row gap-3 center">
                <span className="mono text-muted">{String(i + 1).padStart(2, '0')}</span>
                <span className="display" style={{ fontSize: 22 }}>{q}</span>
              </span>
              <span className="mono text-muted">+</span>
            </summary>
            <p className="text-muted" style={{ marginTop: 14, maxWidth: 720 }}>{a}</p>
          </details>
        ))}
      </div>
    </Page>
  );
}

/* ---------- About ---------- */
export function About() {
  const { lang } = useLang();
  return (
    <Page num="08" eyebrow={lang === 'tr' ? 'Hakkında' : 'About'} title={lang === 'tr' ? 'TattooGo' : 'TattooGo'} italic={lang === 'tr' ? 'manifesto.' : 'manifesto.'}>
      <div className="split">
        <p className="display display-md" style={{ margin: 0, maxWidth: 520 }}>
          {lang === 'tr'
            ? 'Her dövme bir karardır. Bu karara saygıyla yaklaşıyoruz — açık artırmalarla değil, eşleşmelerle.'
            : 'Every tattoo is a decision. We honour that decision with matches, not auctions.'}
        </p>
        <div className="col gap-4">
          <p className="text-muted" style={{ margin: 0 }}>
            {lang === 'tr'
              ? 'TattooGo, kapsamlı bir pazardan çok bir editöryal platform olarak tasarlandı. Sanatçıları kalitelerine göre öne çıkarırız, müşterilere de aynı saygıyı sunarız.'
              : 'TattooGo is designed as an editorial platform more than a broad marketplace. We highlight artists by craft, and we extend the same care to clients.'}
          </p>
          <p className="text-muted" style={{ margin: 0 }}>
            {lang === 'tr'
              ? 'İstanbul’da kuruldu. Amsterdam ve Lisbon ofisleriyle büyüyor.'
              : 'Founded in Istanbul. Growing with studios in Amsterdam and Lisbon.'}
          </p>
        </div>
      </div>
    </Page>
  );
}

/* ---------- Contact ---------- */
export function Contact() {
  const { lang } = useLang();
  return (
    <Page num="09" eyebrow={lang === 'tr' ? 'İletişim' : 'Contact'} title={lang === 'tr' ? 'Bize' : 'Talk to'} italic={lang === 'tr' ? 'yazın.' : 'us.'}>
      <div className="split">
        <form className="col gap-4" onSubmit={(e) => e.preventDefault()} style={{ maxWidth: 480 }}>
          <Field label={lang === 'tr' ? 'Adınız' : 'Your name'}><Input /></Field>
          <Field label="Email"><Input type="email" /></Field>
          <Field label={lang === 'tr' ? 'Mesaj' : 'Message'}><Textarea rows={5} /></Field>
          <button className="btn btn-primary" type="submit">{lang === 'tr' ? 'Gönder' : 'Send'}</button>
        </form>
        <div className="col gap-3">
          <span className="mono text-muted">{lang === 'tr' ? 'Doğrudan' : 'Direct'}</span>
          <p className="display display-md" style={{ margin: 0, overflowWrap: 'anywhere' }}>hello@tattoogo.example</p>
          <span className="text-muted">Istanbul · Karaköy · TR</span>
        </div>
      </div>
    </Page>
  );
}

/* ---------- Terms ---------- */
export function Terms() {
  const { lang } = useLang();
  return (
    <Page num="10" eyebrow={lang === 'tr' ? 'Şartlar' : 'Terms'} title={lang === 'tr' ? 'Şartlar ve' : 'Terms &'} italic={lang === 'tr' ? 'gizlilik.' : 'privacy.'}>
      <div className="col gap-4" style={{ maxWidth: 760 }}>
        <p className="text-muted">{lang === 'tr' ? 'Bu sayfa örnektir.' : 'This page is a placeholder for the prototype.'}</p>
        <ol className="text-muted" style={{ paddingLeft: 22, lineHeight: 1.8 }}>
          <li>{lang === 'tr' ? 'Kullanıcı 18 yaşından büyük olmalıdır.' : 'Users must be 18 years or older.'}</li>
          <li>{lang === 'tr' ? 'Doğrulama portföy ve kimlik kontrolü içerir.' : 'Verification includes portfolio and identity check.'}</li>
          <li>{lang === 'tr' ? 'Sadece tamamlanmış randevular yorum alabilir.' : 'Only completed bookings may receive reviews.'}</li>
          <li>{lang === 'tr' ? 'Kullanıcı raporlama ve engelleme her zaman mümkündür.' : 'Reporting and blocking is available at any time.'}</li>
        </ol>
      </div>
    </Page>
  );
}
