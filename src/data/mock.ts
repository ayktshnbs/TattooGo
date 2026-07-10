import type { TattooStyle } from './types';

/**
 * Static taxonomies only — no fake users, designs, offers, reviews or
 * statistics live here. All real data comes from the API (/api/*) and is
 * scoped to the signed-in account.
 */

export const STYLES: { key: TattooStyle; en: string; tr: string }[] = [
  { key: 'fine-line',   en: 'Fine line',   tr: 'İnce çizgi' },
  { key: 'realism',     en: 'Realism',     tr: 'Realizm' },
  { key: 'minimal',     en: 'Minimal',     tr: 'Minimal' },
  { key: 'traditional', en: 'Traditional', tr: 'Geleneksel' },
  { key: 'blackwork',   en: 'Blackwork',   tr: 'Blackwork' },
  { key: 'geometric',   en: 'Geometric',   tr: 'Geometrik' },
  { key: 'lettering',   en: 'Lettering',   tr: 'Yazı' },
  { key: 'color',       en: 'Color',       tr: 'Renkli' },
];

// Turkey-only platform: cities are the 81 official provinces, nothing else.
export { TR_CITIES as CITIES } from './cities';

/** Body placements — stored as stable English keys, shown localized. */
export const PLACEMENTS: { key: string; en: string; tr: string }[] = [
  { key: 'arm',      en: 'Arm',      tr: 'Kol' },
  { key: 'forearm',  en: 'Forearm',  tr: 'Ön kol' },
  { key: 'shoulder', en: 'Shoulder', tr: 'Omuz' },
  { key: 'chest',    en: 'Chest',    tr: 'Göğüs' },
  { key: 'back',     en: 'Back',     tr: 'Sırt' },
  { key: 'leg',      en: 'Leg',      tr: 'Bacak' },
  { key: 'thigh',    en: 'Thigh',    tr: 'Uyluk' },
  { key: 'ankle',    en: 'Ankle',    tr: 'Ayak bileği' },
  { key: 'hand',     en: 'Hand',     tr: 'El' },
  { key: 'neck',     en: 'Neck',     tr: 'Boyun' },
  { key: 'ribs',     en: 'Ribs',     tr: 'Kaburga' },
];

/** Ink color options — stored as stable English keys, shown localized. */
export const INK_COLORS: { key: string; en: string; tr: string }[] = [
  { key: 'black',  en: 'Black',  tr: 'Siyah' },
  { key: 'shaded', en: 'Shaded', tr: 'Gölgeli' },
  { key: 'color',  en: 'Color',  tr: 'Renkli' },
];

/** Localized label for a stored taxonomy key; falls back to the raw key. */
export function taxonomyLabel(list: { key: string; en: string; tr: string }[], key: string, lang: 'en' | 'tr'): string {
  return list.find(i => i.key === key)?.[lang] ?? key;
}

export const SECTION_NUMBERS = {
  artists: '01', trust: '02', cta: '03',
};
