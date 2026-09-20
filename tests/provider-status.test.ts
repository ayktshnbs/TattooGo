import { test, after, before } from 'node:test';
import assert from 'node:assert/strict';
import { DB_TESTS, skipReason, sql, cleanup, makeUser } from './_db.ts';

/**
 * M2 / M8 / L9 — an admin-set suspension or needs_review can never be
 * overwritten by the self-service profile path, and admin mutations write
 * their audit row atomically (and only when something changed).
 */
type Repo = typeof import('../api/_lib/repo.js');
type Admin = typeof import('../api/_lib/admin.js');
let repo: Repo, admin: Admin;
let adminId = '', artist = '';

before(async () => {
  if (!DB_TESTS) return;
  repo = await import('../api/_lib/repo.js');
  admin = await import('../api/_lib/admin.js');
  adminId = await makeUser('adm');
  artist = await makeUser('art', { providerType: 'artist', providerStatus: 'active' });
});
after(cleanup);

const status = async (id: string) => (await sql`SELECT provider_status FROM users WHERE id = ${id}`)[0].provider_status;

test('suspended provider cannot be flipped back to active by a profile update', { skip: skipReason }, async () => {
  const out = await admin.adminSetProviderStatus(adminId, artist, 'suspended');
  assert.ok(out.ok);
  assert.equal(JSON.parse(out.previous).providerStatus, 'active', 'audit captures the previous status');

  // The self-service path (what update-profile / uploads call after evaluating
  // activation) tries to set active — the SQL guard keeps the suspension.
  await repo.updateProfile(artist, { bio: 'still here', providerStatus: 'active' });
  assert.equal(await status(artist), 'suspended');
  const [row] = await sql`SELECT bio FROM users WHERE id = ${artist}`;
  assert.equal(row.bio, 'still here', 'the rest of the update still applies');

  await admin.adminSetProviderStatus(adminId, artist, 'needs_review');
  await repo.updateProfile(artist, { providerStatus: 'active' });
  assert.equal(await status(artist), 'needs_review');

  // Only an admin decision lifts it.
  assert.ok((await admin.adminSetProviderStatus(adminId, artist, 'active')).ok);
  assert.equal(await status(artist), 'active');
  await repo.updateProfile(artist, { providerStatus: 'pending_profile' });
  assert.equal(await status(artist), 'pending_profile', 'self-service still moves between its own states');
});

test('admin mutation and its audit row are one unit; no-ops write no audit row', { skip: skipReason }, async () => {
  const count = async () => Number((await sql`SELECT COUNT(*)::int AS c FROM admin_audit_log WHERE admin_user_id = ${adminId}`)[0].c);
  const before = await count();

  await admin.adminSetProviderStatus(adminId, artist, 'suspended');
  assert.equal(await count(), before + 1, 'one audit row for the change');

  const again = await admin.adminSetProviderStatus(adminId, artist, 'suspended');
  assert.equal(again.ok, false, 'setting the same status is reported as a no-op');
  assert.equal(await count(), before + 1, 'and writes no redundant audit row');

  const missing = await admin.adminSetProviderStatus(adminId, 'no-such-user', 'active');
  assert.equal(missing.ok, false);
  assert.equal(await count(), before + 1);

  const [audit] = await sql`SELECT action, target_id, previous_value, new_value FROM admin_audit_log
    WHERE admin_user_id = ${adminId} ORDER BY created_at DESC LIMIT 1`;
  assert.equal(audit.action, 'set-provider-status');
  assert.equal(audit.target_id, artist);
  assert.deepEqual(JSON.parse(String(audit.new_value)), { providerStatus: 'suspended' });
});

test('deactivate / reactivate are guarded in-statement and audited', { skip: skipReason }, async () => {
  const cust = await makeUser('deact');
  const [first, second] = await Promise.all([admin.adminDeactivateUser(adminId, cust), admin.adminDeactivateUser(adminId, cust)]);
  assert.equal([first.ok, second.ok].filter(Boolean).length, 1, 'two admins clicking at once → one deactivation');
  const rows = await sql`SELECT COUNT(*)::int AS c FROM admin_audit_log WHERE target_id = ${cust} AND action = 'deactivate-user'`;
  assert.equal(Number(rows[0].c), 1, 'one audit row');
  assert.ok((await admin.adminReactivateUser(adminId, cust)).ok);
  assert.equal((await admin.adminReactivateUser(adminId, cust)).ok, false, 'already active → no-op');
});

test('audit rows survive the deletion of the admin account (M1: nullable FK)', { skip: skipReason }, async () => {
  const tempAdmin = await makeUser('tmpadm');
  const target = await makeUser('tgt', { providerType: 'studio', providerStatus: 'active' });
  assert.ok((await admin.adminSetProviderStatus(tempAdmin, target, 'needs_review')).ok);
  // Hard delete (no entanglements) used to fail the FK "SET NULL" on a NOT NULL column.
  const out = await repo.deactivateAccount(tempAdmin);
  assert.equal(out.mode, 'deleted');
  const [row] = await sql`SELECT admin_user_id FROM admin_audit_log WHERE target_id = ${target} LIMIT 1`;
  assert.equal(row.admin_user_id, null, 'row kept, admin reference nulled');
});
