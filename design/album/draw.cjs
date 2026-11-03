/**
 * Draws one album sticker as SVG (636×876 box = 50.8×71.1 mm trim + 1.5 mm bleed at 300 dpi).
 * `scale` renders the same layout larger (the NFT script uses 4×); photos are loaded at the final size.
 */
const { PALETTE, FONT, HEAVY, MONO, emblem, text, photo, image, planet, stars, goldDefs, render } = require('../lib/art.cjs');
const { RACES, CHARS } = require('./stickers.cjs');

const W = 636;
const H = 876;
const B = 18; // bleed
const PHOTO_H = 718;

const RACE_KIND = { grays: 1, nordics: 1, reptilians: 1, mantis: 1, resistance: 1 };

function frame(s, P) {
  const foil = s.foil;
  return (
    `<rect x="${B + 8}" y="${B + 8}" width="${600 - 16}" height="${840 - 16}" rx="22" fill="none" ` +
    `stroke="${foil ? 'url(#gold)' : P.primary}" stroke-width="${foil ? 14 : 5}"/>` +
    (foil ? `<rect x="${B + 22}" y="${B + 22}" width="${600 - 44}" height="${840 - 44}" rx="14" fill="none" stroke="url(#gold)" stroke-width="2"/>` : '')
  );
}

function badge(s, P, dark = false) {
  const n = s.n;
  const w = n.length > 3 ? 92 : 112;
  return (
    `<rect x="${B + 24}" y="${B + 24}" width="${w}" height="50" rx="25" fill="${dark ? '#1b1712' : '#000'}" opacity="${dark ? 0.9 : 0.6}"/>` +
    text(B + 24 + w / 2, B + 60, 30, s.foil ? '#ffe7a0' : dark ? '#f2ede0' : P.ink, n, { family: MONO, weight: 700 }).svg +
    (s.foil ? text(B + 24 + w + 26, B + 62, 34, '#ffe7a0', '★', { weight: 400 }).svg : '')
  );
}

function corner(s, P) {
  const kind = s.mini || (RACE_KIND[s.theme] ? s.theme : null);
  return kind ? emblem(kind, W - B - 84, B + 24, 56, P.primary, 0.9) : '';
}

function caption(s, P, title, sub) {
  return (
    `<defs><linearGradient id="fade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${P.bg}" stop-opacity="0"/><stop offset="1" stop-color="${P.bg}"/></linearGradient></defs>` +
    `<rect x="0" y="${PHOTO_H - 160}" width="${W}" height="160" fill="url(#fade)"/>` +
    `<rect x="0" y="${PHOTO_H}" width="${W}" height="${H - PHOTO_H}" fill="${P.bg}"/>` +
    text(W / 2, PHOTO_H + 62, 52, s.foil ? 'url(#gold)' : P.ink, title, { family: HEAVY, weight: 400, spacing: 0.04 }).svg +
    (sub ? text(W / 2, PHOTO_H + 104, 25, P.primary, sub, { weight: 600, spacing: 0.06 }).svg : '')
  );
}

