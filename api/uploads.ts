import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createHash } from 'node:crypto';
import { put } from '@vercel/blob';
import { getSessionUser } from './_lib/auth.js';
import {
  listApprovedPortfolio, listPortfolioByArtist,
  createPortfolioItem, countRecentPortfolioByArtist, updateProfile,
  createPortfolioReport,
  type PortfolioItem,
} from './_lib/repo.js';
import { isValidStyle } from './_lib/styles.js';
import { evaluateArtistActivation } from './auth.js';

/**
 * Portfolio surface — uploads + abuse reports.
 *
 *   GET  /api/uploads                   → public feed (visible items only)
 *   GET  /api/uploads?mine=1            → the signed-in provider's own items
 *   POST /api/uploads                   → provider creates an item (session)
 *   POST /api/uploads?action=report     → anonymous OR authed report on an item
 *
 * Admin moderation actions (hide/unhide/delete/mark-reviewed) live under
 * /api/admin. The report path is co-located here (Vercel Hobby has a 12
 * function cap and reports are part of the portfolio domain).
 */

const MAX_IMAGE_BYTES = 4 * 1024 * 1024;
const MAX_PER_ARTIST_PER_DAY = 10;

const REPORT_REASONS = new Set([
  'inappropriate_content', 'stolen_work', 'spam_fake',
  'offensive_content', 'wrong_category', 'other',
]);
const AUTH_SECRET_FOR_HASH = process.env.AUTH_SECRET ?? '';

function clientIpHash(req: VercelRequest): string {
  const xff = (req.headers['x-forwarded-for'] as string | undefined) ?? '';
  const first = xff.split(',')[0]?.trim();
  const ip = first || req.socket?.remoteAddress || '';
  return createHash('sha256').update(ip + '|' + AUTH_SECRET_FOR_HASH).digest('hex');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method === 'GET') {
      if (req.query.mine === '1') {
        const user = await getSessionUser(req);
        if (!user || !user.providerType) {
          return res.status(401).json({ error: 'artist sign-in required' });
        }
        res.setHeader('Cache-Control', 'no-store');
        return res.status(200).json(await listPortfolioByArtist(user.id));
      }
      res.setHeader('Cache-Control', 's-maxage=10, stale-while-revalidate=60');
      return res.status(200).json(await listApprovedPortfolio());
    }

    if (req.method === 'POST') {
      // Report path — anonymous OR authed; keyed by ?action=report so it
      // shares an endpoint with the upload without changing existing calls.
      if (req.query.action === 'report') {
        const { itemId, reason, note } = req.body ?? {};
        if (typeof itemId !== 'string' || !itemId) return res.status(400).json({ error: 'itemId required' });
        if (typeof reason !== 'string' || !REPORT_REASONS.has(reason)) return res.status(400).json({ error: 'valid reason required' });
        if (note !== undefined && (typeof note !== 'string' || note.length > 500)) return res.status(400).json({ error: 'note must be a string ≤ 500 chars' });
        const reporter = await getSessionUser(req);
        const outcome = await createPortfolioReport({
          itemId, reporterId: reporter?.id ?? null,
          ipHash: clientIpHash(req),
          reason, note: typeof note === 'string' ? note.trim() : undefined,
        });
        if (outcome === 'not-found' || outcome === 'not-public') return res.status(404).json({ error: 'not found' });
        if (outcome === 'rate-limited') return res.status(429).json({ error: 'already reported recently' });
        return res.status(200).json({ ok: true });
      }

      const user = await getSessionUser(req);
      if (!user || !user.providerType) {
        return res.status(403).json({ error: 'only signed-in artists can publish to the feed' });
      }

      const { title, style, tags, imageData, imageRatio } = req.body ?? {};
      if (typeof title !== 'string' || !title.trim() || title.length > 120) {
        return res.status(400).json({ error: 'title required (max 120 chars)' });
      }
      if (typeof style !== 'string' || !isValidStyle(style)) {
        return res.status(400).json({ error: 'invalid style' });
      }
      const match = typeof imageData === 'string' && imageData.match(/^data:image\/jpeg;base64,(.+)$/);
      if (!match) return res.status(400).json({ error: 'imageData must be a JPEG data URL' });
      const bytes = Buffer.from(match[1], 'base64');
      if (bytes.length === 0 || bytes.length > MAX_IMAGE_BYTES || bytes[0] !== 0xff || bytes[1] !== 0xd8) {
        return res.status(400).json({ error: 'invalid image (JPEG, max 4MB)' });
      }

      const dayAgo = Date.now() - 86_400_000;
      if (await countRecentPortfolioByArtist(user.id, dayAgo) >= MAX_PER_ARTIST_PER_DAY) {
        return res.status(429).json({ error: 'daily upload limit reached' });
      }

      const ratio = Number(imageRatio);
      const id = `u${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
      const blob = await put(`uploads/${id}.jpg`, bytes, { access: 'public', contentType: 'image/jpeg' });

      const item: PortfolioItem = {
        id,
        artistId: user.id,
        artistName: user.name,
        title: title.trim(),
        style,
        tags: Array.isArray(tags) ? tags.filter((t): t is string => typeof t === 'string' && t.length <= 40).slice(0, 8) : [],
        imageUrl: blob.url,
        imageRatio: Number.isFinite(ratio) ? Math.min(2.5, Math.max(0.4, ratio)) : 1,
        // Report-based moderation: uploads are public by default while the
        // owner is active; admin can hide/delete later or reports auto-hide.
        status: 'approved',
        createdAt: new Date().toISOString().slice(0, 10),
        ts: Date.now(),
      };
      await createPortfolioItem(item);
      // The 3rd upload can be the trigger that completes activation — re-run
      // the gate now so the provider goes active on the same request. Passes
      // empty patch since nothing else changed; the gate reads the DB count.
      if (user.providerType && user.providerStatus === 'pending_profile') {
        const nextStatus = await evaluateArtistActivation(user, {});
        if (nextStatus && nextStatus !== user.providerStatus) {
          await updateProfile(user.id, { providerStatus: nextStatus });
        }
      }
      return res.status(201).json(item);
    }

    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ error: 'method not allowed' });
  } catch (err) {
    console.error('uploads api error', err);
    return res.status(500).json({ error: 'internal error' });
  }
}
