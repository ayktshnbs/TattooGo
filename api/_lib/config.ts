/**
 * Server configuration — every value here is env-driven so the app is
 * custom-domain ready: no URL is hardcoded anywhere in app logic.
 */

/** Public origin used in emails and redirects (no trailing slash).
 *  Reads APP_URL or PUBLIC_APP_URL; empty strings are treated as unset so a
 *  misconfigured env can never produce broken relative links in emails. */
export const APP_URL = (
  process.env.APP_URL || process.env.PUBLIC_APP_URL || 'https://tattoo-go.vercel.app'
).replace(/\/$/, '');

/** Sender for transactional email, e.g. `TattooGo <mail@yourdomain.com>`. */
export const FROM_EMAIL = process.env.MAILGUN_FROM_EMAIL ?? 'TattooGo <mailgun@sandbox.mailgun.org>';

export const MAILGUN_API_KEY = process.env.MAILGUN_API_KEY ?? '';
/** Sending domain. Falls back to the sandbox domain for pre-production
 *  testing — sandbox only delivers to authorized recipients in Mailgun. */
export const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN || process.env.MAILGUN_SANDBOX_DOMAIN || '';
/** Regional API base, e.g. https://api.mailgun.net or https://api.eu.mailgun.net. */
export const MAILGUN_BASE_URL = (process.env.MAILGUN_BASE_URL || 'https://api.mailgun.net').replace(/\/$/, '');

export const DATABASE_URL = process.env.DATABASE_URL ?? '';
