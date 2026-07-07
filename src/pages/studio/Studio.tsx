import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '../../components/DashboardLayout';
import { Field, Input, Textarea, Select, ChoiceGroup, UploadImage } from '../../components/Form';
import { StatsCard } from '../../components/Cards';
import { Empty, Loading, ErrorNote } from '../../components/Empty';
import { useLang } from '../../i18n/LangContext';
import { useAuth } from '../../auth/AuthContext';
import { useReveal } from '../../hooks/useReveal';
import { STYLES } from '../../data/mock';
import {
  dashboard, requests, offers, reviews, portfolio,
  type ApiRequest, type ApiOffer, type ArtistDashboard, type ApiPortfolioItem,
} from '../../lib/api';
import { MessagesPage } from '../customer/Customer';

/**
 * Artist / studio dashboard — every number and list is the signed-in
 * artist's real data. A fresh account sees zeros and empty states.
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
  sent: { en: 'Pending', tr: 'Bekliyor' },
  accepted: { en: 'Accepted', tr: 'Kabul edildi' },
  rejected: { en: 'Rejected', tr: 'Reddedildi' },
  completed: { en: 'Completed', tr: 'Tamamlandı' },
  open: { en: 'Open', tr: 'Açık' },
  booked: { en: 'Booked', tr: 'Rezerve' },
};

function OpenRequestCard({ r, lang }: { r: ApiRequest; lang: string }) {
  return (
    <article className="card card-pad col gap-2">
      <div className="row between center">
        <strong>{r.title}</strong>
        <span className="mono text-muted" style={{ fontSize: 11 }}>{r.createdAt}</span>
      </div>
      <span className="mono text-muted" style={{ fontSize: 11 }}>
        {r.customerName} · {r.style} · {r.placement} · {r.size}{r.city ? ` · ${r.city}` : ''}
      </span>
      <p className="text-muted" style={{ margin: 0, fontSize: 14 }}>{r.description.slice(0, 140)}{r.description.length > 140 ? '…' : ''}</p>
      {r.referenceUrl && <img src={r.referenceUrl} alt="" style={{ width: '100%', maxHeight: 220, objectFit: 'cover' }} />}
      <div className="row between center">
        <span className="mono">
          {r.budgetMin != null || r.budgetMax != null
            ? `₺${(r.budgetMin ?? 0).toLocaleString()} – ₺${(r.budgetMax ?? 0).toLocaleString()}`
            : (lang === 'tr' ? 'Bütçe belirtilmemiş' : 'No budget set')}
          {' · '}{r.offerCount} {lang === 'tr' ? 'teklif' : 'offers'}
        </span>
        <Link to={`/studio/give-offer?request=${r.id}`} className="btn btn-sm btn-accent">{lang === 'tr' ? 'Teklif ver' : 'Send offer'}</Link>
      </div>
    </article>
  );
}

/* ---------- Home ---------- */
export function StudioHome() {
  useReveal();
  const { lang, t } = useLang();
  const { user } = useAuth();
  const { data, error } = useLoad(() => dashboard.get() as Promise<ArtistDashboard>);
  return (
    <DashboardLayout
      scope="studio"
      title={lang === 'tr' ? `Hoş geldin, ${user?.name ?? ''}.` : `Welcome, ${user?.name ?? ''}.`}
      subtitle={lang === 'tr' ? 'Açık istekler ve işleriniz — yalnızca gerçek veriler.' : 'Open briefs and your work — real data only.'}
    >
      {error && <ErrorNote message={error} />}
      {!data && !error && <Loading />}
      {data && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 36 }}>
            <StatsCard label={lang === 'tr' ? 'Açık istek' : 'Open briefs'} value={String(data.stats.openRequests)} />
            <StatsCard label={lang === 'tr' ? 'Gönderilen teklif' : 'Offers sent'} value={String(data.stats.offersSent)} />
            <StatsCard label={lang === 'tr' ? 'Rezerve iş' : 'Booked jobs'} value={String(data.stats.jobsBooked)} />
            <StatsCard label={lang === 'tr' ? 'Tamamlanan' : 'Completed'} value={String(data.stats.jobsCompleted)} />
          </div>

          <SectionTitle num="B1" label={lang === 'tr' ? 'Açık istekler' : 'Open briefs'} action={<Link to="/studio/give-offer" className="mono">{t('common.viewAll')} →</Link>} />
          {data.recentRequests.length === 0 ? (
            <Empty title={lang === 'tr' ? 'Şu an açık istek yok' : 'No open briefs right now'} body={lang === 'tr' ? 'Müşteriler istek oluşturdukça burada görünür.' : 'Customer requests appear here as they are published.'} />
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
              {data.recentRequests.slice(0, 2).map(r => <OpenRequestCard key={r.id} r={r} lang={lang} />)}
            </div>
          )}

          <SectionTitle num="B2" label={lang === 'tr' ? 'Son tekliflerim' : 'My latest offers'} action={<Link to="/studio/offers" className="mono">{t('common.viewAll')} →</Link>} />
          {data.recentOffers.length === 0 ? (
            <Empty title={lang === 'tr' ? 'Henüz teklif göndermediniz' : 'No offers sent yet'} body={lang === 'tr' ? 'Açık isteklere teklif göndererek başlayın.' : 'Start by sending an offer on an open brief.'} cta={lang === 'tr' ? 'İstekleri gör' : 'See open briefs'} to="/studio/give-offer" />
          ) : (
            <div className="col gap-3">
              {data.recentOffers.slice(0, 3).map(o => (
                <article key={o.id} className="card card-pad row between center">
                  <div className="col gap-1">
                    <strong>{o.requestTitle}</strong>
                    <span className="mono text-muted" style={{ fontSize: 11 }}>{o.customerName} · ₺{o.price.toLocaleString()}</span>
                  </div>
                  <span className="tag tag-soft">{STATUS_LABEL[o.status]?.[lang as 'en' | 'tr'] ?? o.status}</span>
                </article>
              ))}
            </div>
          )}
        </>
      )}
    </DashboardLayout>
  );
}

