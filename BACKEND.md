# TattooGo — Backend

Role-based marketplace backend on **Vercel Serverless Functions**.
Data layer: **Neon/Postgres** (when `DATABASE_URL` is set) with an automatic
fallback to the legacy Blob-JSON collections. **Vercel Blob stores only
files** — portfolio images, request reference photos. Transactional email via
**Mailgun**.

## Architecture

```
Browser (Vite SPA)
   │  same-origin /api/*  (httpOnly session cookie)
   ▼
Vercel Functions (api/*.ts)
   │  api/_lib/auth.ts   — sessions (HMAC cookie, epoch), scrypt passwords
   │  api/_lib/repo.ts   — SINGLE data seam: Postgres primary, Blob fallback
   │  api/_lib/email.ts  — Mailgun, fail-safe (never breaks the action)
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
| `MAILGUN_API_KEY` | for email | Mailgun private API key — without it, emails are skipped (logged), actions still succeed |
| `MAILGUN_DOMAIN` | for email | Verified sending domain (e.g. `mg.yourdomain.com`). Falls back to `MAILGUN_SANDBOX_DOMAIN` if unset |
| `MAILGUN_SANDBOX_DOMAIN` | for testing | Mailgun's sandbox domain — only delivers to recipients added as "Authorized Recipients" in the Mailgun dashboard |
| `MAILGUN_BASE_URL` | optional | `https://api.mailgun.net` (US, default) or `https://api.eu.mailgun.net` (EU) — must match the region the domain was created in |
| `MAILGUN_FROM_EMAIL` | optional | e.g. `TattooGo <mail@yourdomain.com>`; defaults to the sandbox sender |
| `VITE_API_PROXY` | dev only | localhost /api proxy target (defaults to production) |
| *(map)* | none | discovery map uses Leaflet + OpenStreetMap tiles — **no API key required**. `VITE_GOOGLE_MAPS_API_KEY` is removed/ignored. |

## Mailgun setup (one-time)

1. Create an account at mailgun.com → Sending → API Keys → copy the
   **Private API key** → add as `MAILGUN_API_KEY` in Vercel (Production +
   Development).
2. **Sandbox testing (available immediately):** Mailgun provisions a sandbox
   domain like `sandboxXXXX.mailgun.org` — set it as `MAILGUN_SANDBOX_DOMAIN`.
   Sandbox mail **only reaches recipients you've added under Sending →
   Domains → sandbox domain → Authorized Recipients** (each must confirm via
   an email Mailgun sends them). This is for testing only, never production
   traffic.
3. **Production domain:** Sending → Domains → Add New Domain (e.g.
   `mg.yourdomain.com`, a subdomain keeps root-domain DNS untouched). Mailgun
   shows the exact records to add at your DNS provider:
   - **SPF**: TXT on the sending domain — `v=spf1 include:mailgun.org ~all`
   - **DKIM**: TXT record (`mx._domainkey…` or similar, value shown by
     Mailgun, unique per domain)
   - **MX** (only if using Mailgun for inbound routing — not required for
     outbound-only transactional email)
   - **Tracking CNAME** (optional, for open/click tracking): `email.` → the
     value Mailgun shows
4. Once the domain shows **Verified**, set `MAILGUN_DOMAIN` to that domain and
   `MAILGUN_FROM_EMAIL="TattooGo <mail@yourdomain.com>"`, then redeploy.
5. **Region matters:** a domain created under the EU region only works
   against `https://api.eu.mailgun.net`; a US-region domain only works
   against `https://api.mailgun.net`. Using the wrong base URL for the
   domain's region fails with a 401/domain-not-found error. Set
   `MAILGUN_BASE_URL` to match wherever the domain was created.

**Email flows wired:** welcome + verify link (register), fresh verify link
(resend), password reset, new-offer → customer, offer accepted/rejected →
artist, job completed → customer (review invite), new message → recipient.
All sends are post-write and fail-safe: a Mailgun outage can never lose an
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
- **Provider Status:** Customers are always `active`. Artists/studios start as `pending_profile` and are blocked from the marketplace (offers, request board, map, public profile). They activate automatically when mandatory profile fields are complete. Moderation can manually set them to `needs_review` or `suspended`.

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

## Public visibility rules

| Surface | Endpoint | Who can read | What is exposed |
| --- | --- | --- | --- |
| Artist directory | `GET /api/artists` | anyone | name, role, city, styles, bio, rating aggregate (**active** providers only) |
| **Artist public profile** | `GET /api/artists?id=<id>` | anyone | profile summary + rating + review count + **completed-jobs count** + **approved** portfolio only + public reviews. **404 for customer ids or non-active artists** (not enumerable) |
| Public tattoo feed | `GET /api/uploads` | anyone | **approved** portfolio items belonging to **active** artists only |
| Browse designs | `GET /api/uploads` | anyone | same approved feed |

Route: `/artists/:artistId` (public page). Directory cards link to it.

### Map discovery (registered artists/studios only)

