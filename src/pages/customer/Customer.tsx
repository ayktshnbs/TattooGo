import { useState } from 'react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '../../components/DashboardLayout';
import { Field, Input, Textarea, Select, ChoiceGroup, UploadImage } from '../../components/Form';
import { OfferCard, RequestCard, StatsCard, NotificationItem, ConversationRow, AppointmentCard, TattooCard, ArtistCard, ReviewCard, ProfileCard } from '../../components/Cards';
import { useLang } from '../../i18n/LangContext';
import { useReveal } from '../../hooks/useReveal';
import { OFFERS, REQUESTS, NOTIFICATIONS, CONVERSATIONS, MESSAGES, APPOINTMENTS, DESIGNS, ARTISTS, REVIEWS, STYLES, CITIES } from '../../data/mock';
import { addUpload } from '../../data/uploads';
import type { TattooStyle } from '../../data/types';
import { AvatarBubble } from '../../components/Visual';

/* ---------- Customer Home ---------- */
export function CustomerHome() {
  useReveal();
  const { lang, t } = useLang();
  return (
    <DashboardLayout
      scope="customer"
      title={lang === 'tr' ? 'Tekrar hoş geldin, Naz.' : 'Welcome back, Naz.'}
      subtitle={lang === 'tr' ? 'Aktif istekleriniz, son teklifler ve yaklaşan randevular.' : 'Your active requests, latest offers and upcoming appointments.'}
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 36 }}>
        <StatsCard label={lang === 'tr' ? 'Aktif istek' : 'Active requests'} value="3" delta="+1 this week" />
        <StatsCard label={lang === 'tr' ? 'Açık teklif' : 'Open offers'} value="7" delta="+4 today" />
        <StatsCard label={lang === 'tr' ? 'Yaklaşan' : 'Upcoming'} value="2" />
        <StatsCard label={lang === 'tr' ? 'Tamamlanan' : 'Completed'} value="5" />
      </div>

      <SectionTitle num="A1" label={lang === 'tr' ? 'İsteklerim' : 'My requests'} action={<Link to="/dashboard/requests" className="mono">{t('common.viewAll')} →</Link>} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
        {REQUESTS.slice(0, 2).map(r => <RequestCard key={r.id} request={r} />)}
      </div>

      <SectionTitle num="A2" label={lang === 'tr' ? 'Son teklifler' : 'Latest offers'} action={<Link to="/dashboard/offers" className="mono">{t('common.viewAll')} →</Link>} />
      <div className="col gap-3">
        {OFFERS.slice(0, 3).map(o => <OfferCard key={o.id} offer={o} />)}
      </div>

      <SectionTitle num="A3" label={lang === 'tr' ? 'Yaklaşan randevular' : 'Upcoming appointments'} action={<Link to="/dashboard/appointments" className="mono">{t('common.viewAll')} →</Link>} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
        {APPOINTMENTS.filter(a => a.status !== 'completed').map(a => <AppointmentCard key={a.id} ap={a} />)}
      </div>

      <SectionTitle num="A4" label={lang === 'tr' ? 'Mürekkebini paylaş' : 'Share your ink'} action={<Link to="/dashboard/share-ink" className="mono">{lang === 'tr' ? 'Paylaş' : 'Share'} →</Link>} />
      <p className="text-muted" style={{ margin: 0, maxWidth: 520 }}>
        {lang === 'tr'
          ? 'Yaptırdığınız dövmenin fotoğrafını yükleyin — ana sayfa akışında yayınlansın.'
          : 'Upload a photo of your finished tattoo — it gets published in the landing feed.'}
      </p>
    </DashboardLayout>
  );
}

