import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Emblem } from '../components/art/Emblem';
import { RaceArt } from '../components/art/RaceArt';
import { CensusCard } from '../components/choose/CensusCard';
import { useCensus } from '../components/choose/chosenRace';
import { StatusBadge } from '../components/RaceDossier';
import { Arrow, SectionHeading } from '../components/ui/primitives';
import { CommunityCta } from '../components/CommunityCta';
import { quiz, raceCallById } from '../data/choose';
import { factionById, factions } from '../data/factions';
import type { FactionId } from '../data/types';
import { useI18n } from '../i18n/I18nProvider';

const RACES: FactionId[] = ['grays', 'nordics', 'reptilians', 'mantis'];

/** Tally answers; ties go to the race picked in the latest answer, then to list order. */
function quizWinner(answers: FactionId[]): FactionId {
  const count = new Map<FactionId, number>(RACES.map((r) => [r, 0]));
  answers.forEach((r) => count.set(r, (count.get(r) ?? 0) + 1));
  const best = Math.max(...count.values());
  const tied = RACES.filter((r) => count.get(r) === best);
  for (let i = answers.length - 1; i >= 0; i--) if (tied.includes(answers[i])) return answers[i];
  return tied[0];
}

function Quiz({ onResult }: { onResult: (race: FactionId) => void }) {
  const { t, l } = useI18n();
  const [answers, setAnswers] = useState<FactionId[]>([]);
  const step = answers.length;

  if (!quiz.length) return null;
  if (step >= quiz.length) {
    const race = quizWinner(answers);
    const f = factionById(race)!;
    return (
      <div className="rounded-[28px] p-6 sm:p-8" style={{ background: `linear-gradient(120deg, ${f.palette.secondary}, #161617)` }}>
        <p className="kicker mb-2">{t.choose.resultKicker}</p>
        <p className="display text-4xl sm:text-5xl" style={{ color: f.palette.accent }}>{l(f.name)}</p>
        <p className="mt-3 max-w-xl text-bone-dim">{l(raceCallById(race)?.forWho ?? f.tagline)}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <button type="button" className="btn-primary" onClick={() => onResult(race)}>
            {t.choose.joinRace.replace('{race}', l(f.name))}
          </button>
          <button type="button" className="btn-ghost" onClick={() => setAnswers([])}>
            {t.choose.retake}
          </button>
        </div>
      </div>
    );
  }

  const q = quiz[step];
  return (
    <div className="rounded-[28px] bg-graphite-800 p-6 sm:p-8">
      <p className="font-sans text-xs text-bone-muted">
        {t.choose.question.replace('{n}', String(step + 1)).replace('{total}', String(quiz.length))}
      </p>
      <div className="mt-2 h-1 overflow-hidden rounded-full bg-graphite-600" aria-hidden="true">
        <div className="h-full bg-bone transition-all" style={{ width: `${(step / quiz.length) * 100}%` }} />
      </div>
      <h3 className="display mt-5 text-2xl sm:text-3xl">{l(q.prompt)}</h3>
      <ul className="mt-6 grid gap-3">
        {q.options.map((o) => (
          <li key={o.race}>
            <button
              type="button"
              onClick={() => setAnswers([...answers, o.race])}
              className="w-full rounded-2xl border border-graphite-500 px-5 py-4 text-left text-bone-dim transition-colors hover:border-bone hover:text-bone"
            >
              {l(o.text)}
            </button>
          </li>
        ))}
      </ul>
      {step > 0 && (
        <button type="button" className="mt-4 text-sm text-bone-muted hover:text-bone" onClick={() => setAnswers(answers.slice(0, -1))}>
          ← {t.choose.back}
        </button>
      )}
    </div>
  );
}

