import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useI18n } from '../../i18n/I18nProvider';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Logo } from './Logo';
import { primaryNav } from './navigation';

export function SiteHeader() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 bg-black/75 backdrop-blur-xl backdrop-saturate-150">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:z-50 focus:rounded-full focus:bg-bone focus:px-4 focus:py-2 focus:text-black"
      >
        {t.meta.skip}
      </a>
      <div className="container-x flex h-12 items-center justify-between gap-6">
        <Logo />
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {primaryNav.slice(1).map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `text-xs transition-colors hover:text-bone ${isActive ? 'text-bone' : 'text-bone/70'}`
                  }
                >
                  {t.nav[item.key]}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <button
            type="button"
            className="flex h-10 w-10 flex-col items-center justify-center gap-[6px] lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t.meta.close : t.meta.menu}
            onClick={() => setOpen((v) => !v)}
          >
            <span className={`h-[1.5px] w-[18px] bg-bone transition-transform duration-300 ${open ? 'translate-y-[3.75px] rotate-45' : ''}`} />
            <span className={`h-[1.5px] w-[18px] bg-bone transition-transform duration-300 ${open ? '-translate-y-[3.75px] -rotate-45' : ''}`} />
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Primary" className="h-[calc(100dvh-3rem)] overflow-y-auto bg-black lg:hidden">
          <ul className="container-x pt-6">
            {primaryNav.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `block py-2.5 font-display text-[28px] font-semibold tracking-[-0.02em] ${isActive ? 'text-bone' : 'text-bone/70 hover:text-bone'}`
                  }
                >
                  {t.nav[item.key]}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
