import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { RaceArt } from '../components/art/RaceArt';
import { TiltCard } from '../components/art/TiltCard';
import { Block, StatusBadge } from '../components/GraysDossier';
import { Arrow, Reveal } from '../components/ui/primitives';
import { factionById } from '../data/factions';
import { civilizations } from '../data/lore/civilization';
import type { LoreStatus } from '../data/lore/grays';
import type { FactionId, Localized } from '../data/types';
import { useI18n } from '../i18n/I18nProvider';
import type { Dictionary } from '../i18n/en';

type CivKey = keyof Dictionary['civ'];
export type CivPageId = keyof Dictionary['civPages'];

interface CivilizationPageProps {
  race: FactionId & CivPageId;
  /** Optional race dossier shown before the civilization sections. */
  dossier?: ReactNode;
  /** The character on the official sheet: role and status when the lore defines them. */
  sheetCharacter?: { role?: Localized; status: LoreStatus };
  /** Status of the race's featured character, shown when it is not the sheet character. */
  leaderStatus: LoreStatus;
}

function SectionTitle({ id, children }: { id: string; children: string }) {
  return (
    <h2 id={id} className="display mb-6 scroll-mt-28 text-4xl sm:text-5xl">
      {children}
    </h2>
  );
}

/** A race's civilization file (docs/lore/<race>-civilization.json) as a page, with a status on every block. */
export function CivilizationPage({ race: raceId, dossier, sheetCharacter, leaderStatus }: CivilizationPageProps) {
  const { t, l } = useI18n();
  const race = factionById(raceId)!;
  const civ = civilizations[raceId]!;
  const page = t.civPages[raceId];
  const leader = race.leader;
  const leaderIsSheet = l(leader.name) === race.sheetCharacter;

  const sections: { id: string; key: CivKey; show: boolean }[] = [
    { id: 'c-dossier', key: 'dossier', show: !!dossier },
    { id: 'c-society', key: 'society', show: civ.society.length > 0 },
    { id: 'c-humor', key: 'humor', show: !!civ.humor },
    { id: 'c-military', key: 'military', show: !!civ.military },
    { id: 'c-ships', key: 'ships', show: !!civ.ships },
    { id: 'c-tech', key: 'techLimits', show: !!civ.techLimits },
    { id: 'c-powers', key: 'powers', show: !!civ.powers },
    { id: 'c-characters', key: 'characters', show: true },
  ];

  const jump = (id: string) => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    document.getElementById(id)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  };

  const relationLabel = (to: string) => `${t.civ.with} ${to === 'Humans' ? t.civ.humans : to}`;

  return (
    <article>
      {/* hero */}
      <header style={{ background: `linear-gradient(to bottom, ${race.palette.secondary}, #000)` }}>
        <div className="container-x grid items-center gap-10 py-12 md:grid-cols-[1.2fr_1fr] md:py-16">
          <div>
            <Link to={`/factions/${race.id}`} className="link-arrow mb-8">
              <Arrow className="h-3.5 w-3.5 rotate-180" /> {page.backToRace}
            </Link>
            <p className="kicker mb-3">{page.kicker}</p>
            <h1 className="display text-[clamp(3rem,9vw,6.5rem)]" style={{ color: race.palette.accent }}>
              {page.title}
            </h1>
            <p className="mt-5 max-w-xl text-xl text-bone-dim">{page.intro}</p>
            <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#ffd60a]/10 px-3 py-1.5 text-sm text-[#ffd60a]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#ffd60a]" aria-hidden="true" />
              {t.dossier.inDevelopment} · {t.dossier.statusLegend}
            </p>
          </div>
          <TiltCard className="mx-auto w-full max-w-sm overflow-hidden rounded-[36px] shadow-2xl" max={8}>
            <div className="relative aspect-[310/516]">
              <RaceArt faction={race} eager />
              <span className="absolute bottom-3 left-3 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-bone backdrop-blur">
                {race.sheetCharacter}
              </span>
            </div>
          </TiltCard>
        </div>
      </header>

      {/* section menu */}
      <nav aria-label={t.civ.jump} className="sticky top-12 z-30 bg-black/75 backdrop-blur-xl">
        <ul className="container-x flex gap-2 overflow-x-auto py-3 [scrollbar-width:none]">
          {sections
            .filter((s) => s.show)
            .map((s) => (
              <li key={s.id} className="shrink-0">
                <button
                  type="button"
                  onClick={() => jump(s.id)}
                  className="min-h-[36px] rounded-full bg-graphite-800 px-4 text-sm text-bone-dim transition-colors hover:bg-graphite-700 hover:text-bone"
                >
                  {t.civ[s.key]}
                </button>
              </li>
            ))}
        </ul>
      </nav>

      {dossier && (
        <div id="c-dossier" className="scroll-mt-28">
          {dossier}
        </div>
      )}

      <div className="container-x space-y-20 pt-20 md:space-y-28 md:pt-28">
        {civ.society.length > 0 && (
          <section aria-labelledby="c-society">
            <SectionTitle id="c-society">{t.civ.society}</SectionTitle>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {civ.society.map(({ key, section }) => (
                <Block key={key} title={t.civ[key]} status={section.status}>
                  <p className="text-bone-dim">{l(section.text)}</p>
                </Block>
              ))}
            </div>
          </section>
        )}

        {civ.humor && (
          <section aria-labelledby="c-humor">
            <SectionTitle id="c-humor">{t.civ.humor}</SectionTitle>
            <Reveal className="rounded-[36px] bg-graphite-800 p-6 sm:p-10">
              <div className="mb-6 flex items-start justify-between gap-3">
                <p className="text-xl font-semibold tracking-[-0.02em]">{l(civ.humor.text)}</p>
                <StatusBadge status={civ.humor.status} />
              </div>
              {civ.humor.example && (
                <ol className="space-y-3 font-mono text-[15px]">
                  {l(civ.humor.example)
                    .split(' / ')
                    .map((line, i) => (
                      <li
                        key={i}
                        className={`max-w-[80%] rounded-2xl px-4 py-3 ${i % 2 ? 'ml-auto bg-graphite-600 text-bone' : 'bg-black/50 text-bone-dim'}`}
                      >
                        {line.replace(/^"|"$/g, '')}
                      </li>
                    ))}
                </ol>
              )}
            </Reveal>
          </section>
        )}

        {civ.military && (
          <section aria-labelledby="c-military">
            <SectionTitle id="c-military">{t.civ.military}</SectionTitle>
            <Block title={t.civ.military} status={civ.military.status}>
              <p className="max-w-3xl text-lg text-bone-dim">{l(civ.military.text)}</p>
              {civ.military.weakness && (
                <p className="mt-4 max-w-3xl rounded-2xl bg-black/40 p-4 text-bone-dim">
                  <span className="mr-2 font-semibold text-signal">{t.civ.weakness}:</span>
                  {l(civ.military.weakness)}
                </p>
              )}
            </Block>
          </section>
        )}

        {civ.ships && (
          <section aria-labelledby="c-ships">
            <SectionTitle id="c-ships">{t.civ.ships}</SectionTitle>
            <ul className={`grid gap-4 sm:grid-cols-2 ${civ.ships.classes.length === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'}`}>
              {civ.ships.classes.map((ship) => (
                <Reveal as="li" key={ship.id} className="flex flex-col rounded-[28px] bg-graphite-800 p-6">
                  <div className="mb-3 flex items-start justify-between gap-2">
                    <h3 className="display text-xl">{l(ship.name)}</h3>
                    <StatusBadge status={civ.ships!.status} />
                  </div>
                  <p className="text-[15px] text-bone-dim">{l(ship.note)}</p>
                </Reveal>
              ))}
            </ul>
            {civ.ships.propulsion && (
              <Block title={t.civ.propulsion} status={civ.ships.status} className="mt-4">
                <p className="text-bone-dim">{l(civ.ships.propulsion)}</p>
              </Block>
            )}
          </section>
        )}

        {civ.techLimits && (
          <section aria-labelledby="c-tech">
            <SectionTitle id="c-tech">{t.civ.techLimits}</SectionTitle>
            <Reveal className="mb-4 flex items-start justify-between gap-3 rounded-[28px] bg-[#30d158]/10 p-6">
              <p className="text-bone">{t.civ.techNote}</p>
              <StatusBadge status={civ.techLimits.status} />
            </Reveal>
            <ul className="grid gap-4 sm:grid-cols-2">
              {civ.techLimits.items.map((item) => (
                <Reveal as="li" key={item.id} className="rounded-[28px] bg-graphite-800 p-6">
                  <div className="mb-2 flex items-start justify-between gap-2">
                    <h3 className="display text-xl">{t.civ[item.id as CivKey] ?? item.id}</h3>
                    <StatusBadge status={item.status} />
                  </div>
                  <p className="text-bone-dim">{l(item.limit)}</p>
                </Reveal>
              ))}
            </ul>
          </section>
        )}

        {civ.powers && (
          <section aria-labelledby="c-powers">
            <SectionTitle id="c-powers">{t.civ.powers}</SectionTitle>
            <div className="grid gap-4 md:grid-cols-2">
              {civ.powers.items.map((p) => (
                <Block key={p.id} title={l(p.name)} status={civ.powers!.status}>
                  <p className="text-bone-dim">{l(p.description)}</p>
                </Block>
              ))}
            </div>
          </section>
        )}

        {/* characters */}
        <section aria-labelledby="c-characters">
          <SectionTitle id="c-characters">{t.civ.characters}</SectionTitle>
          <div className="grid gap-4 lg:grid-cols-[0.9fr_2fr]">
            <div className="grid content-start gap-4">
              {/* the character on the official sheet, with the official art */}
              <Reveal className="overflow-hidden rounded-[28px] bg-graphite-800">
                <div className="relative aspect-[4/3]">
                  <RaceArt faction={race} decorative />
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="display text-3xl">{race.sheetCharacter}</h3>
                    <StatusBadge status={leaderIsSheet ? leaderStatus : sheetCharacter?.status ?? 'CANON_APPROVED'} />
                  </div>
                  <p className="mt-1 text-sm font-semibold" style={{ color: race.palette.primary }}>
                    {leaderIsSheet ? l(leader.role) : sheetCharacter?.role ? l(sheetCharacter.role) : `${t.civ.sheetCharacter} · ${l(race.title)}`}
                  </p>
                  {leaderIsSheet && <p className="mt-3 text-[15px] text-bone-dim">{l(leader.description)}</p>}
                </div>
              </Reveal>
              {/* the race's featured character, when it is someone else (no official art yet) */}
              {!leaderIsSheet && (
                <Reveal className="rounded-[28px] bg-graphite-800 p-6">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="display text-3xl">{l(leader.name)}</h3>
                    <StatusBadge status={leaderStatus} />
                  </div>
                  <p className="mt-1 text-sm font-semibold" style={{ color: race.palette.primary }}>
                    {l(leader.role)}
                  </p>
                  <p className="mt-3 text-[15px] text-bone-dim">{l(leader.description)}</p>
                </Reveal>
              )}
            </div>
            <ul className="grid content-start gap-4 sm:grid-cols-2">
              {civ.characters.map((c) => (
                <Reveal as="li" key={c.id} className="flex flex-col rounded-[28px] bg-graphite-800 p-6">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="display text-2xl">{c.name}</h3>
                    <StatusBadge status={c.status} />
                  </div>
                  <p className="mt-1 text-sm text-bone">{l(c.role)}</p>
                  <dl className="mt-4 space-y-3 text-[15px]">
                    {(
                      [
                        [t.civ.personality, c.personality],
                        [t.civ.contradiction, c.contradiction],
                        ...c.relations.map((r) => [relationLabel(r.to), r.text] as const),
                        [t.civ.silhouette, c.silhouette],
                      ] as const
                    ).map(([label, value]) =>
                      value ? (
                        <div key={label}>
                          <dt className="text-xs font-semibold text-bone-muted">{label}</dt>
                          <dd className="mt-0.5 text-bone-dim">{l(value)}</dd>
                        </div>
                      ) : null,
                    )}
                  </dl>
                </Reveal>
              ))}
            </ul>
          </div>
          <p className="mt-4 text-sm text-bone-muted">{t.civ.silhouetteNote}</p>
        </section>
      </div>
    </article>
  );
}
