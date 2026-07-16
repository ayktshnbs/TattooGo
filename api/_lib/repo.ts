import { neon } from '@neondatabase/serverless';
import { createHash } from 'node:crypto';
import { DATABASE_URL } from './config.js';
import {
  readCollection, writeCollection, readFeedIndex, writeFeedIndex, newId, today,
  type UserRow, type TokenRow, type RequestRow, type OfferRow, type MessageRow, type ReviewRow,
  type SubscriptionRow,
} from './db.js';

/**
 * Repository — the single data seam for every endpoint.
 *
 * Primary implementation: Neon/Postgres over the HTTP driver. All multi-table
 * state changes (accept/complete an offer) are single data-modifying-CTE
 * statements, i.e. atomic — no lost updates, no partial transitions.
 * Business rules (ownership, status gates, one-review-per-offer) are enforced
 * in the WHERE clauses and constraints, not just in JS.
 *
 * Fallback implementation: the original Blob-JSON collections, used only when
 * DATABASE_URL is not set. It keeps the exact same function contracts so
 * flipping to Postgres is env-only. Its known last-writer-wins caveat is
 * documented in BACKEND.md.
 */

const usePg = DATABASE_URL.length > 0;
const sql = usePg ? neon(DATABASE_URL) : null!;

export const backend = (): 'postgres' | 'blob' => (usePg ? 'postgres' : 'blob');

/* =========================== row mappers (pg) =========================== */

type Any = Record<string, unknown>;

const mapUser = (r: Any): UserRow => ({
  id: r.id as string, email: r.email as string, name: r.name as string,
  role: r.role as UserRow['role'], city: r.city as string ?? undefined,
  bio: r.bio as string ?? undefined, styles: (r.styles as string[]) ?? [],
  district: r.district as string ?? undefined,
  publicAddressLabel: r.public_address_label as string ?? undefined,
  latitude: r.latitude == null ? undefined : Number(r.latitude),
  longitude: r.longitude == null ? undefined : Number(r.longitude),
  isPublicLocation: r.is_public_location as boolean ?? false,
  passHash: r.pass_hash as string, salt: r.salt as string,
  emailVerified: r.email_verified as boolean,
  sessionEpoch: r.session_epoch as number,
  failedLogins: r.failed_logins as number,
  lockUntil: r.lock_until == null ? undefined : Number(r.lock_until),
  createdAt: r.created_at as string,
  providerStatus: r.provider_status as UserRow['providerStatus'],
});

const mapRequest = (r: Any): RequestRow & { offerCount?: number } => ({
  id: r.id as string, customerId: r.customer_id as string, customerName: r.customer_name as string,
  title: r.title as string, description: r.description as string,
  style: r.style as string, placement: r.placement as string, size: r.size as string, color: r.color as string,
  city: r.city as string ?? undefined,
  budgetMin: r.budget_min == null ? undefined : Number(r.budget_min),
  budgetMax: r.budget_max == null ? undefined : Number(r.budget_max),
  referenceUrl: r.reference_url as string ?? undefined,
  status: r.status as RequestRow['status'], createdAt: r.created_at as string, ts: Number(r.ts),
  ...(r.offer_count != null ? { offerCount: Number(r.offer_count) } : {}),
});

const mapOffer = (r: Any): OfferRow => ({
  id: r.id as string, requestId: r.request_id as string, requestTitle: r.request_title as string,
  artistId: r.artist_id as string, artistName: r.artist_name as string,
  customerId: r.customer_id as string, customerName: r.customer_name as string,
  price: Number(r.price), message: r.message as string,
  appointmentAt: r.appointment_at as string ?? undefined,
  status: r.status as OfferRow['status'], createdAt: r.created_at as string, ts: Number(r.ts),
});

const mapMessage = (r: Any): MessageRow => ({
  id: r.id as string, threadId: r.thread_id as string,
  fromId: r.from_id as string, fromName: r.from_name as string, toId: r.to_id as string,
  text: r.text as string, ts: Number(r.ts),
});

const mapReview = (r: Any): ReviewRow => ({
  id: r.id as string, offerId: r.offer_id as string, requestTitle: r.request_title as string,
  artistId: r.artist_id as string, customerId: r.customer_id as string, customerName: r.customer_name as string,
  rating: Number(r.rating), text: r.text as string, createdAt: r.created_at as string, ts: Number(r.ts),
});

export interface PortfolioItem {
  id: string; artistId: string; artistName: string; title: string; style: string;
  tags: string[]; imageUrl: string; imageRatio: number;
  status: 'pending' | 'approved'; createdAt: string; ts: number;
}

const mapPortfolio = (r: Any): PortfolioItem => ({
  id: r.id as string, artistId: r.artist_id as string, artistName: r.artist_name as string,
  title: r.title as string, style: r.style as string, tags: (r.tags as string[]) ?? [],
  imageUrl: r.image_url as string, imageRatio: Number(r.image_ratio),
  status: r.status as PortfolioItem['status'], createdAt: r.created_at as string, ts: Number(r.ts),
});

export interface NotificationRow {
  id: string; userId: string; kind: string; title: string; body: string; read: boolean; ts: number;
}

/* ================================ users ================================ */

export async function findUserByEmail(email: string): Promise<UserRow | null> {
  const e = email.toLowerCase().trim();
  if (usePg) {
    const rows = await sql`SELECT * FROM users WHERE email = ${e} LIMIT 1`;
    return rows[0] ? mapUser(rows[0]) : null;
  }
  return (await readCollection<UserRow>('users')).find(u => u.email === e) ?? null;
}

