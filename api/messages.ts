import type { VercelRequest, VercelResponse } from '@vercel/node';
import { newId, type MessageRow } from './_lib/db.js';
import { getSessionUser } from './_lib/auth.js';
import { listThreads, listThread, createMessage, offerExistsBetween, getUserById, pushNotification } from './_lib/repo.js';
import { newMessageEmail } from './_lib/email.js';

/**
 * Direct messages between a customer and an artist.
 *   GET  /api/messages                  → my threads (last message + peer)
 *   GET  /api/messages?with=<userId>    → full thread with that user
 *   POST /api/messages {toUserId, text} → send (only pairs that share an offer)
 */

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const user = await getSessionUser(req);
    if (!user) return res.status(401).json({ error: 'sign in required' });

    if (req.method === 'GET') {
      const withId = req.query.with;
      if (typeof withId === 'string') {
        return res.status(200).json(await listThread(user.id, withId));
      }
      return res.status(200).json(await listThreads(user.id));
    }

    if (req.method === 'POST') {
      const { toUserId, text } = req.body ?? {};
      if (typeof toUserId !== 'string' || toUserId === user.id) {
        return res.status(400).json({ error: 'valid toUserId required' });
      }
      if (typeof text !== 'string' || !text.trim() || text.length > 2000) {
        return res.status(400).json({ error: 'text required (max 2000 chars)' });
      }
      const peer = await getUserById(toUserId);
      if (!peer) return res.status(404).json({ error: 'recipient not found' });

      // Messaging requires a real business relationship — blocks cold spam.
      if (!await offerExistsBetween(user.id, toUserId)) {
        return res.status(403).json({ error: 'messaging opens once an offer exists between you' });
      }

      const row: MessageRow = {
        id: newId('msg'),
        threadId: [user.id, toUserId].sort().join(':'),
        fromId: user.id,
        fromName: user.name,
        toId: toUserId,
        text: text.trim(),
        ts: Date.now(),
      };
      await createMessage(row);

      // Post-write side effects — best-effort.
      await pushNotification(peer.id, 'message', user.name, row.text.slice(0, 120));
      await newMessageEmail(peer.email, peer.name, user.name, row.text, peer.role === 'artist' || peer.role === 'studio');

      return res.status(201).json(row);
    }

    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ error: 'method not allowed' });
  } catch (err) {
    console.error('messages api error', err);
    return res.status(500).json({ error: 'internal error' });
  }
}
