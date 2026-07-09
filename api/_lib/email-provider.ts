import { FROM_EMAIL, RESEND_API_KEY } from './config.js';

/**
 * Email TRANSPORT — the single module that knows which vendor sends mail.
 *
 * To switch providers (Postmark, SendGrid, SES, …) replace ONLY this file's
 * `deliver()` and the env it reads. Nothing else in the codebase references a
 * provider: templates + the fail-safe policy live in email.ts, callers only
 * import template functions.
 *
 * Current vendor: Resend (https://resend.com).
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
  return RESEND_API_KEY.length > 0;
}

/**
 * Send one email. Throws EmailDeliveryError on a real provider failure so the
 * fail-safe wrapper in email.ts can swallow it. Returns silently on success.
 */
export async function deliver(mail: OutgoingEmail): Promise<void> {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from: FROM_EMAIL, to: [mail.to], subject: mail.subject, html: mail.html }),
  });
  if (!res.ok) {
    // Read only the vendor error *name* — never the recipient or body.
    const detail = await res.json().catch(() => ({}));
    throw new EmailDeliveryError(res.status, (detail as { name?: string }).name);
  }
}
