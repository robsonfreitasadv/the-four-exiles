import { useRef, useState } from 'react';
import { Emblem } from '../art/Emblem';
import { factionById } from '../../data/factions';
import { raceCallById } from '../../data/choose';
import { useI18n } from '../../i18n/I18nProvider';
import type { CensusEntry } from './chosenRace';

const W = 1200;
const H = 675;
const FONT = 'Inter, Helvetica, Arial, sans-serif';

/** Shareable census card, drawn as SVG so it can be saved as a PNG without any server. */
export function CensusCard({ entry, onRename }: { entry: CensusEntry; onRename: (name: string) => void }) {
  const { t, l } = useI18n();
  const svgRef = useRef<SVGSVGElement>(null);
  const [status, setStatus] = useState('');
  const f = factionById(entry.race)!;
  const call = raceCallById(entry.race);
  const p = f.palette;
  const name = entry.name.trim() || t.choose.anonymous;

  async function download() {
    const svg = svgRef.current;
    if (!svg) return;
    try {
      const xml = new XMLSerializer().serializeToString(svg);
      const url = URL.createObjectURL(new Blob([xml], { type: 'image/svg+xml;charset=utf-8' }));
      const img = new Image();
      await new Promise<void>((ok, fail) => {
        img.onload = () => ok();
        img.onerror = () => fail(new Error('render'));
        img.src = url;
      });
      const canvas = document.createElement('canvas');
      canvas.width = W;
      canvas.height = H;
      canvas.getContext('2d')!.drawImage(img, 0, 0, W, H);
      URL.revokeObjectURL(url);
      const a = document.createElement('a');
      a.href = canvas.toDataURL('image/png');
      a.download = `the-four-exiles-census-${entry.race}.png`;
      a.click();
      setStatus(t.choose.downloaded);
    } catch {
      setStatus(t.choose.downloadFailed);
    }
  }

  async function share() {
    const text = t.choose.shareText.replace('{race}', l(f.name));
    try {
      if (navigator.share) {
        await navigator.share({ title: 'THE FOUR EXILES', text, url: window.location.href });
      } else {
        await navigator.clipboard.writeText(`${text} ${window.location.href}`);
        setStatus(t.choose.copied);
      }
    } catch {
      // The visitor closed the share sheet; nothing to report.
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr] lg:items-center">
      <svg
        ref={svgRef}
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full rounded-[28px] shadow-2xl"
        role="img"
        aria-label={`${t.choose.cardTitle}: ${name}, ${l(f.name)}, ${entry.number}`}
      >
        <defs>
          <linearGradient id="census-bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={p.secondary} />
            <stop offset="1" stopColor="#050506" />
          </linearGradient>
        </defs>
        <rect width={W} height={H} rx="36" fill="url(#census-bg)" />
        <rect x="24" y="24" width={W - 48} height={H - 48} rx="24" fill="none" stroke={p.primary} strokeOpacity="0.35" strokeWidth="2" />
        <svg x="760" y="150" width="380" height="380" color={p.primary} opacity="0.9">
          <Emblem faction={f.id} />
        </svg>
        <text x="72" y="110" fill={p.primary} fontFamily={FONT} fontSize="26" fontWeight="600" letterSpacing="2">
          {t.choose.cardKicker}
        </text>
        <text x="72" y="250" fill={p.accent} fontFamily={FONT} fontSize="112" fontWeight="700">
          {l(f.name)}
        </text>
        <text x="72" y="310" fill="#f5f5f7" fontFamily={FONT} fontSize="34" fontWeight="500">
          {t.choose.ambassador}
        </text>
        <text x="72" y="420" fill="#f5f5f7" fontFamily={FONT} fontSize="52" fontWeight="700">
          {name}
        </text>
        <text x="72" y="470" fill="#a1a1a6" fontFamily={FONT} fontSize="28">
          {t.choose.censusNo} {entry.number}
        </text>
        {call && (
          <text x="72" y="560" fill={p.primary} fontFamily={FONT} fontSize="30" fontStyle="italic">
            “{l(call.pitch)}”
          </text>
        )}
        <text x="72" y="615" fill="#6e6e73" fontFamily={FONT} fontSize="22">
          THE FOUR EXILES · {t.meta.tagline}
        </text>
      </svg>

      <div className="space-y-4">
        <label className="block">
          <span className="text-sm text-bone-muted">{t.choose.nameLabel}</span>
          <input
            type="text"
            maxLength={40}
            defaultValue={entry.name}
            onBlur={(e) => onRename(e.target.value)}
            placeholder={t.choose.namePlaceholder}
            className="mt-2 w-full rounded-2xl border border-graphite-500 bg-graphite-800 px-4 py-3 text-bone placeholder:text-bone-muted focus:border-bone focus:outline-none"
          />
        </label>
        <div className="flex flex-wrap gap-3">
          <button type="button" onClick={download} className="btn-primary">
            {t.choose.download}
          </button>
          <button type="button" onClick={share} className="btn-ghost">
            {t.choose.share}
          </button>
        </div>
        <p className="text-sm text-bone-muted" role="status">
          {status || t.choose.cardNote}
        </p>
      </div>
    </div>
  );
}
