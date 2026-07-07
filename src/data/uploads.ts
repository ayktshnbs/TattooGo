import type { TattooDesign, TattooStyle } from './types';

/**
 * Community uploads — client for the /api/uploads backend.
 *
 * Artists (studio panel) and customers (customer panel) publish their tattoo
 * photos; the landing feed merges them on top of the seeded designs. Images
 * live in Vercel Blob (CDN-served); metadata lives in a blob-hosted index the
 * API maintains. When the API is unreachable (vite dev server, offline), both
 * reads and writes fall back to localStorage so the flow keeps working.
 */

const KEY = 'tg.uploads';
export const UPLOADS_EVENT = 'tg:uploads';
const API = '/api/uploads';

/** Synchronous local cache — used for instant first paint and as fallback. */
export function getUploads(): TattooDesign[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const list = JSON.parse(raw);
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

function cacheUploads(list: TattooDesign[]): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(list.slice(0, 24)));
  } catch { /* quota — cache is best-effort */ }
}

/** Fetch the shared community feed; falls back to the local cache. */
export async function fetchUploads(): Promise<TattooDesign[]> {
  try {
    const res = await fetch(API, { headers: { Accept: 'application/json' } });
    if (!res.ok) throw new Error(String(res.status));
    const list = await res.json();
    if (!Array.isArray(list)) throw new Error('bad payload');
    cacheUploads(list);
    return list;
  } catch {
    return getUploads();
  }
}

export interface UploadInput {
  title: string;
  artistName: string;
  style: TattooStyle;
  tags: string[];
  imageUrl: string; // JPEG data URL from fileToUpload()
  imageRatio: number;
  city?: string;
  price?: number;
  source: 'artist'; // landing-feed publishing is artist-only
}

function localAdd(input: UploadInput): TattooDesign | null {
  const design: TattooDesign = {
    id: `u${Date.now().toString(36)}`,
    artistId: 'community',
    likes: 0,
    views: 0,
    swatch: 'sw-1', // unused fallback — imageUrl takes precedence
    createdAt: new Date().toISOString().slice(0, 10),
    ...input,
  };
  try {
    localStorage.setItem(KEY, JSON.stringify([design, ...getUploads()]));
  } catch {
    // Quota exceeded (data URLs are heavy) — drop the oldest uploads and retry
    try {
      localStorage.setItem(KEY, JSON.stringify([design, ...getUploads().slice(0, 11)]));
    } catch {
      return null;
    }
  }
  return design;
}

/** Publish to the shared feed; falls back to localStorage when offline. */
export async function addUpload(input: UploadInput): Promise<TattooDesign | null> {
  let design: TattooDesign | null = null;
  try {
    const res = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: input.title,
        artistName: input.artistName,
        style: input.style,
        tags: input.tags,
        imageData: input.imageUrl,
        imageRatio: input.imageRatio,
        source: input.source,
      }),
    });
    if (!res.ok) throw new Error(String(res.status));
    design = await res.json();
    // Pending entries are awaiting moderation — they must not enter the
    // local feed cache, or the submitter would see them as already live.
    if (design && design.status !== 'pending') cacheUploads([design, ...getUploads()]);
  } catch {
    design = localAdd(input);
  }
  if (design) window.dispatchEvent(new Event(UPLOADS_EVENT));
  return design;
}

/**
 * Read a picked file, downscale it (max 1080px on the long edge) and return a
 * JPEG data URL plus its aspect ratio. Keeps localStorage small and strips
 * EXIF in the process.
 */
export function fileToUpload(file: File): Promise<{ dataUrl: string; ratio: number }> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const max = 1080;
      const scale = Math.min(1, max / Math.max(img.naturalWidth, img.naturalHeight));
      const w = Math.round(img.naturalWidth * scale);
      const h = Math.round(img.naturalHeight * scale);
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      canvas.getContext('2d')!.drawImage(img, 0, 0, w, h);
      URL.revokeObjectURL(url);
      resolve({ dataUrl: canvas.toDataURL('image/jpeg', 0.82), ratio: w / h });
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Could not read image'));
    };
    img.src = url;
  });
}
