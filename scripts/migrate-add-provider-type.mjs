// Additive migration — Phase 2 one-account / multi-mode (Option A).
// Adds nullable provider_type and backfills it from the legacy role column:
//   role=artist/studio  → provider_type = role   (keeps provider_status)
//   role=customer       → provider_type = NULL, provider_status = NULL
// Idempotent. Usage: node scripts/migrate-add-provider-type.mjs
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

await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS provider_type TEXT
  CHECK (provider_type IN ('artist','studio'))`;
await sql`UPDATE users SET provider_type = role WHERE role IN ('artist','studio') AND provider_type IS NULL`;
await sql`UPDATE users SET provider_status = NULL WHERE provider_type IS NULL AND provider_status IS NOT NULL`;
await sql`CREATE INDEX IF NOT EXISTS users_provider_idx ON users(provider_type, provider_status, city, district)`;

const rows = await sql`SELECT role, provider_type, provider_status, COUNT(*)::int n
  FROM users GROUP BY role, provider_type, provider_status ORDER BY role`;
console.log('post-migration distribution:');
for (const r of rows) console.log(` role=${r.role} provider_type=${r.provider_type} provider_status=${r.provider_status} → ${r.n}`);
