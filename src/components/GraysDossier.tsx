import type { ReactNode } from 'react';
import { grays, graysCharactersShown, type LoreStatus } from '../data/lore/grays';
import { useI18n } from '../i18n/I18nProvider';
import { Reveal } from './ui/primitives';

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI'];

/** Every block carries its status, so provisional lore never reads as official. */
export function StatusBadge({ status }: { status: LoreStatus }) {
  const { t } = useI18n();
  const map: Record<LoreStatus, [string, string]> = {
    CANON_APPROVED: [t.dossier.canon, 'bg-[#30d158]/15 text-[#5fe07f]'],
    PROVISIONAL: [t.dossier.provisional, 'bg-[#ffd60a]/15 text-[#ffd60a]'],
    OPEN_QUESTION: [t.dossier.open, 'bg-link/15 text-link'],
  };
  const [label, cls] = map[status];
  return <span className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${cls}`}>{label}</span>;
}

export function Block({ title, status, children, className = '' }: { title: string; status: LoreStatus; children: ReactNode; className?: string }) {
  return (
    <Reveal className={`rounded-[28px] bg-graphite-800 p-6 sm:p-7 ${className}`}>
      <div className="mb-4 flex items-start justify-between gap-3">
        <h3 className="display text-2xl">{title}</h3>
        <StatusBadge status={status} />
      </div>
      {children}
    </Reveal>
  );
}

/** The Grays dossier from docs/lore/grays.json, shown on the Grays page (/grays). */
export function GraysDossier() {
  const { t, l, lang } = useI18n();
  const g = grays;

  return (
    <section className="container-x pt-16 md:pt-24" aria-labelledby="dossier">
      <div className="mb-10 max-w-3xl">
        <p className="kicker mb-3">{t.dossier.kicker}</p>
        <h2 id="dossier" className="display text-5xl sm:text-6xl">
          {t.dossier.title}
        </h2>
        <p className="mt-5 text-xl font-semibold tracking-[-0.02em] text-bone">{l(g.tagline)}</p>
        <p className="mt-3 text-lg text-bone-dim">{l(g.summary)}</p>
        <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#ffd60a]/10 px-3 py-1.5 text-sm text-[#ffd60a]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#ffd60a]" aria-hidden="true" />
          {t.dossier.inDevelopment} · {t.dossier.statusLegend}
        </p>
      </div>

      {/* approved canon */}
      <Block title={t.dossier.approvedTitle} status="CANON_APPROVED" className="mb-4">
        <ul className="grid gap-x-8 gap-y-3 md:grid-cols-2">
          {g.approved.map((item) => (
            <li key={item.id} className="flex gap-3 text-bone-dim">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#30d158]" aria-hidden="true" />
              {l(item.text)}
            </li>
          ))}
        </ul>
      </Block>

      <div className="grid gap-4 md:grid-cols-2">
        <Block title={`${t.dossier.homeworld}: ${l(g.homeworld.name)}`} status={g.homeworld.status}>
          <p className="text-bone-dim">{l(g.homeworld.description)}</p>
        </Block>

        <Block title={t.dossier.appearance} status={g.appearance.status}>
          <p className="text-bone-dim">{l(g.appearance.text)}</p>
          <h4 className="mt-4 text-xs font-semibold text-bone-muted">{t.dossier.variants}</h4>
          <ul className="mt-2 space-y-1.5 text-bone-dim">
            {g.appearance.variants[lang].map((v) => (
              <li key={v} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-bone-muted" aria-hidden="true" />
                {v}
              </li>
            ))}
          </ul>
        </Block>
      </div>

      {/* eras */}
      <Block title={t.dossier.eras} status={g.eras.status} className="mt-4">
        <ol className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {g.eras.items.map((era, i) => (
            <li key={era.id} className="rounded-2xl bg-black/40 p-4">
              <p className="text-xs font-semibold text-signal">
                {t.dossier.era} {ROMAN[i]}
              </p>
              <p className="mt-1 font-display text-lg font-semibold tracking-[-0.01em]">{l(era.name)}</p>
            </li>
          ))}
        </ol>
      </Block>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <Block title={t.dossier.ancientDecision} status={g.ancientDecision.status}>
          <p className="text-bone-dim">{l(g.ancientDecision.text)}</p>
        </Block>
        <Block title={t.dossier.humanContact} status={g.humanContact.status}>
          <p className="mb-2 text-sm text-bone-muted">
            {t.dossier.program} <span className="font-mono text-bone">{g.humanContact.programName}</span>
          </p>
          <p className="text-bone-dim">{l(g.humanContact.text)}</p>
        </Block>
      </div>

      {/* internal currents */}
      <Block title={t.dossier.currents} status={g.internalGroups.status} className="mt-4">
        <p className="mb-4 text-sm text-bone-muted">{l(g.internalGroups.note)}</p>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {g.internalGroups.groups.map((group) => (
            <li key={group.id} className="flex flex-col rounded-2xl bg-black/40 p-4">
              <p className="font-display text-lg font-semibold tracking-[-0.01em]">{l(group.name)}</p>
              <p className="mt-2 text-[15px] italic leading-snug text-bone-dim">“{l(group.motto)}”</p>
            </li>
          ))}
        </ul>
      </Block>

      <div className="mt-4 grid gap-4 md:grid-cols-[1fr_1.4fr]">
        <Block title={t.dossier.characters} status="CANON_APPROVED">
          <ul className="space-y-3">
            {graysCharactersShown.map((c) => (
              <li key={c.id} className="flex items-center justify-between gap-3">
                <span>
                  <span className="font-semibold">{c.name}</span>
                  <span className="block text-sm text-bone-dim">{l(c.role)}</span>
                </span>
                <StatusBadge status={c.status} />
              </li>
            ))}
          </ul>
        </Block>
        <Block title={t.dossier.questions} status="OPEN_QUESTION">
          <ol className="space-y-2.5">
            {g.openQuestions.map((q, i) => (
              <li key={q.id} className="flex gap-3 text-bone-dim">
                <span className="w-5 shrink-0 font-semibold text-link">{i + 1}</span>
                {l(q.text)}
              </li>
            ))}
          </ol>
        </Block>
      </div>

      <p className="mt-6 max-w-3xl text-sm text-bone-muted">{t.dossier.folklore}</p>
    </section>
  );
}
