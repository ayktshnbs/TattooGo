import { neon } from '@neondatabase/serverless';
import { DATABASE_URL } from './config.js';
import { newId } from './db.js';

/**
 * Admin queries and audit-log writer. Kept separate from repo.ts so the seam
 * is obvious: nothing in the customer/provider code path imports this file.
 * All functions require Postgres — there is no Blob-fallback admin path (the
 * fallback is a legacy prototype code path; production uses Postgres).
 */

const usePg = DATABASE_URL.length > 0;
const sql = usePg ? neon(DATABASE_URL) : null!;

type Row = Record<string, unknown>;

/* --------------------------------- audit --------------------------------- */

/**
 * Every mutating admin action below is ONE statement: a data-modifying CTE
 * performs the change and the audit row is inserted FROM its RETURNING set.
 * So the audit row lands iff the change did (atomic), and a no-op (already
 * hidden, not a provider, …) writes no audit row at all.
 */

/** Small JSON snippet, capped so a stray full row never lands in the log. */
const clip = (v: unknown): string | null => {
  if (v === undefined || v === null) return null;
  const s = typeof v === 'string' ? v : JSON.stringify(v);
  return s.length > 500 ? s.slice(0, 500) : s;
};

export interface Paging { limit: number; offset: number }
/** Clamp caller-supplied paging: 1..200 rows, offset ≥ 0. */
export function paging(q: Record<string, unknown>): Paging {
  const limit = Math.min(200, Math.max(1, Number(q.limit ?? 200) || 200));
  const offset = Math.max(0, Number(q.offset ?? 0) || 0);
  return { limit, offset };
}

export async function listAuditLog({ limit, offset }: Paging = { limit: 100, offset: 0 }): Promise<Row[]> {
  if (!usePg) return [];
  const rows = await sql`SELECT id, admin_user_id, action, target_type, target_id, previous_value, new_value, created_at
    FROM admin_audit_log ORDER BY created_at DESC LIMIT ${limit} OFFSET ${offset}`;
  return rows.map(r => ({
    id: r.id, adminUserId: r.admin_user_id, action: r.action,
    targetType: r.target_type, targetId: r.target_id,
    previousValue: r.previous_value, newValue: r.new_value,
    createdAt: Number(r.created_at),
  }));
}

/* -------------------------------- summary -------------------------------- */

export async function adminSummary() {
  if (!usePg) throw new Error('admin summary requires postgres');
  const rows = await sql`SELECT
    (SELECT COUNT(*)::int FROM users)                                                       AS users_total,
    (SELECT COUNT(*)::int FROM users WHERE provider_type IS NULL AND deactivated_at IS NULL) AS customers,
    (SELECT COUNT(*)::int FROM users WHERE provider_type IS NOT NULL)                       AS providers_total,
    (SELECT COUNT(*)::int FROM users WHERE provider_type IS NOT NULL AND provider_status = 'active' AND deactivated_at IS NULL) AS providers_active,
    (SELECT COUNT(*)::int FROM users WHERE provider_type IS NOT NULL AND provider_status = 'pending_profile' AND deactivated_at IS NULL) AS providers_pending,
    (SELECT COUNT(*)::int FROM users WHERE provider_type IS NOT NULL AND provider_status = 'needs_review' AND deactivated_at IS NULL) AS providers_needs_review,
    (SELECT COUNT(*)::int FROM users WHERE provider_type IS NOT NULL AND provider_status = 'suspended' AND deactivated_at IS NULL) AS providers_suspended,
    (SELECT COUNT(*)::int FROM users WHERE deactivated_at IS NOT NULL)                      AS deactivated,
    (SELECT COUNT(*)::int FROM users WHERE is_admin = TRUE AND deactivated_at IS NULL)      AS admins,
    (SELECT COUNT(*)::int FROM requests WHERE status = 'open')                              AS requests_open,
    (SELECT COUNT(*)::int FROM requests WHERE status = 'booked')                            AS requests_booked,
    (SELECT COUNT(*)::int FROM requests WHERE status = 'completed')                         AS requests_completed,
    (SELECT COUNT(*)::int FROM requests WHERE status = 'cancelled')                         AS requests_cancelled,
    (SELECT COUNT(*)::int FROM offers)                                                      AS offers_total,
    (SELECT COUNT(*)::int FROM messages)                                                    AS messages_total,
    (SELECT COUNT(*)::int FROM portfolio_items WHERE status = 'pending')                    AS portfolio_pending,
    (SELECT COUNT(*)::int FROM portfolio_items WHERE status = 'approved')                   AS portfolio_approved,
    (SELECT COUNT(*)::int FROM reviews)                                                     AS reviews_total,
    (SELECT COUNT(*)::int FROM reviews WHERE hidden_at IS NOT NULL)                         AS reviews_hidden`;
  return rows[0];
}