export async function getUserById(id: string): Promise<UserRow | null> {
  if (usePg) {
    const rows = await sql`SELECT * FROM users WHERE id = ${id} LIMIT 1`;
    return rows[0] ? mapUser(rows[0]) : null;
  }
  return (await readCollection<UserRow>('users')).find(u => u.id === id) ?? null;
}

/** @returns null on duplicate email */
export async function createUser(u: UserRow): Promise<UserRow | null> {
  if (usePg) {
    try {
      await sql`INSERT INTO users (id, email, name, role, city, bio, styles, pass_hash, salt, email_verified, session_epoch, failed_logins, created_at, provider_status)
        VALUES (${u.id}, ${u.email}, ${u.name}, ${u.role}, ${u.city ?? null}, ${u.bio ?? null}, ${u.styles ?? []}, ${u.passHash}, ${u.salt}, FALSE, 0, 0, ${u.createdAt}, ${u.providerStatus ?? null})`;
      return u;
    } catch (err) {
      if (err instanceof Error && /unique|duplicate/i.test(err.message)) return null;
      throw err;
    }
  }
  const users = await readCollection<UserRow>('users');
  if (users.some(x => x.email === u.email)) return null;
  await writeCollection('users', [...users, { ...u, emailVerified: false, sessionEpoch: 0, failedLogins: 0 }]);
  return u;
}

export async function setEmailVerified(userId: string): Promise<void> {
  if (usePg) {
    await sql`UPDATE users SET email_verified = TRUE WHERE id = ${userId}`;
    return;
  }
  const users = await readCollection<UserRow>('users');
  const u = users.find(x => x.id === userId);
  if (u) { u.emailVerified = true; await writeCollection('users', users); }
}

/** Set a new password, clear lockout, and bump the session epoch so every
 *  existing session (possibly an attacker's) is invalidated. */
export async function setPassword(userId: string, passHash: string, salt: string): Promise<void> {
  if (usePg) {
    await sql`UPDATE users SET pass_hash = ${passHash}, salt = ${salt},
      session_epoch = session_epoch + 1, failed_logins = 0, lock_until = NULL WHERE id = ${userId}`;
    return;
  }
  const users = await readCollection<UserRow>('users');
  const u = users.find(x => x.id === userId);
  if (u) {
    u.passHash = passHash; u.salt = salt;
    u.sessionEpoch = (u.sessionEpoch ?? 0) + 1;
    u.failedLogins = 0; u.lockUntil = undefined;
    await writeCollection('users', users);
  }
}

const MAX_LOGIN_FAILS = 5;
const LOCK_MS = 15 * 60 * 1000;

export function isLocked(u: UserRow): boolean {
  return typeof u.lockUntil === 'number' && u.lockUntil > Date.now();
}

export async function recordLoginFailure(userId: string): Promise<void> {
  if (usePg) {
    await sql`UPDATE users SET failed_logins = failed_logins + 1,
      lock_until = CASE WHEN failed_logins + 1 >= ${MAX_LOGIN_FAILS} THEN ${Date.now() + LOCK_MS} ELSE lock_until END
      WHERE id = ${userId}`;
    return;
  }
  const users = await readCollection<UserRow>('users');
  const u = users.find(x => x.id === userId);
  if (u) {
    u.failedLogins = (u.failedLogins ?? 0) + 1;
    if (u.failedLogins >= MAX_LOGIN_FAILS) { u.lockUntil = Date.now() + LOCK_MS; u.failedLogins = 0; }
    await writeCollection('users', users);
  }
}

export async function clearLoginFailures(userId: string): Promise<void> {
  if (usePg) {
    await sql`UPDATE users SET failed_logins = 0, lock_until = NULL WHERE id = ${userId}`;
    return;
  }
  const users = await readCollection<UserRow>('users');
  const u = users.find(x => x.id === userId);
  if (u && ((u.failedLogins ?? 0) > 0 || u.lockUntil)) {
    u.failedLogins = 0; u.lockUntil = undefined;
    await writeCollection('users', users);
  }
}

export interface PublicArtist {
  id: string; name: string; role: string; city?: string; district?: string; styles?: string[]; bio?: string;
  createdAt: string; rating: number | null; reviewCount: number;
  // Location is included ONLY when the artist enabled is_public_location.
  latitude?: number; longitude?: number; publicAddressLabel?: string; hasPublicLocation: boolean;
  previewImages: string[]; portfolioCount: number;
}

export interface ArtistFilters {
  city?: string;
  district?: string;
  q?: string;
  style?: string;
}

/** Public-safe discovery projection: registered artists/studios only, filtered
 *  in the DB. Location fields are exposed only when the artist opted in. */
