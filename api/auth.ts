import type { VercelRequest, VercelResponse } from '@vercel/node';
import { newId, today, type UserRow } from './_lib/db.js';
import {
  hashPassword, verifyPassword, signSession, setSessionCookie, clearSessionCookie,
  getSessionUser, ownUser,
} from './_lib/auth.js';
import {
  findUserByEmail, createUser, setEmailVerified, setPassword,
  recordLoginFailure, clearLoginFailures, isLocked, createToken, consumeToken,
} from './_lib/repo.js';
import { welcomeVerifyEmail, verifyEmailAgain, passwordResetEmail } from './_lib/email.js';

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

const ROLES = new Set(['customer', 'artist', 'studio']);
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
      const { email, password, name, role, city, bio, styles } = req.body ?? {};
      if (typeof email !== 'string' || !EMAIL_RE.test(email) || email.length > 120) {
        return res.status(400).json({ error: 'valid email required' });
      }
      if (typeof password !== 'string' || password.length < 8 || password.length > 128) {
        return res.status(400).json({ error: 'password must be at least 8 characters' });
      }
      if (typeof name !== 'string' || !name.trim() || name.length > 80) {
        return res.status(400).json({ error: 'name required' });
      }
      if (typeof role !== 'string' || !ROLES.has(role)) {
        return res.status(400).json({ error: 'role must be customer, artist or studio' });
      }

      const { salt, passHash } = hashPassword(password);
      const user: UserRow = {
        id: newId('usr'),
        email: email.toLowerCase().trim(),
        name: name.trim(),
        role: role as UserRow['role'],
        city: typeof city === 'string' && city.trim() ? city.trim().slice(0, 60) : undefined,
        bio: typeof bio === 'string' && bio.trim() ? bio.trim().slice(0, 500) : undefined,
        styles: Array.isArray(styles) ? styles.filter((s): s is string => typeof s === 'string').slice(0, 5) : undefined,
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

    if (action === 'login') {
      const { email, password } = req.body ?? {};
      if (typeof email !== 'string' || typeof password !== 'string') {
        return res.status(400).json({ error: 'email and password required' });
      }
      const user = await findUserByEmail(email);
      // Identical error for unknown email and wrong password — no enumeration.
      if (!user) return res.status(401).json({ error: 'invalid email or password' });
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

    return res.status(400).json({ error: 'unknown action' });
  } catch (err) {
    console.error('auth api error', err);
    return res.status(500).json({ error: 'internal error' });
  }
}
