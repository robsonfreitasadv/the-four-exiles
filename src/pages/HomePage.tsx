import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Portrait } from '../components/art/Portrait';
import { RaceArt } from '../components/art/RaceArt';
import { CharacterImage } from '../components/art/CharacterImage';
import { RacesShowcase } from '../components/RacesShowcase';
import { ResistanceSection } from '../components/ResistanceSection';
import { LeaderboardTable, SeasonSelector } from '../components/Leaderboard';
import { MissionCard } from '../components/MissionCard';
import { Arrow, DemoDataBadge, Reveal, SectionHeading } from '../components/ui/primitives';
import { scoresBySeason } from '../data/championship';
import { factions } from '../data/factions';
import { missions } from '../data/missions';
import { dora } from '../data/resistance';
import { useI18n } from '../i18n/I18nProvider';

export function HomePage() {
  return (
    <>
      <Hero />
      <RacesShowcase />
      <CensusSection />
      <ResistanceSection />
      <WarSection />
      <MissionsSection />
      <TransmissionSection />
      <JoinSection />
    </>
  );
}

function Hero() {
  const { t, l } = useI18n();
  return (
    <section className="overflow-hidden pb-16 pt-14 sm:pt-20" aria-labelledby="hero-title">
      <div className="container-x text-center">
        <p className="kicker mb-4">{t.hero.kicker}</p>
        <h1 id="hero-title" className="display mx-auto max-w-5xl text-[48px] sm:text-[72px] lg:text-[96px]">
          {t.hero.headline1} <span className="bg-gradient-to-r from-signal to-[#ffb36b] bg-clip-text text-transparent">{t.hero.headline2}</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-xl text-bone-dim sm:text-2xl">{t.hero.subtitle}</p>
        <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8">
          <Link to="/factions" className="btn-primary">
            {t.hero.primaryCta}
          </Link>
          <Link to="/galactic-war" className="link-arrow text-xl">
            {t.hero.secondaryCta}
            <Arrow className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* four races, side by side: one disputed planet */}
      <div className="container-x mt-14 sm:mt-20">
        <div className="relative grid grid-cols-2 gap-1.5 overflow-hidden rounded-[28px] sm:rounded-[36px] md:grid-cols-4">
          {factions.map((f, i) => (
            <Link
              key={f.id}
              to={`/factions/${f.id}`}
              className="group relative aspect-[3/4] overflow-hidden md:aspect-[9/16]"
              aria-label={`${f.name} — ${l(f.title)}`}
            >
              <RaceArt faction={f} eager decorative className="transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none" />
              <div
                className="absolute inset-0"
                style={{ background: `linear-gradient(to top, ${f.palette.secondary}f0 0%, transparent 45%)` }}
                aria-hidden="true"
              />
              <div className="absolute inset-x-0 bottom-0 p-4 text-left sm:p-5">
                <p className="text-xs font-semibold" style={{ color: f.palette.primary }}>
                  0{i + 1}
                </p>
                <p className="display text-xl sm:text-2xl">{f.name}</p>
              </div>
            </Link>
          ))}
          <div className="pointer-events-none absolute left-1/2 top-1/2 hidden h-28 w-28 -translate-x-1/2 -translate-y-1/2 md:block" aria-hidden="true">
            <svg viewBox="0 0 100 100" className="h-full w-full drop-shadow-[0_0_30px_rgba(95,168,201,0.6)]">
              <circle cx="50" cy="50" r="40" fill="#2f6f8f" stroke="#000" strokeWidth="4" />
              <path d="M22 40c10-12 26-10 32 0s-4 18-14 18c-8 2-12 10-18 8-4-8-6-18 0-26Z M62 30c12-2 20 8 18 18s-10 12-12 20c-6 6-14 2-12-6 2-8 8-10 6-18-2-6-6-12 0-14Z" fill="#5c7f4a" />
              <circle cx="50" cy="50" r="40" fill="url(#hero-earth-shade)" />
              <defs>
                <radialGradient id="hero-earth-shade" cx="0.35" cy="0.3" r="0.8">
                  <stop offset="0.55" stopColor="#000" stopOpacity="0" />
                  <stop offset="1" stopColor="#000" stopOpacity="0.6" />
                </radialGradient>
              </defs>
            </svg>
          </div>
        </div>
        <p className="mt-3 text-center text-xs text-bone-muted">{t.common.placeholderArt}</p>
      </div>
    </section>
  );
}

