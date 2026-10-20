import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Emblem } from '../components/art/Emblem';
import { RaceArt } from '../components/art/RaceArt';
import { TiltCard } from '../components/art/TiltCard';
import { ResistanceSection } from '../components/ResistanceSection';
import { withBase } from '../components/art/CharacterImage';
import { LeaderboardTable, SeasonSelector } from '../components/Leaderboard';
import { Arrow, DemoDataBadge, SectionHeading } from '../components/ui/primitives';
import { scoresBySeason } from '../data/championship';
import { factions } from '../data/factions';
import { collectibleConcepts, privacyBlocks, termsBlocks, transparencyBlocks, type InfoBlock } from '../data/pages';
import type { FactionId } from '../data/types';
import { useI18n } from '../i18n/I18nProvider';

/** Note shown on pages whose full version is scheduled for a later phase. */
function PhaseNotice({ phase }: { phase: 2 | 3 }) {
  const { t } = useI18n();
  return (
    <p className="mb-10 inline-flex items-center gap-2 rounded-full bg-graphite-800 px-4 py-2 text-xs text-bone-muted">
      <span className="h-2 w-2 bg-[#e7c766]" aria-hidden="true" />
      {t.common.phaseNote} · {t.stub.building} ({phase}/4)
    </p>
  );
}

export function GalacticWarPage() {
  const { t } = useI18n();
  const [season, setSeason] = useState('s1');
  return (
    <div className="container-x py-14 md:py-20">
      <SectionHeading as="h1" kicker={t.war.kicker} title={t.war.title} intro={t.war.subtitle} aside={<DemoDataBadge />} />
      <div className="mx-auto mb-8 max-w-3xl rounded-2xl bg-signal/10 p-4 text-center text-sm text-signal">
        {t.war.disclaimer}
      </div>
      <div className="grid gap-8 lg:grid-cols-[1.7fr_1fr]">
        <div className="space-y-4">
          <SeasonSelector value={season} onChange={setSeason} />
          <LeaderboardTable rows={scoresBySeason[season]} />
        </div>
        <aside className="panel space-y-4 self-start p-6">
          <h2 className="font-display text-3xl font-semibold">{t.war.howTitle}</h2>
          <ol className="space-y-4">
            {t.war.rules.map((r, i) => (
              <li key={r} className="flex gap-3 text-[15px] leading-snug text-bone-dim">
                <span className="font-sans text-xs text-signal">{String(i + 1).padStart(2, '0')}</span>
                {r}
              </li>
            ))}
          </ol>
          <Link to="/transparency" className="link-arrow text-bone">
            {t.nav.transparency} <Arrow />
          </Link>
        </aside>
      </div>
    </div>
  );
}

const yearValue = (y: string) => {
  const n = parseFloat(y.replace('−', '-').replace(/[,s≈ ]/g, ''));
  return Number.isNaN(n) ? 0 : n;
};

