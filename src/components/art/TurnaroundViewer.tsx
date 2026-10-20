import { useEffect, useId, useRef, useState } from 'react';
import { useI18n } from '../../i18n/I18nProvider';
import { Arrow } from '../ui/primitives';
import { withBase } from './CharacterImage';

interface TurnaroundViewerProps {
  frames: string[];
  /** Character name, for the accessible label. */
  name: string;
  /** Glow color under the figure. */
  color: string;
  className?: string;
}

const STEP_PX = 36;

/**
 * Fake-3D turntable built from the character sheet's turnaround views.
 * Drag, swipe, arrow keys, the buttons or the slider change the view; it turns slowly on its own
 * while on screen until the visitor takes over (never with reduced motion).
 */
export function TurnaroundViewer({ frames, name, color, className = '' }: TurnaroundViewerProps) {
  const { t } = useI18n();
  const [i, setI] = useState(0);
  const [touched, setTouched] = useState(false);
  const stage = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; start: number } | null>(null);
  const sliderId = useId();
  const n = frames.length;
  const go = (next: number) => setI(((next % n) + n) % n);

  // gentle auto-turn while visible
  useEffect(() => {
    const el = stage.current;
    if (!el || touched || n < 2) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    let timer: number | undefined;
    const io = new IntersectionObserver(([entry]) => {
      window.clearInterval(timer);
      if (entry.isIntersecting) timer = window.setInterval(() => setI((v) => (v + 1) % n), 1100);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearInterval(timer);
    };
  }, [touched, n]);

  const onDown = (e: React.PointerEvent) => {
    setTouched(true);
    drag.current = { x: e.clientX, start: i };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onMove = (e: React.PointerEvent) => {
    if (!drag.current) return;
    go(drag.current.start + Math.round((e.clientX - drag.current.x) / STEP_PX));
  };
  const onUp = () => {
    drag.current = null;
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div
        ref={stage}
        role="img"
        aria-label={`${name} — ${t.races3d.view} ${i + 1} ${t.races3d.of} ${n}`}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            e.preventDefault();
            setTouched(true);
            go(i + (e.key === 'ArrowRight' ? 1 : -1));
          }
        }}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        className="relative aspect-[1/2] w-full max-w-[220px] cursor-grab touch-pan-y select-none rounded-[24px] active:cursor-grabbing"
        title={t.races3d.dragHint}
      >
        {/* floor: glow and turntable ring */}
        <div
          className="absolute inset-x-[8%] bottom-[2%] h-[9%] rounded-[50%] blur-md"
          style={{ background: `radial-gradient(ellipse at center, ${color}aa, transparent 70%)` }}
          aria-hidden="true"
        />
        <div className="absolute inset-x-[14%] bottom-[3.5%] h-[5%] rounded-[50%] border border-white/25" aria-hidden="true" />
        {frames.map((src, k) => (
          <img
            key={src}
            src={withBase(src)}
            alt=""
            draggable={false}
            loading="lazy"
            className={`pointer-events-none absolute inset-0 h-full w-full object-contain transition-opacity duration-300 [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_72%,transparent_100%)] ${
              k === i ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
      </div>

      <div className="mt-4 flex w-full max-w-[260px] items-center gap-3">
        <button
          type="button"
          onClick={() => {
            setTouched(true);
            go(i - 1);
          }}
          aria-label={t.races3d.prev}
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/10 text-bone hover:bg-white/20"
        >
          <Arrow className="h-3.5 w-3.5 rotate-180" />
        </button>
        <label htmlFor={sliderId} className="sr-only">
          {t.races3d.rotateLabel}
        </label>
        <input
          id={sliderId}
          type="range"
          min={0}
          max={n - 1}
          step={1}
          value={i}
          onChange={(e) => {
            setTouched(true);
            setI(Number(e.target.value));
          }}
          aria-valuetext={`${t.races3d.view} ${i + 1} ${t.races3d.of} ${n}`}
          className="h-1 min-w-0 flex-1 cursor-pointer appearance-auto"
          style={{ accentColor: color }}
        />
        <button
          type="button"
          onClick={() => {
            setTouched(true);
            go(i + 1);
          }}
          aria-label={t.races3d.next}
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/10 text-bone hover:bg-white/20"
        >
          <Arrow />
        </button>
      </div>
      <p className="mt-2 text-xs text-bone-muted">{t.races3d.dragHint}</p>
    </div>
  );
}
