import type { VercelRequest, VercelResponse } from '@vercel/node';
import { readCollection, writeCollection, newId, today, type UserRow } from './_lib/db.js';
import { hashPassword, verifyPassword, signSession, setSessionCookie, clearSessionCookie, getSessionUser, ownUser } from './_lib/auth.js';

/**
 * Authentication.
 *   GET  /api/auth            → current user (or 401)
 *   POST /api/auth {action: 'register', email, password, name, role, city?, bio?, styles?}
 *   POST /api/auth {action: 'login', email, password}
 *   POST /api/auth {action: 'logout'}
 */

const ROLES = new Set(['customer', 'artist', 'studio']);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

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

      const users = await readCollection<UserRow>('users');
      const emailLc = email.toLowerCase().trim();
      if (users.some(u => u.email === emailLc)) {
        return res.status(409).json({ error: 'an account with this email already exists' });
      }

      const { salt, passHash } = hashPassword(password);
      const user: UserRow = {
        id: newId('usr'),
        email: emailLc,
        name: name.trim(),
        role: role as UserRow['role'],
        city: typeof city === 'string' && city.trim() ? city.trim().slice(0, 60) : undefined,
        bio: typeof bio === 'string' && bio.trim() ? bio.trim().slice(0, 500) : undefined,
        styles: Array.isArray(styles) ? styles.filter((s): s is string => typeof s === 'string').slice(0, 5) : undefined,
        passHash,
        salt,
        createdAt: today(),
      };
      await writeCollection('users', [...users, user]);
      setSessionCookie(res, signSession(user.id, user.role));
      return res.status(201).json(ownUser(user));
    }

    if (action === 'login') {
      const { email, password } = req.body ?? {};
      if (typeof email !== 'string' || typeof password !== 'string') {
        return res.status(400).json({ error: 'email and password required' });
      }
      const users = await readCollection<UserRow>('users');
      const user = users.find(u => u.email === email.toLowerCase().trim());
      if (!user || !verifyPassword(password, user.salt, user.passHash)) {
        return res.status(401).json({ error: 'invalid email or password' });
      }
      setSessionCookie(res, signSession(user.id, user.role));
      return res.status(200).json(ownUser(user));
    }

    return res.status(400).json({ error: 'unknown action' });
  } catch (err) {
    console.error('auth api error', err);
    return res.status(500).json({ error: 'internal error' });
  }
}