/* --------------------------------- users --------------------------------- */

export type UserFilter =
  | 'all' | 'customers' | 'providers' | 'active' | 'pending_profile'
  | 'needs_review' | 'suspended' | 'deactivated' | 'admins';

export async function adminListUsers(filter: UserFilter, q: string | null, { limit, offset }: Paging = { limit: 200, offset: 0 }) {
  if (!usePg) return [];
  const like = q ? `%${q.toLowerCase()}%` : null;
  const rows = await sql`
    SELECT u.id, u.email, u.name, u.provider_type, u.provider_status, u.deactivated_at,
           u.is_admin, u.city, u.district, u.created_at,
           (SELECT COUNT(*)::int FROM requests r WHERE r.customer_id = u.id) AS request_count,
           (SELECT COUNT(*)::int FROM offers o WHERE o.artist_id = u.id OR o.customer_id = u.id) AS offer_count,
           (SELECT COUNT(*)::int FROM portfolio_items p WHERE p.artist_id = u.id) AS portfolio_count,
           (SELECT COUNT(*)::int FROM reviews rv WHERE rv.artist_id = u.id) AS review_count
    FROM users u
    WHERE
      (${filter}::text = 'all'
        OR (${filter}::text = 'customers'       AND u.provider_type IS NULL AND u.deactivated_at IS NULL)
        OR (${filter}::text = 'providers'       AND u.provider_type IS NOT NULL)
        OR (${filter}::text = 'active'          AND u.provider_type IS NOT NULL AND u.provider_status = 'active'          AND u.deactivated_at IS NULL)
        OR (${filter}::text = 'pending_profile' AND u.provider_type IS NOT NULL AND u.provider_status = 'pending_profile' AND u.deactivated_at IS NULL)
        OR (${filter}::text = 'needs_review'    AND u.provider_type IS NOT NULL AND u.provider_status = 'needs_review'    AND u.deactivated_at IS NULL)
        OR (${filter}::text = 'suspended'       AND u.provider_type IS NOT NULL AND u.provider_status = 'suspended'       AND u.deactivated_at IS NULL)
        OR (${filter}::text = 'deactivated'     AND u.deactivated_at IS NOT NULL)
        OR (${filter}::text = 'admins'          AND u.is_admin = TRUE))
      AND (${like}::text IS NULL OR LOWER(u.email) LIKE ${like} OR LOWER(u.name) LIKE ${like})
    ORDER BY u.created_at DESC, u.id LIMIT ${limit} OFFSET ${offset}`;
  return rows.map(mapAdminUser);
}

export async function adminGetUser(id: string) {
  if (!usePg) return null;
  const rows = await sql`SELECT u.id, u.email, u.name, u.provider_type, u.provider_status,
           u.deactivated_at, u.is_admin, u.city, u.district, u.public_address_label,
           u.styles, u.bio, u.is_public_location, u.latitude, u.longitude, u.created_at,
           (SELECT COUNT(*)::int FROM requests r WHERE r.customer_id = u.id) AS request_count,
           (SELECT COUNT(*)::int FROM offers o WHERE o.artist_id = u.id OR o.customer_id = u.id) AS offer_count,
           (SELECT COUNT(*)::int FROM portfolio_items p WHERE p.artist_id = u.id) AS portfolio_count,
           (SELECT COUNT(*)::int FROM reviews rv WHERE rv.artist_id = u.id) AS review_count
    FROM users u WHERE u.id = ${id} LIMIT 1`;
  if (!rows[0]) return null;
  const r = rows[0];
  return {
    ...mapAdminUser(r),
    styles: (r.styles as string[]) ?? [],
    bio: r.bio ?? null,
    publicAddressLabel: r.public_address_label ?? null,
    isPublicLocation: r.is_public_location ?? false,
    latitude: r.latitude == null ? null : Number(r.latitude),
    longitude: r.longitude == null ? null : Number(r.longitude),
  };
}

