// One-time migration: Blob-JSON collections → Neon/Postgres.
// Safe to re-run (ON CONFLICT DO NOTHING). Image files stay in Vercel Blob.
// Usage: node scripts/migrate-blob-to-postgres.mjs   (reads .env.local)
import { neon } from '@neondatabase/serverless';
import { list } from '@vercel/blob';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
try {
  const raw = readFileSync(join(here, '..', '.env.local'), 'utf8');
  for (const line of raw.split('\n')) {
    const m = line.match(/^([A-Z0-9_]+)="?([^"\r\n]*)"?/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
} catch { /* rely on real env */ }

const { DATABASE_URL, BLOB_READ_WRITE_TOKEN } = process.env;
if (!DATABASE_URL || !BLOB_READ_WRITE_TOKEN) {
  console.error('DATABASE_URL and BLOB_READ_WRITE_TOKEN required');
  process.exit(1);
}
const sql = neon(DATABASE_URL);

async function readLatest(prefix, legacyPath) {
  const { blobs } = await list({ prefix, limit: 1000, token: BLOB_READ_WRITE_TOKEN });
  let url;
  if (blobs.length > 0) url = blobs.reduce((a, b) => (a.pathname > b.pathname ? a : b)).url;
  else {
    const legacy = await list({ prefix: legacyPath, limit: 1, token: BLOB_READ_WRITE_TOKEN });
    url = legacy.blobs[0]?.url;
  }
  if (!url) return [];
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) return [];
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

const users = await readLatest('db/users/', 'db/users.json');
for (const u of users) {
  await sql`INSERT INTO users (id, email, name, role, city, bio, styles, pass_hash, salt, email_verified, session_epoch, failed_logins, created_at)
    VALUES (${u.id}, ${u.email}, ${u.name}, ${u.role}, ${u.city ?? null}, ${u.bio ?? null}, ${u.styles ?? []}, ${u.passHash}, ${u.salt}, ${u.emailVerified ?? false}, ${u.sessionEpoch ?? 0}, 0, ${u.createdAt})
    ON CONFLICT (id) DO NOTHING`;
}
console.log(`users: ${users.length}`);

const requests = await readLatest('db/requests/', 'db/requests.json');
for (const r of requests) {
  await sql`INSERT INTO requests (id, customer_id, customer_name, title, description, style, placement, size, color, city, budget_min, budget_max, reference_url, status, created_at, ts)
    VALUES (${r.id}, ${r.customerId}, ${r.customerName}, ${r.title}, ${r.description}, ${r.style}, ${r.placement}, ${r.size}, ${r.color}, ${r.city ?? null}, ${r.budgetMin ?? null}, ${r.budgetMax ?? null}, ${r.referenceUrl ?? null}, ${r.status}, ${r.createdAt}, ${r.ts})
    ON CONFLICT (id) DO NOTHING`;
}
console.log(`requests: ${requests.length}`);

const offers = await readLatest('db/offers/', 'db/offers.json');
for (const o of offers) {
  await sql`INSERT INTO offers (id, request_id, request_title, artist_id, artist_name, customer_id, customer_name, price, message, appointment_at, status, created_at, ts)
    VALUES (${o.id}, ${o.requestId}, ${o.requestTitle}, ${o.artistId}, ${o.artistName}, ${o.customerId}, ${o.customerName}, ${o.price}, ${o.message}, ${o.appointmentAt ?? null}, ${o.status}, ${o.createdAt}, ${o.ts})
    ON CONFLICT (id) DO NOTHING`;
}
console.log(`offers: ${offers.length}`);

const messages = await readLatest('db/messages/', 'db/messages.json');
for (const m of messages) {
  await sql`INSERT INTO messages (id, thread_id, from_id, from_name, to_id, text, ts)
    VALUES (${m.id}, ${m.threadId}, ${m.fromId}, ${m.fromName}, ${m.toId}, ${m.text}, ${m.ts})
    ON CONFLICT (id) DO NOTHING`;
}
console.log(`messages: ${messages.length}`);

const reviews = await readLatest('db/reviews/', 'db/reviews.json');
for (const r of reviews) {
  await sql`INSERT INTO reviews (id, offer_id, request_title, artist_id, customer_id, customer_name, rating, text, created_at, ts)
    VALUES (${r.id}, ${r.offerId}, ${r.requestTitle}, ${r.artistId}, ${r.customerId}, ${r.customerName}, ${r.rating}, ${r.text}, ${r.createdAt}, ${r.ts})
    ON CONFLICT (id) DO NOTHING`;
}
console.log(`reviews: ${reviews.length}`);

const feed = await readLatest('feed/v/', 'feed/index.json');
for (const p of feed) {
  await sql`INSERT INTO portfolio_items (id, artist_id, artist_name, title, style, tags, image_url, image_ratio, status, created_at, ts)
    VALUES (${p.id}, ${p.artistId}, ${p.artistName}, ${p.title}, ${p.style}, ${p.tags ?? []}, ${p.imageUrl}, ${p.imageRatio ?? 1}, ${p.status ?? 'approved'}, ${p.createdAt}, ${p.ts ?? Date.now()})
    ON CONFLICT (id) DO NOTHING`;
}
console.log(`portfolio: ${feed.length}`);

console.log('migration complete');
