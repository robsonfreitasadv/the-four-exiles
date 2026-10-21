import { Link } from 'react-router-dom';
import { Emblem } from '../art/Emblem';
import { factionById } from '../../data/factions';
import { useI18n } from '../../i18n/I18nProvider';
import { useCensus } from './chosenRace';

/** Header chip: the visitor's race, or an invitation to choose one. */
export function RaceChip() {
  const { t, l } = useI18n();
  const { entry } = useCensus();
  const f = entry ? factionById(entry.race) : undefined;

  if (!f) {
    return (
      <Link to="/choose" className="hidden whitespace-nowrap rounded-full border border-bone/30 px-3 py-1 text-xs text-bone hover:border-bone/60 sm:inline-flex lg:hidden xl:inline-flex">
        {t.choose.noRace}
      </Link>
    );
  }
  return (
    <Link
      to="/choose"
      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold"
      style={{ background: `${f.palette.primary}26`, color: f.palette.accent }}
      aria-label={`${t.choose.headerChip}: ${l(f.name)}`}
    >
      <Emblem faction={f.id} className="h-3.5 w-3.5" />
      <span className="hidden sm:inline lg:hidden xl:inline">{l(f.name)}</span>
    </Link>
  );
}
