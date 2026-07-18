// Additive migration for activation Phase A + report-based moderation Phase B.
// Idempotent. Usage: node scripts/migrate-add-instagram-and-reports.mjs
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

// Phase A — Instagram field on the user row (nullable; required only at activation time).
await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS instagram_handle TEXT`;

// Phase B — soft-hide + report tally on portfolio items.
await sql`ALTER TABLE portfolio_items ADD COLUMN IF NOT EXISTS hidden_at BIGINT`;
await sql`ALTER TABLE portfolio_items ADD COLUMN IF NOT EXISTS hidden_by TEXT`;
await sql`ALTER TABLE portfolio_items ADD COLUMN IF NOT EXISTS report_count INTEGER NOT NULL DEFAULT 0`;

// The reports themselves. reporter_id is nullable (anonymous allowed).
// reporter_ip_hash is sha256(ip + AUTH_SECRET) — anti-spam only, never exposed.
await sql`CREATE TABLE IF NOT EXISTS portfolio_reports (
  id                TEXT PRIMARY KEY,
  item_id           TEXT NOT NULL REFERENCES portfolio_items(id) ON DELETE CASCADE,
  reporter_id       TEXT REFERENCES users(id) ON DELETE SET NULL,
  reporter_ip_hash  TEXT NOT NULL,
  reason            TEXT NOT NULL,
  note              TEXT,
  created_at        BIGINT NOT NULL,
  reviewed_at       BIGINT,
  reviewed_by       TEXT REFERENCES users(id) ON DELETE SET NULL
)`;
await sql`CREATE INDEX IF NOT EXISTS portfolio_reports_item_idx     ON portfolio_reports(item_id)`;
await sql`CREATE INDEX IF NOT EXISTS portfolio_reports_pending_idx  ON portfolio_reports(reviewed_at, created_at DESC)`;
await sql`CREATE INDEX IF NOT EXISTS portfolio_reports_ratelimit_idx ON portfolio_reports(item_id, reporter_ip_hash, created_at DESC)`;

const cols = await sql`SELECT table_name, column_name FROM information_schema.columns
  WHERE (table_name='users' AND column_name='instagram_handle')
     OR (table_name='portfolio_items' AND column_name IN ('hidden_at','hidden_by','report_count'))
  ORDER BY table_name, column_name`;
const tables = await sql`SELECT table_name FROM information_schema.tables WHERE table_name='portfolio_reports'`;
console.log('added cols:', cols.map(c => `${c.table_name}.${c.column_name}`).join(', '));
console.log('portfolio_reports present:', tables.length === 1);
