import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createHmac, randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';
import type { UserRow } from './db.js';
import { getUserById } from './repo.js';

/**
 * Session auth for the prototype — no external provider required.
 *
 * Passwords: scrypt with a per-user random salt (node:crypto built-in).
 * Sessions: compact HMAC-SHA256-signed tokens ({uid, role, exp}) carried in
 * an httpOnly SameSite cookie, so the SPA never touches the credential and
 * XSS cannot exfiltrate it. AUTH_SECRET lives in Vercel env.
 *
 * Swapping this for a managed provider (Clerk/Supabase) later only replaces
 * this module + the /api/auth endpoint; everything else consumes getSession().
 */

const SECRET = process.env.AUTH_SECRET ?? '';
const COOKIE = 'tg_session';
const SESSION_DAYS = 30;

export interface Session {
  uid: string;
  role: 'customer' | 'artist' | 'studio';
  exp: number;
  /** Session epoch — must match the user row. A password reset bumps the
   *  user's epoch, which invalidates every previously issued session. */
  sep: number;
}

/* ---------- passwords ---------- */

export function hashPassword(password: string): { salt: string; passHash: string } {
  const salt = randomBytes(16).toString('hex');
  const passHash = scryptSync(password, salt, 64).toString('hex');
  return { salt, passHash };
}

export function verifyPassword(password: string, salt: string, passHash: string): boolean {
  const candidate = scryptSync(password, salt, 64);
  const stored = Buffer.from(passHash, 'hex');
  return candidate.length === stored.length && timingSafeEqual(candidate, stored);
}

/* ---------- tokens ---------- */

function b64url(buf: Buffer): string {
  return buf.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export function signSession(uid: string, role: Session['role'], sessionEpoch = 0): string {
  const payload: Session = { uid, role, exp: Date.now() + SESSION_DAYS * 86_400_000, sep: sessionEpoch };
  const body = b64url(Buffer.from(JSON.stringify(payload)));
  const sig = b64url(createHmac('sha256', SECRET).update(body).digest());
  return `${body}.${sig}`;
}

export function verifySessionToken(token: string): Session | null {
  if (!SECRET || !token) return null;
  const [body, sig] = token.split('.');
  if (!body || !sig) return null;
  const expected = b64url(createHmac('sha256', SECRET).update(body).digest());
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    const payload = JSON.parse(Buffer.from(body.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString()) as Session;
    if (typeof payload.uid !== 'string' || payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

/* ---------- cookies ---------- */

export function setSessionCookie(res: VercelResponse, token: string): void {
  res.setHeader(
    'Set-Cookie',
    `${COOKIE}=${token}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=${SESSION_DAYS * 86_400}`,
  );
}

export function clearSessionCookie(res: VercelResponse): void {
  res.setHeader('Set-Cookie', `${COOKIE}=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0`);
}

export function getSession(req: VercelRequest): Session | null {
  return verifySessionToken(req.cookies?.[COOKIE] ?? '');
}

/** Load the full user row for the current session (null when logged out).
 *  The single auth seam every endpoint uses. Rejects sessions whose epoch no
 *  longer matches the user row (i.e. issued before a password reset). */
export async function getSessionUser(req: VercelRequest): Promise<UserRow | null> {
  const session = getSession(req);
  if (!session) return null;
  const user = await getUserById(session.uid);
  if (!user) return null;
  if ((session.sep ?? 0) !== (user.sessionEpoch ?? 0)) return null;
  if (user.deactivatedAt) return null;   // soft-deleted accounts are logged out everywhere
  return user;
}

/** Public projection of a user row — never leaks hash/salt/email to others.
 *  Location is included ONLY when the artist enabled is_public_location. */
export function publicUser(u: UserRow) {
  const locPublic = (u.isPublicLocation ?? false);
  return {
    // Public "role" is the provider type — the legacy role column is vestigial.
    id: u.id, name: u.name, role: u.providerType ?? u.role, city: u.city, styles: u.styles, bio: u.bio, createdAt: u.createdAt,
    district: u.district,
    hasPublicLocation: locPublic && u.latitude != null && u.longitude != null,
    latitude: locPublic ? u.latitude : undefined,
    longitude: locPublic ? u.longitude : undefined,
    publicAddressLabel: locPublic ? u.publicAddressLabel : undefined,
    providerStatus: u.providerStatus,
  };
}

/** The owner's own view — includes email + raw location (even when private,
 *  so the artist can edit it) + the visibility toggle. */
export function ownUser(u: UserRow) {
  return {
    ...publicUser(u),
    email: u.email,
    emailVerified: u.emailVerified ?? false,
    latitude: u.latitude,
    longitude: u.longitude,
    publicAddressLabel: u.publicAddressLabel,
    isPublicLocation: u.isPublicLocation ?? false,
    providerType: u.providerType ?? null,
    providerStatus: u.providerStatus,
  };
}
