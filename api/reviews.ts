import type { VercelRequest, VercelResponse } from '@vercel/node';
import { readCollection, writeCollection, newId, today, type ReviewRow, type OfferRow } from './_lib/db.js';
import { getSessionUser } from './_lib/auth.js';

/**
 * Reviews — only real customers, only after a completed job.
 *   GET  /api/reviews?artistId=<id> → public reviews for an artist
 *   GET  /api/reviews               → artist: reviews received · customer: reviews written
 *   POST /api/reviews {offerId, rating, text} → customer reviews a completed
 *                                    offer they own; one review per offer
 */

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method === 'GET') {
      const reviews = await readCollection<ReviewRow>('reviews');
      const artistId = req.query.artistId;
      if (typeof artistId === 'string') {
        return res.status(200).json(reviews.filter(r => r.artistId === artistId).sort((a, b) => b.ts - a.ts));
      }
      const user = await getSessionUser(req);
      if (!user) return res.status(401).json({ error: 'sign in required' });
      const mine = user.role === 'customer'
        ? reviews.filter(r => r.customerId === user.id)
        : reviews.filter(r => r.artistId === user.id);
      return res.status(200).json(mine.sort((a, b) => b.ts - a.ts));
    }

    if (req.method === 'POST') {
      const user = await getSessionUser(req);
      if (!user) return res.status(401).json({ error: 'sign in required' });
      if (user.role !== 'customer') return res.status(403).json({ error: 'only customers can leave reviews' });

      const { offerId, rating, text } = req.body ?? {};
      if (typeof offerId !== 'string') return res.status(400).json({ error: 'offerId required' });
      const ratingNum = Number(rating);
      if (!Number.isInteger(ratingNum) || ratingNum < 1 || ratingNum > 5) {
        return res.status(400).json({ error: 'rating must be an integer 1-5' });
      }
      if (typeof text !== 'string' || !text.trim() || text.length > 1000) {
        return res.status(400).json({ error: 'text required (max 1000 chars)' });
      }

      const offers = await readCollection<OfferRow>('offers');
      const offer = offers.find(o => o.id === offerId);
      if (!offer) return res.status(404).json({ error: 'offer not found' });
      if (offer.customerId !== user.id) return res.status(403).json({ error: 'forbidden' });
      if (offer.status !== 'completed') {
        return res.status(409).json({ error: 'reviews unlock after the job is completed' });
      }

      const reviews = await readCollection<ReviewRow>('reviews');
      if (reviews.some(r => r.offerId === offerId)) {
        return res.status(409).json({ error: 'this job is already reviewed' });
      }

      const row: ReviewRow = {
        id: newId('rev'),
        offerId,
        requestTitle: offer.requestTitle,
        artistId: offer.artistId,
        customerId: user.id,
        customerName: user.name,
        rating: ratingNum,
        text: text.trim(),
        createdAt: today(),
        ts: Date.now(),
      };
      await writeCollection('reviews', [row, ...reviews]);
      return res.status(201).json(row);
    }

    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ error: 'method not allowed' });
  } catch (err) {
    console.error('reviews api error', err);
    return res.status(500).json({ error: 'internal error' });
  }
}
