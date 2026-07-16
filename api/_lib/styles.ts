/**
 * Tattoo styles — backend validation copy (SINGLE server source of truth).
 *
 * Keep the key list in sync with src/data/styles.ts (frontend copy). These are
 * artist/studio specialties used on profiles, requests, portfolio uploads and
 * the directory filter. NOT contest/festival categories — those are a separate
 * future taxonomy and must never be validated against this set.
 */

export const TATTOO_STYLE_KEYS = [
  'old-school', 'new-school', 'traditional', 'neo-traditional', 'black-work',
  'avantgarde', 'color-realism', 'black-and-grey-realism', 'geometric',
  'mandala', 'ornamental', 'dotwork', 'minimalist', 'fine-line', 'lettering',
  'calligraphy',
] as const;

/** Max styles an artist/studio may select. Mirrors src/data/styles.ts. */
export const MAX_STYLES = 5;

const STYLE_SET = new Set<string>(TATTOO_STYLE_KEYS);

export function isValidStyle(key: string): boolean {
  return STYLE_SET.has(key);
}

/** Keep only valid, de-duplicated style keys, capped at MAX_STYLES. */
export function sanitizeStyles(input: unknown): string[] {
  if (!Array.isArray(input)) return [];
  const seen = new Set<string>();
  for (const s of input) {
    if (typeof s === 'string' && isValidStyle(s)) seen.add(s);
    if (seen.size >= MAX_STYLES) break;
  }
  return [...seen];
}
