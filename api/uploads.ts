import type { VercelRequest, VercelResponse } from '@vercel/node';
import { list, put } from '@vercel/blob';

/**
 * Community uploads API — the real backend behind src/data/uploads.ts.
 *
 * GET  /api/uploads → the feed index (newest first)
 * POST /api/uploads → publish one design: stores the image as a public blob
 *                     (CDN-served) and prepends its metadata to the index.
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
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method === 'GET') {
      const entries = await readIndex();
      res.setHeader('Cache-Control', 's-maxage=10, stale-while-revalidate=60');
      return res.status(200).json(entries);
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
      if (source !== 'artist' && source !== 'customer') {
        return res.status(400).json({ error: 'source must be artist or customer' });
      }
      const match = typeof imageData === 'string' && imageData.match(/^data:image\/jpeg;base64,(.+)$/);
      if (!match) {
        return res.status(400).json({ error: 'imageData must be a JPEG data URL' });
      }
      const bytes = Buffer.from(match[1], 'base64');
      if (bytes.length === 0 || bytes.length > MAX_IMAGE_BYTES) {
        return res.status(400).json({ error: 'image empty or over 4MB' });
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
      };

      const entries = await readIndex();
      await writeIndex([entry, ...entries]);
      return res.status(201).json(entry);
    }

    res.setHeader('Allow', 'GET, POST, OPTIONS');
    return res.status(405).json({ error: 'method not allowed' });
  } catch (err) {
    console.error('uploads api error', err);
    return res.status(500).json({ error: 'internal error' });
  }
}
