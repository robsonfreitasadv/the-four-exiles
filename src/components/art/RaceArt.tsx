import { useState } from 'react';
import type { Faction } from '../../data/types';
import { useI18n } from '../../i18n/I18nProvider';
import { FactionBackdrop } from './FactionBackdrop';
import { Portrait } from './Portrait';

/** Root-relative asset paths follow the build's base, so relative (static) builds still find them. */
const withBase = (src: string) => (src.startsWith('/') ? import.meta.env.BASE_URL + src.slice(1) : src);

interface RaceArtProps {
  faction: Faction;
  /** Which entry of `faction.art` to show. */
  index?: number;
  className?: string;
  /** Load immediately (above the fold) instead of lazily. */
  eager?: boolean;
  /** Hide from assistive tech when a caption already names the character. */
  decorative?: boolean;
}

/**
 * Raster artwork for a race, filling its container (object-cover).
 * If the file is missing or fails to load, the SVG figure on the race backdrop is shown instead,
 * so a broken URL never breaks the layout.
 */
export function RaceArt({ faction, index = 0, className = '', eager, decorative }: RaceArtProps) {
  const { l } = useI18n();
  const art = faction.art[index];
  const [failed, setFailed] = useState(false);

  if (!art || failed) {
    return (
      <div className={`absolute inset-0 ${className}`}>
        <FactionBackdrop faction={faction.id} />
        <Portrait
          character={faction.id}
          alt={decorative ? '' : `${l(faction.leader.name)} — ${faction.name}`}
          className="absolute inset-x-0 bottom-0 h-[92%] w-full"
        />
      </div>
    );
  }

  return (
    <img
      src={withBase(art.src)}
      alt={decorative ? '' : l(art.alt)}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => setFailed(true)}
      className={`absolute inset-0 h-full w-full object-cover ${className}`}
      style={{ objectPosition: art.focus ?? '50% 30%', background: faction.palette.secondary }}
    />
  );
}
