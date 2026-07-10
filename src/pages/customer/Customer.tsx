import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '../../components/DashboardLayout';
import { Field, Input, Textarea, Select, ChoiceGroup, UploadImage } from '../../components/Form';
import { StatsCard } from '../../components/Cards';
import { Empty, Loading, ErrorNote } from '../../components/Empty';
import { useLang } from '../../i18n/LangContext';
import { useAuth } from '../../auth/AuthContext';
import { useReveal } from '../../hooks/useReveal';
import { STYLES, CITIES, PLACEMENTS, INK_COLORS, taxonomyLabel } from '../../data/mock';
import { fileToUpload } from '../../data/uploads';
import {
  dashboard, requests, offers, messages, reviews, notifications, auth as authApi,
  type ApiRequest, type ApiOffer, type ApiMessage, type CustomerDashboard,
} from '../../lib/api';

/**
 * Customer dashboard — every page reads only the signed-in customer's real
 * rows from the API. New accounts see honest empty states, never samples.
 */

function useLoad<T>(fn: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState('');
  const load = useCallback(() => {
    fn().then(d => { setData(d); setError(''); }).catch(e => setError(e instanceof Error ? e.message : 'failed'));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { load(); }, [load]);
  return { data, error, reload: load };
}

function SectionTitle({ num, label, action }: { num: string; label: string; action?: React.ReactNode }) {
  return (
    <div className="row between center" style={{ margin: '40px 0 16px', borderBottom: '1px solid var(--hairline)', paddingBottom: 10 }}>
      <span className="mono text-muted">{num} · {label}</span>
      {action}
    </div>
  );
}

const STATUS_LABEL: Record<string, { en: string; tr: string }> = {
  open: { en: 'Open', tr: 'Açık' },
  booked: { en: 'Booked', tr: 'Rezerve' },
  completed: { en: 'Completed', tr: 'Tamamlandı' },
  cancelled: { en: 'Cancelled', tr: 'İptal' },
  sent: { en: 'Pending', tr: 'Bekliyor' },
  accepted: { en: 'Accepted', tr: 'Kabul edildi' },
  rejected: { en: 'Rejected', tr: 'Reddedildi' },
};

function RequestRowCard({ r, lang, onCancel }: { r: ApiRequest; lang: string; onCancel?: (id: string) => void }) {
  return (
    <article className="card card-pad col gap-2">
      <div className="row between center">
        <strong>{r.title}</strong>
        <span className="tag tag-soft">{STATUS_LABEL[r.status]?.[lang as 'en' | 'tr'] ?? r.status}</span>
      </div>
      <span className="mono text-muted" style={{ fontSize: 11 }}>
        {r.style} · {taxonomyLabel(PLACEMENTS, r.placement, lang as 'en' | 'tr')} · {r.size}{r.city ? ` · ${r.city}` : ''} · {r.createdAt}
      </span>
      <p className="text-muted" style={{ margin: 0, fontSize: 14 }}>{r.description.slice(0, 160)}{r.description.length > 160 ? '…' : ''}</p>
      <div className="row between center">
        <span className="mono">{r.offerCount} {lang === 'tr' ? 'teklif' : 'offers'}</span>
        {r.status === 'open' && onCancel && (
          <button className="mono text-muted" onClick={() => onCancel(r.id)}>{lang === 'tr' ? 'İptal et' : 'Cancel'}</button>
        )}
      </div>
    </article>
  );
}

function OfferRowCard({ o, lang, onAct, busy }: { o: ApiOffer; lang: string; onAct?: (id: string, a: 'accept' | 'reject') => void; busy?: string }) {
  return (
    <article className="card card-pad col gap-2">
      <div className="row between center">
        <strong>{o.artistName}</strong>
        <span className="tag tag-soft">{STATUS_LABEL[o.status]?.[lang as 'en' | 'tr'] ?? o.status}</span>
      </div>
      <span className="mono text-muted" style={{ fontSize: 11 }}>{o.requestTitle} · {o.createdAt}</span>
      <p className="text-muted" style={{ margin: 0, fontSize: 14 }}>{o.message}</p>
      <div className="row between center">
        <span className="display" style={{ fontSize: 22 }}>₺{o.price.toLocaleString()}</span>
        {o.status === 'sent' && onAct && (
          <div className="row gap-2">
            <button className="btn btn-sm btn-accent" disabled={busy === o.id} onClick={() => onAct(o.id, 'accept')}>{lang === 'tr' ? 'Kabul et' : 'Accept'}</button>
            <button className="btn btn-sm" disabled={busy === o.id} onClick={() => onAct(o.id, 'reject')}>{lang === 'tr' ? 'Reddet' : 'Reject'}</button>
          </div>
        )}
      </div>
    </article>
  );
}

/* ---------- Home ---------- */
export function CustomerHome() {
  useReveal();
  const { lang, t } = useLang();
  const { user } = useAuth();
  const { data, error } = useLoad(() => dashboard.get() as Promise<CustomerDashboard>);
  return (
    <DashboardLayout
      scope="customer"
      title={lang === 'tr' ? `Hoş geldin, ${user?.name ?? ''}.` : `Welcome, ${user?.name ?? ''}.`}
      subtitle={lang === 'tr' ? 'İstekleriniz, teklifler ve randevular — yalnızca gerçek veriler.' : 'Your requests, offers and appointments — real data only.'}
    >
      {error && <ErrorNote message={error} />}
      {!data && !error && <Loading />}
      {data && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 14, marginBottom: 32 }}>
            <StatsCard label={lang === 'tr' ? 'Aktif istek' : 'Active requests'} value={String(data.stats.activeRequests)} />
            <StatsCard label={lang === 'tr' ? 'Açık teklif' : 'Open offers'} value={String(data.stats.openOffers)} />
            <StatsCard label={lang === 'tr' ? 'Yaklaşan' : 'Upcoming'} value={String(data.stats.upcoming)} />
            <StatsCard label={lang === 'tr' ? 'Tamamlanan' : 'Completed'} value={String(data.stats.completed)} />
          </div>

          <SectionTitle num="A1" label={lang === 'tr' ? 'İsteklerim' : 'My requests'} action={<Link to="/dashboard/requests" className="mono">{t('common.viewAll')} →</Link>} />
          {data.recentRequests.length === 0 ? (
            <Empty
              title={lang === 'tr' ? 'Henüz istek yok' : 'No requests yet'}
              body={lang === 'tr' ? 'İlk dövme isteğinizi oluşturun; sanatçılar teklif göndersin.' : 'Create your first tattoo request and let artists send offers.'}
              cta={lang === 'tr' ? 'İstek oluştur' : 'Create a request'}
              to="/dashboard/create-request"
            />
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
              {data.recentRequests.slice(0, 2).map(r => <RequestRowCard key={r.id} r={r} lang={lang} />)}
            </div>
          )}

          <SectionTitle num="A2" label={lang === 'tr' ? 'Son teklifler' : 'Latest offers'} action={<Link to="/dashboard/offers" className="mono">{t('common.viewAll')} →</Link>} />
          {data.recentOffers.length === 0 ? (
            <Empty title={lang === 'tr' ? 'Henüz teklif yok' : 'No offers yet'} body={lang === 'tr' ? 'İsteğiniz yayına girince teklifler burada listelenir.' : 'Offers appear here once artists respond to your requests.'} />
          ) : (
            <div className="col gap-3">
              {data.recentOffers.slice(0, 3).map(o => <OfferRowCard key={o.id} o={o} lang={lang} />)}
            </div>
          )}
        </>
      )}
    </DashboardLayout>
  );
}