export function LorePage() {
  const { t, l } = useI18n();
  const [filter, setFilter] = useState<FactionId | 'all'>('all');
  const entries = factions
    .flatMap((f) => f.timeline.map((e) => ({ ...e, faction: f })))
    .filter((e) => filter === 'all' || e.faction.id === filter)
    .sort((a, b) => yearValue(a.year) - yearValue(b.year));

  return (
    <div className="container-x py-14 md:py-20">
      <SectionHeading as="h1" kicker={t.transmission.kicker} title={t.stub.lore.title} intro={t.stub.lore.intro} />
      <PhaseNotice phase={2} />
      <div role="radiogroup" aria-label={t.war.faction} className="mb-10 flex flex-wrap gap-2">
        {(['all', ...factions.map((f) => f.id)] as const).map((id) => (
          <button
            key={id}
            type="button"
            role="radio"
            aria-checked={filter === id}
            onClick={() => setFilter(id)}
            className={`min-h-[40px] rounded-full border px-4 font-sans text-xs ${
              filter === id ? 'border-bone bg-bone text-black' : 'border-graphite-500 text-bone-dim hover:border-bone hover:text-bone'
            }`}
          >
            {id === 'all' ? t.missionPage.filterAll : factions.find((f) => f.id === id)!.name}
          </button>
        ))}
      </div>
      <ol className="relative max-w-3xl border-l-2 border-graphite-500 pl-8">
        {entries.map((e) => (
          <li key={e.faction.id + e.year} className="relative pb-10">
            <span className="absolute -left-[41px] top-1 h-4 w-4 rounded-full border-4 border-black" style={{ background: e.faction.palette.primary }} aria-hidden="true" />
            <p className="font-sans text-sm">
              <span className="text-signal">{e.year}</span>
              <Link to={`/factions/${e.faction.id}`} className="ml-3 hover:underline" style={{ color: e.faction.palette.primary }}>
                {e.faction.name}
              </Link>
            </p>
            <p className="mt-1 text-lg text-bone-dim">{l(e.text)}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function CharactersPage() {
  const { t, l } = useI18n();
  return (
    <div className="py-14 md:py-20">
      <div className="container-x">
        <SectionHeading as="h1" kicker={t.common.file} title={t.stub.characters.title} intro={t.stub.characters.intro} />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {factions.map((f) => (
            <li key={f.id}>
              <TiltCard className="overflow-hidden rounded-[28px] bg-graphite-800">
                <div className="relative aspect-[310/516]">
                  <RaceArt faction={f} />
                </div>
                <div className="p-5" style={{ background: `linear-gradient(to bottom, ${f.palette.secondary}, #161617)` }}>
                  <p className="text-xs font-semibold" style={{ color: f.palette.primary }}>
                    {l(f.title)}
                  </p>
                  <h2 className="display mt-1 text-3xl">{f.name}</h2>
                  <p className="mt-2 text-[15px] text-bone/80">“{l(f.quote)}”</p>
                  <Link to={`/factions/${f.id}`} className="link-arrow mt-3 text-[15px]">
                    {t.common.explore} <Arrow />
                  </Link>
                </div>
              </TiltCard>
            </li>
          ))}
        </ul>
      </div>
      <ResistanceSection />
    </div>
  );
}

export function CollectiblesPage() {
  const { t, l } = useI18n();
  return (
    <div className="container-x py-14 md:py-20">
      <SectionHeading as="h1" kicker={t.common.placeholderArt} title={t.stub.collectibles.title} intro={t.stub.collectibles.intro} />
      <PhaseNotice phase={3} />
      <ul className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {factions.map((f) => (
          <li key={f.id} className="overflow-hidden rounded-[24px] bg-graphite-800 transition-transform duration-300 hover:-translate-y-1" style={{ borderColor: f.palette.primary }}>
            <div className="relative aspect-[3/4] overflow-hidden">
              <RaceArt faction={f} />
            </div>
            <div className="flex items-center justify-between p-4">
              <span className="font-display text-xl font-semibold leading-none">{l(f.leader.name)}</span>
              <Emblem faction={f.id} className="h-5 w-5" />
            </div>
          </li>
        ))}
      </ul>
      <div className="relative mt-6 aspect-[437/178] overflow-hidden rounded-[28px]">
        <img src={withBase('/images/characters/resistance-collectibles.webp')} alt={l({ en: 'Collectible card concepts: Dora and the Resistance crew over bright purple, yellow and teal backgrounds.', 'pt-BR': 'Conceitos de cards colecionáveis: Dora e a equipe da Resistência sobre fundos roxo, amarelo e verde-água.' })} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
      </div>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {collectibleConcepts.map((c) => (
          <li key={c.title.en} className="rounded-[24px] bg-graphite-800 p-6">
            <p className="kicker">{l(c.kind)}</p>
            <p className="mt-2 font-display text-2xl font-semibold leading-tight">{l(c.title)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function MarketPage() {
  const { t } = useI18n();
  return (
    <div className="container-x py-14 md:py-20">
      <SectionHeading as="h1" kicker={t.nav.market} title={t.stub.market.title} />
      <div className="max-w-3xl rounded-[36px] bg-graphite-800 p-8 sm:p-12">
        <p className="display text-4xl text-signal sm:text-5xl">{t.stub.market.intro}</p>
        <ul className="mt-8 space-y-4 text-lg text-bone-dim">
          {t.stub.market.body.map((b) => (
            <li key={b} className="flex gap-3">
              <span className="mt-2 h-2 w-2 shrink-0 bg-signal" aria-hidden="true" />
              {b}
            </li>
          ))}
        </ul>
        <Link to="/transparency" className="btn-ghost mt-10">
          {t.nav.transparency}
        </Link>
      </div>
    </div>
  );
}

function BlockList({ blocks }: { blocks: InfoBlock[] }) {
  const { l } = useI18n();
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {blocks.map((b) => (
        <section key={b.title.en} className="rounded-[28px] bg-graphite-800 p-7 sm:p-8">
          <h2 className="mb-4 font-display text-3xl font-semibold">{l(b.title)}</h2>
          <ul className="space-y-3 text-bone-dim">
            {b.items.map((i) => (
              <li key={i.en} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-signal" aria-hidden="true" />
                {l(i)}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

export function TransparencyPage() {
  const { t } = useI18n();
  return (
    <div className="container-x py-14 md:py-20">
      <SectionHeading as="h1" kicker={t.nav.transparency} title={t.stub.transparency.title} intro={t.stub.transparency.intro} />
      <BlockList blocks={transparencyBlocks} />
    </div>
  );
}

export function LegalPage({ kind }: { kind: 'privacy' | 'terms' }) {
  const { t } = useI18n();
  const copy = t.stub[kind];
  return (
    <div className="container-x py-14 md:py-20">
      <SectionHeading as="h1" kicker={t.nav[kind]} title={copy.title} intro={copy.intro} />
      <BlockList blocks={kind === 'privacy' ? privacyBlocks : termsBlocks} />
    </div>
  );
}
