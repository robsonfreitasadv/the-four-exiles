import type { ReactNode } from 'react';
import type { DossierCharacter, LoreStatus, RaceDossier as Dossier } from '../data/lore/dossier';
import { useI18n } from '../i18n/I18nProvider';
import { Reveal } from './ui/primitives';

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];

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

interface RaceDossierProps {
  dossier: Dossier;
  kicker: string;
  title: string;
  /** Characters to list inside the dossier (Grays). Other races show theirs in the characters section. */
  characters?: DossierCharacter[];
}

/** A race dossier from docs/lore/<race>.json. Blocks appear only when the file has them. */
export function RaceDossier({ dossier: g, kicker, title, characters }: RaceDossierProps) {
  const { t, l, lang } = useI18n();

  return (
    <section className="container-x pt-16 md:pt-24" aria-labelledby="dossier">
      <div className="mb-10 max-w-3xl">
        <p className="kicker mb-3">{kicker}</p>
        <h2 id="dossier" className="display text-5xl sm:text-6xl">
          {title}
        </h2>
        <p className="mt-5 text-xl font-semibold tracking-[-0.02em] text-bone">{l(g.tagline)}</p>
        <p className="mt-3 text-lg text-bone-dim">{l(g.summary)}</p>
        <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#ffd60a]/10 px-3 py-1.5 text-sm text-[#ffd60a]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#ffd60a]" aria-hidden="true" />
          {t.dossier.inDevelopment} · {t.dossier.statusLegend}
        </p>
      </div>

      {g.approved.length > 0 && (
        <Block title={t.dossier.approvedTitle} status="CANON_APPROVED" className="mb-4">
          <ul className="grid gap-x-8 gap-y-3 md:grid-cols-2">
            {g.approved.map((item) => (
              <li key={item.id} className="flex gap-3 text-bone-dim">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#30d158]" aria-hidden="true" />
                {/* approved items may mention that a detail is still provisional; show that in plain words */}
                {l(item.text).replace(/\bPROVISIONAL\b/g, t.dossier.provisional.toLowerCase())}
              </li>
            ))}
          </ul>
        </Block>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {g.homeworld && (
          <Block title={`${t.dossier.homeworld}: ${l(g.homeworld.name)}`} status={g.homeworld.status}>
            <p className="text-bone-dim">{l(g.homeworld.description)}</p>
          </Block>
        )}
        {g.appearance && (
          <Block title={t.dossier.appearance} status={g.appearance.status}>
            <p className="text-bone-dim">{l(g.appearance.text)}</p>
            {g.appearance.variants && (
              <>
                <h4 className="mt-4 text-xs font-semibold text-bone-muted">{t.dossier.variants}</h4>
                <ul className="mt-2 space-y-1.5 text-bone-dim">
                  {g.appearance.variants[lang].map((v) => (
                    <li key={v} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-bone-muted" aria-hidden="true" />
                      {v}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </Block>
        )}
      </div>

      {g.eras && (
        <Block title={t.dossier.eras} status={g.eras.status} className="mt-4">
          {g.eras.note && <p className="-mt-2 mb-4 text-sm text-bone-muted">{l(g.eras.note)}</p>}
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
      )}

      {(g.ancientDecision || g.humanContact) && (
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {g.ancientDecision && (
            <Block title={t.dossier.ancientDecision} status={g.ancientDecision.status}>
              <p className="text-bone-dim">{l(g.ancientDecision.text)}</p>
            </Block>
          )}
          {g.humanContact && (
            <Block title={t.dossier.humanContact} status={g.humanContact.status}>
              <p className="mb-2 text-sm text-bone-muted">
                {t.dossier.program} <span className="font-mono text-bone">{g.humanContact.programName}</span>
              </p>
              <p className="text-bone-dim">{l(g.humanContact.text)}</p>
            </Block>
          )}
        </div>
      )}

      {g.internalGroups && (
        <Block title={t.dossier.currents} status={g.internalGroups.status} className="mt-4">
          <p className="mb-4 text-sm text-bone-muted">{l(g.internalGroups.note)}</p>
          <ul className={`grid gap-3 sm:grid-cols-2 ${g.internalGroups.groups.length === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-5'}`}>
            {g.internalGroups.groups.map((group) => (
              <li key={group.id} className="flex flex-col rounded-2xl bg-black/40 p-4">
                <p className="font-display text-lg font-semibold tracking-[-0.01em]">{l(group.name)}</p>
                <p className="mt-2 text-[15px] italic leading-snug text-bone-dim">“{l(group.motto)}”</p>
              </li>
            ))}
          </ul>
        </Block>
      )}

      <div className={`mt-4 grid gap-4 ${characters ? 'md:grid-cols-[1fr_1.4fr]' : ''}`}>
        {characters && (
          <Block title={t.dossier.characters} status="CANON_APPROVED">
            <ul className="space-y-3">
              {characters.map((c) => (
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
        )}
        {g.openQuestions.length > 0 && (
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
        )}
      </div>

      <p className="mt-6 max-w-3xl text-sm text-bone-muted">{t.dossier.folklore}</p>
    </section>
  );
}
