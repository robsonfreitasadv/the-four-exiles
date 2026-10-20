import type { Faction } from '../../data/types';
import { useI18n } from '../../i18n/I18nProvider';
import { CharacterImage } from './CharacterImage';
import { FactionBackdrop } from './FactionBackdrop';
import { Portrait } from './Portrait';

interface RaceArtProps {
  faction: Faction;
  /** Which entry of `faction.art` to show. */
  index?: number;
  className?: string;
  eager?: boolean;
  decorative?: boolean;
}

/** A race's official artwork; falls back to the SVG figure on the race backdrop if the file fails. */
export function RaceArt({ faction, index = 0, className = '', eager, decorative }: RaceArtProps) {
  const { l } = useI18n();
  return (
    <CharacterImage
      image={faction.art[index]}
      className={className}
      eager={eager}
      decorative={decorative}
      background={faction.palette.secondary}
      fallback={
        <div className={`absolute inset-0 ${className}`}>
          <FactionBackdrop faction={faction.id} />
          <Portrait
            character={faction.id}
            alt={decorative ? '' : `${l(faction.leader.name)} — ${faction.name}`}
            className="absolute inset-x-0 bottom-0 h-[92%] w-full"
          />
        </div>
      }
    />
  );
}
