// Additive migration: account deactivation marker. Idempotent.
// Usage: node scripts/migrate-add-deactivation.mjs
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

await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS deactivated_at BIGINT`;

const cols = await sql`SELECT column_name FROM information_schema.columns WHERE table_name='users' AND column_name='deactivated_at'`;
console.log('deactivated_at present:', cols.length === 1);
