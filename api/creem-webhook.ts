import type { VercelRequest, VercelResponse } from '@vercel/node';
import { verifySignature, parseEvent } from './_lib/creem.js';
import { applyWebhookEvent } from './_lib/repo.js';

/**
 * Creem webhook — the ONLY writer of premium status.
 *
 * Security: verifies the HMAC signature over the RAW body (body parsing is
 * disabled so the bytes match), rejects invalid signatures, checks the event
 * names OUR product, and is idempotent (a repeat event id is a no-op) with
 * the ledger write and the state change committed together — a failed apply
 * rolls the ledger back so Creem's retry is processed, not dropped. Events
 * older than the last applied one are ignored (out-of-order delivery).
 * Premium is never granted from a success redirect — only from a verified
 * event here. Payments stay disabled until the CREEM_* env vars exist.
 */
export const config = { api: { bodyParser: false } };

async function readRawBody(req: VercelRequest): Promise<Buffer> {
  const chunks: Buffer[] = [];
  for await (const chunk of req) chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk as Buffer);
  return Buffer.concat(chunks);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST');
      return res.status(405).json({ error: 'method not allowed' });
    }

    const raw = await readRawBody(req);
    const sig = (req.headers['creem-signature'] ?? req.headers['x-creem-signature']) as string | undefined;
    if (!verifySignature(raw, sig)) {
      return res.status(401).json({ error: 'invalid signature' });
    }

    let body: Record<string, unknown>;
    try { body = JSON.parse(raw.toString('utf8')); }
    catch { return res.status(400).json({ error: 'invalid payload' }); }

    const ev = parseEvent(body);
    if (!ev.id) return res.status(400).json({ error: 'missing event id' });

    // Events we don't act on (unknown status / no user mapping / another
    // product) are acked so Creem stops retrying; the reason is logged only.
    if (ev.ignored || !ev.userId || !ev.status) {
      console.log(`creem webhook ignored: ${ev.reason ?? 'unmapped'}`);
      return res.status(200).json({ ok: true, ignored: true });
    }

    // Ledger + upsert in one transaction; a repeat event id is a no-op and a
    // stale (older) event never overwrites newer state.
    const outcome = await applyWebhookEvent(ev.id, {
      userId: ev.userId,
      providerCustomerId: ev.providerCustomerId,
      providerSubscriptionId: ev.providerSubscriptionId,
      status: ev.status,
      currentPeriodStart: ev.currentPeriodStart,
      currentPeriodEnd: ev.currentPeriodEnd,
      cancelAtPeriodEnd: ev.cancelAtPeriodEnd,
      eventAt: ev.eventAt,
    });
    if (outcome === 'duplicate') return res.status(200).json({ ok: true, duplicate: true });
    if (outcome === 'stale') return res.status(200).json({ ok: true, stale: true });
    return res.status(200).json({ ok: true });
  } catch (err) {
    // Never leak internals; log without secrets/recipients/bodies.
    console.error('creem webhook error', err instanceof Error ? err.message : '');
    return res.status(500).json({ error: 'internal error' });
  }
}
