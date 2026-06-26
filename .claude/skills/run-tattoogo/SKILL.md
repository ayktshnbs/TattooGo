---
name: run-tattoogo
description: Build, run, and drive the TattooGo marketplace prototype. Use when asked to start TattooGo, screenshot the hero, smoke-test routes, build for production, or interact with the cursor-reveal landing page or the customer / studio dashboards.
---

TattooGo is a Vite + React + TypeScript prototype of a premium tattoo
marketplace. The home page is a canvas-based cursor-reveal hero: a
clean portrait image sits on top, a tattooed portrait sits underneath,
and a feathered cursor trail erases the top so the tattoos read
through.

There are two paths for driving it:

1. **Preview MCP** — the dev server is wired into `.claude/launch.json`,
   so `preview_start({name: "tattoogo-dev"})` boots it and gives you a
   server id you can pass to `preview_screenshot`, `preview_eval`,
   `preview_click`, etc. **Use this for any UI verification** — the
   hero reveal is canvas-driven and only visible in a browser.
2. **Driver smoke test** — `node .claude/skills/run-tattoogo/driver.mjs`
   walks every public + dashboard route against the running server
   and reports pass/fail. **Use this when you just want a fast "did
   I break a route" sanity check**, or in CI.

All paths below are relative to the project root (the directory
containing `package.json`).

## Prerequisites

Node 18+ and npm. No system packages needed — there are no native
modules and the dev server is plain JS.

```bash
node --version    # confirmed working on v20+
```

## Setup

The lockfile pins `vite@^8.1.0` against `@vitejs/plugin-react@^4.3.1`;
plugin-react 4.x only declares peer support up to Vite 5/6, so npm
errors on install without `--legacy-peer-deps`. The runtime works fine
either way.

```bash
npm install --legacy-peer-deps
```

No env vars are required. There is no backend — all data is mocked in
`src/data/mock.ts`.

## Build

```bash
npm run build
```

Expected output: ~395 kB JS / ~101 kB gzipped, plus the two ~2 MB
portrait PNGs in `dist/assets/portrait-*.png`.

To do a build + check in one shot:

```bash
node .claude/skills/run-tattoogo/driver.mjs --build
```

## Run (agent path)

**Start the server via the preview MCP** — this gives you both a
server id and a browser handle for screenshots / eval / clicks:

```
preview_start({ name: "tattoogo-dev" })
```

If port 5173 is held by a stale Node process, free it first
(`Get-NetTCPConnection -LocalPort 5173 | Select OwningProcess`,
then `Stop-Process -Id <pid> -Force`) and retry. Don't switch to
`autoPort: true` — Vite reads the port from `vite.config.ts`, not
the `PORT` env, so an alternate port has no effect on the server.

**Smoke every route** (server must be running):

```bash
node .claude/skills/run-tattoogo/driver.mjs
```

Pass with `37/37 OK`. Each route should return 200 + an HTML shell
containing `<div id="root">` — the SPA renders client-side, so route
content lives in the React bundle, not the HTML.

**Hit a single URL:**

```bash
# either form works — the driver recovers from Git Bash's leading-slash mangling
node .claude/skills/run-tattoogo/driver.mjs --path=/studio/give-offer
node .claude/skills/run-tattoogo/driver.mjs /studio/give-offer
```

**Drive the hero cursor reveal** — dispatch a synthetic mouse sweep at
the canvas's parent (the React component listens on the wrapping
`div`, not the `canvas`):

```js
// in preview_eval
(async () => {
  const canvas = document.querySelector('canvas');
  const wrap = canvas.parentElement;
  const r = wrap.getBoundingClientRect();
  for (let i = 0; i <= 24; i++) {
    const x = r.left + r.width * (0.30 + 0.40 * (i / 24));
    const y = r.top + r.height * (0.40 + 0.10 * Math.sin(i / 4));
    wrap.dispatchEvent(new MouseEvent('mousemove', { clientX: x, clientY: y, bubbles: true }));
    await new Promise(r => setTimeout(r, 18));
  }
  return 'swept';
})()
```

Screenshot **immediately after** — the mask trail decays over ~1.4 s,
so a delayed shot will show the clean face again, not the revealed
tattoo. If you need a screenshot of the revealed state, screenshot
inside the loop or run a tighter sweep.

**Toggle language** — the EN/TR switcher writes to `localStorage`:

```js
// preview_eval
localStorage.setItem('tg.lang', 'tr'); location.reload();
```

**Stop the server** when done:

```
preview_stop({ serverId: "<id>" })
```

## Run (human path)

```bash
npm run dev      # → vite serves http://127.0.0.1:5173 — Ctrl-C to stop
npm run preview  # → serves dist/ after `npm run build`
```

The hero only works in a real browser — opening `dist/index.html`
directly via `file://` will fail because the JS bundle is an ES module
that needs an HTTP origin.

## Test

There is no test suite in the prototype. The driver smoke test
(`driver.mjs`) is the closest equivalent — it asserts every route
returns 200 + an HTML shell.

## Gotchas

- **Vite 8 + `@vitejs/plugin-react@4` peer conflict.** Use
  `npm install --legacy-peer-deps`. Upgrading plugin-react requires
  switching to `@vitejs/plugin-react-oxc`, which Vite 8 logs as a
  recommendation but does not require.
- **`vite.config.ts` previously had `open: true`** — that exits the
  dev server in headless environments when the browser-open fails.
  It's already removed; don't add it back.
- **Stale HMR error traces in the console.** When you iterate on
  `HeroReveal.tsx`, React logs an "above error occurred in HeroReveal"
  preamble for every intermediate broken state, and those preamble
  lines sit in the console buffer even after a successful reload.
  Look at the URL timestamp (`?t=…`) — old `t` values are dead
  reloads; the current rendering uses the newest `t`. Always
  re-verify with a screenshot, not the buffered console.
- **The hero reveal needs a real `mousemove` event.** Setting the
  cursor position via `eval document.elementFromPoint(...)` does
  nothing — the React component installs an event listener. Use
  `dispatchEvent(new MouseEvent('mousemove', ...))` on the wrap div.
- **The hero canvas is parent-element-driven, not `canvas`-driven.**
  `wrap = canvas.parentElement` — that's the element with the
  `mousemove` listener.
- **Driver returns 1244 B for every route** — that's the SPA HTML
  shell. Route content lives in the React bundle and only appears
  after JS executes; the smoke driver does not assert rendered
  content, only that the route does not 404 / 500.
- **Git Bash on Windows rewrites leading-slash args.** A bare
  `/studio/foo` arg becomes `C:/Program Files/Git/studio/foo` before
  Node sees it. The driver's `recoverPath()` strips the Git prefix
  so both `--path=/x` and `/x` work, but if you add a new CLI flag
  that takes a path, copy the same recovery.
- **Portrait images are ~2 MB each.** The Vite bundler includes them
  with content-hashed filenames (`portrait-clean-XXXX.png` /
  `portrait-tattooed-YYYY.png`). They are inlined in the JS chunk
  graph but served as separate assets. If you swap them, drop the
  replacements into `src/assets/hero/` with the same filenames.
- **Lots of `var(--accent)` references resolve to black** because the
  palette is pure B&W. That's intentional. Don't try to "fix" them
  back to a coloured accent unless the brand changes.

## Troubleshooting

- **`preview_start` errors `port 5173 is in use`** → a stale
  `node.exe` is holding the port (often from a prior `npm run dev`
  that didn't shut down cleanly). Find and kill it:
  ```powershell
  Get-NetTCPConnection -LocalPort 5173 | Select-Object OwningProcess
  Stop-Process -Id <pid> -Force
  ```
  Then re-run `preview_start`.
- **`npm install` fails with `ERESOLVE could not resolve`** →
  re-run with `--legacy-peer-deps`. See Gotchas.
- **Hero is blank / portrait never shows** → check the network tab
  for `/src/assets/hero/portrait-*.png` — both must be 200. If they
  404, the asset folder is missing files; re-copy from
  `~/Downloads/` (originals are
  `Gemini_Generated_Image_p0f1srp0f1srp0f1.png` clean and
  `Gemini_Generated_Image_jh49udjh49udjh49.png` tattooed) into
  `src/assets/hero/portrait-clean.png` and `portrait-tattooed.png`.
- **Cursor reveal screenshot shows the clean face** → you screenshotted
  after the 1.4 s trail decay. Take the screenshot inside the
  mousemove loop, or shorten the sweep to <1 s.
- **`<text>` labels (Turkish) leaking into icons** → the icon
  sanitiser in `src/components/Icon.tsx` strips `<text>` blocks.
  If a new icon ships through with the label visible, add it to
  the regex in `sanitize()`.
