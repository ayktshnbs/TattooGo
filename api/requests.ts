import type { VercelRequest, VercelResponse } from '@vercel/node';
import { del, put } from '@vercel/blob';
import { newId, today, type RequestRow } from './_lib/db.js';
import { getSessionUser } from './_lib/auth.js';
import {
  listOpenRequests, listRequestsByCustomer, getRequestById, createRequest, cancelRequest, hasOffer,
} from './_lib/repo.js';
import { isValidStyle } from './_lib/styles.js';
import { ipHash } from './_lib/ip.js';
import { rateLimit, tooMany, HOUR, DAY } from './_lib/ratelimit.js';

/**
 * Tattoo requests (customer briefs).
 *   GET   /api/requests          → customer: own · artist: open board
 *   GET   /api/requests?id=<id>  → owner always; artist only while open or if they bid
 *   POST  /api/requests          → create (customer only); optional JPEG reference → Blob
 *   PATCH /api/requests {id, action:'cancel'}
 */

// Vercel's ~4.5 MB body cap minus base64 overhead: 3 MB is the reachable limit.
const MAX_IMAGE_BYTES = 3 * 1024 * 1024;
// Creating a brief fans out to every active provider's board — cap the rate.
const REQUESTS_PER_USER_PER_DAY = 10;
const REQUESTS_PER_IP_PER_HOUR = 30;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const user = await getSessionUser(req);
    if (!user) return res.status(401).json({ error: 'sign in required' });
    // Multi-mode: provider access keys off the provider profile, not role.
    const isArtist = !!user.providerType;

    if (req.method === 'GET') {
      const id = req.query.id;
      if (typeof id === 'string') {
        const r = await getRequestById(id);
        if (!r) return res.status(404).json({ error: 'not found' });
        const isOwner = r.customerId === user.id;
        // Active providers may browse open briefs; any provider keeps access to
        // a request they already have an offer on (existing engagements survive
        // a status downgrade). Never extends to other customers.
        const artistCanSee = isArtist &&
          ((user.providerStatus === 'active' && r.status === 'open') || await hasOffer(r.id, user.id));
        if (!isOwner && !artistCanSee) return res.status(403).json({ error: 'forbidden' });
        return res.status(200).json(r);
      }
      // ?board=1 → provider request board (active providers only); default →
      // my own requests. One account can use both views (multi-mode).
      if (req.query.board === '1') {
        if (!isArtist) return res.status(403).json({ error: 'provider profile required' });
        if (user.providerStatus !== 'active') {
          return res.status(403).json({ error: 'profile must be active to view the request board' });
        }
        return res.status(200).json(await listOpenRequests());
      }
      return res.status(200).json(await listRequestsByCustomer(user.id));
    }

    if (req.method === 'POST') {
      // Any signed-in user can create a request — customer mode is universal.
      if (tooMany(res, await rateLimit('request:user', user.id, REQUESTS_PER_USER_PER_DAY, DAY),
        'daily request limit reached — try again tomorrow')) return;
      if (tooMany(res, await rateLimit('request:ip', ipHash(req), REQUESTS_PER_IP_PER_HOUR, HOUR))) return;
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
      if (outcome.result === 'not-found') return res.status(404).json({ error: 'not found' });
      if (outcome.result === 'forbidden') return res.status(403).json({ error: 'forbidden' });
      if (outcome.result === 'not-open') return res.status(409).json({ error: 'only open requests can be cancelled' });
      // The reference photo has no further use once cancelled — free the Blob.
      if (outcome.referenceUrl) { try { await del(outcome.referenceUrl); } catch { /* orphan is harmless */ } }
      return res.status(200).json({ ok: true });
    }

    res.setHeader('Allow', 'GET, POST, PATCH');
    return res.status(405).json({ error: 'method not allowed' });
  } catch (err) {
    console.error('requests api error', err);
    return res.status(500).json({ error: 'internal error' });
  }
}
