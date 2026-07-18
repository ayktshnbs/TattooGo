// Additive migration for the MVP admin panel. Idempotent.
// Adds:
//   users.is_admin        — session-based admin gate
//   reviews.hidden_at     — soft-hide (public reviews exclude hidden_at IS NOT NULL)
//   reviews.hidden_by     — audit ref (admin who hid it)
//   admin_audit_log       — every mutating admin action lands here
// Usage: node scripts/migrate-add-admin.mjs
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

await sql`ALTER TABLE users   ADD COLUMN IF NOT EXISTS is_admin BOOLEAN NOT NULL DEFAULT FALSE`;
await sql`ALTER TABLE reviews ADD COLUMN IF NOT EXISTS hidden_at BIGINT`;
await sql`ALTER TABLE reviews ADD COLUMN IF NOT EXISTS hidden_by TEXT`;

await sql`CREATE TABLE IF NOT EXISTS admin_audit_log (
  id             TEXT PRIMARY KEY,
  admin_user_id  TEXT NOT NULL REFERENCES users(id) ON DELETE SET NULL,
  action         TEXT NOT NULL,
  target_type    TEXT,
  target_id      TEXT,
  previous_value TEXT,   -- small JSON snippet or null
  new_value      TEXT,
  created_at     BIGINT NOT NULL
)`;
await sql`CREATE INDEX IF NOT EXISTS admin_audit_log_admin_idx  ON admin_audit_log(admin_user_id, created_at DESC)`;
await sql`CREATE INDEX IF NOT EXISTS admin_audit_log_target_idx ON admin_audit_log(target_type, target_id, created_at DESC)`;
await sql`CREATE INDEX IF NOT EXISTS admin_audit_log_recent_idx ON admin_audit_log(created_at DESC)`;

const cols = await sql`SELECT table_name, column_name FROM information_schema.columns
  WHERE (table_name='users' AND column_name='is_admin')
     OR (table_name='reviews' AND column_name IN ('hidden_at','hidden_by'))
  ORDER BY table_name, column_name`;
const tables = await sql`SELECT table_name FROM information_schema.tables WHERE table_name='admin_audit_log'`;
console.log('added cols:', cols.map(c => `${c.table_name}.${c.column_name}`).join(', '));
console.log('admin_audit_log present:', tables.length === 1);