// Composite art for the two mural puzzles, drawn once per group and cut into pieces.
const muralCache = {};
async function mural(group, scale) {
  const key = `${group}@${scale}`;
  if (muralCache[key]) return muralCache[key];
  const cols = group === 'races' ? 4 : 3;
  const MW = cols * 600 + 2 * B;
  const MH = 2 * 840 + 2 * B;
  const P = PALETTE[group === 'races' ? 'census' : 'resistance'];
  let svg = `<rect width="${MW}" height="${MH}" fill="${P.bg}"/>` + stars(MW, MH, 260, group === 'races' ? 11 : 23);
  if (group === 'races') {
    const ids = ['vhal-ett', 'ilvani', 'sazhi', 'xhalen-kthrix'];
    for (let i = 0; i < 4; i++) {
      const r = CHARS[ids[i]].race;
      const x = B + i * 600 + 24;
      const buf = await photo(`${ids[i]}-3d-1`, 552 * scale, 1450 * scale);
      svg += `<rect x="${x - 6}" y="${B + 34}" width="564" height="1462" rx="18" fill="${PALETTE[r].primary}" opacity="0.5"/>` + image(buf, x, B + 40, 552, 1450);
      svg += text(x + 276, B + 1578, 64, PALETTE[r].ink, CHARS[ids[i]].name, { family: HEAVY, weight: 400, spacing: 0.06 }).svg;
      svg += text(x + 276, B + 1630, 30, PALETTE[r].primary, RACES[r].name, { weight: 600, spacing: 0.1 }).svg;
    }
  } else {
    // Seam-aware layout: pieces are cut every 600 px, so every name and the title stay inside one column.
    // Column 1: Dora; column 2: title, Ray and Olivia; column 3: Julian and Tasha.
    const cx = (col, half) => B + col * 600 + (half === undefined ? 300 : 150 + half * 300);
    const people = [
      ['dora', cx(0), 360, B + 300],
      ['rui', cx(1, 0), 270, B + 560],
      ['livia', cx(1, 1), 270, B + 560],
      ['julio', cx(2, 0), 270, B + 560],
      ['tati', cx(2, 1), 270, B + 560],
    ];
    svg += text(cx(1), B + 200, 92, P.ink, 'A\nRESISTÊNCIA', { family: HEAVY, weight: 400, spacing: 0.02, lh: 1.0 }).svg;
    svg += text(cx(1), B + 410, 34, P.primary, 'Humanos. Não o inimigo.', { weight: 600 }).svg;
    svg += text(cx(2), B + 300, 40, P.primary, 'Mesmo planeta.\nSonhos diferentes.', { weight: 600, lh: 1.25 }).svg;
    for (const [id, x, w, y] of people) {
      const h = Math.round(w / 0.38);
      const buf = await photo(`${id}-3d-1`, w * scale, h * scale);
      svg += image(buf, x - w / 2, y, w, h);
      svg += text(x, B + 1380, w > 300 ? 64 : 50, P.ink, CHARS[id].name, { family: HEAVY, weight: 400, spacing: 0.04 }).svg;
      svg += text(x, B + 1430, 24, P.primary, CHARS[id].role, { weight: 600 }).svg;
    }
  }
  muralCache[key] = { svg, MW, MH };
  return muralCache[key];
}

