import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getSessionUser } from './_lib/auth.js';
import { listReviewsByArtist, listReviewsByCustomer, createReview } from './_lib/repo.js';

/**
 * Reviews — only real customers, only after a completed job, one per offer.
 *   GET  /api/reviews?artistId=<id> → public reviews for an artist
 *   GET  /api/reviews               → artist: received · customer: written
 *   POST /api/reviews {offerId, rating, text}
 */

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method === 'GET') {
      const artistId = req.query.artistId;
      if (typeof artistId === 'string') {
        return res.status(200).json(await listReviewsByArtist(artistId));
      }
      const user = await getSessionUser(req);
      if (!user) return res.status(401).json({ error: 'sign in required' });
      const mine = user.role === 'customer'
        ? await listReviewsByCustomer(user.id)
        : await listReviewsByArtist(user.id);
      return res.status(200).json(mine);
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

      const outcome = await createReview(user.id, user.name, offerId, ratingNum, text.trim());
      if (outcome === 'not-found') return res.status(404).json({ error: 'offer not found' });
      if (outcome === 'forbidden') return res.status(403).json({ error: 'forbidden' });
      if (outcome === 'not-completed') return res.status(409).json({ error: 'reviews unlock after the job is completed' });
      if (outcome === 'exists') return res.status(409).json({ error: 'this job is already reviewed' });
      return res.status(201).json(outcome);
    }

    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ error: 'method not allowed' });
  } catch (err) {
    console.error('reviews api error', err);
    return res.status(500).json({ error: 'internal error' });
  }
}
