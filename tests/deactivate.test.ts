import { test, after, before } from 'node:test';
import assert from 'node:assert/strict';
import { DB_TESTS, skipReason, sql, cleanup, makeUser, makeRequest, uniq } from './_db.ts';

/** M8 — account deletion: hard delete is guarded in-statement, the soft
 *  scrub is one transaction, and the request reference photo is detached. */
type Repo = typeof import('../api/_lib/repo.js');
let repo: Repo;

before(async () => { if (DB_TESTS) repo = await import('../api/_lib/repo.js'); });
after(cleanup);

test('no entanglements → hard delete (cascade), blob urls reported for cleanup', { skip: skipReason }, async () => {
  const id = await makeUser('hard', { providerType: 'artist', providerStatus: 'active' });
  await sql`INSERT INTO portfolio_items (id, artist_id, artist_name, title, style, tags, image_url, image_ratio, status, created_at, ts)
    VALUES (${uniq('pfh')}, ${id}, 'A', 'T', 'blackwork', '{}', 'https://example.test/hard.jpg', 1, 'approved', '2026-09-20', ${Date.now()})`;
  const out = await repo.deactivateAccount(id);
  assert.equal(out.mode, 'deleted');
  assert.deepEqual(out.blobUrls, ['https://example.test/hard.jpg']);
  assert.equal((await sql`SELECT 1 FROM users WHERE id = ${id}`).length, 0);
  assert.equal((await sql`SELECT 1 FROM portfolio_items WHERE artist_id = ${id}`).length, 0, 'cascaded');
});

test('with records → soft deactivation scrubs everything personal in one go', { skip: skipReason }, async () => {
  const id = await makeUser('soft', { providerType: 'studio', providerStatus: 'active' });
  const peer = await makeUser('peer');
  await sql`UPDATE users SET instagram_handle = 'inked', bio = 'bio', city = 'İstanbul' WHERE id = ${id}`;
  await sql`INSERT INTO messages (id, thread_id, from_id, from_name, to_id, text, ts)
    VALUES (${uniq('msg')}, ${[id, peer].sort().join(':')}, ${id}, 'S', ${peer}, 'hello', ${Date.now()})`;
  const reqId = await makeRequest(id, 'S');
  await sql`UPDATE requests SET reference_url = 'https://example.test/ref.jpg' WHERE id = ${reqId}`;

  const out = await repo.deactivateAccount(id);
  assert.equal(out.mode, 'deactivated');
  assert.ok(out.blobUrls.includes('https://example.test/ref.jpg'));

  const [u] = await sql`SELECT email, name, bio, city, instagram_handle, provider_status, deactivated_at, session_epoch FROM users WHERE id = ${id}`;
  assert.equal(u.email, `deleted+${id}@deleted.invalid`, 'email tombstoned (frees it, blocks login)');
  assert.equal(u.name, 'Deleted account');
  assert.equal(u.bio, null); assert.equal(u.city, null); assert.equal(u.instagram_handle, null);
  assert.equal(u.provider_status, 'suspended');
  assert.ok(u.deactivated_at != null);
  assert.equal(Number(u.session_epoch), 1, 'sessions revoked');
  const [r] = await sql`SELECT status, reference_url FROM requests WHERE id = ${reqId}`;
  assert.equal(r.status, 'cancelled');
  assert.equal(r.reference_url, null, 'reference detached');
  assert.equal((await sql`SELECT 1 FROM messages WHERE from_id = ${id}`).length, 1, 'transaction records preserved');
});

test('cancelRequest hands back the reference url and detaches it', { skip: skipReason }, async () => {
  const cust = await makeUser('cancel');
  const reqId = await makeRequest(cust, 'X');
  await sql`UPDATE requests SET reference_url = 'https://example.test/x.jpg' WHERE id = ${reqId}`;
  const out = await repo.cancelRequest(reqId, cust);
  assert.deepEqual(out, { result: 'ok', referenceUrl: 'https://example.test/x.jpg' });
  const [r] = await sql`SELECT reference_url FROM requests WHERE id = ${reqId}`;
  assert.equal(r.reference_url, null);
  assert.deepEqual(await repo.cancelRequest(reqId, cust), { result: 'not-open' });
  assert.deepEqual(await repo.cancelRequest(reqId, 'someone-else'), { result: 'forbidden' });
});
