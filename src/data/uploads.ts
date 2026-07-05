import type { TattooDesign, TattooStyle } from './types';

/**
 * Community uploads — the prototype's stand-in for a backend.
 *
 * Artists (studio panel) and customers (customer panel) publish their tattoo
 * photos here; the landing feed merges them on top of the seeded designs.
 * Images are stored as downscaled JPEG data URLs in localStorage, so the demo
 * survives reloads. Swapping this module for real API calls later leaves the
 * consuming components untouched.
 */

const KEY = 'tg.uploads';
export const UPLOADS_EVENT = 'tg:uploads';

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

export interface UploadInput {
  title: string;
  artistName: string;
  style: TattooStyle;
  tags: string[];
  imageUrl: string;
  imageRatio: number;
  city?: string;
  price?: number;
  source: 'artist' | 'customer';
}

export function addUpload(input: UploadInput): TattooDesign | null {
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
    const next = [design, ...getUploads()];
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // Quota exceeded (data URLs are heavy) — drop the oldest uploads and retry
    try {
      const trimmed = [design, ...getUploads().slice(0, 11)];
      localStorage.setItem(KEY, JSON.stringify(trimmed));
    } catch {
      return null;
    }
  }
  window.dispatchEvent(new Event(UPLOADS_EVENT));
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