/* ---------- Create request ---------- */
const SIZES = ['xs', 'sm', 'md', 'lg', 'xl'];

export function CreateRequest() {
  useReveal();
  const { lang } = useLang();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [style, setStyle] = useState<string>(STYLES[0].key);
  const [placement, setPlacement] = useState('forearm');
  const [size, setSize] = useState('md');
  const [color, setColor] = useState('black');
  const [city, setCity] = useState(CITIES[0]);
  const [budgetMin, setBudgetMin] = useState('');
  const [budgetMax, setBudgetMax] = useState('');
  const [image, setImage] = useState<{ url: string; ratio: number } | null>(null);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');
  const ok = title.trim() && description.trim() && !busy;
  return (
    <DashboardLayout scope="customer" title={lang === 'tr' ? 'İstek oluştur' : 'Create a request'} subtitle={lang === 'tr' ? 'Fikrinizi anlatın; onaylı sanatçılar teklif göndersin.' : 'Describe the idea; verified artists reply with offers.'}>
      {done && (
        <div className="card card-pad" style={{ marginBottom: 20, borderColor: 'var(--ink)' }}>
          <span className="mono">✓ {lang === 'tr' ? 'İsteğiniz yayında — sanatçılar artık görebilir.' : 'Your request is live — artists can now see it.'}</span>
          {' '}<Link to="/dashboard/requests" className="mono" style={{ textDecoration: 'underline' }}>{lang === 'tr' ? 'İsteklerim' : 'My requests'}</Link>
        </div>
      )}
      {error && <div style={{ marginBottom: 20 }}><ErrorNote message={error} /></div>}
      <form
        className="col gap-4"
        style={{ maxWidth: 640 }}
        onSubmit={async (e) => {
          e.preventDefault();
          if (!ok) return;
          setBusy(true); setError('');
          try {
            await requests.create({
              title: title.trim(), description: description.trim(), style, placement, size, color, city,
              budgetMin: budgetMin ? Number(budgetMin) : undefined,
              budgetMax: budgetMax ? Number(budgetMax) : undefined,
              imageData: image?.url,
            });
            setDone(true);
            setTitle(''); setDescription(''); setImage(null); setBudgetMin(''); setBudgetMax('');
          } catch (err) {
            setError(err instanceof Error ? err.message : 'failed');
          } finally {
            setBusy(false);
          }
        }}
      >
        <Field label={lang === 'tr' ? 'Başlık' : 'Title'}>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder={lang === 'tr' ? 'Kol içi çizgisel çiçek' : 'Fine-line florals on the forearm'} required />
        </Field>
        <Field label={lang === 'tr' ? 'Fikriniz' : 'Describe your idea'}>
          <Textarea rows={4} value={description} onChange={(e) => setDescription(e.target.value)} required />
        </Field>
        <Field label={lang === 'tr' ? 'Stil' : 'Style'}>
          <ChoiceGroup value={style} onChange={setStyle} options={STYLES.map(s => ({ value: s.key, label: s[lang] }))} />
        </Field>
        <div className="row gap-3 wrap">
          <Field label={lang === 'tr' ? 'Bölge' : 'Placement'}>
            <Select value={placement} onChange={(e) => setPlacement(e.target.value)} options={PLACEMENTS.map(p => ({ value: p.key, label: p[lang] }))} />
          </Field>
          <Field label={lang === 'tr' ? 'Boyut' : 'Size'}>
            <Select value={size} onChange={(e) => setSize(e.target.value)} options={SIZES.map(s => ({ value: s, label: s.toUpperCase() }))} />
          </Field>
          <Field label={lang === 'tr' ? 'Renk' : 'Color'}>
            <Select value={color} onChange={(e) => setColor(e.target.value)} options={INK_COLORS.map(c => ({ value: c.key, label: c[lang] }))} />
          </Field>
          <Field label={lang === 'tr' ? 'Şehir' : 'City'}>
            <Select value={city} onChange={(e) => setCity(e.target.value)} options={CITIES.map(c => ({ value: c, label: c }))} />
          </Field>
        </div>
        <div className="row gap-3 wrap">
          <Field label={lang === 'tr' ? 'Bütçe (min ₺)' : 'Budget (min ₺)'}>
            <Input type="number" min={0} value={budgetMin} onChange={(e) => setBudgetMin(e.target.value)} />
          </Field>
          <Field label={lang === 'tr' ? 'Bütçe (max ₺)' : 'Budget (max ₺)'}>
            <Input type="number" min={0} value={budgetMax} onChange={(e) => setBudgetMax(e.target.value)} />
          </Field>
        </div>
        <Field label={lang === 'tr' ? 'Referans görsel (opsiyonel)' : 'Reference image (optional)'}>
          <UploadImage
            label={lang === 'tr' ? 'Görsel yükle' : 'Upload image'}
            preview={image?.url}
            onImage={(url, ratio) => setImage({ url, ratio })}
          />
        </Field>
        <div className="row gap-3" style={{ marginTop: 8 }}>
          <button className="btn btn-primary" type="submit" disabled={!ok}>
            {busy ? (lang === 'tr' ? 'Gönderiliyor…' : 'Publishing…') : (lang === 'tr' ? 'İsteği yayınla' : 'Publish request')}
          </button>
        </div>
      </form>
    </DashboardLayout>
  );
}

