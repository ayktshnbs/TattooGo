import { test, after, before } from 'node:test';
import assert from 'node:assert/strict';
import { DB_TESTS, skipReason, cleanup, makeUser, makeRequest } from './_db.ts';

/**
 * Every admin read query must run against the REAL schema — the Requests page
 * shipped with a `r.district` column that does not exist and 500'd until the
 * verification pass caught it. These tests execute each list query end-to-end
 * and check the projected shape of a known row.
 */
type Admin = typeof import('../api/_lib/admin.js');
let admin: Admin;
let customer = '', requestId = '';

before(async () => {
  if (!DB_TESTS) return;
  admin = await import('../api/_lib/admin.js');
  customer = await makeUser('alcust');
  requestId = await makeRequest(customer, 'AL');
});
after(cleanup);

test('admin list-requests runs and projects the brief correctly (H1)', { skip: skipReason }, async () => {
  const rows = await admin.adminListRequests({ limit: 200, offset: 0 });
  const mine = rows.find(r => r.id === requestId);
  assert.ok(mine, 'the test brief is listed');
  assert.equal(mine.customerId, customer);
  assert.equal(mine.status, 'open');
  assert.equal(mine.offerCount, 0);
  assert.equal(mine.city, null);
  assert.equal(mine.budgetMin, null);
  assert.equal(mine.referenceUrl, null);
  assert.deepEqual(Object.keys(mine).sort(), ['budgetMax', 'budgetMin', 'city', 'createdAt', 'customerId', 'customerName', 'id', 'offerCount', 'referenceUrl', 'status', 'style', 'title']);
});

test('every other admin read query executes against the live schema', { skip: skipReason }, async () => {
  const paging = { limit: 5, offset: 0 };
  await assert.doesNotReject(() => admin.adminListUsers('all', null, paging));
  await assert.doesNotReject(() => admin.adminListUsers('providers', 'a', paging));
  await assert.doesNotReject(() => admin.adminListPortfolio('all', paging));
  await assert.doesNotReject(() => admin.adminListOffers(paging));
  await assert.doesNotReject(() => admin.adminListReviews(paging));
  await assert.doesNotReject(() => admin.listAuditLog(paging));
  const summary = await admin.adminSummary();
  assert.ok(Number(summary.users_total) >= 1);
  const detail = await admin.adminGetUser(customer);
  assert.ok(detail && detail.requestCount === 1);
});
