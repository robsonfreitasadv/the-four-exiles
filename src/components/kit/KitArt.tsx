import { forwardRef } from 'react';
import { Emblem } from '../art/Emblem';
import { withBase } from '../art/CharacterImage';
import type { Faction } from '../../data/types';
import { wrapText } from './exportSvg';

/** Official face portrait size (px), the race’s main art. */
const PW = 900;
const PH = 1205;
const FONT = 'Inter, Helvetica, Arial, sans-serif';
const MEME_FONT = 'Impact, "Arial Black", Haettenschweiler, sans-serif';

interface ArtProps {
  faction: Faction;
  className?: string;
}

function Background({ id, f, w, h }: { id: string; f: Faction; w: number; h: number }) {
  return (
    <>
      <defs>
        <radialGradient id={`${id}-bg`} cx="0.5" cy="0.35" r="0.9">
          <stop offset="0" stopColor={f.palette.secondary} />
          <stop offset="1" stopColor="#050506" />
        </radialGradient>
      </defs>
      <rect width={w} height={h} fill={`url(#${id}-bg)`} />
    </>
  );
}

/** The official portrait as a framed card: the sheet crop has its own background, so it is shown as one. */
function Portrait({ id, f, x, y, scale }: { id: string; f: Faction; x: number; y: number; scale: number }) {
  const w = PW * scale;
  const h = PH * scale;
  const r = 28;
  return (
    <>
      <defs>
        <clipPath id={`${id}-card`}>
          <rect x={x} y={y} width={w} height={h} rx={r} />
        </clipPath>
      </defs>
      <rect x={x + 10} y={y + 18} width={w} height={h} rx={r} fill="#000" opacity="0.45" />
      <image href={withBase(f.art[0].src)} x={x} y={y} width={w} height={h} clipPath={`url(#${id}-card)`} preserveAspectRatio="xMidYMid slice" />
      <rect x={x} y={y} width={w} height={h} rx={r} fill="none" stroke={f.palette.primary} strokeWidth={5} />
    </>
  );
}

export const Wallpaper = forwardRef<SVGSVGElement, ArtProps & { variant: 'phone' | 'desktop'; name: string; pitch: string; motto: string }>(
  function Wallpaper({ faction: f, variant, name, pitch, motto, className }, ref) {
    const phone = variant === 'phone';
    const W = phone ? 1080 : 1920;
    const H = phone ? 1920 : 1080;
    const id = `wp-${f.id}-${variant}`;
    const scale = phone ? 0.63 : 0.66;
    const px = phone ? (W - PW * scale) / 2 : W - PW * scale - 140;
    const py = phone ? H - PH * scale - 260 : (H - PH * scale) / 2;
    const tx = phone ? W / 2 : 140;
    const anchor = phone ? 'middle' : 'start';
    return (
      <svg ref={ref} viewBox={`0 0 ${W} ${H}`} className={className} role="img" aria-label={`${name} wallpaper`}>
        <Background id={id} f={f} w={W} h={H} />
        <svg x={phone ? W / 2 - 450 : W - 1000} y={phone ? 260 : 40} width="900" height="900" color={f.palette.primary} opacity="0.1">
          <Emblem faction={f.id} />
        </svg>
        <Portrait id={id} f={f} x={px} y={py} scale={scale} />
        <text x={tx} y={phone ? 230 : 330} textAnchor={anchor} fill={f.palette.accent} fontFamily={FONT} fontSize={phone ? 130 : 150} fontWeight="700">
          {name}
        </text>
        {wrapText(pitch, phone ? 36 : 40).map((line, i) => (
          <text key={i} x={tx} y={(phone ? 310 : 420) + i * 58} textAnchor={anchor} fill="#f5f5f7" fontFamily={FONT} fontSize="46" fontWeight="600">
            {line}
          </text>
        ))}
        <text x={tx} y={phone ? H - 150 : H - 120} textAnchor={anchor} fill={f.palette.primary} fontFamily={FONT} fontSize="36" fontStyle="italic">
          “{motto}”
        </text>
        <text x={tx} y={phone ? H - 90 : H - 70} textAnchor={anchor} fill="#8e8e93" fontFamily={FONT} fontSize="26" letterSpacing="4">
          THE FOUR EXILES
        </text>
      </svg>
    );
  },
);

export const AvatarEmblem = forwardRef<SVGSVGElement, ArtProps>(function AvatarEmblem({ faction: f, className }, ref) {
  const id = `ae-${f.id}`;
  return (
    <svg ref={ref} viewBox="0 0 512 512" className={className} role="img" aria-label={`${f.id} emblem avatar`}>
      <defs>
        <radialGradient id={`${id}-bg`} cx="0.5" cy="0.4" r="0.7">
          <stop offset="0" stopColor={f.palette.secondary} />
          <stop offset="1" stopColor="#050506" />
        </radialGradient>
      </defs>
      <circle cx="256" cy="256" r="256" fill={`url(#${id}-bg)`} />
      <circle cx="256" cy="256" r="236" fill="none" stroke={f.palette.primary} strokeWidth="10" />
      <svg x="106" y="106" width="300" height="300" color={f.palette.accent}>
        <Emblem faction={f.id} />
      </svg>
    </svg>
  );
});