/* ---------- My requests ---------- */
export function MyRequests() {
  useReveal();
  const { lang } = useLang();
  const { data, error, reload } = useLoad(() => requests.list());
  return (
    <DashboardLayout scope="customer" title={lang === 'tr' ? 'İsteklerim' : 'My requests'} subtitle={lang === 'tr' ? 'Oluşturduğunuz tüm dövme istekleri.' : 'Every request you have created.'}>
      {error && <ErrorNote message={error} />}
      {!data && !error && <Loading />}
      {data && (data.length === 0 ? (
        <Empty
          title={lang === 'tr' ? 'Henüz istek yok' : 'No requests yet'}
          body={lang === 'tr' ? 'İlk isteğinizi oluşturun.' : 'Create your first request to get offers from artists.'}
          cta={lang === 'tr' ? 'İstek oluştur' : 'Create a request'}
          to="/dashboard/create-request"
        />
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
          {data.map(r => (
            <RequestRowCard key={r.id} r={r} lang={lang} onCancel={async (id) => { await requests.cancel(id); reload(); }} />
          ))}
        </div>
      ))}
    </DashboardLayout>
  );
}

/* ---------- Offers received ---------- */
export function OffersReceived() {
  useReveal();
  const { lang } = useLang();
  const { data, error, reload } = useLoad(() => offers.list());
  const [busy, setBusy] = useState('');
  const act = async (id: string, action: 'accept' | 'reject') => {
    setBusy(id);
    try { await offers.act(id, action); } finally { setBusy(''); reload(); }
  };
  return (
    <DashboardLayout scope="customer" title={lang === 'tr' ? 'Gelen teklifler' : 'Offers received'} subtitle={lang === 'tr' ? 'Sanatçıların isteklerinize gönderdiği gerçek teklifler.' : 'Real offers artists sent on your requests.'}>
      {error && <ErrorNote message={error} />}
      {!data && !error && <Loading />}
      {data && (data.length === 0 ? (
        <Empty title={lang === 'tr' ? 'Henüz teklif yok' : 'No offers yet'} body={lang === 'tr' ? 'Bir istek yayınlayın; teklifler burada toplanır.' : 'Publish a request — offers will collect here.'} cta={lang === 'tr' ? 'İstek oluştur' : 'Create a request'} to="/dashboard/create-request" />
      ) : (
        <div className="col gap-3">
          {data.map(o => <OfferRowCard key={o.id} o={o} lang={lang} onAct={act} busy={busy} />)}
        </div>
      ))}
    </DashboardLayout>
  );
}

