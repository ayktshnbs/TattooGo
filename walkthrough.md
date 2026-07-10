# TattooGo — Product Walkthrough

A plain-language guide to how the platform works today. No technical
knowledge needed. (Technical details live in `BACKEND.md`.)

---

## 1. Signing up

Registration asks for only four things, for everyone:

- **Name** (or studio name)
- **Email**
- **Password** (at least 8 characters)
- **Account type**: Customer, Artist, or Studio

That's it — no city, bio, or location questions at sign-up. A welcome email
with a verification link is sent after registering.

### Customers
A customer account is **active immediately**. Right after signing up a
customer can browse artists and designs, create tattoo requests, receive and
accept offers, message artists, and leave reviews after a completed job.

### Artists & studios
An artist/studio account starts in **`pending_profile`** status. This is
deliberate: it keeps the public directory and map trustworthy — nobody
appears to customers with an empty, anonymous profile, and nobody can send
offers before telling customers who and where they are.

---

## 2. Becoming an active artist/studio

After signing up, the artist opens **Studio panel → My profile**. A banner
explains the profile is incomplete. The **Edit profile** form asks for:

| Field | Required to activate |
| --- | --- |
| Name / studio name | yes |
| Short bio | yes |
| Primary style (specialty) | yes |
| City — one of the 81 Turkish provinces (dropdown) | yes |
| District | yes |
| Public address label (e.g. "Karaköy, near the tunnel") | yes |
| "Show on discovery map" choice | yes (on **or** off — a choice must exist) |
| Latitude / longitude | only if "Show on map" is **on** — and they must fall inside Turkey |

When the artist saves a complete profile, the system checks it
**automatically** — there is no waiting queue. If everything required is
present (and coordinates are valid Turkish coordinates when the map toggle
is on), the account flips to **`active`** on the spot. If something is
missing, it simply stays `pending_profile` and the banner explains what to
complete.

### The four provider statuses

- **`pending_profile`** — new artist/studio, profile not complete yet.
  Can log in, edit the profile, and upload portfolio work for moderation —
  but is invisible to customers and cannot use the marketplace.
- **`active`** — profile complete. Full marketplace access and public
  visibility.
- **`needs_review`** — set manually by moderation when something needs a
  human look. The artist sees an "under review" banner; completing the form
  again does **not** self-activate the account — only moderation can.
- **`suspended`** — set manually by moderation. The artist sees a
  "suspended, contact support" banner and cannot re-activate themselves.

### What a pending (non-active) artist CANNOT do

- Cannot see the request board (customer briefs)
- Cannot open a request's details (unless they already had an offer on it
  from before — existing engagements are never orphaned)
- Cannot send offers
- Does not appear in the public artist directory
- Does not appear on the discovery map
- Their public profile page returns "not found"
- Their portfolio items do not appear in the public feed/designs pages —
  even items already approved by moderation

### What an active artist CAN do

- Browse the request board and open briefs
- Send offers with a price, message, and appointment time
- Message customers, complete booked jobs, collect reviews
- Appear in the directory, on the map (if they opted in), on their public
  profile page, and in the public designs feed (approved items only)

---

## 3. Turkey-only rules

The platform serves Turkey exclusively:

- **City** is always chosen from a dropdown of the **81 official Turkish
  provinces** — in registration-free profile editing, in discovery filters,
  and in tattoo requests. Foreign or made-up cities are rejected by the
  server too, so this cannot be bypassed with technical tricks.
- **Map coordinates** must fall inside Turkey (roughly latitude 35.5–42.5,
  longitude 25.5–45.0). Coordinates outside Turkey are rejected on save.
- The map itself opens centered on Turkey.

---

## 4. Discovery: directory, map, and public profiles

The **Artists** page (`/artists`) shows a map and a list, filtered by name,
city, and district. Both are fed by the **same database query** over
registered TattooGo accounts, so they can never disagree.

- The map uses **OpenStreetMap (Leaflet)** — free, no API key, no Google.
- Markers show **only registered, active TattooGo artists/studios** that
  turned on "Show on map". No businesses are ever pulled from Google,
  Yandex, or any external source.
- Clicking a marker opens a small card (name, rating, city/district,
  portfolio previews) with a **View profile** link to the artist's public
  page.
- An artist who keeps "Show on map" **off** still appears in the list with
  just their city/district text — their exact location and address are
  never shown. Home addresses are never collected.
- If no one matches the filters, the page says
  **"Bu şehirde kayıtlı stüdyo bulunamadı."** — it is never padded with
  fake or external results.

**Portfolio visibility:** an uploaded work appears publicly only when BOTH
are true: a moderator approved it, **and** its artist is currently active.
Pending, rejected, and inactive-artist items stay hidden everywhere public.

---

## 5. The marketplace flow (after activation)

1. **Customer** posts a tattoo request (style, placement, size, budget,
   optional reference photo).
2. **Active artists** see it on their request board and send offers.
3. The **customer** reviews offers and accepts one (others are closed);
   the job is booked and the two sides can message each other.
4. The **artist** marks the job completed after the session.
5. The **customer** leaves a rating and review, which appears on the
   artist's public profile and feeds their directory rating.

Private things stay private throughout: emails, earnings, offers, messages
and requests are visible only to their participants — verified by security
audits after every change.

---

## 6. What's still needed before full launch

- **Mailgun sending domain** — transactional email currently runs on the
  Mailgun *sandbox* domain, which only delivers to manually authorized
  recipient addresses. Before launch, verify a real domain in Mailgun (DNS
  records: SPF + DKIM), then set `MAILGUN_DOMAIN` and `MAILGUN_FROM_EMAIL`.
  Details in `BACKEND.md`.
- **Custom domain** — the app runs on `tattoo-go.vercel.app`; when the real
  domain is connected, update `PUBLIC_APP_URL` (checklist in `BACKEND.md`).
- **Map**: nothing — OpenStreetMap needs no key and costs nothing.
- **Payments**: intentionally not implemented (PayTR is a future plan).
  Money changes hands outside the platform for now.
- **Moderation**: portfolio approval and provider status changes
  (`needs_review` / `suspended`) are done through the admin console with
  the admin token.
