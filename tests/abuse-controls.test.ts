import { test, after, before } from 'node:test';
import assert from 'node:assert/strict';
import { DB_TESTS, skipReason, sql, cleanup, makeUser, uniq } from './_db.ts';

/**
 * M4 / M5 / M6 / M9 / M14 — rate limiter, lockout reset, CSPRNG tokens,
 * report auto-hide on authenticated reporters only, DM relationship gate.
 */
type Repo = typeof import('../api/_lib/repo.js');
type RL = typeof import('../api/_lib/ratelimit.js');
let repo: Repo, rl: RL;

before(async () => {
  if (!DB_TESTS) return;
  repo = await import('../api/_lib/repo.js');
  rl = await import('../api/_lib/ratelimit.js');
});
after(cleanup);

test('rate limit: fixed window counts, blocks past the limit, resets after the window', { skip: skipReason }, async () => {
  const subject = uniq('rl');
  const scope = 'test:' + subject.slice(6, 12);   // keys start with "test:<run>" so cleanup finds them
  const r1 = await rl.rateLimit(scope, subject, 2, 60_000);
  const r2 = await rl.rateLimit(scope, subject, 2, 60_000);
  const r3 = await rl.rateLimit(scope, subject, 2, 60_000);
  assert.deepEqual([r1.allowed, r2.allowed, r3.allowed], [true, true, false]);
  assert.ok(r3.retryAfterSec >= 1 && r3.retryAfterSec <= 60);
  assert.equal(r3.count, 3);

  assert.equal((await rl.rateLimit(scope, subject + 'other', 2, 60_000)).allowed, true, 'other subject is independent');

  // Force the window to have elapsed → next call starts a fresh window.
  await sql`UPDATE rate_limits SET window_start = ${Date.now() - 120_000} WHERE key = ${scope + ':' + subject}`;
  const r4 = await rl.rateLimit(scope, subject, 2, 60_000);
  assert.equal(r4.allowed, true);
  assert.equal(r4.count, 1);
});

test('login lockout: locks at 5 failures and starts a fresh count once the lock expires', { skip: skipReason }, async () => {
  const id = await makeUser('lock');
  const row = async () => (await sql`SELECT failed_logins, lock_until FROM users WHERE id = ${id}`)[0];
  for (let i = 0; i < 5; i++) await repo.recordLoginFailure(id);
  let r = await row();
  assert.ok(r.lock_until != null && Number(r.lock_until) > Date.now(), 'locked after 5 failures');
  assert.ok(repo.isLocked({ lockUntil: Number(r.lock_until) } as never));

  // Lock lapses → one more failure must NOT immediately re-lock (M5 counter reset).
  await sql`UPDATE users SET lock_until = ${Date.now() - 1000} WHERE id = ${id}`;
  await repo.recordLoginFailure(id);
  r = await row();
  assert.equal(Number(r.failed_logins), 1, 'counter restarted');
  assert.equal(r.lock_until, null, 'no lock');

  await repo.clearLoginFailures(id);
  r = await row();
  assert.equal(Number(r.failed_logins), 0);
});

test('reset / verify tokens are 256-bit CSPRNG values and single-use', { skip: skipReason }, async () => {
  const id = await makeUser('tok');
  const raw = await repo.createToken(id, 'reset', 60_000);
  assert.match(raw, /^[0-9a-f]{64}$/, '32 random bytes, hex');
  const raw2 = await repo.createToken(id, 'reset', 60_000);
  assert.notEqual(raw, raw2);
  assert.equal(await repo.consumeToken(raw, 'verify'), null, 'kind is enforced');
  assert.equal(await repo.consumeToken(raw, 'reset'), id);
  assert.equal(await repo.consumeToken(raw, 'reset'), null, 'second use fails');
});

