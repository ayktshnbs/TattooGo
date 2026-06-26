import { Link } from 'react-router-dom';
import type {
  TattooDesign, ArtistProfile, StudioProfile, TattooRequest, Offer,
  Appointment, Review, Conversation, Notification, Campaign, ArtistMember, MaterialProduct
} from '../data/types';
import { AvatarBubble, Swatch } from './Visual';
import { useLang } from '../i18n/LangContext';

/* ------------ Tattoo card ------------ */
export function TattooCard({ design }: { design: TattooDesign }) {
  return (
    <article className="card" style={{ display: 'flex', flexDirection: 'column' }}>
      <Swatch id={design.swatch} ratio={design.imageRatio} label={`#${design.id}`} dark />
      <div className="card-pad col gap-2" style={{ flex: 1 }}>
        <div className="row between center">
          <span className="mono text-muted">{design.style}</span>
          <span className="mono text-muted">♡ {design.likes}</span>
        </div>
        <h3 className="display" style={{ fontSize: 22, margin: 0 }}>{design.title}</h3>
        <span className="mono text-muted">by {design.artistName}{design.city ? ` · ${design.city}` : ''}</span>
        {design.price && <span className="mono text-accent">₺{design.price.toLocaleString()}</span>}
      </div>
    </article>
  );
}

/* ------------ Artist card ------------ */
export function ArtistCard({ artist, dark, large }: { artist: ArtistProfile; dark?: boolean; large?: boolean }) {
  return (
    <Link
      to="/artists"
      className="card"
      style={{
        display: 'grid', gridTemplateColumns: large ? '1.1fr 1fr' : '1fr',
        background: dark ? 'transparent' : 'transparent',
        borderColor: dark ? 'var(--night-hairline)' : 'var(--hairline)',
        color: dark ? 'var(--night-text)' : 'var(--ink)',
      }}
    >
      <Swatch id={`sw-${(artist.portfolio.length % 6) + 1}`} ratio={large ? 0.95 : 1.1} dark={dark} />
      <div className="card-pad col gap-3" style={{ borderLeft: large ? `1px solid ${dark ? 'var(--night-hairline)' : 'var(--hairline)'}` : '0' }}>
        <div className="row between center">
          <span className="mono" style={{ color: dark ? 'var(--night-muted)' : 'var(--muted)' }}>{artist.city}</span>
          {artist.verified && <span className="tag tag-accent">Verified</span>}
        </div>
        <h3 className="display" style={{ fontSize: large ? 32 : 24, margin: 0 }}>{artist.name}</h3>
        <span className="mono" style={{ color: dark ? 'var(--night-muted)' : 'var(--muted)' }}>{artist.handle}</span>
        <p style={{ margin: 0, color: dark ? 'var(--night-muted)' : 'var(--muted)' }}>{artist.bio}</p>
        <div className="row wrap gap-2" style={{ marginTop: 'auto' }}>
          {artist.styles.map(s => <span key={s} className="tag" style={{ borderColor: dark ? 'var(--night-hairline)' : undefined, color: dark ? 'var(--night-text)' : undefined }}>{s}</span>)}
        </div>
        <div className="row between center" style={{ marginTop: 8 }}>
          <span className="mono" style={{ color: dark ? 'var(--night-text)' : 'var(--ink)' }}>★ {artist.rating} <span style={{ color: dark ? 'var(--night-muted)' : 'var(--muted)' }}>· {artist.reviewCount}</span></span>
          {artist.minPrice && <span className="mono text-accent">from ₺{artist.minPrice.toLocaleString()}</span>}
        </div>
      </div>
    </Link>
  );
}

