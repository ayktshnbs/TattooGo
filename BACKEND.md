# TattooGo — Backend

Role-based marketplace backend on **Vercel Serverless Functions**.
Data layer: **Neon/Postgres** (when `DATABASE_URL` is set) with an automatic
fallback to the legacy Blob-JSON collections. **Vercel Blob stores only
files** — portfolio images, request reference photos. Transactional email via
**Resend**.

## Architecture

```
Browser (Vite SPA)
   │  same-origin /api/*  (httpOnly session cookie)
   ▼
Vercel Functions (api/*.ts)
   │  api/_lib/auth.ts   — sessions (HMAC cookie, epoch), scrypt passwords
   │  api/_lib/repo.ts   — SINGLE data seam: Postgres primary, Blob fallback
   │  api/_lib/email.ts  — Resend, fail-safe (never breaks the action)
   │  api/_lib/config.ts — PUBLIC_APP_URL etc. (no hardcoded domains)
   ▼                    ▼
Neon Postgres      Vercel Blob (files only)
(all records)      uploads/*.jpg, references/*.jpg
```

Endpoints: `auth`, `requests`, `offers`, `messages`, `reviews`, `artists`,
`dashboard`, `uploads` (portfolio), `notifications`.

## Environment variables

| Var | Required | Purpose |
| --- | --- | --- |
| `AUTH_SECRET` | yes (set) | HMAC key for session cookies |
| `BLOB_READ_WRITE_TOKEN` | yes (set) | Vercel Blob (files + fallback data) |
| `ADMIN_TOKEN` | yes (set) | /moderation review console |
| `PUBLIC_APP_URL` | yes (set) | Origin used in email links & redirects — **update when the custom domain goes live** |
| `DATABASE_URL` | for Postgres | Neon connection string — flips the repo from Blob fallback to Postgres |
| `RESEND_API_KEY` | for email | Resend API key — without it, emails are skipped (logged), actions still succeed |
| `RESEND_FROM_EMAIL` | optional | e.g. `TattooGo <no-reply@yourdomain.com>`; defaults to `onboarding@resend.dev` (works before domain verification) |
| `VITE_API_PROXY` | dev only | localhost /api proxy target (defaults to production) |

## Resend setup (one-time)

1. Create an account at resend.com → API Keys → create key → add as
   `RESEND_API_KEY` in Vercel (Production + Development).
2. Until you verify a domain you can send from `onboarding@resend.dev`
   (default) — fine for testing, not for real users.
3. Resend → Domains → Add domain (e.g. `yourdomain.com`). Resend shows the
   exact DNS records; add them at your DNS provider:
   - **SPF**: TXT on the send subdomain (e.g. `send.yourdomain.com`) —
     `v=spf1 include:amazonses.com ~all` (value shown by Resend)
   - **DKIM**: 3 CNAME records (`resend._domainkey…`, values shown by Resend)
   - **DMARC** (recommended): TXT at `_dmarc.yourdomain.com` —
     `v=DMARC1; p=none; rua=mailto:you@yourdomain.com` (tighten to
     `p=quarantine` once healthy)
4. After the domain shows **Verified**, set
   `RESEND_FROM_EMAIL="TattooGo <no-reply@yourdomain.com>"` and redeploy.

**Email flows wired:** welcome + verify link (register), fresh verify link
(resend), password reset, new-offer → customer, offer accepted/rejected →
artist, job completed → customer (review invite), new message → recipient.
All sends are post-write and fail-safe: a Resend outage can never lose an
offer/message; failures are logged without secrets or message bodies.

## Custom domain go-live checklist

1. Vercel → Project `tattoo-go` → Settings → **Domains** → add
   `yourdomain.com` (+ `www` if wanted). Vercel shows the DNS records:
   apex `A 76.76.21.21` (or nameservers), `www` → `cname.vercel-dns.com`.
2. Update `PUBLIC_APP_URL=https://yourdomain.com` (Production) → redeploy.
   This fixes email verification/reset links automatically.
3. Nothing else changes: the SPA calls `/api` relatively (no CORS), the
   session cookie is host-only + `Secure; SameSite=Lax` (works on any
   domain), and no app code hardcodes a domain.

## Neon/Postgres

**Status:** the integration install needs a one-time marketplace-terms click
(`https://vercel.com/ayktshnbs-projects/~/integrations/accept-terms/neon`),
then:

