import { neon } from '@neondatabase/serverless';
import type { VercelResponse } from '@vercel/node';
import { DATABASE_URL } from './config.js';

/**
 * Fixed-window rate limiter backed by the `rate_limits` table.
 *
 * Serverless functions share no memory, so the counter lives in Postgres and
 * is advanced with ONE atomic upsert: a new window starts when the stored one
 * has elapsed, otherwise the count increments. Keys are `<scope>:<subject>`
 * where the subject is an id or a hashed IP — never a raw address.
 *
 * Fail-open by design: if the table is unreachable the request proceeds (the
 * primary write would fail too, and an outage must not lock everyone out).
 * Without DATABASE_URL (local Blob prototype) there is no limiting at all.
 */

const usePg = DATABASE_URL.length > 0;
const sql = usePg ? neon(DATABASE_URL) : null!;

export interface RateLimitResult {
  allowed: boolean;
  /** Seconds until the window resets (0 when allowed). */
  retryAfterSec: number;
  count: number;
}

export async function rateLimit(scope: string, subject: string, limit: number, windowMs: number): Promise<RateLimitResult> {
  if (!usePg) return { allowed: true, retryAfterSec: 0, count: 0 };
  const key = `${scope}:${subject}`;
  const now = Date.now();
  try {
    const rows = await sql`INSERT INTO rate_limits (key, count, window_start) VALUES (${key}, 1, ${now})
      ON CONFLICT (key) DO UPDATE SET
        count        = CASE WHEN rate_limits.window_start + ${windowMs} <= ${now} THEN 1 ELSE rate_limits.count + 1 END,
        window_start = CASE WHEN rate_limits.window_start + ${windowMs} <= ${now} THEN ${now} ELSE rate_limits.window_start END
      RETURNING count, window_start`;
    const count = Number(rows[0]?.count ?? 1);
    const windowStart = Number(rows[0]?.window_start ?? now);
    // Opportunistic GC (~1 in 50 calls): rows whose window ended a day ago are
    // dead. Awaited — a serverless instance may be frozen right after responding.
    if (Math.random() < 0.02) {
      try { await sql`DELETE FROM rate_limits WHERE window_start < ${now - 86_400_000}`; } catch { /* housekeeping */ }
    }
    if (count <= limit) return { allowed: true, retryAfterSec: 0, count };
    return { allowed: false, retryAfterSec: Math.max(1, Math.ceil((windowStart + windowMs - now) / 1000)), count };
  } catch (err) {
    console.error('rate limit unavailable', err instanceof Error ? err.message : '');
    return { allowed: true, retryAfterSec: 0, count: 0 };
  }
}

/** Write the standard 429 (with Retry-After) and return true when limited. */
export function tooMany(res: VercelResponse, r: RateLimitResult, message = 'too many requests — try again later'): boolean {
  if (r.allowed) return false;
  res.setHeader('Retry-After', String(r.retryAfterSec));
  res.status(429).json({ error: message });
  return true;
}

/* Windows shared by the endpoints (ms). */
export const MINUTE = 60_000;
export const HOUR = 3_600_000;
export const DAY = 86_400_000;
