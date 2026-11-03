/**
 * Print files per race and for the Resistance: T-shirt (4500×5400, transparent), mug wrap (2475×1050, 11 oz
 * sublimation) and A3 poster (3508×4961), all at 300 dpi, from the official face sheets.
 * Usage: npm i --no-save sharp && node design/print-art.cjs
 * Output: design/print/<group>-camiseta.png, -caneca.png, -poster-a3.png (not in Git) and design/print/previa.jpg.
 */
const path = require('path');
const fs = require('fs');
const { PALETTE, HEAVY, MONO, emblem, text, photo, image, stars, render, sharp, root } = require('./lib/art.cjs');
const { RACES, CHARS, RACE_ORDER } = require('./album/stickers.cjs');

const out = path.join(root, 'design', 'print');
fs.mkdirSync(out, { recursive: true });

const TEAM = ['rui', 'livia', 'julio', 'tati'];

async function shirt(group) {
  const [W, H] = [4500, 5400];
  const P = PALETTE[group];
  if (group === 'resistance') {
    let svg = `<defs><clipPath id="d"><circle cx="${W / 2}" cy="1500" r="1100"/></clipPath></defs>`;
    svg += image(await photo('dora-face.jpg', 2200, 2200, { crop: { cx: 0.5, cy: 0.42, w: 0.95 } }), W / 2 - 1100, 400, 2200, 2200, 'clip-path="url(#d)"');
    svg += `<circle cx="${W / 2}" cy="1500" r="1100" fill="none" stroke="${P.primary}" stroke-width="50"/>`;
    for (let i = 0; i < 4; i++) {
      const cx = 750 + i * 1000;
      svg += `<defs><clipPath id="m${i}"><circle cx="${cx}" cy="3150" r="430"/></clipPath></defs>`;
      svg += image(await photo(`${TEAM[i]}-face.jpg`, 860, 860, { crop: { cx: 0.5, cy: 0.4, w: 0.9 } }), cx - 430, 2720, 860, 860, `clip-path="url(#m${i})"`);
      svg += `<circle cx="${cx}" cy="3150" r="430" fill="none" stroke="${P.primary}" stroke-width="30"/>`;
      svg += text(cx, 3760, 150, P.ink, CHARS[TEAM[i]].name.toUpperCase(), { family: HEAVY, weight: 400, spacing: 0.05 }).svg;
    }
    svg += text(W / 2, 4420, 330, P.ink, 'A RESISTÊNCIA', { family: HEAVY, weight: 400, spacing: 0.06 }).svg;
    svg += text(W / 2, 4800, 260, P.primary, 'CONTA OS VOTOS.', { family: HEAVY, weight: 400, spacing: 0.06 }).svg;
    svg += text(W / 2, 5200, 110, P.ink, 'HUMANOS. NÃO O INIMIGO. · THE FOUR EXILES', { family: MONO, weight: 700, spacing: 0.08 }).svg;
    return render(svg, W, H);
  }
  const R = RACES[group];
  const C = CHARS[R.id];
  const arch = `M750 4000 L750 1900 A1500 1500 0 0 1 3750 1900 L3750 4000 Z`;
  let svg = `<defs><clipPath id="a"><path d="${arch}"/></clipPath></defs>`;
  svg += image(await photo(`${R.id}-face.jpg`, 3000, 3600), 750, 400, 3000, 3600, 'clip-path="url(#a)"');
  svg += `<path d="${arch}" fill="none" stroke="${P.primary}" stroke-width="56"/>`;
  svg += `<circle cx="${W / 2}" cy="4000" r="380" fill="${P.bg}" stroke="${P.primary}" stroke-width="40"/>` + emblem(group, W / 2 - 250, 3750, 500, P.primary);
  svg += text(W / 2, 4840, 470, P.ink, C.name, { family: HEAVY, weight: 400, spacing: 0.08 }).svg;
  svg += text(W / 2, 5060, 130, P.primary, R.motto.toUpperCase(), { family: HEAVY, weight: 400, spacing: 0.06 }).svg;
  svg += text(W / 2, 5280, 95, P.ink, `${R.name.toUpperCase()} · ${R.title.toUpperCase()} · THE FOUR EXILES`, { family: MONO, weight: 700, spacing: 0.08 }).svg;
  return render(svg, W, H);
}

async function mug(group) {
  const [W, H] = [2475, 1050];
  const P = PALETTE[group];
  const ink = P.deep;
  const isRes = group === 'resistance';
  const id = isRes ? 'dora' : RACES[group].id;
  const name = isRes ? 'Dora' : CHARS[id].name;
  const role = isRes ? 'A Estrategista' : RACES[group].role;
  const motto = isRes ? 'Somos um problema.' : RACES[group].motto;
  const footer = isRes ? 'A RESISTÊNCIA · THE FOUR EXILES' : `${RACES[group].name.toUpperCase()} · THE FOUR EXILES`;
  const accent = group === 'nordics' ? '#3b74b8' : group === 'grays' ? '#6b7280' : P.primary; // readable on white
  // The left and right edges meet at the handle: face on the left half, emblem and text on the right half.
  let svg = `<rect width="${W}" height="${H}" fill="#ffffff"/>`;
  svg += `<defs><clipPath id="c"><circle cx="560" cy="525" r="370"/></clipPath></defs>`;
  svg += image(await photo(`${id}-face.jpg`, 740, 740, { crop: { cx: 0.5, cy: 0.4, w: 0.85 } }), 190, 155, 740, 740, 'clip-path="url(#c)"');
  svg += `<circle cx="560" cy="525" r="370" fill="none" stroke="${accent}" stroke-width="22"/>`;
  svg += `<circle cx="560" cy="525" r="392" fill="none" stroke="${ink}" stroke-width="6"/>`;
  svg += emblem(group, 1440, 130, 230, accent);
  svg += text(1555, 520, 150, ink, name.toUpperCase(), { family: HEAVY, weight: 400, spacing: 0.05 }).svg;
  svg += text(1555, 600, 52, accent, role, { weight: 700 }).svg;
  svg += text(1555, 760, 74, ink, motto, { family: HEAVY, weight: 400, max: 26 }).svg;
  svg += text(1555, 930, 34, ink, footer, { family: MONO, weight: 700, spacing: 0.12 }).svg;
  return render(svg, W, H);
}

