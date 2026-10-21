import { Link } from 'react-router-dom';
import { rankScores, seasons, totalScore } from '../data/championship';
import { factionById } from '../data/factions';
import type { FactionScore } from '../data/types';
import { useI18n } from '../i18n/I18nProvider';
import { Emblem } from './art/Emblem';

export function SeasonSelector({ value, onChange }: { value: string; onChange: (id: string) => void }) {
  const { t, l } = useI18n();
  return (
    <div role="radiogroup" aria-label={t.war.season} className="flex flex-wrap gap-2">
      {seasons.map((s) => {
        const active = s.id === value;
        return (
          <button
            key={s.id}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(s.id)}
            className={`min-h-[40px] rounded-full border px-4 py-2 text-left font-sans text-xs transition-colors ${
              active ? 'border-bone bg-bone text-black' : 'border-graphite-500 text-bone-dim hover:border-bone hover:text-bone'
            }`}
          >
            {l(s.label)}
            <span className={`ml-2 text-xs ${active ? 'text-void/70' : 'text-bone-muted'}`}>· {t.war[s.status]}</span>
          </button>
        );
      })}
    </div>
  );
}

/** Ranked championship table with a stacked bar showing where each faction's points came from. */
export function LeaderboardTable({ rows }: { rows: FactionScore[] }) {
  const { t, l } = useI18n();
  const ranked = rankScores(rows);
  const max = Math.max(...ranked.map(totalScore));

  if (max === 0) {
    return (
      <div className="rounded-[28px] bg-graphite-800 p-8 text-center">
        <p className="display text-3xl">{t.war.notStarted}</p>
        <p className="mx-auto mt-3 max-w-md text-bone-dim">{t.war.notStartedNote}</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[28px] bg-graphite-800">
      <table className="w-full border-collapse text-left">
        <caption className="sr-only">
          {t.war.title} — {t.common.demoData}
        </caption>
        <thead>
          <tr className="border-b border-graphite-600 font-sans text-xs text-bone-muted">
            <th scope="col" className="w-12 px-3 py-3 sm:w-16 sm:px-5">{t.war.rank}</th>
            <th scope="col" className="px-3 py-3 sm:px-5">{t.war.faction}</th>
            <th scope="col" className="hidden px-3 py-3 text-right md:table-cell">{t.war.community}</th>
            <th scope="col" className="hidden px-3 py-3 text-right md:table-cell">{t.war.missions}</th>
            <th scope="col" className="hidden px-3 py-3 text-right md:table-cell">{t.war.events}</th>
            <th scope="col" className="px-3 py-3 text-right sm:px-5">{t.war.total}</th>
          </tr>
        </thead>
        <tbody>
          {ranked.map((row, i) => {
            const f = factionById(row.faction)!;
            const total = totalScore(row);
            return (
              <tr key={row.faction} className="border-b border-graphite-700 last:border-0">
                <td className="px-3 py-4 align-top font-display text-4xl font-semibold leading-none text-bone-muted sm:px-5">{i + 1}</td>
                <td className="px-3 py-4 sm:px-5">
                  <Link to={`/factions/${f.id}`} className="group flex items-center gap-3">
                    <span style={{ color: f.palette.primary }}>
                      <Emblem faction={f.id} className="h-7 w-7" />
                    </span>
                    <span className="font-display text-2xl font-semibold leading-none group-hover:underline sm:text-3xl">{l(f.name)}</span>
                  </Link>
                  {/* source breakdown: community / missions / events */}
                  <div
                    className="mt-3 flex h-2 overflow-hidden bg-graphite-700"
                    style={{ width: `${(total / max) * 100}%` }}
                    aria-hidden="true"
                  >
                    <span style={{ width: `${(row.community / total) * 100}%`, background: f.palette.primary }} />
                    <span style={{ width: `${(row.missions / total) * 100}%`, background: f.palette.primary, opacity: 0.55 }} />
                    <span style={{ width: `${(row.events / total) * 100}%`, background: f.palette.primary, opacity: 0.25 }} />
                  </div>
                  <p className="mt-2 font-sans text-xs text-bone-muted md:hidden">
                    {t.war.community} {row.community} · {t.war.missions} {row.missions} · {t.war.events} {row.events}
                  </p>
                </td>
                <td className="hidden px-3 py-4 text-right font-sans text-sm tabular-nums text-bone-dim md:table-cell">{row.community}</td>
                <td className="hidden px-3 py-4 text-right font-sans text-sm tabular-nums text-bone-dim md:table-cell">{row.missions}</td>
                <td className="hidden px-3 py-4 text-right font-sans text-sm tabular-nums text-bone-dim md:table-cell">{row.events}</td>
                <td className="px-3 py-4 text-right font-sans text-lg font-medium tabular-nums sm:px-5">{total}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
