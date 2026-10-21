/**
 * Save an on-page SVG as a PNG, entirely in the browser.
 * An SVG drawn through <img> cannot fetch external files, so every <image> is inlined as a data URL first.
 */

const cache = new Map<string, Promise<string>>();

function toDataUrl(url: string): Promise<string> {
  if (url.startsWith('data:')) return Promise.resolve(url);
  if (!cache.has(url)) {
    cache.set(
      url,
      fetch(url)
        .then((r) => {
          if (!r.ok) throw new Error(`fetch ${url}`);
          return r.blob();
        })
        .then(
          (blob) =>
            new Promise<string>((ok, fail) => {
              const reader = new FileReader();
              reader.onload = () => ok(String(reader.result));
              reader.onerror = () => fail(reader.error);
              reader.readAsDataURL(blob);
            }),
        ),
    );
  }
  return cache.get(url)!;
}

export async function svgToPngBlob(svg: SVGSVGElement, width: number, height: number): Promise<Blob> {
  const clone = svg.cloneNode(true) as SVGSVGElement;
  clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  clone.setAttribute('width', String(width));
  clone.setAttribute('height', String(height));
  await Promise.all(
    [...clone.querySelectorAll('image')].map(async (img) => {
      const href = img.getAttribute('href') ?? img.getAttribute('xlink:href');
      if (href) img.setAttribute('href', await toDataUrl(new URL(href, document.baseURI).href));
    }),
  );
  const xml = new XMLSerializer().serializeToString(clone);
  const url = URL.createObjectURL(new Blob([xml], { type: 'image/svg+xml;charset=utf-8' }));
  try {
    const img = new Image();
    await new Promise<void>((ok, fail) => {
      img.onload = () => ok();
      img.onerror = () => fail(new Error('render'));
      img.src = url;
    });
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    canvas.getContext('2d')!.drawImage(img, 0, 0, width, height);
    return await new Promise<Blob>((ok, fail) => canvas.toBlob((b) => (b ? ok(b) : fail(new Error('png'))), 'image/png'));
  } finally {
    URL.revokeObjectURL(url);
  }
}

export async function downloadSvg(svg: SVGSVGElement, width: number, height: number, filename: string) {
  const blob = await svgToPngBlob(svg, width, height);
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/** Naive word wrap for SVG text: splits into lines of at most `max` characters. */
export function wrapText(text: string, max: number): string[] {
  const lines: string[] = [];
  let line = '';
  for (const word of text.trim().split(/\s+/)) {
    if (!word) continue;
    if ((line + ' ' + word).trim().length > max && line) {
      lines.push(line);
      line = word;
    } else {
      line = (line + ' ' + word).trim();
    }
  }
  if (line) lines.push(line);
  return lines;
}
