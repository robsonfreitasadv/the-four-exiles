import { languages, useI18n } from '../../i18n/I18nProvider';

/** Segmented control, Apple-style. */
export function LanguageSwitcher({ className = '' }: { className?: string }) {
  const { lang, setLang, t } = useI18n();
  return (
    <div role="group" aria-label={t.meta.language} className={`flex rounded-full bg-graphite-700 p-0.5 ${className}`}>
      {languages.map((l) => {
        const active = l.code === lang;
        return (
          <button
            key={l.code}
            type="button"
            lang={l.code}
            aria-pressed={active}
            aria-label={l.label}
            onClick={() => setLang(l.code)}
            className={`min-h-[32px] min-w-[44px] rounded-full px-3 text-xs font-medium transition-colors ${
              active ? 'bg-graphite-500 text-bone shadow-sm' : 'text-bone-dim hover:text-bone'
            }`}
          >
            {l.short}
          </button>
        );
      })}
    </div>
  );
}