function mapAdminUser(r: Row) {
  return {
    id: r.id, email: r.email, name: r.name,
    providerType: r.provider_type, providerStatus: r.provider_status,
    deactivatedAt: r.deactivated_at == null ? null : Number(r.deactivated_at),
    isAdmin: r.is_admin === true,
    city: r.city ?? null, district: r.district ?? null,
    createdAt: r.created_at,
    requestCount: Number(r.request_count ?? 0),
    offerCount: Number(r.offer_count ?? 0),
    portfolioCount: Number(r.portfolio_count ?? 0),
    reviewCount: Number(r.review_count ?? 0),
  };
}

/* Set a provider's status + audit row in one statement. ok:false when the
 * target has no provider profile, is deactivated, or already has that status
 * (then nothing is written — no redundant audit row). */
export async function adminSetProviderStatus(adminId: string, userId: string, status: 'active' | 'needs_review' | 'suspended') {
  if (!usePg) return { ok: false as const };
  const rows = await sql`WITH upd AS (
      UPDATE users SET provider_status = ${status}
      WHERE id = ${userId} AND provider_type IS NOT NULL AND deactivated_at IS NULL
        AND provider_status IS DISTINCT FROM ${status}
      RETURNING id, (SELECT provider_status FROM users u2 WHERE u2.id = users.id) AS previous
    )
    INSERT INTO admin_audit_log (id, admin_user_id, action, target_type, target_id, previous_value, new_value, created_at)
    SELECT ${newId('adt')}, ${adminId}, 'set-provider-status', 'user', upd.id,
           json_build_object('providerStatus', upd.previous)::text, ${clip({ providerStatus: status })}, ${Date.now()}
    FROM upd
    RETURNING previous_value`;
  if (rows.length === 0) return { ok: false as const };
  return { ok: true as const, previous: rows[0].previous_value as string };
}

/** Soft-deactivate a user (same result as their self-delete, minus Blob cleanup —
 *  admin doesn't touch Blob to avoid destructive slips) + audit row, atomically.
 *  The guard (`deactivated_at IS NULL`) is in the UPDATE itself, so two admins
 *  clicking at once produce one change and one audit row. */
export async function adminDeactivateUser(adminId: string, userId: string) {
  if (!usePg) return { ok: false as const };
  const rows = await sql`WITH upd AS (
      UPDATE users SET
        deactivated_at = ${Date.now()},
        session_epoch = session_epoch + 1,
        provider_status = CASE WHEN provider_type IS NULL THEN NULL ELSE 'suspended' END
      WHERE id = ${userId} AND deactivated_at IS NULL
      RETURNING id, (SELECT provider_status FROM users u2 WHERE u2.id = users.id) AS previous_status
    )
    INSERT INTO admin_audit_log (id, admin_user_id, action, target_type, target_id, previous_value, new_value, created_at)
    SELECT ${newId('adt')}, ${adminId}, 'deactivate-user', 'user', upd.id,
           json_build_object('deactivatedAt', NULL, 'providerStatus', upd.previous_status)::text,
           ${clip({ deactivatedAt: 'now' })}, ${Date.now()}
    FROM upd
    RETURNING id`;
  return rows.length === 1 ? { ok: true as const } : { ok: false as const };
}

export async function adminReactivateUser(adminId: string, userId: string) {
  if (!usePg) return { ok: false as const };
  const rows = await sql`WITH upd AS (
      UPDATE users SET deactivated_at = NULL WHERE id = ${userId} AND deactivated_at IS NOT NULL RETURNING id
    )
    INSERT INTO admin_audit_log (id, admin_user_id, action, target_type, target_id, created_at)
    SELECT ${newId('adt')}, ${adminId}, 'reactivate-user', 'user', upd.id, ${Date.now()} FROM upd
    RETURNING id`;
  return rows.length === 1 ? { ok: true as const } : { ok: false as const };
}

/* ------------------------------- portfolio ------------------------------- */

