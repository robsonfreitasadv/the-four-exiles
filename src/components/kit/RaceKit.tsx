import { useRef, useState, type ReactNode, type RefObject } from 'react';
import { raceCallById } from '../../data/choose';
import { raceKits } from '../../data/kit';
import type { Faction } from '../../data/types';
import { useI18n } from '../../i18n/I18nProvider';
import { downloadSvg } from './exportSvg';
import { AvatarEmblem, AvatarPortrait, MemeTemplate, Sticker, Wallpaper } from './KitArt';

const TILTS = [-6, 4, -3, 6];

/** One downloadable item: a preview plus a button that saves it as PNG. */
function KitItem({
  label,
  size,
  file,
  svgRef,
  children,
  className = '',
}: {
  label: string;
  size: [number, number];
  file: string;
  svgRef: RefObject<SVGSVGElement>;
  children: ReactNode;
  className?: string;
}) {
  const { t } = useI18n();
  const [state, setState] = useState<'idle' | 'busy' | 'failed'>('idle');

  async function save() {
    if (!svgRef.current) return;
    setState('busy');
    try {
      await downloadSvg(svgRef.current, size[0], size[1], file);
      setState('idle');
    } catch {
      setState('failed');
    }
  }

  return (
    <figure className={`flex flex-col rounded-[24px] bg-graphite-800 p-4 ${className}`}>
      <div className="flex flex-1 items-center justify-center">{children}</div>
      <figcaption className="mt-4 flex items-center justify-between gap-3">
        <span className="min-w-0 text-sm text-bone-dim">
          {label}
          <span className="block font-sans text-xs text-bone-muted">
            {size[0]}×{size[1]} PNG
          </span>
        </span>
        <button type="button" onClick={save} disabled={state === 'busy'} className="btn-ghost shrink-0 px-4 py-2 text-sm disabled:opacity-60">
          {state === 'busy' ? t.kit.saving : t.kit.download}
        </button>
      </figcaption>
      {state === 'failed' && (
        <p className="mt-2 text-xs text-signal" role="status">
          {t.kit.failed}
        </p>
      )}
    </figure>
  );
}

export function RaceKitSection({ faction: f }: { faction: Faction }) {
  const { t, l } = useI18n();
  const kit = raceKits[f.id];
  const call = raceCallById(f.id);
  const name = l(f.name);
  const pitch = call ? l(call.pitch) : l(f.tagline);
  const motto = l(f.quote);

  const phone = useRef<SVGSVGElement>(null);
  const desktop = useRef<SVGSVGElement>(null);
  const avatarE = useRef<SVGSVGElement>(null);
  const avatarP = useRef<SVGSVGElement>(null);
  const stickers = [useRef<SVGSVGElement>(null), useRef<SVGSVGElement>(null), useRef<SVGSVGElement>(null), useRef<SVGSVGElement>(null)];
  const meme = useRef<SVGSVGElement>(null);

  const [top, setTop] = useState(l(kit.memes[0].top));
  const [bottom, setBottom] = useState(l(kit.memes[0].bottom));

  return (
    <section className="container-x pt-16 md:pt-24" aria-labelledby="kit">
      <p className="kicker mb-3">{t.kit.kicker}</p>
      <h2 id="kit" className="display mb-3 text-5xl sm:text-6xl">{t.kit.title}</h2>
      <p className="mb-2 max-w-2xl text-bone-dim">{t.kit.intro}</p>
      <p className="mb-10 max-w-2xl text-sm text-bone-muted">{t.kit.license}</p>

      <h3 className="display mb-4 text-3xl">{t.kit.wallpapers}</h3>
      <div className="grid gap-4 md:grid-cols-[1fr_2.2fr]">
        <KitItem label={t.kit.phone} size={[1080, 1920]} file={`four-exiles-${f.id}-phone.png`} svgRef={phone}>
          <Wallpaper ref={phone} faction={f} variant="phone" name={name} pitch={pitch} motto={motto} className="h-auto max-h-[420px] w-auto max-w-full rounded-xl" />
        </KitItem>
        <KitItem label={t.kit.desktop} size={[1920, 1080]} file={`four-exiles-${f.id}-desktop.png`} svgRef={desktop}>
          <Wallpaper ref={desktop} faction={f} variant="desktop" name={name} pitch={pitch} motto={motto} className="h-auto w-full rounded-xl" />
        </KitItem>
      </div>

      <h3 className="display mb-4 mt-12 text-3xl">{t.kit.avatars}</h3>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KitItem label={t.kit.avatarEmblem} size={[512, 512]} file={`four-exiles-${f.id}-avatar-emblem.png`} svgRef={avatarE}>
          <AvatarEmblem ref={avatarE} faction={f} className="h-auto w-full max-w-[220px]" />
        </KitItem>
        <KitItem label={`${t.kit.avatarCharacter} · ${f.sheetCharacter}`} size={[512, 512]} file={`four-exiles-${f.id}-avatar.png`} svgRef={avatarP}>
          <AvatarPortrait ref={avatarP} faction={f} className="h-auto w-full max-w-[220px]" />
        </KitItem>
      </div>

      <h3 className="display mb-2 mt-12 text-3xl">{t.kit.stickers}</h3>
      <p className="mb-4 max-w-2xl text-sm text-bone-muted">{t.kit.stickersNote}</p>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {kit.stickers.map((s, i) => (
          <KitItem key={s.en} label={l(s)} size={[512, 512]} file={`four-exiles-${f.id}-sticker-${i + 1}.png`} svgRef={stickers[i]}>
            <Sticker ref={stickers[i]} faction={f} text={l(s)} tilt={TILTS[i % TILTS.length]} className="h-auto w-full max-w-[200px]" />
          </KitItem>
        ))}
      </div>

      <h3 className="display mb-4 mt-12 text-3xl">{t.kit.memes}</h3>
      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <KitItem label={t.kit.memeLabel} size={[1080, 1080]} file={`four-exiles-${f.id}-meme.png`} svgRef={meme}>
          <MemeTemplate ref={meme} faction={f} top={top} bottom={bottom} className="h-auto w-full max-w-[520px] rounded-xl" />
        </KitItem>
        <div className="space-y-4">
          <label className="block">
            <span className="text-sm text-bone-muted">{t.kit.memeTop}</span>
            <input
              value={top}
              maxLength={90}
              onChange={(e) => setTop(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-graphite-500 bg-graphite-800 px-4 py-3 text-bone focus:border-bone focus:outline-none"
            />
          </label>
          <label className="block">
            <span className="text-sm text-bone-muted">{t.kit.memeBottom}</span>
            <input
              value={bottom}
              maxLength={90}
              onChange={(e) => setBottom(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-graphite-500 bg-graphite-800 px-4 py-3 text-bone focus:border-bone focus:outline-none"
            />
          </label>
          <div>
            <p className="mb-2 text-xs font-semibold text-bone-muted">{t.kit.suggestions}</p>
            <ul className="flex flex-col gap-2">
              {kit.memes.map((m) => (
                <li key={m.top.en}>
                  <button
                    type="button"
                    onClick={() => {
                      setTop(l(m.top));
                      setBottom(l(m.bottom));
                    }}
                    className="w-full rounded-2xl border border-graphite-500 px-4 py-3 text-left text-sm text-bone-dim hover:border-bone hover:text-bone"
                  >
                    {l(m.top)} / {l(m.bottom)}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <p className="text-xs text-bone-muted">{t.kit.memeNote}</p>
        </div>
      </div>
    </section>
  );
}