/* ------------ Studio card ------------ */
export function StudioCard({ studio }: { studio: StudioProfile }) {
  return (
    <article className="card col">
      <Swatch id={`sw-${studio.cover === 'cover-1' ? 3 : 6}`} ratio={1.4} dark />
      <div className="card-pad col gap-2">
        <div className="row between center">
          <span className="mono text-muted">{studio.city} · est. {studio.established}</span>
          {studio.verified && <span className="tag tag-accent">Verified</span>}
        </div>
        <h3 className="display" style={{ fontSize: 26, margin: 0 }}>{studio.name}</h3>
        <p className="text-muted" style={{ margin: 0 }}>{studio.bio}</p>
        <div className="row between center" style={{ marginTop: 12 }}>
          <span className="mono">★ {studio.rating} <span className="text-muted">· {studio.reviewCount}</span></span>
          <span className="mono text-muted">{studio.artistIds.length} resident artists</span>
        </div>
      </div>
    </article>
  );
}

/* ------------ Request card ------------ */
export function RequestCard({ request, dark }: { request: TattooRequest; dark?: boolean }) {
  const { lang } = useLang();
  const statusLabels: Record<string, { en: string; tr: string }> = {
    open:       { en: 'Open',        tr: 'Açık' },
    reviewing:  { en: 'Reviewing',   tr: 'İnceleniyor' },
    booked:     { en: 'Booked',      tr: 'Randevulu' },
    completed:  { en: 'Completed',   tr: 'Tamamlandı' },
    cancelled:  { en: 'Cancelled',   tr: 'İptal' },
  };
  return (
    <article
      className="card card-pad col gap-3"
      style={{ borderColor: dark ? 'var(--night-hairline)' : 'var(--hairline)', color: dark ? 'var(--night-text)' : 'var(--ink)' }}
    >
      <div className="row between center">
        <span className="mono" style={{ color: dark ? 'var(--night-muted)' : 'var(--muted)' }}>#{request.id.toUpperCase()} · {request.style}</span>
        <span className="status" style={{ color: 'var(--accent)' }}>{statusLabels[request.status][lang]}</span>
      </div>
      <h3 className="display" style={{ fontSize: 24, margin: 0 }}>{request.title}</h3>
      <p style={{ margin: 0, color: dark ? 'var(--night-muted)' : 'var(--muted)' }}>{request.description}</p>
      <div className="row wrap gap-2">
        <span className="tag tag-soft">{request.placement}</span>
        <span className="tag tag-soft">{request.size.toUpperCase()}</span>
        <span className="tag tag-soft">{request.color}</span>
        <span className="tag tag-soft">{request.city}</span>
      </div>
      <div className="row between center" style={{ marginTop: 6 }}>
        <span className="mono" style={{ color: dark ? 'var(--night-muted)' : 'var(--muted)' }}>{lang === 'tr' ? 'Bütçe' : 'Budget'} · ₺{request.budgetMin.toLocaleString()}–₺{request.budgetMax.toLocaleString()}</span>
        <span className="mono">{request.offerCount} {lang === 'tr' ? 'teklif' : 'offers'}</span>
      </div>
    </article>
  );
}

/* ------------ Offer card ------------ */
export function OfferCard({ offer, accentOnAccepted = true }: { offer: Offer; accentOnAccepted?: boolean }) {
  const { lang } = useLang();
  const accent = accentOnAccepted && offer.status === 'accepted';
  return (
    <article
      className="card card-pad col gap-3"
      style={{ borderColor: accent ? 'var(--ink)' : 'var(--hairline)', background: accent ? 'rgba(0,0,0,0.04)' : 'transparent' }}
    >
      <div className="row between center">
        <div className="row center gap-3">
          <AvatarBubble name={offer.artistName} />
          <div className="col">
            <span className="mono text-muted">{offer.artistCity} · ★ {offer.rating} ({offer.reviewCount})</span>
            <strong style={{ fontFamily: 'var(--font-display)', fontSize: 20 }}>{offer.artistName}</strong>
          </div>
        </div>
        <span className={`status status-${offer.status}`}>{offer.status}</span>
      </div>
      <p style={{ margin: 0 }}>{offer.message}</p>
      <div className="row wrap gap-4">
        <KV label={lang === 'tr' ? 'Fiyat' : 'Price'} value={`₺${offer.price.toLocaleString()}`} accent />
        <KV label={lang === 'tr' ? 'Süre' : 'Duration'} value={`${offer.estimatedHours} h`} />
        <KV label={lang === 'tr' ? 'Randevu' : 'Appointment'} value={offer.appointmentAt} />
        <KV label={lang === 'tr' ? 'Geçerli' : 'Valid until'} value={offer.validUntil} />
      </div>
      <div className="row between center" style={{ marginTop: 6 }}>
        <div className="row gap-2">
          <button className="btn btn-sm">Message</button>
          <button className="btn btn-sm btn-ghost">Save</button>
        </div>
        <div className="row gap-2">
          <button className="btn btn-sm btn-ghost">Reject</button>
          <button className="btn btn-sm btn-accent">Accept</button>
        </div>
      </div>
    </article>
  );
}

