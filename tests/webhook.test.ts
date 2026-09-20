import { test, after, before } from 'node:test';
import assert from 'node:assert/strict';
import { createHmac } from 'node:crypto';
import { DB_TESTS, skipReason, sql, cleanup, makeUser, uniq } from './_db.ts';

/**
 * M10 — Creem webhook hardening: product gate, string-only ids, event time,
 * signature scheme, and (DB) stale-event ordering + ledger idempotency.
 * Payments stay disabled; these values are test-only env settings.
 */
process.env.CREEM_PRODUCT_ID = 'prod_ours';
process.env.CREEM_WEBHOOK_SECRET = 'whsec_test';

type Creem = typeof import('../api/_lib/creem.js');
type Repo = typeof import('../api/_lib/repo.js');
let creem: Creem, repo: Repo;

before(async () => {
  creem = await import('../api/_lib/creem.js');
  if (DB_TESTS) repo = await import('../api/_lib/repo.js');
});
after(cleanup);

const envelope = (over: Record<string, unknown> = {}, sub: Record<string, unknown> = {}) => ({
  id: 'evt_1', eventType: 'subscription.active', created_at: '2026-09-20T10:00:00Z',
  object: {
    id: 'sub_1', status: 'active', product: { id: 'prod_ours' }, customer: { id: 'cust_1' },
    current_period_start_date: '2026-09-20T10:00:00Z', current_period_end_date: '2026-10-20T10:00:00Z',
    metadata: { user_id: 'usr_1' }, ...sub,
  },
  ...over,
});

test('parseEvent maps a subscription event and takes ids only as strings', () => {
  const ev = creem.parseEvent(envelope());
  assert.equal(ev.ignored, false);
  assert.equal(ev.userId, 'usr_1');
  assert.equal(ev.productId, 'prod_ours');
  assert.equal(ev.providerCustomerId, 'cust_1', 'expanded customer object → its id, not "[object Object]"');
  assert.equal(ev.providerSubscriptionId, 'sub_1');
  assert.equal(ev.status, 'active');
  assert.equal(ev.eventAt, Date.parse('2026-09-20T10:00:00Z'));
  assert.equal(ev.currentPeriodEnd, Date.parse('2026-10-20T10:00:00Z'));
});

test('parseEvent ignores events for another product, and events without a user or status', () => {
  assert.equal(creem.parseEvent(envelope({}, { product: { id: 'prod_other' } })).reason, 'wrong-product');
  assert.equal(creem.parseEvent(envelope({}, { product_id: 'prod_other', product: undefined })).reason, 'wrong-product');
  assert.equal(creem.parseEvent(envelope({}, { product: undefined })).reason, 'wrong-product', 'no product named → not ours');
  assert.equal(creem.parseEvent(envelope({}, { metadata: {} })).reason, 'no-user');
  assert.equal(creem.parseEvent(envelope({}, { status: 'weird' })).reason, 'no-status');
  assert.equal(creem.parseEvent(envelope({ id: undefined })).reason, 'no-id');
  const objUser = creem.parseEvent(envelope({}, { metadata: { user_id: { evil: true } } }));
  assert.equal(objUser.reason, 'no-user', 'a non-string user id is not coerced');
});

test('verifySignature accepts the hex HMAC (bare or sha256=-prefixed) and nothing else', () => {
  const body = Buffer.from('{"id":"evt_1"}');
  const hex = createHmac('sha256', 'whsec_test').update(body).digest('hex');
  assert.equal(creem.verifySignature(body, hex), true);
  assert.equal(creem.verifySignature(body, 'sha256=' + hex.toUpperCase()), true);
  assert.equal(creem.verifySignature(body, hex.slice(0, -1) + '0'), false);
  assert.equal(creem.verifySignature(body, ''), false);
  assert.equal(creem.verifySignature(body, undefined), false);
  assert.equal(creem.verifySignature(Buffer.from('{"id":"evt_2"}'), hex), false);
});

test('stale webhook events never overwrite newer state; repeat event ids are no-ops', { skip: skipReason }, async () => {
  const userId = await makeUser('sub', { providerType: 'artist', providerStatus: 'active' });
  const t0 = Date.parse('2026-09-20T10:00:00Z');
  const base = { userId, providerSubscriptionId: uniq('sub'), providerCustomerId: 'cust_t' };

  const newer = await repo.applyWebhookEvent(uniq('evtNew'), { ...base, status: 'canceled', eventAt: t0 + 60_000 });
  assert.equal(newer, 'applied');
  const older = await repo.applyWebhookEvent(uniq('evtOld'), { ...base, status: 'active', eventAt: t0 });
  assert.equal(older, 'stale', 'an older "active" arriving late is ignored');
  assert.equal((await repo.getSubscription(userId))?.status, 'canceled');
  assert.equal(await repo.hasActivePremium(userId), false);

  const dupId = uniq('evtDup');
  assert.equal(await repo.applyWebhookEvent(dupId, { ...base, status: 'active', eventAt: t0 + 120_000 }), 'applied');
  assert.equal(await repo.applyWebhookEvent(dupId, { ...base, status: 'expired', eventAt: t0 + 999_000 }), 'duplicate');
  assert.equal((await repo.getSubscription(userId))?.status, 'active', 'the duplicate delivery changed nothing');
  const [ledger] = await sql`SELECT COUNT(*)::int AS c FROM webhook_events WHERE event_id = ${dupId}`;
  assert.equal(Number(ledger.c), 1);
});
