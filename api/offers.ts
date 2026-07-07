import type { VercelRequest, VercelResponse } from '@vercel/node';
import { readCollection, writeCollection, newId, today, type OfferRow, type RequestRow } from './_lib/db.js';
import { getSessionUser } from './_lib/auth.js';

/**
 * Offers on tattoo requests.
 *   GET   /api/offers                    → artist: offers I sent · customer: offers on my requests
 *   POST  /api/offers                    → artist sends an offer on an open request
 *   PATCH /api/offers {id, action}       → customer: accept | reject · artist: complete
 *
 * accept books the request (other offers stay visible but the board entry
 * closes); complete marks the job done, unlocking a customer review.
 */

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const user = await getSessionUser(req);
    if (!user) return res.status(401).json({ error: 'sign in required' });
    const isArtist = user.role === 'artist' || user.role === 'studio';

    if (req.method === 'GET') {
      const offers = await readCollection<OfferRow>('offers');
      const mine = isArtist
        ? offers.filter(o => o.artistId === user.id)
        : offers.filter(o => o.customerId === user.id);
      return res.status(200).json(mine.sort((a, b) => b.ts - a.ts));
    }

    if (req.method === 'POST') {
      if (!isArtist) return res.status(403).json({ error: 'only artists can send offers' });
      const { requestId, price, message, appointmentAt } = req.body ?? {};
      if (typeof requestId !== 'string') return res.status(400).json({ error: 'requestId required' });
      const priceNum = Number(price);
      if (!Number.isFinite(priceNum) || priceNum <= 0 || priceNum > 1_000_000) {
        return res.status(400).json({ error: 'valid price required' });
      }
      if (typeof message !== 'string' || !message.trim() || message.length > 2000) {
        return res.status(400).json({ error: 'message required (max 2000 chars)' });
      }

      const requests = await readCollection<RequestRow>('requests');
      const request = requests.find(r => r.id === requestId);
      if (!request) return res.status(404).json({ error: 'request not found' });
      if (request.status !== 'open') return res.status(409).json({ error: 'request is no longer open' });

      const offers = await readCollection<OfferRow>('offers');
      if (offers.some(o => o.requestId === requestId && o.artistId === user.id)) {
        return res.status(409).json({ error: 'you already sent an offer on this request' });
      }

      const row: OfferRow = {
        id: newId('off'),
        requestId,
        requestTitle: request.title,
        artistId: user.id,
        artistName: user.name,
        customerId: request.customerId,
        customerName: request.customerName,
        price: Math.round(priceNum),
        message: message.trim(),
        appointmentAt: typeof appointmentAt === 'string' && appointmentAt.trim() ? appointmentAt.trim().slice(0, 40) : undefined,
        status: 'sent',
        createdAt: today(),
        ts: Date.now(),
      };
      await writeCollection('offers', [row, ...offers]);
      return res.status(201).json(row);
    }

    if (req.method === 'PATCH') {
      const { id, action } = req.body ?? {};
      if (typeof id !== 'string' || !['accept', 'reject', 'complete'].includes(action)) {
        return res.status(400).json({ error: 'id and action (accept|reject|complete) required' });
      }
      const offers = await readCollection<OfferRow>('offers');
      const offer = offers.find(o => o.id === id);
      if (!offer) return res.status(404).json({ error: 'not found' });

      if (action === 'accept' || action === 'reject') {
        if (offer.customerId !== user.id) return res.status(403).json({ error: 'forbidden' });
        if (offer.status !== 'sent') return res.status(409).json({ error: `offer already ${offer.status}` });
        offer.status = action === 'accept' ? 'accepted' : 'rejected';
        await writeCollection('offers', offers);
        if (action === 'accept') {
          const requests = await readCollection<RequestRow>('requests');
          const request = requests.find(r => r.id === offer.requestId);
          if (request && request.status === 'open') {
            request.status = 'booked';
            await writeCollection('requests', requests);
          }
        }
        return res.status(200).json(offer);
      }

      // complete — the artist marks an accepted job as done
      if (offer.artistId !== user.id) return res.status(403).json({ error: 'forbidden' });
      if (offer.status !== 'accepted') return res.status(409).json({ error: 'only accepted offers can be completed' });
      offer.status = 'completed';
      await writeCollection('offers', offers);
      const requests = await readCollection<RequestRow>('requests');
      const request = requests.find(r => r.id === offer.requestId);
      if (request) {
        request.status = 'completed';
        await writeCollection('requests', requests);
      }
      return res.status(200).json(offer);
    }

    res.setHeader('Allow', 'GET, POST, PATCH');
    return res.status(405).json({ error: 'method not allowed' });
  } catch (err) {
    console.error('offers api error', err);
    return res.status(500).json({ error: 'internal error' });
  }
}
