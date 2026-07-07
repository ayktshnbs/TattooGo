# TattooGo — Backend

Role-based marketplace backend running on **Vercel Serverless Functions** with
**Vercel Blob** as the datastore. No third-party services required to run.

## Architecture

- `api/_lib/db.ts` — collections (`users`, `requests`, `offers`, `messages`,
  `reviews`) + the portfolio `feed`. Stored as **immutable versioned JSON
  blobs**: every write creates `db/<name>/<sortable-stamp>.json`; reads resolve
  the newest version via `list()`. Fixed-pathname overwrites are avoided on
  purpose — the Blob CDN caches by pathname and served minutes-stale reads.
- `api/_lib/auth.ts` — `scrypt` password hashing (per-user salt) + HMAC-SHA256
  signed session tokens in an `httpOnly; Secure; SameSite=Lax` cookie.
  `AUTH_SECRET` is a Vercel env var.
- Endpoints: `auth`, `requests`, `offers`, `messages`, `reviews`, `artists`
  (public directory), `dashboard` (computed aggregates), `uploads` (moderated
  portfolio). Every read/write is scoped to the session user server-side.

## Authorization model (verified by audit)

| Rule | Enforcement |
| --- | --- |
| Anonymous → protected endpoints | 401 |
| Forged/expired session cookie | 401 (HMAC verify) |
| Customer creates request; artist cannot | role check, 403 |
| Artist sends offer; customer cannot | role check, 403 |
| Accept/reject an offer | owner-of-request only, 403 otherwise |
| Complete a job | owning artist only, 403 otherwise |
| Review | customer + offer they own + status `completed` + one per offer |
| Message | only a customer↔artist pair that shares an offer |
| Read a brief by id | owner always; artist only while `open` or if they bid |
| Publish to portfolio feed | signed-in artist only |

Statistics (`/api/dashboard`, `/api/stats`) are **computed from real rows** —
zero/`null` when there is no data. Nothing is invented.

---

## Production-ready

- **Auth**: scrypt hashing, signed httpOnly session cookies, timing-safe
  comparisons, role redirects, route guards. The *scheme* is sound.
- **Authorization**: every mutation and read is session-scoped and
  role-checked; IDOR attempts (foreign offer completion, cross-user reads,
  cold-spam messaging, reading booked briefs) all rejected in the audit.
- **Business rules**: the request → offer → accept → complete → review
  lifecycle, duplicate-offer and double-review guards, review-after-completion
  gate.
- **Real-data-only UX**: no mock data anywhere; professional empty states on
  every dashboard page; a fresh account is genuinely empty.
- **Input validation**: field types/lengths, price bounds, JPEG magic-byte
  checks, image size caps.

## Prototype-only (must change before real traffic)

1. **Datastore is Blob JSON, not a database.** Every write serialises a whole
   collection. Fine at demo scale; **O(n) per write** and it will not hold up
   past low thousands of rows.
2. **Last-writer-wins concurrency** (see below).
3. **No email verification / password reset / rate-limited login.** Anyone can
   register any email; there is no brute-force lockout on `/api/auth` login.
4. **Portfolio moderation is a shared admin token** (`/moderation`), not real
   admin accounts.
5. **No pagination** — list endpoints return everything.
6. **Notifications are derived on read** from offer state, not a real table;
   there is no unread tracking or push.
7. **`AUTH_SECRET` rotation invalidates all sessions** (no key-id/rotation
   support).

## Where last-writer-wins can bite

Each write does read-modify-write on a whole collection with no locking. If two
writes to the **same collection** interleave, the later `put` wins and the
earlier change is lost. Realistic cases:

- Two artists send an offer on the **same** request within the same ~second →
  one offer can vanish. (Different requests are unaffected only because they
  still share the one `offers` collection — so really *any* two near-simultaneous
  offers race.)
- A customer accepts an offer while an artist sends another on the same
  request → a status change can be lost.

At demo/single-tester traffic this is effectively never hit. It becomes real
the moment you have concurrent users. **The fix is the Postgres migration**, not
a patch to the Blob layer — row-level writes and transactions remove the race
entirely.

## Migration to Postgres + managed auth

The code is deliberately shaped so this is contained. What changes:

**Database (replace `api/_lib/db.ts` only):**
- Create tables mirroring the existing row interfaces: `users`, `requests`,
  `offers`, `messages`, `reviews`, `portfolio_items`. Types already match the
  `*Row` interfaces in `db.ts`.
- Reimplement `readCollection`/`writeCollection` as scoped SQL, or better,
  replace the handful of call sites with real queries
  (`SELECT … WHERE artist_id = $1`) and transactions for accept/complete.
- Add indexes on `customer_id`, `artist_id`, `request_id`, `status`.
- Concurrency and pagination come for free.

**Auth (replace `api/_lib/auth.ts` + `api/auth.ts`):**
- Swap to **Clerk** or **Supabase Auth**. Keep `getSession(req)` /
  `getSessionUser(req)` as the single seam every endpoint already calls — point
  it at the provider's session instead of the HMAC cookie. Endpoints don't
  change.
- This also gives you email verification, password reset, OAuth, and
  brute-force protection — the prototype gaps above.

**Frontend:** none. `src/lib/api.ts`, `AuthContext`, and the guards consume the
same JSON contracts; only `AuthContext.refresh()`/login wiring would point at
the provider if you use its SDK directly.

**Also add at that point:** login rate limiting, real admin accounts for
moderation, and an image content-moderation pass on uploads.