/* ---------- My tattoos (portfolio) ---------- */
export function MyTattoos() {
  useReveal();
  const { lang } = useLang();
  const { data, error } = useLoad(() => portfolio.mine());
  return (
    <DashboardLayout scope="studio" title={lang === 'tr' ? 'Dövmelerim' : 'My tattoos'} subtitle={lang === 'tr' ? 'Portföyünüz — onaylananlar ana sayfada görünür.' : 'Your portfolio — approved pieces show on the landing feed.'}>
      {error && <ErrorNote message={error} />}
      {!data && !error && <Loading />}
      {data && (data.length === 0 ? (
        <Empty
          title={lang === 'tr' ? 'Portföy boş' : 'No portfolio items yet'}
          body={lang === 'tr' ? 'İlk çalışmanızı yükleyin; onaydan sonra ana sayfada yayınlanır.' : 'Upload your first piece — after review it goes live on the landing feed.'}
          cta={lang === 'tr' ? 'Dövme ekle' : 'Add a tattoo'}
          to="/studio/add-tattoo"
        />
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
          {data.map((d: ApiPortfolioItem) => (
            <article key={d.id} className="card" style={{ overflow: 'hidden' }}>
              <img src={d.imageUrl} alt={d.title} style={{ width: '100%', aspectRatio: d.imageRatio || 1, objectFit: 'cover', display: 'block' }} />
              <div className="card-pad col gap-1">
                <div className="row between center">
                  <strong>{d.title}</strong>
                  <span className="tag tag-soft">{d.status === 'pending' ? (lang === 'tr' ? 'İncelemede' : 'In review') : (lang === 'tr' ? 'Yayında' : 'Live')}</span>
                </div>
                <span className="mono text-muted" style={{ fontSize: 11 }}>{d.style} · {d.createdAt}</span>
              </div>
            </article>
          ))}
        </div>
      ))}
    </DashboardLayout>
  );
}

