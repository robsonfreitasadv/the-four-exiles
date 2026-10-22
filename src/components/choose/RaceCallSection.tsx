import { Link } from 'react-router-dom';
import { StatusBadge } from '../RaceDossier';
import { raceCallById } from '../../data/choose';
import type { Faction } from '../../data/types';
import { useI18n } from '../../i18n/I18nProvider';
import { useCensus } from './chosenRace';
import { CommunityCta } from '../CommunityCta';

/** Race page: the case for joining this race, with a one-click choice. */
export function RaceCallSection({ faction }: { faction: Faction }) {
  const { t, l } = useI18n();
  const { entry, choose } = useCensus();
  const call = raceCallById(faction.id);
  if (!call) return null;
  const p = faction.palette;
  const mine = entry?.race === faction.id;

  return (
    <section className="container-x pt-16 md:pt-24" aria-labelledby="call">
      <div className="rounded-[36px] p-6 sm:p-10" style={{ background: `linear-gradient(120deg, ${p.secondary}, #161617)` }}>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <p className="kicker">{t.factionPage.callKicker}</p>
          <StatusBadge status={call.status} />
        </div>
        <h2 id="call" className="display mt-3 text-4xl sm:text-6xl" style={{ color: p.accent }}>“{l(call.pitch)}”</h2>
        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          <div>
            <h3 className="text-xs font-semibold text-bone-muted">{t.choose.virtues}</h3>
            <ul className="mt-3 space-y-2 text-bone">
              {call.virtues.map((v) => (
                <li key={v.en} className="flex gap-2">
                  <span style={{ color: p.primary }} aria-hidden="true">+</span>
                  {l(v)}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold text-bone-muted">{t.choose.offer}</h3>
            <p className="mt-3 leading-relaxed text-bone-dim">{l(call.offer)}</p>
          </div>
          <div>
            <h3 className="text-xs font-semibold text-bone-muted">{t.choose.forWho}</h3>
            <p className="mt-3 leading-relaxed text-bone">{l(call.forWho)}</p>
          </div>
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          {mine ? (
            <Link to="/choose" className="btn-ghost">{t.factionPage.chosenThis}</Link>
          ) : (
            <Link to="/choose" className="btn-primary" onClick={() => choose(faction.id)}>
              {t.factionPage.chooseThis.replace('{race}', l(faction.name))}
            </Link>
          )}
        </div>
        <CommunityCta race={faction.id} className="mt-8 bg-black/30" />
      </div>
    </section>
  );
}
