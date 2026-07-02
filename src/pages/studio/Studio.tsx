import { useState } from 'react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '../../components/DashboardLayout';
import { Field, Input, Textarea, Select, ChoiceGroup, UploadImage } from '../../components/Form';
import { StatsCard, OfferCard, NotificationItem, ConversationRow, AppointmentCard, TattooCard, ReviewCard, CampaignCard, ArtistMemberRow, MaterialCard, RequestCard, ProfileCard } from '../../components/Cards';
import { useLang } from '../../i18n/LangContext';
import { useReveal } from '../../hooks/useReveal';
import { OFFERS, NOTIFICATIONS, CONVERSATIONS, MESSAGES, APPOINTMENTS, DESIGNS, REVIEWS, STYLES, CITIES, CAMPAIGNS, ARTIST_MEMBERS, MATERIALS, REQUESTS, ARTISTS } from '../../data/mock';
import { AvatarBubble, Swatch } from '../../components/Visual';

/* ---------- Home ---------- */
export function StudioHome() {
  useReveal();
  const { lang, t } = useLang();
  return (
    <DashboardLayout
      scope="studio"
      title={lang === 'tr' ? 'İyi günler, Aslı.' : 'Good afternoon, Aslı.'}
      subtitle={lang === 'tr' ? 'Bugün için aktif brief’ler, randevular ve istatistik.' : 'Open briefs, today’s appointments, and weekly numbers.'}
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 32 }}>
        <StatsCard label={lang === 'tr' ? 'Açık brief' : 'Open briefs'} value="42" delta="+6 today" />
        <StatsCard label={lang === 'tr' ? 'Gönderilen teklif' : 'Offers sent'} value="118" delta="+9 week" />
        <StatsCard label={lang === 'tr' ? 'Kabul oranı' : 'Acceptance rate'} value="38%" delta="+4 pts" />
        <StatsCard label={lang === 'tr' ? 'Bugünkü randevu' : 'Today appts'} value="3" />
      </div>

      <div className="split">
        <div>
          <SectionTitle num="01" label={lang === 'tr' ? 'Size uygun açık brief’ler' : 'Open briefs that match you'} action={<Link to="/studio/give-offer" className="mono">{t('common.viewAll')} →</Link>} />
          <div className="col gap-3">
            {REQUESTS.slice(0, 3).map(r => <RequestCard key={r.id} request={r} />)}
          </div>
        </div>
        <div>
          <SectionTitle num="02" label={lang === 'tr' ? 'Bugünün randevuları' : 'Today’s appointments'} action={<Link to="/studio/calendar" className="mono">{t('common.viewAll')} →</Link>} />
          <div className="col gap-3">
            {APPOINTMENTS.filter(a => a.status === 'today' || a.status === 'upcoming').map(a => <AppointmentCard key={a.id} ap={a} />)}
          </div>
          <SectionTitle num="03" label={lang === 'tr' ? 'Son aktivite' : 'Recent activity'} />
          <div className="col">
            {NOTIFICATIONS.slice(0, 4).map(n => <NotificationItem key={n.id} n={n} />)}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

