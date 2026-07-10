import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SectionHeader } from '../components/SectionHeader';
import { Field, Input, Select, Textarea, ChoiceGroup } from '../components/Form';
import { Empty, Loading } from '../components/Empty';
import { STYLES, CITIES } from '../data/mock';
import { auth, artists as artistsApi, type ApiArtist, type ApiArtistProfile, type ApiPortfolioItem } from '../lib/api';
import { useAuth, isArtistRole } from '../auth/AuthContext';
import { useLang } from '../i18n/LangContext';
import { useReveal } from '../hooks/useReveal';
import { AvatarBubble } from '../components/Visual';
import { DiscoveryMap } from '../components/DiscoveryMap';

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

/* ---------- Browse / discover artists (map + list, one Postgres result set) ---------- */
export function BrowseArtists() {
  const { lang } = useLang();
  const [city, setCity] = useState('all');
  const [district, setDistrict] = useState('');
  const [q, setQ] = useState('');
  const [list, setList] = useState<ApiArtist[] | null>(null);
  const [selectedId, setSelectedId] = useState<string>('');

  // The SAME filtered result set drives both the map markers and the list.
  // Filters are applied server-side (Postgres) so map and list never diverge.
  useEffect(() => {
    setList(null);
    const t = setTimeout(() => {
      artistsApi.list({
        city: city === 'all' ? undefined : city,
        district: district.trim() || undefined,
        q: q.trim() || undefined,
      }).then(setList).catch(() => setList([]));
    }, 250);
    return () => clearTimeout(t);
  }, [city, district, q]);

  const results = list ?? [];
  const selected = results.find(a => a.id === selectedId) ?? null;

  return (
    <Page num="02" eyebrow={lang === 'tr' ? 'Sanatçılar' : 'Artists'} title={lang === 'tr' ? 'Sanatçıları' : 'Discover'} italic={lang === 'tr' ? 'keşfet.' : 'artists.'}>
      <div className="row gap-3 wrap" style={{ marginBottom: 24 }}>
        <Input placeholder={lang === 'tr' ? 'İsimle ara' : 'Search by name'} value={q} onChange={(e) => setQ(e.target.value)} />
        <Select
          options={[{ value: 'all', label: lang === 'tr' ? 'Tüm şehirler' : 'All cities' }, ...CITIES.map(c => ({ value: c, label: c }))]}
          value={city} onChange={(e) => setCity(e.target.value)}
        />
        <Input placeholder={lang === 'tr' ? 'İlçe' : 'District'} value={district} onChange={(e) => setDistrict(e.target.value)} />
      </div>

      {/* Map — markers come only from `results` (our Postgres API). */}
      <div style={{ height: 380, marginBottom: 28, border: '1px solid var(--hairline)', position: 'relative' }}>
        <DiscoveryMap artists={results} onSelect={setSelectedId} selectedId={selectedId} />
        {selected && (
          <div className="card card-pad col gap-2" style={{ position: 'absolute', left: 16, bottom: 16, width: 'min(320px, calc(100% - 32px))', zIndex: 2, boxShadow: 'var(--shadow-md)' }}>
            <div className="row between center">
              <strong>{selected.name}</strong>
              <button className="mono text-muted" onClick={() => setSelectedId('')} aria-label="Close">✕</button>
            </div>
            <span className="mono text-muted" style={{ fontSize: 11 }}>
              {selected.role === 'studio' ? 'Studio' : 'Artist'}
              {selected.district ? ` · ${selected.district}` : ''}{selected.city ? `, ${selected.city}` : ''}
              {selected.rating != null ? ` · ★ ${selected.rating}` : ''}
            </span>
            {selected.previewImages.length > 0 && (
              <div className="row gap-2" style={{ overflow: 'hidden' }}>
                {selected.previewImages.slice(0, 3).map((src, i) => (
                  <img key={i} src={src} alt="" style={{ width: 64, height: 64, objectFit: 'cover', flexShrink: 0 }} />
                ))}
              </div>
            )}
            <Link to={`/artists/${selected.id}`} className="btn btn-sm btn-accent" style={{ marginTop: 4 }}>
              {lang === 'tr' ? 'Profili gör' : 'View profile'}
            </Link>
          </div>
        )}
      </div>

      {/* List — the same result set. */}
      {list === null ? (
        <Loading />
      ) : results.length === 0 ? (
        <Empty
          title={lang === 'tr' ? 'Kayıtlı stüdyo bulunamadı' : 'No registered studios found'}
          body={lang === 'tr' ? 'Bu bölgede henüz kayıtlı stüdyo yok. Filtreleri değiştirmeyi deneyin.' : 'No registered studios found in this area yet. Try adjusting the filters.'}
          cta={lang === 'tr' ? 'Sanatçı olarak katıl' : 'Join as artist'}
          to="/register"
        />
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
          {results.map(a => (
            <Link key={a.id} to={`/artists/${a.id}`} style={{ display: 'block' }}>
              <article className="card card-pad col gap-3 card-lift" style={{ height: '100%' }}>
                <div className="row center gap-3">
                  <AvatarBubble name={a.name} size={44} />
                  <div className="col">
                    <strong>{a.name}</strong>
                    <span className="mono text-muted" style={{ fontSize: 11 }}>
                      {a.role === 'studio' ? 'Studio' : 'Artist'}
                      {a.district ? ` · ${a.district}` : ''}{a.city ? `, ${a.city}` : ''}
                      {a.hasPublicLocation ? ' · 📍' : ''}
                    </span>
                  </div>
                </div>
                {a.bio && <p className="text-muted" style={{ margin: 0, fontSize: 14 }}>{a.bio}</p>}
                <div className="row between center">
                  <span className="mono text-muted" style={{ fontSize: 11 }}>{(a.styles ?? []).join(' · ') || '—'}</span>
                  <span className="mono">{a.rating != null ? `★ ${a.rating} (${a.reviewCount})` : (lang === 'tr' ? 'Yeni' : 'New')}</span>
                </div>
                <span className="mono text-muted" style={{ fontSize: 11 }}>{a.portfolioCount} {lang === 'tr' ? 'çalışma' : 'works'} · {lang === 'tr' ? 'Profili gör →' : 'View profile →'}</span>
              </article>
            </Link>
          ))}
        </div>
      )}
    </Page>
  );
}

