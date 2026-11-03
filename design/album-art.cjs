/**
 * Album of stickers: every numbered sticker, the bonus stickers, the album pages with numbered slots,
 * covers, preview sheets and the checklist. Plan: design/album/plano.md; data: design/album/stickers.cjs.
 * Usage: npm i --no-save sharp && node design/album-art.cjs [--only 001,014,X1] [--skip-pages]
 * Output (300 dpi): design/album/figurinhas/NNN.jpg (636×876 with 1.5 mm bleed), design/album/bonus/XN.jpg,
 * design/album/paginas/pagina-NN.png (A4 2480×3508), capa.png, contracapa.png, previa-*.jpg, checklist.md.
 */
const path = require('path');
const fs = require('fs');
const { PALETTE, FONT, HEAVY, MONO, emblem, text, photo, image, planet, stars, render, sharp, root } = require('./lib/art.cjs');
const { stickers, bonus, PAGES, RACES, CHARS, RACE_ORDER } = require('./album/stickers.cjs');
const { drawSticker } = require('./album/draw.cjs');

const out = path.join(root, 'design', 'album');
const dirs = { fig: path.join(out, 'figurinhas'), bonus: path.join(out, 'bonus'), pages: path.join(out, 'paginas') };
Object.values(dirs).forEach((d) => fs.mkdirSync(d, { recursive: true }));

const args = process.argv.slice(2);
const only = args.includes('--only') ? args[args.indexOf('--only') + 1].split(',') : null;
const all = [...stickers, ...bonus];
const byN = Object.fromEntries(all.map((s) => [s.n, s]));

const PW = 2480;
const PH = 3508;

const INTRO = {
  Abertura: 'Em 2049, quatro civilizações reivindicaram a Terra. Este é o álbum oficial do Censo, contado pela Resistência.',
  Resistência: 'Dora e a equipe não são um time do campeonato: são quem conta os votos. Humanos. Não o inimigo.',
  'O Censo': 'O contrato tem milhares de cláusulas. Uma delas talvez seja uma brecha.',
  'Casos ufológicos reais': 'Casos reais, com o que foi relatado e a explicação oficial quando existe. O parecer do Censo é ficção.',
  'Galeria dos brilhantes': 'Doze das dezoito brilhantes da coleção, com acabamento dourado.',
  'Mural: as quatro raças': 'Cole as oito peças lado a lado para montar o painel.',
  'Mural: a Resistência': 'Cole as seis peças lado a lado para montar o painel.',
  Extras: 'Figurinhas bônus, fora da contagem de 200. Aparecem em eventos e brindes.',
};
for (const r of RACE_ORDER) {
  const R = RACES[r];
  INTRO[R.name] = `${R.title}. Planeta ${R.planetName}, reivindicação ${R.claim}. "${R.motto}" Personagem da ficha: ${CHARS[R.id].name}.`;
}

function header(title, theme, page, intro) {
  const P = PALETTE[theme];
  const kind = { grays: 1, nordics: 1, reptilians: 1, mantis: 1, resistance: 1 }[theme] ? theme : null;
  return (
    `<rect width="${PW}" height="${PH}" fill="${P.bg}"/>` + stars(PW, PH, 220, page * 7 + 1, P.ink) +
    `<rect x="0" y="0" width="${PW}" height="12" fill="${P.primary}"/>` +
    text(140, 230, 120, P.ink, title.toUpperCase(), { anchor: 'start', family: HEAVY, weight: 400, spacing: 0.04 }).svg +
    (intro ? text(140, 320, 40, P.primary, intro, { anchor: 'start', max: 80, weight: 500, lh: 1.3 }).svg : '') +
    (kind ? emblem(kind, PW - 340, 90, 200, P.primary) : '') +
    text(PW / 2, PH - 70, 30, P.primary, `THE FOUR EXILES · ÁLBUM DO CENSO · ${page}`, { family: MONO, spacing: 0.14, opacity: 0.8 }).svg
  );
}

function slot(x, y, s, P, puzzle = false) {
  const label = s.type === 'puzzle' ? 'Peça do mural' : s.title || s.quote || '';
  return (
    `<rect x="${x}" y="${y}" width="600" height="840" rx="${puzzle ? 0 : 22}" fill="${P.deep}" opacity="0.85" ` +
    `stroke="${s.foil ? '#e4c26b' : P.primary}" stroke-width="${s.foil ? 8 : 4}" stroke-dasharray="${puzzle ? '0' : '22 14'}"/>` +
    text(x + 300, y + 450, 170, s.foil ? '#e4c26b' : P.primary, s.n, { family: HEAVY, weight: 400, opacity: 0.55 }).svg +
    text(x + 300, y + 560, 30, P.ink, label.length > 44 ? label.slice(0, 42) + '…' : label, { max: 22, weight: 600, opacity: 0.8 }).svg +
    (s.foil ? text(x + 300, y + 760, 24, '#e4c26b', '★ BRILHANTE', { family: MONO, spacing: 0.12 }).svg : '')
  );
}

