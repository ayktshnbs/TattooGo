import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useLang } from '../i18n/LangContext';

/**
 * Draggable Leaflet pin for provider location. Replaces the raw lat/lng inputs
 * with a map the user actually understands. Coordinates flow to the parent
 * via onChange; the user never sees the numbers.
 *
 * Initial pin: existing (lat, lng) if provided, else the centroid of the
 * chosen city (fallback: Turkey center). When city changes and the pin has
 * not been dragged since, it re-centers on the new city; once dragged the
 * user's placement wins even across city changes.
 */

interface Props {
  city?: string;
  lat: number | null;
  lng: number | null;
  onChange: (lat: number, lng: number) => void;
}

// Approx centroids for major Turkish provinces. Covers the vast majority of
// expected users; anyone else starts at Turkey center and drags to their spot.
export const TR_CITY_CENTROIDS: Record<string, [number, number]> = {
  'İstanbul': [41.0082, 28.9784],
  'Ankara': [39.9334, 32.8597],
  'İzmir': [38.4192, 27.1287],
  'Bursa': [40.1826, 29.0669],
  'Antalya': [36.8969, 30.7133],
  'Adana': [37.0000, 35.3213],
  'Konya': [37.8746, 32.4932],
  'Gaziantep': [37.0662, 37.3833],
  'Şanlıurfa': [37.1591, 38.7969],
  'Kayseri': [38.7205, 35.4826],
  'Mersin': [36.8121, 34.6415],
  'Diyarbakır': [37.9144, 40.2306],
  'Samsun': [41.2867, 36.3300],
  'Denizli': [37.7765, 29.0864],
  'Eskişehir': [39.7767, 30.5206],
  'Trabzon': [41.0015, 39.7178],
  'Ordu': [40.9839, 37.8764],
  'Malatya': [38.3552, 38.3095],
  'Erzurum': [39.9000, 41.2700],
  'Van': [38.4942, 43.3826],
  'Elazığ': [38.6810, 39.2264],
  'Manisa': [38.6191, 27.4289],
  'Sakarya': [40.7569, 30.3781],
  'Aydın': [37.8560, 27.8416],
  'Balıkesir': [39.6484, 27.8826],
  'Muğla': [37.2153, 28.3636],
  'Tekirdağ': [40.9781, 27.5110],
  'Hatay': [36.4018, 36.3498],
  'Kocaeli': [40.7654, 29.9408],
  'Kahramanmaraş': [37.5858, 36.9371],
  'Afyonkarahisar': [38.7638, 30.5403],
  'Zonguldak': [41.4535, 31.7897],
  'Rize': [41.0201, 40.5234],
  'Aksaray': [38.3687, 34.0369],
};
const TURKEY_CENTER: [number, number] = [39.0, 35.0];

export function LocationPinPicker({ city, lat, lng, onChange }: Props) {
  const { lang } = useLang();
  const divRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const draggedRef = useRef(false);

  // Init once; subsequent updates re-position the marker.
  useEffect(() => {
    if (!divRef.current || mapRef.current) return;
    const initial: [number, number] =
      (lat != null && lng != null) ? [lat, lng]
      : (city && TR_CITY_CENTROIDS[city]) ? TR_CITY_CENTROIDS[city]
      : TURKEY_CENTER;

    const map = L.map(divRef.current, { zoomControl: true, scrollWheelZoom: false, attributionControl: true });
    map.setView(initial, (lat != null && lng != null) ? 14 : 11);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    const marker = L.marker(initial, { draggable: true }).addTo(map);
    marker.on('dragend', () => {
      const p = marker.getLatLng();
      draggedRef.current = true;
      onChange(p.lat, p.lng);
    });
    // Also let the user click on the map to place the pin — friendlier than drag on mobile.
    map.on('click', (e: L.LeafletMouseEvent) => {
      marker.setLatLng(e.latlng);
      draggedRef.current = true;
      onChange(e.latlng.lat, e.latlng.lng);
    });
    mapRef.current = map;
    markerRef.current = marker;

    // If initial came from city centroid (no saved coords yet), publish it so
    // the caller has coordinates ready for save without further interaction.
    if (lat == null || lng == null) {
      onChange(initial[0], initial[1]);
    }

    return () => { map.remove(); mapRef.current = null; markerRef.current = null; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // When city changes and the user hasn't dragged, follow the city centroid.
  useEffect(() => {
    if (!mapRef.current || !markerRef.current) return;
    if (draggedRef.current) return;   // once the user placed the pin, city changes don't move it
    const c = city && TR_CITY_CENTROIDS[city];
    if (!c) return;
    markerRef.current.setLatLng(c);
    mapRef.current.setView(c, 11);
    onChange(c[0], c[1]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city]);

  return (
    <div className="col gap-2">
      <div ref={divRef} style={{ height: 220, border: '1px solid var(--hairline-strong)' }} />
      <span className="mono text-muted" style={{ fontSize: 11 }}>
        {lang === 'tr' ? 'Haritada tıklayın veya işareti sürükleyerek tam konumunuzu seçin.' : 'Click on the map or drag the marker to set your exact spot.'}
      </span>
    </div>
  );
}
