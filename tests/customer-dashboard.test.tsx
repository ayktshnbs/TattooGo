import { test } from 'node:test';
import assert from 'node:assert/strict';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { LangProvider } from '../src/i18n/LangContext';
import { DesignCard } from '../src/pages/customer/Feed';
import type { ApiPortfolioItem } from '../src/lib/api';

/**
 * H2 — the customer dashboard used to call `design.likes.toLocaleString()` on
 * rows from GET /api/uploads, which have no `likes`. This is the EXACT shape
 * produced by `mapPortfolio` in api/_lib/repo.ts (what the audit reproduced),
 * including the moderation fields the public feed carries.
 */
const apiRow: ApiPortfolioItem & Record<string, unknown> = {
  id: 'umf1abc2xyz',
  artistId: 'u_artist_1',
  artistName: 'Test Artist',
  title: 'Fine-line fern',
  style: 'fineline',
  tags: ['fern', 'botanical', 'forearm'],
  imageUrl: 'https://example.public.blob.vercel-storage.com/uploads/umf1abc2xyz.jpg',
  imageRatio: 0.8,
  hiddenAt: undefined,
  hiddenBy: undefined,
  reportCount: 0,
  status: 'approved',
  createdAt: '2026-09-18',
  ts: 1789948800000,
};

function render(design: ApiPortfolioItem, compact?: boolean) {
  return renderToStaticMarkup(
    <MemoryRouter>
      <LangProvider>
        <DesignCard design={design} compact={compact} />
      </LangProvider>
    </MemoryRouter>,
  );
}

test('DesignCard renders the real /api/uploads row shape without throwing', () => {
  const html = render(apiRow);
  assert.match(html, /Fine-line fern/);
  assert.match(html, /Test Artist/);
  assert.match(html, /fern · botanical/);           // first two tags
  assert.match(html, /umf1abc2xyz\.jpg/);            // image url used as-is
  assert.doesNotMatch(html, /undefined|NaN|\$/);     // no leaked missing fields
});

test('DesignCard never reads fields the API does not provide', () => {
  // Strip everything optional / moderation-related: the card must still render.
  const minimal = {
    id: 'u2', artistId: 'a2', artistName: 'Minimal', title: 'Blank', style: 'blackwork',
    tags: [], imageUrl: '', imageRatio: 0, status: 'approved', createdAt: '2026-09-01', ts: 1,
  } as ApiPortfolioItem;
  const html = render(minimal, true);
  assert.match(html, /Blank/);
  assert.match(html, /2026-09-01/);   // falls back to the date when there are no tags
  assert.match(html, /class="ph"/);   // placeholder instead of a broken <img>
});

test('DesignCard tolerates a stale cache row with a missing tags array', () => {
  const stale = { ...apiRow, tags: undefined } as unknown as ApiPortfolioItem;
  assert.doesNotThrow(() => render(stale));
});
