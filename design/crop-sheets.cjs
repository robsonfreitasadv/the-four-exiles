/**
 * Cuts character art out of the concept sheets in design/sheets into public/images/characters.
 * Usage: node design/crop-sheets.cjs   (needs `sharp` resolvable, e.g. NODE_PATH pointing at an install)
 * Coordinates are in sheet pixels; adjust here if a sheet is re-exported at another size.
 */
const path = require('path');
const sharp = require('sharp');

const root = path.resolve(__dirname, '..');
const sheets = path.join(root, 'design', 'sheets');
const out = path.join(root, 'public', 'images', 'characters');

const jobs = [];
const crop = (sheet, name, left, top, width, height) => jobs.push({ sheet, name, left, top, width, height });

// races.webp (1312×1199): four vertical panels
const races = { 'vhal-ett': 14, ilvani: 337, sazhi: 665, 'xhalen-kthrix': 991 };
// turnaround figures are not evenly spaced: [frame width, ...figure centers]
const turnarounds = {
  'vhal-ett': [92, 66, 135, 191, 263],
  ilvani: [100, 388, 464, 523, 586],
  sazhi: [108, 730, 826, 918],
  'xhalen-kthrix': [92, 1040, 1112, 1178, 1253],
};
for (const [id, L] of Object.entries(races)) {
  crop('races', `${id}`, L, 196, 310, 516);
  [13, 86, 159, 232].forEach((dx, i) => crop('races', `${id}-expr-${i + 1}`, L + dx, 742, 66, 74));
  const [w, ...centers] = turnarounds[id];
  centers.forEach((c, i) => crop('races', `${id}-turn-${i + 1}`, Math.round(c - w / 2), 828, w, 172));
}

// resistance.webp (1536×1024): Dora + team
crop('resistance', 'dora', 192, 92, 258, 620);
crop('resistance', 'rui', 440, 138, 186, 472);
crop('resistance', 'livia', 628, 138, 172, 472);
crop('resistance', 'julio', 800, 138, 170, 472);
crop('resistance', 'tati', 966, 138, 180, 472);
[
  [1178, 138], [1291, 138], [1404, 138],
  [1178, 279], [1291, 279], [1404, 279],
].forEach(([x, y], i) => crop('resistance', `dora-expr-${i + 1}`, x, y, 102, 124));
[1172, 1288, 1402].forEach((x, i) => crop('resistance', `dora-turn-${i + 1}`, x, 444, 104, 238));
crop('resistance', 'resistance-team', 36, 740, 514, 178);
crop('resistance', 'resistance-collectibles', 1068, 740, 437, 178);

(async () => {
  for (const j of jobs) {
    await sharp(path.join(sheets, `${j.sheet}.webp`))
      .extract({ left: j.left, top: j.top, width: j.width, height: j.height })
      .webp({ quality: 88 })
      .toFile(path.join(out, `${j.name}.webp`));
  }
  console.log(`${jobs.length} images written to ${out}`);
})();