/* ---------- Public artist / studio profile ---------- */
export function ArtistPublicProfile() {
  const { lang } = useLang();
  const { artistId } = useParams<{ artistId: string }>();
  const [data, setData] = useState<ApiArtistProfile | null>(null);
  const [state, setState] = useState<'loading' | 'ok' | 'missing' | 'error'>('loading');
  useEffect(() => {
    if (!artistId) { setState('missing'); return; }
    artistsApi.get(artistId)
      .then(d => { setData(d); setState('ok'); })
      .catch(err => setState(err instanceof Error && /404|not found/i.test(err.message) ? 'missing' : 'error'));
  }, [artistId]);

  return (
    <>
      <Header />
      <div style={{ paddingTop: 120 }}>
        <section className="section-tight">
          <div className="container">
            {state === 'loading' && <Loading />}
            {state === 'missing' && (
              <Empty
                title={lang === 'tr' ? 'Sanatçı bulunamadı' : 'Artist not found'}
                body={lang === 'tr' ? 'Bu profil kaldırılmış veya hiç var olmamış olabilir.' : 'This profile may have been removed or never existed.'}
                cta={lang === 'tr' ? 'Sanatçılara dön' : 'Back to artists'}
                to="/artists"
              />
            )}
            {state === 'error' && (
              <Empty title={lang === 'tr' ? 'Bir şeyler ters gitti' : 'Something went wrong'} body={lang === 'tr' ? 'Profil yüklenemedi — tekrar deneyin.' : 'The profile could not be loaded — try again.'} />
            )}
            {state === 'ok' && data && (
              <>
                {/* Identity header — public info only */}
                <div className="row between" style={{ gap: 32, flexWrap: 'wrap', borderBottom: '1px solid var(--hairline)', paddingBottom: 40 }}>
                  <div className="row gap-4" style={{ alignItems: 'center' }}>
                    <AvatarBubble name={data.profile.name} size={72} />
                    <div className="col gap-1">
                      <span className="mono text-muted">
                        {data.profile.role === 'studio' ? (lang === 'tr' ? 'Stüdyo' : 'Studio') : (lang === 'tr' ? 'Sanatçı' : 'Artist')}
                        {data.profile.city ? ` · ${data.profile.city}` : ''}
                      </span>
                      <h1 className="display" style={{ margin: 0, fontSize: 'clamp(32px, 5vw, 56px)', lineHeight: 1 }}>{data.profile.name}</h1>
                      {(data.profile.styles ?? []).length > 0 && (
                        <span className="mono text-muted" style={{ fontSize: 11 }}>{(data.profile.styles ?? []).join(' · ')}</span>
                      )}
                    </div>
                  </div>
                  <div className="row gap-5 center" style={{ alignItems: 'center' }}>
                    <div className="col center-text">
                      <span className="display" style={{ fontSize: 30 }}>{data.profile.rating != null ? `★ ${data.profile.rating}` : '—'}</span>
                      <span className="mono text-muted" style={{ fontSize: 10 }}>{data.profile.reviewCount} {lang === 'tr' ? 'yorum' : 'reviews'}</span>
                    </div>
                    <div className="col center-text">
                      <span className="display" style={{ fontSize: 30 }}>{data.profile.completedJobs}</span>
                      <span className="mono text-muted" style={{ fontSize: 10 }}>{lang === 'tr' ? 'tamamlanan iş' : 'completed jobs'}</span>
                    </div>
                  </div>
                </div>

                {data.profile.bio && (
                  <p className="text-muted" style={{ maxWidth: 640, fontSize: 15, margin: '28px 0 0' }}>{data.profile.bio}</p>
                )}

                {/* Portfolio — approved items only (server-enforced) */}
                <div className="row between center" style={{ margin: '56px 0 20px', borderBottom: '1px solid var(--hairline)', paddingBottom: 10 }}>
                  <span className="mono text-muted">{lang === 'tr' ? 'Portföy' : 'Portfolio'}</span>
                  <span className="mono text-muted" style={{ fontSize: 11 }}>{data.portfolio.length}</span>
                </div>
                {data.portfolio.length === 0 ? (
                  <Empty
                    title={lang === 'tr' ? 'Henüz yayınlanmış çalışma yok' : 'No published work yet'}
                    body={lang === 'tr' ? 'Bu sanatçı ilk çalışmasını paylaştığında burada görünecek.' : 'When this artist publishes their first piece, it appears here.'}
                  />
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 20 }}>
                    {data.portfolio.map(p => (
                      <article key={p.id} className="card" style={{ overflow: 'hidden' }}>
                        <img src={p.imageUrl} alt={p.title} loading="lazy" style={{ width: '100%', aspectRatio: p.imageRatio || 1, objectFit: 'cover', display: 'block' }} />
                        <div className="card-pad col gap-1">
                          <strong style={{ fontSize: 14 }}>{p.title}</strong>
                          <span className="mono text-muted" style={{ fontSize: 10 }}>{p.style}{p.tags.length ? ` · ${p.tags.slice(0, 3).join(' · ')}` : ''}</span>
                        </div>
                      </article>
                    ))}
                  </div>
                )}

                {/* Public reviews */}
                <div className="row between center" style={{ margin: '56px 0 20px', borderBottom: '1px solid var(--hairline)', paddingBottom: 10 }}>
                  <span className="mono text-muted">{lang === 'tr' ? 'Yorumlar' : 'Reviews'}</span>
                  <span className="mono text-muted" style={{ fontSize: 11 }}>{data.reviews.length}</span>
                </div>
                {data.reviews.length === 0 ? (
                  <Empty
                    title={lang === 'tr' ? 'Henüz yorum yok' : 'No reviews yet'}
                    body={lang === 'tr' ? 'Yorumlar yalnızca tamamlanmış işlerden gelir.' : 'Reviews only come from completed jobs.'}
                  />
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
                    {data.reviews.map(r => (
                      <article key={r.id} className="card card-pad col gap-2">
                        <div className="row between center">
                          <strong style={{ fontSize: 14 }}>{r.customerName}</strong>
                          <span className="mono">{'★'.repeat(r.rating)}</span>
                        </div>
                        <span className="mono text-muted" style={{ fontSize: 10 }}>{r.requestTitle} · {r.createdAt}</span>
                        <p className="text-muted" style={{ margin: 0, fontSize: 14 }}>{r.text}</p>
                      </article>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </div>
      <Footer />
    </>
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
          <Link to="/forgot-password" className="mono text-muted" style={{ textDecoration: 'underline' }}>
            {lang === 'tr' ? 'Şifrenizi mi unuttunuz?' : 'Forgot your password?'}
          </Link>
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

/* ---------- Forgot / reset password + email verification ---------- */
export function ForgotPassword() {
  const { lang } = useLang();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  return (
    <Page num="05" eyebrow={lang === 'tr' ? 'Şifre' : 'Password'} title={lang === 'tr' ? 'Şifre' : 'Reset your'} italic={lang === 'tr' ? 'sıfırlama.' : 'password.'}>
      {sent ? (
        <div className="col gap-3" style={{ maxWidth: 520 }}>
          <p className="display display-md" style={{ margin: 0 }}>
            {lang === 'tr' ? 'E-postanızı kontrol edin.' : 'Check your inbox.'}
          </p>
          <p className="text-muted" style={{ margin: 0 }}>
            {lang === 'tr'
              ? 'Bu adrese kayıtlı bir hesap varsa, bir saat geçerli bir sıfırlama bağlantısı gönderdik.'
              : 'If an account exists for that address, we sent a reset link valid for one hour.'}
          </p>
          <Link to="/login" className="btn btn-ghost" style={{ alignSelf: 'flex-start' }}>{lang === 'tr' ? 'Girişe dön' : 'Back to sign in'}</Link>
        </div>
      ) : (
        <form
          className="col gap-4"
          style={{ maxWidth: 460 }}
          onSubmit={async (e) => {
            e.preventDefault();
            setBusy(true);
            try { await auth.requestReset(email); } catch { /* generic on purpose */ }
            setBusy(false);
            setSent(true);
          }}
        >
          <p className="text-muted" style={{ margin: 0 }}>
            {lang === 'tr' ? 'Hesabınızın e-posta adresini girin; size bir sıfırlama bağlantısı gönderelim.' : 'Enter your account email and we will send you a reset link.'}
          </p>
          <Field label="Email"><Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></Field>
          <button className="btn btn-primary" type="submit" disabled={busy || !email}>{busy ? '…' : (lang === 'tr' ? 'Bağlantı gönder' : 'Send reset link')}</button>
        </form>
      )}
    </Page>
  );
}

export function ResetPassword() {
  const { lang } = useLang();
  const navigate = useNavigate();
  const token = new URLSearchParams(window.location.search).get('token') ?? '';
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);
  return (
    <Page num="05" eyebrow={lang === 'tr' ? 'Şifre' : 'Password'} title={lang === 'tr' ? 'Yeni şifre' : 'Choose a new'} italic={lang === 'tr' ? 'belirleyin.' : 'password.'}>
      {done ? (
        <div className="col gap-3" style={{ maxWidth: 520 }}>
          <p className="display display-md" style={{ margin: 0 }}>{lang === 'tr' ? 'Şifreniz güncellendi.' : 'Password updated.'}</p>
          <p className="text-muted" style={{ margin: 0 }}>
            {lang === 'tr' ? 'Güvenlik için tüm oturumlar kapatıldı. Yeni şifrenizle giriş yapın.' : 'All sessions were signed out for safety. Sign in with your new password.'}
          </p>
          <button className="btn btn-primary" style={{ alignSelf: 'flex-start' }} onClick={() => navigate('/login')}>{lang === 'tr' ? 'Giriş yap' : 'Sign in'}</button>
        </div>
      ) : (
        <form
          className="col gap-4"
          style={{ maxWidth: 460 }}
          onSubmit={async (e) => {
            e.preventDefault();
            if (password !== confirm) { setError(lang === 'tr' ? 'Şifreler eşleşmiyor.' : 'Passwords do not match.'); return; }
            setBusy(true); setError('');
            try {
              await auth.resetPassword(token, password);
              setDone(true);
            } catch (err) {
              setError(err instanceof Error ? err.message : 'failed');
            } finally {
              setBusy(false);
            }
          }}
        >
          {!token && <span className="mono">⚠ {lang === 'tr' ? 'Sıfırlama bağlantısı eksik veya bozuk.' : 'The reset link is missing or malformed.'}</span>}
          {error && <span className="mono">⚠ {error}</span>}
          <Field label={lang === 'tr' ? 'Yeni şifre (en az 8 karakter)' : 'New password (min 8 characters)'}>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} />
          </Field>
          <Field label={lang === 'tr' ? 'Yeni şifre (tekrar)' : 'New password (again)'}>
            <Input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required minLength={8} />
          </Field>
          <button className="btn btn-primary" type="submit" disabled={busy || !token}>{busy ? '…' : (lang === 'tr' ? 'Şifreyi güncelle' : 'Update password')}</button>
        </form>
      )}
    </Page>
  );
}

export function VerifyEmail() {
  const { lang } = useLang();
  const { refresh } = useAuth();
  const token = new URLSearchParams(window.location.search).get('token') ?? '';
  const [state, setState] = useState<'working' | 'ok' | 'bad'>('working');
  useEffect(() => {
    if (!token) { setState('bad'); return; }
    auth.verifyEmail(token).then(() => { setState('ok'); refresh(); }).catch(() => setState('bad'));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
  return (
    <Page num="06" eyebrow={lang === 'tr' ? 'Doğrulama' : 'Verification'} title="Email" italic={lang === 'tr' ? 'doğrulama.' : 'verification.'}>
      <div className="col gap-3" style={{ maxWidth: 520 }}>
        {state === 'working' && <p className="text-muted">{lang === 'tr' ? 'Doğrulanıyor…' : 'Verifying…'}</p>}
        {state === 'ok' && (
          <>
            <p className="display display-md" style={{ margin: 0 }}>✓ {lang === 'tr' ? 'E-posta doğrulandı.' : 'Email verified.'}</p>
            <Link to="/" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>{lang === 'tr' ? 'Ana sayfa' : 'Go home'}</Link>
          </>
        )}
        {state === 'bad' && (
          <>
            <p className="display display-md" style={{ margin: 0 }}>{lang === 'tr' ? 'Bağlantı geçersiz veya süresi dolmuş.' : 'This link is invalid or expired.'}</p>
            <p className="text-muted" style={{ margin: 0 }}>
              {lang === 'tr' ? 'Giriş yaptıktan sonra profilinizden yeni bir doğrulama e-postası isteyebilirsiniz.' : 'Sign in and request a fresh verification email from your profile.'}
            </p>
            <Link to="/login" className="btn btn-ghost" style={{ alignSelf: 'flex-start' }}>{lang === 'tr' ? 'Giriş yap' : 'Sign in'}</Link>
          </>
        )}
      </div>
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