test('report auto-hide needs 3 distinct signed-in reporters; anonymous reports never hide', { skip: skipReason }, async () => {
  const artist = await makeUser('repart', { providerType: 'artist', providerStatus: 'active' });
  const itemId = uniq('pf');
  await sql`INSERT INTO portfolio_items (id, artist_id, artist_name, title, style, tags, image_url, image_ratio, status, created_at, ts)
    VALUES (${itemId}, ${artist}, 'A', 'T', 'blackwork', '{}', 'https://example.test/x.jpg', 1, 'approved', '2026-09-20', ${Date.now()})`;
  const item = async () => (await sql`SELECT hidden_at, hidden_by, report_count FROM portfolio_items WHERE id = ${itemId}`)[0];

  // Three anonymous reports from three different IP hashes: visible in the
  // admin tally, but no takedown.
  for (const ip of ['ipA', 'ipB', 'ipC']) {
    assert.equal(await repo.createPortfolioReport({ itemId, reporterId: null, ipHash: uniq(ip), reason: 'spam_fake' }), 'ok');
  }
  let r = await item();
  assert.equal(Number(r.report_count), 3, 'tally counts distinct sources');
  assert.equal(r.hidden_at, null, 'still visible');

  // Same IP again within 24h → rate-limited, tally unchanged.
  assert.equal(await repo.createPortfolioReport({ itemId, reporterId: null, ipHash: uniq('ipA'), reason: 'spam_fake' }), 'rate-limited');

  // Two signed-in reporters: still visible. The third hides it.
  const u1 = await makeUser('rep1'), u2 = await makeUser('rep2'), u3 = await makeUser('rep3');
  assert.equal(await repo.createPortfolioReport({ itemId, reporterId: u1, ipHash: uniq('ipD'), reason: 'stolen_work' }), 'ok');
  assert.equal(await repo.createPortfolioReport({ itemId, reporterId: u2, ipHash: uniq('ipE'), reason: 'stolen_work' }), 'ok');
  r = await item();
  assert.equal(r.hidden_at, null, 'two accounts are not enough');
  // The same account from a new IP does not count twice (per-account 24h rule).
  assert.equal(await repo.createPortfolioReport({ itemId, reporterId: u2, ipHash: uniq('ipF'), reason: 'stolen_work' }), 'rate-limited');
  assert.equal(await repo.createPortfolioReport({ itemId, reporterId: u3, ipHash: uniq('ipG'), reason: 'stolen_work' }), 'ok');
  r = await item();
  assert.ok(r.hidden_at != null, 'auto-hidden at the third distinct account');
  assert.equal(r.hidden_by, 'auto:reports');
  assert.equal(Number(r.report_count), 6);

  // Hidden items are no longer reportable.
  assert.equal(await repo.createPortfolioReport({ itemId, reporterId: null, ipHash: uniq('ipH'), reason: 'other' }), 'not-public');
});

test('DM gate: a rejected offer does not keep the channel open', { skip: skipReason }, async () => {
  const cust = await makeUser('dmc'), art = await makeUser('dma', { providerType: 'artist', providerStatus: 'active' });
  const reqId = uniq('reqDM');
  await sql`INSERT INTO requests (id, customer_id, customer_name, title, description, style, placement, size, color, status, created_at, ts)
    VALUES (${reqId}, ${cust}, 'C', 'B', 'd', 'blackwork', 'forearm', 'md', 'black', 'open', '2026-09-20', ${Date.now()})`;
  const offId = uniq('offDM');
  await sql`INSERT INTO offers (id, request_id, request_title, artist_id, artist_name, customer_id, customer_name, price, message, status, created_at, ts)
    VALUES (${offId}, ${reqId}, 'B', ${art}, 'A', ${cust}, 'C', 100, 'm', 'sent', '2026-09-20', ${Date.now()})`;
  assert.equal(await repo.offerExistsBetween(cust, art), true, 'pending offer opens messaging');
  assert.equal(await repo.offerExistsBetween(art, cust), true, 'in either direction');
  await sql`UPDATE offers SET status = 'rejected' WHERE id = ${offId}`;
  assert.equal(await repo.offerExistsBetween(cust, art), false, 'rejected → closed again');
  await sql`UPDATE offers SET status = 'completed' WHERE id = ${offId}`;
  assert.equal(await repo.offerExistsBetween(cust, art), true, 'completed job keeps it open');
});
