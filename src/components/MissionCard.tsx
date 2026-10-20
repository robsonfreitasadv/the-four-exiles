import { Link } from 'react-router-dom';
import { factionById } from '../data/factions';
import type { Mission } from '../data/types';
import { useI18n } from '../i18n/I18nProvider';
import { MissionThumb } from './art/MissionThumb';
import { Arrow } from './ui/primitives';

const difficultyPips: Record<Mission['difficulty'], number> = { trivial: 1, standard: 2, hazardous: 3, existential: 4 };

const statusStyle: Record<Mission['status'], string> = {
  open: 'bg-[#b6e36b] text-void',
  briefing: 'bg-[#e7c766] text-void',
  closed: 'bg-graphite-600 text-bone-dim',
};

export function MissionCard({ mission }: { mission: Mission }) {
  const { t, l } = useI18n();
  const faction = mission.faction === 'human' ? undefined : factionById(mission.faction);
  const color = faction?.palette.primary ?? '#c8642d';

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[28px] bg-graphite-800 transition-transform duration-300 hover:-translate-y-1 motion-reduce:transition-none">
      <div className="relative aspect-[16/9] overflow-hidden">
        <MissionThumb kind={mission.thumb} className="h-full w-full transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none" />
        <span className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-medium ${statusStyle[mission.status]}`}>
          {t.status[mission.status]}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="kicker mb-2" style={{ color }}>
          {faction?.name ?? 'Dora'}
        </p>
        <h3 className="display mb-3 text-[28px]">
          <Link to={`/missions/${mission.slug}`} className="after:absolute after:inset-0">
            {l(mission.title)}
          </Link>
        </h3>
        <p className="mb-5 flex-1 text-[15px] leading-snug text-bone-dim">{l(mission.summary)}</p>
        <dl className="mb-5 grid grid-cols-2 gap-3 border-t border-graphite-600 pt-4 text-xs">
          <div>
            <dt className="text-bone-muted">{t.missionsSection.difficulty}</dt>
            <dd className="mt-1 flex items-center gap-2 text-bone">
              <span className="flex gap-0.5" aria-hidden="true">
                {[1, 2, 3, 4].map((n) => (
                  <span key={n} className={`h-1.5 w-3 rounded-full ${n <= difficultyPips[mission.difficulty] ? 'bg-signal' : 'bg-graphite-600'}`} />
                ))}
              </span>
              {t.difficulty[mission.difficulty]}
            </dd>
          </div>
          <div>
            <dt className="text-bone-muted">{t.missionsSection.reward}</dt>
            <dd className="mt-1 text-bone">{t.reward[mission.reward]}</dd>
          </div>
        </dl>
        <span className="link-arrow">
          {t.common.viewDetails}
          <Arrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </article>
  );
}
