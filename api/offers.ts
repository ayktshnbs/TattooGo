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

      // A provider cannot bid on their own brief. Decided on the request row's
      // customer_id (never on client-supplied ids) and enforced again inside
      // the insert + by the offers CHECK constraint, so it cannot be bypassed.
      const target = await getRequestById(requestId);
      if (!target) return res.status(404).json({ error: 'request not found' });
      if (target.customerId === user.id) {
        return res.status(403).json({ code: 'self_offer', error: 'you cannot send an offer on your own request' });
      }

      // The request's openness is enforced INSIDE the insert (repo.createOffer),
      // not by a pre-check — a concurrent cancel/accept can't race past it.
      const created = await createOffer({
        id: newId('off'),
        requestId,
        artistId: user.id,
        artistName: user.name,
        price: Math.round(priceNum),
        message: message.trim(),
        appointmentAt: typeof appointmentAt === 'string' && appointmentAt.trim() ? appointmentAt.trim().slice(0, 40) : undefined,
        createdAt: today(),
        ts: Date.now(),
      });
      if (!created.ok) {
        if (created.reason === 'self') return res.status(403).json({ code: 'self_offer', error: 'you cannot send an offer on your own request' });
        if (created.reason === 'duplicate') return res.status(409).json({ error: 'you already sent an offer on this request' });
        const exists = await getRequestById(requestId);
        if (!exists) return res.status(404).json({ error: 'request not found' });
        return res.status(409).json({ error: 'request is no longer open' });
      }
      const row = created.offer;

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
      let rejectedSiblings: string[] = [];
      if (action === 'accept') {
        const out = await acceptOffer(id, user.id);
        if (out) { updated = out.offer; rejectedSiblings = out.rejectedArtistIds; }
      }
      else if (action === 'reject') updated = await rejectOffer(id, user.id);
      else updated = await completeOffer(id, user.id);

      if (!updated) {
        // Guarded update matched nothing — distinguish why for a precise error.
        const offer = await getOfferById(id);
        if (!offer) return res.status(404).json({ error: 'not found' });
        const owner = action === 'complete' ? offer.artistId : offer.customerId;
        if (owner !== user.id) return res.status(403).json({ error: 'forbidden' });
        if (action === 'accept' && offer.status === 'sent') {
          // Offer is still pending, so the block came from the REQUEST side:
          // it is no longer open (already booked via another offer, cancelled,
          // or completed). Never accept into a closed request.
          const request = await getRequestById(offer.requestId);
          return res.status(409).json({ error: `request is ${request?.status ?? 'no longer open'} — offer cannot be accepted` });
        }
        return res.status(409).json({
          error: action === 'complete' ? 'only accepted offers can be completed' : `offer already ${offer.status}`,
        });
      }

      // Post-write side effects. Exactly one acceptance email per accepted
      // offer; sibling artists whose offers were auto-rejected get an in-app
      // notification (no email storm on a busy brief).
      if (action === 'accept' || action === 'reject') {
        await pushNotification(updated.artistId, updated.status, updated.customerName,
          `“${updated.requestTitle}” — offer ${updated.status}`);
        const artist = await getUserById(updated.artistId);
        if (artist) await offerStatusEmail(artist.email, artist.name, updated.requestTitle, updated.status as 'accepted' | 'rejected');
        for (const artistId of rejectedSiblings) {
          await pushNotification(artistId, 'rejected', updated.customerName,
            `“${updated.requestTitle}” — the customer chose another offer`);
        }
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