/* ---------- Share your ink (customer upload → landing feed) ---------- */
export function ShareInk() {
  useReveal();
  const { lang } = useLang();
  const [title, setTitle] = useState('');
  const [artistName, setArtistName] = useState('');
  const [style, setStyle] = useState<TattooStyle>(STYLES[0].key);
  const [image, setImage] = useState<{ url: string; ratio: number } | null>(null);
  const [published, setPublished] = useState(false);
  const [busy, setBusy] = useState(false);
  const ok = title.trim().length > 0 && !!image && !busy;
  return (
    <DashboardLayout
      scope="customer"
      title={lang === 'tr' ? 'Mürekkebini paylaş' : 'Share your ink'}
      subtitle={lang === 'tr' ? 'Bitmiş dövmenizin fotoğrafı ana sayfa akışında yayınlanır.' : 'A photo of your finished tattoo, published in the landing feed.'}
    >
      <div className="split">
        <form
          className="col"
          onSubmit={async (e) => {
            e.preventDefault();
            if (!ok || !image) return;
            setBusy(true);
            const saved = await addUpload({
              title: title.trim(),
              artistName: artistName.trim() || (lang === 'tr' ? 'Topluluk' : 'Community'),
              style, tags: [style, 'community'],
              imageUrl: image.url, imageRatio: image.ratio, source: 'customer',
            });
            setBusy(false);
            if (saved) { setPublished(true); setTitle(''); setArtistName(''); setImage(null); }
          }}
        >
          {published && (
            <div className="card card-pad" style={{ marginBottom: 16, borderColor: 'var(--ink)' }}>
              <span className="mono">✓ {lang === 'tr' ? 'Yayınlandı — ana sayfa akışında.' : 'Published — now live in the landing feed.'}</span>
              {' '}<Link to="/" className="mono" style={{ textDecoration: 'underline' }}>{lang === 'tr' ? 'Gör' : 'View'}</Link>
            </div>
          )}
          <Field label={lang === 'tr' ? 'Fotoğraf' : 'Photo'}>
            <UploadImage
              label={lang === 'tr' ? 'Fotoğraf yükle' : 'Upload photo'}
              preview={image?.url}
              onImage={(url, ratio) => { setImage({ url, ratio }); setPublished(false); }}
            />
          </Field>
          <Field label={lang === 'tr' ? 'Başlık' : 'Title'}>
            <Input placeholder={lang === 'tr' ? 'Kol içi çizgi çiçek' : 'Inner-arm line florals'} value={title} onChange={(e) => setTitle(e.target.value)} />
          </Field>
          <Field label={lang === 'tr' ? 'Sanatçı (opsiyonel)' : 'Artist credit (optional)'}>
            <Input placeholder={lang === 'tr' ? 'Dövmeyi yapan sanatçı' : 'Who made it'} value={artistName} onChange={(e) => setArtistName(e.target.value)} />
          </Field>
          <Field label={lang === 'tr' ? 'Stil' : 'Style'}>
            <Select options={STYLES.map(s => ({ value: s.key, label: s[lang] }))} value={style} onChange={(e) => setStyle(e.target.value as TattooStyle)} />
          </Field>
          <div className="row gap-3" style={{ marginTop: 12 }}>
            <button className="btn btn-accent" type="submit" disabled={!ok}>{busy ? (lang === 'tr' ? 'Yükleniyor…' : 'Uploading…') : (lang === 'tr' ? 'Yayınla' : 'Publish')}</button>
          </div>
        </form>
        <aside className="card col">
          {image && <img src={image.url} alt="" style={{ width: '100%', aspectRatio: image.ratio, objectFit: 'cover', display: 'block' }} />}
          <div className="card-pad col gap-2">
            <span className="mono text-muted">{lang === 'tr' ? 'Önizleme' : 'Preview'}</span>
            <h3 className="display" style={{ fontSize: 22, margin: 0 }}>{title.trim() || '—'}</h3>
            <span className="mono text-muted">{artistName.trim() || (lang === 'tr' ? 'Topluluk' : 'Community')}</span>
          </div>
        </aside>
      </div>
    </DashboardLayout>
  );
}

