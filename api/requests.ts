import type { VercelRequest, VercelResponse } from '@vercel/node';
import { put } from '@vercel/blob';
import { newId, today, type RequestRow } from './_lib/db.js';
import { getSessionUser } from './_lib/auth.js';
import {
  listOpenRequests, listRequestsByCustomer, getRequestById, createRequest, cancelRequest, hasOffer,
} from './_lib/repo.js';
import { isValidStyle } from './_lib/styles.js';

/**
 * Tattoo requests (customer briefs).
 *   GET   /api/requests          → customer: own · artist: open board
 *   GET   /api/requests?id=<id>  → owner always; artist only while open or if they bid
 *   POST  /api/requests          → create (customer only); optional JPEG reference → Blob
 *   PATCH /api/requests {id, action:'cancel'}
 */

const MAX_IMAGE_BYTES = 4 * 1024 * 1024;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const user = await getSessionUser(req);
    if (!user) return res.status(401).json({ error: 'sign in required' });
    const isArtist = user.role === 'artist' || user.role === 'studio';

    if (req.method === 'GET') {
      const id = req.query.id;
      if (typeof id === 'string') {
        const r = await getRequestById(id);
        if (!r) return res.status(404).json({ error: 'not found' });
        const isOwner = r.customerId === user.id;
        // Active artists may browse open briefs; any artist keeps access to a
        // request they already have an offer on (existing engagements survive
        // a status downgrade). Never extends to other customers.
        const artistCanSee = isArtist &&
          ((user.providerStatus === 'active' && r.status === 'open') || await hasOffer(r.id, user.id));
        if (!isOwner && !artistCanSee) return res.status(403).json({ error: 'forbidden' });
        return res.status(200).json(r);
      }
      if (isArtist && user.providerStatus !== 'active') {
        return res.status(403).json({ error: 'profile must be active to view the request board' });
      }
      const list = user.role === 'customer'
        ? await listRequestsByCustomer(user.id)
        : await listOpenRequests();
      return res.status(200).json(list);
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
      // Style must be one of the allowed tattoo styles (no arbitrary strings).
      if (!isValidStyle(style)) return res.status(400).json({ error: 'invalid tattoo style' });

      // Reference photo: the FILE goes to Vercel Blob; only the URL is stored.
      let referenceUrl: string | undefined;
      if (typeof imageData === 'string' && imageData.length > 0) {
        const match = imageData.match(/^data:image\/jpeg;base64,(.+)$/);
        if (!match) return res.status(400).json({ error: 'reference must be a JPEG data URL' });
        const bytes = Buffer.from(match[1], 'base64');
        if (bytes.length === 0 || bytes.length > MAX_IMAGE_BYTES || bytes[0] !== 0xff || bytes[1] !== 0xd8) {
          return res.status(400).json({ error: 'invalid reference image' });
        }
        const blob = await put(`references/${newId('ref')}.jpg`, bytes, { access: 'public', contentType: 'image/jpeg' });
        referenceUrl = blob.url;
      }

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
      await createRequest(row);
      return res.status(201).json({ ...row, offerCount: 0 });
    }

    if (req.method === 'PATCH') {
      const { id, action } = req.body ?? {};
      if (typeof id !== 'string' || action !== 'cancel') {
        return res.status(400).json({ error: 'id and action=cancel required' });
      }
      const outcome = await cancelRequest(id, user.id);
      if (outcome === 'not-found') return res.status(404).json({ error: 'not found' });
      if (outcome === 'forbidden') return res.status(403).json({ error: 'forbidden' });
      if (outcome === 'not-open') return res.status(409).json({ error: 'only open requests can be cancelled' });
      return res.status(200).json({ ok: true });
    }

    res.setHeader('Allow', 'GET, POST, PATCH');
    return res.status(405).json({ error: 'method not allowed' });
  } catch (err) {
    console.error('requests api error', err);
    return res.status(500).json({ error: 'internal error' });
  }
}