/* ---------- Messages ---------- */
export function CustomerMessages() {
  return <MessagesPage scope="customer" />;
}

export function MessagesPage({ scope }: { scope: 'customer' | 'studio' }) {
  useReveal();
  const { lang } = useLang();
  const { user } = useAuth();
  const { data: threads, error } = useLoad(() => messages.threads());
  const [activeId, setActiveId] = useState<string>('');
  const [thread, setThread] = useState<ApiMessage[] | null>(null);
  const [text, setText] = useState('');
  const [busy, setBusy] = useState(false);
  const active = activeId || threads?.[0]?.peerId || '';
  useEffect(() => {
    if (!active) return;
    messages.thread(active).then(setThread).catch(() => setThread([]));
  }, [active]);
  const send = async () => {
    if (!text.trim() || !active) return;
    setBusy(true);
    try {
      await messages.send(active, text.trim());
      setText('');
      setThread(await messages.thread(active));
    } finally {
      setBusy(false);
    }
  };
  return (
    <DashboardLayout scope={scope} title={lang === 'tr' ? 'Mesajlar' : 'Messages'}>
      {error && <ErrorNote message={error} />}
      {!threads && !error && <Loading />}
      {threads && (threads.length === 0 ? (
        <Empty
          title={lang === 'tr' ? 'Henüz mesaj yok' : 'No messages yet'}
          body={lang === 'tr' ? 'Bir teklif alışverişi başlayınca mesajlaşma açılır.' : 'Messaging opens once an offer exists between you and the other side.'}
        />
      ) : (
        <div className="msg-grid" style={{ gap: 0, border: '1px solid var(--hairline)' }}>
          <div className="col" style={{ borderRight: '1px solid var(--hairline)', maxHeight: 580, overflowY: 'auto' }}>
            {threads.map(th => (
              <button key={th.peerId} onClick={() => setActiveId(th.peerId)} style={{ display: 'block', width: '100%', textAlign: 'left' }}>
                <div className="col gap-1" style={{ padding: 14, borderBottom: '1px solid var(--hairline)', background: th.peerId === active ? 'var(--paper-warm)' : 'transparent' }}>
                  <strong style={{ fontSize: 14 }}>{th.peerName}</strong>
                  <span className="mono text-muted" style={{ fontSize: 11 }}>{th.lastText.slice(0, 42)}</span>
                </div>
              </button>
            ))}
          </div>
          <div className="col" style={{ minHeight: 420 }}>
            <div className="col gap-2" style={{ flex: 1, padding: 18, overflowY: 'auto', maxHeight: 460 }}>
              {(thread ?? []).map(m => (
                <div key={m.id} className="col" style={{ alignItems: m.fromId === user?.id ? 'flex-end' : 'flex-start' }}>
                  <span style={{
                    background: m.fromId === user?.id ? 'var(--ink)' : 'var(--paper-warm)',
                    color: m.fromId === user?.id ? 'var(--paper)' : 'var(--ink)',
                    padding: '8px 12px', maxWidth: '80%', fontSize: 14,
                  }}>{m.text}</span>
                </div>
              ))}
              {thread && thread.length === 0 && <span className="mono text-muted">{lang === 'tr' ? 'İlk mesajı yazın.' : 'Write the first message.'}</span>}
            </div>
            <div className="row gap-2" style={{ padding: 14, borderTop: '1px solid var(--hairline)' }}>
              <input
                className="input" style={{ flex: 1, border: '1px solid var(--hairline-strong)', padding: '10px 12px' }}
                placeholder={lang === 'tr' ? 'Mesaj yazın…' : 'Write a message…'}
                value={text} onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') send(); }}
              />
              <button className="btn btn-sm btn-accent" onClick={send} disabled={busy || !text.trim()}>{lang === 'tr' ? 'Gönder' : 'Send'}</button>
            </div>
          </div>
        </div>
      ))}
    </DashboardLayout>
  );
}