export async function listArtistsPublic(filters: ArtistFilters = {}): Promise<PublicArtist[]> {
  const city = filters.city?.trim() || null;
  const district = filters.district?.trim() || null;
  const q = filters.q?.trim() ? `%${filters.q.trim().toLowerCase()}%` : null;
  const style = filters.style?.trim() || null;

  if (usePg) {
    const rows = await sql`
      SELECT u.id, u.name, u.role, u.city, u.district, u.styles, u.bio, u.created_at,
             u.is_public_location, u.latitude, u.longitude, u.public_address_label,
             ROUND(AVG(r.rating)::numeric, 1) AS rating, COUNT(DISTINCT r.id)::int AS review_count,
             COUNT(DISTINCT p.id)::int AS portfolio_count,
             (SELECT ARRAY(
                SELECT p2.image_url FROM portfolio_items p2
                WHERE p2.artist_id = u.id AND p2.status = 'approved'
                ORDER BY p2.ts DESC LIMIT 3)) AS preview_images
      FROM users u
      LEFT JOIN reviews r ON r.artist_id = u.id
      LEFT JOIN portfolio_items p ON p.artist_id = u.id AND p.status = 'approved'
      WHERE u.role IN ('artist','studio')
        AND u.provider_status = 'active'
        AND (${city}::text IS NULL OR u.city = ${city})
        AND (${district}::text IS NULL OR u.district = ${district})
        AND (${q}::text IS NULL OR LOWER(u.name) LIKE ${q})
        AND (${style}::text IS NULL OR ${style} = ANY(u.styles))
      GROUP BY u.id
      ORDER BY review_count DESC, u.name ASC
      LIMIT 200`;
    return rows.map(r => {
      const isPublic = (r.is_public_location as boolean) ?? false;
      return {
        id: r.id as string, name: r.name as string, role: r.role as string,
        city: r.city as string ?? undefined, district: r.district as string ?? undefined,
        styles: (r.styles as string[]) ?? [], bio: r.bio as string ?? undefined,
        createdAt: r.created_at as string,
        rating: r.rating == null ? null : Number(r.rating), reviewCount: Number(r.review_count),
        hasPublicLocation: isPublic && r.latitude != null && r.longitude != null,
        latitude: isPublic && r.latitude != null ? Number(r.latitude) : undefined,
        longitude: isPublic && r.longitude != null ? Number(r.longitude) : undefined,
        publicAddressLabel: isPublic ? (r.public_address_label as string ?? undefined) : undefined,
        previewImages: (r.preview_images as string[]) ?? [],
        portfolioCount: Number(r.portfolio_count),
      };
    });
  }

  // Blob fallback
  const users = await readCollection<UserRow>('users');
  const reviews = await readCollection<ReviewRow>('reviews');
  const feed = await readFeedIndex<FeedEntryLegacy>();
  return users
    .filter(u => (u.role === 'artist' || u.role === 'studio') && u.providerStatus === 'active')
    .filter(u => !city || u.city === city)
    .filter(u => !district || u.district === district)
    .filter(u => !q || u.name.toLowerCase().includes(q.replace(/%/g, '')))
    .filter(u => !style || (Array.isArray(u.styles) && u.styles.includes(style)))
    .map(u => {
      const mine = reviews.filter(r => r.artistId === u.id);
      const approved = feed.filter(e => e.artistId === u.id && e.status !== 'pending');
      const isPublic = (u.isPublicLocation ?? false) && u.latitude != null && u.longitude != null;
      return {
        id: u.id, name: u.name, role: u.role, city: u.city, district: u.district, styles: u.styles, bio: u.bio,
        createdAt: u.createdAt,
        rating: mine.length ? Math.round((mine.reduce((s, r) => s + r.rating, 0) / mine.length) * 10) / 10 : null,
        reviewCount: mine.length,
        hasPublicLocation: isPublic,
        latitude: isPublic ? u.latitude : undefined,
        longitude: isPublic ? u.longitude : undefined,
        publicAddressLabel: (u.isPublicLocation ?? false) ? u.publicAddressLabel : undefined,
        previewImages: approved.slice(0, 3).map(e => e.imageUrl),
        portfolioCount: approved.length,
      };
    })
    .sort((a, b) => (b.reviewCount - a.reviewCount) || a.name.localeCompare(b.name));
}

export interface ProfileUpdate {
  name?: string;
  bio?: string;
  city?: string;
  styles?: string[];
  district?: string;
  publicAddressLabel?: string;
  latitude?: number | null;
  longitude?: number | null;
  isPublicLocation?: boolean;
  providerStatus?: UserRow['providerStatus'];
}

/** Update the session user's own editable profile fields. Scoped to userId. */
export async function updateProfile(userId: string, p: ProfileUpdate): Promise<void> {
  if (usePg) {
    await sql`UPDATE users SET
      name = COALESCE(${p.name ?? null}, name),
      bio = COALESCE(${p.bio ?? null}, bio),
      city = COALESCE(${p.city ?? null}, city),
      styles = COALESCE(${p.styles ?? null}, styles),
      district = COALESCE(${p.district ?? null}, district),
      public_address_label = COALESCE(${p.publicAddressLabel ?? null}, public_address_label),
      latitude = COALESCE(${p.latitude ?? null}::double precision, latitude),
      longitude = COALESCE(${p.longitude ?? null}::double precision, longitude),
      is_public_location = COALESCE(${p.isPublicLocation ?? null}, is_public_location),
      provider_status = COALESCE(${p.providerStatus ?? null}, provider_status)
      WHERE id = ${userId}`;
    return;
  }
  const users = await readCollection<UserRow>('users');
  const u = users.find(x => x.id === userId);
  if (!u) return;
  if (p.name !== undefined) u.name = p.name;
  if (p.bio !== undefined) u.bio = p.bio;
  if (p.city !== undefined) u.city = p.city;
  if (p.styles !== undefined) u.styles = p.styles;
  if (p.district !== undefined) u.district = p.district;
  if (p.publicAddressLabel !== undefined) u.publicAddressLabel = p.publicAddressLabel;
  if (p.latitude !== undefined) u.latitude = p.latitude ?? undefined;
  if (p.longitude !== undefined) u.longitude = p.longitude ?? undefined;
  if (p.isPublicLocation !== undefined) u.isPublicLocation = p.isPublicLocation;
  if (p.providerStatus !== undefined) u.providerStatus = p.providerStatus;
  await writeCollection('users', users);
}

/* ============================ auth tokens ============================ */

const hashToken = (raw: string) => createHash('sha256').update(raw).digest('hex');