function KV({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="col" style={{ minWidth: 100 }}>
      <span className="mono text-muted">{label}</span>
      <span className="mono" style={{ fontSize: 13, color: accent ? 'var(--accent)' : 'var(--ink)', letterSpacing: '0.06em' }}>{value}</span>
    </div>
  );
}

/* ------------ Stats card ------------ */
export function StatsCard({ label, value, delta }: { label: string; value: string; delta?: string }) {
  return (
    <div className="card card-pad col gap-2" style={{ minHeight: 140 }}>
      <span className="mono text-muted">{label}</span>
      <span className="display" style={{ fontSize: 44, margin: 0, lineHeight: 1 }}>{value}</span>
      {delta && <span className="mono text-accent">{delta}</span>}
    </div>
  );
}

/* ------------ Notification item ------------ */
export function NotificationItem({ n }: { n: Notification }) {
  return (
    <div className="row gap-4" style={{ padding: '14px 0', borderBottom: '1px solid var(--hairline)' }}>
      <span className="mono" style={{ width: 70, color: 'var(--muted)' }}>{n.time}</span>
      <span style={{ width: 8, height: 8, borderRadius: 999, background: n.read ? 'var(--hairline-strong)' : 'var(--accent)', marginTop: 8, flexShrink: 0 }} />
      <div className="col" style={{ flex: 1 }}>
        <strong style={{ fontSize: 15 }}>{n.title}</strong>
        <span className="text-muted" style={{ fontSize: 14 }}>{n.body}</span>
      </div>
      <span className="mono text-muted">{n.type}</span>
    </div>
  );
}

