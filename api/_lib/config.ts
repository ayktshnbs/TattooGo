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

/** Sender for transactional email. `onboarding@resend.dev` works before a
 *  custom domain is verified in Resend; switch via RESEND_FROM_EMAIL. */
export const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? 'TattooGo <onboarding@resend.dev>';

export const RESEND_API_KEY = process.env.RESEND_API_KEY ?? '';
export const DATABASE_URL = process.env.DATABASE_URL ?? '';