export function ChoosePage() {
  const { t, l } = useI18n();
  const { entry, choose, rename, reset } = useCensus();

  function pick(race: FactionId) {
    choose(race);
    requestAnimationFrame(() => document.getElementById('census')?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  }

  return (
    <div className="container-x py-14 md:py-20">
      <SectionHeading as="h1" kicker={t.choose.kicker} title={t.choose.title} intro={t.choose.intro} />
      <blockquote className="mb-14 max-w-3xl border-l-4 border-[#e58a52] pl-5 text-lg leading-relaxed text-bone-dim">
        {t.choose.narrator}
        <footer className="mt-2 text-sm text-bone-muted">{t.choose.narratorBy}</footer>
      </blockquote>

      {entry && (
        <section id="census" className="mb-16 scroll-mt-24" aria-labelledby="census-title">
          <p className="kicker mb-3">{t.choose.yourRace}</p>
          <h2 id="census-title" className="display mb-6 text-4xl sm:text-5xl">{t.choose.cardTitle}</h2>
          <CensusCard key={entry.race + entry.number} entry={entry} onRename={rename} />
          <CommunityCta race={entry.race} className="mt-6" />
          <div className="mt-6 flex flex-wrap items-center gap-6">
            <Link to={`/factions/${entry.race}`} className="link-arrow text-bone">
              {t.choose.openDossier} <Arrow />
            </Link>
            <button type="button" className="text-sm text-bone-muted underline hover:text-bone" onClick={reset}>
              {t.choose.leave}
            </button>
          </div>
        </section>
      )}

      <section className="grid gap-10 lg:grid-cols-[1fr_1.2fr]" aria-labelledby="quiz-title">
        <div>
          <h2 id="quiz-title" className="display text-4xl sm:text-5xl">{t.choose.quizTitle}</h2>
          <p className="mt-3 max-w-md text-bone-dim">{t.choose.quizIntro}</p>
        </div>
        <Quiz onResult={pick} />
      </section>

      <section className="mt-20" aria-labelledby="pick-title">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 id="pick-title" className="display text-4xl sm:text-5xl">{t.choose.pickTitle}</h2>
            <p className="mt-3 max-w-2xl text-bone-dim">{t.choose.pickIntro}</p>
          </div>
          <StatusBadge status="PROVISIONAL" />
        </div>
        <ul className="grid gap-6 md:grid-cols-2">
          {factions.map((f) => {
            const call = raceCallById(f.id);
            const mine = entry?.race === f.id;
            return (
              <li key={f.id} className="flex flex-col overflow-hidden rounded-[32px] bg-graphite-800">
                <div className="relative aspect-[16/9]" style={{ background: f.palette.secondary }}>
                  <RaceArt faction={f} decorative />
                </div>
                <div className="flex flex-1 flex-col p-6 sm:p-8">
                  <p className="flex items-center gap-2 text-sm font-semibold" style={{ color: f.palette.primary }}>
                    <Emblem faction={f.id} className="h-5 w-5" /> {l(f.title)}
                  </p>
                  <h3 className="display mt-2 text-4xl" style={{ color: f.palette.accent }}>{l(f.name)}</h3>
                  {call && (
                    <>
                      <p className="mt-2 font-display text-xl font-semibold text-bone">“{l(call.pitch)}”</p>
                      <h4 className="mt-5 text-xs font-semibold text-bone-muted">{t.choose.virtues}</h4>
                      <ul className="mt-2 space-y-1.5 text-bone-dim">
                        {call.virtues.map((v) => (
                          <li key={v.en} className="flex gap-2">
                            <span style={{ color: f.palette.primary }} aria-hidden="true">+</span>
                            {l(v)}
                          </li>
                        ))}
                      </ul>
                      <h4 className="mt-5 text-xs font-semibold text-bone-muted">{t.choose.offer}</h4>
                      <p className="mt-2 leading-relaxed text-bone-dim">{l(call.offer)}</p>
                      <h4 className="mt-5 text-xs font-semibold text-bone-muted">{t.choose.forWho}</h4>
                      <p className="mt-2 leading-relaxed text-bone">{l(call.forWho)}</p>
                    </>
                  )}
                  <div className="mt-auto pt-6">
                    <button
                      type="button"
                      onClick={() => pick(f.id)}
                      aria-pressed={mine}
                      className={mine ? 'btn-ghost' : 'btn-primary'}
                    >
                      {mine ? t.choose.chosen : t.choose.joinRace.replace('{race}', l(f.name))}
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