/* ---------- Add tattoo ---------- */
export function AddTattoo() {
  useReveal();
  const { lang } = useLang();
  const { user } = useAuth();
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [title, setTitle] = useState('');
  const [style, setStyle] = useState<string>(STYLES[0].key);
  const [image, setImage] = useState<{ url: string; ratio: number } | null>(null);
  const [notice, setNotice] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const ok = title.trim().length > 0 && !!image && !busy;
  return (
    <DashboardLayout scope="studio" title={lang === 'tr' ? 'Dövme ekle' : 'Add tattoo'} subtitle={lang === 'tr' ? 'Portföyünüze yeni bir parça ekleyin — incelemeden sonra ana sayfada.' : 'Add a new piece — it reaches the landing feed after review.'}>
      <div className="split">
        <form
          className="col"
          onSubmit={async (e) => {
            e.preventDefault();
            if (!ok || !image) return;
            setBusy(true); setError('');
            try {
              await portfolio.publish({ title: title.trim(), style, tags, imageData: image.url, imageRatio: image.ratio });
              setNotice(true); setTitle(''); setImage(null); setTags([]);
            } catch (err) {
              setError(err instanceof Error ? err.message : 'failed');
            } finally {
              setBusy(false);
            }
          }}
        >
          {notice && (
            <div className="card card-pad" style={{ marginBottom: 16, borderColor: 'var(--ink)' }}>
              <span className="mono">✓ {lang === 'tr' ? 'Gönderildi — incelendikten sonra yayınlanır.' : 'Submitted — appears in the feed once reviewed.'}</span>
            </div>
          )}
          {error && <div style={{ marginBottom: 16 }}><ErrorNote message={error} /></div>}
          <Field label={lang === 'tr' ? 'Görsel' : 'Image'}>
            <UploadImage
              label={lang === 'tr' ? 'Görsel yükle' : 'Upload image'}
              preview={image?.url}
              onImage={(url, ratio) => { setImage({ url, ratio }); setNotice(false); }}
            />
          </Field>
          <Field label={lang === 'tr' ? 'Başlık' : 'Title'}>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </Field>
          <Field label={lang === 'tr' ? 'Stil' : 'Style'}>
            <Select options={STYLES.map(s => ({ value: s.key, label: s[lang] }))} value={style} onChange={(e) => setStyle(e.target.value)} />
          </Field>
          <Field label={lang === 'tr' ? 'Etiketler' : 'Tags'}>
            <div className="row wrap gap-2" style={{ marginBottom: 8 }}>
              {tags.map(t => (
                <span key={t} className="tag" onClick={() => setTags(tags.filter(x => x !== t))} style={{ cursor: 'pointer' }}>{t} ×</span>
              ))}
            </div>
            <Input
              placeholder={lang === 'tr' ? 'Etiket girin ve Enter' : 'Type a tag and press Enter'}
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && tagInput.trim()) {
                  e.preventDefault();
                  setTags([...tags, tagInput.trim()]);
                  setTagInput('');
                }
              }}
            />
          </Field>
          <div className="row gap-3" style={{ marginTop: 12 }}>
            <button className="btn btn-accent" type="submit" disabled={!ok}>
              {busy ? (lang === 'tr' ? 'Yükleniyor…' : 'Uploading…') : (lang === 'tr' ? 'Yayınla' : 'Publish')}
            </button>
          </div>
        </form>
        <aside className="card col">
          {image && <img src={image.url} alt="" style={{ width: '100%', aspectRatio: image.ratio, objectFit: 'cover', display: 'block' }} />}
          <div className="card-pad col gap-2">
            <span className="mono text-muted">{lang === 'tr' ? 'Önizleme' : 'Preview'}</span>
            <h3 className="display" style={{ fontSize: 22, margin: 0 }}>{title.trim() || '—'}</h3>
            <span className="mono text-muted">{user?.name}</span>
            <div className="row wrap gap-2">{tags.map(t => <span key={t} className="tag tag-soft">{t}</span>)}</div>
          </div>
        </aside>
      </div>
    </DashboardLayout>
  );
}