async function body(s, P, scale) {
  const ph = (src, opts) => photo(src, W * scale, PHOTO_H * scale, opts);
  switch (s.type) {
    case 'photo':
    case 'gallery': {
      const buf = await ph(s.src, { crop: s.crop, fit: s.fit });
      return image(buf, 0, 0, W, PHOTO_H) + caption(s, P, s.title, s.sub);
    }
    case 'stamped': {
      const buf = await photo(s.src, W * scale, H * scale, { crop: s.crop });
      return (
        image(buf, 0, 0, W, H) +
        `<g transform="rotate(-14 ${W / 2} ${H * 0.62})"><rect x="70" y="${H * 0.62 - 70}" width="${W - 140}" height="120" rx="12" fill="none" stroke="#d8322a" stroke-width="9" opacity="0.92"/>` +
        text(W / 2, H * 0.62 + 18, s.stamp.length > 8 ? 62 : 74, '#d8322a', s.stamp, { family: HEAVY, weight: 400, spacing: 0.08, opacity: 0.92 }).svg +
        `</g><rect x="0" y="${H - 120}" width="${W}" height="120" fill="#000" opacity="0.65"/>` +
        text(W / 2, H - 52, 44, P.ink, `${s.title} · BÔNUS`, { family: HEAVY, weight: 400, spacing: 0.05 }).svg
      );
    }
    case 'emblem':
      return (
        `<defs><radialGradient id="glow" cx="0.5" cy="0.4" r="0.6"><stop offset="0" stop-color="${P.deep}"/><stop offset="1" stop-color="${P.bg}"/></radialGradient></defs>` +
        `<rect width="${W}" height="${H}" fill="url(#glow)"/>` + stars(W, H, 60, 3) +
        emblem(s.kind, W / 2 - 180, 150, 360, s.foil ? '#f0d78a' : P.primary) +
        text(W / 2, 650, 72, s.foil ? 'url(#gold)' : P.ink, s.title.toUpperCase(), { family: HEAVY, weight: 400, spacing: 0.05 }).svg +
        text(W / 2, 705, 28, P.primary, s.sub, { weight: 600 }).svg
      );
    case 'logo':
      return (
        `<rect width="${W}" height="${H}" fill="${P.bg}"/>` + stars(W, H, 120, 5) + planet('terra', W / 2, 250, 120) +
        text(W / 2, 520, 92, 'url(#gold)', 'THE FOUR\nEXILES', { family: HEAVY, weight: 400, spacing: 0.05, lh: 1.05 }).svg +
        ['grays', 'nordics', 'reptilians', 'mantis'].map((r, i) => emblem(r, 128 + i * 100, 660, 80, PALETTE[r].primary)).join('') +
        text(W / 2, 800, 26, P.primary, s.sub, { weight: 600, spacing: 0.06 }).svg
      );
    case 'planet':
      return (
        `<rect width="${W}" height="${H}" fill="${P.bg}"/>` + stars(W, H, 110, s.planet.length) + planet(s.planet, W / 2, 360, 190) +
        text(W / 2, 680, 60, s.foil ? 'url(#gold)' : P.ink, s.title, { family: HEAVY, weight: 400, spacing: 0.04 }).svg +
        text(W / 2, 730, 27, P.primary, s.sub, { weight: 600 }).svg
      );
    case 'quote': {
      const q = text(W / 2, 0, 44, P.ink, s.quote, { max: 17, weight: 800, lh: 1.18 });
      const y = 450 - q.height / 2 + 30;
      return (
        `<rect width="${W}" height="${H}" fill="${P.bg}"/>` + text(W / 2, 270, 220, P.primary, '“', { family: 'Georgia, serif', opacity: 0.6 }).svg +
        text(W / 2, y, 44, P.ink, s.quote, { max: 17, weight: 800, lh: 1.18 }).svg +
        `<rect x="${W / 2 - 60}" y="${y + q.height + 10}" width="120" height="4" fill="${P.primary}"/>` +
        text(W / 2, y + q.height + 66, 28, P.primary, s.by, { weight: 600, max: 30 }).svg
      );
    }
    case 'text': {
      const kind = s.mini || (RACE_KIND[s.theme] ? s.theme : null);
      const titleOpts = { family: HEAVY, weight: 400, max: 15, spacing: 0.03, lh: 1.05 };
      const bodyOpts = { max: 26, weight: 500, lh: 1.3 };
      const th = text(0, 0, 64, '#000', s.title.toUpperCase(), titleOpts).height;
      const bh = text(0, 0, 35, '#000', s.body, bodyOpts).height;
      const bottom = kind ? 720 : 800; // leave room for the small emblem at the foot
      const y = 110 + (bottom - 110 - (60 + th + 40 + bh)) / 2; // block vertically centred
      return (
        `<rect width="${W}" height="${H}" fill="${P.bg}"/>` +
        (kind ? emblem(kind, W / 2 - 230, 250, 460, P.primary, 0.07) : stars(W, H, 50, 9)) +
        text(W / 2, y + 20, 24, P.primary, s.kicker.toUpperCase(), { family: MONO, weight: 700, spacing: 0.12, max: 32 }).svg +
        text(W / 2, y + 60 + 52, 64, s.foil ? 'url(#gold)' : P.ink, s.title.toUpperCase(), titleOpts).svg +
        `<rect x="${W / 2 - 50}" y="${y + 60 + th}" width="100" height="4" fill="${s.foil ? '#e4c26b' : P.primary}"/>` +
        text(W / 2, y + 60 + th + 40 + 30, 35, P.ink, s.body, bodyOpts).svg +
        (kind ? emblem(kind, W / 2 - 40, 740, 80, P.primary) : '')
      );
    }
    case 'missing':
      return (
        `<rect width="${W}" height="${H}" fill="${P.bg}"/>` +
        `<g fill="none" stroke="${P.primary}" stroke-width="6" stroke-dasharray="18 14" opacity="0.6"><circle cx="${W / 2}" cy="300" r="110"/>` +
        `<path d="M150 640 C150 470 486 470 486 640"/></g>` +
        text(W / 2, 315, 90, P.primary, '?', { family: HEAVY, weight: 400, opacity: 0.8 }).svg +
        text(W / 2, 700, 54, P.ink, s.title, { family: HEAVY, weight: 400, spacing: 0.04 }).svg +
        text(W / 2, 745, 25, P.primary, s.sub, { weight: 600, max: 36 }).svg +
        text(W / 2, 800, 20, P.ink, 'AGUARDANDO FICHA OFICIAL', { family: MONO, spacing: 0.12, opacity: 0.7 }).svg
      );
    case 'palette':
      return (
        `<rect width="${W}" height="${H}" fill="${P.bg}"/>` +
        s.colors.map((c, i) => `<circle cx="${168 + (i % 3) * 150}" cy="${250 + Math.floor(i / 3) * 170}" r="62" fill="${c}" stroke="${P.ink}" stroke-width="3"/>`).join('') +
        text(W / 2, 640, 50, P.ink, s.title.toUpperCase(), { family: HEAVY, weight: 400, max: 18 }).svg +
        text(W / 2, 700, 25, P.primary, s.sub, { weight: 600, max: 34 }).svg
      );
    case 'card':
      return (
        `<rect width="${W}" height="${H}" fill="#efe6d2"/>` + `<rect x="0" y="0" width="${W}" height="190" fill="#1d1d24"/>` +
        text(W / 2, 95, 40, '#f2ede0', 'CARTEIRINHA\nDO CENSO', { family: HEAVY, weight: 400, spacing: 0.06, lh: 1.05 }).svg +
        ['Nome', 'Raça escolhida', 'Nº do Censo', 'Assinatura (em três vias)'].map((f, i) =>
          text(70, 290 + i * 120, 24, '#4b4436', f.toUpperCase(), { anchor: 'start', family: MONO, spacing: 0.08 }).svg +
          `<rect x="70" y="${318 + i * 120}" width="${W - 140}" height="3" fill="#4b4436"/>`).join('') +
        ['grays', 'nordics', 'reptilians', 'mantis'].map((r, i) => `<circle cx="${148 + i * 113}" cy="790" r="34" fill="none" stroke="#4b4436" stroke-width="3"/>` + emblem(r, 128 + i * 113, 770, 40, '#4b4436')).join('')
      );
    case 'case':
      return (
        `<rect width="${W}" height="${H}" fill="#efe6d2"/>` + `<rect x="0" y="0" width="${W}" height="140" fill="#1d1d24"/>` +
        text(W - B - 30, 100, 40, '#e4c26b', s.year, { anchor: 'end', family: MONO, weight: 700 }).svg +
        text(B + 30, B + 110, 18, '#c9b27a', 'ARQUIVO DO CENSO', { anchor: 'start', family: MONO, spacing: 0.14 }).svg +
        text(W / 2, 220, 46, '#1d1d24', s.title.toUpperCase(), { family: HEAVY, weight: 400, max: 18, lh: 1.05 }).svg +
        text(W / 2, s.title.length > 18 ? 320 : 270, 21, '#6b5f48', s.place.toUpperCase(), { family: MONO, spacing: 0.06, max: 40 }).svg +
        text(B + 40, s.title.length > 18 ? 385 : 345, 30, '#2a2620', s.body, { anchor: 'start', max: 31, weight: 500, lh: 1.28 }).svg +
        `<g transform="rotate(-4 ${W / 2} 700)"><rect x="56" y="630" width="${W - 112}" height="150" rx="10" fill="none" stroke="#b3312a" stroke-width="5"/>` +
        text(W / 2, 668, 19, '#b3312a', 'PARECER DO CENSO · FICÇÃO', { family: MONO, weight: 700, spacing: 0.1 }).svg +
        text(W / 2, 712, 25, '#b3312a', s.verdict, { max: 32, weight: 700, italic: true, lh: 1.2 }).svg + '</g>'
      );
    case 'puzzle': {
      const m = await mural(s.group, scale);
      const ox = s.col * 600;
      const oy = s.row * 840;
      return `<svg x="0" y="0" width="${W}" height="${H}" viewBox="${ox} ${oy} ${W} ${H}">${m.svg}</svg>`;
    }
    default:
      throw new Error(`tipo de figurinha desconhecido: ${s.type}`);
  }
}

/** Returns a sharp instance with the finished sticker. trim: drop the bleed (NFT and previews). */
async function drawSticker(s, { scale = 1, trim = false } = {}) {
  const P = PALETTE[s.theme] || PALETTE.census;
  const dark = s.type === 'case' || s.type === 'card';
  let svg = `<defs>${goldDefs('gold')}</defs>` + (await body(s, P, scale));
  if (s.type === 'puzzle') svg += text(B + 30, B + 50, 24, '#ffffff', s.n, { anchor: 'start', family: MONO, weight: 700, opacity: 0.75 }).svg;
  else svg += (dark || s.type === 'stamped' ? '' : frame(s, P)) + badge(s, P, dark) + (dark ? '' : corner(s, P));
  if (s.foil) svg += `<polygon points="0,${H * 0.2} ${W},${H * 0.02} ${W},${H * 0.12} 0,${H * 0.3}" fill="#ffffff" opacity="0.06"/>`;
  const box = trim ? `<svg x="0" y="0" width="600" height="840" viewBox="${B} ${B} 600 840">${svg}</svg>` : svg;
  const bw = trim ? 600 : W;
  const bh = trim ? 840 : H;
  return render(box, bw, bh, bw * scale);
}

module.exports = { drawSticker, W, H, B };
