import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getSessionUser } from './_lib/auth.js';
import { listNotifications } from './_lib/repo.js';

/**
 * Notifications — real events only (new offer, offer status, completed job,
 * new message), scoped to the session user. Stored rows in Postgres mode;
 * derived from offer activity in Blob-fallback mode.
 */

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== 'GET') {
      res.setHeader('Allow', 'GET');
      return res.status(405).json({ error: 'method not allowed' });
    }
    const user = await getSessionUser(req);
    if (!user) return res.status(401).json({ error: 'sign in required' });
    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).json(await listNotifications(user.id, user.role));
  } catch (err) {
    console.error('notifications api error', err);
    return res.status(500).json({ error: 'internal error' });
  }
}
