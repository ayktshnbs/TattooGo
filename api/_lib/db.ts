import { del, list, put } from '@vercel/blob';

/**
 * Blob-backed JSON collections — the prototype's database.
 *
 * Writes are IMMUTABLE VERSIONS: every write creates a new pathname
 * (db/<name>/<sortable-stamp>.json) and reads resolve the latest version via
 * list() — a metadata API that is not CDN-cached. Overwriting a fixed
 * pathname is deliberately avoided: the Blob CDN caches by pathname (query
 * strings don't bust it), which served stale reads for minutes.
 * Old versions are pruned best-effort after each write.
 *
 * The shape mirrors relational tables (every row carries its owning user id)
 * so migrating to Postgres later is a mechanical swap of this module.
 * Concurrent writes are last-writer-wins; a lost race drops one write —
 * acceptable and documented for the prototype.
 */

export interface UserRow {
  id: string;
  email: string;          // stored lowercase, unique
  name: string;
  role: 'customer' | 'artist' | 'studio';
  city?: string;
  bio?: string;
  styles?: string[];
  // Public discovery location (artist/studio). Exposed only when isPublicLocation.
  district?: string;
  publicAddressLabel?: string;
  latitude?: number;
  longitude?: number;
  isPublicLocation?: boolean;
  passHash: string;
  salt: string;
  emailVerified?: boolean;
  sessionEpoch?: number;  // bump to invalidate all sessions for the user
  failedLogins?: number;  // login rate limiting
  lockUntil?: number;     // ms epoch
  createdAt: string;
  /** Optional provider profile type — one per account, user cannot change it.
   *  null = customer-only base account. Provider gating keys off THIS, not role. */
  providerType?: 'artist' | 'studio';
  providerStatus?: 'active' | 'pending_profile' | 'needs_review' | 'suspended';
  deactivatedAt?: number;  // ms epoch; set on soft-delete. Blocks login, hidden everywhere public.
  /** Admin gate. Granted ONLY by scripts/bootstrap-admin.mjs; every API write
   *  path strips this so a client can never flip it. */
  isAdmin?: boolean;
}

export interface TokenRow {
  tokenHash: string;      // sha256 of the raw token — raw is only ever emailed
  userId: string;
  kind: 'verify' | 'reset';
  expiresAt: number;      // ms epoch
  usedAt?: number;
}

export interface RequestRow {
  id: string;
  customerId: string;
  customerName: string;
  title: string;
  description: string;
  style: string;
  placement: string;
  size: string;
  color: string;
  city?: string;
  budgetMin?: number;
  budgetMax?: number;
  referenceUrl?: string;
  status: 'open' | 'booked' | 'completed' | 'cancelled';
  createdAt: string;
  ts: number;
}

export interface OfferRow {
  id: string;
  requestId: string;
  requestTitle: string;
  artistId: string;
  artistName: string;
  customerId: string;
  customerName: string;
  price: number;
  message: string;
  appointmentAt?: string;
  status: 'sent' | 'accepted' | 'rejected' | 'completed';
  createdAt: string;
  ts: number;
}

export interface MessageRow {
  id: string;
  threadId: string;       // `${customerId}:${artistId}` (sorted pair)
  fromId: string;
  fromName: string;
  toId: string;
  text: string;
  ts: number;
}

export interface ReviewRow {
  id: string;
  offerId: string;
  requestTitle: string;
  artistId: string;
  customerId: string;
  customerName: string;
  rating: number;         // 1..5
  text: string;
  createdAt: string;
  ts: number;
}

/** Premium subscription (artist/studio). Written ONLY by the verified Creem
 *  webhook; read by the offer gate. No card data is ever stored here. */
export type SubscriptionStatus = 'none' | 'trialing' | 'active' | 'past_due' | 'canceled' | 'expired';
export interface SubscriptionRow {
  id: string;
  userId: string;
  provider: string;                    // 'creem'
  providerCustomerId?: string;
  providerSubscriptionId?: string;
  status: SubscriptionStatus;
  currentPeriodStart?: number;         // ms epoch
  currentPeriodEnd?: number;           // ms epoch
  cancelAtPeriodEnd?: boolean;
  createdAt: number;                   // ms epoch
  updatedAt: number;                   // ms epoch
}

type CollectionName = 'users' | 'requests' | 'offers' | 'messages' | 'reviews' | 'tokens';

const KEEP_VERSIONS = 5;

/** Sortable, unique version stamp — lexicographic order == chronological. */
function versionStamp(): string {
  return `${Date.now().toString(36).padStart(10, '0')}${Math.random().toString(36).slice(2, 6)}`;
}

async function readVersioned<T>(prefix: string, legacyPath: string): Promise<T[]> {
  const { blobs } = await list({ prefix, limit: 1000 });
  let url: string | undefined;
  if (blobs.length > 0) {
    url = blobs.reduce((a, b) => (a.pathname > b.pathname ? a : b)).url;
  } else {
    // Fallback for data written before versioning existed.
    const legacy = await list({ prefix: legacyPath, limit: 1 });
    url = legacy.blobs[0]?.url;
  }
  if (!url) return [];
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) return [];
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

async function writeVersioned<T>(prefix: string, rows: T[]): Promise<void> {
  await put(`${prefix}${versionStamp()}.json`, JSON.stringify(rows), {
    access: 'public', // bucket URLs are unguessable; auth is enforced at the API layer
    addRandomSuffix: false,
    contentType: 'application/json',
  });
  // Best-effort prune: keep the newest few versions so racing readers still
  // resolve a valid (at worst slightly older) snapshot.
  try {
    const { blobs } = await list({ prefix, limit: 1000 });
    const stale = blobs
      .sort((a, b) => b.pathname.localeCompare(a.pathname))
      .slice(KEEP_VERSIONS)
      .map(b => b.url);
    if (stale.length > 0) await del(stale);
  } catch { /* pruning is housekeeping only */ }
}

export function readCollection<T>(name: CollectionName): Promise<T[]> {
  return readVersioned<T>(`db/${name}/`, `db/${name}.json`);
}

export function writeCollection<T>(name: CollectionName, rows: T[]): Promise<void> {
  return writeVersioned(`db/${name}/`, rows);
}

/** The moderated portfolio feed shares the same versioned storage strategy. */
export function readFeedIndex<T>(): Promise<T[]> {
  return readVersioned<T>('feed/v/', 'feed/index.json');
}

export function writeFeedIndex<T>(entries: T[]): Promise<void> {
  return writeVersioned('feed/v/', entries);
}

export function newId(prefix: string): string {
  return `${prefix}${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
}

export function today(): string {
  return new Date().toISOString().slice(0, 10);
}
