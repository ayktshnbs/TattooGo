#!/usr/bin/env node
/**
 * TattooGo run-skill driver.
 *
 * The dev server itself is started by the Claude Preview MCP via
 * `.claude/launch.json` ("tattoogo-dev" on :5173). This file is the
 * smoke-test driver for the *stopped* case: a headless walk of the
 * app's main URLs using plain `fetch` against the running server.
 *
 * Why not Playwright? The host is Windows + Git Bash; chromium-cli
 * isn't available and Playwright wants ~250 MB of browser to install.
 * The preview MCP already supplies the real browser handle for
 * agent-driven inspection. This driver covers the "is the server
 * serving the routes" smoke layer.
 *
 * Use this when:
 *   - you have started the dev server (npm run dev or preview_start)
 *   - and you want a quick sanity check that every main route returns
 *     200 + sane HTML before you start clicking around.
 *
 * Run:
 *   node .claude/skills/run-tattoogo/driver.mjs                       # smoke all routes
 *   node .claude/skills/run-tattoogo/driver.mjs --path=/studio/offers # one URL
 *   node .claude/skills/run-tattoogo/driver.mjs --build               # production build
 *
 * Why `--path=…` and not a bare `/route`? Git Bash on Windows rewrites
 * leading-slash args to Windows paths (`/foo/bar` →
 * `C:/Program Files/Git/foo/bar`), so a bare slash arg fails. The
 * `--path=` form avoids the rewrite.
 */

import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';

const BASE = process.env.TATTOOGO_BASE ?? 'http://127.0.0.1:5173';

const ROUTES = [
  '/',
  '/how-it-works',
  '/artists',
  '/designs',
  '/categories',
  '/login',
  '/register',
  '/faq',
  '/about',
  '/contact',
  '/terms',
  '/dashboard',
  '/dashboard/create-request',
  '/dashboard/requests',
  '/dashboard/offers',
  '/dashboard/messages',
  '/dashboard/notifications',
  '/dashboard/favorites',
  '/dashboard/appointments',
  '/dashboard/tracking',
  '/dashboard/reviews',
  '/dashboard/profile',
  '/studio',
  '/studio/tattoos',
  '/studio/add-tattoo',
  '/studio/give-offer',
  '/studio/offers',
  '/studio/tracking',
  '/studio/calendar',
  '/studio/campaigns',
  '/studio/artists',
  '/studio/materials',
  '/studio/reviews',
  '/studio/messages',
  '/studio/notifications',
  '/studio/stats',
  '/studio/profile',
];

async function hit(path) {
  const url = `${BASE}${path}`;
  const t0 = Date.now();
  const r = await fetch(url, { redirect: 'manual' });
  const body = await r.text();
  const ms = Date.now() - t0;
  const ok = r.status === 200 && body.includes('<div id="root">');
  return { path, status: r.status, ms, ok, bytes: body.length };
}

async function smoke(paths) {
  let pass = 0;
  for (const p of paths) {
    try {
      const r = await hit(p);
      const tag = r.ok ? 'OK ' : 'BAD';
      console.log(`[${tag}] ${r.status} ${r.ms.toString().padStart(4)}ms ${r.bytes.toString().padStart(6)}B  ${r.path}`);
      if (r.ok) pass++;
    } catch (e) {
      console.log(`[ERR]                 ${p}  →  ${e.message}`);
    }
  }
  console.log(`\nResult: ${pass}/${paths.length} OK`);
  return pass === paths.length ? 0 : 1;
}

function runBuild() {
  return new Promise((resolve) => {
    const cmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';
    const p = spawn(cmd, ['run', 'build'], { stdio: 'inherit' });
    p.on('exit', (code) => resolve(code ?? 1));
  });
}

const arg = process.argv[2];

// Recover the user's intent if Git Bash rewrote a leading-slash arg into
// a fake Windows path: `/studio/offers` → `C:/Program Files/Git/studio/offers`.
// The mangling also affects `--path=/foo` → `--path=C:/.../foo`.
function stripGitBashPrefix(s) {
  if (!s) return s;
  const m = s.match(/^[A-Za-z]:[/\\]Program Files[/\\]Git(.*)$/);
  return m ? m[1].replace(/\\/g, '/') : s;
}
function recoverPath(a) {
  if (!a) return null;
  let v = a;
  if (v.startsWith('--path=')) v = v.slice('--path='.length);
  v = stripGitBashPrefix(v);
  return v.startsWith('/') ? v : null;
}

if (arg === '--build') {
  const code = await runBuild();
  if (code !== 0) process.exit(code);
  if (!existsSync('dist/index.html')) { console.error('dist/index.html missing'); process.exit(1); }
  console.log('Build OK — dist/ produced.');
  process.exit(0);
} else {
  const single = recoverPath(arg);
  process.exit(await smoke(single ? [single] : ROUTES));
}
