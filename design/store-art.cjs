/**
 * Print files for the first store products, one per race plus the Resistance.
 * Usage: npm i --no-save sharp && node design/store-art.cjs
 * Writes print-ready PNGs (300 dpi sizes, transparent where the product allows) to design/store/
 * and web previews to public/images/store/. Art comes only from the official sheets and the race emblems.
 */
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

const root = path.resolve(__dirname, '..');
const sheets = path.join(root, 'design', 'sheets');
const printDir = path.join(root, 'design', 'store');
const webDir = path.join(root, 'public', 'images', 'store');
fs.mkdirSync(printDir, { recursive: true });
fs.mkdirSync(webDir, { recursive: true });

const FONT = 'Inter, Helvetica, Arial, sans-serif';
const HEAVY = 'Impact, "Arial Black", Helvetica, sans-serif';

// Race emblems, same drawing as src/components/art/Emblem.tsx (100×100 box, stroke in currentColor).
const EMBLEM = {
  grays:
    '<circle cx="50" cy="50" r="42"/><circle cx="50" cy="50" r="32" stroke-width="3" stroke-dasharray="4 6"/>' +
    '<path d="M24 52 C34 32 66 32 76 52 C66 66 34 66 24 52 Z" fill="currentColor" stroke="none"/>' +
    '<path d="M28 46 L72 46" stroke-width="5" stroke="#0b0d10"/>',
  nordics:
    [0, 60, 120, 180, 240, 300].map(function petal(r) {
      return `<ellipse cx="50" cy="26" rx="10" ry="18" transform="rotate(${r} 50 50)" stroke-width="4"/>`;
    }).join('') + '<circle cx="50" cy="50" r="9" fill="currentColor" stroke="none"/>',
  reptilians:
    '<path d="M14 70 L18 26 L36 44 L50 16 L64 44 L82 26 L86 70 Z"/>' +
    '<path d="M50 52 C58 62 60 70 50 76 C40 70 42 62 50 52 Z" fill="currentColor" stroke="none"/><path d="M14 84 L86 84"/>',
  mantis:
    '<path d="M50 90 L12 22 L88 22 Z"/><path d="M24 30 L44 30 L40 48 Z M76 30 L56 30 L60 48 Z" fill="currentColor" stroke="none"/>' +
    '<path d="M34 62 L50 72 L66 62" stroke-width="5"/>',
};

function emblem(race, x, y, size, color) {
  return `<svg x="${x}" y="${y}" width="${size}" height="${size}" viewBox="0 0 100 100" fill="none" stroke="${color}" color="${color}" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">${EMBLEM[race]}</svg>`;
}

function text(x, y, size, fill, str, opts = '') {
  return `<text x="${x}" y="${y}" font-family='${opts.includes('heavy') ? HEAVY : FONT}' font-size="${size}" fill="${fill}" text-anchor="middle" font-weight="${opts.includes('light') ? 500 : 800}" ${opts.includes('spaced') ? 'letter-spacing="' + Math.round(size * 0.12) + '"' : ''}>${str}</text>`;
}

async function faceData(id) {
  const buf = await sharp(path.join(sheets, `${id}-face.jpg`)).resize({ width: 1600 }).jpeg({ quality: 90 }).toBuffer();
  return `data:image/jpeg;base64,${buf.toString('base64')}`;
}

