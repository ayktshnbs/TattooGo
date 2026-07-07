import type { VercelRequest, VercelResponse } from '@vercel/node';
import { readCollection, type UserRow, type ReviewRow } from './_lib/db.js';
import { publicUser } from './_lib/auth.js';

/**
 * Public artist directory — real registered artist/studio accounts only,
 * with rating aggregates computed from real reviews. No session required.
 */

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== 'GET') {
      res.setHeader('Allow', 'GET');
      return res.status(405).json({ error: 'method not allowed' });
    }
    const users = await readCollection<UserRow>('users');
    const reviews = await readCollection<ReviewRow>('reviews');

    const artists = users
      .filter(u => u.role === 'artist' || u.role === 'studio')
      .map(u => {
        const mine = reviews.filter(r => r.artistId === u.id);
        const rating = mine.length
          ? Math.round((mine.reduce((s, r) => s + r.rating, 0) / mine.length) * 10) / 10
          : null;
        return { ...publicUser(u), rating, reviewCount: mine.length };
      })
      .sort((a, b) => (b.reviewCount - a.reviewCount) || a.name.localeCompare(b.name));

    res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate=120');
    return res.status(200).json(artists);
  } catch (err) {
    console.error('artists api error', err);
    return res.status(500).json({ error: 'internal error' });
  }
}
