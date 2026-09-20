import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getSessionUser } from './_lib/auth.js';
import { listNotifications, markNotificationsRead } from './_lib/repo.js';

/**
 * Notifications — real events only (new offer, offer status, completed job,
 * new message), scoped to the session user. Stored rows in Postgres mode;
 * derived from offer activity in Blob-fallback mode.
 *   GET   /api/notifications                       → newest 50
 *   PATCH /api/notifications {all:true} | {ids:[]} → mark read (own rows only)
 */

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const user = await getSessionUser(req);
    if (!user) return res.status(401).json({ error: 'sign in required' });
    res.setHeader('Cache-Control', 'no-store');

    if (req.method === 'GET') {
      return res.status(200).json(await listNotifications(user.id, user.providerType ?? 'customer'));
    }
    if (req.method === 'PATCH') {
      const { all, ids } = req.body ?? {};
      if (all === true) return res.status(200).json({ ok: true, updated: await markNotificationsRead(user.id, 'all') });
      if (Array.isArray(ids) && ids.length > 0 && ids.length <= 100 && ids.every(i => typeof i === 'string')) {
        return res.status(200).json({ ok: true, updated: await markNotificationsRead(user.id, ids) });
      }
      return res.status(400).json({ error: 'all:true or ids[] required' });
    }
    res.setHeader('Allow', 'GET, PATCH');
    return res.status(405).json({ error: 'method not allowed' });
  } catch (err) {
    console.error('notifications api error', err);
    return res.status(500).json({ error: 'internal error' });
  }
}
