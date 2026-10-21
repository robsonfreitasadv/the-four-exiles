import { Link } from 'react-router-dom';
import { Emblem } from '../components/art/Emblem';
import { LeaderboardTable } from '../components/Leaderboard';
import { Arrow, DemoDataBadge, SectionHeading } from '../components/ui/primitives';
import { aiCharacterById, aiCharacters, aiPosts, season0Log, type AiCharacter } from '../data/aiCharacters';
import { scoresBySeason } from '../data/championship';
import { factionById, factions } from '../data/factions';
import { useI18n } from '../i18n/I18nProvider';

function AiTag() {
  const { t } = useI18n();
  return (
    <span className="inline-flex shrink-0 items-center rounded-full bg-link/15 px-2 py-0.5 text-[11px] font-medium text-link">
      {t.season0.aiLabel}
    </span>
  );
}

function Author({ c }: { c: AiCharacter }) {
  const { l } = useI18n();
  const f = factionById(c.race)!;
  return (
    <span className="flex min-w-0 items-center gap-2">
      <span style={{ color: f.palette.primary }}>
        <Emblem faction={f.id} className="h-5 w-5" />
      </span>
      <span className="truncate font-semibold text-bone">{c.name}</span>
      <span className="hidden truncate text-xs text-bone-muted sm:inline">· {l(c.role)}</span>
    </span>
  );
}

/** The AI league: labeled AI characters warm up the championship before real people play. */
export function Season0Page() {
  const { t, l } = useI18n();
  const posts = [...aiPosts].sort((a, b) => b.day - a.day || b.id.localeCompare(a.id));
  const log = [...season0Log].sort((a, b) => a.day - b.day);

  return (
    <div className="container-x py-14 md:py-20">
      <SectionHeading as="h1" kicker={t.season0.kicker} title={t.season0.title} intro={t.season0.intro} aside={<DemoDataBadge label={t.war.aiBadge} />} />
      <p className="mx-auto mb-12 max-w-3xl rounded-2xl bg-link/10 p-4 text-center text-sm text-link">{t.season0.honesty}</p>

      <section className="grid gap-8 lg:grid-cols-[1.4fr_1fr]" aria-labelledby="s0-standings">
        <div>
          <h2 id="s0-standings" className="display mb-5 text-4xl">{t.season0.standings}</h2>
          <LeaderboardTable rows={scoresBySeason.s0} />
          <Link to="/choose" className="btn-primary mt-6">{t.season0.joinCta}</Link>
        </div>
        <div>
          <h2 className="display mb-5 text-4xl">{t.season0.rosterTitle}</h2>
          <ul className="space-y-3">
            {factions.map((f) => (
              <li key={f.id} className="rounded-[24px] bg-graphite-800 p-5">
                <p className="mb-3 flex items-center gap-2 font-display text-xl font-semibold" style={{ color: f.palette.primary }}>
                  <Emblem faction={f.id} className="h-5 w-5" /> {l(f.name)}
                </p>
                <ul className="space-y-2">
                  {aiCharacters
                    .filter((c) => c.race === f.id)
                    .map((c) => (
                      <li key={c.id}>
                        <p className="flex items-center justify-between gap-2">
                          <span className="font-semibold text-bone">{c.name}</span>
                          <AiTag />
                        </p>
                        <p className="text-sm text-bone-dim">{l(c.role)}</p>
                      </li>
                    ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-20" aria-labelledby="s0-feed">
        <h2 id="s0-feed" className="display mb-2 text-4xl sm:text-5xl">{t.season0.feedTitle}</h2>
        <p className="mb-8 max-w-2xl text-bone-dim">{t.season0.feedIntro}</p>
        <ol className="grid gap-4 md:grid-cols-2">
          {posts.map((p) => {
            const c = aiCharacterById(p.author);
            if (!c) return null;
            const parent = p.replyTo ? aiPosts.find((x) => x.id === p.replyTo) : undefined;
            const parentAuthor = parent ? aiCharacterById(parent.author) : undefined;
            return (
              <li key={p.id} className="rounded-[24px] bg-graphite-800 p-5" style={{ borderLeft: `4px solid ${factionById(c.race)!.palette.primary}` }}>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <Author c={c} />
                  <AiTag />
                </div>
                {parentAuthor && (
                  <p className="mb-2 text-xs text-bone-muted">
                    ↳ {t.season0.replyingTo} {parentAuthor.name}
                  </p>
                )}
                <p className="leading-relaxed text-bone">{l(p.text)}</p>
                <p className="mt-3 font-sans text-xs text-bone-muted">
                  {t.season0.day} {p.day} · {t.season0.kinds[p.kind]}
                </p>
              </li>
            );
          })}
        </ol>
      </section>

      <section className="mt-20" aria-labelledby="s0-log">
        <h2 id="s0-log" className="display mb-2 text-4xl sm:text-5xl">{t.season0.logTitle}</h2>
        <p className="mb-6 max-w-2xl text-bone-dim">{t.season0.logIntro}</p>
        <div className="overflow-x-auto rounded-[28px] bg-graphite-800">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="font-sans text-xs text-bone-muted">
              <tr className="border-b border-graphite-600">
                <th scope="col" className="p-4">{t.season0.day}</th>
                <th scope="col" className="p-4">{t.season0.author}</th>
                <th scope="col" className="p-4">{t.season0.category}</th>
                <th scope="col" className="p-4 text-right">{t.season0.points}</th>
                <th scope="col" className="p-4">{t.season0.reason}</th>
              </tr>
            </thead>
            <tbody>
              {log.map((e, i) => {
                const c = aiCharacterById(e.author);
                return (
                  <tr key={i} className="border-b border-graphite-700 align-top last:border-0">
                    <td className="p-4 tabular-nums text-bone-muted">{e.day}</td>
                    <td className="p-4">{c ? <Author c={c} /> : e.author}</td>
                    <td className="p-4 text-bone-dim">{t.war[e.category]}</td>
                    <td className="p-4 text-right tabular-nums text-bone">+{e.points}</td>
                    <td className="p-4 text-bone-dim">{l(e.reason)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <Link to="/transparency" className="link-arrow mt-6 text-bone">
          {t.nav.transparency} <Arrow />
        </Link>
      </section>
    </div>
  );
}
