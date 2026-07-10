/**
 * Google Maps JavaScript API loader — DISPLAY ONLY.
 *
 * We load ONLY the Maps JS library (no `places`, no Places API). Markers are
 * placed exclusively from our own /api/artists response; Google is never
 * queried for businesses. The browser key (VITE_GOOGLE_MAPS_API_KEY) is
 * build-time public and must be domain-restricted in Google Cloud.
 *
 * If the key is absent the loader resolves to null and the UI degrades to a
 * list-only view — the map never crashes the page.
 */

export const MAPS_KEY: string = (import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string) ?? '';

let loadPromise: Promise<typeof google | null> | null = null;

export function loadGoogleMaps(): Promise<typeof google | null> {
  if (!MAPS_KEY) return Promise.resolve(null);
  if (typeof window !== 'undefined' && (window as unknown as { google?: typeof google }).google?.maps) {
    return Promise.resolve(google);
  }
  if (loadPromise) return loadPromise;

  loadPromise = new Promise((resolve) => {
    const cbName = '__tg_maps_cb';
    (window as unknown as Record<string, unknown>)[cbName] = () => resolve(google);
    const s = document.createElement('script');
    // Intentionally NO &libraries=places — display layer only.
    s.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(MAPS_KEY)}&callback=${cbName}&v=quarterly`;
    s.async = true;
    s.defer = true;
    s.onerror = () => resolve(null);
    document.head.appendChild(s);
  });
  return loadPromise;
}
