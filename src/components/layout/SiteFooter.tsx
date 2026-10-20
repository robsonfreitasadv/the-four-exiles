import { Link } from 'react-router-dom';
import { factions } from '../../data/factions';
import { useI18n } from '../../i18n/I18nProvider';
import { Emblem } from '../art/Emblem';
import { Logo } from './Logo';
import { primaryNav, secondaryNav } from './navigation';

export function SiteFooter() {
  const { t } = useI18n();
  return (
    <footer className="mt-24 border-t border-graphite-600 bg-void">
      <div className="container-x grid gap-12 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="max-w-md space-y-5">
          <Logo />
          <p className="text-bone-dim">{t.footer.blurb}</p>
          <div className="flex gap-4">
            {factions.map((f) => (
              <Link key={f.id} to={`/factions/${f.id}`} aria-label={f.name} style={{ color: f.palette.primary }}>
                <Emblem faction={f.id} className="h-7 w-7 transition-transform hover:-translate-y-0.5" />
              </Link>
            ))}
          </div>
        </div>
        <nav aria-label={t.footer.explore}>
          <h2 className="kicker mb-4">{t.footer.explore}</h2>
          <ul className="space-y-2">
            {primaryNav.slice(1).map((i) => (
              <li key={i.to}>
                <Link to={i.to} className="text-bone-dim hover:text-bone">
                  {t.nav[i.key]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label={t.footer.project}>
          <h2 className="kicker mb-4">{t.footer.project}</h2>
          <ul className="space-y-2">
            {secondaryNav.map((i) => (
              <li key={i.to}>
                <Link to={i.to} className="text-bone-dim hover:text-bone">
                  {t.nav[i.key]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-graphite-700">
        <div className="container-x flex flex-col gap-3 py-6 font-sans text-xs leading-relaxed text-bone-muted md:flex-row md:justify-between">
          <p className="max-w-3xl">{t.footer.disclaimer}</p>
          <p className="shrink-0">THE FOUR EXILES · {t.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}
