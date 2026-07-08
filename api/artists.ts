import type { VercelRequest, VercelResponse } from '@vercel/node';
import { listArtistsPublic } from './_lib/repo.js';

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
    const artists = await listArtistsPublic();
    res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate=120');
    return res.status(200).json(artists);
  } catch (err) {
    console.error('artists api error', err);
    return res.status(500).json({ error: 'internal error' });
  }
}