export async function createToken(userId: string, kind: 'verify' | 'reset', ttlMs: number): Promise<string> {
  const raw = newId('t') + createHash('sha256').update(`${userId}${Math.random()}${Date.now()}`).digest('hex').slice(0, 32);
  const row: TokenRow = { tokenHash: hashToken(raw), userId, kind, expiresAt: Date.now() + ttlMs };
  if (usePg) {
    await sql`INSERT INTO auth_tokens (token_hash, user_id, kind, expires_at) VALUES (${row.tokenHash}, ${userId}, ${kind}, ${row.expiresAt})`;
  } else {
    const tokens = await readCollection<TokenRow>('tokens');
    await writeCollection('tokens', [row, ...tokens.filter(t => t.expiresAt > Date.now()).slice(0, 200)]);
  }
  return raw;
}

/** Valid + unexpired + unused → marks used, returns the user id. */
export async function consumeToken(raw: string, kind: 'verify' | 'reset'): Promise<string | null> {
  const h = hashToken(raw);
  if (usePg) {
    const rows = await sql`UPDATE auth_tokens SET used_at = ${Date.now()}
      WHERE token_hash = ${h} AND kind = ${kind} AND used_at IS NULL AND expires_at > ${Date.now()}
      RETURNING user_id`;
    return rows[0] ? (rows[0].user_id as string) : null;
  }
  const tokens = await readCollection<TokenRow>('tokens');
  const t = tokens.find(x => x.tokenHash === h && x.kind === kind && !x.usedAt && x.expiresAt > Date.now());
  if (!t) return null;
  t.usedAt = Date.now();
  await writeCollection('tokens', tokens);
  return t.userId;
}

/* ============================== requests ============================== */

export async function listOpenRequests(): Promise<(RequestRow & { offerCount: number })[]> {
  if (usePg) {
    const rows = await sql`SELECT r.*, (SELECT COUNT(*) FROM offers o WHERE o.request_id = r.id)::int AS offer_count
      FROM requests r WHERE r.status = 'open' ORDER BY r.ts DESC LIMIT 200`;
    return rows.map(r => mapRequest(r) as RequestRow & { offerCount: number });
  }
  const [requests, offers] = [await readCollection<RequestRow>('requests'), await readCollection<OfferRow>('offers')];
  return requests.filter(r => r.status === 'open').sort((a, b) => b.ts - a.ts)
    .map(r => ({ ...r, offerCount: offers.filter(o => o.requestId === r.id).length }));
}

export async function listRequestsByCustomer(customerId: string): Promise<(RequestRow & { offerCount: number })[]> {
  if (usePg) {
    const rows = await sql`SELECT r.*, (SELECT COUNT(*) FROM offers o WHERE o.request_id = r.id)::int AS offer_count
      FROM requests r WHERE r.customer_id = ${customerId} ORDER BY r.ts DESC LIMIT 200`;
    return rows.map(r => mapRequest(r) as RequestRow & { offerCount: number });
  }
  const [requests, offers] = [await readCollection<RequestRow>('requests'), await readCollection<OfferRow>('offers')];
  return requests.filter(r => r.customerId === customerId).sort((a, b) => b.ts - a.ts)
    .map(r => ({ ...r, offerCount: offers.filter(o => o.requestId === r.id).length }));
}

export async function getRequestById(id: string): Promise<(RequestRow & { offerCount: number }) | null> {
  if (usePg) {
    const rows = await sql`SELECT r.*, (SELECT COUNT(*) FROM offers o WHERE o.request_id = r.id)::int AS offer_count
      FROM requests r WHERE r.id = ${id} LIMIT 1`;
    return rows[0] ? (mapRequest(rows[0]) as RequestRow & { offerCount: number }) : null;
  }
  const requests = await readCollection<RequestRow>('requests');
  const r = requests.find(x => x.id === id);
  if (!r) return null;
  const offers = await readCollection<OfferRow>('offers');
  return { ...r, offerCount: offers.filter(o => o.requestId === r.id).length };
}

export async function createRequest(r: RequestRow): Promise<void> {
  if (usePg) {
    await sql`INSERT INTO requests (id, customer_id, customer_name, title, description, style, placement, size, color, city, budget_min, budget_max, reference_url, status, created_at, ts)
      VALUES (${r.id}, ${r.customerId}, ${r.customerName}, ${r.title}, ${r.description}, ${r.style}, ${r.placement}, ${r.size}, ${r.color}, ${r.city ?? null}, ${r.budgetMin ?? null}, ${r.budgetMax ?? null}, ${r.referenceUrl ?? null}, ${r.status}, ${r.createdAt}, ${r.ts})`;
    return;
  }
  const requests = await readCollection<RequestRow>('requests');
  await writeCollection('requests', [r, ...requests]);
}

/** Cancel an open request owned by the customer. */
export async function cancelRequest(id: string, customerId: string): Promise<'ok' | 'not-found' | 'forbidden' | 'not-open'> {
  if (usePg) {
    const rows = await sql`UPDATE requests SET status = 'cancelled'
      WHERE id = ${id} AND customer_id = ${customerId} AND status = 'open' RETURNING id`;
    if (rows[0]) return 'ok';
    const probe = await sql`SELECT customer_id, status FROM requests WHERE id = ${id} LIMIT 1`;
    if (!probe[0]) return 'not-found';
    return (probe[0].customer_id as string) !== customerId ? 'forbidden' : 'not-open';
  }
  const requests = await readCollection<RequestRow>('requests');
  const r = requests.find(x => x.id === id);
  if (!r) return 'not-found';
  if (r.customerId !== customerId) return 'forbidden';
  if (r.status !== 'open') return 'not-open';
  r.status = 'cancelled';
  await writeCollection('requests', requests);
  return 'ok';
}

/* =============================== offers =============================== */

export async function listOffersByArtist(artistId: string): Promise<OfferRow[]> {
  if (usePg) return (await sql`SELECT * FROM offers WHERE artist_id = ${artistId} ORDER BY ts DESC LIMIT 200`).map(mapOffer);
  return (await readCollection<OfferRow>('offers')).filter(o => o.artistId === artistId).sort((a, b) => b.ts - a.ts);
}

