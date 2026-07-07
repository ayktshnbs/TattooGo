import type { VercelRequest, VercelResponse } from '@vercel/node';
import { del, put } from '@vercel/blob';
import { readFeedIndex, writeFeedIndex } from './_lib/db.js';
import { getSessionUser } from './_lib/auth.js';

/**
 * Portfolio uploads → the public landing feed.
 *
 * GET   /api/uploads                 → approved feed (public)
 * GET   /api/uploads?mine=1          → the signed-in artist's own items (all statuses)
 * GET   /api/uploads?status=pending  → moderation queue (admin token only)
 * POST  /api/uploads                 → signed-in artist publishes; lands as
 *                                      *pending* until approved
 * PATCH /api/uploads                 → { id, action: approve | reject }
 *                                      (admin token; reject deletes the blob)
 *
 * Identity comes from the session — clients cannot claim someone else's name.
 * Anti-abuse: per-artist daily cap, global pending cap, JPEG magic bytes.
 */

const MAX_IMAGE_BYTES = 4 * 1024 * 1024;
const MAX_PER_ARTIST_PER_DAY = 10;
const MAX_PENDING_QUEUE = 50;
const STYLES = new Set(['fine-line', 'realism', 'minimal', 'traditional', 'blackwork', 'geometric', 'lettering', 'watercolor', 'color']);

interface FeedEntry {
  id: string;
  title: string;
  artistId: string;
  artistName: string;
  style: string;
  tags: string[];
  likes: number;
  views: number;
  imageRatio: number;
  swatch: string;
  imageUrl: string;
  source: 'artist';
  createdAt: string;
  status?: 'pending' | 'approved';
  ts?: number;
}

const ADMIN_TOKEN = process.env.ADMIN_TOKEN ?? '';

function isAdmin(req: VercelRequest): boolean {
  return ADMIN_TOKEN.length > 0 && req.headers['x-admin-token'] === ADMIN_TOKEN;
}

// Versioned reads/writes via _lib/db — immune to the Blob CDN's
// stale-overwrite caching (see db.ts).
const readIndex = () => readFeedIndex<FeedEntry>();
const writeIndex = (entries: FeedEntry[]) => writeFeedIndex(entries);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method === 'GET') {
      const entries = await readIndex();

      if (req.query.status === 'pending') {
        if (!isAdmin(req)) return res.status(401).json({ error: 'admin token required' });
        res.setHeader('Cache-Control', 'no-store');
        return res.status(200).json(entries.filter(e => e.status === 'pending'));
      }

      if (req.query.mine === '1') {
        const user = await getSessionUser(req);
        if (!user || (user.role !== 'artist' && user.role !== 'studio')) {
          return res.status(401).json({ error: 'artist sign-in required' });
        }
        res.setHeader('Cache-Control', 'no-store');
        return res.status(200).json(entries.filter(e => e.artistId === user.id));
      }

      res.setHeader('Cache-Control', 's-maxage=10, stale-while-revalidate=60');
      return res.status(200).json(entries.filter(e => e.status !== 'pending'));
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
      if (typeof style !== 'string' || !STYLES.has(style)) {
        return res.status(400).json({ error: 'invalid style' });
      }
      const match = typeof imageData === 'string' && imageData.match(/^data:image\/jpeg;base64,(.+)$/);
      if (!match) return res.status(400).json({ error: 'imageData must be a JPEG data URL' });
      const bytes = Buffer.from(match[1], 'base64');
      if (bytes.length === 0 || bytes.length > MAX_IMAGE_BYTES || bytes[0] !== 0xff || bytes[1] !== 0xd8) {
        return res.status(400).json({ error: 'invalid image (JPEG, max 4MB)' });
      }

      const entries = await readIndex();
      const dayAgo = Date.now() - 86_400_000;
      if (entries.filter(e => e.artistId === user.id && (e.ts ?? 0) > dayAgo).length >= MAX_PER_ARTIST_PER_DAY) {
        return res.status(429).json({ error: 'daily upload limit reached' });
      }
      if (entries.filter(e => e.status === 'pending').length >= MAX_PENDING_QUEUE) {
        return res.status(429).json({ error: 'moderation queue is full — try again later' });
      }

      const ratio = Number(imageRatio);
      const id = `u${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
      const blob = await put(`uploads/${id}.jpg`, bytes, { access: 'public', contentType: 'image/jpeg' });

      const entry: FeedEntry = {
        id,
        title: title.trim(),
        artistId: user.id,
        artistName: user.name,
        style,
        tags: Array.isArray(tags) ? tags.filter((t): t is string => typeof t === 'string' && t.length <= 40).slice(0, 8) : [],
        likes: 0,
        views: 0,
        imageRatio: Number.isFinite(ratio) ? Math.min(2.5, Math.max(0.4, ratio)) : 1,
        swatch: 'sw-1',
        imageUrl: blob.url,
        source: 'artist',
        createdAt: new Date().toISOString().slice(0, 10),
        status: 'pending',
        ts: Date.now(),
      };
      await writeIndex([entry, ...entries]);
      return res.status(202).json(entry);
    }

    if (req.method === 'PATCH') {
      if (!isAdmin(req)) return res.status(401).json({ error: 'admin token required' });
      const { id, action } = req.body ?? {};
      if (typeof id !== 'string' || (action !== 'approve' && action !== 'reject')) {
        return res.status(400).json({ error: 'id and action (approve|reject) required' });
      }
      const entries = await readIndex();
      const entry = entries.find(e => e.id === id);
      if (!entry) return res.status(404).json({ error: 'not found' });

      if (action === 'approve') {
        entry.status = 'approved';
        await writeIndex(entries);
      } else {
        await writeIndex(entries.filter(e => e.id !== id));
        try { await del(entry.imageUrl); } catch { /* orphaned blob is harmless */ }
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
