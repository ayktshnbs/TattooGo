import type { VercelRequest, VercelResponse } from '@vercel/node';
import { verifySignature, parseEvent } from './_lib/creem.js';
import { recordWebhookEvent, upsertSubscriptionFromWebhook } from './_lib/repo.js';

/**
 * Creem webhook — the ONLY writer of premium status.
 *
 * Security: verifies the HMAC signature over the RAW body (body parsing is
 * disabled so the bytes match), rejects invalid signatures, and is idempotent
 * (a repeat event id is a no-op). Premium is never granted from a success
 * redirect — only from a verified event here.
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

    // Idempotency: only the first delivery of an event id is processed.
    const fresh = await recordWebhookEvent(ev.id);
    if (!fresh) return res.status(200).json({ ok: true, duplicate: true });

    // Events we don't act on (unknown status / no user mapping) are acked.
    if (ev.ignored || !ev.userId || !ev.status) return res.status(200).json({ ok: true, ignored: true });

    await upsertSubscriptionFromWebhook({
      userId: ev.userId,
      providerCustomerId: ev.providerCustomerId,
      providerSubscriptionId: ev.providerSubscriptionId,
      status: ev.status,
      currentPeriodStart: ev.currentPeriodStart,
      currentPeriodEnd: ev.currentPeriodEnd,
      cancelAtPeriodEnd: ev.cancelAtPeriodEnd,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    // Never leak internals; log without secrets/recipients/bodies.
    console.error('creem webhook error', err instanceof Error ? err.message : '');
    return res.status(500).json({ error: 'internal error' });
  }
}