export async function listOffersByCustomer(customerId: string): Promise<OfferRow[]> {
  if (usePg) return (await sql`SELECT * FROM offers WHERE customer_id = ${customerId} ORDER BY ts DESC LIMIT 200`).map(mapOffer);
  return (await readCollection<OfferRow>('offers')).filter(o => o.customerId === customerId).sort((a, b) => b.ts - a.ts);
}

export async function hasOffer(requestId: string, artistId: string): Promise<boolean> {
  if (usePg) return (await sql`SELECT 1 FROM offers WHERE request_id = ${requestId} AND artist_id = ${artistId} LIMIT 1`).length > 0;
  return (await readCollection<OfferRow>('offers')).some(o => o.requestId === requestId && o.artistId === artistId);
}

export async function offerExistsBetween(userA: string, userB: string): Promise<boolean> {
  if (usePg) {
    return (await sql`SELECT 1 FROM offers WHERE (customer_id = ${userA} AND artist_id = ${userB}) OR (customer_id = ${userB} AND artist_id = ${userA}) LIMIT 1`).length > 0;
  }
  const offers = await readCollection<OfferRow>('offers');
  return offers.some(o => (o.customerId === userA && o.artistId === userB) || (o.customerId === userB && o.artistId === userA));
}

/** @returns null on duplicate (request_id, artist_id) */
export async function createOffer(o: OfferRow): Promise<OfferRow | null> {
  if (usePg) {
    try {
      await sql`INSERT INTO offers (id, request_id, request_title, artist_id, artist_name, customer_id, customer_name, price, message, appointment_at, status, created_at, ts)
        VALUES (${o.id}, ${o.requestId}, ${o.requestTitle}, ${o.artistId}, ${o.artistName}, ${o.customerId}, ${o.customerName}, ${o.price}, ${o.message}, ${o.appointmentAt ?? null}, ${o.status}, ${o.createdAt}, ${o.ts})`;
      return o;
    } catch (err) {
      if (err instanceof Error && /unique|duplicate/i.test(err.message)) return null;
      throw err;
    }
  }
  const offers = await readCollection<OfferRow>('offers');
  if (offers.some(x => x.requestId === o.requestId && x.artistId === o.artistId)) return null;
  await writeCollection('offers', [o, ...offers]);
  return o;
}

/** Atomic accept: offer → accepted AND request → booked in one statement. */
export async function acceptOffer(offerId: string, customerId: string): Promise<OfferRow | null> {
  if (usePg) {
    const rows = await sql`WITH o AS (
        UPDATE offers SET status = 'accepted'
        WHERE id = ${offerId} AND customer_id = ${customerId} AND status = 'sent'
        RETURNING *
      ), r AS (
        UPDATE requests SET status = 'booked'
        WHERE id IN (SELECT request_id FROM o) AND status = 'open'
      )
      SELECT * FROM o`;
    return rows[0] ? mapOffer(rows[0]) : null;
  }
  const offers = await readCollection<OfferRow>('offers');
  const o = offers.find(x => x.id === offerId);
  if (!o || o.customerId !== customerId || o.status !== 'sent') return null;
  o.status = 'accepted';
  await writeCollection('offers', offers);
  const requests = await readCollection<RequestRow>('requests');
  const r = requests.find(x => x.id === o.requestId);
  if (r && r.status === 'open') { r.status = 'booked'; await writeCollection('requests', requests); }
  return o;
}

export async function rejectOffer(offerId: string, customerId: string): Promise<OfferRow | null> {
  if (usePg) {
    const rows = await sql`UPDATE offers SET status = 'rejected'
      WHERE id = ${offerId} AND customer_id = ${customerId} AND status = 'sent' RETURNING *`;
    return rows[0] ? mapOffer(rows[0]) : null;
  }
  const offers = await readCollection<OfferRow>('offers');
  const o = offers.find(x => x.id === offerId);
  if (!o || o.customerId !== customerId || o.status !== 'sent') return null;
  o.status = 'rejected';
  await writeCollection('offers', offers);
  return o;
}

/** Atomic complete: offer → completed AND request → completed. */
export async function completeOffer(offerId: string, artistId: string): Promise<OfferRow | null> {
  if (usePg) {
    const rows = await sql`WITH o AS (
        UPDATE offers SET status = 'completed'
        WHERE id = ${offerId} AND artist_id = ${artistId} AND status = 'accepted'
        RETURNING *
      ), r AS (
        UPDATE requests SET status = 'completed'
        WHERE id IN (SELECT request_id FROM o)
      )
      SELECT * FROM o`;
    return rows[0] ? mapOffer(rows[0]) : null;
  }
  const offers = await readCollection<OfferRow>('offers');
  const o = offers.find(x => x.id === offerId);
  if (!o || o.artistId !== artistId || o.status !== 'accepted') return null;
  o.status = 'completed';
  await writeCollection('offers', offers);
  const requests = await readCollection<RequestRow>('requests');
  const r = requests.find(x => x.id === o.requestId);
  if (r) { r.status = 'completed'; await writeCollection('requests', requests); }
  return o;
}

/** Used by PATCH handlers to distinguish 403 from 409 after a guarded update misses. */
export async function getOfferById(id: string): Promise<OfferRow | null> {
  if (usePg) {
    const rows = await sql`SELECT * FROM offers WHERE id = ${id} LIMIT 1`;
    return rows[0] ? mapOffer(rows[0]) : null;
  }
  return (await readCollection<OfferRow>('offers')).find(o => o.id === id) ?? null;
}

/* ============================== messages ============================== */

export interface ThreadSummary {
  peerId: string; peerName: string; peerRole: string; lastText: string; lastTs: number;
}

