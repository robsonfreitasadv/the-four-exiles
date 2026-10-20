import { Link } from 'react-router-dom';
import type { Faction } from '../data/types';
import { useI18n } from '../i18n/I18nProvider';
import { Emblem } from './art/Emblem';
import { RaceArt } from './art/RaceArt';
import { Arrow } from './ui/primitives';

/** Full-bleed image tile with the race's name over a tinted gradient. */
export function FactionCard({ faction }: { faction: Faction; index?: number }) {
  const { t, l } = useI18n();

  return (
    <Link
      to={`/factions/${faction.id}`}
      className="group relative block aspect-[4/5] overflow-hidden rounded-[28px] bg-graphite-800"
    >
      <RaceArt
        faction={faction}
        className="transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none"
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: `linear-gradient(to top, ${faction.palette.secondary} 0%, ${faction.palette.secondary}cc 22%, transparent 55%)` }}
        aria-hidden="true"
      />
      <div className="absolute inset-x-0 bottom-0 p-6">
        <p className="mb-1 flex items-center gap-2 text-sm font-semibold" style={{ color: faction.palette.primary }}>
          <Emblem faction={faction.id} className="h-4 w-4" />
          {l(faction.title)}
        </p>
        <h3 className="display text-[32px]">{faction.name}</h3>
        <p className="mt-2 text-[15px] leading-snug text-bone/80">{l(faction.tagline)}</p>
        <span className="mt-3 inline-flex items-center gap-1 text-[15px] text-link group-hover:underline">
          {t.factionsSection.explore}
          <Arrow />
        </span>
      </div>
    </Link>
  );
}
