import { APP_URL } from './config.js';
import { deliver, isConfigured, EmailDeliveryError, type OutgoingEmail } from './email-provider.js';

/**
 * Transactional email — templates + fail-safe SENDING POLICY. This module is
 * provider-agnostic: it never names a vendor. The actual transport lives in
 * email-provider.ts (swap that one file to change providers).
 *
 * Every send goes through notify(), which NEVER throws: if no provider is
 * configured the send is skipped with a log line; if delivery errors, the
 * marketplace action that triggered it still succeeds. Errors are logged
 * without recipients, bodies, or secrets.
 */

/** Fire-and-forget wrapper: awaitable, but never throws into the caller. */
export async function notify(mail: OutgoingEmail): Promise<void> {
  if (!isConfigured()) {
    console.log(`email skipped (provider not configured): "${mail.subject}"`);
    return;
  }
  try {
    await deliver(mail);
  } catch (err) {
    if (err instanceof EmailDeliveryError) {
      console.error(`email send failed: HTTP ${err.status} ${err.vendorCode ?? ''} "${mail.subject}"`);
    } else {
      console.error(`email send crashed: "${mail.subject}"`, err instanceof Error ? err.message : '');
    }
  }
}

/* ---------- layout ---------- */

function layout(title: string, bodyHtml: string, cta?: { label: string; url: string }): string {
  return `<!doctype html><html><body style="margin:0;padding:0;background:#f5f5f5;font-family:Georgia,'Times New Roman',serif;color:#111">
  <div style="max-width:520px;margin:0 auto;padding:32px 20px">
    <div style="font-size:22px;letter-spacing:0.5px;margin-bottom:24px" translate="no">Tattoo<i>Go</i></div>
    <div style="background:#ffffff;border:1px solid #e5e5e5;padding:28px">
      <h1 style="font-size:20px;margin:0 0 14px;font-weight:normal">${title}</h1>
      <div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.6;color:#333">${bodyHtml}</div>
      ${cta ? `<a href="${cta.url}" style="display:inline-block;margin-top:20px;padding:12px 22px;background:#000;color:#fff;text-decoration:none;font-family:Arial,sans-serif;font-size:13px;letter-spacing:1px;text-transform:uppercase">${cta.label}</a>` : ''}
    </div>
    <p style="font-family:Arial,sans-serif;font-size:11px;color:#999;margin-top:18px">TattooGo · This is a transactional message about your account.</p>
  </div></body></html>`;
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/* ---------- templates ---------- */

export function welcomeVerifyEmail(to: string, name: string, token: string) {
  return notify({
    to,
    subject: 'Welcome to TattooGo — verify your email',
    html: layout(
      `Welcome, ${esc(name)}.`,
      `<p>Your account is ready. Please confirm this email address so we know it's really you.</p>
       <p>The link is valid for 24 hours.</p>`,
      { label: 'Verify email', url: `${APP_URL}/verify-email?token=${token}` },
    ),
  });
}

export function verifyEmailAgain(to: string, name: string, token: string) {
  return notify({
    to,
    subject: 'Verify your TattooGo email',
    html: layout(
      `Hi ${esc(name)},`,
      `<p>Here is a fresh verification link. It is valid for 24 hours.</p>`,
      { label: 'Verify email', url: `${APP_URL}/verify-email?token=${token}` },
    ),
  });
}

export function passwordResetEmail(to: string, name: string, token: string) {
  return notify({
    to,
    subject: 'Reset your TattooGo password',
    html: layout(
      `Hi ${esc(name)},`,
      `<p>Someone requested a password reset for this account. If it was you, use the button below — the link is valid for 1 hour and can be used once.</p>
       <p>If it wasn't you, ignore this email; your password stays unchanged.</p>`,
      { label: 'Reset password', url: `${APP_URL}/reset-password?token=${token}` },
    ),
  });
}

export function offerReceivedEmail(to: string, customerName: string, artistName: string, requestTitle: string, price: number) {
  return notify({
    to,
    subject: `New offer on “${requestTitle}”`,
    html: layout(
      `Hi ${esc(customerName)},`,
      `<p><strong>${esc(artistName)}</strong> sent an offer of <strong>₺${price.toLocaleString()}</strong> on your request “${esc(requestTitle)}”.</p>`,
      { label: 'View offers', url: `${APP_URL}/dashboard/offers` },
    ),
  });
}

export function offerStatusEmail(to: string, artistName: string, requestTitle: string, status: 'accepted' | 'rejected') {
  return notify({
    to,
    subject: status === 'accepted' ? `Your offer was accepted 🎉` : `Update on “${requestTitle}”`,
    html: layout(
      `Hi ${esc(artistName)},`,
      status === 'accepted'
        ? `<p>Your offer on “${esc(requestTitle)}” was <strong>accepted</strong>. The job is booked — coordinate details with the customer in messages.</p>`
        : `<p>Your offer on “${esc(requestTitle)}” was declined. The brief may still be open to a revised offer from another angle.</p>`,
      { label: 'Open studio panel', url: `${APP_URL}/studio/offers` },
    ),
  });
}

export function jobCompletedEmail(to: string, customerName: string, requestTitle: string) {
  return notify({
    to,
    subject: `“${requestTitle}” is complete — how was it?`,
    html: layout(
      `Hi ${esc(customerName)},`,
      `<p>Your artist marked “${esc(requestTitle)}” as completed. If everything healed as hoped, leave a review — it is the strongest signal other customers have.</p>`,
      { label: 'Leave a review', url: `${APP_URL}/dashboard/reviews` },
    ),
  });
}

export function newMessageEmail(to: string, recipientName: string, senderName: string, preview: string, isArtist: boolean) {
  return notify({
    to,
    subject: `New message from ${senderName}`,
    html: layout(
      `Hi ${esc(recipientName)},`,
      `<p><strong>${esc(senderName)}</strong> wrote:</p><p style="border-left:3px solid #000;padding-left:12px;color:#555">${esc(preview.slice(0, 140))}${preview.length > 140 ? '…' : ''}</p>`,
      { label: 'Reply', url: `${APP_URL}${isArtist ? '/studio/messages' : '/dashboard/messages'}` },
    ),
  });
}