/* ------------ Message item (conversation list) ------------ */
export function ConversationRow({ c, active }: { c: Conversation; active?: boolean }) {
  return (
    <div
      className="row gap-3 center"
      style={{ padding: '14px 16px', borderBottom: '1px solid var(--hairline)', background: active ? 'var(--paper-warm)' : 'transparent', cursor: 'pointer' }}
    >
      <AvatarBubble name={c.with} size={36} />
      <div className="col" style={{ flex: 1, minWidth: 0 }}>
        <div className="row between">
          <strong>{c.with}</strong>
          <span className="mono text-muted">{c.lastTime}</span>
        </div>
        <span className="text-muted" style={{ fontSize: 13, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.lastText}</span>
      </div>
      {c.unread > 0 && <span className="tag tag-accent" style={{ padding: '2px 8px' }}>{c.unread}</span>}
    </div>
  );
}

/* ------------ Calendar card ------------ */
export function AppointmentCard({ ap }: { ap: Appointment }) {
  const { lang } = useLang();
  return (
    <article className="card card-pad col gap-2">
      <div className="row between">
        <span className="mono text-muted">{ap.date} · {ap.time} · {ap.durationMin}m</span>
        <span className={`status status-${ap.status === 'today' ? 'sent' : ap.status === 'completed' ? 'completed' : 'viewed'}`}>{ap.status}</span>
      </div>
      <h3 className="display" style={{ fontSize: 22, margin: 0 }}>{ap.requestTitle}</h3>
      <span className="text-muted">{lang === 'tr' ? 'Sanatçı' : 'Artist'}: {ap.artistName}</span>
      <span className="mono text-muted">{ap.location}</span>
    </article>
  );
}

/* ------------ Campaign card ------------ */
export function CampaignCard({ c }: { c: Campaign }) {
  return (
    <article className="card col">
      <Swatch id={c.swatch} ratio={1.4} dark />
      <div className="card-pad col gap-2">
        <div className="row between center">
          <span className="mono text-muted">{c.startDate} → {c.endDate}</span>
          <span className={`status ${c.active ? 'status-accepted' : 'status-expired'}`}>{c.active ? 'active' : 'passive'}</span>
        </div>
        <h3 className="display" style={{ fontSize: 26, margin: 0 }}>{c.title}</h3>
        <p className="text-muted" style={{ margin: 0 }}>{c.description}</p>
        <div className="row between center" style={{ marginTop: 8 }}>
          <span className="mono text-accent">-{c.discount}%</span>
          <button className="btn btn-sm btn-ghost">Edit</button>
        </div>
      </div>
    </article>
  );
}

/* ------------ Review card ------------ */
export function ReviewCard({ r }: { r: Review }) {
  return (
    <article className="card card-pad col gap-2">
      <div className="row between center">
        <span className="mono text-muted">{r.date}</span>
        <span className="mono">{'★'.repeat(r.rating)}<span className="text-muted">{'★'.repeat(5 - r.rating)}</span></span>
      </div>
      <p style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 20, fontStyle: 'italic', lineHeight: 1.35 }}>“{r.text}”</p>
      <div className="row between center" style={{ marginTop: 6 }}>
        <span>{r.authorName}</span>
        <span className="mono text-muted">{r.artistName} · {r.tattooTitle}</span>
      </div>
    </article>
  );
}

/* ------------ Profile card ------------ */
export function ProfileCard({ name, role, city, rating, followers }: { name: string; role: string; city: string; rating?: number; followers?: number }) {
  return (
    <div className="card card-pad row center gap-4">
      <AvatarBubble name={name} size={64} />
      <div className="col" style={{ flex: 1 }}>
        <span className="mono text-muted">{role} · {city}</span>
        <h3 className="display" style={{ fontSize: 26, margin: 0 }}>{name}</h3>
        <div className="row gap-3" style={{ marginTop: 6 }}>
          {rating && <span className="mono">★ {rating}</span>}
          {followers && <span className="mono text-muted">{followers.toLocaleString()} followers</span>}
        </div>
      </div>
      <button className="btn btn-sm">Edit</button>
    </div>
  );
}

/* ------------ Artist member row (studio) ------------ */
export function ArtistMemberRow({ m }: { m: ArtistMember }) {
  return (
    <div className="row center gap-4" style={{ padding: '16px 0', borderBottom: '1px solid var(--hairline)' }}>
      <AvatarBubble name={m.name} size={48} />
      <div className="col" style={{ flex: 1 }}>
        <strong>{m.name}</strong>
        <span className="text-muted">{m.role} · joined {m.joinedAt}</span>
        <div className="row gap-2" style={{ marginTop: 6 }}>{m.styles.map(s => <span key={s} className="tag tag-soft">{s}</span>)}</div>
      </div>
      <span className="mono">★ {m.rating}</span>
      <button className="btn btn-sm btn-ghost">Edit</button>
    </div>
  );
}

/* ------------ Material product row ------------ */
export function MaterialCard({ m }: { m: MaterialProduct }) {
  return (
    <article className="card card-pad col gap-2">
      <Swatch id={`sw-${(m.id.length % 6) + 1}`} ratio={1.4} />
      <span className="mono text-muted">{m.brand} · {m.category}</span>
      <h4 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 18 }}>{m.name}</h4>
      <div className="row between center" style={{ marginTop: 8 }}>
        <span className="mono">₺{m.price.toLocaleString()}</span>
        <span className="mono text-muted">{m.stock} in stock</span>
      </div>
      <button className="btn btn-sm" style={{ marginTop: 6 }}>Add to order</button>
    </article>
  );
}