async function poster(group) {
  const [W, H] = [3508, 4961];
  const P = PALETTE[group];
  let svg = `<rect width="${W}" height="${H}" fill="${P.bg}"/>` + stars(W, H, 300, 17, P.ink);
  const fade = (y0, y1) =>
    `<defs><linearGradient id="f${y0}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${P.bg}" stop-opacity="0"/><stop offset="1" stop-color="${P.bg}"/></linearGradient></defs>` +
    `<rect x="0" y="${y0}" width="${W}" height="${y1 - y0}" fill="url(#f${y0})"/>`;
  if (group === 'resistance') {
    svg += image(await photo('dora-face.jpg', W, 3000, { crop: { cx: 0.5, cy: 0.45, w: 1 } }), 0, 0, W, 3000) + fade(2100, 3000);
    for (let i = 0; i < 4; i++) {
      const x = 170 + i * 800;
      svg += `<defs><clipPath id="t${i}"><rect x="${x}" y="2900" width="748" height="1000" rx="32"/></clipPath></defs>`;
      svg += `<rect x="${x - 10}" y="2890" width="768" height="1020" rx="40" fill="${P.primary}"/>`;
      svg += image(await photo(`${TEAM[i]}-face.jpg`, 748, 1000), x, 2900, 748, 1000, `clip-path="url(#t${i})"`);
      svg += text(x + 374, 4010, 90, P.ink, CHARS[TEAM[i]].name.toUpperCase(), { family: HEAVY, weight: 400, spacing: 0.05 }).svg;
    }
    svg += text(W / 2, 4400, 300, P.ink, 'A RESISTÊNCIA', { family: HEAVY, weight: 400, spacing: 0.06 }).svg;
    svg += text(W / 2, 4590, 100, P.primary, 'Eles acham que somos só uma espécie. Somos um problema.', { weight: 700 }).svg;
    svg += text(W / 2, 4840, 72, P.ink, 'DORA · FORTALEZA, 2049 · THE FOUR EXILES', { family: MONO, weight: 700, spacing: 0.12 }).svg;
    return render(svg, W, H);
  }
  const R = RACES[group];
  const C = CHARS[R.id];
  svg += image(await photo(`${R.id}-face.jpg`, W, 4400), 0, 0, W, 4400) + fade(3000, 4400);
  svg += emblem(group, 180, 180, 360, P.primary);
  svg += text(W / 2, 4020, 520, P.ink, C.name, { family: HEAVY, weight: 400, spacing: 0.08 }).svg;
  svg += text(W / 2, 4250, 120, P.primary, `${R.role} · ${R.name}`, { weight: 700 }).svg;
  svg += text(W / 2, 4520, 150, P.ink, `"${R.motto}"`, { family: HEAVY, weight: 400, spacing: 0.03 }).svg;
  svg += text(W / 2, 4820, 72, P.primary, `PLANETA ${R.planetName.toUpperCase()} · REIVINDICAÇÃO ${R.claim.toUpperCase()} · THE FOUR EXILES`, { family: MONO, weight: 700, spacing: 0.1 }).svg;
  return render(svg, W, H);
}

(async function main() {
  const files = [];
  for (const g of [...RACE_ORDER, 'resistance']) {
    for (const [kind, fn] of [['camiseta', shirt], ['caneca', mug], ['poster-a3', poster]]) {
      const file = path.join(out, `${g}-${kind}.png`);
      await (await fn(g)).png({ compressionLevel: 9 }).withMetadata({ density: 300 }).toFile(file);
      files.push(file);
      console.log(path.basename(file));
    }
  }
  // preview: shirts on a dark swatch so light ink shows; 5 rows × 3 products
  const cell = [600, 720];
  const comps = [];
  for (let i = 0; i < files.length; i++) {
    const input = await sharp(files[i]).flatten({ background: '#2a2a2e' }).resize(cell[0], cell[1], { fit: 'contain', background: '#2a2a2e' }).toBuffer();
    comps.push({ input, left: (i % 3) * cell[0], top: Math.floor(i / 3) * cell[1] });
  }
  await sharp({ create: { width: 3 * cell[0], height: 5 * cell[1], channels: 3, background: '#2a2a2e' } }).composite(comps).jpeg({ quality: 82 }).toFile(path.join(out, 'previa.jpg'));
  console.log('previa.jpg');
})();
