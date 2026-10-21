import { useSyncExternalStore } from 'react';
import type { FactionId } from '../../data/types';

/**
 * The visitor's chosen race, kept only in this browser (localStorage).
 * No account, no server: losing it costs nothing, so every access is wrapped in try/catch.
 */

export interface CensusEntry {
  race: FactionId;
  /** Optional display name for the census card. */
  name: string;
  /** Random census number, assigned once. */
  number: string;
}

const KEY = 'tfe.census';
const EVENT = 'tfe-census-change';
const RACES: FactionId[] = ['grays', 'nordics', 'reptilians', 'mantis'];

function read(): CensusEntry | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const v = JSON.parse(raw) as CensusEntry;
    return RACES.includes(v.race) ? { race: v.race, name: String(v.name ?? '').slice(0, 40), number: String(v.number ?? '') } : null;
  } catch {
    return null;
  }
}

let cache: CensusEntry | null | undefined;
let cacheRaw: string | null | undefined;

function snapshot(): CensusEntry | null {
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(KEY);
  } catch {
    raw = null;
  }
  if (raw !== cacheRaw || cache === undefined) {
    cacheRaw = raw;
    cache = read();
  }
  return cache;
}

function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  window.addEventListener('storage', cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener('storage', cb);
  };
}

function write(entry: CensusEntry | null) {
  try {
    if (entry) localStorage.setItem(KEY, JSON.stringify(entry));
    else localStorage.removeItem(KEY);
  } catch {
    // Storage blocked (private mode): the choice simply lasts for this page view.
    cache = entry;
    cacheRaw = entry ? JSON.stringify(entry) : null;
  }
  window.dispatchEvent(new Event(EVENT));
}

function newNumber() {
  const n = Math.floor(Math.random() * 9_000_000) + 1_000_000;
  return `2049-${String(n).slice(0, 3)}.${String(n).slice(3)}`;
}

export function useCensus() {
  const entry = useSyncExternalStore(subscribe, snapshot, () => null);
  return {
    entry,
    choose(race: FactionId) {
      write({ race, name: entry?.name ?? '', number: entry?.number || newNumber() });
    },
    rename(name: string) {
      if (entry) write({ ...entry, name: name.slice(0, 40) });
    },
    reset() {
      write(null);
    },
  };
}