/* ---------- Create request ---------- */
export function CreateRequest() {
  useReveal();
  const { lang, t } = useLang();
  const [style, setStyle] = useState<string>('fine-line');
  const [size, setSize] = useState<string>('md');
  const [color, setColor] = useState<string>('black');
  const [placement, setPlacement] = useState<string>('forearm');
  return (
    <DashboardLayout
      scope="customer"
      title={lang === 'tr' ? 'Dövme isteği oluştur' : 'Create tattoo request'}
      subtitle={lang === 'tr' ? 'Fikrinizi paylaşın. Onaylı sanatçılar size özel teklif gönderir.' : 'Describe your idea. Verified artists send tailored offers.'}
    >
      <div className="split">
        <form className="col" onSubmit={(e) => e.preventDefault()}>
          <Field label={lang === 'tr' ? '1 · Dövme tanımı' : '1 · Tattoo description'} hint={lang === 'tr' ? 'En az 2 cümle yazın' : 'At least 2 sentences'}>
            <Textarea rows={4} placeholder={lang === 'tr' ? 'Aklınızdakini anlatın…' : 'Describe what you have in mind…'} />
          </Field>

          <Field label={lang === 'tr' ? '2 · Stil' : '2 · Style'}>
            <ChoiceGroup value={style} onChange={setStyle} options={STYLES.map(s => ({ value: s.key, label: s[lang] }))} />
          </Field>

          <Field label={lang === 'tr' ? '3 · Yerleşim' : '3 · Body placement'}>
            <ChoiceGroup value={placement} onChange={setPlacement} options={['arm','forearm','shoulder','chest','back','leg','thigh','ankle','hand','neck','ribs'].map(p => ({ value: p, label: p }))} />
          </Field>

          <Field label={lang === 'tr' ? '4 · Boyut' : '4 · Size'}>
            <ChoiceGroup value={size} onChange={setSize} options={['xs','sm','md','lg','xl'].map(s => ({ value: s, label: s.toUpperCase() }))} />
          </Field>

          <Field label={lang === 'tr' ? '5 · Renk tercihi' : '5 · Color preference'}>
            <ChoiceGroup value={color} onChange={setColor} options={[
              { value: 'black', label: lang === 'tr' ? 'Siyah' : 'Black' },
              { value: 'shaded', label: lang === 'tr' ? 'Gölgeli' : 'Shaded' },
              { value: 'color', label: lang === 'tr' ? 'Renkli' : 'Color' },
            ]} />
          </Field>

          <Field label={lang === 'tr' ? '6 · Referanslar' : '6 · Reference images'}>
            <UploadImage label={t('common.uploadImage')} />
          </Field>

          <Field label={lang === 'tr' ? '7 · Şehir' : '7 · City'}>
            <Select options={CITIES.map(c => ({ value: c, label: c }))} />
          </Field>

          <div className="row gap-3">
            <Field label={lang === 'tr' ? '8 · Bütçe min' : '8 · Budget min'}><Input type="number" placeholder="₺2,500" /></Field>
            <Field label={lang === 'tr' ? 'Bütçe max' : 'Budget max'}><Input type="number" placeholder="₺6,000" /></Field>
          </div>

          <Field label={lang === 'tr' ? '9 · Tercih edilen tarih' : '9 · Preferred date'}><Input type="date" /></Field>

          <Field label={lang === 'tr' ? '10 · Gizlilik' : '10 · Privacy'}>
            <label className="row gap-2 center"><input type="radio" name="priv" defaultChecked /> {lang === 'tr' ? 'Sanatçılar görsün' : 'Visible to artists'}</label>
            <label className="row gap-2 center"><input type="radio" name="priv" /> {lang === 'tr' ? 'Sadece davet ettiklerim görsün' : 'Only invited artists'}</label>
          </Field>

          <div className="row gap-3" style={{ marginTop: 18 }}>
            <button className="btn btn-accent" type="submit">{lang === 'tr' ? 'İsteği gönder' : 'Submit request'}</button>
            <button className="btn btn-ghost" type="button">{lang === 'tr' ? 'Taslak olarak kaydet' : 'Save as draft'}</button>
          </div>
        </form>

        <aside className="card card-pad col gap-4" style={{ position: 'sticky', top: 96, alignSelf: 'start' }}>
          <span className="mono text-muted">{lang === 'tr' ? 'Önizleme' : 'Preview'}</span>
          <h3 className="display" style={{ fontSize: 28, margin: 0 }}>{style.replace('-', ' ')} · {placement} · {size.toUpperCase()}</h3>
          <p className="text-muted" style={{ margin: 0 }}>
            {lang === 'tr'
              ? 'Brief’iniz onaylı sanatçılara açık teklif olarak yayınlanacak.'
              : 'Your brief will be opened to verified artists as a public request.'}
          </p>
          <hr className="hr" />
          <div className="row between"><span className="mono text-muted">{lang === 'tr' ? 'Beklenen teklif' : 'Expected offers'}</span><span className="mono">4–8</span></div>
          <div className="row between"><span className="mono text-muted">{lang === 'tr' ? 'İlk yanıt' : 'First reply'}</span><span className="mono">~ 38 min</span></div>
          <div className="row between"><span className="mono text-muted">{lang === 'tr' ? 'Olgunlaşma' : 'Brief lifetime'}</span><span className="mono">7 days</span></div>
        </aside>
      </div>
    </DashboardLayout>
  );
}