/* ---------- Give offer ---------- */
export function GiveOffer() {
  useReveal();
  const { lang } = useLang();
  const { data, error, reload } = useLoad(() => requests.list());
  const params = new URLSearchParams(window.location.search);
  const [requestId, setRequestId] = useState(params.get('request') ?? '');
  const [price, setPrice] = useState('');
  const [message, setMessage] = useState('');
  const [appointmentAt, setAppointmentAt] = useState('');
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState('');
  const selected = (data ?? []).find(r => r.id === requestId) ?? null;
  return (
    <DashboardLayout scope="studio" title={lang === 'tr' ? 'Teklif ver' : 'Send an offer'} subtitle={lang === 'tr' ? 'Açık müşteri istekleri — gerçek zamanlı.' : 'Open customer briefs — live.'}>
      {error && <ErrorNote message={error} />}
      {!data && !error && <Loading />}
      {data && (data.length === 0 ? (
        <Empty title={lang === 'tr' ? 'Şu an açık istek yok' : 'No open briefs right now'} body={lang === 'tr' ? 'Müşteriler istek yayınladıkça burada görünür.' : 'When customers publish requests they appear here.'} />
      ) : (
        <div className="split">
          <div className="col gap-3">
            {data.map(r => (
              <button key={r.id} onClick={() => { setRequestId(r.id); setDone(false); }} style={{ textAlign: 'left' }}>
                <div className="card card-pad col gap-1" style={{ borderColor: r.id === requestId ? 'var(--ink)' : undefined }}>
                  <div className="row between center">
                    <strong>{r.title}</strong>
                    <span className="mono text-muted" style={{ fontSize: 11 }}>{r.offerCount} {lang === 'tr' ? 'teklif' : 'offers'}</span>
                  </div>
                  <span className="mono text-muted" style={{ fontSize: 11 }}>{r.customerName} · {r.style} · {r.placement}{r.city ? ` · ${r.city}` : ''}</span>
                </div>
              </button>
            ))}
          </div>
          <div>
            {!selected ? (
              <Empty title={lang === 'tr' ? 'Bir istek seçin' : 'Select a brief'} body={lang === 'tr' ? 'Soldan bir istek seçerek teklif hazırlayın.' : 'Pick a brief on the left to draft your offer.'} />
            ) : (
              <form
                className="card card-pad col gap-4"
                onSubmit={async (e) => {
                  e.preventDefault();
                  setBusy(true); setErr('');
                  try {
                    await offers.create({ requestId: selected.id, price: Number(price), message: message.trim(), appointmentAt: appointmentAt || undefined });
                    setDone(true); setPrice(''); setMessage(''); setAppointmentAt('');
                    reload();
                  } catch (e2) {
                    setErr(e2 instanceof Error ? e2.message : 'failed');
                  } finally {
                    setBusy(false);
                  }
                }}
              >
                {done && <span className="mono">✓ {lang === 'tr' ? 'Teklif gönderildi.' : 'Offer sent.'}</span>}
                {err && <span className="mono">⚠ {err}</span>}
                <div className="col gap-1">
                  <strong>{selected.title}</strong>
                  <span className="mono text-muted" style={{ fontSize: 11 }}>{selected.customerName}</span>
                  <p className="text-muted" style={{ margin: '8px 0 0', fontSize: 14 }}>{selected.description}</p>
                  {selected.referenceUrl && <img src={selected.referenceUrl} alt="" style={{ width: '100%', maxHeight: 260, objectFit: 'cover', marginTop: 8 }} />}
                </div>
                <Field label={lang === 'tr' ? 'Fiyat (₺)' : 'Price (₺)'}>
                  <Input type="number" min={1} value={price} onChange={(e) => setPrice(e.target.value)} required />
                </Field>
                <Field label={lang === 'tr' ? 'Mesajınız' : 'Your message'}>
                  <Textarea rows={4} value={message} onChange={(e) => setMessage(e.target.value)} required />
                </Field>
                <Field label={lang === 'tr' ? 'Önerilen tarih (opsiyonel)' : 'Proposed date (optional)'}>
                  <Input type="date" value={appointmentAt} onChange={(e) => setAppointmentAt(e.target.value)} />
                </Field>
                <button className="btn btn-accent" type="submit" disabled={busy || !price || !message.trim()}>
                  {busy ? '…' : (lang === 'tr' ? 'Teklifi gönder' : 'Send offer')}
                </button>
              </form>
            )}
          </div>
        </div>
      ))}
    </DashboardLayout>
  );
}