function CensusSection() {
  const { t , l } = useI18n();
  return (
    <section className="container-x py-20 md:py-28" aria-labelledby="census-title">
      <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
        <Reveal>
          <p className="kicker mb-3">{t.census.kicker}</p>
          <h2 id="census-title" className="display mb-8 text-[40px] sm:text-[56px]">
            {t.census.title}
          </h2>
          <div className="max-w-2xl space-y-5 text-lg text-bone-dim sm:text-xl">
            <p>{t.census.p1}</p>
            <p>{t.census.p2}</p>
            <p className="font-semibold text-bone">{t.census.p3}</p>
          </div>
        </Reveal>
        <Reveal as="div">
          <figure className="panel overflow-hidden">
            <div className="relative aspect-[5/6] bg-[#1d140f]">
              <CharacterImage
                image={{ ...dora.image, src: dora.sheet!.expressions[0], focus: '50% 30%' }}
                fallback={<Portrait character="dora" alt={t.census.doraAlt} className="absolute inset-x-0 bottom-0 h-[92%] w-full" />}
              />
            </div>
            <figcaption className="p-7">
              <p className="text-sm font-semibold text-[#e58a52]">{l(dora.role)}</p>
              <p className="display mt-1 text-4xl">{t.census.doraTitle}</p>
              <p className="mt-3 text-[17px] text-bone-dim">{t.census.doraBio}</p>
            </figcaption>
          </figure>
        </Reveal>
      </div>
      <ol className="mt-16 grid gap-5 md:grid-cols-3">
        {t.census.steps.map((s) => (
          <Reveal as="li" key={s.k} className="panel p-7">
            <span className="text-sm font-semibold text-signal">{s.k}</span>
            <h3 className="display mt-2 text-2xl">{s.t}</h3>
            <p className="mt-2 text-bone-dim">{s.d}</p>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}

function WarSection() {
  const { t } = useI18n();
  const [season, setSeason] = useState('s1');
  return (
    <section className="bg-space-900 py-20 md:py-28" aria-label={t.war.title}>
      <div className="container-x">
        <SectionHeading center kicker={t.war.kicker} title={t.war.title} intro={t.war.subtitle} />
        <div className="mb-6 flex flex-col items-center gap-4">
          <DemoDataBadge />
          <SeasonSelector value={season} onChange={setSeason} />
        </div>
        <div className="grid gap-5 lg:grid-cols-[1.7fr_1fr]">
          <div>
            <LeaderboardTable rows={scoresBySeason[season]} />
            <p className="mt-3 text-sm text-bone-muted">{t.war.disclaimer}</p>
          </div>
          <aside className="panel p-7">
            <h3 className="display mb-5 text-2xl">{t.war.howTitle}</h3>
            <ol className="space-y-4">
              {t.war.rules.map((r, i) => (
                <li key={r} className="flex gap-3 text-[15px] text-bone-dim">
                  <span className="font-semibold text-signal">{i + 1}</span>
                  <span className={i === t.war.rules.length - 1 ? 'font-semibold text-bone' : ''}>{r}</span>
                </li>
              ))}
            </ol>
            <Link to="/galactic-war" className="link-arrow mt-6">
              {t.war.cta} <Arrow />
            </Link>
          </aside>
        </div>
      </div>
    </section>
  );
}

function MissionsSection() {
  const { t } = useI18n();
  return (
    <section className="container-x py-20 md:py-28" aria-label={t.missionsSection.title}>
      <SectionHeading center kicker={t.missionsSection.kicker} title={t.missionsSection.title} intro={t.missionsSection.intro} />
      <ul className="grid gap-5 md:grid-cols-3">
        {missions.slice(0, 3).map((m) => (
          <Reveal as="li" key={m.slug}>
            <MissionCard mission={m} />
          </Reveal>
        ))}
      </ul>
      <p className="mt-10 text-center">
        <Link to="/missions" className="link-arrow">
          {t.missionsSection.all} <Arrow />
        </Link>
      </p>
    </section>
  );
}

function TransmissionSection() {
  const { t } = useI18n();
  return (
    <section className="container-x pb-20 md:pb-28" aria-labelledby="tx-title">
      <Reveal className="scanlines overflow-hidden rounded-[36px] bg-graphite-800">
        <div className="grid gap-10 p-8 sm:p-12 lg:grid-cols-[1fr_1.3fr] lg:p-16">
          <div>
            <p className="kicker mb-3 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-signal motion-safe:animate-pulse" aria-hidden="true" />
              {t.transmission.kicker}
            </p>
            <h2 id="tx-title" className="display text-[40px] sm:text-[48px]">
              {t.transmission.title}
            </h2>
            <Waveform />
            <p className="mt-2 text-sm text-bone-muted">{t.transmission.signal}: 31%</p>
            <Link to="/lore" className="btn-primary mt-8">
              {t.transmission.cta}
            </Link>
          </div>
          <ol className="space-y-4 self-center font-mono text-sm leading-relaxed">
            {t.transmission.lines.map((line, i) => {
              const last = i === t.transmission.lines.length - 1;
              return (
                <li key={line} className={last ? 'text-signal' : 'text-bone-dim'}>
                  <span className="mr-3 text-bone-muted">T+{String(i * 7).padStart(2, '0')}s</span>
                  {line}
                </li>
              );
            })}
          </ol>
        </div>
      </Reveal>
    </section>
  );
}

function Waveform() {
  const pts = Array.from({ length: 60 }, (_, i) => {
    const noise = Math.sin(i * 1.7) * Math.cos(i * 0.6) * (i % 7 === 0 ? 26 : 12);
    return `${i * 10},${30 + noise}`;
  }).join(' ');
  return (
    <svg viewBox="0 0 590 60" className="mt-8 h-14 w-full" aria-hidden="true">
      <polyline points={pts} fill="none" stroke="#ff6a3d" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

function JoinSection() {
  const { t } = useI18n();
  return (
    <section className="bg-space-900 py-20 md:py-28" aria-label={t.join.title}>
      <div className="container-x">
        <SectionHeading center kicker={t.join.kicker} title={t.join.title} intro={t.join.body} />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {t.join.items.map((item) => (
            <Reveal as="li" key={item.to}>
              <Link to={item.to} className="group flex h-full flex-col rounded-[28px] bg-graphite-800 p-7 transition-colors hover:bg-graphite-700">
                <span className="display text-2xl">{item.t}</span>
                <span className="mt-3 flex-1 text-[15px] text-bone-dim">{item.d}</span>
                <span className="mt-6 inline-flex items-center gap-1 text-[15px] text-link group-hover:underline">
                  {t.common.explore} <Arrow />
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
        <p className="mx-auto mt-10 max-w-xl text-center text-sm text-bone-muted">{t.join.note}</p>
      </div>
    </section>
  );
}
