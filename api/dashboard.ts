import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getSessionUser } from './_lib/auth.js';
import {
  listOpenRequests, listRequestsByCustomer, listOffersByArtist, listOffersByCustomer,
  listReviewsByArtist, listThreads, portfolioCountsByArtist,
} from './_lib/repo.js';

/**
 * Role-scoped dashboard aggregates — every number is computed from real rows
 * belonging to the session user. A brand-new account gets zeros and empty
 * lists, never invented figures.
 */

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== 'GET') {
      res.setHeader('Allow', 'GET');
      return res.status(405).json({ error: 'method not allowed' });
    }
    const user = await getSessionUser(req);
    if (!user) return res.status(401).json({ error: 'sign in required' });

    // ?mode=provider → provider stats (requires a provider profile); default →
    // customer stats. One account can use both dashboards (multi-mode).
    const providerMode = req.query.mode === 'provider';
    if (providerMode && !user.providerType) {
      return res.status(403).json({ error: 'provider profile required' });
    }

    if (!providerMode) {
      const [myRequests, myOffers, threads] = await Promise.all([
        listRequestsByCustomer(user.id),
        listOffersByCustomer(user.id),
        listThreads(user.id),
      ]);
      return res.status(200).json({
        role: 'customer',
        stats: {
          activeRequests: myRequests.filter(r => r.status === 'open').length,
          openOffers: myOffers.filter(o => o.status === 'sent').length,
          upcoming: myOffers.filter(o => o.status === 'accepted').length,
          completed: myOffers.filter(o => o.status === 'completed').length,
        },
        recentRequests: myRequests.slice(0, 4),
        recentOffers: myOffers.slice(0, 4),
        threadCount: threads.length,
      });
    }

    // Customer briefs are only for ACTIVE providers — the same rule as
    // /api/requests?board=1 (403 there). The rest of the provider dashboard is
    // the provider's own data, so it still loads; the board is withheld
    // server-side and `boardAccess` tells the UI why.
    const boardAccess: 'active' | 'denied' = user.providerStatus === 'active' ? 'active' : 'denied';
    const [openBoard, myOffers, myReviews, portfolio] = await Promise.all([
      boardAccess === 'active' ? listOpenRequests() : Promise.resolve([]),
      listOffersByArtist(user.id),
      listReviewsByArtist(user.id),
      portfolioCountsByArtist(user.id),
    ]);
    const completed = myOffers.filter(o => o.status === 'completed');
    const avgRating = myReviews.length
      ? Math.round((myReviews.reduce((s, r) => s + r.rating, 0) / myReviews.length) * 10) / 10
      : null;

    return res.status(200).json({
      role: user.providerType,
      boardAccess,
      stats: {
        openRequests: openBoard.length,
        offersSent: myOffers.length,
        offersPending: myOffers.filter(o => o.status === 'sent').length,
        jobsBooked: myOffers.filter(o => o.status === 'accepted').length,
        jobsCompleted: completed.length,
        earnings: completed.reduce((s, o) => s + o.price, 0),
        avgRating,
        reviewCount: myReviews.length,
        portfolioApproved: portfolio.approved,
        portfolioPending: portfolio.pending,
      },
      recentRequests: openBoard.slice(0, 4),
      recentOffers: myOffers.slice(0, 4),
    });
  } catch (err) {
    console.error('dashboard api error', err);
    return res.status(500).json({ error: 'internal error' });
  }
}
