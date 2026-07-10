import { FROM_EMAIL, MAILGUN_API_KEY, MAILGUN_DOMAIN, MAILGUN_BASE_URL } from './config.js';

/**
 * Email TRANSPORT — the single module that knows which vendor sends mail.
 *
 * To switch providers replace ONLY this file's `deliver()` and the env it
 * reads. Nothing else in the codebase references a provider: templates + the
 * fail-safe policy live in email.ts, callers only import template functions.
 *
 * Current vendor: Mailgun (https://mailgun.com). Uses MAILGUN_DOMAIN if set,
 * else MAILGUN_SANDBOX_DOMAIN (see config.ts) — sandbox only delivers to
 * recipients authorized in the Mailgun dashboard.
 */

export interface OutgoingEmail {
  to: string;
  subject: string;
  html: string;
}

export class EmailDeliveryError extends Error {
  status: number;
  vendorCode?: string;
  constructor(status: number, vendorCode?: string) {
    super(`email delivery failed (HTTP ${status}${vendorCode ? ` ${vendorCode}` : ''})`);
    this.status = status;
    this.vendorCode = vendorCode;
  }
}

/** Whether a provider is configured at all (used for a clean "skipped" log). */
export function isConfigured(): boolean {
  return MAILGUN_API_KEY.length > 0 && MAILGUN_DOMAIN.length > 0;
}

/**
 * Send one email. Throws EmailDeliveryError on a real provider failure so the
 * fail-safe wrapper in email.ts can swallow it. Returns silently on success.
 */
export async function deliver(mail: OutgoingEmail): Promise<void> {
  const body = new URLSearchParams({
    from: FROM_EMAIL,
    to: mail.to,
    subject: mail.subject,
    html: mail.html,
  });
  const res = await fetch(`${MAILGUN_BASE_URL}/v3/${MAILGUN_DOMAIN}/messages`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`api:${MAILGUN_API_KEY}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  });
  if (!res.ok) {
    // Read only the vendor error *message* — never the recipient or body.
    const detail = await res.json().catch(() => ({}));
    throw new EmailDeliveryError(res.status, (detail as { message?: string }).message);
  }
}
