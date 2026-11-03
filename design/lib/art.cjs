/**
 * Shared drawing helpers for the print, album and NFT scripts.
 * Art comes only from the official sheets (design/sheets) and their crops (public/images/characters);
 * everything else (frames, emblems, planets, text) is drawn here as SVG and rendered with sharp.
 */
const path = require('path');
const sharp = require('sharp');

const root = path.resolve(__dirname, '..', '..');
const SHEETS = path.join(root, 'design', 'sheets');
const CROPS = path.join(root, 'public', 'images', 'characters');

const FONT = 'Inter, "Segoe UI", Helvetica, Arial, sans-serif';
const HEAVY = 'Impact, "Arial Black", Helvetica, sans-serif';
const MONO = '"IBM Plex Mono", Consolas, "Courier New", monospace';

// Palettes follow src/data/factions.ts; `bg` is the dark ground, `ink` the light text colour.
const PALETTE = {
  grays: { primary: '#A7ADB5', bg: '#15171b', deep: '#24272D', ink: '#E7E9EC' },
  nordics: { primary: '#B8D9F2', bg: '#0d1a30', deep: '#13325f', ink: '#F4F6F8' },
  reptilians: { primary: '#8ea35a', bg: '#1c0907', deep: '#4a140e', ink: '#D7A64B' },
  mantis: { primary: '#93b360', bg: '#0c120a', deep: '#16220f', ink: '#cfe0b0' },
  resistance: { primary: '#e58a52', bg: '#141210', deep: '#2b2620', ink: '#f5f5f7' },
  census: { primary: '#c9b27a', bg: '#101014', deep: '#1d1d24', ink: '#f2ede0' },
  gold: { primary: '#e4c26b', bg: '#14110a', deep: '#2a2312', ink: '#fff3cf' },
};

// Race emblems, same drawing as src/components/art/Emblem.tsx (100×100 box, stroke in currentColor).
const EMBLEM = {
  grays:
    '<circle cx="50" cy="50" r="42"/><circle cx="50" cy="50" r="32" stroke-width="3" stroke-dasharray="4 6"/>' +
    '<path d="M24 52 C34 32 66 32 76 52 C66 66 34 66 24 52 Z" fill="currentColor" stroke="none"/>' +
    '<path d="M28 46 L72 46" stroke-width="5" stroke="#0b0d10"/>',
  nordics:
    [0, 60, 120, 180, 240, 300]
      .map((r) => `<ellipse cx="50" cy="26" rx="10" ry="18" transform="rotate(${r} 50 50)" stroke-width="4"/>`)
      .join('') + '<circle cx="50" cy="50" r="9" fill="currentColor" stroke="none"/>',
  reptilians:
    '<path d="M14 70 L18 26 L36 44 L50 16 L64 44 L82 26 L86 70 Z"/>' +
    '<path d="M50 52 C58 62 60 70 50 76 C40 70 42 62 50 52 Z" fill="currentColor" stroke="none"/><path d="M14 84 L86 84"/>',
  mantis:
    '<path d="M50 90 L12 22 L88 22 Z"/><path d="M24 30 L44 30 L40 48 Z M76 30 L56 30 L60 48 Z" fill="currentColor" stroke="none"/>' +
    '<path d="M34 62 L50 72 L66 62" stroke-width="5"/>',
  // Resistance: raised fist in a diamond, as on the official sheet's badge (simplified).
  resistance:
    '<path d="M50 5 L95 50 L50 95 L5 50 Z"/>' +
    '<g fill="currentColor" stroke="none"><rect x="33" y="29" width="8" height="16" rx="4"/><rect x="42" y="26" width="8" height="19" rx="4"/>' +
    '<rect x="51" y="27" width="8" height="18" rx="4"/><rect x="60" y="30" width="8" height="15" rx="4"/>' +
    '<rect x="33" y="40" width="35" height="22" rx="6"/><rect x="39" y="60" width="23" height="16" rx="3"/></g>' +
    '<path d="M33 50 L44 50" stroke="#0b0d10" stroke-width="3"/>',
};

