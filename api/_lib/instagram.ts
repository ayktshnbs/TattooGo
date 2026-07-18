/**
 * Instagram handle normalizer. Accepts what a normal user types — @handle,
 * a bare handle, or an instagram URL — and returns the canonical bare handle
 * (no @, no URL), suitable for storage. Returns null on invalid input so the
 * caller can decide (400 during activation-required, ignored during clear).
 *
 * Rules per Instagram: 1–30 chars, [A-Za-z0-9._] only, no leading/trailing dot.
 */
export function normalizeInstagram(raw: unknown): string | null {
  if (typeof raw !== 'string') return null;
  let s = raw.trim();
  if (!s) return null;

  // Strip URL prefix, keep only the path segment.
  const urlMatch = s.match(/^(?:https?:\/\/)?(?:www\.)?instagram\.com\/(@?[A-Za-z0-9._]+)\/?(?:\?.*)?$/i);
  if (urlMatch) s = urlMatch[1];

  // Strip a leading @ if present.
  if (s.startsWith('@')) s = s.slice(1);

  // Now must be a bare handle: 1–30 [A-Za-z0-9._], no leading/trailing dot.
  if (!/^[A-Za-z0-9._]{1,30}$/.test(s)) return null;
  if (s.startsWith('.') || s.endsWith('.')) return null;
  return s;
}
