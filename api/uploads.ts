import type { VercelRequest, VercelResponse } from '@vercel/node';
import { del, put } from '@vercel/blob';
import { newId } from './_lib/db.js';
import { getSessionUser } from './_lib/auth.js';
import { ipHash } from './_lib/ip.js';
import { rateLimit, tooMany, HOUR } from './_lib/ratelimit.js';
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

// Vercel caps request bodies at ~4.5 MB and base64 inflates by 4/3, so the
// old 4 MB limit could never be reached — 3 MB is the real, reachable ceiling
// (the client downscales to 1080px JPEG anyway, typically < 500 KB).
const MAX_IMAGE_BYTES = 3 * 1024 * 1024;
const MAX_PER_ARTIST_PER_DAY = 10;
const REPORTS_PER_IP_PER_HOUR = 20;

const REPORT_REASONS = new Set([
  'inappropriate_content', 'stolen_work', 'spam_fake',
  'offensive_content', 'wrong_category', 'other',
]);
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
      res.setHeader('Cache-Control', 's-maxage=10, stale-while-revalidate=30');
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
        // Per-source ceiling on report rows (the per-item 24h rule lives in the repo).
        const hash = ipHash(req);
        if (tooMany(res, await rateLimit('report:ip', hash, REPORTS_PER_IP_PER_HOUR, HOUR))) return;
        const reporter = await getSessionUser(req);
        const outcome = await createPortfolioReport({
          itemId, reporterId: reporter?.id ?? null,
          ipHash: hash,
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
      // A suspended provider must not keep filling the store (their items are
      // already invisible); needs_review / pending may upload to complete a profile.
      if (user.providerStatus === 'suspended') {
        return res.status(403).json({ error: 'your provider profile is suspended' });
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
        return res.status(400).json({ error: 'invalid image (JPEG, max 3MB)' });
      }

      const dayAgo = Date.now() - 86_400_000;
      if (await countRecentPortfolioByArtist(user.id, dayAgo) >= MAX_PER_ARTIST_PER_DAY) {
        return res.status(429).json({ error: 'daily upload limit reached' });
      }

      const ratio = Number(imageRatio);
      const id = newId('u');
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
      try {
        await createPortfolioItem(item);
      } catch (err) {
        // Blob + row are two systems: if the row fails, remove the orphan file
        // so storage can't fill with images nothing references.
        try { await del(blob.url); } catch { /* orphan is harmless */ }
        throw err;
      }
      // The 3rd upload can be the trigger that completes activation — re-run
      // the gate now so the provider goes active on the same request. Passes
      // empty patch since nothing else changed; the gate reads the DB count.
      // Best-effort: the upload already succeeded, and the next profile save
      // re-evaluates anyway, so a failure here must not turn into a 500 that
      // makes the client retry (and duplicate) the upload.
      if (user.providerType && user.providerStatus === 'pending_profile') {
        try {
          const nextStatus = await evaluateArtistActivation(user, {});
          if (nextStatus && nextStatus !== user.providerStatus) {
            await updateProfile(user.id, { providerStatus: nextStatus });
          }
        } catch (err) {
          console.error('activation re-check failed after upload', err instanceof Error ? err.message : '');
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
