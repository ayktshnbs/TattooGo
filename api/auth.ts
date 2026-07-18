import type { VercelRequest, VercelResponse } from '@vercel/node';
import { newId, today, type UserRow } from './_lib/db.js';
import {
  hashPassword, verifyPassword, signSession, setSessionCookie, clearSessionCookie,
  getSessionUser, ownUser,
} from './_lib/auth.js';
import { del } from '@vercel/blob';
import {
  findUserByEmail, createUser, setEmailVerified, setPassword,
  recordLoginFailure, clearLoginFailures, isLocked, createToken, consumeToken,
  updateProfile, getUserById, deactivateAccount, setProviderType,
  countVisiblePortfolioForActivation,
} from './_lib/repo.js';
import { normalizeInstagram } from './_lib/instagram.js';
import { welcomeVerifyEmail, verifyEmailAgain, passwordResetEmail } from './_lib/email.js';
import { isTurkishCity, isInTurkeyBounds } from './_lib/cities.js';
import { isValidStyle, MAX_STYLES } from './_lib/styles.js';

export const PORTFOLIO_MIN_FOR_ACTIVATION = 3;

export async function evaluateArtistActivation(u: UserRow, p: any): Promise<UserRow['providerStatus'] | undefined> {
  // Multi-mode: activation applies only to accounts WITH a provider profile.
  // Base (customer-only) accounts have no provider_status at all.
  if (!u.providerType) return undefined;
  if (u.providerStatus === 'suspended') return 'suspended';
  if (u.providerStatus === 'needs_review') return 'needs_review';

  const n = typeof p.name === 'string' ? p.name : u.name;
  const c = typeof p.city === 'string' ? p.city : u.city;
  const d = typeof p.district === 'string' ? p.district : u.district;
  const b = typeof p.bio === 'string' ? p.bio : u.bio;
  const s = Array.isArray(p.styles) ? p.styles : u.styles;
  const a = typeof p.publicAddressLabel === 'string' ? p.publicAddressLabel : u.publicAddressLabel;
  const l = typeof p.isPublicLocation === 'boolean' ? p.isPublicLocation : u.isPublicLocation;
  const ig = p.instagramHandle !== undefined ? p.instagramHandle : u.instagramHandle;
  const lat = p.latitude !== undefined ? p.latitude : u.latitude;
  const lng = p.longitude !== undefined ? p.longitude : u.longitude;

  const hasName = typeof n === 'string' && n.trim().length > 0;
  const hasCity = typeof c === 'string' && c.trim().length > 0;
  const hasDistrict = typeof d === 'string' && d.trim().length > 0;
  const hasBio = typeof b === 'string' && b.trim().length > 0;
  const hasStyles = Array.isArray(s) && s.some((x: unknown) => typeof x === 'string' && isValidStyle(x));
  const hasAddressLabel = typeof a === 'string' && a.trim().length > 0;
  const hasLocChoice = typeof l === 'boolean';
  const hasInstagram = typeof ig === 'string' && ig.trim().length > 0;

  if (!hasName || !hasCity || !hasDistrict || !hasBio || !hasStyles
      || !hasAddressLabel || !hasLocChoice || !hasInstagram) {
    return 'pending_profile';
  }

  if (l) {
    if (lat == null || lng == null) return 'pending_profile';
    if (!isInTurkeyBounds(lat, lng)) return 'pending_profile';
  }

  // ≥3 uploaded, non-hidden portfolio items. Report-based moderation means we
  // don't require admin approval — uploads count immediately.
  const portfolio = await countVisiblePortfolioForActivation(u.id);
  if (portfolio < PORTFOLIO_MIN_FOR_ACTIVATION) return 'pending_profile';

  return 'active';
}

