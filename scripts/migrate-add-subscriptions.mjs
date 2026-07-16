// Additive migration: premium subscriptions + webhook idempotency ledger.
// Idempotent (IF NOT EXISTS). Usage: node scripts/migrate-add-subscriptions.mjs
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

await sql`CREATE TABLE IF NOT EXISTS provider_subscriptions (
  id                       TEXT PRIMARY KEY,
  user_id                  TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  provider                 TEXT NOT NULL DEFAULT 'creem',
  provider_customer_id     TEXT,
  provider_subscription_id TEXT UNIQUE,
  status                   TEXT NOT NULL DEFAULT 'none'
                           CHECK (status IN ('none','trialing','active','past_due','canceled','expired')),
  current_period_start     BIGINT,
  current_period_end       BIGINT,
  cancel_at_period_end     BOOLEAN NOT NULL DEFAULT FALSE,
  created_at               BIGINT NOT NULL,
  updated_at               BIGINT NOT NULL,
  UNIQUE (user_id, provider)
)`;
await sql`CREATE INDEX IF NOT EXISTS provider_subs_user_idx ON provider_subscriptions(user_id)`;

await sql`CREATE TABLE IF NOT EXISTS webhook_events (
  event_id    TEXT PRIMARY KEY,
  provider    TEXT NOT NULL DEFAULT 'creem',
  received_at BIGINT NOT NULL
)`;

const tables = await sql`SELECT table_name FROM information_schema.tables WHERE table_name IN ('provider_subscriptions','webhook_events') ORDER BY table_name`;
console.log('subscription tables present:', tables.map(t => t.table_name).join(', '));
