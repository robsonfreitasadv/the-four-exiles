/**
 * NFT candidates: the 12 gallery stickers (175–186, `nft: true` in design/album/stickers.cjs) in high resolution,
 * plus example metadata in the common token-metadata shape (name, description, image, attributes).
 * Nothing is minted or published here: wallet, network, contract and minting are the owner's decisions.
 * Usage: npm i --no-save sharp && node design/nft-art.cjs
 * Output: design/nft/<n>.png (2400×3360, not in Git), design/nft/metadata/<n>.json, design/nft/metadata.json, design/nft/previa.jpg.
 */
const path = require('path');
const fs = require('fs');
const { sharp, root } = require('./lib/art.cjs');
const { stickers, RACES } = require('./album/stickers.cjs');
const { drawSticker } = require('./album/draw.cjs');

const out = path.join(root, 'design', 'nft');
const metaDir = path.join(out, 'metadata');
fs.mkdirSync(metaDir, { recursive: true });

// Placeholder: replace with the real content address after uploading the images.
const IMAGE_BASE = 'ipfs://SUBSTITUIR_PELO_CID';
const SITE = 'https://robsonfreitasadv.github.io/the-four-exiles/';

const RACE_NAME = { resistance: 'Resistência', census: 'O Censo' };
const raceName = (r) => RACE_NAME[r] || RACES[r].name;

function metadata(s) {
  const who = s.type === 'gallery' ? `${s.title} (${s.sub})` : s.title;
  return {
    name: `THE FOUR EXILES · ${s.n} · ${s.title}`,
    description:
      `${who}, figurinha ${s.n} da Galeria dos brilhantes do álbum do Censo de THE FOUR EXILES, ` +
      'sátira de ficção científica em que quatro raças disputam a Terra e a Resistência humana conta os votos. ' +
      'Arte a partir das fichas oficiais dos personagens. Peça colecionável sem promessa de valor.',
    image: `${IMAGE_BASE}/${s.n}.png`,
    external_url: SITE,
    attributes: [
      { trait_type: 'Coleção', value: 'Álbum do Censo' },
      { trait_type: 'Seção', value: s.section },
      { trait_type: 'Número no álbum', value: s.n },
      { trait_type: 'Raça', value: raceName(s.race) },
      { trait_type: 'Tipo', value: s.type === 'gallery' ? 'Personagem' : 'Documento' },
      ...(s.type === 'gallery' ? [{ trait_type: 'Personagem', value: s.title }] : []),
      { trait_type: 'Acabamento', value: 'Brilhante dourado' },
      { trait_type: 'Fonte da arte', value: s.type === 'gallery' ? 'Ficha oficial' : 'Gráfico do projeto' },
    ],
  };
}

(async function main() {
  const items = stickers.filter((s) => s.nft);
  const all = [];
  for (const s of items) {
    const file = path.join(out, `${s.n}.png`);
    await (await drawSticker(s, { scale: 4, trim: true })).png({ compressionLevel: 9 }).toFile(file);
    const m = metadata(s);
    fs.writeFileSync(path.join(metaDir, `${s.n}.json`), JSON.stringify(m, null, 2) + '\n');
    all.push(m);
    console.log(`${s.n} ${s.title}`);
  }
  fs.writeFileSync(
    path.join(out, 'metadata.json'),
    JSON.stringify({ aviso: 'Exemplo. Nada foi cunhado nem publicado; troque o endereço das imagens antes de usar.', tokens: all }, null, 2) + '\n',
  );
  const [w, h] = [400, 560];
  const comps = [];
  for (let i = 0; i < items.length; i++) {
    comps.push({ input: await sharp(path.join(out, `${items[i].n}.png`)).resize(w, h).toBuffer(), left: (i % 6) * w, top: Math.floor(i / 6) * h });
  }
  await sharp({ create: { width: 6 * w, height: 2 * h, channels: 3, background: '#000' } }).composite(comps).jpeg({ quality: 82 }).toFile(path.join(out, 'previa.jpg'));
  console.log(`${items.length} candidatas, metadata.json e previa.jpg`);
})();
