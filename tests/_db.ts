import { readFileSync } from 'node:fs';
import { randomBytes } from 'node:crypto';
import { neon } from '@neondatabase/serverless';

/**
 * Shared harness for the database-backed tests.
 *
 * These run ONLY with RUN_DB_TESTS=1 (they need DATABASE_URL — read from the
 * environment or .env.local) and hit the real Postgres the app uses, so every
 * row they create is tagged with the `tgtest+…@tattoogo.test` email domain or
 * a `tgtest` id prefix and removed again in `after()`. Real users are never
 * touched: cleanup is scoped to those markers, never to a table.
 */
export function loadEnvLocal(): void {
  try {
    const raw = readFileSync(new URL('../.env.local', import.meta.url), 'utf8');
    for (const line of raw.split('\n')) {
      const m = line.match(/^([A-Z0-9_]+)="?([^"\r\n]*)"?/);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
    }
  } catch { /* rely on the real environment */ }
}
loadEnvLocal();

export const DB_TESTS = process.env.RUN_DB_TESTS === '1' && !!process.env.DATABASE_URL;
export const skipReason = DB_TESTS ? undefined : 'set RUN_DB_TESTS=1 (and DATABASE_URL) to run database tests';

export const sql = DB_TESTS ? neon(process.env.DATABASE_URL!) : (null as unknown as ReturnType<typeof neon>);

export const TEST_EMAIL_DOMAIN = 'tattoogo.test';
const run = randomBytes(3).toString('hex');
export const uniq = (label: string) => `tgtest${run}${label}`;
export const testEmail = (label: string) => `tgtest+${run}${label}@${TEST_EMAIL_DOMAIN}`;

/** Remove everything this run created. FK cascades take requests / offers /
 *  messages / reviews / portfolio / reports / subscriptions with the users. */
export async function cleanup(): Promise<void> {
  if (!DB_TESTS) return;
  const like = `tgtest+${run}%@${TEST_EMAIL_DOMAIN}`;
  const idLike = `tgtest${run}%`;   // soft-deactivated test users get a tombstone email — match by id too
  await sql`DELETE FROM admin_audit_log WHERE admin_user_id LIKE ${idLike} OR target_id LIKE ${idLike}`;
  await sql`DELETE FROM webhook_events WHERE event_id LIKE ${'tgtest' + run + '%'}`;
  await sql`DELETE FROM rate_limits WHERE key LIKE ${'test:' + run + '%'}`;
  await sql`DELETE FROM users WHERE email LIKE ${like} OR id LIKE ${idLike}`;
}

/** Insert a minimal user row straight into Postgres (no email, no session). */
export async function makeUser(label: string, opts: { providerType?: 'artist' | 'studio'; providerStatus?: string } = {}): Promise<string> {
  const id = uniq(label);
  await sql`INSERT INTO users (id, email, name, role, pass_hash, salt, email_verified, session_epoch, failed_logins, created_at, provider_type, provider_status)
    VALUES (${id}, ${testEmail(label)}, ${'Test ' + label}, 'customer', 'x', 'x', TRUE, 0, 0, '2026-09-20',
            ${opts.providerType ?? null}, ${opts.providerStatus ?? null})`;
  return id;
}

export async function makeRequest(customerId: string, label: string): Promise<string> {
  const id = uniq('req' + label);
  await sql`INSERT INTO requests (id, customer_id, customer_name, title, description, style, placement, size, color, status, created_at, ts)
    VALUES (${id}, ${customerId}, 'Test customer', ${'Brief ' + label}, 'desc', 'blackwork', 'forearm', 'md', 'black', 'open', '2026-09-20', ${Date.now()})`;
  return id;
}
