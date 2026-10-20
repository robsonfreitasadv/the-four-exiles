import { Link } from 'react-router-dom';
import { RaceArt } from '../components/art/RaceArt';
import { TiltCard } from '../components/art/TiltCard';
import { Block, GraysDossier, StatusBadge } from '../components/GraysDossier';
import { Arrow, Reveal } from '../components/ui/primitives';
import { factionById } from '../data/factions';
import { graysCivilization as civ } from '../data/lore/graysCivilization';
import { useI18n } from '../i18n/I18nProvider';
import type { Dictionary } from '../i18n/en';

type GraysKey = keyof Dictionary['grays'];

const SECTIONS: { id: string; key: GraysKey }[] = [
  { id: 'g-dossier', key: 'dossier' },
  { id: 'g-society', key: 'society' },
  { id: 'g-humor', key: 'humor' },
  { id: 'g-military', key: 'military' },
  { id: 'g-ships', key: 'ships' },
  { id: 'g-tech', key: 'techLimits' },
  { id: 'g-powers', key: 'powers' },
  { id: 'g-characters', key: 'characters' },
];

function SectionTitle({ id, children }: { id: string; children: string }) {
  return (
    <h2 id={id} className="display mb-6 scroll-mt-28 text-4xl sm:text-5xl">
      {children}
    </h2>
  );
}

