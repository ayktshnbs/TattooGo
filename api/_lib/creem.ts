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
 *
 * SIGNATURE SCHEME (verify before go-live): we expect the `creem-signature`
 * header to be HMAC-SHA256(raw body, CREEM_WEBHOOK_SECRET) as lowercase hex.
 * If Creem's live scheme differs (base64, a "t=…,v1=…" envelope, or a
 * timestamp in the signed payload), change ONLY verifySignature() below. Any
 * mismatch fails closed — the webhook rejects with 401 and no premium is ever
 * granted from an unverified event. Payments are NOT enabled: isConfigured()
 * is false in production until the CREEM_* env vars exist.
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

/** Verify a webhook signature: HMAC-SHA256(rawBody, secret) as lowercase hex.
 *  Accepts the bare hex digest or a "sha256=<hex>" prefix; compares in
 *  constant time. Anything else fails closed. */
export function verifySignature(rawBody: Buffer, signature: string | undefined): boolean {
  if (!CREEM_WEBHOOK_SECRET || !signature) return false;
  const expected = createHmac('sha256', CREEM_WEBHOOK_SECRET).update(rawBody).digest('hex');
  const given = signature.trim().replace(/^sha256=/i, '').toLowerCase();
  const a = Buffer.from(expected, 'utf8');
  const b = Buffer.from(given, 'utf8');
  return a.length === b.length && timingSafeEqual(a, b);
}

export interface ParsedEvent {
  id: string;                        // event id → idempotency key
  ignored: boolean;                  // true for events we don't act on
  /** Why it was ignored (logged, never returned to the caller). */
  reason?: 'no-id' | 'no-status' | 'no-user' | 'wrong-product';
  userId?: string;
  productId?: string;
  providerCustomerId?: string;
  providerSubscriptionId?: string;
  status?: SubscriptionStatus;
  currentPeriodStart?: number;
  currentPeriodEnd?: number;
  cancelAtPeriodEnd?: boolean;
  /** Provider-side event time (ms). Falls back to receipt time when absent. */
  eventAt: number;
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

/** Only ever accept string ids: a nested object (e.g. an expanded customer)
 *  must not be stringified into "[object Object]" and stored as an id. */
const str = (v: unknown): string | undefined => (typeof v === 'string' && v ? v : undefined);
/** An id may also arrive as an expanded object with its own `id`. */
const idOf = (v: unknown): string | undefined =>
  str(v) ?? (v && typeof v === 'object' ? str((v as Record<string, unknown>).id) : undefined);

/**
 * Map a Creem webhook payload → our upsert shape. Defensive against the exact
 * envelope: the subscription may be the top object or nested under `object`/
 * `data`/`subscription`, and the user id may arrive via metadata or request_id.
 */
export function parseEvent(body: Record<string, unknown>, receivedAt = Date.now()): ParsedEvent {
  const id = str(pick(body, 'id', 'event_id', 'eventId')) ?? '';
  const obj = (pick(body, 'object', 'data', 'subscription') ?? body) as Record<string, unknown>;
  // Checkout envelopes nest the subscription one level deeper.
  const sub = ((obj.subscription as Record<string, unknown>) ?? obj) as Record<string, unknown>;
  const meta = (pick(sub, 'metadata') ?? pick(obj, 'metadata') ?? {}) as Record<string, unknown>;
  const eventAt = toMs(pick(body, 'created_at', 'created', 'timestamp')) ?? toMs(pick(sub, 'updated_at')) ?? receivedAt;

  const rawStatus = String(pick(sub, 'status') ?? '').toLowerCase();
  const status = STATUS_MAP[rawStatus];
  const userId = str(meta.user_id) ?? str(pick(sub, 'request_id')) ?? str(pick(obj, 'request_id'));
  const productId = idOf(pick(sub, 'product_id', 'product')) ?? idOf(pick(obj, 'product_id', 'product'));

  if (!id) return { id, ignored: true, reason: 'no-id', eventAt };
  if (!status) return { id, ignored: true, reason: 'no-status', eventAt };
  if (!userId) return { id, ignored: true, reason: 'no-user', eventAt };
  // Product gate: an event for some other Creem product must never grant
  // OUR premium. When we know our product id, the event must name it.
  if (CREEM_PRODUCT_ID && productId !== CREEM_PRODUCT_ID) {
    return { id, ignored: true, reason: 'wrong-product', productId, eventAt };
  }

  return {
    id,
    ignored: false,
    userId,
    productId,
    providerCustomerId: idOf(pick(sub, 'customer_id', 'customer')),
    providerSubscriptionId: str(pick(sub, 'id', 'subscription_id')),
    status,
    currentPeriodStart: toMs(pick(sub, 'current_period_start_date', 'current_period_start')),
    currentPeriodEnd: toMs(pick(sub, 'current_period_end_date', 'current_period_end')),
    cancelAtPeriodEnd: Boolean(pick(sub, 'cancel_at_period_end')),
    eventAt,
  };
}

/**
 * Missed-webhook reconciliation: read one subscription straight from Creem
 * and map it with the same parser (so the same product / status / ordering
 * rules apply). Endpoint path per Creem's docs at time of writing:
 *   GET /v1/subscriptions?subscription_id=<id>   (x-api-key auth)
 * Verify against current docs before enabling payments; a mismatch simply
 * throws and the caller reports "sync unavailable" — nothing is granted.
 */
export async function fetchSubscription(providerSubscriptionId: string): Promise<ParsedEvent> {
  const res = await fetch(`${CREEM_API_BASE}/v1/subscriptions?subscription_id=${encodeURIComponent(providerSubscriptionId)}`, {
    headers: { 'x-api-key': CREEM_API_KEY },
  });
  if (!res.ok) throw new Error(`creem subscription fetch failed (HTTP ${res.status})`);
  const data = await res.json().catch(() => ({} as Record<string, unknown>)) as Record<string, unknown>;
  // Synthesize an event envelope: id = "sync:<sub id>:<updated_at>" so a
  // reconciliation is idempotent per snapshot, and the snapshot time orders it.
  const updated = toMs(pick(data, 'updated_at', 'updatedAt')) ?? Date.now();
  return parseEvent({ id: `sync:${providerSubscriptionId}:${updated}`, created_at: updated, object: data }, updated);
}
