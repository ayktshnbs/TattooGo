import type { VercelRequest, VercelResponse } from '@vercel/node';
import {
  listArtistsPublic, getUserById, listApprovedPortfolioByArtist,
  listReviewsByArtist, countCompletedJobsByArtist,
} from './_lib/repo.js';
import { publicUser } from './_lib/auth.js';

/**
 * Public artist surface — no session required, safe for anonymous browsing.
 *
 *   GET /api/artists           → directory of real artist/studio accounts
 *                                (name, city, styles, bio, rating aggregates)
 *   GET /api/artists?id=<id>   → one public profile:
 *                                profile summary + APPROVED portfolio only +
 *                                public reviews + rating/completed aggregates
 *
 * Never returned here: emails, offers, earnings, messages, requests,
 * pending/rejected portfolio, or any dashboard data. Customer accounts are
 * not resolvable through this endpoint (404), so it cannot be used to
 * enumerate private users.
 */

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== 'GET') {
      res.setHeader('Allow', 'GET');
      return res.status(405).json({ error: 'method not allowed' });
    }

    const id = req.query.id;
    if (typeof id === 'string') {
      const user = await getUserById(id);
      if (!user || (user.role !== 'artist' && user.role !== 'studio')) {
        return res.status(404).json({ error: 'artist not found' });
      }
      const [portfolio, reviews, completedJobs] = await Promise.all([
        listApprovedPortfolioByArtist(user.id),
        listReviewsByArtist(user.id),
        countCompletedJobsByArtist(user.id),
      ]);
      const rating = reviews.length
        ? Math.round((reviews.reduce((s, r) => s + r.rating, 0) / reviews.length) * 10) / 10
        : null;
      res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate=120');
      return res.status(200).json({
        profile: { ...publicUser(user), rating, reviewCount: reviews.length, completedJobs },
        portfolio,
        // Reviews are public by design; customerName is the reviewer's display
        // name shown with their consent-by-action (they posted the review).
        reviews: reviews.slice(0, 50).map(r => ({
          id: r.id, rating: r.rating, text: r.text,
          customerName: r.customerName, requestTitle: r.requestTitle, createdAt: r.createdAt,
        })),
      });
    }

    const artists = await listArtistsPublic();
    res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate=120');
    return res.status(200).json(artists);
  } catch (err) {
    console.error('artists api error', err);
    return res.status(500).json({ error: 'internal error' });
  }
}
