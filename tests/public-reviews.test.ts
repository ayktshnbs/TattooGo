import { test, after, before } from 'node:test';
import assert from 'node:assert/strict';
import { DB_TESTS, skipReason, sql, cleanup, makeUser, makeRequest, uniq } from './_db.ts';

/** M7 — the public reviews endpoint projection + provider-status rules. */
type Repo = typeof import('../api/_lib/repo.js');
let repo: Repo;
let customer = '', artist = '';

before(async () => {
  if (!DB_TESTS) return;
  repo = await import('../api/_lib/repo.js');
  customer = await makeUser('rcust');
  artist = await makeUser('rart', { providerType: 'artist', providerStatus: 'needs_review' });
  // A completed job + one visible and one hidden review, written straight to SQL.
  const requestId = await makeRequest(customer, 'R');
  const offerId = uniq('offR');
  await sql`INSERT INTO offers (id, request_id, request_title, artist_id, artist_name, customer_id, customer_name, price, message, status, created_at, ts)
    VALUES (${offerId}, ${requestId}, 'Brief R', ${artist}, 'Artist', ${customer}, 'Customer', 500, 'm', 'completed', '2026-09-20', ${Date.now()})`;
  const offer2 = uniq('offR2');
  const request2 = await makeRequest(customer, 'R2');
  await sql`INSERT INTO offers (id, request_id, request_title, artist_id, artist_name, customer_id, customer_name, price, message, status, created_at, ts)
    VALUES (${offer2}, ${request2}, 'Brief R2', ${artist}, 'Artist', ${customer}, 'Customer', 500, 'm', 'completed', '2026-09-20', ${Date.now()})`;
  await sql`INSERT INTO reviews (id, offer_id, request_title, artist_id, customer_id, customer_name, rating, text, created_at, ts)
    VALUES (${uniq('rev1')}, ${offerId}, 'Brief R', ${artist}, ${customer}, 'Customer', 5, 'great', '2026-09-20', ${Date.now()})`;
  await sql`INSERT INTO reviews (id, offer_id, request_title, artist_id, customer_id, customer_name, rating, text, created_at, ts, hidden_at, hidden_by)
    VALUES (${uniq('rev2')}, ${offer2}, 'Brief R2', ${artist}, ${customer}, 'Customer', 1, 'hidden one', '2026-09-20', ${Date.now() - 1}, ${Date.now()}, 'admin')`;
});
after(cleanup);

test('reviews of a non-active provider are not public (404 semantics)', { skip: skipReason }, async () => {
  assert.equal(await repo.listPublicReviewsForArtist(artist), null, 'needs_review → null');
  await sql`UPDATE users SET provider_status = 'suspended' WHERE id = ${artist}`;
  assert.equal(await repo.listPublicReviewsForArtist(artist), null, 'suspended → null');
  assert.equal(await repo.listPublicReviewsForArtist(customer), null, 'a customer account is not a provider → null');
  assert.equal(await repo.listPublicReviewsForArtist('nope'), null);
});

test('public projection carries no customer id / offer id and excludes hidden reviews', { skip: skipReason }, async () => {
  await sql`UPDATE users SET provider_status = 'active' WHERE id = ${artist}`;
  const rows = await repo.listPublicReviewsForArtist(artist);
  assert.ok(rows);
  assert.equal(rows.length, 1, 'hidden review excluded');
  assert.deepEqual(Object.keys(rows[0]).sort(), ['createdAt', 'customerName', 'id', 'rating', 'requestTitle', 'text']);
  assert.equal(rows[0].text, 'great');
  assert.equal((rows[0] as Record<string, unknown>).customerId, undefined);
  assert.equal((rows[0] as Record<string, unknown>).offerId, undefined);
});

test('deactivated provider disappears from the public projection', { skip: skipReason }, async () => {
  await sql`UPDATE users SET deactivated_at = ${Date.now()} WHERE id = ${artist}`;
  assert.equal(await repo.listPublicReviewsForArtist(artist), null);
});