/* ---------- Notifications (real events from the API) ---------- */
export function CustomerNotifications() {
  return <NotificationsPage scope="customer" />;
}

export function NotificationsPage({ scope }: { scope: 'customer' | 'studio' }) {
  useReveal();
  const { lang } = useLang();
  const { data, error } = useLoad(() => notifications.list());
  return (
    <DashboardLayout scope={scope} title={lang === 'tr' ? 'Bildirimler' : 'Notifications'}>
      {error && <ErrorNote message={error} />}
      {!data && !error && <Loading />}
      {data && (data.length === 0 ? (
        <Empty title={lang === 'tr' ? 'Bildirim yok' : 'Nothing yet'} body={lang === 'tr' ? 'Teklif ve mesaj hareketleri burada görünür.' : 'Offer and message activity shows up here.'} />
      ) : (
        <div className="col" style={{ border: '1px solid var(--hairline)' }}>
          {data.map(n => (
            <div key={n.id} className="row between center" style={{ padding: 16, borderBottom: '1px solid var(--hairline)', gap: 16 }}>
              <div className="col gap-1" style={{ minWidth: 0 }}>
                <strong style={{ fontSize: 14 }}>{n.title}</strong>
                <span className="text-muted" style={{ fontSize: 13 }}>{n.body}</span>
              </div>
              <span className="tag tag-soft" style={{ flexShrink: 0 }}>{n.kind}</span>
            </div>
          ))}
        </div>
      ))}
    </DashboardLayout>
  );
}

/* ---------- Favorites (feature not live yet — honest empty state) ---------- */
export function CustomerFavorites() {
  useReveal();
  const { lang } = useLang();
  return (
    <DashboardLayout scope="customer" title={lang === 'tr' ? 'Favoriler' : 'Favorites'}>
      <Empty
        title={lang === 'tr' ? 'Henüz favori yok' : 'No favorites yet'}
        body={lang === 'tr' ? 'Tasarımları keşfedin; favorileriniz burada toplanacak.' : 'Browse designs — pieces you save will collect here.'}
        cta={lang === 'tr' ? 'Tasarımları keşfet' : 'Browse designs'}
        to="/designs"
      />
    </DashboardLayout>
  );
}