/* ---------- My offers ---------- */
export function MyOffers() {
  useReveal();
  const { lang } = useLang();
  const { data, error, reload } = useLoad(() => offers.list());
  const [busy, setBusy] = useState('');
  return (
    <DashboardLayout scope="studio" title={lang === 'tr' ? 'Tekliflerim' : 'My offers'} subtitle={lang === 'tr' ? 'Gönderdiğiniz tüm teklifler ve durumları.' : 'Everything you sent, with live status.'}>
      {error && <ErrorNote message={error} />}
      {!data && !error && <Loading />}
      {data && (data.length === 0 ? (
        <Empty title={lang === 'tr' ? 'Henüz teklif yok' : 'No offers yet'} body={lang === 'tr' ? 'Açık isteklere teklif göndererek başlayın.' : 'Send your first offer on an open brief.'} cta={lang === 'tr' ? 'İstekleri gör' : 'See open briefs'} to="/studio/give-offer" />
      ) : (
        <div className="col gap-3">
          {data.map(o => (
            <article key={o.id} className="card card-pad col gap-2">
              <div className="row between center">
                <strong>{o.requestTitle}</strong>
                <span className="tag tag-soft">{STATUS_LABEL[o.status]?.[lang as 'en' | 'tr'] ?? o.status}</span>
              </div>
              <span className="mono text-muted" style={{ fontSize: 11 }}>{o.customerName} · {o.createdAt}{o.appointmentAt ? ` · ${o.appointmentAt}` : ''}</span>
              <div className="row between center">
                <span className="display" style={{ fontSize: 20 }}>₺{o.price.toLocaleString()}</span>
                {o.status === 'accepted' && (
                  <button
                    className="btn btn-sm btn-accent"
                    disabled={busy === o.id}
                    onClick={async () => { setBusy(o.id); try { await offers.act(o.id, 'complete'); } finally { setBusy(''); reload(); } }}
                  >
                    {lang === 'tr' ? 'Tamamlandı işaretle' : 'Mark completed'}
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>
      ))}
    </DashboardLayout>
  );
}

/* ---------- Tracking ---------- */
export function StudioTracking() {
  useReveal();
  const { lang } = useLang();
  const { data, error } = useLoad(() => offers.list());
  const active = (data ?? []).filter(o => o.status === 'accepted' || o.status === 'completed');
  return (
    <DashboardLayout scope="studio" title={lang === 'tr' ? 'İş takibi' : 'Job tracking'}>
      {error && <ErrorNote message={error} />}
      {!data && !error && <Loading />}
      {data && (active.length === 0 ? (
        <Empty title={lang === 'tr' ? 'Aktif iş yok' : 'No active jobs'} body={lang === 'tr' ? 'Kabul edilen teklifler burada izlenir.' : 'Accepted offers are tracked here.'} />
      ) : (
        <div className="col gap-3">
          {active.map(o => (
            <article key={o.id} className="card card-pad row between center">
              <div className="col gap-1">
                <strong>{o.requestTitle}</strong>
                <span className="mono text-muted" style={{ fontSize: 11 }}>{o.customerName} · ₺{o.price.toLocaleString()}</span>
              </div>
              <span className="tag tag-soft">{STATUS_LABEL[o.status]?.[lang as 'en' | 'tr'] ?? o.status}</span>
            </article>
          ))}
        </div>
      ))}
    </DashboardLayout>
  );
}

/* ---------- Calendar (accepted jobs by date) ---------- */
export function StudioCalendar() {
  useReveal();
  const { lang } = useLang();
  const { data, error } = useLoad(() => offers.list());
  const dated = (data ?? [])
    .filter(o => o.status === 'accepted' && o.appointmentAt)
    .sort((a, b) => (a.appointmentAt ?? '').localeCompare(b.appointmentAt ?? ''));
  return (
    <DashboardLayout scope="studio" title={lang === 'tr' ? 'Randevu takvimi' : 'Appointment calendar'}>
      {error && <ErrorNote message={error} />}
      {!data && !error && <Loading />}
      {data && (dated.length === 0 ? (
        <Empty title={lang === 'tr' ? 'Planlanmış randevu yok' : 'No scheduled appointments'} body={lang === 'tr' ? 'Tarih içeren kabul edilmiş teklifler burada sıralanır.' : 'Accepted offers with a date line up here.'} />
      ) : (
        <div className="col" style={{ border: '1px solid var(--hairline)' }}>
          {dated.map(o => (
            <div key={o.id} className="row between center" style={{ padding: 18, borderBottom: '1px solid var(--hairline)' }}>
              <div className="col gap-1">
                <strong>{o.requestTitle}</strong>
                <span className="mono text-muted" style={{ fontSize: 11 }}>{o.customerName}</span>
              </div>
              <span className="mono">{o.appointmentAt}</span>
            </div>
          ))}
        </div>
      ))}
    </DashboardLayout>
  );
}

/* ---------- Not-yet-built modules — honest empty states ---------- */
export function StudioCampaigns() {
  useReveal();
  const { lang } = useLang();
  return (
    <DashboardLayout scope="studio" title={lang === 'tr' ? 'Kampanyalar' : 'Campaigns'}>
      <Empty title={lang === 'tr' ? 'Kampanya modülü yakında' : 'Campaigns are coming soon'} body={lang === 'tr' ? 'İndirim kampanyaları bu sürümde henüz aktif değil.' : 'Discount campaigns are not live in this version yet.'} />
    </DashboardLayout>
  );
}

export function StudioArtists() {
  useReveal();
  const { lang } = useLang();
  return (
    <DashboardLayout scope="studio" title={lang === 'tr' ? 'Sanatçılarım' : 'My artists'}>
      <Empty title={lang === 'tr' ? 'Ekip modülü yakında' : 'Team management is coming soon'} body={lang === 'tr' ? 'Stüdyo ekibi yönetimi bu sürümde henüz aktif değil.' : 'Studio team management is not live in this version yet.'} />
    </DashboardLayout>
  );
}

export function StudioMaterials() {
  useReveal();
  const { lang } = useLang();
  return (
    <DashboardLayout scope="studio" title={lang === 'tr' ? 'Malzemeler' : 'Materials'}>
      <Empty title={lang === 'tr' ? 'Malzeme mağazası yakında' : 'The materials shop is coming soon'} body={lang === 'tr' ? 'Malzeme kataloğu bu sürümde henüz aktif değil.' : 'The materials catalog is not live in this version yet.'} />
    </DashboardLayout>
  );
}

/* ---------- Reviews received ---------- */
export function StudioReviews() {
  useReveal();
  const { lang } = useLang();
  const { data, error } = useLoad(() => reviews.mine());
  return (
    <DashboardLayout scope="studio" title={lang === 'tr' ? 'Yorumlar' : 'Reviews'} subtitle={lang === 'tr' ? 'Yalnızca tamamlanmış işlerden gelen gerçek yorumlar.' : 'Only real reviews from completed jobs.'}>
      {error && <ErrorNote message={error} />}
      {!data && !error && <Loading />}
      {data && (data.length === 0 ? (
        <Empty title={lang === 'tr' ? 'Henüz yorum yok' : 'No reviews yet'} body={lang === 'tr' ? 'İlk tamamlanan işinizden sonra yorumlar burada görünür.' : 'After your first completed job, customer reviews appear here.'} />
      ) : (
        <div className="col gap-3">
          {data.map(r => (
            <article key={r.id} className="card card-pad col gap-2">
              <div className="row between center">
                <strong>{r.customerName}</strong>
                <span className="mono">{'★'.repeat(r.rating)}</span>
              </div>
              <span className="mono text-muted" style={{ fontSize: 11 }}>{r.requestTitle} · {r.createdAt}</span>
              <p className="text-muted" style={{ margin: 0, fontSize: 14 }}>{r.text}</p>
            </article>
          ))}
        </div>
      ))}
    </DashboardLayout>
  );
}

/* ---------- Messages ---------- */
export function StudioMessages() {
  return <MessagesPage scope="studio" />;
}

/* ---------- Notifications (derived from offer status changes) ---------- */
export function StudioNotifications() {
  useReveal();
  const { lang } = useLang();
  const { data, error } = useLoad(() => offers.list());
  const events = (data ?? []).filter(o => o.status === 'accepted' || o.status === 'rejected').slice(0, 20);
  return (
    <DashboardLayout scope="studio" title={lang === 'tr' ? 'Bildirimler' : 'Notifications'}>
      {error && <ErrorNote message={error} />}
      {!data && !error && <Loading />}
      {data && (events.length === 0 ? (
        <Empty title={lang === 'tr' ? 'Bildirim yok' : 'Nothing yet'} body={lang === 'tr' ? 'Teklifleriniz yanıtlandıkça burada görünür.' : 'When customers respond to your offers it shows here.'} />
      ) : (
        <div className="col" style={{ border: '1px solid var(--hairline)' }}>
          {events.map(o => (
            <div key={o.id} className="row between center" style={{ padding: 16, borderBottom: '1px solid var(--hairline)' }}>
              <span style={{ fontSize: 14 }}>{o.customerName} — {o.requestTitle}</span>
              <span className="tag tag-soft">{STATUS_LABEL[o.status]?.[lang as 'en' | 'tr'] ?? o.status}</span>
            </div>
          ))}
        </div>
      ))}
    </DashboardLayout>
  );
}

/* ---------- Stats (computed from real activity only) ---------- */
export function StudioStats() {
  useReveal();
  const { lang } = useLang();
  const { data, error } = useLoad(() => dashboard.get() as Promise<ArtistDashboard>);
  return (
    <DashboardLayout scope="studio" title={lang === 'tr' ? 'İstatistikler' : 'Statistics'} subtitle={lang === 'tr' ? 'Tümü gerçek aktiviteden hesaplanır — veri yoksa sıfırdır.' : 'All computed from real activity — zero when there is none.'}>
      {error && <ErrorNote message={error} />}
      {!data && !error && <Loading />}
      {data && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
          <StatsCard label={lang === 'tr' ? 'Gönderilen teklif' : 'Offers sent'} value={String(data.stats.offersSent)} />
          <StatsCard label={lang === 'tr' ? 'Bekleyen teklif' : 'Pending offers'} value={String(data.stats.offersPending)} />
          <StatsCard label={lang === 'tr' ? 'Rezerve iş' : 'Booked jobs'} value={String(data.stats.jobsBooked)} />
          <StatsCard label={lang === 'tr' ? 'Tamamlanan iş' : 'Completed jobs'} value={String(data.stats.jobsCompleted)} />
          <StatsCard label={lang === 'tr' ? 'Kazanç (tamamlanan)' : 'Earnings (completed)'} value={`₺${data.stats.earnings.toLocaleString()}`} />
          <StatsCard label={lang === 'tr' ? 'Ortalama puan' : 'Average rating'} value={data.stats.avgRating != null ? `★ ${data.stats.avgRating}` : '—'} />
          <StatsCard label={lang === 'tr' ? 'Yorum sayısı' : 'Reviews'} value={String(data.stats.reviewCount)} />
          <StatsCard label={lang === 'tr' ? 'Portföy (yayında)' : 'Portfolio (live)'} value={String(data.stats.portfolioApproved)} />
          <StatsCard label={lang === 'tr' ? 'Portföy (incelemede)' : 'Portfolio (in review)'} value={String(data.stats.portfolioPending)} />
        </div>
      )}
    </DashboardLayout>
  );
}

/* ---------- Profile ---------- */
export function StudioProfile() {
  useReveal();
  const { lang } = useLang();
  const { user } = useAuth();
  return (
    <DashboardLayout scope="studio" title={lang === 'tr' ? 'Profilim' : 'My profile'}>
      <div className="card card-pad col gap-3" style={{ maxWidth: 520 }}>
        <div className="row between center">
          <span className="mono text-muted">{lang === 'tr' ? 'Ad' : 'Name'}</span>
          <strong>{user?.name}</strong>
        </div>
        <div className="row between center">
          <span className="mono text-muted">Email</span>
          <span>{user?.email}</span>
        </div>
        <div className="row between center">
          <span className="mono text-muted">{lang === 'tr' ? 'Rol' : 'Role'}</span>
          <span>{user?.role}</span>
        </div>
        <div className="row between center">
          <span className="mono text-muted">{lang === 'tr' ? 'Şehir' : 'City'}</span>
          <span>{user?.city ?? '—'}</span>
        </div>
        <div className="row between center">
          <span className="mono text-muted">{lang === 'tr' ? 'Stiller' : 'Styles'}</span>
          <span>{(user?.styles ?? []).join(' · ') || '—'}</span>
        </div>
        {user?.bio && <p className="text-muted" style={{ margin: 0, fontSize: 14 }}>{user.bio}</p>}
        <div className="row between center">
          <span className="mono text-muted">{lang === 'tr' ? 'Üyelik' : 'Member since'}</span>
          <span>{user?.createdAt}</span>
        </div>
      </div>
    </DashboardLayout>
  );
}