function emblem(kind, x, y, size, color, opacity = 1) {
  return `<svg x="${x}" y="${y}" width="${size}" height="${size}" viewBox="0 0 100 100" fill="none" stroke="${color}" color="${color}" stroke-width="6" stroke-linejoin="round" stroke-linecap="round" opacity="${opacity}">${EMBLEM[kind]}</svg>`;
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Greedy word wrap by character count (good enough for the fixed fonts we use). */
function wrap(str, max) {
  const lines = [];
  for (const para of String(str).split('\n')) {
    let line = '';
    for (const word of para.split(/\s+/).filter(Boolean)) {
      if (line && (line + ' ' + word).length > max) {
        lines.push(line);
        line = word;
      } else line = line ? line + ' ' + word : word;
    }
    lines.push(line);
  }
  return lines;
}

/**
 * Text block. opts: anchor (start|middle|end), weight, family (FONT|HEAVY|MONO), max (chars per line),
 * lh (line height factor), spacing (letter-spacing factor), italic, opacity.
 * Returns { svg, height } so callers can stack blocks.
 */
function text(x, y, size, fill, str, opts = {}) {
  const lines = opts.max ? wrap(str, opts.max) : String(str).split('\n');
  const lh = size * (opts.lh || 1.22);
  const ls = opts.spacing ? ` letter-spacing="${(size * opts.spacing).toFixed(1)}"` : '';
  const spans = lines.map((l, i) => `<tspan x="${x}" dy="${i === 0 ? 0 : lh}">${esc(l)}</tspan>`).join('');
  const svg =
    `<text x="${x}" y="${y}" font-family='${opts.family || FONT}' font-size="${size}" fill="${fill}" ` +
    `text-anchor="${opts.anchor || 'middle'}" font-weight="${opts.weight || 700}"${ls}` +
    `${opts.italic ? ' font-style="italic"' : ''}${opts.opacity ? ` opacity="${opts.opacity}"` : ''}>${spans}</text>`;
  return { svg, height: lh * lines.length, lines: lines.length };
}

// 'dora-face.jpg' → design/sheets; 'dora-3d-2' → public/images/characters/dora-3d-2.webp
const sourceFile = (src) => (src.endsWith('.jpg') ? path.join(SHEETS, src) : path.join(CROPS, `${src}.webp`));

/**
 * Loads an official image and returns a JPEG buffer of w×h.
 * crop: { cx, cy, w } in fractions of the source (height follows the target aspect), or undefined for "cover".
 * fit 'contain' places the whole image over a blurred, darkened copy of itself (for full-body views).
 */
async function photo(src, w, h, { crop, fit = 'cover', position = 'top' } = {}) {
  let img = sharp(sourceFile(src));
  if (crop) {
    const m = await img.metadata();
    const cw = Math.min(m.width, Math.round(m.width * crop.w));
    const ch = Math.min(m.height, Math.round((cw * h) / w));
    const left = Math.max(0, Math.min(m.width - cw, Math.round(m.width * crop.cx - cw / 2)));
    const top = Math.max(0, Math.min(m.height - ch, Math.round(m.height * crop.cy - ch / 2)));
    img = sharp(await img.extract({ left, top, width: cw, height: ch }).toBuffer());
  }
  if (fit === 'contain') {
    const base = await img.toBuffer();
    const back = await sharp(base).resize(w, h, { fit: 'cover' }).blur(28).modulate({ brightness: 0.45 }).toBuffer();
    const front = await sharp(base).resize(w, h, { fit: 'inside', kernel: 'lanczos3' }).toBuffer();
    const fm = await sharp(front).metadata();
    return sharp(back)
      .composite([{ input: front, left: Math.round((w - fm.width) / 2), top: Math.round((h - fm.height) / 2) }])
      .jpeg({ quality: 92 })
      .toBuffer();
  }
  return img.resize(w, h, { fit: 'cover', position, kernel: 'lanczos3' }).jpeg({ quality: 92 }).toBuffer();
}

const dataUri = (buf, mime = 'image/jpeg') => `data:${mime};base64,${buf.toString('base64')}`;

function image(buf, x, y, w, h, extra = '') {
  return `<image href="${dataUri(buf)}" x="${x}" y="${y}" width="${w}" height="${h}" preserveAspectRatio="xMidYMid slice" ${extra}/>`;
}

// Planets are drawn, never photographed: gradient sphere, bands, optional ring.
const PLANETS = {
  hevra: { a: '#d8d2c2', b: '#6f6758', band: '#a69b84', ring: false },
  'maia-prime': { a: '#e9f4ff', b: '#3a6fb0', band: '#b8d9f2', ring: true },
  thaxis: { a: '#e8b46a', b: '#5a1f12', band: '#b5652f', ring: false },
  xhalen: { a: '#cfe0b0', b: '#1d2f12', band: '#6f8f3e', ring: true },
  terra: { a: '#9fd3ff', b: '#0d2f66', band: '#3f8f4a', ring: false, land: true },
};
function planet(id, cx, cy, r) {
  const p = PLANETS[id];
  const gid = `pg-${id}-${Math.round(cx)}-${Math.round(cy)}`;
  let bands;
  if (p.land) {
    bands = [
      [-0.35, -0.2, 0.42, 0.26, 20],
      [0.25, 0.1, 0.3, 0.45, -15],
      [-0.1, 0.45, 0.35, 0.16, 5],
    ]
      .map(([dx, dy, rx, ry, rot]) => {
        const x = cx + dx * r;
        const y = cy + dy * r;
        return `<ellipse cx="${x}" cy="${y}" rx="${rx * r}" ry="${ry * r}" transform="rotate(${rot} ${x} ${y})" fill="${p.band}" opacity="0.85"/>`;
      })
      .join('');
  } else {
    bands = [-0.45, -0.1, 0.3, 0.6]
      .map((k, i) => `<rect x="${cx - r}" y="${cy + k * r}" width="${2 * r}" height="${r * (0.08 + (i % 2) * 0.07)}" fill="${p.band}" opacity="0.5"/>`)
      .join('');
  }
  const ring = p.ring
    ? `<ellipse cx="${cx}" cy="${cy}" rx="${r * 1.6}" ry="${r * 0.38}" fill="none" stroke="${p.a}" stroke-width="${r * 0.06}" opacity="0.7" transform="rotate(-18 ${cx} ${cy})"/>`
    : '';
  return (
    `<defs><radialGradient id="${gid}" cx="0.35" cy="0.3" r="0.8"><stop offset="0" stop-color="${p.a}"/><stop offset="1" stop-color="${p.b}"/></radialGradient>` +
    `<clipPath id="${gid}c"><circle cx="${cx}" cy="${cy}" r="${r}"/></clipPath></defs>` +
    `<circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#${gid})"/><g clip-path="url(#${gid}c)">${bands}` +
    `<circle cx="${cx + r * 0.35}" cy="${cy + r * 0.35}" r="${r * 1.05}" fill="#000" opacity="0.35"/></g>${ring}`
  );
}

/** Small star field, deterministic so re-runs give identical files. */
function stars(W, H, n, seed = 7, color = '#ffffff') {
  let s = seed;
  const rnd = () => (s = (s * 16807) % 2147483647) / 2147483647;
  let out = '';
  for (let i = 0; i < n; i++) {
    out += `<circle cx="${(rnd() * W).toFixed(1)}" cy="${(rnd() * H).toFixed(1)}" r="${(rnd() * 2.2 + 0.4).toFixed(2)}" fill="${color}" opacity="${(rnd() * 0.6 + 0.2).toFixed(2)}"/>`;
  }
  return out;
}

/** Metallic gold gradient definition for foil frames. */
function goldDefs(id = 'gold') {
  return (
    `<linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1">` +
    `<stop offset="0" stop-color="#fff1b8"/><stop offset="0.25" stop-color="#d4a63c"/><stop offset="0.5" stop-color="#fff6cf"/>` +
    `<stop offset="0.75" stop-color="#b8862a"/><stop offset="1" stop-color="#ffe7a0"/></linearGradient>`
  );
}

/** Renders SVG drawn in a W×H coordinate box to a sharp instance of outW pixels wide. */
function render(svg, W, H, outW = W) {
  const outH = Math.round((outW * H) / W);
  const doc = `<svg xmlns="http://www.w3.org/2000/svg" width="${outW}" height="${outH}" viewBox="0 0 ${W} ${H}">${svg}</svg>`;
  return sharp(Buffer.from(doc), { density: 72, limitInputPixels: false });
}

module.exports = { root, SHEETS, CROPS, FONT, HEAVY, MONO, PALETTE, emblem, esc, wrap, text, photo, image, dataUri, planet, stars, goldDefs, render, sharp };
