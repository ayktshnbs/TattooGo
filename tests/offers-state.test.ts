import { test, after, before } from 'node:test';
import assert from 'node:assert/strict';
import { DB_TESTS, skipReason, sql, cleanup, makeUser, makeRequest, uniq } from './_db.ts';

/**
 * H1 / M3 — offer state transitions are decided in the database, not in JS.
 * Runs against the real schema (RUN_DB_TESTS=1); all rows are test-tagged and
 * removed in after().
 */
type Repo = typeof import('../api/_lib/repo.js');
let repo: Repo;
let customer = '', artistA = '', artistB = '';

before(async () => {
  if (!DB_TESTS) return;
  repo = await import('../api/_lib/repo.js');
  customer = await makeUser('cust');
  artistA = await makeUser('artA', { providerType: 'artist', providerStatus: 'active' });
  artistB = await makeUser('artB', { providerType: 'artist', providerStatus: 'active' });
});
after(cleanup);

const offerInput = (requestId: string, artistId: string, label: string) => ({
  id: uniq('off' + label), requestId, artistId, artistName: 'Artist', price: 1000, message: 'hi',
  createdAt: '2026-09-20', ts: Date.now(),
});

test('first accept books the request, rejects the sibling, and a second accept fails', { skip: skipReason }, async () => {
  const requestId = await makeRequest(customer, 'A');
  const a = await repo.createOffer(offerInput(requestId, artistA, 'A1'));
  const b = await repo.createOffer(offerInput(requestId, artistB, 'A2'));
  assert.ok(a.ok && b.ok);

  const accepted = await repo.acceptOffer(a.offer.id, customer);
  assert.ok(accepted, 'first accept succeeds');
  assert.equal(accepted.offer.status, 'accepted');
  assert.deepEqual(accepted.rejectedArtistIds, [artistB], 'sibling artist is reported for notification');

  const [req] = await sql`SELECT status FROM requests WHERE id = ${requestId}`;
  assert.equal(req.status, 'booked');
  const [sib] = await sql`SELECT status FROM offers WHERE id = ${b.offer.id}`;
  assert.equal(sib.status, 'rejected', 'sibling sent offer auto-rejected');

  assert.equal(await repo.acceptOffer(b.offer.id, customer), null, 'rejected sibling cannot be accepted');
  assert.equal(await repo.acceptOffer(a.offer.id, customer), null, 'accepting twice is a no-op');
});

test('concurrent accepts on two offers of one request: exactly one wins', { skip: skipReason }, async () => {
  const requestId = await makeRequest(customer, 'B');
  const a = await repo.createOffer(offerInput(requestId, artistA, 'B1'));
  const b = await repo.createOffer(offerInput(requestId, artistB, 'B2'));
  assert.ok(a.ok && b.ok);

  const results = await Promise.all([repo.acceptOffer(a.offer.id, customer), repo.acceptOffer(b.offer.id, customer)]);
  const winners = results.filter(Boolean);
  assert.equal(winners.length, 1, 'no double booking');
  const rows = await sql`SELECT status FROM offers WHERE request_id = ${requestId} ORDER BY status`;
  assert.deepEqual(rows.map(r => r.status), ['accepted', 'rejected']);
});

test('accept on a cancelled request is refused and the request stays cancelled', { skip: skipReason }, async () => {
  const requestId = await makeRequest(customer, 'C');
  const c = await repo.createOffer(offerInput(requestId, artistA, 'C1'));
  assert.ok(c.ok);
  const cancel = await repo.cancelRequest(requestId, customer);
  assert.equal(cancel.result, 'ok');

  assert.equal(await repo.acceptOffer(c.offer.id, customer), null);
  const [req] = await sql`SELECT status FROM requests WHERE id = ${requestId}`;
  assert.equal(req.status, 'cancelled');
  const [off] = await sql`SELECT status FROM offers WHERE id = ${c.offer.id}`;
  assert.equal(off.status, 'sent', 'the pending offer is untouched, never accepted');
});

test('offers cannot be created on a closed request, and never twice by one artist', { skip: skipReason }, async () => {
  const requestId = await makeRequest(customer, 'D');
  assert.deepEqual((await repo.createOffer(offerInput(requestId, artistA, 'D1'))).ok, true);
  assert.deepEqual(await repo.createOffer(offerInput(requestId, artistA, 'D2')), { ok: false, reason: 'duplicate' });
  await repo.cancelRequest(requestId, customer);
  assert.deepEqual(await repo.createOffer(offerInput(requestId, artistB, 'D3')), { ok: false, reason: 'request-closed' });
});

test('a provider cannot bid on their own brief, and a self-offer can never be accepted (M2)', { skip: skipReason }, async () => {
  // Multi-mode: the customer who owns the brief is also a provider.
  await sql`UPDATE users SET provider_type = 'artist', provider_status = 'active' WHERE id = ${customer}`;
  const requestId = await makeRequest(customer, 'S');
  const self = await repo.createOffer(offerInput(requestId, customer, 'S1'));
  assert.equal(self.ok, false, 'insert refused inside the statement');
  const rows = await sql`SELECT COUNT(*)::int AS c FROM offers WHERE request_id = ${requestId}`;
  assert.equal(Number(rows[0].c), 0, 'nothing written');

  // Belt and braces: even a pre-existing self-offer row (where the CHECK
  // constraint is not yet applied) is never acceptable.
  const [con] = await sql`SELECT COUNT(*)::int AS c FROM pg_constraint WHERE conname = 'offers_no_self_offer'`;
  if (Number(con.c) > 0) {
    await assert.rejects(
      () => sql`INSERT INTO offers (id, request_id, request_title, artist_id, artist_name, customer_id, customer_name, price, message, status, created_at, ts)
        VALUES (${uniq('offSelf')}, ${requestId}, 'Brief S', ${customer}, 'Self', ${customer}, 'Self', 1, 'm', 'sent', '2026-09-21', ${Date.now()})`,
      /offers_no_self_offer/, 'database rejects the row outright');
  } else {
    const legacyId = uniq('offSelf');
    await sql`INSERT INTO offers (id, request_id, request_title, artist_id, artist_name, customer_id, customer_name, price, message, status, created_at, ts)
      VALUES (${legacyId}, ${requestId}, 'Brief S', ${customer}, 'Self', ${customer}, 'Self', 1, 'm', 'sent', '2026-09-21', ${Date.now()})`;
    assert.equal(await repo.acceptOffer(legacyId, customer), null, 'legacy self-offer cannot be accepted');
    const [req] = await sql`SELECT status FROM requests WHERE id = ${requestId}`;
    assert.equal(req.status, 'open', 'request untouched');
  }
  await sql`UPDATE users SET provider_type = NULL, provider_status = NULL WHERE id = ${customer}`;
});

test('concurrent offer creation vs cancel never yields an acceptable offer on a cancelled request', { skip: skipReason }, async () => {
  const requestId = await makeRequest(customer, 'E');
  const [created, cancel] = await Promise.all([
    repo.createOffer(offerInput(requestId, artistA, 'E1')),
    repo.cancelRequest(requestId, customer),
  ]);
  assert.equal(cancel.result, 'ok', 'the request was open, so the cancel always lands');
  const [req] = await sql`SELECT status FROM requests WHERE id = ${requestId}`;
  assert.equal(req.status, 'cancelled');
  if (created.ok) {
    // Insert won the race — allowed, but the offer is inert: it can never be accepted.
    assert.equal(await repo.acceptOffer(created.offer.id, customer), null);
  } else {
    assert.equal(created.reason, 'request-closed');
  }
});