async function page([num, title, theme, numbers], firstOfSection) {
  const P = PALETTE[theme];
  let svg = header(title, theme, num, firstOfSection ? INTRO[title] : null);
  const items = numbers.map((n) => byN[n]);
  const puzzle = items[0] && items[0].type === 'puzzle';
  if (puzzle) {
    const cols = items.length === 8 ? 4 : 3;
    const x0 = (PW - cols * 600) / 2;
    const y0 = 700;
    items.forEach((s, i) => (svg += slot(x0 + (i % cols) * 600, y0 + Math.floor(i / cols) * 840, s, P, true)));
  } else if (items.length) {
    const rows = [];
    for (let i = 0; i < items.length; i += 3) rows.push(items.slice(i, i + 3));
    if (rows.length === 3 && rows[2].length === 1) rows[2].unshift(rows[1].pop()); // 7 → 3, 2, 2
    const gapY = 50;
    const used = rows.length * 840 + (rows.length - 1) * gapY;
    const top = 560 + (PH - 160 - 560 - used) / 2; // centred between the header and the footer
    rows.forEach((row, r) => {
      const x0 = (PW - row.length * 600 - (row.length - 1) * 70) / 2;
      row.forEach((s, i) => (svg += slot(x0 + i * 670, top + r * (840 + gapY), s, P)));
    });
  } else if (num === 1) {
    svg += welcome(P);
  } else {
    svg += checklistGrid(P);
  }
  return render(svg, PW, PH).png({ compressionLevel: 9, palette: false }).toFile(path.join(dirs.pages, `pagina-${String(num).padStart(2, '0')}.png`));
}

function welcome(P) {
  const lines = [
    ['200', 'figurinhas na coleção, de 001 a 200'],
    ['18', 'brilhantes, com moldura dourada (★)'],
    ['12', 'extras bônus, de X1 a X12, fora da contagem'],
    ['5', 'figurinhas por envelope'],
    ['36', 'páginas: abertura, as quatro raças, a Resistência, o Censo, casos reais, galeria e mural'],
  ];
  let svg = planet('terra', PW / 2, 900, 330);
  svg += text(PW / 2, 1460, 54, P.ink, 'Quatro espécies. Um planeta. Nenhum destino em comum.', { weight: 800 }).svg;
  lines.forEach(([big, small], i) => {
    const y = 1720 + i * 260;
    svg += text(520, y, 150, P.primary, big, { anchor: 'end', family: HEAVY, weight: 400 }).svg;
    svg += text(580, y - 40, 46, P.ink, small, { anchor: 'start', max: 60, weight: 600 }).svg;
  });
  svg += text(PW / 2, PH - 250, 36, P.primary, 'Troque as repetidas. Nenhuma raça é vilã. Quem escolhe é você.', { weight: 600 }).svg;
  return svg;
}

function checklistGrid(P) {
  let svg = '';
  const cols = 10;
  const cw = 210;
  const x0 = (PW - cols * cw) / 2;
  all.forEach((s, i) => {
    const x = x0 + (i % cols) * cw;
    const y = 520 + Math.floor(i / cols) * 132;
    svg += `<rect x="${x}" y="${y - 44}" width="52" height="52" rx="8" fill="none" stroke="${s.foil ? '#e4c26b' : P.primary}" stroke-width="4"/>`;
    svg += text(x + 70, y, 42, s.foil ? '#e4c26b' : P.ink, s.n, { anchor: 'start', family: MONO, weight: 700 }).svg;
  });
  return svg;
}

async function covers() {
  const P = PALETTE.census;
  let front = `<rect width="${PW}" height="${PH}" fill="${P.bg}"/>` + stars(PW, PH, 600, 99) + planet('terra', PW / 2, 3500, 1250);
  front += text(PW / 2, 470, 300, 'url(#g)', 'THE FOUR', { family: HEAVY, weight: 400, spacing: 0.05 }).svg;
  front += text(PW / 2, 760, 300, 'url(#g)', 'EXILES', { family: HEAVY, weight: 400, spacing: 0.05 }).svg;
  front += text(PW / 2, 880, 58, P.ink, 'ÁLBUM OFICIAL DO CENSO', { weight: 700, spacing: 0.2 }).svg;
  const ids = ['vhal-ett', 'ilvani', 'sazhi', 'xhalen-kthrix'];
  for (let i = 0; i < 4; i++) {
    const r = CHARS[ids[i]].race;
    const x = 120 + i * 570;
    const buf = await photo(`${ids[i]}-3d-1`, 520, 1360);
    front += `<rect x="${x - 8}" y="1052" width="536" height="1376" rx="28" fill="${PALETTE[r].primary}"/>` + image(buf, x, 1060, 520, 1360);
    front += text(x + 260, 2530, 70, PALETTE[r].ink, CHARS[ids[i]].name, { family: HEAVY, weight: 400 }).svg;
  }
  front += text(PW / 2, 3120, 54, P.ink, 'Quatro espécies. Um planeta. Nenhum destino em comum.', { weight: 800 }).svg;
  front += text(PW / 2, 3220, 36, P.primary, '200 figurinhas · 18 brilhantes · 12 extras', { family: MONO, spacing: 0.1 }).svg;
  const gold = `<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff1b8"/><stop offset="0.5" stop-color="#d4a63c"/><stop offset="1" stop-color="#ffe7a0"/></linearGradient></defs>`;
  await render(gold + front, PW, PH).png({ compressionLevel: 9 }).toFile(path.join(dirs.pages, 'capa.png'));

  let back = `<rect width="${PW}" height="${PH}" fill="${PALETTE.resistance.bg}"/>` + stars(PW, PH, 400, 42);
  back += emblem('resistance', PW / 2 - 300, 500, 600, PALETTE.resistance.primary);
  back += text(PW / 2, 1450, 110, PALETTE.resistance.ink, 'HUMANOS. NÃO O INIMIGO.', { family: HEAVY, weight: 400, spacing: 0.04 }).svg;
  back += text(PW / 2, 1600, 48, PALETTE.resistance.primary, 'A Resistência narra e conta os votos. Nenhuma raça é vilã.', { weight: 600 }).svg;
  RACE_ORDER.forEach((r, i) => (back += emblem(r, 340 + i * 480, 2000, 320, PALETTE[r].primary)));
  back += text(PW / 2, 2700, 40, PALETTE.resistance.ink, 'Personagens das fichas oficiais de THE FOUR EXILES. Sátira de ficção científica.', { weight: 500, max: 70 }).svg;
  back += text(PW / 2, 2860, 34, PALETTE.resistance.primary, 'Casos ufológicos: fatos públicos; os pareceres do Censo são ficção.', { weight: 500 }).svg;
  await render(back, PW, PH).png({ compressionLevel: 9 }).toFile(path.join(dirs.pages, 'contracapa.png'));
}