/* ---------- My requests ---------- */
export function MyRequests() {
  useReveal();
  const { lang } = useLang();
  return (
    <DashboardLayout scope="customer" title={lang === 'tr' ? 'İsteklerim' : 'My requests'} subtitle={lang === 'tr' ? 'Tüm brief’leriniz ve durumları.' : 'All your briefs and their status.'}>
      <div className="row between center" style={{ marginBottom: 18 }}>
        <ChoiceGroup
          value="all"
          onChange={() => {}}
          options={[{value:'all',label: lang==='tr'?'Tümü':'All'},{value:'open',label:'Open'},{value:'reviewing',label:'Reviewing'},{value:'booked',label:'Booked'},{value:'completed',label:'Completed'}]}
        />
        <Link to="/dashboard/create-request" className="btn btn-sm btn-accent">{lang === 'tr' ? '＋ Yeni istek' : '＋ New request'}</Link>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
        {REQUESTS.map(r => <RequestCard key={r.id} request={r} />)}
      </div>
    </DashboardLayout>
  );
}

/* ---------- Offers received ---------- */
export function OffersReceived() {
  useReveal();
  const { lang } = useLang();
  const [compare, setCompare] = useState(false);
  return (
    <DashboardLayout scope="customer" title={lang === 'tr' ? 'Alınan teklifler' : 'Offers received'} subtitle={lang === 'tr' ? 'Brief’leriniz için sanatçı ve stüdyo teklifleri.' : 'Offers from artists and studios on your briefs.'}>
      <div className="row between center" style={{ marginBottom: 18 }}>
        <ChoiceGroup
          value="all"
          onChange={() => {}}
          options={[{value:'all',label: lang==='tr'?'Tümü':'All'},{value:'sent',label:'New'},{value:'viewed',label:'Viewed'},{value:'accepted',label:'Accepted'},{value:'rejected',label:'Rejected'}]}
        />
        <button className="btn btn-sm" onClick={() => setCompare(c => !c)}>{compare ? (lang === 'tr' ? 'Listeye dön' : 'Back to list') : (lang === 'tr' ? 'Karşılaştır' : 'Compare')}</button>
      </div>

      {!compare ? (
        <div className="col gap-3">
          {OFFERS.map(o => <OfferCard key={o.id} offer={o} />)}
        </div>
      ) : (
        <div style={{ overflowX: 'auto', border: '1px solid var(--hairline)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 760 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--hairline)' }}>
                {[lang==='tr'?'Sanatçı':'Artist', lang==='tr'?'Şehir':'City', lang==='tr'?'Fiyat':'Price', lang==='tr'?'Süre':'Hours', lang==='tr'?'Randevu':'Slot', lang==='tr'?'Puan':'Rating', ''].map(h => (
                  <th key={h} className="mono text-muted" style={{ textAlign: 'left', padding: 12 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {OFFERS.map(o => (
                <tr key={o.id} style={{ borderBottom: '1px solid var(--hairline)' }}>
                  <td style={{ padding: 12 }}><div className="row center gap-3"><AvatarBubble name={o.artistName} size={28} />{o.artistName}{o.verified && <span className="tag tag-accent" style={{ padding: '2px 6px' }}>✓</span>}</div></td>
                  <td style={{ padding: 12 }} className="mono text-muted">{o.artistCity}</td>
                  <td style={{ padding: 12 }} className="mono">₺{o.price.toLocaleString()}</td>
                  <td style={{ padding: 12 }} className="mono">{o.estimatedHours}h</td>
                  <td style={{ padding: 12 }} className="mono text-muted">{o.appointmentAt}</td>
                  <td style={{ padding: 12 }} className="mono">★ {o.rating}</td>
                  <td style={{ padding: 12 }}><button className="btn btn-sm btn-accent">Accept</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </DashboardLayout>
  );
}

/* ---------- Messages ---------- */
export function CustomerMessages() {
  useReveal();
  const { lang } = useLang();
  const [activeId, setActiveId] = useState(CONVERSATIONS[0].id);
  const conversation = CONVERSATIONS.find(c => c.id === activeId)!;
  const msgs = MESSAGES.filter(m => m.conversationId === activeId);
  return (
    <DashboardLayout scope="customer" title={lang === 'tr' ? 'Mesajlar' : 'Messages'}>
      <div className="msg-grid" style={{ gap: 0, border: '1px solid var(--hairline)' }}>
        <div className="col" style={{ borderRight: '1px solid var(--hairline)', maxHeight: 580, overflowY: 'auto' }}>
          <div style={{ padding: 14, borderBottom: '1px solid var(--hairline)' }}>
            <Input placeholder={lang === 'tr' ? 'Sohbet ara' : 'Search conversations'} />
          </div>
          {CONVERSATIONS.map(c => (
            <button key={c.id} onClick={() => setActiveId(c.id)} style={{ display: 'block', width: '100%', textAlign: 'left' }}>
              <ConversationRow c={c} active={c.id === activeId} />
            </button>
          ))}
        </div>
        <div className="col">
          <div className="row between center" style={{ padding: 16, borderBottom: '1px solid var(--hairline)' }}>
            <div className="row gap-3 center">
              <AvatarBubble name={conversation.with} size={36} />
              <div className="col">
                <strong>{conversation.with}</strong>
                <span className="mono text-muted">{conversation.role}</span>
              </div>
            </div>
            <button className="btn btn-sm btn-ghost">View profile</button>
          </div>
          <div className="col gap-3" style={{ padding: 18, minHeight: 320, maxHeight: 460, overflowY: 'auto' }}>
            {msgs.map(m => (
              <div key={m.id} className="row" style={{ justifyContent: m.fromMe ? 'flex-end' : 'flex-start' }}>
                <div style={{
                  maxWidth: 420,
                  background: m.fromMe ? 'var(--ink)' : 'var(--paper-warm)',
                  color: m.fromMe ? 'var(--paper)' : 'var(--ink)',
                  padding: '10px 14px',
                  borderRadius: 0,
                  border: '1px solid var(--hairline)',
                }}>
                  <span style={{ display: 'block', fontSize: 14 }}>{m.text}</span>
                  <span className="mono" style={{ display: 'block', marginTop: 6, opacity: 0.6, fontSize: 10 }}>{m.time}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="row gap-2 center" style={{ padding: 14, borderTop: '1px solid var(--hairline)' }}>
            <Input placeholder={lang === 'tr' ? 'Mesaj yazın…' : 'Write a message…'} />
            <button className="btn btn-sm btn-primary">{lang === 'tr' ? 'Gönder' : 'Send'}</button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

/* ---------- Notifications ---------- */
export function CustomerNotifications() {
  useReveal();
  const { lang } = useLang();
  return (
    <DashboardLayout scope="customer" title={lang === 'tr' ? 'Bildirimler' : 'Notifications'}>
      <div className="row between center" style={{ marginBottom: 18 }}>
        <ChoiceGroup value="all" onChange={() => {}} options={[
          { value: 'all',     label: lang === 'tr' ? 'Tümü' : 'All' },
          { value: 'offers',  label: lang === 'tr' ? 'Teklifler' : 'Offers' },
          { value: 'msgs',    label: lang === 'tr' ? 'Mesajlar' : 'Messages' },
          { value: 'appts',   label: lang === 'tr' ? 'Randevular' : 'Appointments' },
          { value: 'system',  label: lang === 'tr' ? 'Sistem' : 'System' },
        ]} />
        <button className="btn btn-sm btn-ghost">{lang === 'tr' ? 'Tümünü okundu işaretle' : 'Mark all read'}</button>
      </div>
      <div className="col">
        {NOTIFICATIONS.map(n => <NotificationItem key={n.id} n={n} />)}
      </div>
    </DashboardLayout>
  );
}

/* ---------- Favorites ---------- */
export function CustomerFavorites() {
  useReveal();
  const { lang } = useLang();
  return (
    <DashboardLayout scope="customer" title={lang === 'tr' ? 'Favoriler' : 'Favorites'}>
      <h3 className="mono text-muted" style={{ marginBottom: 12 }}>{lang === 'tr' ? 'Sanatçılar' : 'Artists'}</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
        {ARTISTS.slice(0, 4).map(a => <ArtistCard key={a.id} artist={a} />)}
      </div>
      <h3 className="mono text-muted" style={{ margin: '40px 0 12px' }}>{lang === 'tr' ? 'Tasarımlar' : 'Designs'}</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 16 }}>
        {DESIGNS.slice(0, 6).map(d => <TattooCard key={d.id} design={d} />)}
      </div>
    </DashboardLayout>
  );
}

/* ---------- Appointments ---------- */
export function CustomerAppointments() {
  useReveal();
  const { lang } = useLang();
  return (
    <DashboardLayout scope="customer" title={lang === 'tr' ? 'Randevular' : 'Appointments'} subtitle={lang === 'tr' ? 'Tüm randevularınız ve geçmiş.' : 'All your bookings and history.'}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
        {APPOINTMENTS.map(a => <AppointmentCard key={a.id} ap={a} />)}
      </div>
    </DashboardLayout>
  );
}

/* ---------- Order tracking ---------- */
export function CustomerTracking() {
  useReveal();
  const { lang } = useLang();
  const steps = [
    { k: 'request', label: lang === 'tr' ? 'İstek oluşturuldu' : 'Request created' },
    { k: 'offers',  label: lang === 'tr' ? 'Teklifler alındı' : 'Offers received' },
    { k: 'accept',  label: lang === 'tr' ? 'Teklif kabul edildi' : 'Offer accepted' },
    { k: 'book',    label: lang === 'tr' ? 'Randevu oluşturuldu' : 'Appointment booked' },
    { k: 'complete', label: lang === 'tr' ? 'Tamamlandı' : 'Completed' },
    { k: 'review',  label: lang === 'tr' ? 'Yorum bırakıldı' : 'Reviewed' },
  ];
  return (
    <DashboardLayout scope="customer" title={lang === 'tr' ? 'Sipariş takibi' : 'Order tracking'}>
      {REQUESTS.slice(0, 3).map((r) => (
        <div key={r.id} className="card card-pad col gap-4" style={{ marginBottom: 16 }}>
          <div className="row between">
            <strong>{r.title}</strong>
            <span className="mono text-muted">#{r.id.toUpperCase()}</span>
          </div>
          <ol className="row between" style={{ listStyle: 'none', padding: 0, margin: 0, gap: 8, flexWrap: 'wrap' }}>
            {steps.map((s, i) => {
              const idx = r.status === 'open' ? 1 : r.status === 'reviewing' ? 2 : r.status === 'booked' ? 4 : 6;
              const done = i < idx;
              return (
                <li key={s.k} className="col gap-2" style={{ flex: 1, minWidth: 110 }}>
                  <span style={{ display: 'block', height: 2, background: done ? 'var(--accent)' : 'var(--hairline-strong)' }} />
                  <span className="mono" style={{ color: done ? 'var(--accent)' : 'var(--muted)' }}>{String(i + 1).padStart(2, '0')}</span>
                  <span style={{ fontSize: 13 }}>{s.label}</span>
                </li>
              );
            })}
          </ol>
        </div>
      ))}
    </DashboardLayout>
  );
}

/* ---------- Customer reviews ---------- */
export function CustomerReviews() {
  useReveal();
  const { lang } = useLang();
  return (
    <DashboardLayout scope="customer" title={lang === 'tr' ? 'Yorumlarım' : 'My reviews'}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
        {REVIEWS.slice(0, 3).map(r => <ReviewCard key={r.id} r={r} />)}
      </div>
    </DashboardLayout>
  );
}

/* ---------- Profile ---------- */
export function CustomerProfile() {
  useReveal();
  const { lang } = useLang();
  return (
    <DashboardLayout scope="customer" title={lang === 'tr' ? 'Profil' : 'Profile'}>
      <ProfileCard name="Naz Y." role={lang === 'tr' ? 'Müşteri' : 'Customer'} city="Istanbul" />
      <div className="split" style={{ marginTop: 32 }}>
        <form className="col" onSubmit={(e) => e.preventDefault()}>
          <Field label={lang === 'tr' ? 'Adınız' : 'Full name'}><Input defaultValue="Naz Y." /></Field>
          <Field label="Email"><Input defaultValue="naz@example.com" type="email" /></Field>
          <Field label={lang === 'tr' ? 'Şehir' : 'City'}>
            <Select options={CITIES.map(c => ({ value: c, label: c }))} defaultValue="Istanbul" />
          </Field>
          <Field label={lang === 'tr' ? 'Telefon' : 'Phone'}><Input defaultValue="+90 5XX XXX XX XX" /></Field>
          <Field label={lang === 'tr' ? 'Dil' : 'Language'}>
            <Select options={[{ value: 'en', label: 'English' }, { value: 'tr', label: 'Türkçe' }]} defaultValue={lang} />
          </Field>
          <div className="row gap-3" style={{ marginTop: 12 }}>
            <button className="btn btn-primary">{lang === 'tr' ? 'Kaydet' : 'Save'}</button>
            <button className="btn btn-ghost" type="button">{lang === 'tr' ? 'Vazgeç' : 'Discard'}</button>
          </div>
        </form>
        <aside className="col gap-4">
          <span className="mono text-muted">{lang === 'tr' ? 'Hesap' : 'Account'}</span>
          {[
            ['Security & privacy', 'Güvenlik & gizlilik'],
            ['Connected accounts', 'Bağlı hesaplar'],
            ['Order history', 'Sipariş geçmişi'],
            ['Reviews', 'Yorumlar'],
            ['Customer service', 'Müşteri hizmetleri'],
            ['FAQ', 'SSS'],
            ['About', 'Hakkında'],
            ['Block & report', 'Engelle & bildir'],
          ].map(([en, tr]) => (
            <div key={en} className="row between" style={{ padding: '14px 0', borderBottom: '1px solid var(--hairline)' }}>
              <span>{lang === 'tr' ? tr : en}</span>
              <span className="mono text-muted">→</span>
            </div>
          ))}
        </aside>
      </div>
    </DashboardLayout>
  );
}

/* ---------- Local helper ---------- */
function SectionTitle({ num, label, action }: { num: string; label: string; action?: React.ReactNode }) {
  return (
    <div className="row between center" style={{ margin: '36px 0 16px', borderBottom: '1px solid var(--hairline)', paddingBottom: 10 }}>
      <span className="mono text-muted">{num} · {label}</span>
      {action}
    </div>
  );
}