/* ---------- My tattoos ---------- */
export function MyTattoos() {
  useReveal();
  const { lang } = useLang();
  return (
    <DashboardLayout scope="studio" title={lang === 'tr' ? 'Dövmelerim' : 'My tattoos'} subtitle={lang === 'tr' ? 'Yüklediğiniz tüm dövmeler.' : 'Everything you have published.'}>
      <div className="row between center" style={{ marginBottom: 18 }}>
        <ChoiceGroup value="all" onChange={() => {}} options={[
          { value: 'all', label: lang === 'tr' ? 'Tümü' : 'All' },
          ...STYLES.slice(0, 5).map(s => ({ value: s.key, label: s[lang] })),
        ]} />
        <Link to="/studio/add-tattoo" className="btn btn-sm btn-accent">{lang === 'tr' ? '＋ Dövme ekle' : '＋ Add tattoo'}</Link>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
        {DESIGNS.map(d => (
          <div key={d.id} className="col">
            <TattooCard design={d} />
            <div className="row between" style={{ padding: '8px 4px' }}>
              <button className="mono text-muted">{lang === 'tr' ? 'Düzenle' : 'Edit'}</button>
              <button className="mono text-muted">{lang === 'tr' ? 'Sil' : 'Delete'}</button>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}

/* ---------- Add tattoo ---------- */
export function AddTattoo() {
  useReveal();
  const { lang } = useLang();
  const [tags, setTags] = useState<string[]>(['fine-line', 'botanical']);
  const [tagInput, setTagInput] = useState('');
  const ok = tags.length >= 3;
  return (
    <DashboardLayout scope="studio" title={lang === 'tr' ? 'Dövme ekle' : 'Add tattoo'} subtitle={lang === 'tr' ? 'Portföyünüze yeni bir parça ekleyin.' : 'Add a new piece to your portfolio.'}>
      <div className="split">
        <form className="col" onSubmit={(e) => e.preventDefault()}>
          <Field label={lang === 'tr' ? 'Görsel' : 'Image'}>
            <UploadImage label={lang === 'tr' ? 'Görsel yükle' : 'Upload image'} />
          </Field>
          <Field label={lang === 'tr' ? 'Başlık' : 'Title'}><Input placeholder={lang === 'tr' ? 'Sessiz çiçek' : 'Quiet bloom'} /></Field>
          <Field label={lang === 'tr' ? 'Stil' : 'Style'}>
            <Select options={STYLES.map(s => ({ value: s.key, label: s[lang] }))} />
          </Field>
          <Field label={lang === 'tr' ? 'Etiketler (en az 3)' : 'Tags (min 3)'} hint={`${tags.length} / 3 ${ok ? '✓' : ''}`}>
            <div className="row wrap gap-2" style={{ marginBottom: 8 }}>
              {tags.map(t => (
                <span key={t} className="tag" onClick={() => setTags(tags.filter(x => x !== t))} style={{ cursor: 'pointer' }}>
                  {t} ×
                </span>
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
          <Field label={lang === 'tr' ? 'Şehir (opsiyonel)' : 'City (optional)'}>
            <Select options={[{ value: '', label: '—' }, ...CITIES.map(c => ({ value: c, label: c }))]} />
          </Field>
          <Field label={lang === 'tr' ? 'Fiyat (opsiyonel)' : 'Price (optional)'}><Input type="number" placeholder="₺" /></Field>
          <div className="row gap-3" style={{ marginTop: 12 }}>
            <button className="btn btn-accent" type="submit" disabled={!ok}>{lang === 'tr' ? 'Yayınla' : 'Publish'}</button>
            <button className="btn btn-ghost" type="button">{lang === 'tr' ? 'Taslak' : 'Save draft'}</button>
          </div>
        </form>
        <aside className="card col">
          <Swatch id="sw-3" ratio={1.1} dark />
          <div className="card-pad col gap-2">
            <span className="mono text-muted">{lang === 'tr' ? 'Önizleme' : 'Preview'}</span>
            <h3 className="display" style={{ fontSize: 22, margin: 0 }}>—</h3>
            <span className="mono text-muted">{lang === 'tr' ? 'Aslı Vardar tarafından' : 'by Aslı Vardar'}</span>
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
  const [requestId, setRequestId] = useState(REQUESTS[0].id);
  const req = REQUESTS.find(r => r.id === requestId)!;
  return (
    <DashboardLayout scope="studio" title={lang === 'tr' ? 'Teklif ver' : 'Give offer'} subtitle={lang === 'tr' ? 'Bir brief seçin ve teklifinizi hazırlayın.' : 'Pick a brief and prepare your offer.'}>
      <div className="split">
        <div className="col gap-3">
          <span className="mono text-muted">{lang === 'tr' ? 'Brief seçin' : 'Choose a brief'}</span>
          {REQUESTS.map(r => (
            <button key={r.id} onClick={() => setRequestId(r.id)} style={{ textAlign: 'left' }}>
              <div className="card card-pad col gap-1" style={{ borderColor: requestId === r.id ? 'var(--ink)' : 'var(--hairline)', background: requestId === r.id ? 'rgba(0,0,0,0.04)' : 'transparent' }}>
                <span className="mono text-muted">#{r.id.toUpperCase()} · {r.style} · {r.city}</span>
                <strong>{r.title}</strong>
                <span className="mono text-muted">₺{r.budgetMin.toLocaleString()}–₺{r.budgetMax.toLocaleString()} · {r.offerCount} offers</span>
              </div>
            </button>
          ))}
        </div>
        <form className="col" onSubmit={(e) => e.preventDefault()}>
          <span className="mono text-muted">{lang === 'tr' ? 'Teklifiniz' : 'Your offer'}</span>
          <h3 className="display" style={{ fontSize: 26, margin: '6px 0 4px' }}>{req.title}</h3>
          <p className="text-muted" style={{ margin: 0 }}>{req.description}</p>
          <hr className="hr" style={{ marginBlock: 20 }} />
          <div className="row gap-4 wrap">
            <Field label={lang === 'tr' ? 'Fiyat (₺)' : 'Price (₺)'}><Input type="number" defaultValue={3200} /></Field>
            <Field label={lang === 'tr' ? 'Tahmini süre (saat)' : 'Estimated duration (h)'}><Input type="number" defaultValue={3} /></Field>
          </div>
          <div className="row gap-4 wrap">
            <Field label={lang === 'tr' ? 'Randevu tarihi' : 'Appointment date'}><Input type="datetime-local" /></Field>
            <Field label={lang === 'tr' ? 'Şehir' : 'City'}>
              <Select options={CITIES.map(c => ({ value: c, label: c }))} />
            </Field>
          </div>
          <Field label={lang === 'tr' ? 'Mesaj' : 'Offer message'}>
            <Textarea rows={4} placeholder={lang === 'tr' ? 'Brief’e nasıl yaklaşacağınızı anlatın…' : 'Describe your approach to the brief…'} />
          </Field>
          <Field label={lang === 'tr' ? 'Tasarım / referans' : 'Proposed design / reference'}>
            <UploadImage label={lang === 'tr' ? 'Görsel yükle' : 'Upload image'} />
          </Field>
          <Field label={lang === 'tr' ? 'Teklif geçerlilik' : 'Offer validity'}>
            <Select options={[
              { value: '3', label: '3 days' },
              { value: '7', label: '7 days' },
              { value: '14', label: '14 days' },
            ]} />
          </Field>
          <Field label={lang === 'tr' ? 'Notlar / şartlar' : 'Notes / terms'}>
            <Textarea rows={2} />
          </Field>
          <div className="row gap-3" style={{ marginTop: 12 }}>
            <button className="btn btn-accent" type="submit">{lang === 'tr' ? 'Teklifi tamamla' : 'Complete offer'}</button>
            <button className="btn btn-ghost" type="button">{lang === 'tr' ? 'Taslak' : 'Save draft'}</button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}

/* ---------- My offers ---------- */
export function MyOffers() {
  useReveal();
  const { lang } = useLang();
  return (
    <DashboardLayout scope="studio" title={lang === 'tr' ? 'Tekliflerim' : 'My offers'} subtitle={lang === 'tr' ? 'Gönderdiğiniz tüm teklifler.' : 'Every offer you have sent.'}>
      <div className="row between center" style={{ marginBottom: 18 }}>
        <ChoiceGroup value="all" onChange={() => {}} options={[
          { value: 'all', label: lang === 'tr' ? 'Tümü' : 'All' },
          { value: 'draft', label: 'Draft' }, { value: 'sent', label: 'Sent' }, { value: 'viewed', label: 'Viewed' },
          { value: 'accepted', label: 'Accepted' }, { value: 'rejected', label: 'Rejected' }, { value: 'expired', label: 'Expired' },
        ]} />
      </div>
      <div className="col gap-3">
        {OFFERS.map(o => <OfferCard key={o.id} offer={o} accentOnAccepted />)}
      </div>
    </DashboardLayout>
  );
}

/* ---------- Order tracking (artist) ---------- */
export function StudioTracking() {
  useReveal();
  const { lang } = useLang();
  const statuses: { k: string; label: string; count: number }[] = [
    { k: 'request',   label: lang === 'tr' ? 'İstek geldi'        : 'Request created',  count: 12 },
    { k: 'sent',      label: lang === 'tr' ? 'Teklif gönderildi'  : 'Offer sent',       count: 7 },
    { k: 'accepted',  label: lang === 'tr' ? 'Müşteri kabul etti' : 'Customer accepted', count: 3 },
    { k: 'booked',    label: lang === 'tr' ? 'Randevu oluştu'    : 'Appointment booked', count: 3 },
    { k: 'completed', label: lang === 'tr' ? 'Tamamlandı'        : 'Completed',         count: 24 },
    { k: 'reviewed',  label: lang === 'tr' ? 'Yorum bırakıldı'   : 'Reviewed',          count: 18 },
    { k: 'cancelled', label: lang === 'tr' ? 'İptal'             : 'Cancelled',         count: 2 },
  ];
  return (
    <DashboardLayout scope="studio" title={lang === 'tr' ? 'Sipariş takibi' : 'Order tracking'}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginBottom: 28 }}>
        {statuses.map((s, i) => (
          <div key={s.k} className="card card-pad col gap-2">
            <span className="mono text-muted">{String(i + 1).padStart(2, '0')} · {s.label}</span>
            <span className="display" style={{ fontSize: 36, lineHeight: 1, margin: 0 }}>{s.count}</span>
          </div>
        ))}
      </div>
      <div className="col gap-3">
        {OFFERS.map(o => <OfferCard key={o.id} offer={o} />)}
      </div>
    </DashboardLayout>
  );
}

/* ---------- Calendar ---------- */
export function StudioCalendar() {
  useReveal();
  const { lang } = useLang();
  // simple month skeleton
  const days = Array.from({ length: 35 });
  const bookedDays = new Set([4, 8, 12, 17, 19, 22, 26]);
  const todayIdx = 14;
  return (
    <DashboardLayout scope="studio" title={lang === 'tr' ? 'Randevu takvimi' : 'Appointment calendar'}>
      <div className="split">
        <div className="card card-pad">
          <div className="row between center" style={{ marginBottom: 18 }}>
            <span className="mono text-muted">{lang === 'tr' ? 'Haziran 2026' : 'June 2026'}</span>
            <div className="row gap-2">
              <button className="mono">←</button>
              <button className="mono">→</button>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, minmax(0, 1fr))', gap: 1, background: 'var(--hairline)' }}>
            {['M','T','W','T','F','S','S'].map(d => <div key={d + Math.random()} className="mono text-muted" style={{ background: 'var(--paper)', padding: 6, textAlign: 'center' }}>{d}</div>)}
            {days.map((_, i) => {
              const day = i + 1 - 2;
              const inMonth = day > 0 && day <= 30;
              const booked = bookedDays.has(day);
              const today = i === todayIdx;
              return (
                <div key={i} style={{ background: 'var(--paper)', padding: 8, minHeight: 64, position: 'relative', opacity: inMonth ? 1 : 0.3 }}>
                  <div className="row between center">
                    <span className="mono" style={{ color: today ? 'var(--accent)' : 'var(--muted)' }}>{inMonth ? day : ''}</span>
                    {booked && <span style={{ width: 6, height: 6, borderRadius: 999, background: 'var(--accent)' }} />}
                  </div>
                  {booked && <span className="mono" style={{ fontSize: 10, color: 'var(--ink)', display: 'block', marginTop: 6 }}>{day === 12 ? '13:00' : day === 22 ? '11:00' : '15:30'}</span>}
                </div>
              );
            })}
          </div>
        </div>
        <div className="col">
          <span className="mono text-muted">{lang === 'tr' ? 'Yaklaşan' : 'Upcoming'}</span>
          <div className="col gap-3" style={{ marginTop: 12 }}>
            {APPOINTMENTS.map(a => <AppointmentCard key={a.id} ap={a} />)}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

/* ---------- Campaigns ---------- */
export function StudioCampaigns() {
  useReveal();
  const { lang } = useLang();
  return (
    <DashboardLayout scope="studio" title={lang === 'tr' ? 'Kampanyalarım' : 'My campaigns'}>
      <div className="row between center" style={{ marginBottom: 18 }}>
        <ChoiceGroup value="all" onChange={() => {}} options={[
          { value: 'all', label: lang === 'tr' ? 'Tümü' : 'All' },
          { value: 'active', label: lang === 'tr' ? 'Aktif' : 'Active' },
          { value: 'passive', label: lang === 'tr' ? 'Pasif' : 'Passive' },
        ]} />
        <button className="btn btn-sm btn-accent">{lang === 'tr' ? '＋ Kampanya' : '＋ Campaign'}</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
        {CAMPAIGNS.map(c => <CampaignCard key={c.id} c={c} />)}
      </div>
    </DashboardLayout>
  );
}

/* ---------- My artists ---------- */
export function StudioArtists() {
  useReveal();
  const { lang } = useLang();
  return (
    <DashboardLayout scope="studio" title={lang === 'tr' ? 'Sanatçılarım' : 'My artists'} subtitle={lang === 'tr' ? 'Stüdyo bünyesindeki ekip.' : 'The artists working under your studio.'}>
      <div className="row between center" style={{ marginBottom: 18 }}>
        <span className="mono text-muted">{lang === 'tr' ? 'Karanfil Atölye · 3 sanatçı' : 'Karanfil Atölye · 3 artists'}</span>
        <button className="btn btn-sm btn-accent">{lang === 'tr' ? '＋ Sanatçı ekle' : '＋ Add artist'}</button>
      </div>
      <div className="card">
        {ARTIST_MEMBERS.map(m => <div key={m.id} style={{ paddingInline: 22 }}><ArtistMemberRow m={m} /></div>)}
      </div>
    </DashboardLayout>
  );
}

/* ---------- Materials ---------- */
export function StudioMaterials() {
  useReveal();
  const { lang } = useLang();
  return (
    <DashboardLayout scope="studio" title={lang === 'tr' ? 'Dövme malzemeleri' : 'Tattoo materials'} subtitle={lang === 'tr' ? 'Demo amaçlı ürün katalogu.' : 'Sample product catalog (placeholder).'}>
      <div className="row between center" style={{ marginBottom: 18 }}>
        <ChoiceGroup value="all" onChange={() => {}} options={[
          { value: 'all', label: lang === 'tr' ? 'Tümü' : 'All' },
          { value: 'ink', label: 'Ink' }, { value: 'needle', label: 'Needles' },
          { value: 'machine', label: 'Machines' }, { value: 'aftercare', label: 'Aftercare' }, { value: 'hygiene', label: 'Hygiene' },
        ]} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 20 }}>
        {MATERIALS.map(m => <MaterialCard key={m.id} m={m} />)}
      </div>
    </DashboardLayout>
  );
}

/* ---------- Reviews ---------- */
export function StudioReviews() {
  useReveal();
  const { lang } = useLang();
  return (
    <DashboardLayout scope="studio" title={lang === 'tr' ? 'Yorumlar' : 'Reviews'}>
      <div className="row between center" style={{ marginBottom: 18 }}>
        <ChoiceGroup value="all" onChange={() => {}} options={[
          { value: 'all', label: 'All' },
          { value: '5', label: '5 ★' }, { value: '4', label: '4 ★' }, { value: '3', label: '3 ★' },
        ]} />
        <div className="row gap-3">
          <span className="mono text-muted">{lang === 'tr' ? 'Ortalama' : 'Average'}</span>
          <span className="display" style={{ fontSize: 24 }}>4.86</span>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
        {REVIEWS.map(r => <ReviewCard key={r.id} r={r} />)}
      </div>
    </DashboardLayout>
  );
}

/* ---------- Messages ---------- */
export function StudioMessages() {
  useReveal();
  const { lang } = useLang();
  const [activeId, setActiveId] = useState(CONVERSATIONS[0].id);
  const conv = CONVERSATIONS.find(c => c.id === activeId)!;
  const msgs = MESSAGES.filter(m => m.conversationId === activeId);
  return (
    <DashboardLayout scope="studio" title={lang === 'tr' ? 'Mesajlar' : 'Messages'}>
      <div className="msg-grid" style={{ gap: 0, border: '1px solid var(--hairline)' }}>
        <div className="col" style={{ borderRight: '1px solid var(--hairline)' }}>
          <div style={{ padding: 14, borderBottom: '1px solid var(--hairline)' }}><Input placeholder="Search" /></div>
          {CONVERSATIONS.map(c => (
            <button key={c.id} onClick={() => setActiveId(c.id)} style={{ display: 'block', width: '100%', textAlign: 'left' }}>
              <ConversationRow c={c} active={c.id === activeId} />
            </button>
          ))}
        </div>
        <div className="col">
          <div className="row between center" style={{ padding: 16, borderBottom: '1px solid var(--hairline)' }}>
            <div className="row gap-3 center"><AvatarBubble name={conv.with} size={36} /><strong>{conv.with}</strong></div>
            <button className="btn btn-sm btn-ghost">{lang === 'tr' ? 'Profil' : 'Profile'}</button>
          </div>
          <div className="col gap-3" style={{ padding: 18, minHeight: 320 }}>
            {msgs.map(m => (
              <div key={m.id} className="row" style={{ justifyContent: m.fromMe ? 'flex-end' : 'flex-start' }}>
                <div style={{ maxWidth: 420, padding: '10px 14px', border: '1px solid var(--hairline)', background: m.fromMe ? 'var(--ink)' : 'var(--paper-warm)', color: m.fromMe ? 'var(--paper)' : 'var(--ink)' }}>
                  <span style={{ fontSize: 14 }}>{m.text}</span>
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
export function StudioNotifications() {
  useReveal();
  const { lang } = useLang();
  return (
    <DashboardLayout scope="studio" title={lang === 'tr' ? 'Bildirimler' : 'Notifications'}>
      <div className="row between center" style={{ marginBottom: 18 }}>
        <ChoiceGroup value="all" onChange={() => {}} options={[
          { value: 'all', label: 'All' }, { value: 'offers', label: 'Offers' }, { value: 'msgs', label: 'Messages' },
          { value: 'appts', label: 'Appointments' }, { value: 'campaign', label: 'Campaigns' }, { value: 'system', label: 'System' },
        ]} />
        <button className="btn btn-sm btn-ghost">{lang === 'tr' ? 'Tümünü okundu işaretle' : 'Mark all read'}</button>
      </div>
      <div className="col">
        {NOTIFICATIONS.map(n => <NotificationItem key={n.id} n={n} />)}
      </div>
    </DashboardLayout>
  );
}

/* ---------- Statistics ---------- */
export function StudioStats() {
  useReveal();
  const { lang } = useLang();
  return (
    <DashboardLayout scope="studio" title={lang === 'tr' ? 'İstatistik' : 'Statistics'} subtitle={lang === 'tr' ? 'Son 30 günün performansı.' : 'Performance over the past 30 days.'}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
        <StatsCard label={lang === 'tr' ? 'Profil görüntüleme' : 'Profile views'}    value="12,480" delta="+8%" />
        <StatsCard label={lang === 'tr' ? 'Dövme görüntüleme' : 'Tattoo views'}     value="38,602" delta="+22%" />
        <StatsCard label={lang === 'tr' ? 'Beğeni' : 'Likes'}                       value="4,210" delta="+11%" />
        <StatsCard label={lang === 'tr' ? 'Takipçi' : 'Followers'}                 value="6,734" delta="+124" />
        <StatsCard label={lang === 'tr' ? 'Gönderilen teklif' : 'Sent offers'}     value="118" />
        <StatsCard label={lang === 'tr' ? 'Kabul edilen' : 'Accepted'}             value="45" delta="38%" />
        <StatsCard label={lang === 'tr' ? 'Tamamlanan iş' : 'Completed orders'}    value="24" />
        <StatsCard label={lang === 'tr' ? 'Çevrim oranı' : 'Conversion rate'}      value="6.2%" delta="+0.8 pts" />
      </div>
      <div className="card card-pad" style={{ marginTop: 32 }}>
        <span className="mono text-muted">{lang === 'tr' ? 'Haftalık görüntüleme' : 'Views per week'}</span>
        <ChartBars />
      </div>
    </DashboardLayout>
  );
}

function ChartBars() {
  const data = [42, 58, 64, 71, 65, 88, 102, 96, 121, 134, 128, 142];
  const max = Math.max(...data);
  return (
    <div className="row" style={{ alignItems: 'flex-end', gap: 8, height: 200, marginTop: 18 }}>
      {data.map((v, i) => (
        <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <span style={{ flex: 1, width: '100%', display: 'flex', alignItems: 'flex-end' }}>
            <span style={{ display: 'block', width: '100%', height: `${(v / max) * 100}%`, background: i === data.length - 1 ? 'var(--accent)' : 'var(--ink)', opacity: i === data.length - 1 ? 1 : 0.78 }} />
          </span>
          <span className="mono text-muted" style={{ fontSize: 9 }}>W{i + 1}</span>
        </div>
      ))}
    </div>
  );
}

/* ---------- Profile ---------- */
export function StudioProfile() {
  useReveal();
  const { lang } = useLang();
  const artist = ARTISTS[0];
  return (
    <DashboardLayout scope="studio" title={lang === 'tr' ? 'Profil' : 'Profile'}>
      <ProfileCard name={artist.name} role={lang === 'tr' ? 'Sanatçı · Karanfil Atölye' : 'Artist · Karanfil Atölye'} city={artist.city} rating={artist.rating} followers={artist.followers} />

      <div className="split" style={{ marginTop: 32 }}>
        <form className="col" onSubmit={(e) => e.preventDefault()}>
          <Field label={lang === 'tr' ? 'Profil fotoğrafı' : 'Profile photo'}>
            <UploadImage label={lang === 'tr' ? 'Görsel seç' : 'Select image'} />
          </Field>
          <Field label={lang === 'tr' ? 'Profil adı' : 'Profile name'}><Input defaultValue={artist.name} /></Field>
          <Field label={lang === 'tr' ? 'Kullanıcı adı' : 'Handle'}><Input defaultValue={artist.handle} /></Field>
          <Field label={lang === 'tr' ? 'Biyografi' : 'Bio'}><Textarea rows={3} defaultValue={artist.bio} /></Field>
          <Field label={lang === 'tr' ? 'Şehir' : 'City'}>
            <Select options={CITIES.map(c => ({ value: c, label: c }))} defaultValue={artist.city} />
          </Field>
          <Field label={lang === 'tr' ? 'Stiller' : 'Styles'}>
            <ChoiceGroup value={artist.styles[0]} onChange={() => {}} options={STYLES.map(s => ({ value: s.key, label: s[lang] }))} />
          </Field>
          <Field label={lang === 'tr' ? 'Başlangıç fiyatı' : 'Minimum price'}><Input type="number" defaultValue={artist.minPrice} /></Field>
          <div className="row gap-3" style={{ marginTop: 12 }}>
            <button className="btn btn-primary">{lang === 'tr' ? 'Kaydet' : 'Save'}</button>
            <button className="btn btn-ghost" type="button">{lang === 'tr' ? 'Vazgeç' : 'Discard'}</button>
          </div>
        </form>

        <aside className="col gap-3">
          <span className="mono text-muted">{lang === 'tr' ? 'Hesap' : 'Account'}</span>
          {[
            ['My information', 'Bilgilerim'],
            ['Security & privacy', 'Güvenlik & gizlilik'],
            ['Connected accounts', 'Bağlı hesaplar'],
            ['Order history', 'Sipariş geçmişi'],
            ['Reviews', 'Yorumlar'],
            ['Customer service', 'Müşteri hizmetleri'],
            ['FAQ', 'SSS'],
            ['About', 'Hakkında'],
            ['Contact', 'İletişim'],
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

/* helpers */
function SectionTitle({ num, label, action }: { num: string; label: string; action?: React.ReactNode }) {
  return (
    <div className="row between center" style={{ margin: '36px 0 16px', borderBottom: '1px solid var(--hairline)', paddingBottom: 10 }}>
      <span className="mono text-muted">{num} · {label}</span>
      {action}
    </div>
  );
}
