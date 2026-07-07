import type { VercelRequest, VercelResponse } from '@vercel/node';
import { readCollection, writeCollection, newId, type MessageRow, type UserRow, type OfferRow } from './_lib/db.js';
import { getSessionUser } from './_lib/auth.js';

/**
 * Direct messages between a customer and an artist.
 *   GET  /api/messages                  → my threads (last message + peer)
 *   GET  /api/messages?with=<userId>    → full thread with that user
 *   POST /api/messages {toUserId, text} → send (only customer↔artist pairs
 *                                          that share at least one offer)
 *
 * Thread id is the sorted user-id pair; both GETs only ever return threads
 * the session user belongs to.
 */

function threadId(a: string, b: string): string {
  return [a, b].sort().join(':');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const user = await getSessionUser(req);
    if (!user) return res.status(401).json({ error: 'sign in required' });

    if (req.method === 'GET') {
      const messages = await readCollection<MessageRow>('messages');
      const mine = messages.filter(m => m.fromId === user.id || m.toId === user.id);

      const withId = req.query.with;
      if (typeof withId === 'string') {
        const tid = threadId(user.id, withId);
        return res.status(200).json(mine.filter(m => m.threadId === tid).sort((a, b) => a.ts - b.ts));
      }

      // Build thread summaries: peer + last message, newest first.
      const users = await readCollection<UserRow>('users');
      const byThread = new Map<string, MessageRow>();
      for (const m of mine) {
        const prev = byThread.get(m.threadId);
        if (!prev || m.ts > prev.ts) byThread.set(m.threadId, m);
      }
      const threads = [...byThread.values()]
        .sort((a, b) => b.ts - a.ts)
        .map(last => {
          const peerId = last.fromId === user.id ? last.toId : last.fromId;
          const peer = users.find(u => u.id === peerId);
          return {
            peerId,
            peerName: peer?.name ?? 'Deleted account',
            peerRole: peer?.role ?? 'customer',
            lastText: last.text,
            lastTs: last.ts,
          };
        });
      return res.status(200).json(threads);
    }

    if (req.method === 'POST') {
      const { toUserId, text } = req.body ?? {};
      if (typeof toUserId !== 'string' || toUserId === user.id) {
        return res.status(400).json({ error: 'valid toUserId required' });
      }
      if (typeof text !== 'string' || !text.trim() || text.length > 2000) {
        return res.status(400).json({ error: 'text required (max 2000 chars)' });
      }
      const users = await readCollection<UserRow>('users');
      const peer = users.find(u => u.id === toUserId);
      if (!peer) return res.status(404).json({ error: 'recipient not found' });

      // Messaging is tied to a real business relationship: the pair must
      // share at least one offer (any status). Blocks cold spam.
      const offers = await readCollection<OfferRow>('offers');
      const pair = (o: OfferRow) =>
        (o.customerId === user.id && o.artistId === toUserId) ||
        (o.artistId === user.id && o.customerId === toUserId);
      if (!offers.some(pair)) {
        return res.status(403).json({ error: 'messaging opens once an offer exists between you' });
      }

      const messages = await readCollection<MessageRow>('messages');
      const row: MessageRow = {
        id: newId('msg'),
        threadId: threadId(user.id, toUserId),
        fromId: user.id,
        fromName: user.name,
        toId: toUserId,
        text: text.trim(),
        ts: Date.now(),
      };
      await writeCollection('messages', [...messages, row]);
      return res.status(201).json(row);
    }

    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ error: 'method not allowed' });
  } catch (err) {
    console.error('messages api error', err);
    return res.status(500).json({ error: 'internal error' });
  }
}
