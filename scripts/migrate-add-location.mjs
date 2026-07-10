// Additive migration: location fields for artist/studio discovery.
// Idempotent (IF NOT EXISTS). Usage: node scripts/migrate-add-location.mjs
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

await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS district TEXT`;
await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS public_address_label TEXT`;
await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS latitude DOUBLE PRECISION`;
await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS longitude DOUBLE PRECISION`;
await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS is_public_location BOOLEAN NOT NULL DEFAULT FALSE`;
await sql`CREATE INDEX IF NOT EXISTS users_discovery_idx ON users(role, city, district)`;

const cols = await sql`SELECT column_name FROM information_schema.columns WHERE table_name='users' AND column_name IN ('district','public_address_label','latitude','longitude','is_public_location') ORDER BY column_name`;
console.log('location columns present:', cols.map(c => c.column_name).join(', '));
