// Prove "fresh init" == "migrated production" for the schema.
//
//   node scripts/schema-check.mjs
//
// Builds scripts/schema.sql into a throwaway Postgres schema (tg_schema_check)
// inside ONE transaction on the same database, compares its columns / nullability /
// defaults / indexes / constraints against the live `public` schema, then drops
// the throwaway schema. Production tables are never touched. Exit code 1 on drift.
import { neon } from '@neondatabase/serverless';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { loadEnvLocal } from './migrate.mjs';

const here = dirname(fileURLToPath(import.meta.url));
loadEnvLocal();
const url = process.env.DATABASE_URL;
if (!url) { console.error('DATABASE_URL is not set (env or .env.local)'); process.exit(1); }
const sql = neon(url);

const TMP = 'tg_schema_check';
const statements = readFileSync(join(here, 'schema.sql'), 'utf8')
  .split('\n').map(l => l.replace(/--.*$/, '')).join('\n')
  .split(';').map(s => s.trim()).filter(Boolean);

// Everything runs in one transaction so SET LOCAL search_path applies to all
// of it; unqualified names (incl. REFERENCES users(id)) resolve into TMP.
await sql.query(`DROP SCHEMA IF EXISTS ${TMP} CASCADE`);
await sql.transaction([
  sql.query(`CREATE SCHEMA ${TMP}`),
  sql.query(`SET LOCAL search_path TO ${TMP}`),
  ...statements.map(s => sql.query(s)),
]);

async function snapshot(schema) {
  const cols = await sql`SELECT table_name, column_name, data_type, is_nullable, column_default, udt_name
    FROM information_schema.columns WHERE table_schema = ${schema}
    ORDER BY table_name, column_name`;
  const idx = await sql`SELECT tablename, indexname, regexp_replace(indexdef, '\\m' || ${schema} || '\\.', '', 'g') AS def
    FROM pg_indexes WHERE schemaname = ${schema} ORDER BY tablename, indexname`;
  const cons = await sql`SELECT c.conrelid::regclass::text AS tbl, c.conname, c.contype,
      regexp_replace(pg_get_constraintdef(c.oid), '\\m' || ${schema} || '\\.', '', 'g') AS def
    FROM pg_constraint c JOIN pg_namespace n ON n.oid = c.connamespace
    WHERE n.nspname = ${schema} ORDER BY 1, 2`;
  const strip = v => v == null ? null : String(v).replace(new RegExp(`\\b${schema}\\.`, 'g'), '');
  return {
    columns: cols.map(c => `${c.table_name}.${c.column_name}: ${c.udt_name} null=${c.is_nullable} default=${strip(c.column_default) ?? '∅'}`),
    indexes: idx.map(i => `${i.tablename}: ${i.def}`),
    constraints: cons.map(c => `${strip(c.tbl)} ${c.contype} ${c.conname}: ${c.def}`),
  };
}

let drift = 0;
try {
  const live = await snapshot('public');
  const fresh = await snapshot(TMP);
  for (const kind of ['columns', 'indexes', 'constraints']) {
    const a = new Set(fresh[kind]);
    const b = new Set(live[kind]);
    for (const x of a) if (!b.has(x)) { drift++; console.log(`only in FRESH (${kind}): ${x}`); }
    for (const x of b) if (!a.has(x)) { drift++; console.log(`only in LIVE  (${kind}): ${x}`); }
  }
} finally {
  await sql.query(`DROP SCHEMA IF EXISTS ${TMP} CASCADE`);
}

if (drift) { console.log(`\n${drift} difference(s) — schema drift`); process.exit(1); }
console.log('schema parity OK — fresh schema.sql and live database agree');