export async function listThreads(userId: string): Promise<ThreadSummary[]> {
  if (usePg) {
    const rows = await sql`
      SELECT DISTINCT ON (m.thread_id) m.thread_id, m.text, m.ts, m.from_id, m.to_id,
             u.name AS peer_name, u.role AS peer_role, u.id AS peer_id
      FROM messages m
      JOIN users u ON u.id = CASE WHEN m.from_id = ${userId} THEN m.to_id ELSE m.from_id END
      WHERE m.from_id = ${userId} OR m.to_id = ${userId}
      ORDER BY m.thread_id, m.ts DESC`;
    return rows
      .map(r => ({
        peerId: r.peer_id as string, peerName: r.peer_name as string, peerRole: r.peer_role as string,
        lastText: r.text as string, lastTs: Number(r.ts),
      }))
      .sort((a, b) => b.lastTs - a.lastTs);
  }
  const messages = (await readCollection<MessageRow>('messages')).filter(m => m.fromId === userId || m.toId === userId);
  const users = await readCollection<UserRow>('users');
  const byThread = new Map<string, MessageRow>();
  for (const m of messages) {
    const prev = byThread.get(m.threadId);
    if (!prev || m.ts > prev.ts) byThread.set(m.threadId, m);
  }
  return [...byThread.values()].sort((a, b) => b.ts - a.ts).map(last => {
    const peerId = last.fromId === userId ? last.toId : last.fromId;
    const peer = users.find(u => u.id === peerId);
    return { peerId, peerName: peer?.name ?? 'Deleted account', peerRole: peer?.role ?? 'customer', lastText: last.text, lastTs: last.ts };
  });
}

export async function listThread(userId: string, peerId: string): Promise<MessageRow[]> {
  const tid = [userId, peerId].sort().join(':');
  if (usePg) {
    // thread_id implies membership, but scope by user anyway — defense in depth
    return (await sql`SELECT * FROM messages WHERE thread_id = ${tid} AND (from_id = ${userId} OR to_id = ${userId}) ORDER BY ts ASC LIMIT 500`).map(mapMessage);
  }
  return (await readCollection<MessageRow>('messages'))
    .filter(m => m.threadId === tid && (m.fromId === userId || m.toId === userId))
    .sort((a, b) => a.ts - b.ts);
}

export async function createMessage(m: MessageRow): Promise<void> {
  if (usePg) {
    await sql`INSERT INTO messages (id, thread_id, from_id, from_name, to_id, text, ts)
      VALUES (${m.id}, ${m.threadId}, ${m.fromId}, ${m.fromName}, ${m.toId}, ${m.text}, ${m.ts})`;
    return;
  }
  const messages = await readCollection<MessageRow>('messages');
  await writeCollection('messages', [...messages, m]);
}

/* ============================== reviews ============================== */

export async function listReviewsByArtist(artistId: string): Promise<ReviewRow[]> {
  if (usePg) return (await sql`SELECT * FROM reviews WHERE artist_id = ${artistId} ORDER BY ts DESC LIMIT 200`).map(mapReview);
  return (await readCollection<ReviewRow>('reviews')).filter(r => r.artistId === artistId).sort((a, b) => b.ts - a.ts);
}

export async function listReviewsByCustomer(customerId: string): Promise<ReviewRow[]> {
  if (usePg) return (await sql`SELECT * FROM reviews WHERE customer_id = ${customerId} ORDER BY ts DESC LIMIT 200`).map(mapReview);
  return (await readCollection<ReviewRow>('reviews')).filter(r => r.customerId === customerId).sort((a, b) => b.ts - a.ts);
}

/** Guarded insert: only the offer's customer, only when completed, once. */
export async function createReview(
  customerId: string, customerName: string, offerId: string, rating: number, text: string,
): Promise<ReviewRow | 'not-found' | 'forbidden' | 'not-completed' | 'exists'> {
  const id = newId('rev');
  const nowRow = { id, createdAt: today(), ts: Date.now() };
  if (usePg) {
    try {
      const rows = await sql`INSERT INTO reviews (id, offer_id, request_title, artist_id, customer_id, customer_name, rating, text, created_at, ts)
        SELECT ${id}, o.id, o.request_title, o.artist_id, ${customerId}, ${customerName}, ${rating}, ${text}, ${nowRow.createdAt}, ${nowRow.ts}
        FROM offers o WHERE o.id = ${offerId} AND o.customer_id = ${customerId} AND o.status = 'completed'
        RETURNING *`;
      if (rows[0]) return mapReview(rows[0]);
    } catch (err) {
      if (err instanceof Error && /unique|duplicate/i.test(err.message)) return 'exists';
      throw err;
    }
    // Guarded insert matched nothing — figure out why for a precise error.
    const probe = await sql`SELECT customer_id, status FROM offers WHERE id = ${offerId} LIMIT 1`;
    if (!probe[0]) return 'not-found';
    if ((probe[0].customer_id as string) !== customerId) return 'forbidden';
    return 'not-completed';
  }
  const offers = await readCollection<OfferRow>('offers');
  const o = offers.find(x => x.id === offerId);
  if (!o) return 'not-found';
  if (o.customerId !== customerId) return 'forbidden';
  if (o.status !== 'completed') return 'not-completed';
  const reviews = await readCollection<ReviewRow>('reviews');
  if (reviews.some(r => r.offerId === offerId)) return 'exists';
  const row: ReviewRow = {
    id, offerId, requestTitle: o.requestTitle, artistId: o.artistId,
    customerId, customerName, rating, text, createdAt: nowRow.createdAt, ts: nowRow.ts,
  };
  await writeCollection('reviews', [row, ...reviews]);
  return row;
}

