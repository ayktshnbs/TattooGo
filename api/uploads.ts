import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createHash } from 'node:crypto';
import { del, list, put } from '@vercel/blob';

/**
 * Community uploads API — the real backend behind src/data/uploads.ts.
 *
 * GET   /api/uploads                 → approved feed (public)
 * GET   /api/uploads?status=pending  → moderation queue (admin token only)
 * POST  /api/uploads                 → submit a design; lands as *pending*
 *                                      and is NOT public until approved
 * PATCH /api/uploads                 → { id, action: approve | reject }
 *                                      (admin token only; reject deletes
 *                                      the image blob too)
 *
 * Abuse controls: pre-moderation (nothing goes live unauthorised), per-IP
 * daily submission limit (IPs stored only as salted hashes), and a global
 * pending-queue cap so storage can't be flooded.
 *
 * Storage layout in Vercel Blob:
 *   uploads/<id>.jpg   — the images
 *   feed/index.json    — the metadata index (stable pathname, overwritten)
 *
 * The read-modify-write on index.json is not transactional; for a community
 * feed prototype a lost race simply drops one entry, which is acceptable.
 */

const INDEX_PATH = 'feed/index.json';
const MAX_IMAGE_BYTES = 4 * 1024 * 1024;
const MAX_PER_IP_PER_DAY = 5;
const MAX_PENDING_QUEUE = 50;
const STYLES = new Set(['fine-line', 'realism', 'minimal', 'traditional', 'blackwork', 'geometric', 'lettering', 'watercolor']);

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
  source: 'artist' | 'customer';
  createdAt: string;
  status?: 'pending' | 'approved'; // absent on pre-moderation entries → treated as approved
  ts?: number;      // submission time, used for the per-IP daily limit
  ipHash?: string;  // salted hash of the submitter IP — never exposed
}

const ADMIN_TOKEN = process.env.ADMIN_TOKEN ?? '';

function isAdmin(req: VercelRequest): boolean {
  const header = req.headers['x-admin-token'];
  return ADMIN_TOKEN.length > 0 && header === ADMIN_TOKEN;
}

/** Strip moderation-internal fields before anything leaves the API. */
function toPublic(entry: FeedEntry) {
  const { ipHash, ts, ...pub } = entry;
  return pub;
}

async function readIndex(): Promise<FeedEntry[]> {
  const { blobs } = await list({ prefix: INDEX_PATH, limit: 1 });
  if (blobs.length === 0) return [];
  const res = await fetch(blobs[0].url, { cache: 'no-store' });
  if (!res.ok) return [];
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

async function writeIndex(entries: FeedEntry[]): Promise<void> {
  await put(INDEX_PATH, JSON.stringify(entries), {
    access: 'public',
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: 'application/json',
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Admin-Token');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method === 'GET') {
      const entries = await readIndex();

      if (req.query.status === 'pending') {
        if (!isAdmin(req)) return res.status(401).json({ error: 'admin token required' });
        res.setHeader('Cache-Control', 'no-store');
        return res.status(200).json(entries.filter(e => e.status === 'pending').map(toPublic));
      }

      res.setHeader('Cache-Control', 's-maxage=10, stale-while-revalidate=60');
      return res.status(200).json(entries.filter(e => e.status !== 'pending').map(toPublic));
    }

    if (req.method === 'POST') {
      const { title, artistName, style, tags, imageData, imageRatio, source } = req.body ?? {};

      if (typeof title !== 'string' || !title.trim() || title.length > 120) {
        return res.status(400).json({ error: 'title required (max 120 chars)' });
      }
      if (typeof artistName !== 'string' || !artistName.trim() || artistName.length > 80) {
        return res.status(400).json({ error: 'artistName required (max 80 chars)' });
      }
      if (typeof style !== 'string' || !STYLES.has(style)) {
        return res.status(400).json({ error: 'invalid style' });
      }
      // Landing-feed publishing is artist-only — customer submissions are not
      // accepted, from the UI or otherwise.
      if (source !== 'artist') {
        return res.status(403).json({ error: 'only artists can publish to the feed' });
      }
      const match = typeof imageData === 'string' && imageData.match(/^data:image\/jpeg;base64,(.+)$/);
      if (!match) {
        return res.status(400).json({ error: 'imageData must be a JPEG data URL' });
      }
      const bytes = Buffer.from(match[1], 'base64');
      if (bytes.length === 0 || bytes.length > MAX_IMAGE_BYTES) {
        return res.status(400).json({ error: 'image empty or over 4MB' });
      }
      // JPEG magic bytes — reject payloads that merely claim to be JPEG
      if (bytes[0] !== 0xff || bytes[1] !== 0xd8) {
        return res.status(400).json({ error: 'not a valid JPEG' });
      }

      const entries = await readIndex();

      // Rate limits: per-IP daily cap + global pending-queue cap.
      const fwd = req.headers['x-forwarded-for'];
      const ip = (Array.isArray(fwd) ? fwd[0] : fwd)?.split(',')[0]?.trim() || 'unknown';
      const ipHash = createHash('sha256').update(ip + ADMIN_TOKEN).digest('hex').slice(0, 16);
      const dayAgo = Date.now() - 86_400_000;
      const recentFromIp = entries.filter(e => e.ipHash === ipHash && (e.ts ?? 0) > dayAgo).length;
      if (recentFromIp >= MAX_PER_IP_PER_DAY) {
        return res.status(429).json({ error: 'daily upload limit reached — try again tomorrow' });
      }
      if (entries.filter(e => e.status === 'pending').length >= MAX_PENDING_QUEUE) {
        return res.status(429).json({ error: 'moderation queue is full — try again later' });
      }

      const ratio = Number(imageRatio);
      const safeRatio = Number.isFinite(ratio) ? Math.min(2.5, Math.max(0.4, ratio)) : 1;
      const safeTags = Array.isArray(tags)
        ? tags.filter((t): t is string => typeof t === 'string' && t.length <= 40).slice(0, 8)
        : [];

      const id = `u${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
      const blob = await put(`uploads/${id}.jpg`, bytes, {
        access: 'public',
        contentType: 'image/jpeg',
      });

      const entry: FeedEntry = {
        id,
        title: title.trim(),
        artistId: 'community',
        artistName: artistName.trim(),
        style,
        tags: safeTags,
        likes: 0,
        views: 0,
        imageRatio: safeRatio,
        swatch: 'sw-1',
        imageUrl: blob.url,
        source,
        createdAt: new Date().toISOString().slice(0, 10),
        status: 'pending',
        ts: Date.now(),
        ipHash,
      };

      await writeIndex([entry, ...entries]);
      return res.status(202).json(toPublic(entry));
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

    res.setHeader('Allow', 'GET, POST, PATCH, OPTIONS');
    return res.status(405).json({ error: 'method not allowed' });
  } catch (err) {
    console.error('uploads api error', err);
    return res.status(500).json({ error: 'internal error' });
  }
}
