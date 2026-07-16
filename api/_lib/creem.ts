import { createHmac, timingSafeEqual } from 'node:crypto';
import { CREEM_API_KEY, CREEM_API_BASE, CREEM_PRODUCT_ID, CREEM_WEBHOOK_SECRET } from './config.js';
import type { SubscriptionStatus } from './db.js';

/**
 * Creem PAYMENT TRANSPORT — the single module that knows Creem's API shape.
 *
 * Like email-provider.ts, all vendor specifics live here so switching provider
 * (or correcting field names) touches ONE file. Card data never reaches us:
 * we create a Creem-hosted checkout and trust only signed webhooks.
 *
 * NOTE: exact endpoint paths, request/response fields, the webhook signature
 * header, and event names must be confirmed against Creem's current docs. The
 * parsing below is deliberately defensive (tries several field names) and is
 * the only place to adjust when verified. Runs in test mode until CREEM_API_BASE
 * is pointed at the live host.
 */

export function isConfigured(): boolean {
  return CREEM_API_KEY.length > 0 && CREEM_PRODUCT_ID.length > 0;
}

export interface CheckoutParams {
  userId: string;   // our correlation id — echoed back on the webhook
  email: string;
  successUrl: string;
}

/** Create a Creem-hosted checkout session; returns the redirect URL. */
export async function createCheckout(p: CheckoutParams): Promise<string> {
  const res = await fetch(`${CREEM_API_BASE}/v1/checkouts`, {
    method: 'POST',
    headers: { 'x-api-key': CREEM_API_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      product_id: CREEM_PRODUCT_ID,
      request_id: p.userId,
      success_url: p.successUrl,
      customer: { email: p.email },
      metadata: { user_id: p.userId },
    }),
  });
  if (!res.ok) throw new Error(`creem checkout failed (HTTP ${res.status})`);
  const data = await res.json().catch(() => ({} as Record<string, unknown>));
  const url = (data.checkout_url ?? data.url ?? data.checkoutUrl) as unknown;
  if (typeof url !== 'string' || !url) throw new Error('creem checkout: no url in response');
  return url;
}

/** Verify a webhook signature: HMAC-SHA256(rawBody, secret) as lowercase hex. */
export function verifySignature(rawBody: Buffer, signature: string | undefined): boolean {
  if (!CREEM_WEBHOOK_SECRET || !signature) return false;
  const expected = createHmac('sha256', CREEM_WEBHOOK_SECRET).update(rawBody).digest('hex');
  const a = Buffer.from(expected, 'utf8');
  const b = Buffer.from(signature, 'utf8');
  return a.length === b.length && timingSafeEqual(a, b);
}

export interface ParsedEvent {
  id: string;                        // event id → idempotency key
  ignored: boolean;                  // true for events we don't act on
  userId?: string;
  providerCustomerId?: string;
  providerSubscriptionId?: string;
  status?: SubscriptionStatus;
  currentPeriodStart?: number;
  currentPeriodEnd?: number;
  cancelAtPeriodEnd?: boolean;
}

// Creem subscription status → our internal status.
const STATUS_MAP: Record<string, SubscriptionStatus> = {
  active: 'active', paid: 'active', trialing: 'trialing', trial: 'trialing',
  past_due: 'past_due', unpaid: 'past_due',
  canceled: 'canceled', cancelled: 'canceled',
  expired: 'expired', incomplete_expired: 'expired',
};

function toMs(v: unknown): number | undefined {
  if (typeof v === 'number') return v > 1e12 ? v : v * 1000;   // sec vs ms
  if (typeof v === 'string') { const t = Date.parse(v); return Number.isNaN(t) ? undefined : t; }
  return undefined;
}

const pick = (o: Record<string, unknown>, ...keys: string[]): unknown => {
  for (const k of keys) if (o[k] != null) return o[k];
  return undefined;
};

/**
 * Map a Creem webhook payload → our upsert shape. Defensive against the exact
 * envelope: the subscription may be the top object or nested under `object`/
 * `data`/`subscription`, and the user id may arrive via metadata or request_id.
 */
export function parseEvent(body: Record<string, unknown>): ParsedEvent {
  const id = String(pick(body, 'id', 'event_id', 'eventId') ?? '');
  const obj = (pick(body, 'object', 'data', 'subscription') ?? body) as Record<string, unknown>;
  // Checkout envelopes nest the subscription one level deeper.
  const sub = ((obj.subscription as Record<string, unknown>) ?? obj) as Record<string, unknown>;
  const meta = (pick(sub, 'metadata') ?? pick(obj, 'metadata') ?? {}) as Record<string, unknown>;

  const rawStatus = String(pick(sub, 'status') ?? '').toLowerCase();
  const status = STATUS_MAP[rawStatus];
  const userId = (meta.user_id ?? pick(sub, 'request_id') ?? pick(obj, 'request_id')) as string | undefined;

  if (!id || !status || !userId) return { id, ignored: true };

  return {
    id,
    ignored: false,
    userId,
    providerCustomerId: (pick(sub, 'customer_id', 'customer') as string) ?? undefined,
    providerSubscriptionId: (pick(sub, 'id', 'subscription_id') as string) ?? undefined,
    status,
    currentPeriodStart: toMs(pick(sub, 'current_period_start_date', 'current_period_start')),
    currentPeriodEnd: toMs(pick(sub, 'current_period_end_date', 'current_period_end')),
    cancelAtPeriodEnd: Boolean(pick(sub, 'cancel_at_period_end')),
  };
}
