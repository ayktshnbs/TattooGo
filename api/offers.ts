import type { VercelRequest, VercelResponse } from '@vercel/node';
import { newId, today, type OfferRow } from './_lib/db.js';
import { getSessionUser } from './_lib/auth.js';
import {
  listOffersByArtist, listOffersByCustomer, getRequestById, createOffer,
  acceptOffer, rejectOffer, completeOffer, getOfferById, getUserById, pushNotification,
  hasActivePremium,
} from './_lib/repo.js';
import { offerReceivedEmail, offerStatusEmail, jobCompletedEmail } from './_lib/email.js';
import { PREMIUM_REQUIRED } from './_lib/config.js';

/**
 * Offers on tattoo requests.
 *   GET   /api/offers              → artist: offers I sent · customer: offers on my requests
 *   POST  /api/offers              → artist sends an offer on an open request
 *   PATCH /api/offers {id, action} → customer: accept | reject · artist: complete
 *
 * State changes are atomic in the repo (guarded single-statement updates).
 * Emails/notifications fire AFTER the write succeeds and can never undo it.
 */

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const user = await getSessionUser(req);
    if (!user) return res.status(401).json({ error: 'sign in required' });
    // Multi-mode: provider actions key off the provider profile, not role.
    const isArtist = !!user.providerType;

    if (req.method === 'GET') {
      // ?sent=1 → provider view (offers I sent); default → offers on my requests.
      // One account can use both views (multi-mode).
      if (req.query.sent === '1') {
        if (!isArtist) return res.status(403).json({ error: 'provider profile required' });
        return res.status(200).json(await listOffersByArtist(user.id));
      }
      return res.status(200).json(await listOffersByCustomer(user.id));
    }

    if (req.method === 'POST') {
      if (!isArtist) return res.status(403).json({ error: 'only artists can send offers' });
      if (user.providerStatus !== 'active') return res.status(403).json({ error: 'your profile must be active to send offers' });
      // Premium gate — INERT unless PREMIUM_REQUIRED=true. With the flag off the
      // marketplace is unchanged; with it on, active providers also need premium.
      if (PREMIUM_REQUIRED && !(await hasActivePremium(user.id))) {
        return res.status(403).json({ code: 'premium_required', error: 'Premium membership is required to send offers.' });
      }
      const { requestId, price, message, appointmentAt } = req.body ?? {};
      if (typeof requestId !== 'string') return res.status(400).json({ error: 'requestId required' });
      const priceNum = Number(price);
      if (!Number.isFinite(priceNum) || priceNum <= 0 || priceNum > 1_000_000) {
        return res.status(400).json({ error: 'valid price required' });
      }
      if (typeof message !== 'string' || !message.trim() || message.length > 2000) {
        return res.status(400).json({ error: 'message required (max 2000 chars)' });
      }

      const request = await getRequestById(requestId);
      if (!request) return res.status(404).json({ error: 'request not found' });
      if (request.status !== 'open') return res.status(409).json({ error: 'request is no longer open' });

      const row: OfferRow = {
        id: newId('off'),
        requestId,
        requestTitle: request.title,
        artistId: user.id,
        artistName: user.name,
        customerId: request.customerId,
        customerName: request.customerName,
        price: Math.round(priceNum),
        message: message.trim(),
        appointmentAt: typeof appointmentAt === 'string' && appointmentAt.trim() ? appointmentAt.trim().slice(0, 40) : undefined,
        status: 'sent',
        createdAt: today(),
        ts: Date.now(),
      };
      const created = await createOffer(row);
      if (!created) return res.status(409).json({ error: 'you already sent an offer on this request' });

      // Post-write side effects — best-effort, never break the offer.
      await pushNotification(row.customerId, 'offer', row.artistName, `New offer on “${row.requestTitle}” — ₺${row.price.toLocaleString()}`);
      const customer = await getUserById(row.customerId);
      if (customer) await offerReceivedEmail(customer.email, customer.name, row.artistName, row.requestTitle, row.price);

      return res.status(201).json(row);
    }

    if (req.method === 'PATCH') {
      const { id, action } = req.body ?? {};
      if (typeof id !== 'string' || !['accept', 'reject', 'complete'].includes(action)) {
        return res.status(400).json({ error: 'id and action (accept|reject|complete) required' });
      }

      let updated: OfferRow | null = null;
      if (action === 'accept') updated = await acceptOffer(id, user.id);
      else if (action === 'reject') updated = await rejectOffer(id, user.id);
      else updated = await completeOffer(id, user.id);

      if (!updated) {
        // Guarded update matched nothing — distinguish why for a precise error.
        const offer = await getOfferById(id);
        if (!offer) return res.status(404).json({ error: 'not found' });
        const owner = action === 'complete' ? offer.artistId : offer.customerId;
        if (owner !== user.id) return res.status(403).json({ error: 'forbidden' });
        return res.status(409).json({
          error: action === 'complete' ? 'only accepted offers can be completed' : `offer already ${offer.status}`,
        });
      }

      // Post-write side effects.
      if (action === 'accept' || action === 'reject') {
        await pushNotification(updated.artistId, updated.status, updated.customerName,
          `“${updated.requestTitle}” — offer ${updated.status}`);
        const artist = await getUserById(updated.artistId);
        if (artist) await offerStatusEmail(artist.email, artist.name, updated.requestTitle, updated.status as 'accepted' | 'rejected');
      } else {
        await pushNotification(updated.customerId, 'completed', updated.artistName,
          `“${updated.requestTitle}” marked completed — you can leave a review`);
        const customer = await getUserById(updated.customerId);
        if (customer) await jobCompletedEmail(customer.email, customer.name, updated.requestTitle);
      }

      return res.status(200).json(updated);
    }

    res.setHeader('Allow', 'GET, POST, PATCH');
    return res.status(405).json({ error: 'method not allowed' });
  } catch (err) {
    console.error('offers api error', err);
    return res.status(500).json({ error: 'internal error' });
  }
}
