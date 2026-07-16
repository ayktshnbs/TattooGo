import type { VercelRequest, VercelResponse } from '@vercel/node';
import { del, put } from '@vercel/blob';
import { getSessionUser } from './_lib/auth.js';
import {
  listApprovedPortfolio, listPortfolioByArtist, listPendingPortfolio,
  createPortfolioItem, moderatePortfolio, countRecentPortfolioByArtist, countPendingPortfolio,
  type PortfolioItem,
} from './_lib/repo.js';
import { isValidStyle } from './_lib/styles.js';

/**
 * Portfolio uploads → the public landing feed.
 *
 * Records live in the repo (Postgres `portfolio_items` when DATABASE_URL is
 * set); ONLY the image files live in Vercel Blob.
 *
 * GET   /api/uploads                 → approved feed (public)
 * GET   /api/uploads?mine=1          → the signed-in artist's own items
 * GET   /api/uploads?status=pending  → moderation queue (admin token only)
 * POST  /api/uploads                 → artist publishes; pending until approved
 * PATCH /api/uploads {id, action}    → approve | reject (admin token; reject
 *                                      also deletes the image blob)
 */

const MAX_IMAGE_BYTES = 4 * 1024 * 1024;
const MAX_PER_ARTIST_PER_DAY = 10;
const MAX_PENDING_QUEUE = 50;

const ADMIN_TOKEN = process.env.ADMIN_TOKEN ?? '';
const isAdmin = (req: VercelRequest) => ADMIN_TOKEN.length > 0 && req.headers['x-admin-token'] === ADMIN_TOKEN;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method === 'GET') {
      if (req.query.status === 'pending') {
        if (!isAdmin(req)) return res.status(401).json({ error: 'admin token required' });
        res.setHeader('Cache-Control', 'no-store');
        return res.status(200).json(await listPendingPortfolio());
      }
      if (req.query.mine === '1') {
        const user = await getSessionUser(req);
        if (!user || (user.role !== 'artist' && user.role !== 'studio')) {
          return res.status(401).json({ error: 'artist sign-in required' });
        }
        res.setHeader('Cache-Control', 'no-store');
        return res.status(200).json(await listPortfolioByArtist(user.id));
      }
      res.setHeader('Cache-Control', 's-maxage=10, stale-while-revalidate=60');
      return res.status(200).json(await listApprovedPortfolio());
    }

    if (req.method === 'POST') {
      const user = await getSessionUser(req);
      if (!user || (user.role !== 'artist' && user.role !== 'studio')) {
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
      if (await countPendingPortfolio() >= MAX_PENDING_QUEUE) {
        return res.status(429).json({ error: 'moderation queue is full — try again later' });
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
        status: 'pending',
        createdAt: new Date().toISOString().slice(0, 10),
        ts: Date.now(),
      };
      await createPortfolioItem(item);
      return res.status(202).json(item);
    }

    if (req.method === 'PATCH') {
      if (!isAdmin(req)) return res.status(401).json({ error: 'admin token required' });
      const { id, action } = req.body ?? {};
      if (typeof id !== 'string' || (action !== 'approve' && action !== 'reject')) {
        return res.status(400).json({ error: 'id and action (approve|reject) required' });
      }
      const outcome = await moderatePortfolio(id, action);
      if (!outcome.ok) return res.status(404).json({ error: 'not found' });
      if (outcome.imageUrl) {
        try { await del(outcome.imageUrl); } catch { /* orphaned blob is harmless */ }
      }
      return res.status(200).json({ ok: true, id, action });
    }

    res.setHeader('Allow', 'GET, POST, PATCH');
    return res.status(405).json({ error: 'method not allowed' });
  } catch (err) {
    console.error('uploads api error', err);
    return res.status(500).json({ error: 'internal error' });
  }
}
