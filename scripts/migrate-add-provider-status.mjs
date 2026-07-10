// Additive migration: provider activation status on users.
// Idempotent (IF NOT EXISTS). Usage: node scripts/migrate-add-provider-status.mjs
//
// Backfill: customers are always 'active'; existing artists/studios drop to
// 'pending_profile' until they complete the profile form (no data is deleted).
import { neon } from '@neondatabase/serverless';
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

const url = process.env.DATABASE_URL;
if (!url) { console.error('DATABASE_URL not set'); process.exit(1); }
const sql = neon(url);

await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS provider_status TEXT`;
await sql`UPDATE users SET provider_status = 'active' WHERE role = 'customer' AND provider_status IS NULL`;
await sql`UPDATE users SET provider_status = 'pending_profile' WHERE role IN ('artist','studio') AND provider_status IS NULL`;
await sql`DROP INDEX IF EXISTS users_discovery_idx`;
await sql`CREATE INDEX IF NOT EXISTS users_discovery_idx ON users(role, provider_status, city, district)`;

const rows = await sql`SELECT role, provider_status, COUNT(*)::int AS n FROM users GROUP BY role, provider_status ORDER BY role`;
console.log('provider_status backfill:', JSON.stringify(rows));
