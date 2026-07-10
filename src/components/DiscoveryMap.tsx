import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { ApiArtist } from '../lib/api';
import { useLang } from '../i18n/LangContext';

/**
 * Map layer for artist/studio discovery — Leaflet + OpenStreetMap tiles.
 * No API key, no Google Maps, no Places, no external business data: markers
 * come ONLY from the `artists` prop (our Postgres API). Tiles are display
 * pixels; if they fail to load the list below still works.
 */

interface Props {
  artists: ApiArtist[];
  onSelect: (id: string) => void;
  selectedId?: string;
}

// Turkey-centered default; the map fits to markers when any exist.
const DEFAULT_CENTER: L.LatLngTuple = [39.0, 35.0];

function markerIcon(label: string, selected: boolean): L.DivIcon {
  return L.divIcon({
    className: '',
    html: `<div style="background:${selected ? '#000' : '#111'};color:#fff;border:2px solid #fff;border-radius:999px;padding:3px 8px;font:600 10px/1.2 monospace;white-space:nowrap;box-shadow:0 1px 4px rgba(0,0,0,.4)">${label}</div>`,
    iconSize: undefined,
    iconAnchor: [18, 12],
  });
}

const escHtml = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function DiscoveryMap({ artists, onSelect, selectedId }: Props) {
  const { lang } = useLang();
  const divRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  const located = artists.filter(a => a.hasPublicLocation && a.latitude != null && a.longitude != null);

  // Init map once.
  useEffect(() => {
    if (!divRef.current || mapRef.current) return;
    const map = L.map(divRef.current, {
      center: DEFAULT_CENTER,
      zoom: 6,
      zoomControl: true,
      attributionControl: true,
    });
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
    mapRef.current = map;
    return () => { map.remove(); mapRef.current = null; };
  }, []);

  // Sync markers to the current filtered result set.
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];

    const bounds = L.latLngBounds([]);
    located.forEach(a => {
      const pos: L.LatLngTuple = [a.latitude as number, a.longitude as number];
      const label = escHtml(a.rating != null ? `★${a.rating} ${a.name}` : a.name);
      const marker = L.marker(pos, {
        icon: markerIcon(label, a.id === selectedId),
        title: a.name,
        keyboard: true,
      }).addTo(map);
      marker.on('click', () => onSelect(a.id));
      markersRef.current.push(marker);
      bounds.extend(pos);
    });
    if (located.length === 1) map.setView(bounds.getCenter(), 12);
    else if (located.length > 1) map.fitBounds(bounds, { padding: [48, 48] });
  }, [artists, selectedId]);

  return (
    <div style={{ position: 'relative', height: '100%', minHeight: 360 }}>
      <div ref={divRef} style={{ position: 'absolute', inset: 0, zIndex: 0 }} />
      {located.length === 0 && (
        <div className="col center" style={{ position: 'absolute', inset: 0, background: 'rgba(245,242,235,0.85)', pointerEvents: 'none', textAlign: 'center', padding: 24, zIndex: 1 }}>
          <span className="mono text-muted">
            {lang === 'tr' ? 'Bu şehirde kayıtlı stüdyo bulunamadı.' : 'No registered studios found in this city.'}
          </span>
        </div>
      )}
    </div>
  );
}
