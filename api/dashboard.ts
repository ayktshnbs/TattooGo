import type { VercelRequest, VercelResponse } from '@vercel/node';
import { list } from '@vercel/blob';
import { readCollection, type RequestRow, type OfferRow, type ReviewRow, type MessageRow } from './_lib/db.js';
import { getSessionUser } from './_lib/auth.js';

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

    const [requests, offers, reviews, messages] = await Promise.all([
      readCollection<RequestRow>('requests'),
      readCollection<OfferRow>('offers'),
      readCollection<ReviewRow>('reviews'),
      readCollection<MessageRow>('messages'),
    ]);

    if (user.role === 'customer') {
      const myRequests = requests.filter(r => r.customerId === user.id);
      const myOffers = offers.filter(o => o.customerId === user.id);
      const unrepliedThreads = new Set(
        messages.filter(m => m.toId === user.id).map(m => m.threadId),
      );
      return res.status(200).json({
        role: 'customer',
        stats: {
          activeRequests: myRequests.filter(r => r.status === 'open').length,
          openOffers: myOffers.filter(o => o.status === 'sent').length,
          upcoming: myOffers.filter(o => o.status === 'accepted').length,
          completed: myOffers.filter(o => o.status === 'completed').length,
        },
        recentRequests: myRequests.sort((a, b) => b.ts - a.ts).slice(0, 4),
        recentOffers: myOffers.sort((a, b) => b.ts - a.ts).slice(0, 4),
        threadCount: unrepliedThreads.size,
      });
    }

    // artist / studio
    const myOffers = offers.filter(o => o.artistId === user.id);
    const myReviews = reviews.filter(r => r.artistId === user.id);
    const completed = myOffers.filter(o => o.status === 'completed');
    const accepted = myOffers.filter(o => o.status === 'accepted');
    const openBoard = requests.filter(r => r.status === 'open');
    const avgRating = myReviews.length
      ? Math.round((myReviews.reduce((s, r) => s + r.rating, 0) / myReviews.length) * 10) / 10
      : null;

    // Portfolio counts come from the moderated feed index.
    let portfolio = { approved: 0, pending: 0 };
    try {
      const { blobs } = await list({ prefix: 'feed/index.json', limit: 1 });
      if (blobs.length > 0) {
        const feed = await (await fetch(`${blobs[0].url}?nc=${Date.now().toString(36)}`, { cache: 'no-store' })).json();
        if (Array.isArray(feed)) {
          const mine = feed.filter((e: { artistId?: string }) => e.artistId === user.id);
          portfolio = {
            approved: mine.filter((e: { status?: string }) => e.status !== 'pending').length,
            pending: mine.filter((e: { status?: string }) => e.status === 'pending').length,
          };
        }
      }
    } catch { /* feed unavailable — keep zeros */ }

    return res.status(200).json({
      role: 'artist',
      stats: {
        openRequests: openBoard.length,
        offersSent: myOffers.length,
        offersPending: myOffers.filter(o => o.status === 'sent').length,
        jobsBooked: accepted.length,
        jobsCompleted: completed.length,
        earnings: completed.reduce((s, o) => s + o.price, 0),
        avgRating,
        reviewCount: myReviews.length,
        portfolioApproved: portfolio.approved,
        portfolioPending: portfolio.pending,
      },
      recentRequests: openBoard.sort((a, b) => b.ts - a.ts).slice(0, 4),
      recentOffers: myOffers.sort((a, b) => b.ts - a.ts).slice(0, 4),
    });
  } catch (err) {
    console.error('dashboard api error', err);
    return res.status(500).json({ error: 'internal error' });
  }
}
