/**
 * Tattoo styles / artist specialties — the SINGLE frontend source of truth.
 *
 * These describe what an artist/studio does; they power the profile style
 * selector, the customer request form, portfolio uploads, and the directory
 * style filter. Stored as stable slug keys; labels are localized.
 *
 * NOT the same as contest/festival categories (Best of …), which are a
 * separate, event-scoped taxonomy and must never be mixed in here. Keep this
 * list in sync with api/_lib/styles.ts (backend validation copy).
 */

export interface StyleOption { key: string; en: string; tr: string }

export const TATTOO_STYLES: StyleOption[] = [
  { key: 'old-school',             en: 'Old School',          tr: 'Old School' },
  { key: 'new-school',             en: 'New School',          tr: 'New School' },
  { key: 'traditional',            en: 'Traditional',         tr: 'Traditional' },
  { key: 'neo-traditional',        en: 'Neo-Traditional',     tr: 'Neo-Traditional' },
  { key: 'black-work',             en: 'Black Work',          tr: 'Black Work' },
  { key: 'avantgarde',             en: 'Avantgarde',          tr: 'Avangart' },
  { key: 'color-realism',          en: 'Color Realism',       tr: 'Renkli Realizm' },
  { key: 'black-and-grey-realism', en: 'Black & Grey Realism', tr: 'Siyah & Gri Realizm' },
  { key: 'geometric',              en: 'Geometric',           tr: 'Geometrik' },
  { key: 'mandala',                en: 'Mandala',             tr: 'Mandala' },
  { key: 'ornamental',             en: 'Ornamental',          tr: 'Ornamental' },
  { key: 'dotwork',                en: 'Dotwork',             tr: 'Dotwork' },
  { key: 'minimalist',             en: 'Minimalist',          tr: 'Minimalist' },
  { key: 'fine-line',              en: 'Fine Line',           tr: 'Fine Line' },
  { key: 'lettering',              en: 'Lettering',           tr: 'Lettering' },
  { key: 'calligraphy',            en: 'Calligraphy',         tr: 'Kaligrafi' },
];

/** Max styles an artist/studio may select. Mirrored in backend validation. */
export const MAX_STYLES = 5;

const STYLE_KEYS = new Set(TATTOO_STYLES.map(s => s.key));
export const isValidStyle = (key: string): boolean => STYLE_KEYS.has(key);

/** Localized label for a stored style key; falls back to the raw key. */
export function styleLabel(key: string, lang: 'en' | 'tr'): string {
  return TATTOO_STYLES.find(s => s.key === key)?.[lang] ?? key;
}