export const AvatarPortrait = forwardRef<SVGSVGElement, ArtProps>(function AvatarPortrait({ faction: f, className }, ref) {
  const id = `ap-${f.id}`;
  // Frame the face: on the face portraits the eyes sit about 36% down.
  const scale = 0.6;
  const ix = 256 - PW * scale * 0.5;
  const iy = 256 - PH * scale * 0.36;
  return (
    <svg ref={ref} viewBox="0 0 512 512" className={className} role="img" aria-label={`${f.sheetCharacter} avatar`}>
      <defs>
        <clipPath id={`${id}-clip`}>
          <circle cx="256" cy="256" r="246" />
        </clipPath>
      </defs>
      <circle cx="256" cy="256" r="256" fill={f.palette.secondary} />
      <g clipPath={`url(#${id}-clip)`}>
        <image href={withBase(f.art[0].src)} x={ix} y={iy} width={PW * scale} height={PH * scale} preserveAspectRatio="xMidYMid slice" />
      </g>
      <circle cx="256" cy="256" r="246" fill="none" stroke={f.palette.primary} strokeWidth="12" />
      <circle cx="420" cy="420" r="62" fill="#050506" stroke={f.palette.primary} strokeWidth="6" />
      <svg x="378" y="378" width="84" height="84" color={f.palette.accent}>
        <Emblem faction={f.id} />
      </svg>
    </svg>
  );
});

export const Sticker = forwardRef<SVGSVGElement, ArtProps & { text: string; tilt: number }>(function Sticker({ faction: f, text, tilt, className }, ref) {
  const lines = wrapText(text, 11);
  const size = lines.length > 2 ? 54 : lines.length === 2 ? 66 : 78;
  const top = 300 - ((lines.length - 1) * size) / 2;
  // Heavy fallback fonts run wide (~0.72em per character): shrink any line that would leave the 340px label.
  const fit = (line: string) => Math.min(size, Math.floor(340 / (line.length * 0.72)));
  return (
    <svg ref={ref} viewBox="0 0 512 512" className={className} role="img" aria-label={text}>
      <g transform={`rotate(${tilt} 256 256)`}>
        <rect x="36" y="96" width="440" height="320" rx="48" fill="#ffffff" />
        <rect x="52" y="112" width="408" height="288" rx="36" fill={f.palette.secondary} />
        <rect x="68" y="128" width="376" height="256" rx="26" fill="none" stroke={f.palette.primary} strokeWidth="6" strokeDasharray="14 10" />
        <svg x="226" y="146" width="60" height="60" color={f.palette.primary}>
          <Emblem faction={f.id} />
        </svg>
        {lines.map((line, i) => (
          <text key={i} x="256" y={top + i * size} textAnchor="middle" fill={f.palette.accent} fontFamily={FONT} fontSize={fit(line)} fontWeight="800">
            {line}
          </text>
        ))}
      </g>
    </svg>
  );
});

function MemeLines({ text, y, from }: { text: string; y: number; from: 'top' | 'bottom' }) {
  const lines = wrapText(text.toUpperCase(), 20);
  const size = 76;
  const start = from === 'top' ? y : y - (lines.length - 1) * size;
  return (
    <>
      {lines.map((line, i) => (
        <text
          key={i}
          x="540"
          y={start + i * size}
          textAnchor="middle"
          fill="#ffffff"
          stroke="#000000"
          strokeWidth="10"
          paintOrder="stroke"
          strokeLinejoin="round"
          fontFamily={MEME_FONT}
          fontSize={size}
        >
          {line}
        </text>
      ))}
    </>
  );
}

export const MemeTemplate = forwardRef<SVGSVGElement, ArtProps & { top: string; bottom: string }>(function MemeTemplate({ faction: f, top, bottom, className }, ref) {
  const id = `meme-${f.id}`;
  const scale = 1.2; // fill the square; the face sits in the upper half
  return (
    <svg ref={ref} viewBox="0 0 1080 1080" className={className} role="img" aria-label={`${top} / ${bottom}`}>
      <Background id={id} f={f} w={1080} h={1080} />
      <image href={withBase(f.art[0].src)} x={540 - (PW * scale) / 2} y={-110} width={PW * scale} height={PH * scale} preserveAspectRatio="xMidYMid slice" />
      <MemeLines text={top} y={110} from="top" />
      <MemeLines text={bottom} y={1030} from="bottom" />
      <text x="1060" y="1066" textAnchor="end" fill="#ffffff" fillOpacity="0.55" fontFamily={FONT} fontSize="20">
        THE FOUR EXILES
      </text>
    </svg>
  );
});
