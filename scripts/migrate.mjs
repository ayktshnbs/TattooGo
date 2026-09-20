// Ledger-based migration runner — the ONE migration path going forward.
//
//   node scripts/migrate.mjs            apply pending migrations (idempotent)
//   node scripts/migrate.mjs --status   list applied / pending, change nothing
//
// Every migration is additive and idempotent (IF NOT EXISTS / DROP NOT NULL
// guarded), so re-running is safe, and each applied name lands in
// `schema_migrations`. scripts/schema.sql is the fresh-database baseline and
// MUST already contain everything listed here; scripts/init-db.mjs applies the
// baseline and then records these as applied. scripts/schema-check.mjs proves
// baseline and migrated database agree.
//
// The older scripts/migrate-add-*.mjs files are the pre-ledger history; they
// stay runnable but nothing new goes there.
import { neon } from '@neondatabase/serverless';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));

export function loadEnvLocal() {
  try {
    const raw = readFileSync(join(here, '..', '.env.local'), 'utf8');
    for (const line of raw.split('\n')) {
      const m = line.match(/^([A-Z0-9_]+)="?([^"\r\n]*)"?/);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
    }
  } catch { /* no .env.local — rely on real env */ }
}

/** Ordered list. Never edit or reorder an entry that has shipped — add a new one. */
export const MIGRATIONS = [
  {
    name: '2026-09-20-001-audit-log-admin-nullable',
    // M1: admin_audit_log.admin_user_id was NOT NULL + ON DELETE SET NULL, so
    // hard-deleting an admin that had audit rows failed the FK action (500).
    statements: [
      `ALTER TABLE admin_audit_log ALTER COLUMN admin_user_id DROP NOT NULL`,
    ],
  },
  {
    name: '2026-09-20-002-rate-limits',
    statements: [
      `CREATE TABLE IF NOT EXISTS rate_limits (
        key          TEXT PRIMARY KEY,
        count        INTEGER NOT NULL,
        window_start BIGINT NOT NULL
      )`,
    ],
  },
  {
    name: '2026-09-20-003-portfolio-public-idx',
    // L5: declared in schema.sql but never created in production (drift).
    statements: [
      `CREATE INDEX IF NOT EXISTS portfolio_public_idx ON portfolio_items(hidden_at, ts DESC)`,
    ],
  },
  {
    name: '2026-09-20-004-subscriptions-last-event-at',
    // M10: stale/out-of-order webhook deliveries must not overwrite newer state.
    statements: [
      `ALTER TABLE provider_subscriptions ADD COLUMN IF NOT EXISTS last_event_at BIGINT`,
    ],
  },
  {
    name: '2026-09-20-005-portfolio-status-default',
    // L5: live default was still 'pending' from before report-based moderation;
    // schema.sql says 'approved'. Code always sets status explicitly, so this
    // only removes drift.
    statements: [
      `ALTER TABLE portfolio_items ALTER COLUMN status SET DEFAULT 'approved'`,
    ],
  },
  {
    name: '2026-09-21-006-offers-no-self-offer',
    // M2: a multi-mode account could bid on its own brief (→ self-accept →
    // self-review). The API refuses it; this makes the database refuse it too.
    // Guarded so re-running is a no-op.
    statements: [
      `DO $$ BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'offers_no_self_offer') THEN
          ALTER TABLE offers ADD CONSTRAINT offers_no_self_offer CHECK (artist_id <> customer_id);
        END IF;
      END $$`,
    ],
  },
];

/** Apply pending migrations and record them. Returns the names applied. */
export async function runMigrations(sql, { log = console.log } = {}) {
  await sql`CREATE TABLE IF NOT EXISTS schema_migrations (name TEXT PRIMARY KEY, applied_at BIGINT NOT NULL)`;
  const done = new Set((await sql`SELECT name FROM schema_migrations`).map(r => r.name));
  const applied = [];
  for (const m of MIGRATIONS) {
    if (done.has(m.name)) continue;
    for (const stmt of m.statements) await sql.query(stmt);
    await sql`INSERT INTO schema_migrations (name, applied_at) VALUES (${m.name}, ${Date.now()}) ON CONFLICT (name) DO NOTHING`;
    applied.push(m.name);
    log(`applied  ${m.name}`);
  }
  return applied;
}

export async function migrationStatus(sql) {
  const exists = await sql`SELECT 1 FROM information_schema.tables WHERE table_name = 'schema_migrations'`;
  const done = exists.length
    ? new Set((await sql`SELECT name FROM schema_migrations`).map(r => r.name))
    : new Set();
  return MIGRATIONS.map(m => ({ name: m.name, applied: done.has(m.name) }));
}

const isMain = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (isMain) {
  loadEnvLocal();
  const url = process.env.DATABASE_URL;
  if (!url) { console.error('DATABASE_URL is not set (env or .env.local)'); process.exit(1); }
  const sql = neon(url);
  if (process.argv.includes('--status')) {
    for (const s of await migrationStatus(sql)) console.log(`${s.applied ? 'applied' : 'PENDING'}  ${s.name}`);
  } else {
    const applied = await runMigrations(sql);
    console.log(applied.length ? `${applied.length} migration(s) applied` : 'nothing to apply — schema is current');
  }
}
