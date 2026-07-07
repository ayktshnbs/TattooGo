import type { VercelRequest, VercelResponse } from '@vercel/node';
import { put } from '@vercel/blob';
import { readCollection, writeCollection, newId, today, type RequestRow, type OfferRow } from './_lib/db.js';
import { getSessionUser } from './_lib/auth.js';

/**
 * Tattoo requests (customer briefs).
 *   GET  /api/requests            → customer: own requests · artist: open requests
 *   GET  /api/requests?id=<id>    → one request (owner, or any artist while open/booked)
 *   POST /api/requests            → create (customer only); optional JPEG reference
 *   PATCH /api/requests {id, action: 'cancel'} → owner cancels an open request
 *
 * Every read is scoped by the session — changing ids in the URL cannot reach
 * another customer's private data.
 */

const MAX_IMAGE_BYTES = 4 * 1024 * 1024;

function withOfferCount(r: RequestRow, offers: OfferRow[]) {
  return { ...r, offerCount: offers.filter(o => o.requestId === r.id).length };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const user = await getSessionUser(req);
    if (!user) return res.status(401).json({ error: 'sign in required' });

    if (req.method === 'GET') {
      const requests = await readCollection<RequestRow>('requests');
      const offers = await readCollection<OfferRow>('offers');

      const id = req.query.id;
      if (typeof id === 'string') {
        const r = requests.find(x => x.id === id);
        if (!r) return res.status(404).json({ error: 'not found' });
        const isOwner = r.customerId === user.id;
        const artistCanSee = (user.role === 'artist' || user.role === 'studio') && r.status !== 'cancelled';
        if (!isOwner && !artistCanSee) return res.status(403).json({ error: 'forbidden' });
        return res.status(200).json(withOfferCount(r, offers));
      }

      if (user.role === 'customer') {
        const mine = requests.filter(r => r.customerId === user.id).sort((a, b) => b.ts - a.ts);
        return res.status(200).json(mine.map(r => withOfferCount(r, offers)));
      }
      // artists see the open board
      const open = requests.filter(r => r.status === 'open').sort((a, b) => b.ts - a.ts);
      return res.status(200).json(open.map(r => withOfferCount(r, offers)));
    }

    if (req.method === 'POST') {
      if (user.role !== 'customer') return res.status(403).json({ error: 'only customers can create requests' });
      const { title, description, style, placement, size, color, city, budgetMin, budgetMax, imageData } = req.body ?? {};
      if (typeof title !== 'string' || !title.trim() || title.length > 120) {
        return res.status(400).json({ error: 'title required (max 120 chars)' });
      }
      if (typeof description !== 'string' || !description.trim() || description.length > 2000) {
        return res.status(400).json({ error: 'description required (max 2000 chars)' });
      }
      for (const [k, v] of Object.entries({ style, placement, size, color })) {
        if (typeof v !== 'string' || !v || v.length > 40) return res.status(400).json({ error: `${k} required` });
      }

      let referenceUrl: string | undefined;
      if (typeof imageData === 'string' && imageData.length > 0) {
        const match = imageData.match(/^data:image\/jpeg;base64,(.+)$/);
        if (!match) return res.status(400).json({ error: 'reference must be a JPEG data URL' });
        const bytes = Buffer.from(match[1], 'base64');
        if (bytes.length === 0 || bytes.length > MAX_IMAGE_BYTES || bytes[0] !== 0xff || bytes[1] !== 0xd8) {
          return res.status(400).json({ error: 'invalid reference image' });
        }
        const id = newId('ref');
        const blob = await put(`references/${id}.jpg`, bytes, { access: 'public', contentType: 'image/jpeg' });
        referenceUrl = blob.url;
      }

      const requests = await readCollection<RequestRow>('requests');
      const row: RequestRow = {
        id: newId('req'),
        customerId: user.id,
        customerName: user.name,
        title: title.trim(),
        description: description.trim(),
        style, placement, size, color,
        city: typeof city === 'string' && city.trim() ? city.trim().slice(0, 60) : user.city,
        budgetMin: Number.isFinite(Number(budgetMin)) && Number(budgetMin) >= 0 ? Number(budgetMin) : undefined,
        budgetMax: Number.isFinite(Number(budgetMax)) && Number(budgetMax) >= 0 ? Number(budgetMax) : undefined,
        referenceUrl,
        status: 'open',
        createdAt: today(),
        ts: Date.now(),
      };
      await writeCollection('requests', [row, ...requests]);
      return res.status(201).json({ ...row, offerCount: 0 });
    }

    if (req.method === 'PATCH') {
      const { id, action } = req.body ?? {};
      if (typeof id !== 'string' || action !== 'cancel') {
        return res.status(400).json({ error: 'id and action=cancel required' });
      }
      const requests = await readCollection<RequestRow>('requests');
      const row = requests.find(r => r.id === id);
      if (!row) return res.status(404).json({ error: 'not found' });
      if (row.customerId !== user.id) return res.status(403).json({ error: 'forbidden' });
      if (row.status !== 'open') return res.status(409).json({ error: 'only open requests can be cancelled' });
      row.status = 'cancelled';
      await writeCollection('requests', requests);
      return res.status(200).json({ ok: true });
    }

    res.setHeader('Allow', 'GET, POST, PATCH');
    return res.status(405).json({ error: 'method not allowed' });
  } catch (err) {
    console.error('requests api error', err);
    return res.status(500).json({ error: 'internal error' });
  }
}
