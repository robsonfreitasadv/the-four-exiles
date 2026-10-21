import { Link } from 'react-router-dom';
import { Emblem } from './art/Emblem';
import { Block, StatusBadge } from './RaceDossier';
import { factionById, factions } from '../data/factions';
import { humanView, raceProfileById, raceProfiles, viewees, type Viewee } from '../data/raceProfiles';
import type { Faction } from '../data/types';
import { useI18n } from '../i18n/I18nProvider';

/** Race page: what the race wants from Earth, how it acts, its weak point and how it sees the others. */
export function RaceEarthSection({ faction }: { faction: Faction }) {
  const { t, l } = useI18n();
  const profile = raceProfileById(faction.id);
  if (!profile) return null;

  const others = viewees.filter((v) => v !== faction.id);

  return (
    <section className="container-x pt-16 md:pt-24" aria-labelledby="earth">
      <p className="kicker mb-3">{t.factionPage.earthKicker}</p>
      <h2 id="earth" className="display mb-8 text-5xl sm:text-6xl">{t.factionPage.earthTitle}</h2>
      <div className="grid gap-4 lg:grid-cols-3">
        <Block title={t.factionPage.ambition} status={profile.status} className="lg:col-span-3">
          <p className="max-w-4xl text-lg leading-relaxed text-bone">{l(profile.earthAmbition)}</p>
        </Block>
        <Block title={t.factionPage.howTheyAct} status={profile.status} className="lg:col-span-2">
          <p className="leading-relaxed text-bone-dim">{l(profile.howTheyAct)}</p>
        </Block>
        <Block title={t.factionPage.weakness} status={profile.status}>
          <p className="leading-relaxed text-bone-dim">{l(profile.weakness)}</p>
        </Block>
      </div>

      <p className="kicker mb-3 mt-16">{t.factionPage.relationsKicker}</p>
      <h2 className="display mb-8 text-4xl sm:text-5xl">{t.factionPage.relationsTitle}</h2>
      <ul className="grid gap-4 sm:grid-cols-2">
        {others.map((v) => {
          const text = profile.relations[v];
          if (!text) return null;
          return (
            <li key={v} className="rounded-[28px] bg-graphite-800 p-6">
              <div className="mb-3 flex items-start justify-between gap-3">
                <ViewLabel viewee={v} />
                <StatusBadge status={profile.status} />
              </div>
              <p className="leading-relaxed text-bone-dim">{l(text)}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function ViewLabel({ viewee }: { viewee: Viewee }) {
  const { t, l } = useI18n();
  if (viewee === 'humans') return <span className="font-display text-xl font-semibold text-bone">{t.factionsPage.humans}</span>;
  const f = factionById(viewee)!;
  return (
    <Link to={`/factions/${f.id}`} className="flex items-center gap-2 font-display text-xl font-semibold hover:underline" style={{ color: f.palette.primary }}>
      <Emblem faction={f.id} className="h-5 w-5" />
      {l(f.name)}
    </Link>
  );
}

/** Races page: the 5x5 relations matrix (four races plus the human Resistance). */
export function RelationsMatrix() {
  const { t, l } = useI18n();
  const status = raceProfiles[0]?.status ?? 'PROVISIONAL';
  const headName = (v: Viewee) => (v === 'humans' ? t.factionsPage.humans : l(factionById(v)!.name));
  const headColor = (v: Viewee) => (v === 'humans' ? undefined : factionById(v)!.palette.primary);

  const rows = [
    ...factions.map((f) => ({ id: f.id as Viewee, cells: raceProfileById(f.id)!.matrix })),
    { id: 'humans' as Viewee, cells: humanView },
  ];

  return (
    <section className="mt-16" aria-labelledby="relations-matrix">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="kicker mb-3">{t.factionsPage.matrixKicker}</p>
          <h2 id="relations-matrix" className="display text-4xl sm:text-5xl">{t.factionsPage.matrixTitle}</h2>
          <p className="mt-3 max-w-2xl text-bone-dim">{t.factionsPage.matrixIntro}</p>
        </div>
        <StatusBadge status={status} />
      </div>
      <div className="overflow-x-auto rounded-[28px] bg-graphite-800">
        <table className="w-full min-w-[860px] text-left text-sm">
          <thead className="font-sans text-xs">
            <tr className="border-b border-graphite-600">
              <th scope="col" className="p-4 text-bone-muted">{t.factionsPage.matrixCorner}</th>
              {viewees.map((v) => (
                <th key={v} scope="col" className="p-4 font-semibold" style={{ color: headColor(v) }}>
                  {headName(v)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-b border-graphite-700 align-top last:border-0">
                <th scope="row" className="p-4 font-display text-lg font-semibold" style={{ color: headColor(row.id) }}>
                  {headName(row.id)}
                </th>
                {viewees.map((col) => (
                  <td key={col} className={`p-4 leading-snug ${col === row.id ? 'italic text-bone' : 'text-bone-dim'}`}>
                    {l(row.cells[col])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