/** Everything about the Grays: the dossier plus the civilization file from the chat project. */
export function GraysPage() {
  const { t, l } = useI18n();
  const race = factionById('vhal-ett')!;
  const sete = race.leader;

  const jump = (id: string) => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    document.getElementById(id)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  };

  return (
    <article>
      {/* hero */}
      <header style={{ background: `linear-gradient(to bottom, ${race.palette.secondary}, #000)` }}>
        <div className="container-x grid items-center gap-10 py-12 md:grid-cols-[1.2fr_1fr] md:py-16">
          <div>
            <Link to="/factions/vhal-ett" className="link-arrow mb-8">
              <Arrow className="h-3.5 w-3.5 rotate-180" /> {t.grays.backToRace}
            </Link>
            <p className="kicker mb-3">{t.grays.kicker}</p>
            <h1 className="display text-[clamp(3rem,9vw,6.5rem)]" style={{ color: race.palette.accent }}>
              {t.grays.title}
            </h1>
            <p className="mt-5 max-w-xl text-xl text-bone-dim">{t.grays.intro}</p>
            <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#ffd60a]/10 px-3 py-1.5 text-sm text-[#ffd60a]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#ffd60a]" aria-hidden="true" />
              {t.dossier.inDevelopment} · {t.dossier.statusLegend}
            </p>
          </div>
          <TiltCard className="mx-auto w-full max-w-sm overflow-hidden rounded-[36px] shadow-2xl" max={8}>
            <div className="relative aspect-[310/516]">
              <RaceArt faction={race} eager />
            </div>
          </TiltCard>
        </div>
      </header>

      {/* section menu */}
      <nav aria-label={t.grays.jump} className="sticky top-12 z-30 bg-black/75 backdrop-blur-xl">
        <ul className="container-x flex gap-2 overflow-x-auto py-3 [scrollbar-width:none]">
          {SECTIONS.map((s) => (
            <li key={s.id} className="shrink-0">
              <button
                type="button"
                onClick={() => jump(s.id)}
                className="min-h-[36px] rounded-full bg-graphite-800 px-4 text-sm text-bone-dim transition-colors hover:bg-graphite-700 hover:text-bone"
              >
                {t.grays[s.key]}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* dossier (docs/lore/grays.json) */}
      <div id="g-dossier" className="scroll-mt-28">
        <GraysDossier />
      </div>

      <div className="container-x space-y-20 pt-20 md:space-y-28 md:pt-28">
        {/* society */}
        <section aria-labelledby="g-society">
          <SectionTitle id="g-society">{t.grays.society}</SectionTitle>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {civ.society.map(([key, sec]) => (
              <Block key={key} title={t.grays[key as GraysKey]} status={sec.status}>
                <p className="text-bone-dim">{l(sec.text)}</p>
              </Block>
            ))}
          </div>
        </section>

        {/* humor */}
        <section aria-labelledby="g-humor">
          <SectionTitle id="g-humor">{t.grays.humor}</SectionTitle>
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

        {/* military */}
        <section aria-labelledby="g-military">
          <SectionTitle id="g-military">{t.grays.military}</SectionTitle>
          <Block title={t.grays.military} status={civ.military.status}>
            <p className="max-w-3xl text-lg text-bone-dim">{l(civ.military.text)}</p>
          </Block>
        </section>

        {/* ships */}
        <section aria-labelledby="g-ships">
          <SectionTitle id="g-ships">{t.grays.ships}</SectionTitle>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {civ.ships.classes.map((ship) => (
              <Reveal as="li" key={ship.id} className="flex flex-col rounded-[28px] bg-graphite-800 p-6">
                <div className="mb-3 flex items-start justify-between gap-2">
                  <h3 className="display text-xl">{l(ship.name)}</h3>
                  <StatusBadge status={civ.ships.status} />
                </div>
                <p className="text-[15px] text-bone-dim">{l(ship.note)}</p>
              </Reveal>
            ))}
          </ul>
          <Block title={t.grays.propulsion} status={civ.ships.status} className="mt-4">
            <p className="text-bone-dim">{l(civ.ships.propulsion)}</p>
          </Block>
        </section>

        {/* technology limits */}
        <section aria-labelledby="g-tech">
          <SectionTitle id="g-tech">{t.grays.techLimits}</SectionTitle>
          <Reveal className="mb-4 flex items-start justify-between gap-3 rounded-[28px] bg-[#30d158]/10 p-6">
            <p className="text-bone">{t.grays.techNote}</p>
            <StatusBadge status={civ.techLimits.status} />
          </Reveal>
          <ul className="grid gap-4 sm:grid-cols-2">
            {civ.techLimits.items.map((item) => (
              <Reveal as="li" key={item.id} className="rounded-[28px] bg-graphite-800 p-6">
                <div className="mb-2 flex items-start justify-between gap-2">
                  <h3 className="display text-xl">{t.grays[item.id as GraysKey] ?? item.id}</h3>
                  <StatusBadge status={item.status} />
                </div>
                <p className="text-bone-dim">{l(item.limit)}</p>
              </Reveal>
            ))}
          </ul>
        </section>

        {/* rare powers */}
        <section aria-labelledby="g-powers">
          <SectionTitle id="g-powers">{t.grays.powers}</SectionTitle>
          <div className="grid gap-4 md:grid-cols-2">
            {civ.powers.items.map((p) => (
              <Block key={p.id} title={l(p.name)} status={civ.powers.status}>
                <p className="text-bone-dim">{l(p.description)}</p>
              </Block>
            ))}
          </div>
        </section>

        {/* characters */}
        <section aria-labelledby="g-characters">
          <SectionTitle id="g-characters">{t.grays.characters}</SectionTitle>
          <div className="grid gap-4 lg:grid-cols-[0.9fr_2fr]">
            {/* Sete: approved canon, with the official art */}
            <Reveal className="overflow-hidden rounded-[28px] bg-graphite-800">
              <div className="relative aspect-[4/3]">
                <RaceArt faction={race} decorative />
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="display text-3xl">{l(sete.name)}</h3>
                  <StatusBadge status="CANON_APPROVED" />
                </div>
                <p className="mt-1 text-sm font-semibold" style={{ color: race.palette.primary }}>
                  {l(sete.role)}
                </p>
                <p className="mt-3 text-[15px] text-bone-dim">{l(sete.description)}</p>
              </div>
            </Reveal>
            <ul className="grid gap-4 sm:grid-cols-2">
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
                        [t.grays.personality, c.personality],
                        [t.grays.contradiction, c.contradiction],
                        [t.grays.relationToSete, c.relationToSete],
                        [t.grays.silhouette, c.silhouette],
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
          <p className="mt-4 text-sm text-bone-muted">{t.grays.silhouetteNote}</p>
        </section>
      </div>
    </article>
  );
}
