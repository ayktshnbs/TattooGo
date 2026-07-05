#!/usr/bin/env node
/**
 * Probe both portrait PNGs to confirm A/B alignment.
 *
 * Approach: decode each PNG, walk every scanline, and compute the mean
 * luminance of a horizontal strip across the central 30% of the image
 * (where the face sits). The chin/turtleneck transition is the highest-
 * contrast luminance step in that strip — easy to detect. The top of
 * the head (hair/background transition) is the upper boundary.
 *
 * Once we know both, we can derive the face center and report whether
 * the two source images have their faces at the same y ratio. If
 * they do, runtime cover-fit will align them. If not, we need a
 * per-image draw offset.
 */

import { readFileSync } from 'node:fs';
import { inflateSync } from 'node:zlib';
import { resolve } from 'node:path';

function readU32(buf, off) {
  return (buf[off] << 24) | (buf[off + 1] << 16) | (buf[off + 2] << 8) | buf[off + 3];
}

function parsePng(path) {
  const buf = readFileSync(path);
  if (buf[0] !== 0x89 || buf[1] !== 0x50) throw new Error('not PNG ' + path);
  const width = readU32(buf, 16);
  const height = readU32(buf, 20);
  const bitDepth = buf[24];
  const colorType = buf[25];
  let off = 8;
  const idats = [];
  while (off < buf.length) {
    const len = readU32(buf, off);
    const type = buf.slice(off + 4, off + 8).toString('ascii');
    if (type === 'IDAT') idats.push(buf.slice(off + 8, off + 8 + len));
    if (type === 'IEND') break;
    off += 12 + len;
  }
  const raw = inflateSync(Buffer.concat(idats));
  return { width, height, bitDepth, colorType, raw };
}

function decode({ width, height, bitDepth, colorType, raw }) {
  if (bitDepth !== 8) throw new Error('only 8-bit PNGs');
  const bpp = colorType === 2 ? 3 : colorType === 6 ? 4 : -1;
  if (bpp < 0) throw new Error('unsupported colorType ' + colorType);
  const rowBytes = width * bpp;
  const stride = rowBytes + 1;
  const pixels = new Uint8Array(rowBytes * height);
  const prev = new Uint8Array(rowBytes);
  const curr = new Uint8Array(rowBytes);
  for (let y = 0; y < height; y++) {
    const off = y * stride;
    const filter = raw[off];
    for (let x = 0; x < rowBytes; x++) {
      const left = x >= bpp ? curr[x - bpp] : 0;
      const up = prev[x];
      const upLeft = x >= bpp ? prev[x - bpp] : 0;
      const v = raw[off + 1 + x];
      let recon;
      if (filter === 0) recon = v;
      else if (filter === 1) recon = (v + left) & 0xff;
      else if (filter === 2) recon = (v + up) & 0xff;
      else if (filter === 3) recon = (v + ((left + up) >> 1)) & 0xff;
      else if (filter === 4) {
        const p = left + up - upLeft;
        const pa = Math.abs(p - left);
        const pb = Math.abs(p - up);
        const pc = Math.abs(p - upLeft);
        const pae = pa <= pb && pa <= pc ? left : pb <= pc ? up : upLeft;
        recon = (v + pae) & 0xff;
      } else throw new Error('unknown filter ' + filter);
      curr[x] = recon;
    }
    pixels.set(curr, y * rowBytes);
    prev.set(curr);
  }
  return { width, height, bpp, pixels };
}

/** Mean luminance for the central horizontal strip on each scanline. */
function rowLum({ width, height, bpp, pixels }) {
  const x0 = Math.floor(width * 0.35);
  const x1 = Math.floor(width * 0.65);
  const out = new Float32Array(height);
  for (let y = 0; y < height; y++) {
    let sum = 0;
    for (let x = x0; x < x1; x++) {
      const i = y * width * bpp + x * bpp;
      sum += 0.299 * pixels[i] + 0.587 * pixels[i + 1] + 0.114 * pixels[i + 2];
    }
    out[y] = sum / (x1 - x0);
  }
  return out;
}

/** Find the strongest darkening step (chin->turtleneck transition). */
function chinNeckTransition(lum) {
  // Step = lum[y] - lum[y+window]; positive = bright above, dark below.
  const win = Math.max(8, Math.floor(lum.length * 0.02));
  let best = { y: -1, step: 0 };
  // Restrict to lower 40% of image (chin is in the lower half).
  for (let y = Math.floor(lum.length * 0.4); y < lum.length - win; y++) {
    const step = lum[y] - lum[y + win];
    if (step > best.step) best = { y, step };
  }
  return best;
}

/** Find the strongest brightening step (top of head emerging from background). */
function topOfHead(lum) {
  const win = Math.max(8, Math.floor(lum.length * 0.02));
  // From top, search for first big DROP (background -> hair).
  let best = { y: -1, step: 0 };
  for (let y = 0; y < Math.floor(lum.length * 0.4); y++) {
    const step = lum[y] - lum[y + win];
    if (step > best.step) best = { y, step };
  }
  return best;
}

function audit(path, label) {
  const png = parsePng(path);
  const dec = decode(png);
  const lum = rowLum(dec);
  const head = topOfHead(lum);
  const chin = chinNeckTransition(lum);
  const faceCenterY = (head.y + chin.y) / 2;
  return {
    label, path,
    size: [png.width, png.height],
    aspect: +(png.width / png.height).toFixed(3),
    topOfHead: { y: head.y, ratio: +(head.y / png.height).toFixed(4) },
    chinNeck:  { y: chin.y, ratio: +(chin.y / png.height).toFixed(4) },
    faceCenter: { y: faceCenterY, ratio: +(faceCenterY / png.height).toFixed(4) },
    faceHeightRatio: +((chin.y - head.y) / png.height).toFixed(4),
  };
}

const root = resolve(process.argv[2] ?? '.');
const a = audit(resolve(root, 'src/assets/hero/clean.png'), 'clean');
const b = audit(resolve(root, 'src/assets/hero/tattooed.png'), 'tattooed');

console.log(JSON.stringify({
  clean: a,
  tattooed: b,
  alignment: {
    sizesMatch: a.size[0] === b.size[0] && a.size[1] === b.size[1],
    aspectsMatch: Math.abs(a.aspect - b.aspect) < 0.01,
    faceYRatioDelta: +(b.faceCenter.ratio - a.faceCenter.ratio).toFixed(4),
    faceScaleDelta: +(b.faceHeightRatio - a.faceHeightRatio).toFixed(4),
  },
  recommendation: a.size[0] === b.size[0] && a.size[1] === b.size[1] && Math.abs(b.faceCenter.ratio - a.faceCenter.ratio) < 0.01
    ? 'Aligned — no runtime offset needed.'
    : 'Misaligned — runtime should draw each image with its own faceY anchor, OR images should be re-processed to match.',
}, null, 2));
