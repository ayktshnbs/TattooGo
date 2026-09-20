import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getSessionUser } from './_lib/auth.js';
import { getSubscription, hasActivePremium, applyWebhookEvent } from './_lib/repo.js';
import { createCheckout, fetchSubscription, isConfigured } from './_lib/creem.js';
import { APP_URL, PREMIUM_REQUIRED } from './_lib/config.js';
import { rateLimit, tooMany, HOUR } from './_lib/ratelimit.js';

/**
 * Premium billing (artist/studio only).
 *   GET  /api/billing                     → own premium status for the dashboard
 *   POST /api/billing {action:'create-checkout'} → Creem-hosted checkout URL
 *   POST /api/billing {action:'sync'}            → re-read own subscription from
 *        Creem (missed-webhook recovery); same parser + ordering rules as the
 *        webhook, rate-limited, and a no-op unless billing is configured
 *
 * Premium is granted ONLY by the verified Creem webhook — never here, never by
 * the success redirect. No card data touches this endpoint. Creem secrets stay
 * server-side. Customers have no billing (403).
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const user = await getSessionUser(req);
    if (!user) return res.status(401).json({ error: 'sign in required' });
    if (!user.providerType) {
      return res.status(403).json({ error: 'premium is for artists and studios' });
    }

    if (req.method === 'GET') {
      const sub = await getSubscription(user.id);
      const hasPremium = await hasActivePremium(user.id);
      return res.status(200).json({
        premiumRequired: PREMIUM_REQUIRED,
        configured: isConfigured(),
        hasPremium,
        status: sub?.status ?? 'none',
        currentPeriodEnd: sub?.currentPeriodEnd ?? null,
        cancelAtPeriodEnd: sub?.cancelAtPeriodEnd ?? false,
      });
    }

    if (req.method === 'POST') {
      const { action } = req.body ?? {};
      if (action === 'sync') {
        if (!isConfigured()) return res.status(503).json({ error: 'billing is not configured yet' });
        if (tooMany(res, await rateLimit('billing:sync', user.id, 6, HOUR))) return;
        const sub = await getSubscription(user.id);
        if (!sub?.providerSubscriptionId) return res.status(404).json({ error: 'no subscription on file' });
        const ev = await fetchSubscription(sub.providerSubscriptionId);
        // The snapshot must be about THIS user — never let a fetched object re-point a row.
        if (ev.ignored || !ev.status || ev.userId !== user.id) return res.status(409).json({ error: 'subscription snapshot did not match your account' });
        const outcome = await applyWebhookEvent(ev.id, {
          userId: user.id,
          providerCustomerId: ev.providerCustomerId,
          providerSubscriptionId: ev.providerSubscriptionId ?? sub.providerSubscriptionId,
          status: ev.status,
          currentPeriodStart: ev.currentPeriodStart,
          currentPeriodEnd: ev.currentPeriodEnd,
          cancelAtPeriodEnd: ev.cancelAtPeriodEnd,
          eventAt: ev.eventAt,
        });
        return res.status(200).json({ ok: true, outcome, hasPremium: await hasActivePremium(user.id) });
      }
      if (action !== 'create-checkout') return res.status(400).json({ error: 'unknown action' });
      if (!isConfigured()) return res.status(503).json({ error: 'billing is not configured yet' });
      // Success only returns the user to the dashboard; the PremiumCard there
      // re-reads status. Premium is granted by the webhook, never this redirect.
      const successUrl = `${APP_URL}/studio?upgraded=1`;
      const url = await createCheckout({ userId: user.id, email: user.email, successUrl });
      return res.status(200).json({ url });
    }

    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ error: 'method not allowed' });
  } catch (err) {
    console.error('billing api error', err instanceof Error ? err.message : '');
    return res.status(500).json({ error: 'internal error' });
  }
}
