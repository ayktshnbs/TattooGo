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

export const SECTION_NUMBERS = {
  artists: '01', trust: '02', cta: '03',
};
