import type { VercelRequest } from '@vercel/node';
import { createHash } from 'node:crypto';

/**
 * Client IP — one definition for every abuse control.
 *
 * On Vercel the platform sets `x-real-ip` and OVERWRITES `x-forwarded-for`
 * with the connecting client (external values are not forwarded), so a caller
 * cannot inject a fake first hop. We still prefer the single-valued headers
 * and, for the list form, take the LAST entry (the one appended by the
 * trusted proxy) rather than the first, which is the spoofable position on
 * platforms that append instead of overwrite.
 *
 * Raw IPs are never stored: every consumer keys on `ipHash` (sha256 with the
 * server secret) so tables like rate_limits / portfolio_reports hold no PII.
 */
const SECRET = process.env.AUTH_SECRET ?? '';

function header(req: VercelRequest, name: string): string {
  const v = req.headers[name];
  return (Array.isArray(v) ? v[0] : v)?.trim() ?? '';
}

export function clientIp(req: VercelRequest): string {
  const real = header(req, 'x-real-ip');
  if (real) return real;
  const vercel = header(req, 'x-vercel-forwarded-for');
  if (vercel) return vercel.split(',').pop()?.trim() || '';
  const xff = header(req, 'x-forwarded-for');
  if (xff) return xff.split(',').pop()?.trim() || '';
  return req.socket?.remoteAddress ?? '';
}

export function ipHash(req: VercelRequest): string {
  return createHash('sha256').update(clientIp(req) + '|' + SECRET).digest('hex');
}