```bash
npx vercel integration add neon      # create the database, link to project
npx vercel env pull                  # brings DATABASE_URL into .env.local
npm run db:init                      # applies scripts/schema.sql
npm run db:migrate                   # optional: copies any Blob data over
npx vercel --prod                    # redeploy — repo flips to Postgres
```

Until `DATABASE_URL` exists the repo transparently uses the Blob-JSON
fallback — the site works either way.

**Schema** (`scripts/schema.sql`): `users` (roles, email_verified,
session_epoch, lockout counters), `auth_tokens` (hashed one-time
verify/reset tokens), `requests`, `offers` (unique per request+artist),
`messages`, `reviews` (unique per offer), `portfolio_items`,
`notifications`. Indexed on `customer_id`, `artist_id`, `request_id`,
`status`, `ts` — list endpoints are LIMIT-bounded and ordered by `ts`, so
adding cursor pagination is a WHERE clause away.

**Atomicity:** accept/complete are single data-modifying-CTE statements
(offer + request transition together); reviews are guarded
`INSERT … SELECT` + unique constraint; duplicate offers blocked by
constraint. Ownership and status gates live in the SQL `WHERE`, not just JS.

## Auth

- **Sessions:** HMAC-SHA256-signed `{uid, role, exp, sep}` in an
  `httpOnly; Secure; SameSite=Lax` cookie, 30-day expiry. `sep` is the
  session epoch: a password reset bumps it, instantly invalidating every
  outstanding session. `getSessionUser(req)` is the single seam all
  endpoints use.
- **Passwords:** scrypt, per-user random salt, timing-safe compare.
- **Login rate limiting:** 5 failures → 15-minute lockout (per account);
  correct password during lockout is also refused (429).
- **No enumeration:** login returns one generic error for unknown email and
  wrong password; `request-reset` always answers generic 200. (Registration
  still returns 409 on duplicate email — deliberate UX trade-off, see
  limitations.)
- **Email verification:** register → 24h one-time token (stored hashed) →
  `/verify-email?token=…`. Soft-gate: unverified users can use the app;
  status shows on the profile with a resend button. Hard-gating publish
  actions is a one-line check when wanted.
- **Password reset:** `/forgot-password` → 1h one-time hashed token →
  `/reset-password?token=…` → new password + epoch bump + cookie cleared.
- **Roles:** customer → `/dashboard`, artist/studio → `/studio`, enforced by
  client guards AND server-side scoping on every endpoint.

## What still uses Vercel Blob

Files only (by design): `uploads/<id>.jpg` (portfolio), `references/<id>.jpg`
(request references). Postgres stores the URLs. *(Exception: until
`DATABASE_URL` is set, the fallback also keeps records in versioned Blob
JSON under `db/` and `feed/`.)*

## Known limitations / production risks

- **Blob-fallback mode** (until Neon is connected): last-writer-wins on
  concurrent writes to a collection; O(n) writes. Fixed by the Postgres flip.
- **Registration enumeration:** duplicate email → 409.
- **Email throughput:** every message sends an email — no digesting/
  throttling yet; a chatty thread means many emails.
- **Rate limiting is per-account, not per-IP** (serverless has no shared
  memory; IP-based needs the DB — easy follow-up after the Postgres flip).
- **Moderation** is a single shared admin token, not admin accounts.
- **No pagination UI** — endpoints are LIMIT-bounded (200) and index-backed.
- **HTTP driver:** repo uses single-statement atomicity (CTEs); if a future
  flow needs a multi-statement interactive transaction, switch that call to
  the Neon Pool/WebSocket client.
- **Payments:** deliberately **not implemented**. No payment provider,
  package, API route, or env var exists in the codebase (no Stripe, no
  Creem, no PayTR SDK, no payouts, no commission logic). **PayTR** is the
  chosen provider for a future phase — to be integrated only after a formal
  agreement — and is recorded here as a plan, nothing more.

## Data source of truth

**Postgres (Neon)** when `DATABASE_URL` is set — the repo (`api/_lib/repo.ts`)
switches on `usePg = DATABASE_URL.length > 0`, so the Blob-JSON fallback is
inert in production. **Vercel Blob stores only files**: `references/*.jpg`
(request photos) and `uploads/*.jpg` (portfolio). Their URLs live in Postgres.

## Test accounts

None — Postgres and Blob were both wiped after the launch audit. Register
fresh accounts via `/register`.