const products = [
  {
    slug: 'grays-deferido',
    size: [4500, 5400],
    async svg([W, H]) {
      const ink = '#A7ADB5';
      return (
        `<g transform="rotate(-8 ${W / 2} ${H / 2})">` +
        `<rect x="450" y="1500" width="3600" height="2100" rx="160" fill="none" stroke="${ink}" stroke-width="70"/>` +
        `<rect x="570" y="1620" width="3360" height="1860" rx="110" fill="none" stroke="${ink}" stroke-width="22" stroke-dasharray="70 50"/>` +
        emblem('grays', 1850, 1720, 800, ink) +
        text(W / 2, 3050, 620, ink, 'DEFERIDO', 'heavy spaced') +
        text(W / 2, 3330, 112, ink, 'ARQUIVO CENTRAL DE HEVRA · EM TRÊS VIAS', 'spaced') +
        `</g>` +
        text(W / 2, 4700, 130, '#E7E9EC', 'THE FOUR EXILES · GRAYS', 'light spaced')
      );
    },
  },
  {
    slug: 'nordics-esta-tudo-bem',
    size: [2475, 1050],
    background: '#ffffff',
    async svg([W]) {
      const ink = '#13325f';
      return (
        emblem('nordics', 170, 225, 600, '#3b74b8') +
        text(W / 2 + 330, 470, 230, ink, 'ESTÁ TUDO BEM.', 'heavy') +
        text(W / 2 + 330, 620, 80, '#3b74b8', 'Plano Jardim · Assembleia Terrestre', 'light') +
        text(W / 2 + 330, 820, 56, ink, 'THE FOUR EXILES · NÓRDICOS', 'light spaced')
      );
    },
  },
  {
    slug: 'reptilians-controle-o-fluxo',
    size: [4500, 5400],
    async svg([W]) {
      const face = await faceData('sazhi');
      const gold = '#D7A64B';
      return (
        `<defs><clipPath id="c"><circle cx="${W / 2}" cy="2050" r="1550"/></clipPath></defs>` +
        `<image href="${face}" x="${W / 2 - 1600}" y="300" width="3200" height="4286" clip-path="url(#c)" preserveAspectRatio="xMidYMid slice"/>` +
        `<circle cx="${W / 2}" cy="2050" r="1550" fill="none" stroke="${gold}" stroke-width="60"/>` +
        emblem('reptilians', W / 2 - 300, 3560, 600, gold) +
        text(W / 2, 4620, 420, gold, 'CONTROLE O FLUXO', 'heavy spaced') +
        text(W / 2, 4900, 150, '#8ea35a', 'A DINASTIA DE SAZHATH · THE FOUR EXILES', 'spaced')
      );
    },
  },
  {
    slug: 'mantis-disciplina-e-liberdade',
    size: [3508, 4961],
    background: '#0c120a',
    async svg([W, H]) {
      const face = await faceData('xhalen-kthrix');
      const green = '#93b360';
      return (
        `<image href="${face}" x="0" y="0" width="${W}" height="${Math.round(W * 1.34)}" preserveAspectRatio="xMidYMid slice"/>` +
        `<defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0.55" stop-color="#0c120a" stop-opacity="0"/><stop offset="0.9" stop-color="#0c120a"/></linearGradient></defs>` +
        `<rect width="${W}" height="${H}" fill="url(#g)"/>` +
        emblem('mantis', W / 2 - 220, 3480, 440, green) +
        text(W / 2, 4280, 245, '#cfe0b0', 'DISCIPLINA É LIBERDADE.', 'heavy spaced') +
        text(W / 2, 4520, 82, green, 'FOLGA FORA DA AGENDA É MOTIM · VEX, O COMANDANTE', 'spaced') +
        text(W / 2, 4780, 90, green, 'THE FOUR EXILES · MANTIS', 'light spaced')
      );
    },
  },
  {
    slug: 'resistencia-humanos',
    size: [4500, 5400],
    async svg([W]) {
      const orange = '#e58a52';
      return (
        text(W / 2, 1900, 560, '#f5f5f7', 'HUMANOS.', 'heavy spaced') +
        text(W / 2, 2550, 560, orange, 'NÃO O INIMIGO.', 'heavy spaced') +
        `<rect x="${W / 2 - 1300}" y="2900" width="2600" height="16" fill="${orange}"/>` +
        text(W / 2, 3300, 190, '#f5f5f7', 'EU LI A LETRA C.', 'spaced') +
        text(W / 2, 3620, 140, orange, 'A RESISTÊNCIA · FORTALEZA, 2049', 'light spaced')
      );
    },
  },
];

(async function main() {
  for (const p of products) {
    const [W, H] = p.size;
    const bg = p.background ? `<rect width="${W}" height="${H}" fill="${p.background}"/>` : '';
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${bg}${await p.svg(p.size)}</svg>`;
    const png = await sharp(Buffer.from(svg), { density: 72 }).png().toBuffer();
    await sharp(png).toFile(path.join(printDir, `${p.slug}.png`));
    // web preview: on the race's dark tone so light ink stays visible
    await sharp(png).flatten({ background: p.background ?? '#141416' }).resize({ width: 900 }).webp({ quality: 84 }).toFile(path.join(webDir, `${p.slug}.webp`));
    console.log(p.slug, `${W}×${H}`);
  }
})();
