import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { MissionThumb } from '../components/art/MissionThumb';
import { MissionCard } from '../components/MissionCard';
import { Arrow, DemoDataBadge, SectionHeading } from '../components/ui/primitives';
import { factionById, factions } from '../data/factions';
import { missionBySlug, missions } from '../data/missions';
import type { FactionId } from '../data/types';
import { useI18n } from '../i18n/I18nProvider';
import { NotFoundPage } from './NotFoundPage';

export function MissionsPage() {
  const { t, l } = useI18n();
  const [filter, setFilter] = useState<FactionId | 'all'>('all');
  const shown = filter === 'all' ? missions : missions.filter((m) => m.faction === filter);

  return (
    <div className="container-x py-14 md:py-20">
      <SectionHeading as="h1" kicker={t.missionsSection.kicker} title={t.missionsSection.title} intro={t.missionsSection.intro} aside={<DemoDataBadge />} />
      <div role="radiogroup" aria-label={t.war.faction} className="mb-8 flex flex-wrap gap-2">
        {(['all', ...factions.map((f) => f.id)] as const).map((id) => {
          const active = filter === id;
          return (
            <button
              key={id}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => setFilter(id)}
              className={`min-h-[40px] rounded-full border px-4 font-sans text-xs ${
                active ? 'border-bone bg-bone text-black' : 'border-graphite-500 text-bone-dim hover:border-bone hover:text-bone'
              }`}
            >
              {id === 'all' ? t.missionPage.filterAll : l(factionById(id)!.name)}
            </button>
          );
        })}
      </div>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((m) => (
          <li key={m.slug}>
            <MissionCard mission={m} />
          </li>
        ))}
      </ul>
    </div>
  );
}

const ACCEPT_KEY = 'four-exiles:accepted-missions';

function readAccepted(): string[] {
  try {
    return JSON.parse(localStorage.getItem(ACCEPT_KEY) ?? '[]');
  } catch {
    return [];
  }
}

export function MissionDetailPage() {
  const { slug = '' } = useParams();
  const { t, l } = useI18n();
  const mission = missionBySlug(slug);
  const [accepted, setAccepted] = useState<string[]>(readAccepted);

  useEffect(() => {
    try {
      localStorage.setItem(ACCEPT_KEY, JSON.stringify(accepted));
    } catch {
      /* storage unavailable: acceptance just won't persist */
    }
  }, [accepted]);

  if (!mission) return <NotFoundPage />;
  const faction = mission.faction === 'human' ? undefined : factionById(mission.faction);
  const isAccepted = accepted.includes(mission.slug);

  return (
    <article className="container-x py-14 md:py-20">
      <Link to="/missions" className="link-arrow mb-8 text-bone-dim hover:text-bone">
        <Arrow className="h-4 w-4 rotate-180" /> {t.missionPage.back}
      </Link>
      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div>
          {faction && (
            <Link to={`/factions/${faction.id}`} className="kicker mb-3 inline-block hover:underline" style={{ color: faction.palette.primary }}>
              {l(faction.name)} · {l(faction.title)}
            </Link>
          )}
          <h1 className="display text-6xl sm:text-7xl lg:text-8xl">{l(mission.title)}</h1>
          <p className="mt-6 text-xl leading-snug text-bone">{l(mission.summary)}</p>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-bone-dim">{l(mission.briefing)}</p>
          <h2 className="mt-10 font-display text-3xl font-semibold">{t.missionPage.objectives}</h2>
          <ol className="mt-4 space-y-3">
            {mission.objectives.map((o, i) => (
              <li key={i} className="flex gap-4 border-b border-graphite-600 pb-3 text-bone-dim">
                <span className="font-sans text-sm text-signal">{String(i + 1).padStart(2, '0')}</span>
                {l(o)}
              </li>
            ))}
          </ol>
        </div>
        <aside className="space-y-5 self-start">
          <div className="overflow-hidden rounded-[28px]">
            <MissionThumb kind={mission.thumb} className="aspect-[16/9] w-full" />
          </div>
          <dl className="panel grid grid-cols-2 gap-4 p-5 font-sans text-xs">
            <div>
              <dt className="text-bone-muted">{t.missionsSection.status}</dt>
              <dd className="mt-1">{t.status[mission.status]}</dd>
            </div>
            <div>
              <dt className="text-bone-muted">{t.missionsSection.difficulty}</dt>
              <dd className="mt-1">{t.difficulty[mission.difficulty]}</dd>
            </div>
            <div>
              <dt className="text-bone-muted">{t.missionsSection.reward}</dt>
              <dd className="mt-1">{t.reward[mission.reward]}</dd>
            </div>
            <div>
              <dt className="text-bone-muted">{t.war.missions}</dt>
              <dd className="mt-1">
                {mission.points} {t.common.points}
              </dd>
            </div>
          </dl>
          {mission.status === 'closed' ? (
            <p className="panel p-5 font-sans text-xs text-bone-muted">{t.missionPage.closedNote}</p>
          ) : (
            <div className="space-y-3">
              {isAccepted ? (
                <div className="flex flex-wrap items-center gap-3">
                  <span className="btn bg-[#30d158]/15 text-[#30d158]" role="status">
                    ✓ {t.missionPage.accepted}
                  </span>
                  <button type="button" className="link-arrow text-bone-dim" onClick={() => setAccepted((a) => a.filter((s) => s !== mission.slug))}>
                    {t.missionPage.reset}
                  </button>
                </div>
              ) : (
                <button type="button" className="btn-primary w-full" onClick={() => setAccepted((a) => [...a, mission.slug])}>
                  {t.missionPage.accept}
                </button>
              )}
              <p className="text-sm text-bone-muted">{t.missionPage.demoNote}</p>
            </div>
          )}
          <DemoDataBadge />
        </aside>
      </div>
    </article>
  );
}