/* ---------- Appointments (accepted offers) ---------- */
export function CustomerAppointments() {
  useReveal();
  const { lang } = useLang();
  const { data, error } = useLoad(() => offers.list());
  const upcoming = (data ?? []).filter(o => o.status === 'accepted');
  return (
    <DashboardLayout scope="customer" title={lang === 'tr' ? 'Randevular' : 'Appointments'} subtitle={lang === 'tr' ? 'Kabul edilen teklifler.' : 'Accepted offers become appointments.'}>
      {error && <ErrorNote message={error} />}
      {!data && !error && <Loading />}
      {data && (upcoming.length === 0 ? (
        <Empty title={lang === 'tr' ? 'Randevu yok' : 'No appointments yet'} body={lang === 'tr' ? 'Bir teklifi kabul edince randevunuz burada görünür.' : 'Accept an offer and it appears here.'} />
      ) : (
        <div className="col gap-3">
          {upcoming.map(o => (
            <article key={o.id} className="card card-pad row between center">
              <div className="col gap-1">
                <strong>{o.requestTitle}</strong>
                <span className="mono text-muted" style={{ fontSize: 11 }}>{o.artistName}{o.appointmentAt ? ` · ${o.appointmentAt}` : ''}</span>
              </div>
              <span className="display" style={{ fontSize: 20 }}>₺{o.price.toLocaleString()}</span>
            </article>
          ))}
        </div>
      ))}
    </DashboardLayout>
  );
}

/* ---------- Tracking ---------- */
export function CustomerTracking() {
  useReveal();
  const { lang } = useLang();
  const { data, error } = useLoad(() => offers.list());
  const active = (data ?? []).filter(o => o.status === 'accepted' || o.status === 'completed');
  return (
    <DashboardLayout scope="customer" title={lang === 'tr' ? 'Sipariş takibi' : 'Order tracking'}>
      {error && <ErrorNote message={error} />}
      {!data && !error && <Loading />}
      {data && (active.length === 0 ? (
        <Empty title={lang === 'tr' ? 'Takip edilecek iş yok' : 'Nothing to track yet'} body={lang === 'tr' ? 'Kabul edilmiş işleriniz burada izlenir.' : 'Accepted jobs are tracked here.'} />
      ) : (
        <div className="col gap-3">
          {active.map(o => (
            <article key={o.id} className="card card-pad col gap-2">
              <div className="row between center">
                <strong>{o.requestTitle}</strong>
                <span className="tag tag-soft">{STATUS_LABEL[o.status]?.[lang as 'en' | 'tr'] ?? o.status}</span>
              </div>
              <div className="row gap-2 center">
                {['sent', 'accepted', 'completed'].map((step, i) => {
                  const reached = step === 'sent' || (step === 'accepted') || (step === 'completed' && o.status === 'completed');
                  return (
                    <div key={step} className="row gap-2 center">
                      {i > 0 && <span style={{ width: 28, height: 1, background: 'var(--hairline-strong)' }} />}
                      <span className="mono" style={{ fontSize: 10, opacity: reached ? 1 : 0.4 }}>{step.toUpperCase()}</span>
                    </div>
                  );
                })}
              </div>
            </article>
          ))}
        </div>
      ))}
    </DashboardLayout>
  );
}

