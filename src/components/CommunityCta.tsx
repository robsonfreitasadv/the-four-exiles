import { community, communityLink } from '../data/community';
import { factionById } from '../data/factions';
import type { FactionId } from '../data/types';
import { useI18n } from '../i18n/I18nProvider';

/** Invitation to the race's community channel; shows "coming soon" until the invite exists. */
export function CommunityCta({ race, className = '' }: { race?: FactionId; className?: string }) {
  const { t, l } = useI18n();
  const f = race ? factionById(race) : undefined;
  const href = communityLink(race);
  const channel = race ? community.races[race].channel : '';
  const color = f?.palette.primary ?? '#e58a52';

  return (
    <div className={`flex flex-col gap-4 rounded-[28px] bg-graphite-800 p-6 sm:flex-row sm:items-center sm:justify-between ${className}`}>
      <div className="min-w-0">
        <p className="text-xs font-semibold" style={{ color }}>
          {t.community.kicker} · {community.platform}
        </p>
        <p className="mt-1 font-display text-2xl font-semibold text-bone">
          {f ? t.community.titleRace.replace('{race}', l(f.name)) : t.community.title}
        </p>
        <p className="mt-1 text-sm text-bone-dim">
          {channel ? `${channel} · ` : ''}
          {href ? t.community.body : t.community.soonNote}
        </p>
      </div>
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className="btn-primary shrink-0">
          {t.community.join}
        </a>
      ) : (
        <span className="shrink-0 rounded-full border border-bone/20 px-4 py-2 text-sm text-bone-muted">{t.community.soon}</span>
      )}
    </div>
  );
}