export async function adminListPortfolio(status: 'pending' | 'approved' | 'all', { limit, offset }: Paging = { limit: 200, offset: 0 }) {
  if (!usePg) return [];
  const rows = await sql`SELECT p.id, p.artist_id, p.artist_name, p.title, p.style,
           p.image_url, p.image_ratio, p.status, p.created_at, p.ts,
           u.provider_type, u.provider_status, u.deactivated_at
    FROM portfolio_items p JOIN users u ON u.id = p.artist_id
    WHERE (${status}::text = 'all' OR p.status = ${status}::text)
    ORDER BY p.ts DESC, p.id LIMIT ${limit} OFFSET ${offset}`;
  return rows.map(r => ({
    id: r.id, artistId: r.artist_id, artistName: r.artist_name,
    title: r.title, style: r.style,
    imageUrl: r.image_url, imageRatio: Number(r.image_ratio),
    status: r.status, createdAt: r.created_at, ts: Number(r.ts),
    ownerProviderType: r.provider_type, ownerProviderStatus: r.provider_status,
    ownerDeactivated: r.deactivated_at != null,
  }));
}

/* -------------------------------- requests -------------------------------- */

export async function adminListRequests({ limit, offset }: Paging = { limit: 200, offset: 0 }) {
  if (!usePg) return [];
  const rows = await sql`SELECT r.id, r.title, r.style, r.city, r.district,
           r.budget_min, r.budget_max, r.reference_url, r.status, r.created_at,
           r.customer_id, r.customer_name,
           (SELECT COUNT(*)::int FROM offers o WHERE o.request_id = r.id) AS offer_count
    FROM requests r ORDER BY r.ts DESC, r.id LIMIT ${limit} OFFSET ${offset}`;
  return rows.map(r => ({
    id: r.id, title: r.title, style: r.style,
    city: r.city, district: r.district,
    budgetMin: r.budget_min == null ? null : Number(r.budget_min),
    budgetMax: r.budget_max == null ? null : Number(r.budget_max),
    referenceUrl: r.reference_url ?? null,
    status: r.status, createdAt: r.created_at,
    customerId: r.customer_id, customerName: r.customer_name,
    offerCount: Number(r.offer_count),
  }));
}

/* --------------------------------- offers -------------------------------- */

export async function adminListOffers({ limit, offset }: Paging = { limit: 200, offset: 0 }) {
  if (!usePg) return [];
  const rows = await sql`SELECT id, request_id, artist_id, artist_name,
           customer_id, customer_name, price, status, created_at, ts
    FROM offers ORDER BY ts DESC, id LIMIT ${limit} OFFSET ${offset}`;
  return rows.map(r => ({
    id: r.id, requestId: r.request_id,
    artistId: r.artist_id, artistName: r.artist_name,
    customerId: r.customer_id, customerName: r.customer_name,
    price: Number(r.price), status: r.status,
    createdAt: r.created_at, ts: Number(r.ts),
  }));
}

/* -------------------------------- reviews -------------------------------- */

export async function adminListReviews({ limit, offset }: Paging = { limit: 200, offset: 0 }) {
  if (!usePg) return [];
  const rows = await sql`SELECT id, artist_id, customer_id, customer_name,
           rating, text, request_title, created_at, ts, hidden_at, hidden_by
    FROM reviews ORDER BY ts DESC, id LIMIT ${limit} OFFSET ${offset}`;
  return rows.map(r => ({
    id: r.id, artistId: r.artist_id, customerId: r.customer_id,
    customerName: r.customer_name, rating: Number(r.rating), text: r.text,
    requestTitle: r.request_title, createdAt: r.created_at, ts: Number(r.ts),
    hiddenAt: r.hidden_at == null ? null : Number(r.hidden_at),
    hiddenBy: r.hidden_by ?? null,
  }));
}

export async function adminHideReview(adminId: string, reviewId: string) {
  if (!usePg) return { ok: false as const };
  const rows = await sql`WITH upd AS (
      UPDATE reviews SET hidden_at = ${Date.now()}, hidden_by = ${adminId}
      WHERE id = ${reviewId} AND hidden_at IS NULL RETURNING id
    )
    INSERT INTO admin_audit_log (id, admin_user_id, action, target_type, target_id, created_at)
    SELECT ${newId('adt')}, ${adminId}, 'hide-review', 'review', upd.id, ${Date.now()} FROM upd
    RETURNING id`;
  return rows.length === 1 ? { ok: true as const } : { ok: false as const };
}

export async function adminUnhideReview(adminId: string, reviewId: string) {
  if (!usePg) return { ok: false as const };
  const rows = await sql`WITH upd AS (
      UPDATE reviews SET hidden_at = NULL, hidden_by = NULL
      WHERE id = ${reviewId} AND hidden_at IS NOT NULL RETURNING id
    )
    INSERT INTO admin_audit_log (id, admin_user_id, action, target_type, target_id, created_at)
    SELECT ${newId('adt')}, ${adminId}, 'unhide-review', 'review', upd.id, ${Date.now()} FROM upd
    RETURNING id`;
  return rows.length === 1 ? { ok: true as const } : { ok: false as const };
}