/* ============================= portfolio ============================= */

// Blob-mode portfolio rows live in the legacy feed index shape.
interface FeedEntryLegacy extends PortfolioItem { likes?: number; views?: number; swatch?: string; source?: string }

export async function listApprovedPortfolio(): Promise<PortfolioItem[]> {
  if (usePg) {
    const rows = await sql`
      SELECT p.* FROM portfolio_items p
      JOIN users u ON u.id = p.artist_id
      WHERE p.status = 'approved' AND u.provider_status = 'active'
      ORDER BY p.ts DESC LIMIT 200`;
    return rows.map(mapPortfolio);
  }
  const feed = await readFeedIndex<FeedEntryLegacy>();
  const users = await readCollection<UserRow>('users');
  const activeIds = new Set(users.filter(u => u.providerStatus === 'active').map(u => u.id));
  return feed.filter(e => e.status !== 'pending' && activeIds.has(e.artistId));
}

export async function listPortfolioByArtist(artistId: string): Promise<PortfolioItem[]> {
  if (usePg) return (await sql`SELECT * FROM portfolio_items WHERE artist_id = ${artistId} ORDER BY ts DESC LIMIT 200`).map(mapPortfolio);
  return (await readFeedIndex<FeedEntryLegacy>()).filter(e => e.artistId === artistId);
}

export async function listPendingPortfolio(): Promise<PortfolioItem[]> {
  if (usePg) return (await sql`SELECT * FROM portfolio_items WHERE status = 'pending' ORDER BY ts DESC LIMIT 200`).map(mapPortfolio);
  return (await readFeedIndex<FeedEntryLegacy>()).filter(e => e.status === 'pending');
}

export async function listApprovedPortfolioByArtist(artistId: string): Promise<PortfolioItem[]> {
  if (usePg) {
    const rows = await sql`
      SELECT p.* FROM portfolio_items p
      JOIN users u ON u.id = p.artist_id
      WHERE p.artist_id = ${artistId} AND p.status = 'approved' AND u.provider_status = 'active'
      ORDER BY p.ts DESC LIMIT 200`;
    return rows.map(mapPortfolio);
  }
  const feed = await readFeedIndex<FeedEntryLegacy>();
  const users = await readCollection<UserRow>('users');
  const user = users.find(u => u.id === artistId);
  if (user?.providerStatus !== 'active') return [];
  return feed.filter(e => e.artistId === artistId && e.status !== 'pending');
}

/** Aggregate, public-safe: how many jobs this artist has completed. */
export async function countCompletedJobsByArtist(artistId: string): Promise<number> {
  if (usePg) {
    const rows = await sql`SELECT COUNT(*)::int AS c FROM offers WHERE artist_id = ${artistId} AND status = 'completed'`;
    return Number(rows[0]?.c ?? 0);
  }
  return (await readCollection<OfferRow>('offers')).filter(o => o.artistId === artistId && o.status === 'completed').length;
}

export async function countRecentPortfolioByArtist(artistId: string, sinceTs: number): Promise<number> {
  if (usePg) {
    const rows = await sql`SELECT COUNT(*)::int AS c FROM portfolio_items WHERE artist_id = ${artistId} AND ts > ${sinceTs}`;
    return Number(rows[0]?.c ?? 0);
  }
  return (await readFeedIndex<FeedEntryLegacy>()).filter(e => e.artistId === artistId && e.ts > sinceTs).length;
}

export async function countPendingPortfolio(): Promise<number> {
  if (usePg) {
    const rows = await sql`SELECT COUNT(*)::int AS c FROM portfolio_items WHERE status = 'pending'`;
    return Number(rows[0]?.c ?? 0);
  }
  return (await readFeedIndex<FeedEntryLegacy>()).filter(e => e.status === 'pending').length;
}

export async function createPortfolioItem(p: PortfolioItem): Promise<void> {
  if (usePg) {
    await sql`INSERT INTO portfolio_items (id, artist_id, artist_name, title, style, tags, image_url, image_ratio, status, created_at, ts)
      VALUES (${p.id}, ${p.artistId}, ${p.artistName}, ${p.title}, ${p.style}, ${p.tags}, ${p.imageUrl}, ${p.imageRatio}, ${p.status}, ${p.createdAt}, ${p.ts})`;
    return;
  }
  const feed = await readFeedIndex<FeedEntryLegacy>();
  await writeFeedIndex([{ ...p, likes: 0, views: 0, swatch: 'sw-1', source: 'artist' }, ...feed]);
}

/** approve keeps the row; reject removes it and reports the image to delete. */
export async function moderatePortfolio(id: string, action: 'approve' | 'reject'): Promise<{ ok: boolean; imageUrl?: string }> {
  if (usePg) {
    if (action === 'approve') {
      const rows = await sql`UPDATE portfolio_items SET status = 'approved' WHERE id = ${id} RETURNING id`;
      return { ok: rows.length > 0 };
    }
    const rows = await sql`DELETE FROM portfolio_items WHERE id = ${id} RETURNING image_url`;
    return rows[0] ? { ok: true, imageUrl: rows[0].image_url as string } : { ok: false };
  }
  const feed = await readFeedIndex<FeedEntryLegacy>();
  const item = feed.find(e => e.id === id);
  if (!item) return { ok: false };
  if (action === 'approve') {
    item.status = 'approved';
    await writeFeedIndex(feed);
    return { ok: true };
  }
  await writeFeedIndex(feed.filter(e => e.id !== id));
  return { ok: true, imageUrl: item.imageUrl };
}

export async function portfolioCountsByArtist(artistId: string): Promise<{ approved: number; pending: number }> {
  const mine = await listPortfolioByArtist(artistId);
  return {
    approved: mine.filter(e => e.status !== 'pending').length,
    pending: mine.filter(e => e.status === 'pending').length,
  };
}

