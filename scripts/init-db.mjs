// Initialize the Neon/Postgres schema.
// Usage: DATABASE_URL=... node scripts/init-db.mjs   (or reads .env.local)
import { neon } from '@neondatabase/serverless';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));

function loadEnvLocal() {
  try {
    const raw = readFileSync(join(here, '..', '.env.local'), 'utf8');
    for (const line of raw.split('\n')) {
      const m = line.match(/^([A-Z0-9_]+)="?([^"\r\n]*)"?/);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
    }
  } catch { /* no .env.local — rely on real env */ }
}
loadEnvLocal();

const url = process.env.DATABASE_URL;
if (!url) {
  console.error('DATABASE_URL is not set (env or .env.local)');
  process.exit(1);
}

const sql = neon(url);
const schema = readFileSync(join(here, 'schema.sql'), 'utf8');
const statements = schema
  .split(/;\s*\n/)
  .map(s => s.trim())
  .filter(s => s.length > 0 && !s.startsWith('--'));

for (const stmt of statements) {
  await sql.query(stmt);
}
console.log(`schema applied — ${statements.length} statements OK`);

const tables = await sql`SELECT tablename FROM pg_tables WHERE schemaname = 'public' ORDER BY tablename`;
console.log('tables:', tables.map(t => t.tablename).join(', '));
