import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createHash } from 'node:crypto';
import { getSessionUser } from './_lib/auth.js';
import { createPortfolioReport } from './_lib/repo.js';

/**
 * Portfolio abuse reports — anonymous OR authed.
 *
 *   POST /api/reports {itemId, reason, note?}
 *
 * Rate-limit: 1 per (item, hashed IP) per 24h → 429. The 3rd distinct-source
 * report on the same item auto-hides it (handled in the repo layer). We store
 * only sha256(ip + AUTH_SECRET) — never the raw IP — and never expose reporter
 * identity anywhere public. Items that are already hidden or belong to a
 * non-active provider cannot be reported (prevents drive-by probes).
 */
const REASONS = new Set([
  'inappropriate_content',
  'stolen_work',
  'spam_fake',
  'offensive_content',
  'wrong_category',
  'other',
]);
const SECRET = process.env.AUTH_SECRET ?? '';

function clientIpHash(req: VercelRequest): string {
  const xff = (req.headers['x-forwarded-for'] as string | undefined) ?? '';
  const first = xff.split(',')[0]?.trim();
  const ip = first || req.socket?.remoteAddress || '';
  return createHash('sha256').update(ip + '|' + SECRET).digest('hex');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST');
      return res.status(405).json({ error: 'method not allowed' });
    }
    const { itemId, reason, note } = req.body ?? {};
    if (typeof itemId !== 'string' || !itemId) {
      return res.status(400).json({ error: 'itemId required' });
    }
    if (typeof reason !== 'string' || !REASONS.has(reason)) {
      return res.status(400).json({ error: 'valid reason required' });
    }
    if (note !== undefined && (typeof note !== 'string' || note.length > 500)) {
      return res.status(400).json({ error: 'note must be a string ≤ 500 chars' });
    }

    // Anonymous is allowed; if logged in we tag the report (but still count by
    // IP hash for the rate limit / auto-hide threshold).
    const user = await getSessionUser(req);

    const outcome = await createPortfolioReport({
      itemId,
      reporterId: user?.id ?? null,
      ipHash: clientIpHash(req),
      reason,
      note: typeof note === 'string' ? note.trim() : undefined,
    });

    if (outcome === 'not-found') return res.status(404).json({ error: 'not found' });
    if (outcome === 'not-public') return res.status(404).json({ error: 'not found' });
    if (outcome === 'rate-limited') return res.status(429).json({ error: 'already reported recently' });
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('reports api error', err instanceof Error ? err.message : '');
    return res.status(500).json({ error: 'internal error' });
  }
}