/* ============================ notifications ============================ */

export async function pushNotification(userId: string, kind: string, title: string, body: string): Promise<void> {
  if (!usePg) return; // blob mode derives notifications on read instead
  try {
    await sql`INSERT INTO notifications (id, user_id, kind, title, body, ts)
      VALUES (${newId('ntf')}, ${userId}, ${kind}, ${title}, ${body}, ${Date.now()})`;
  } catch (err) {
    // Notifications are best-effort; never break the triggering action.
    console.error('notification insert failed', err instanceof Error ? err.message : '');
  }
}

export async function listNotifications(userId: string, role: string): Promise<NotificationRow[]> {
  if (usePg) {
    const rows = await sql`SELECT * FROM notifications WHERE user_id = ${userId} ORDER BY ts DESC LIMIT 50`;
    return rows.map(r => ({
      id: r.id as string, userId: r.user_id as string, kind: r.kind as string,
      title: r.title as string, body: r.body as string, read: r.read as boolean, ts: Number(r.ts),
    }));
  }
  // Blob fallback: derive from offer activity, matching the previous behavior.
  const offers = await readCollection<OfferRow>('offers');
  const isArtist = role === 'artist' || role === 'studio';
  const mine = isArtist
    ? offers.filter(o => o.artistId === userId && (o.status === 'accepted' || o.status === 'rejected'))
    : offers.filter(o => o.customerId === userId && o.status !== 'sent');
  return mine.sort((a, b) => b.ts - a.ts).slice(0, 50).map(o => ({
    id: `drv-${o.id}`, userId, kind: o.status,
    title: isArtist ? o.customerName : o.artistName,
    body: o.requestTitle, read: true, ts: o.ts,
  }));
}

/* ===================== premium subscriptions (Creem) ===================== */
/* Written ONLY by the verified webhook (upsertSubscriptionFromWebhook).
 * Requires Postgres; in the legacy Blob fallback there is no premium (all
 * lookups resolve to "no subscription", which is safe: with the gate off it
 * changes nothing, and with the gate on it fails closed). */

const mapSub = (r: Any): SubscriptionRow => ({
  id: r.id as string, userId: r.user_id as string, provider: r.provider as string,
  providerCustomerId: r.provider_customer_id as string ?? undefined,
  providerSubscriptionId: r.provider_subscription_id as string ?? undefined,
  status: r.status as SubscriptionRow['status'],
  currentPeriodStart: r.current_period_start == null ? undefined : Number(r.current_period_start),
  currentPeriodEnd: r.current_period_end == null ? undefined : Number(r.current_period_end),
  cancelAtPeriodEnd: r.cancel_at_period_end as boolean ?? false,
  createdAt: Number(r.created_at), updatedAt: Number(r.updated_at),
});

export async function getSubscription(userId: string): Promise<SubscriptionRow | null> {
  if (!usePg) return null;
  const rows = await sql`SELECT * FROM provider_subscriptions WHERE user_id = ${userId} AND provider = 'creem' LIMIT 1`;
  return rows[0] ? mapSub(rows[0]) : null;
}

/** True only for a paid, unexpired subscription. Read fresh on every offer POST. */
export async function hasActivePremium(userId: string): Promise<boolean> {
  const sub = await getSubscription(userId);
  if (!sub) return false;
  const paid = sub.status === 'active' || sub.status === 'trialing';
  const unexpired = sub.currentPeriodEnd == null || sub.currentPeriodEnd > Date.now();
  return paid && unexpired;
}

export interface SubscriptionUpsert {
  userId: string;
  providerCustomerId?: string;
  providerSubscriptionId?: string;
  status: SubscriptionRow['status'];
  currentPeriodStart?: number;
  currentPeriodEnd?: number;
  cancelAtPeriodEnd?: boolean;
}

/** Upsert the one subscription row for a user (one per provider). */
export async function upsertSubscriptionFromWebhook(u: SubscriptionUpsert): Promise<void> {
  if (!usePg) return;
  const now = Date.now();
  await sql`INSERT INTO provider_subscriptions
    (id, user_id, provider, provider_customer_id, provider_subscription_id, status,
     current_period_start, current_period_end, cancel_at_period_end, created_at, updated_at)
    VALUES (${newId('sub')}, ${u.userId}, 'creem', ${u.providerCustomerId ?? null},
     ${u.providerSubscriptionId ?? null}, ${u.status}, ${u.currentPeriodStart ?? null},
     ${u.currentPeriodEnd ?? null}, ${u.cancelAtPeriodEnd ?? false}, ${now}, ${now})
    ON CONFLICT (user_id, provider) DO UPDATE SET
      provider_customer_id     = COALESCE(EXCLUDED.provider_customer_id, provider_subscriptions.provider_customer_id),
      provider_subscription_id = COALESCE(EXCLUDED.provider_subscription_id, provider_subscriptions.provider_subscription_id),
      status                   = EXCLUDED.status,
      current_period_start     = EXCLUDED.current_period_start,
      current_period_end       = EXCLUDED.current_period_end,
      cancel_at_period_end     = EXCLUDED.cancel_at_period_end,
      updated_at               = ${now}`;
}

/** Idempotency guard: true the FIRST time an event id is seen, false on repeats. */
export async function recordWebhookEvent(eventId: string): Promise<boolean> {
  if (!usePg) return true;
  try {
    await sql`INSERT INTO webhook_events (event_id, provider, received_at) VALUES (${eventId}, 'creem', ${Date.now()})`;
    return true;
  } catch (err) {
    if (err instanceof Error && /unique|duplicate/i.test(err.message)) return false;
    throw err;
  }
}
