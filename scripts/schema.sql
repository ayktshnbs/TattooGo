-- TattooGo — Neon/Postgres schema
-- Blob JSON collections map 1:1 onto these tables. Vercel Blob keeps only
-- files (portfolio images, request reference photos); all records live here.

CREATE TABLE IF NOT EXISTS users (
  id             TEXT PRIMARY KEY,
  email          TEXT NOT NULL UNIQUE,          -- stored lowercase
  name           TEXT NOT NULL,
  role           TEXT NOT NULL CHECK (role IN ('customer','artist','studio')),
  city           TEXT,
  bio            TEXT,
  styles         TEXT[] DEFAULT '{}',
  pass_hash      TEXT NOT NULL,
  salt           TEXT NOT NULL,
  email_verified BOOLEAN NOT NULL DEFAULT FALSE,
  session_epoch  INTEGER NOT NULL DEFAULT 0,    -- bump to invalidate all sessions
  failed_logins  INTEGER NOT NULL DEFAULT 0,
  lock_until     BIGINT,                        -- ms epoch; login lockout
  created_at     TEXT NOT NULL
);

-- One-time tokens for email verification and password reset (hash only).
CREATE TABLE IF NOT EXISTS auth_tokens (
  token_hash TEXT PRIMARY KEY,
  user_id    TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  kind       TEXT NOT NULL CHECK (kind IN ('verify','reset')),
  expires_at BIGINT NOT NULL,                   -- ms epoch
  used_at    BIGINT
);
CREATE INDEX IF NOT EXISTS auth_tokens_user_idx ON auth_tokens(user_id, kind);

CREATE TABLE IF NOT EXISTS requests (
  id            TEXT PRIMARY KEY,
  customer_id   TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  customer_name TEXT NOT NULL,
  title         TEXT NOT NULL,
  description   TEXT NOT NULL,
  style         TEXT NOT NULL,
  placement     TEXT NOT NULL,
  size          TEXT NOT NULL,
  color         TEXT NOT NULL,
  city          TEXT,
  budget_min    INTEGER,
  budget_max    INTEGER,
  reference_url TEXT,                           -- image file stays in Vercel Blob
  status        TEXT NOT NULL DEFAULT 'open'
                CHECK (status IN ('open','booked','completed','cancelled')),
  created_at    TEXT NOT NULL,
  ts            BIGINT NOT NULL
);
CREATE INDEX IF NOT EXISTS requests_customer_idx ON requests(customer_id, ts DESC);
CREATE INDEX IF NOT EXISTS requests_status_idx   ON requests(status, ts DESC);

CREATE TABLE IF NOT EXISTS offers (
  id            TEXT PRIMARY KEY,
  request_id    TEXT NOT NULL REFERENCES requests(id) ON DELETE CASCADE,
  request_title TEXT NOT NULL,
  artist_id     TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  artist_name   TEXT NOT NULL,
  customer_id   TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  customer_name TEXT NOT NULL,
  price         INTEGER NOT NULL,
  message       TEXT NOT NULL,
  appointment_at TEXT,
  status        TEXT NOT NULL DEFAULT 'sent'
                CHECK (status IN ('sent','accepted','rejected','completed')),
  created_at    TEXT NOT NULL,
  ts            BIGINT NOT NULL,
  UNIQUE (request_id, artist_id)                -- one offer per artist per brief
);
CREATE INDEX IF NOT EXISTS offers_artist_idx   ON offers(artist_id, ts DESC);
CREATE INDEX IF NOT EXISTS offers_customer_idx ON offers(customer_id, ts DESC);

CREATE TABLE IF NOT EXISTS messages (
  id        TEXT PRIMARY KEY,
  thread_id TEXT NOT NULL,                      -- sorted "userA:userB" pair
  from_id   TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  from_name TEXT NOT NULL,
  to_id     TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  text      TEXT NOT NULL,
  ts        BIGINT NOT NULL
);
CREATE INDEX IF NOT EXISTS messages_thread_idx ON messages(thread_id, ts);
CREATE INDEX IF NOT EXISTS messages_to_idx     ON messages(to_id, ts DESC);
CREATE INDEX IF NOT EXISTS messages_from_idx   ON messages(from_id, ts DESC);

CREATE TABLE IF NOT EXISTS reviews (
  id            TEXT PRIMARY KEY,
  offer_id      TEXT NOT NULL UNIQUE REFERENCES offers(id) ON DELETE CASCADE,
  request_title TEXT NOT NULL,
  artist_id     TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  customer_id   TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  customer_name TEXT NOT NULL,
  rating        INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  text          TEXT NOT NULL,
  created_at    TEXT NOT NULL,
  ts            BIGINT NOT NULL
);
CREATE INDEX IF NOT EXISTS reviews_artist_idx ON reviews(artist_id, ts DESC);

-- Portfolio records; image files stay in Vercel Blob (image_url).
CREATE TABLE IF NOT EXISTS portfolio_items (
  id          TEXT PRIMARY KEY,
  artist_id   TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  artist_name TEXT NOT NULL,
  title       TEXT NOT NULL,
  style       TEXT NOT NULL,
  tags        TEXT[] DEFAULT '{}',
  image_url   TEXT NOT NULL,
  image_ratio REAL NOT NULL DEFAULT 1,
  status      TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','approved')),
  created_at  TEXT NOT NULL,
  ts          BIGINT NOT NULL
);
CREATE INDEX IF NOT EXISTS portfolio_artist_idx ON portfolio_items(artist_id, ts DESC);
CREATE INDEX IF NOT EXISTS portfolio_status_idx ON portfolio_items(status, ts DESC);

CREATE TABLE IF NOT EXISTS notifications (
  id         TEXT PRIMARY KEY,
  user_id    TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  kind       TEXT NOT NULL,                     -- offer|accepted|rejected|completed|message
  title      TEXT NOT NULL,
  body       TEXT NOT NULL,
  read       BOOLEAN NOT NULL DEFAULT FALSE,
  ts         BIGINT NOT NULL
);
CREATE INDEX IF NOT EXISTS notifications_user_idx ON notifications(user_id, ts DESC);
