/**
 * Civilization files, one per race, maintained with the chat project in docs/lore/<race>-civilization.json.
 * Edit the JSON, not this file. Everything is PROVISIONAL unless marked CANON_APPROVED.
 * Each file may include any subset of the sections below; the page shows only what exists.
 */
import graysRaw from '../../../docs/lore/grays-civilization.json';
import nordicsRaw from '../../../docs/lore/nordics-civilization.json';
import type { FactionId, Localized } from '../types';
import type { LoreStatus } from './grays';

export type SocietyKey = 'language' | 'economy' | 'art' | 'artAndRitual' | 'philosophy' | 'dailyLife';

interface TextSection {
  status: LoreStatus;
  text: Localized;
}

export interface CivCharacter {
  id: string;
  status: LoreStatus;
  name: string;
  role: Localized;
  personality?: Localized;
  contradiction?: Localized;
  silhouette?: Localized;
  /** From relationTo<Name> keys, e.g. relationToSete → { to: 'Sete' }. "Humans" means humans. */
  relations: { to: string; text: Localized }[];
}

export interface Civilization {
  society: { key: SocietyKey; section: TextSection }[];
  humor?: TextSection & { example?: Localized };
  military?: TextSection & { weakness?: Localized };
  ships?: { status: LoreStatus; classes: { id: string; name: Localized; note: Localized }[]; propulsion?: Localized };
  techLimits?: { status: LoreStatus; items: { id: string; status: LoreStatus; limit: Localized }[] };
  powers?: { status: LoreStatus; items: { id: string; name: Localized; description: Localized }[] };
  characters: CivCharacter[];
}

const SOCIETY: [string, SocietyKey][] = [
  ['language', 'language'],
  ['economy', 'economy'],
  ['art', 'art'],
  ['art_and_ritual', 'artAndRitual'],
  ['philosophy', 'philosophy'],
  ['daily_life', 'dailyLife'],
];

/* eslint-disable @typescript-eslint/no-explicit-any */
function toCivilization(raw: any, opts: { hideRelationsTo?: string[] } = {}): Civilization {
  const s = raw.sections ?? {};
  const hidden = new Set(opts.hideRelationsTo ?? []);
  return {
    society: SOCIETY.filter(([k]) => s[k]).map(([k, key]) => ({ key, section: s[k] })),
    humor: s.humor,
    military: s.military_doctrine,
    ships: s.ships,
    techLimits: s.technology_limits,
    powers: s.powers_rare,
    characters: (raw.characters ?? []).map((c: any) => ({
      id: c.id,
      status: c.status,
      name: c.name,
      role: c.role,
      personality: c.personality,
      contradiction: c.contradiction,
      silhouette: c.silhouette,
      relations: Object.keys(c)
        .filter((k) => k.startsWith('relationTo'))
        .map((k) => ({ to: k.slice('relationTo'.length), text: c[k] as Localized }))
        .filter((r) => !hidden.has(r.to)),
    })),
  };
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export const civilizations: Partial<Record<FactionId, Civilization>> = {
  // KAEL-RUUM and ZEN-VARO's relations point at ILVANI and SAZHI as Grays; those names are now
  // characters of other races (owner decision 2026-10-20), so the relations stay hidden until fixed.
  grays: toCivilization(graysRaw, { hideRelationsTo: ['Ilvani', 'Sazhi'] }),
  nordics: toCivilization(nordicsRaw),
};
