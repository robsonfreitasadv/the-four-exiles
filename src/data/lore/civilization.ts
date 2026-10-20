/**
 * Civilization files, one per race, maintained with the chat project in docs/lore/<race>-civilization.json.
 * Edit the JSON, not this file. Everything is PROVISIONAL unless marked CANON_APPROVED.
 * Each file may include any subset of the sections below; the page shows only what exists.
 * Government, economy, technology and characters that live in the race dossier (docs/lore/<race>.json)
 * are merged in here, so a race page shows everything in one place.
 */
import graysRaw from '../../../docs/lore/grays-civilization.json';
import mantisRaw from '../../../docs/lore/mantis-civilization.json';
import nordicsRaw from '../../../docs/lore/nordics-civilization.json';
import reptiliansRaw from '../../../docs/lore/reptilians-civilization.json';
import type { FactionId, Localized } from '../types';
import { dossiers, type LoreStatus, type RaceDossier } from './dossier';

export type SocietyKey =
  | 'language'
  | 'governance'
  | 'economy'
  | 'art'
  | 'artAndRitual'
  | 'cultureAndRitual'
  | 'philosophy'
  | 'dailyLife';

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
  /** note: shown above the limits; when absent, the Grays' approved sentence is used. */
  techLimits?: { status: LoreStatus; note?: Localized; items: { id: string; status: LoreStatus; limit: Localized }[] };
  powers?: { status: LoreStatus; items: { id: string; name: Localized; description: Localized }[] };
  characters: CivCharacter[];
}

// [file key, page key], in display order
const SOCIETY: [string, SocietyKey][] = [
  ['language', 'language'],
  ['governance', 'governance'],
  ['economy', 'economy'],
  ['art', 'art'],
  ['art_and_ritual', 'artAndRitual'],
  ['culture_and_ritual', 'cultureAndRitual'],
  ['philosophy', 'philosophy'],
  ['daily_life', 'dailyLife'],
];

interface Options {
  /** Also list the dossier's characters in the characters section (not for Grays, whose dossier lists them). */
  dossierCharacters?: boolean;
  hideCharacters?: string[];
  hideRelationsTo?: string[];
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function toCivilization(raw: any, dossier: RaceDossier | undefined, opts: Options = {}): Civilization {
  const s = { ...(raw.sections ?? {}) };
  // dossier-only sections
  if (dossier?.governance && !s.governance) s.governance = dossier.governance;
  if (dossier?.economy && !s.economy) s.economy = dossier.economy;
  const tech = s.technology_limits
    ? // the civilization file's note embeds status codes; the page uses a translated sentence instead
      { ...s.technology_limits, note: undefined }
    : dossier?.technology?.limits && {
        status: dossier.technology.status,
        note: dossier.technology.text,
        items: dossier.technology.limits.map((x) => ({ ...x, status: dossier.technology!.status })),
      };

  const hiddenChars = new Set(opts.hideCharacters ?? []);
  const hiddenRel = new Set(opts.hideRelationsTo ?? []);
  const rawChars = [...(raw.characters ?? []), ...(opts.dossierCharacters ? (dossier?.characters ?? []) : [])];

  // relationToIxulDra / relationToSsara → the matching character's display name (IXUL-DRA, SSARA-MIN)
  const squash = (x: string) => x.toLowerCase().replace(/[^a-z]/g, '');
  const displayName = (to: string) => rawChars.find((c: any) => squash(c.name).startsWith(squash(to)))?.name ?? to;

  return {
    society: SOCIETY.filter(([k]) => s[k]).map(([k, key]) => ({ key, section: s[k] })),
    humor: s.humor,
    military: s.military_doctrine,
    ships: s.ships,
    techLimits: tech || undefined,
    powers: s.powers_rare,
    characters: rawChars
      .filter((c: any) => !hiddenChars.has(c.id))
      .map((c: any) => ({
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
          .filter((r) => !hiddenRel.has(r.to))
          .map((r) => ({ ...r, to: displayName(r.to) })),
      })),
  };
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export const civilizations: Partial<Record<FactionId, Civilization>> = {
  // KAEL-RUUM and ZEN-VARO's relations point at ILVANI and SAZHI as Grays; those names are now
  // characters of other races (owner decision 2026-10-20), so the relations stay hidden until fixed.
  grays: toCivilization(graysRaw, dossiers.grays, { hideRelationsTo: ['Ilvani', 'Sazhi'] }),
  nordics: toCivilization(nordicsRaw, undefined),
  // The dossier names KRAHL-VOR as the Sovereign, while the site follows the official sheet (SAZHI).
  // Open question for the owner (docs/DECISOES.md); KRAHL-VOR and relations to him stay hidden until then.
  reptilians: toCivilization(reptiliansRaw, dossiers.reptilians, {
    dossierCharacters: true,
    hideCharacters: ['KRAHL_VOR'],
    hideRelationsTo: ['KrahlVor'],
  }),
  mantis: toCivilization(mantisRaw, dossiers.mantis, { dossierCharacters: true }),
};
