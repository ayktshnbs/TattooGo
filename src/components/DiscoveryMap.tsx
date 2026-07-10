import { useEffect, useRef, useState } from 'react';
import { loadGoogleMaps, MAPS_KEY } from '../lib/maps';
import type { ApiArtist } from '../lib/api';

/**
 * Map layer for artist/studio discovery. Renders Google Maps and drops one
 * marker per registered artist/studio that has an ENABLED public location —
 * markers come only from the `artists` prop (our Postgres API), never from
 * Google. No Places API. Degrades to a clear placeholder when no key is set.
 */

interface Props {
  artists: ApiArtist[];
  onSelect: (id: string) => void;
  selectedId?: string;
}

// Turkey-centered default; the map fits to markers when any exist.
const DEFAULT_CENTER = { lat: 39.0, lng: 35.0 };

export function DiscoveryMap({ artists, onSelect, selectedId }: Props) {
  const divRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const [status, setStatus] = useState<'loading' | 'ready' | 'nokey' | 'failed'>('loading');

  const located = artists.filter(a => a.hasPublicLocation && a.latitude != null && a.longitude != null);

  // Init map once.
  useEffect(() => {
    if (!MAPS_KEY) { setStatus('nokey'); return; }
    let cancelled = false;
    loadGoogleMaps().then(g => {
      if (cancelled || !g || !divRef.current) { if (!g) setStatus('failed'); return; }
      mapRef.current = new g.maps.Map(divRef.current, {
        center: DEFAULT_CENTER,
        zoom: 6,
        disableDefaultUI: true,
        zoomControl: true,
        styles: [{ elementType: 'labels.icon', stylers: [{ visibility: 'off' }] }],
      });
      setStatus('ready');
    });
    return () => { cancelled = true; };
  }, []);

  // Sync markers to the current filtered result set.
  useEffect(() => {
    const map = mapRef.current;
    if (status !== 'ready' || !map) return;
    markersRef.current.forEach(m => m.setMap(null));
    markersRef.current = [];

    const bounds = new google.maps.LatLngBounds();
    located.forEach(a => {
      const pos = { lat: a.latitude as number, lng: a.longitude as number };
      const marker = new google.maps.Marker({
        position: pos, map,
        title: a.name,
        label: { text: a.rating != null ? `★${a.rating}` : ' ', color: '#fff', fontSize: '10px' },
      });
      marker.addListener('click', () => onSelect(a.id));
      markersRef.current.push(marker);
      bounds.extend(pos);
    });
    if (located.length === 1) { map.setCenter(bounds.getCenter()); map.setZoom(12); }
    else if (located.length > 1) map.fitBounds(bounds, 64);
  }, [status, artists, selectedId]);

  if (status === 'nokey') {
    return (
      <div className="col center" style={{ height: '100%', minHeight: 320, border: '1px dashed var(--hairline-strong)', padding: 24, textAlign: 'center', gap: 8 }}>
        <span className="mono text-muted">Map unavailable</span>
        <span className="mono text-muted" style={{ fontSize: 11 }}>Set VITE_GOOGLE_MAPS_API_KEY to enable the map. The list below still works.</span>
      </div>
    );
  }
  if (status === 'failed') {
    return (
      <div className="col center" style={{ height: '100%', minHeight: 320, border: '1px dashed var(--hairline-strong)', padding: 24 }}>
        <span className="mono text-muted">Map failed to load — showing the list only.</span>
      </div>
    );
  }
  return (
    <div style={{ position: 'relative', height: '100%', minHeight: 360 }}>
      <div ref={divRef} style={{ position: 'absolute', inset: 0 }} />
      {status === 'ready' && located.length === 0 && (
        <div className="col center" style={{ position: 'absolute', inset: 0, background: 'rgba(245,242,235,0.85)', pointerEvents: 'none', textAlign: 'center', padding: 24 }}>
          <span className="mono text-muted">No registered studios with a public location match these filters yet.</span>
        </div>
      )}
    </div>
  );
}
