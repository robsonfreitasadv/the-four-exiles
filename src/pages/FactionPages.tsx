import { Link, useParams } from 'react-router-dom';
import { Emblem } from '../components/art/Emblem';
import { RaceArt } from '../components/art/RaceArt';
import { withBase } from '../components/art/CharacterImage';
import { TurnaroundViewer } from '../components/art/TurnaroundViewer';
import { RacesShowcase } from '../components/RacesShowcase';
import { GraysDossier } from '../components/GraysDossier';
import { FactionCard } from '../components/FactionCard';
import { MissionCard } from '../components/MissionCard';
import { Arrow, SectionHeading } from '../components/ui/primitives';
import { factionById, factions } from '../data/factions';
import { missions } from '../data/missions';
import { useI18n } from '../i18n/I18nProvider';
import { NotFoundPage } from './NotFoundPage';

export function FactionsPage() {
  const { t, l } = useI18n();
  return (
    <div className="container-x py-14 md:py-20">
      <SectionHeading as="h1" kicker={t.factionsSection.kicker} title={t.factionsPage.title} intro={t.factionsPage.intro} />
      <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {factions.map((f, i) => (
          <li key={f.id}>
            <FactionCard faction={f} index={i} />
          </li>
        ))}
      </ul>
      <div className="mt-16 overflow-x-auto rounded-[28px] bg-graphite-800">
        <table className="w-full min-w-[720px] text-left text-[15px]">
          <thead className="font-sans text-xs text-bone-muted">
            <tr className="border-b border-graphite-600">
              <th scope="col" className="p-4">{t.war.faction}</th>
              <th scope="col" className="p-4">{t.common.claim}</th>
              <th scope="col" className="p-4">{t.factionPage.motivation}</th>
              <th scope="col" className="p-4">{t.factionsSection.contradiction}</th>
            </tr>
          </thead>
          <tbody>
            {factions.map((f) => (
              <tr key={f.id} className="border-b border-graphite-700 align-top last:border-0">
                <th scope="row" className="p-4 font-display text-2xl font-semibold" style={{ color: f.palette.primary }}>
                  <Link to={`/factions/${f.id}`} className="hover:underline">{f.name}</Link>
                </th>
                <td className="p-4 font-sans text-xs text-bone-dim">{l(f.claimBasis)}</td>
                <td className="p-4 text-bone-dim">{l(f.motivation)}</td>
                <td className="p-4 text-bone">{l(f.contradiction)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="-mx-4 mt-8 sm:-mx-6 lg:-mx-8">
        <RacesShowcase />
      </div>
    </div>
  );
}

export function FactionDetailPage() {
  const { id = '' } = useParams();
  const { t, l } = useI18n();
  const f = factionById(id);
  if (!f) return <NotFoundPage />;

  const related = missions.filter((m) => m.faction === f.id);
  const others = factions.filter((o) => o.id !== f.id);
  const p = f.palette;

  return (
    <article style={{ ['--fc' as string]: p.primary }}>
      {/* hero */}
      <header className="relative overflow-hidden" style={{ background: `linear-gradient(to bottom, ${p.secondary}, #000)` }}>
        <div className="container-x grid items-center gap-10 py-10 md:grid-cols-[1.1fr_1fr] md:py-16">
          <div>
            <Link to="/factions" className="link-arrow mb-8">
              <Arrow className="h-3.5 w-3.5 rotate-180" /> {t.common.backToFactions}
            </Link>
            <p className="kicker mb-4 flex items-center gap-2" style={{ color: p.primary }}>
              <Emblem faction={f.id} className="h-5 w-5" />
              {t.common.file} {f.code} · {l(f.mood)}
            </p>
            <h1 className="display text-[clamp(3rem,9vw,6.5rem)]" style={{ color: p.accent }}>
              {f.name}
            </h1>
            <p className="mt-2 font-display text-2xl font-semibold tracking-[-0.02em] sm:text-3xl" style={{ color: p.primary }}>
              {l(f.title)}
            </p>
            <p className="mt-6 max-w-xl text-xl leading-snug text-bone">{l(f.tagline)}</p>
            <dl className="mt-8 grid max-w-lg grid-cols-3 gap-4 border-t border-white/15 pt-5 text-sm">
              <div>
                <dt className="text-bone-muted">{t.common.homeworld}</dt>
                <dd className="mt-1 text-bone">{f.homeworld}</dd>
              </div>
              <div>
                <dt className="text-bone-muted">{t.common.height}</dt>
                <dd className="mt-1 text-bone">{f.height}</dd>
              </div>
              <div>
                <dt className="text-bone-muted">{t.common.claim}</dt>
                <dd className="mt-1 text-bone">{l(f.claimBasis)}</dd>
              </div>
            </dl>
          </div>
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[36px] shadow-2xl">
            <RaceArt faction={f} eager />
            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-black/60 px-3 py-1 text-xs text-bone-dim backdrop-blur">
              {t.common.placeholderArt}
            </span>
          </div>
        </div>
      </header>

      {/* identity */}
      <section className="container-x grid gap-12 py-16 md:py-24 lg:grid-cols-[1fr_1.6fr]" aria-labelledby="identity">
        <div>
          <p className="kicker mb-4">{t.factionPage.identity}</p>
          <h2 id="identity" className="display text-5xl sm:text-6xl">
            {l(f.contradiction)}
          </h2>
        </div>
        <dl className="grid gap-4 sm:grid-cols-2">
          {(
            [
              [t.factionPage.motivation, f.motivation],
              [t.factionPage.personality, f.personality],
              [t.factionPage.appearance, f.appearance],
              [t.factionPage.humor, f.comedy],
            ] as const
          ).map(([label, value]) => (
            <div key={label} className="rounded-[28px] bg-graphite-800 p-6">
              <dt className="mb-3 text-sm font-semibold text-[color:var(--fc)]">{label}</dt>
              <dd className="leading-relaxed text-bone-dim">{l(value)}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* featured character */}
      <section className="bg-space-900" aria-labelledby="leader">
        <div className="container-x grid items-center gap-10 py-16 md:grid-cols-[auto_1fr] md:py-20">
          <div className="relative mx-auto aspect-[5/6] w-56 overflow-hidden rounded-[28px] sm:w-64" style={{ borderColor: p.primary, background: p.secondary }}>
            <RaceArt faction={f} index={f.art.length - 1} decorative />
          </div>
          <div>
            <p className="kicker mb-3">{t.common.leader}</p>
            <h2 id="leader" className="display text-5xl sm:text-6xl">{l(f.leader.name)}</h2>
            <p className="mt-2 text-sm font-semibold text-[color:var(--fc)]">{l(f.leader.role)}</p>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-bone-dim">{l(f.leader.description)}</p>
            <blockquote className="mt-6 max-w-2xl border-l-4 pl-5 font-display text-2xl font-semibold leading-tight sm:text-3xl" style={{ borderColor: p.primary }}>
              {l(f.leader.quote)}
            </blockquote>
          </div>
        </div>
      </section>

      {/* meme potential */}
      <section className="container-x pt-16 md:pt-24" aria-labelledby="memes">
        <p className="kicker mb-3">{t.factionPage.memesKicker}</p>
        <h2 id="memes" className="display mb-8 text-5xl sm:text-6xl">{t.factionPage.memes}</h2>
        <ul className="grid gap-4 sm:grid-cols-2">
          {f.memes.map((m, i) => (
            <li
              key={m.en}
              className="relative rounded-[24px] border-l-4 bg-graphite-800 p-6 pr-12 font-display text-xl font-semibold leading-snug text-bone"
              style={{ borderColor: p.primary }}
            >
              {l(m)}
              <span className="absolute right-4 top-4 font-sans text-xs text-bone-muted">#{String(i + 1).padStart(2, '0')}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 3D sheet: turntable and expressions */}
      <section className="container-x pt-16 md:pt-24" aria-labelledby="sheet3d">
        <p className="kicker mb-3">{t.races3d.kicker}</p>
        <h2 id="sheet3d" className="display mb-8 text-5xl sm:text-6xl">“{l(f.quote)}”</h2>
        <div
          className="grid items-center gap-10 rounded-[36px] p-6 sm:p-10 md:grid-cols-[auto_1fr]"
          style={{ background: `radial-gradient(120% 90% at 20% 10%, ${p.secondary} 0%, #0b0b0d 70%)` }}
        >
          <TurnaroundViewer frames={f.sheet.turnaround} name={f.name} color={p.primary} className="md:w-[240px]" />
          <div className="min-w-0">
            <h3 className="text-xs font-semibold text-bone-muted">{t.races3d.traits}</h3>
            <ul className="mt-2 flex flex-wrap gap-2">
              {f.traits.map((tr) => (
                <li key={tr.en} className="rounded-full px-3 py-1 text-sm" style={{ background: `${p.primary}22`, color: p.accent }}>
                  {l(tr)}
                </li>
              ))}
            </ul>
            <h3 className="mt-8 text-xs font-semibold text-bone-muted">{t.races3d.expressions}</h3>
            <ul className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {f.sheet.expressions.map((src) => (
                <li key={src} className="aspect-[66/74] overflow-hidden rounded-2xl bg-black/40">
                  <img src={withBase(src)} alt="" loading="lazy" className="h-full w-full object-cover" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {f.id === 'vhal-ett' && <GraysDossier />}

      {/* timeline */}
      <section className="container-x py-16 md:py-24" aria-labelledby="timeline">
        <h2 id="timeline" className="display mb-10 text-5xl sm:text-6xl">{t.factionPage.timeline}</h2>
        <ol className="relative border-l-2 border-graphite-500 pl-8">
          {f.timeline.map((e) => (
            <li key={e.year} className="relative pb-10 last:pb-0">
              <span className="absolute -left-[41px] top-1 h-4 w-4 rounded-full border-4 border-black" style={{ background: p.primary }} aria-hidden="true" />
              <p className="font-sans text-sm text-[color:var(--fc)]">{e.year}</p>
              <p className="mt-1 max-w-2xl text-lg text-bone-dim">{l(e.text)}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* related missions */}
      <section className="container-x pb-16" aria-labelledby="related">
        <h2 id="related" className="display mb-8 text-4xl sm:text-5xl">{t.factionPage.related}</h2>
        {related.length ? (
          <ul className="grid gap-6 md:grid-cols-3">
            {related.map((m) => (
              <li key={m.slug}>
                <MissionCard mission={m} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-bone-dim">{t.factionPage.noMissions}</p>
        )}
      </section>

      {/* other factions */}
      <nav className="container-x" aria-labelledby="others">
        <h2 id="others" className="kicker mb-4">{t.factionPage.otherFactions}</h2>
        <ul className="grid gap-4 sm:grid-cols-3">
          {others.map((o) => (
            <li key={o.id}>
              <Link to={`/factions/${o.id}`} className="group flex items-center gap-4 rounded-[28px] bg-graphite-800 p-5 hover:bg-graphite-700">
                <span style={{ color: o.palette.primary }}>
                  <Emblem faction={o.id} className="h-8 w-8" />
                </span>
                <span className="font-display text-2xl font-semibold">{o.name}</span>
                <Arrow className="ml-auto h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </article>
  );
}
