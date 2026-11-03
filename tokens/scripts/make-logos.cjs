// Builds each coin's logo (512×512 round PNG) from the official face crops in
// public/images/characters/ and writes the metadata JSON next to it.
// Run: npm run logos  (from tokens/)
const fs = require('node:fs');
const path = require('node:path');
const sharp = require('sharp');
const { coins, METADATA_BASE } = require('../coins.config');

const FACES = path.join(__dirname, '..', '..', 'public', 'images', 'characters');
const OUT = path.join(__dirname, '..', 'metadata');
const SIZE = 512;

const circle = Buffer.from(
  `<svg width="${SIZE}" height="${SIZE}"><circle cx="${SIZE / 2}" cy="${SIZE / 2}" r="${SIZE / 2}"/></svg>`,
);

async function main() {
  fs.mkdirSync(path.join(OUT, 'images'), { recursive: true });
  for (const coin of coins) {
    const src = path.join(FACES, coin.face);
    const img = path.join(OUT, 'images', `${coin.id}.png`);
    await sharp(src)
      .resize(SIZE, SIZE, { fit: 'cover', position: 'north' })
      .composite([{ input: circle, blend: 'dest-in' }])
      .png({ compressionLevel: 9 })
      .toFile(img);

    const metadata = {
      name: coin.name,
      symbol: coin.symbol,
      decimals: 18,
      description: coin.description.en,
      description_pt_BR: coin.description['pt-BR'],
      image: `${METADATA_BASE}/images/${coin.id}.png`,
      external_url: 'https://robsonfreitasadv.github.io/the-four-exiles/',
      attributes: [
        { trait_type: 'Universe', value: 'THE FOUR EXILES' },
        { trait_type: 'Side', value: coin.id === 'resistance' ? 'Human Resistance' : 'Race' },
        { trait_type: 'Kind', value: 'Fan meme coin, no utility' },
      ],
    };
    fs.writeFileSync(path.join(OUT, `${coin.id}.json`), JSON.stringify(metadata, null, 2) + '\n');
    console.log(`${coin.symbol}: ${path.relative(process.cwd(), img)}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
