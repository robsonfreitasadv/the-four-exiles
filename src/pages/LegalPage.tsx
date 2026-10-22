import { useState } from 'react';
import { SectionHeading } from '../components/ui/primitives';
import { legal, localStorageKeys, toBeDefined } from '../data/legal';
import { privacyBlocks, termsBlocks } from '../data/legalText';
import { useI18n } from '../i18n/I18nProvider';

/** Privacy policy or terms of use: one readable column, numbered sections, contact block. */
export function LegalPage({ kind }: { kind: 'privacy' | 'terms' }) {
  const { t, l, lang } = useI18n();
  const copy = t.stub[kind];
  const blocks = kind === 'privacy' ? privacyBlocks : termsBlocks;
  const [cleared, setCleared] = useState(false);
  const date = new Date(`${legal.lastUpdated}T12:00:00`).toLocaleDateString(lang, { day: 'numeric', month: 'long', year: 'numeric' });
  const value = (v: string) => v || l(toBeDefined);

  function clearData() {
    for (const key of localStorageKeys) {
      try {
        localStorage.removeItem(key);
      } catch {
        // Storage blocked: there is nothing saved to erase.
      }
    }
    setCleared(true);
    window.dispatchEvent(new Event('tfe-census-change'));
  }

  return (
    <div className="container-x py-14 md:py-20">
      <SectionHeading as="h1" kicker={t.nav[kind]} title={copy.title} intro={copy.intro} />
      <p className="-mt-6 mb-10 text-sm text-bone-muted">
        {t.legal.updated} {date}
      </p>
      <div className="max-w-3xl space-y-10">
        {blocks.map((b, i) => (
          <section key={b.title.en}>
            <h2 className="mb-3 font-display text-2xl font-semibold sm:text-3xl">
              <span className="mr-3 font-sans text-base text-signal">{String(i + 1).padStart(2, '0')}</span>
              {l(b.title)}
            </h2>
            <div className="space-y-3 text-[17px] leading-relaxed text-bone-dim">
              {b.items.map((item) => (
                <p key={item.en}>{l(item)}</p>
              ))}
            </div>
          </section>
        ))}

        <section className="rounded-[28px] bg-graphite-800 p-6 sm:p-8" aria-labelledby="contact">
          <h2 id="contact" className="mb-4 font-display text-2xl font-semibold">{t.legal.contactTitle}</h2>
          <dl className="grid gap-3 text-bone-dim sm:grid-cols-[auto_1fr] sm:gap-x-6">
            <dt className="text-sm text-bone-muted">{t.legal.controller}</dt>
            <dd className="text-bone">{value(legal.controller)}</dd>
            <dt className="text-sm text-bone-muted">{t.legal.email}</dt>
            <dd className="text-bone">
              {legal.contactEmail ? <a className="underline" href={`mailto:${legal.contactEmail}`}>{legal.contactEmail}</a> : value('')}
            </dd>
            {kind === 'privacy' && (
              <>
                <dt className="text-sm text-bone-muted">{t.legal.hosting}</dt>
                <dd className="text-bone">{value(legal.hosting)}</dd>
              </>
            )}
          </dl>
        </section>

        {kind === 'privacy' && (
          <section className="rounded-[28px] border border-graphite-600 p-6 sm:p-8" aria-labelledby="erase">
            <h2 id="erase" className="mb-2 font-display text-2xl font-semibold">{t.legal.clearTitle}</h2>
            <p className="mb-5 text-bone-dim">{t.legal.clearBody}</p>
            <button type="button" className="btn-ghost" onClick={clearData} disabled={cleared}>
              {cleared ? t.legal.cleared : t.legal.clearButton}
            </button>
          </section>
        )}
      </div>
    </div>
  );
}