/* ---------- Reviews ---------- */
export function CustomerReviews() {
  useReveal();
  const { lang } = useLang();
  const { data: myOffers, reload: reloadOffers } = useLoad(() => offers.list());
  const { data: myReviews, error, reload } = useLoad(() => reviews.mine());
  const reviewed = new Set((myReviews ?? []).map(r => r.offerId));
  const reviewable = (myOffers ?? []).filter(o => o.status === 'completed' && !reviewed.has(o.id));
  const [target, setTarget] = useState<ApiOffer | null>(null);
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  const [busy, setBusy] = useState(false);
  return (
    <DashboardLayout scope="customer" title={lang === 'tr' ? 'Yorumlarım' : 'My reviews'} subtitle={lang === 'tr' ? 'Yalnızca tamamlanmış işler yorumlanabilir.' : 'Only completed jobs can be reviewed.'}>
      {error && <ErrorNote message={error} />}
      {reviewable.length > 0 && (
        <div className="card card-pad col gap-3" style={{ marginBottom: 28 }}>
          <span className="mono text-muted">{lang === 'tr' ? 'Yorum bekleyen işler' : 'Awaiting your review'}</span>
          {reviewable.map(o => (
            <div key={o.id} className="row between center">
              <span>{o.requestTitle} — {o.artistName}</span>
              <button className="btn btn-sm" onClick={() => setTarget(o)}>{lang === 'tr' ? 'Yorumla' : 'Review'}</button>
            </div>
          ))}
          {target && (
            <form
              className="col gap-3"
              style={{ borderTop: '1px solid var(--hairline)', paddingTop: 16 }}
              onSubmit={async (e) => {
                e.preventDefault();
                if (!text.trim()) return;
                setBusy(true);
                try {
                  await reviews.create({ offerId: target.id, rating, text: text.trim() });
                  setTarget(null); setText(''); setRating(5);
                  reload(); reloadOffers();
                } finally {
                  setBusy(false);
                }
              }}
            >
              <span className="mono">{target.artistName} · {target.requestTitle}</span>
              <ChoiceGroup value={String(rating)} onChange={(v) => setRating(Number(v))} options={[1, 2, 3, 4, 5].map(n => ({ value: String(n), label: '★'.repeat(n) }))} />
              <Textarea rows={3} value={text} onChange={(e) => setText(e.target.value)} placeholder={lang === 'tr' ? 'Deneyiminiz…' : 'How was it…'} />
              <div className="row gap-2">
                <button className="btn btn-sm btn-accent" type="submit" disabled={busy || !text.trim()}>{lang === 'tr' ? 'Gönder' : 'Submit'}</button>
                <button className="btn btn-sm" type="button" onClick={() => setTarget(null)}>{lang === 'tr' ? 'Vazgeç' : 'Cancel'}</button>
              </div>
            </form>
          )}
        </div>
      )}
      {!myReviews && !error && <Loading />}
      {myReviews && (myReviews.length === 0 ? (
        <Empty title={lang === 'tr' ? 'Henüz yorum yok' : 'No reviews yet'} body={lang === 'tr' ? 'Tamamlanan ilk işinizden sonra yorum bırakabilirsiniz.' : 'After your first completed job you can leave a review.'} />
      ) : (
        <div className="col gap-3">
          {myReviews.map(r => (
            <article key={r.id} className="card card-pad col gap-2">
              <div className="row between center">
                <strong>{r.requestTitle}</strong>
                <span className="mono">{'★'.repeat(r.rating)}</span>
              </div>
              <p className="text-muted" style={{ margin: 0, fontSize: 14 }}>{r.text}</p>
              <span className="mono text-muted" style={{ fontSize: 11 }}>{r.createdAt}</span>
            </article>
          ))}
        </div>
      ))}
    </DashboardLayout>
  );
}

/* ---------- Profile ---------- */
export function VerificationRow() {
  const { lang } = useLang();
  const { user } = useAuth();
  const [sent, setSent] = useState(false);
  if (!user) return null;
  return (
    <div className="row between center">
      <span className="mono text-muted">{lang === 'tr' ? 'E-posta durumu' : 'Email status'}</span>
      {user.emailVerified ? (
        <span className="tag tag-soft">✓ {lang === 'tr' ? 'Doğrulandı' : 'Verified'}</span>
      ) : sent ? (
        <span className="mono text-muted">{lang === 'tr' ? 'Gönderildi — gelen kutunuza bakın' : 'Sent — check your inbox'}</span>
      ) : (
        <button className="btn btn-sm" onClick={async () => { try { await authApi.resendVerification(); } catch { /* soft */ } setSent(true); }}>
          {lang === 'tr' ? 'Doğrulama e-postası gönder' : 'Send verification email'}
        </button>
      )}
    </div>
  );
}

export function CustomerProfile() {
  useReveal();
  const { lang } = useLang();
  const { user } = useAuth();
  return (
    <DashboardLayout scope="customer" title={lang === 'tr' ? 'Profilim' : 'My profile'}>
      <div className="card card-pad col gap-3" style={{ maxWidth: 520 }}>
        <div className="row between center">
          <span className="mono text-muted">{lang === 'tr' ? 'Ad' : 'Name'}</span>
          <strong>{user?.name}</strong>
        </div>
        <div className="row between center">
          <span className="mono text-muted">Email</span>
          <span>{user?.email}</span>
        </div>
        <VerificationRow />
        <div className="row between center">
          <span className="mono text-muted">{lang === 'tr' ? 'Şehir' : 'City'}</span>
          <span>{user?.city ?? '—'}</span>
        </div>
        <div className="row between center">
          <span className="mono text-muted">{lang === 'tr' ? 'Üyelik' : 'Member since'}</span>
          <span>{user?.createdAt}</span>
        </div>
      </div>
    </DashboardLayout>
  );
}