async function previewSheet(items, file, cols) {
  const w = 212;
  const h = 292;
  const comps = [];
  for (let i = 0; i < items.length; i++) {
    const f = path.join(items[i].n.startsWith('X') ? dirs.bonus : dirs.fig, `${items[i].n}.jpg`);
    // trimmed to the cut line, so the mural pieces join as they will on paper
    comps.push({ input: await sharp(f).extract({ left: 18, top: 18, width: 600, height: 840 }).resize(w, h).toBuffer(), left: (i % cols) * (w + 8) + 8, top: Math.floor(i / cols) * (h + 8) + 8 });
  }
  const W = cols * (w + 8) + 8;
  const H = Math.ceil(items.length / cols) * (h + 8) + 8;
  await sharp({ create: { width: W, height: H, channels: 3, background: '#0b0b0d' } }).composite(comps).jpeg({ quality: 80 }).toFile(path.join(out, file));
}

function checklistMd() {
  const rows = all.map((s) => `| ${s.n} | ${s.section} | ${s.foil ? '★' : ''} | ${s.nft ? 'sim' : ''} | ${describe(s)} |`);
  const md =
    '# Lista de controle do álbum\n\n' +
    'Gerada por `node design/album-art.cjs` a partir de `design/album/stickers.cjs`. Não edite à mão. ★ = brilhante.\n\n' +
    '| Nº | Seção | ★ | NFT | Figurinha |\n| --- | --- | --- | --- | --- |\n' + rows.join('\n') + '\n';
  fs.writeFileSync(path.join(out, 'checklist.md'), md);
}

function describe(s) {
  switch (s.type) {
    case 'photo': return `${s.title}: ${s.sub} (\`${s.src}\`)`;
    case 'gallery': return `${s.title}, rosto em moldura dourada (\`${s.src}\`)`;
    case 'stamped': return `${s.title}, variante carimbada "${s.stamp}" (\`${s.src}\`)`;
    case 'quote': return `Frase: "${s.quote}" (${s.by})`;
    case 'case': return `${s.year}, ${s.title} (${s.place})`;
    case 'puzzle': return `Mural ${s.group === 'races' ? 'das quatro raças' : 'da Resistência'}, peça ${s.row + 1}-${s.col + 1}`;
    case 'text': return `${s.kicker}: ${s.title}`;
    case 'card': return s.title;
    default: return `${s.title}${s.sub ? `: ${s.sub}` : ''}`;
  }
}

(async function main() {
  const todo = only ? all.filter((s) => only.includes(s.n)) : all;
  for (const s of todo) {
    const dir = s.n.startsWith('X') ? dirs.bonus : dirs.fig;
    await (await drawSticker(s)).jpeg({ quality: 93, chromaSubsampling: '4:4:4' }).withMetadata({ density: 300 }).toFile(path.join(dir, `${s.n}.jpg`));
    process.stdout.write(`${s.n} `);
  }
  console.log(`\n${todo.length} figurinhas`);
  if (only || args.includes('--skip-pages')) return;
  let last = '';
  for (const p of PAGES) {
    await page(p, p[1] !== last);
    last = p[1];
  }
  await covers();
  console.log(`${PAGES.length} páginas + capa e contracapa`);
  await previewSheet(stickers, 'previa-figurinhas.jpg', 20);
  await previewSheet(bonus, 'previa-bonus.jpg', 6);
  checklistMd();
  console.log('prévias e checklist.md');
})();