/* ------------------------- portfolio moderation ------------------------- */

/** Hide + mark its pending reports reviewed + audit, in one statement. */
export async function adminHidePortfolioItem(adminId: string, itemId: string) {
  if (!usePg) return { ok: false as const };
  const now = Date.now();
  const rows = await sql`WITH upd AS (
      UPDATE portfolio_items SET hidden_at = ${now}, hidden_by = ${adminId}
      WHERE id = ${itemId} AND hidden_at IS NULL RETURNING id
    ), rev AS (
      UPDATE portfolio_reports SET reviewed_at = ${now}, reviewed_by = ${adminId}
      WHERE item_id IN (SELECT id FROM upd) AND reviewed_at IS NULL RETURNING id
    )
    INSERT INTO admin_audit_log (id, admin_user_id, action, target_type, target_id, new_value, created_at)
    SELECT ${newId('adt')}, ${adminId}, 'hide-portfolio-item', 'portfolio_item', upd.id,
           json_build_object('reviewedReports', (SELECT COUNT(*) FROM rev))::text, ${now}
    FROM upd
    RETURNING id`;
  return rows.length === 1 ? { ok: true as const } : { ok: false as const };
}

export async function adminUnhidePortfolioItem(adminId: string, itemId: string) {
  if (!usePg) return { ok: false as const };
  const rows = await sql`WITH upd AS (
      UPDATE portfolio_items SET hidden_at = NULL, hidden_by = NULL
      WHERE id = ${itemId} AND hidden_at IS NOT NULL RETURNING id
    )
    INSERT INTO admin_audit_log (id, admin_user_id, action, target_type, target_id, created_at)
    SELECT ${newId('adt')}, ${adminId}, 'unhide-portfolio-item', 'portfolio_item', upd.id, ${Date.now()} FROM upd
    RETURNING id`;
  return rows.length === 1 ? { ok: true as const } : { ok: false as const };
}

/** Delete the row (reports cascade) + audit; returns the image url so the
 *  caller can remove the Blob file AFTER the row is gone. */
export async function adminDeletePortfolioItem(adminId: string, itemId: string) {
  if (!usePg) return { ok: false as const, imageUrl: undefined };
  const rows = await sql`WITH del AS (
      DELETE FROM portfolio_items WHERE id = ${itemId} RETURNING id, image_url
    )
    INSERT INTO admin_audit_log (id, admin_user_id, action, target_type, target_id, previous_value, created_at)
    SELECT ${newId('adt')}, ${adminId}, 'delete-portfolio-item', 'portfolio_item', del.id,
           json_build_object('imageUrl', del.image_url)::text, ${Date.now()}
    FROM del
    RETURNING previous_value`;
  if (rows.length !== 1) return { ok: false as const, imageUrl: undefined };
  const prev = JSON.parse(String(rows[0].previous_value)) as { imageUrl?: string };
  return { ok: true as const, imageUrl: prev.imageUrl };
}

/** Mark an item's pending reports reviewed + audit. ok:false (no audit row)
 *  when there was nothing pending. Returns how many were marked. */
export async function adminMarkReportsReviewed(adminId: string, itemId: string) {
  if (!usePg) return { ok: false as const, reviewed: 0 };
  const rows = await sql`WITH rev AS (
      UPDATE portfolio_reports SET reviewed_at = ${Date.now()}, reviewed_by = ${adminId}
      WHERE item_id = ${itemId} AND reviewed_at IS NULL RETURNING id
    )
    INSERT INTO admin_audit_log (id, admin_user_id, action, target_type, target_id, new_value, created_at)
    SELECT ${newId('adt')}, ${adminId}, 'mark-reports-reviewed', 'portfolio_item', ${itemId},
           json_build_object('reviewed', COUNT(*))::text, ${Date.now()}
    FROM rev HAVING COUNT(*) > 0
    RETURNING new_value`;
  if (rows.length !== 1) return { ok: false as const, reviewed: 0 };
  return { ok: true as const, reviewed: Number((JSON.parse(String(rows[0].new_value)) as { reviewed: number }).reviewed) };
}
