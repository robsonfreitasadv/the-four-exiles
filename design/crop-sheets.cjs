/**
 * Cuts character art out of the concept sheets in design/sheets into public/images/characters.
 * Usage: npm i --no-save sharp && node design/crop-sheets.cjs
 * Coordinates are in sheet pixels; adjust here if a sheet is re-exported at another size.
 */
const path = require('path');
const sharp = require('sharp');

const root = path.resolve(__dirname, '..');
const sheets = path.join(root, 'design', 'sheets');
const out = path.join(root, 'public', 'images', 'characters');

const jobs = [];
// `base`: sheet width the coordinates were measured on; the job is scaled to the file's real width.
const crop = (sheet, name, left, top, width, height, ext = 'webp', base) => jobs.push({ sheet, name, left, top, width, height, ext, base });

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

// <id>-3d.jpg (originals 2752×1536; VELLUM 1440×2912): 3D reference sheets, one figure per view.
// Values are the head centre of each view, measured on a 2000-px-wide copy (VELLUM 989); frames reach halfway to the neighbours.
const ref3d = {
  livia: [246, 613, 920, 1179, 1514, 1837],
  tati: [249, 602, 910, 1205, 1530, 1834],
  julio: [266, 627, 931, 1168, 1500, 1802],
  rui: [276, 672, 932, 1192, 1522, 1814],
  dora: [255, 609, 905, 1184, 1512, 1826],
  'xhalen-kthrix': [220, 610, 936, 1165, 1526, 1805],
  sazhi: [270, 655, 995, 1489, 1844],
  ilvani: [266, 632, 923, 1186, 1526, 1825],
};
const frames3d = (id, sheet, centres, top, height, sheetWidth) => {
  centres.forEach((c, i) => {
    const gaps = [c - (centres[i - 1] ?? -Infinity), (centres[i + 1] ?? Infinity) - c].filter(Number.isFinite);
    const w = Math.round(Math.min(...gaps, 380));
    const left = Math.max(0, Math.min(sheetWidth - w, Math.round(c - w / 2)));
    crop(sheet, `${id}-3d-${i + 1}`, left, top, w, height, 'jpg', sheetWidth);
  });
};
for (const [id, centres] of Object.entries(ref3d)) {
  frames3d(id, `${id}-3d`, centres, 60, 985, 2000);
  // portrait card: head to mid-thigh of the front view, same 0.6 aspect as the earlier art
  const w = 300;
  crop(`${id}-3d`, `${id}-3d`, Math.round(centres[0] - w / 2), 62, w, Math.round(w * 1.664), 'jpg', 2000);
}
// VELLUM sheet: two rows of three views
frames3d('vhal-ett', 'vhal-ett-3d', [222, 581, 868], 52, 925, 989);
frames3d('vhal-ett-back', 'vhal-ett-3d', [185, 536, 876], 1032, 925, 989);
crop('vhal-ett-3d', 'vhal-ett-3d', 222 - 150, 50, 300, Math.round(300 * 1.664), 'jpg', 989);

(async () => {
  for (const j of jobs) {
    const file = path.join(sheets, `${j.sheet}.${j.ext}`);
    let { left, top, width, height } = j;
    if (j.base) {
      const meta = await sharp(file).metadata();
      const k = meta.width / j.base;
      left = Math.round(left * k);
      top = Math.round(top * k);
      width = Math.min(Math.round(width * k), meta.width - left);
      height = Math.min(Math.round(height * k), meta.height - top);
    }
    await sharp(file)
      .extract({ left, top, width, height })
      .webp({ quality: 88 })
      .toFile(path.join(out, `${j.name}.webp`));
  }
  // <id>-face.jpg (1792×2400): close-up portraits, scaled down whole for the web.
  const faces = ['vhal-ett', 'ilvani', 'sazhi', 'xhalen-kthrix', 'dora', 'rui', 'livia', 'julio', 'tati'];
  for (const id of faces) {
    await sharp(path.join(sheets, `${id}-face.jpg`))
      .resize({ width: 900 })
      .webp({ quality: 84 })
      .toFile(path.join(out, `${id}-face.webp`));
  }
  console.log(`${jobs.length + faces.length} images written to ${out}`);
})();