`/artists` is a map + list discovery page. **The map and list are driven by
the SAME `GET /api/artists?city=&district=&q=` Postgres result set — they can
never diverge.** Filtering happens in Postgres (indexed on role/city/district).

**Leaflet + OpenStreetMap is the display layer ONLY.** Tiles come from
`tile.openstreetmap.org` (free, no API key). Markers are placed exclusively
from our API response. We do **not** use Google Maps, Google Places, Yandex
organization search, or any external business data — no unregistered business
ever appears. Verified: the production bundle contains **zero** Google
Maps/Places references.

**Env:** none. No map API key exists anywhere (the old
`VITE_GOOGLE_MAPS_API_KEY` is removed and ignored). If a commercial tile
provider is ever adopted, isolate its key behind a single
`VITE_MAP_TILE_URL`-style config in `DiscoveryMap.tsx` — nothing else may
know the provider. If tiles fail to load, markers/attribution still render
and the list below is unaffected. Geocoding is not called — artists save
`latitude`/`longitude` manually in their profile (if geocoding is ever added,
it must be restricted to country TR).

**Turkey-only rules (enforced server-side in `api/_lib/cities.ts`):** `city`
must be one of the **81 official Turkish provinces** — validated on register,
`update-profile`, and the `/api/artists?city=` filter (invalid city → 400,
never a silent pass). Public map coordinates must fall inside approximate
Turkey bounds (lat 35.5–42.5, lng 25.5–45.0) and are only accepted as a
lat+lng pair; anything outside is rejected on save. Frontend dropdowns
(`src/data/cities.ts`) list the same 81 provinces — keep the two lists in
sync.

**Tattoo styles / artist specialties (single source of truth):** the allowed
style taxonomy lives in one place per side — `src/data/styles.ts` (frontend,
with `en`/`tr` labels) and `api/_lib/styles.ts` (backend validation) — kept in
sync by stable slug keys. The **16 styles** are: `old-school`, `new-school`,
`traditional`, `neo-traditional`, `black-work`, `avantgarde`, `color-realism`,
`black-and-grey-realism`, `geometric`, `mandala`, `ornamental`, `dotwork`,
`minimalist`, `fine-line`, `lettering`, `calligraphy`. These describe what an
artist does; they power the profile style selector, the customer request form,
portfolio uploads, and the directory style filter.

*Validation (server-side, arbitrary strings always → 400):*
- **Profile styles** (`update-profile`): every entry must be in the allowed set,
  de-duplicated, **max 5**; provider **activation requires ≥1 valid style**
  (alongside name/city/district/bio/address-label/location-choice).
- **Request style** (`POST /api/requests`): single style, must be in the set.
- **Portfolio style** (`POST /api/uploads`): must be in the set (the old
  server-only `watercolor` value was removed — re-add to both lists if ever
  wanted).
- **Directory filter** (`GET /api/artists?style=`): must be in the set; the
  filter narrows the same Postgres result set the list and map share
  (`style = ANY(u.styles)`), so map and list never diverge.

*Not to be confused with contest categories.* Festival/competition categories
(e.g. "Best of Black & Grey", "Best of Friday", "Best of Show") are a **separate
future taxonomy** — event-scoped, mixing technique/size/day/skill axes — and must
**never** be added to this style list or validated against it. The contest module
is not built yet.

**Location visibility:** a marker/coords appear only when the artist set
`is_public_location = TRUE` **and** saved coordinates. Otherwise only the
approximate city/district label is shown (never exact coords, never a home
address). Customers set no location — the `update-profile` action rejects
location fields from non-artist roles.

Marker click → a card with name, rating, district/city, up to 3 approved
portfolio previews, and a "View profile" button → `/artists/:artistId`.

**Portfolio moderation visibility:** an upload starts `pending` (hidden
everywhere public — feed *and* profile), visible only to its own artist via
`?mine=1`. An admin `approve` makes it appear in both the global feed and the
artist's profile. `reject` deletes the row **and** the Blob image; it never
appears publicly. Empty portfolios render a clean empty state.

**Never exposed on any public surface:** emails, offers, earnings, budgets,
messages, requests, pending/rejected portfolio, dashboard stats, admin/
moderation data. Verified by an automated no-leak scan in the audit.

**Dashboard-only (session + role scoped):** everything under `/api/dashboard`,
`/api/offers`, `/api/requests` (customer's own / artist's board+bids),
`/api/messages`, `/api/notifications`, and `?mine=1` portfolio.

## Data source of truth

**Postgres (Neon)** when `DATABASE_URL` is set — the repo (`api/_lib/repo.ts`)
switches on `usePg = DATABASE_URL.length > 0`, so the Blob-JSON fallback is
inert in production. **Vercel Blob stores only files**: `references/*.jpg`
(request photos) and `uploads/*.jpg` (portfolio). Their URLs live in Postgres.

## Test accounts

None — Postgres and Blob were both wiped after the launch audit. Register
fresh accounts via `/register`.
