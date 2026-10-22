import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { soundtrack, type ThemeId } from '../audio/music';
import type { FactionId } from '../data/types';
import { useI18n } from '../i18n/I18nProvider';
import { useCensus } from './choose/chosenRace';

const KEY = 'four-exiles:sound';
const RACES: FactionId[] = ['grays', 'nordics', 'reptilians', 'mantis'];

function readPref(): boolean {
  try {
    return localStorage.getItem(KEY) === 'on';
  } catch {
    return false;
  }
}

function writePref(on: boolean) {
  try {
    if (on) localStorage.setItem(KEY, 'on');
    else localStorage.removeItem(KEY);
  } catch {
    // Storage blocked: the switch still works for this visit.
  }
}

/** The race whose theme fits this page: the race being viewed, else the visitor's race, else the Census theme. */
function themeFor(pathname: string, chosen?: FactionId): ThemeId {
  const match = RACES.find((r) => pathname === `/${r}` || pathname.startsWith(`/factions/${r}`));
  return match ?? chosen ?? 'census';
}

/** Header switch for the generative soundtrack. Off by default; browsers only allow sound after a tap. */
export function SoundToggle() {
  const { t } = useI18n();
  const { pathname } = useLocation();
  const { entry } = useCensus();
  const [on, setOn] = useState(false);
  const theme = themeFor(pathname, entry?.race);

  // Remembered "on": resume at the visitor's first tap anywhere.
  useEffect(() => {
    if (!readPref()) return;
    const resume = () => {
      setOn(true);
      void soundtrack.start(theme);
    };
    window.addEventListener('pointerdown', resume, { once: true });
    return () => window.removeEventListener('pointerdown', resume);
    // Only on first load; theme changes are handled below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (on) soundtrack.setTheme(theme);
  }, [on, theme]);

  useEffect(() => () => soundtrack.stop(), []);

  function toggle() {
    if (on) {
      soundtrack.stop();
      setOn(false);
      writePref(false);
    } else {
      void soundtrack.start(theme);
      setOn(true);
      writePref(true);
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={on}
      aria-label={on ? t.sound.off : t.sound.on}
      title={on ? t.sound.off : t.sound.on}
      className="grid h-8 w-8 place-items-center rounded-full text-bone/70 transition-colors hover:bg-white/10 hover:text-bone"
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor" stroke="none" />
        {on ? (
          <>
            <path d="M16.5 8.5a5 5 0 0 1 0 7" />
            <path d="M19 6a8.5 8.5 0 0 1 0 12" />
          </>
        ) : (
          <path d="M17 9l5 6M22 9l-5 6" />
        )}
      </svg>
    </button>
  );
}
