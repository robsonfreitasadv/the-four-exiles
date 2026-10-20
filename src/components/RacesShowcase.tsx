import { useId, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { factions } from '../data/factions';
import type { FactionId } from '../data/types';
import { useI18n } from '../i18n/I18nProvider';
import { withBase } from './art/CharacterImage';
import { Emblem } from './art/Emblem';
import { RaceArt } from './art/RaceArt';
import { TiltCard } from './art/TiltCard';
import { TurnaroundViewer } from './art/TurnaroundViewer';
import { Arrow, SectionHeading } from './ui/primitives';

/** "The races in 3D": one race at a time, with a tilting main render, a turntable and the expression sheet. */
export function RacesShowcase({ headingAs = 'h2' }: { headingAs?: 'h1' | 'h2' }) {
  const { t, l } = useI18n();
  const [active, setActive] = useState<FactionId>(factions[0].id);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const base = useId();
  const f = factions.find((x) => x.id === active)!;
  const p = f.palette;

  const onTabKey = (e: React.KeyboardEvent, idx: number) => {
    const dir = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const next = (idx + dir + factions.length) % factions.length;
    setActive(factions[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <section className="py-20 md:py-28" aria-label={t.races3d.title}>
      <div className="container-x">
        <SectionHeading as={headingAs} center kicker={t.races3d.kicker} title={t.races3d.title} intro={t.races3d.intro} />

        <div role="tablist" aria-label={t.races3d.title} className="mx-auto mb-8 flex w-fit max-w-full flex-wrap justify-center gap-1 rounded-full bg-graphite-800 p-1">
          {factions.map((x, idx) => {
            const on = x.id === active;
            return (
              <button
                key={x.id}
                ref={(el) => (tabRefs.current[idx] = el)}
                role="tab"
                id={`${base}-tab-${x.id}`}
                aria-selected={on}
                aria-controls={`${base}-panel`}
                tabIndex={on ? 0 : -1}
                onClick={() => setActive(x.id)}
                onKeyDown={(e) => onTabKey(e, idx)}
                className={`flex min-h-[40px] items-center gap-2 rounded-full px-4 text-sm font-medium transition-colors ${
                  on ? 'bg-graphite-500 text-bone' : 'text-bone-dim hover:text-bone'
                }`}
              >
                <span style={{ color: x.palette.primary }}>
                  <Emblem faction={x.id} className="h-4 w-4" />
                </span>
                {x.name}
              </button>
            );
          })}
        </div>

        <div
          id={`${base}-panel`}
          role="tabpanel"
          aria-labelledby={`${base}-tab-${f.id}`}
          className="overflow-hidden rounded-[36px] transition-[background] duration-700"
          style={{ background: `radial-gradient(120% 90% at 30% 10%, ${p.secondary} 0%, #0b0b0d 70%)` }}
        >
          <div className="grid items-center gap-10 p-6 sm:p-10 lg:grid-cols-[1.05fr_0.8fr_1fr] lg:gap-8 lg:p-12">
            {/* main render, tilting */}
            <TiltCard className="overflow-hidden rounded-[28px] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]" max={8}>
              <div key={f.id} className="relative aspect-[310/516] w-full animate-[fadeUp_.6s_ease-out] motion-reduce:animate-none">
                <RaceArt faction={f} />
              </div>
            </TiltCard>

            {/* turntable */}
            <TurnaroundViewer key={f.id} frames={f.sheet.turnaround} name={f.name} color={p.primary} />

            {/* identity */}
            <div className="min-w-0">
              <p className="flex items-center gap-2 text-sm font-semibold" style={{ color: p.primary }}>
                <Emblem faction={f.id} className="h-4 w-4" />
                {l(f.title)}
              </p>
              <h3 className="display mt-1 text-[40px] sm:text-[48px]">{f.name}</h3>
              <blockquote className="mt-4 text-2xl font-semibold leading-snug tracking-[-0.02em] text-bone">“{l(f.quote)}”</blockquote>
              <p className="mt-4 text-bone-dim">{l(f.motivation)}</p>

              <h4 className="mt-6 text-xs font-semibold text-bone-muted">{t.races3d.traits}</h4>
              <ul className="mt-2 flex flex-wrap gap-2">
                {f.traits.map((tr) => (
                  <li key={tr.en} className="rounded-full px-3 py-1 text-sm" style={{ background: `${p.primary}22`, color: p.accent }}>
                    {l(tr)}
                  </li>
                ))}
              </ul>

              <h4 className="mt-6 text-xs font-semibold text-bone-muted">{t.races3d.expressions}</h4>
              <ul className="mt-2 grid grid-cols-4 gap-2">
                {f.sheet.expressions.map((src) => (
                  <li key={src} className="aspect-[66/74] overflow-hidden rounded-xl bg-black/40">
                    <img
                      src={withBase(src)}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-300 hover:scale-110 motion-reduce:transition-none"
                    />
                  </li>
                ))}
              </ul>

              <Link to={`/factions/${f.id}`} className="link-arrow mt-7">
                {t.races3d.open} <Arrow />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
