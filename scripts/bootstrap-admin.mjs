// Bootstrap the ONE admin. Runs once (idempotent). No email hardcoded.
//
// Reads ADMIN_EMAIL from env — the user with that email (must already exist,
// be active, and not deactivated) is granted is_admin=true. Refuses to run
// otherwise. There is NO public API to grant admin: this file is the only path.
//
// Usage: ADMIN_EMAIL=you@example.com node scripts/bootstrap-admin.mjs
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
const email = (process.env.ADMIN_EMAIL ?? '').trim().toLowerCase();
if (!url) { console.error('DATABASE_URL not set'); process.exit(1); }
if (!email) { console.error('ADMIN_EMAIL not set — usage: ADMIN_EMAIL=you@example.com node scripts/bootstrap-admin.mjs'); process.exit(1); }

const sql = neon(url);
const rows = await sql`SELECT id, name, deactivated_at, is_admin FROM users WHERE email = ${email} LIMIT 1`;
if (rows.length === 0) { console.error(`no user with email ${email} — sign up first, then re-run.`); process.exit(1); }
const u = rows[0];
if (u.deactivated_at) { console.error(`user ${email} is deactivated — refuse.`); process.exit(1); }
if (u.is_admin) { console.log(`user ${email} is already admin (${u.id}) — nothing to do.`); process.exit(0); }

await sql`UPDATE users SET is_admin = TRUE WHERE id = ${u.id}`;
// Session epoch does NOT need to bump: the frontend polls /api/auth on load,
// and admin gating is server-side anyway.
console.log(`granted admin to ${u.name} <${email}> (${u.id}).`);