/**
 * Authentication.
 *   GET  /api/auth → current user (or 401)
 *   POST /api/auth {action: 'register' | 'login' | 'logout'
 *                 | 'verify-email' {token}
 *                 | 'resend-verification'
 *                 | 'request-reset' {email}      — always generic 200
 *                 | 'reset-password' {token, password}}
 *
 * Protections: scrypt hashing, per-account lockout (5 fails → 15 min),
 * one-time hashed tokens (verify 24h / reset 1h), session-epoch bump on
 * password reset (kills all existing sessions), generic login/reset errors.
 * Email sends never block or fail the underlying action.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const VERIFY_TTL = 24 * 60 * 60 * 1000;
const RESET_TTL = 60 * 60 * 1000;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method === 'GET') {
      const user = await getSessionUser(req);
      if (!user) return res.status(401).json({ error: 'not signed in' });
      return res.status(200).json(ownUser(user));
    }

    if (req.method !== 'POST') {
      res.setHeader('Allow', 'GET, POST');
      return res.status(405).json({ error: 'method not allowed' });
    }

    const { action } = req.body ?? {};

    if (action === 'logout') {
      clearSessionCookie(res);
      return res.status(200).json({ ok: true });
    }

    if (action === 'register') {
      // One-account / multi-mode: registration collects ONLY name/email/password.
      // Every account is a base (customer) account; a provider profile is added
      // later via 'create-provider'. A legacy `role` field in the body is ignored.
      const { email, password, name } = req.body ?? {};
      if (typeof email !== 'string' || !EMAIL_RE.test(email) || email.length > 120) {
        return res.status(400).json({ error: 'valid email required' });
      }
      if (typeof password !== 'string' || password.length < 8 || password.length > 128) {
        return res.status(400).json({ error: 'password must be at least 8 characters' });
      }
      if (typeof name !== 'string' || !name.trim() || name.length > 80) {
        return res.status(400).json({ error: 'name required' });
      }

      const { salt, passHash } = hashPassword(password);
      const user: UserRow = {
        id: newId('usr'),
        email: email.toLowerCase().trim(),
        name: name.trim(),
        role: 'customer',
        passHash,
        salt,
        emailVerified: false,
        sessionEpoch: 0,
        createdAt: today(),
      };
      const created = await createUser(user);
      if (!created) return res.status(409).json({ error: 'an account with this email already exists' });

      const token = await createToken(user.id, 'verify', VERIFY_TTL);
      await welcomeVerifyEmail(user.email, user.name, token); // never throws
      setSessionCookie(res, signSession(user.id, user.role, 0));
      return res.status(201).json(ownUser(user));
    }

    if (action === 'create-provider') {
      // Create the optional provider profile. One per account, EVER: the repo
      // update only succeeds while provider_type IS NULL, so the type can never
      // be changed or duplicated by the user (support-only later).
      const me = await getSessionUser(req);   // deactivated sessions resolve null → 401
      if (!me) return res.status(401).json({ error: 'sign in required' });
      const { providerType } = req.body ?? {};
      if (providerType !== 'artist' && providerType !== 'studio') {
        return res.status(400).json({ error: 'providerType must be artist or studio' });
      }
      if (me.providerType) {
        return res.status(409).json({ error: 'provider profile already exists — contact support to change type' });
      }
      const ok = await setProviderType(me.id, providerType);
      if (!ok) return res.status(409).json({ error: 'provider profile already exists — contact support to change type' });
      const updated = await getUserById(me.id);
      return res.status(200).json(updated ? ownUser(updated) : { ok: true });
    }

    if (action === 'login') {
      const { email, password } = req.body ?? {};
      if (typeof email !== 'string' || typeof password !== 'string') {
        return res.status(400).json({ error: 'email and password required' });
      }
      const user = await findUserByEmail(email);
      // Identical error for unknown email and wrong password — no enumeration.
      if (!user) return res.status(401).json({ error: 'invalid email or password' });
      // Deactivated accounts cannot log in (also blocked by email tombstone).
      if (user.deactivatedAt) return res.status(401).json({ error: 'invalid email or password' });
      if (isLocked(user)) {
        return res.status(429).json({ error: 'too many attempts — try again in a few minutes' });
      }
      if (!verifyPassword(password, user.salt, user.passHash)) {
        await recordLoginFailure(user.id);
        return res.status(401).json({ error: 'invalid email or password' });
      }
      await clearLoginFailures(user.id);
      setSessionCookie(res, signSession(user.id, user.role, user.sessionEpoch ?? 0));
      return res.status(200).json(ownUser(user));
    }

    if (action === 'verify-email') {
      const { token } = req.body ?? {};
      if (typeof token !== 'string' || !token) return res.status(400).json({ error: 'token required' });
      const userId = await consumeToken(token, 'verify');
      if (!userId) return res.status(400).json({ error: 'link is invalid or expired' });
      await setEmailVerified(userId);
      return res.status(200).json({ ok: true });
    }

    if (action === 'resend-verification') {
      const user = await getSessionUser(req);
      if (!user) return res.status(401).json({ error: 'sign in required' });
      if (user.emailVerified) return res.status(200).json({ ok: true, already: true });
      const token = await createToken(user.id, 'verify', VERIFY_TTL);
      await verifyEmailAgain(user.email, user.name, token);
      return res.status(200).json({ ok: true });
    }

    if (action === 'request-reset') {
      const { email } = req.body ?? {};
      if (typeof email !== 'string' || !EMAIL_RE.test(email)) {
        return res.status(400).json({ error: 'valid email required' });
      }
      const user = await findUserByEmail(email);
      if (user) {
        const token = await createToken(user.id, 'reset', RESET_TTL);
        await passwordResetEmail(user.email, user.name, token);
      }
      // Same response whether or not the account exists — no enumeration.
      return res.status(200).json({ ok: true });
    }

    if (action === 'reset-password') {
      const { token, password } = req.body ?? {};
      if (typeof token !== 'string' || !token) return res.status(400).json({ error: 'token required' });
      if (typeof password !== 'string' || password.length < 8 || password.length > 128) {
        return res.status(400).json({ error: 'password must be at least 8 characters' });
      }
      const userId = await consumeToken(token, 'reset');
      if (!userId) return res.status(400).json({ error: 'link is invalid or expired' });
      const { salt, passHash } = hashPassword(password);
      await setPassword(userId, passHash, salt); // bumps session epoch → all sessions out
      clearSessionCookie(res);
      return res.status(200).json({ ok: true });
    }

    if (action === 'update-profile') {
      const me = await getSessionUser(req);
      if (!me) return res.status(401).json({ error: 'sign in required' });
      const { name, bio, city, styles, district, publicAddressLabel, latitude, longitude, isPublicLocation, instagramHandle } = req.body ?? {};

      if (name !== undefined && (typeof name !== 'string' || !name.trim() || name.length > 80)) {
        return res.status(400).json({ error: 'invalid name' });
      }

      const isArtist = !!me.providerType;
      // Location fields are artist/studio-only; customers can't set a map pin.
      if (!isArtist && (district != null || latitude != null || longitude != null || publicAddressLabel != null || isPublicLocation != null || instagramHandle != null)) {
        return res.status(403).json({ error: 'only artists/studios can set provider fields' });
      }
      // Instagram: undefined = untouched, null/empty string = clear, else normalize.
      let instagramVal: string | null | undefined;
      if (instagramHandle !== undefined) {
        if (instagramHandle === null || (typeof instagramHandle === 'string' && !instagramHandle.trim())) {
          instagramVal = null;
        } else {
          const norm = normalizeInstagram(instagramHandle);
          if (!norm) return res.status(400).json({ error: 'invalid Instagram handle' });
          instagramVal = norm;
        }
      }
      // Turkey-only platform: city must be one of the 81 provinces.
      const cityVal = typeof city === 'string' && city.trim() ? city.trim() : undefined;
      if (cityVal && !isTurkishCity(cityVal)) {
        return res.status(400).json({ error: 'city must be a Turkish province' });
      }
      // Styles must come from the allowed taxonomy (no arbitrary strings), max 5.
      let stylesVal: string[] | undefined;
      if (styles !== undefined) {
        if (!Array.isArray(styles) || !styles.every(s => typeof s === 'string' && isValidStyle(s))) {
          return res.status(400).json({ error: 'invalid tattoo style' });
        }
        const deduped = [...new Set(styles as string[])];
        if (deduped.length > MAX_STYLES) {
          return res.status(400).json({ error: `at most ${MAX_STYLES} styles` });
        }
        stylesVal = deduped;
      }
      const lat = latitude == null ? undefined : Number(latitude);
      const lng = longitude == null ? undefined : Number(longitude);
      if (lat !== undefined && (!Number.isFinite(lat) || lat < -90 || lat > 90)) {
        return res.status(400).json({ error: 'latitude out of range' });
      }
      if (lng !== undefined && (!Number.isFinite(lng) || lng < -180 || lng > 180)) {
        return res.status(400).json({ error: 'longitude out of range' });
      }
      // Coordinates come as a pair so the Turkey check can never be half-bypassed.
      if ((lat === undefined) !== (lng === undefined)) {
        return res.status(400).json({ error: 'provide latitude and longitude together' });
      }
      // Public map pins must fall inside Turkey.
      if (lat !== undefined && lng !== undefined && !isInTurkeyBounds(lat, lng)) {
        return res.status(400).json({ error: 'coordinates must be within Turkey' });
      }

      const pUpdate = {
        name: typeof name === 'string' ? name.trim() : undefined,
        bio: typeof bio === 'string' ? bio.trim().slice(0, 500) : undefined,
        city: cityVal,
        styles: stylesVal,
        district: typeof district === 'string' ? district.trim().slice(0, 60) : undefined,
        publicAddressLabel: typeof publicAddressLabel === 'string' ? publicAddressLabel.trim().slice(0, 120) : undefined,
        latitude: lat,
        longitude: lng,
        isPublicLocation: typeof isPublicLocation === 'boolean' ? isPublicLocation : undefined,
        instagramHandle: instagramVal,
      };

      const providerStatus = await evaluateArtistActivation(me, pUpdate);

      await updateProfile(me.id, {
        ...pUpdate,
        providerStatus,
      });
      const updated = await getUserById(me.id);
      return res.status(200).json(updated ? ownUser(updated) : { ok: true });
    }

    if (action === 'delete-account') {
      const me = await getSessionUser(req);
      if (!me) return res.status(401).json({ error: 'sign in required' });
      // Self-only: acts strictly on the authenticated user's own id.
      const outcome = await deactivateAccount(me.id);
      // Remove the user's own Blob files (portfolio + request photos); best-effort.
      for (const url of outcome.blobUrls) {
        try { await del(url); } catch { /* orphaned blob is harmless */ }
      }
      clearSessionCookie(res);   // drop the current session immediately
      return res.status(200).json({ ok: true, mode: outcome.mode });
    }

    return res.status(400).json({ error: 'unknown action' });
  } catch (err) {
    console.error('auth api error', err);
    return res.status(500).json({ error: 'internal error' });
  }
}
