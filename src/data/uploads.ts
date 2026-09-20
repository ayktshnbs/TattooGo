import type { ApiPortfolioItem } from '../lib/api';

/**
 * Public portfolio feed — client for GET /api/uploads.
 *
 * Returns the API's own row shape (`ApiPortfolioItem`): there is NO `likes`,
 * `price`, `isSaved`, or `city` on these rows, and consumers must not assume
 * them (a previous `likes.toLocaleString()` crashed the customer dashboard).
 * A small localStorage cache gives the landing feed an instant first paint and
 * a read-only fallback when the API is unreachable. Publishing goes through
 * `portfolio.publish()` in lib/api — the offline "localAdd" path was dead code
 * and has been removed.
 */

const KEY = 'tg.uploads';
export const UPLOADS_EVENT = 'tg:uploads';
const API = '/api/uploads';

/** Synchronous local cache — used for instant first paint and as fallback. */
export function getUploads(): ApiPortfolioItem[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const list = JSON.parse(raw);
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

function cacheUploads(list: ApiPortfolioItem[]): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(list.slice(0, 24)));
  } catch { /* quota — cache is best-effort */ }
}

/** Fetch the shared public feed; falls back to the local cache. */
export async function fetchUploads(): Promise<ApiPortfolioItem[]> {
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

/**
 * Read a picked file, downscale it (max 1080px on the long edge) and return a
 * JPEG data URL plus its aspect ratio. Keeps payloads small and strips EXIF
 * in the process.
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
