/**
 * Grays civilization file. Source of truth: docs/lore/grays-civilization.json, maintained with the
 * chat project. Edit the JSON, not this file. Everything is PROVISIONAL unless marked CANON_APPROVED.
 */
import raw from '../../../docs/lore/grays-civilization.json';
import type { Localized } from '../types';
import type { LoreStatus } from './grays';

export interface TextSection {
  status: LoreStatus;
  text: Localized;
  example?: Localized;
}

export interface GrayCharacter {
  id: string;
  status: LoreStatus;
  name: string;
  role: Localized;
  personality: Localized;
  contradiction: Localized;
  silhouette: Localized;
  /** Only relationships to Sete are shown; the others point at names under the open naming conflict. */
  relationToSete?: Localized;
}

const s = raw.sections;

export const graysCivilization = {
  statusNote: raw.statusNote as Localized,
  society: [
    ['language', s.language],
    ['economy', s.economy],
    ['art', s.art],
    ['philosophy', s.philosophy],
    ['dailyLife', s.daily_life],
  ] as [string, TextSection][],
  humor: s.humor as TextSection,
  military: s.military_doctrine as TextSection,
  ships: {
    status: s.ships.status as LoreStatus,
    classes: s.ships.classes as { id: string; name: Localized; note: Localized }[],
    propulsion: s.ships.propulsion as Localized,
  },
  techLimits: {
    status: s.technology_limits.status as LoreStatus,
    note: s.technology_limits.note as Localized,
    items: s.technology_limits.items as { id: string; status: LoreStatus; limit: Localized }[],
  },
  powers: {
    status: s.powers_rare.status as LoreStatus,
    items: s.powers_rare.items as { id: string; name: Localized; description: Localized }[],
  },
  characters: raw.characters.map((c) => ({
    id: c.id,
    status: c.status as LoreStatus,
    name: c.name,
    role: c.role,
    personality: c.personality,
    contradiction: c.contradiction,
    silhouette: c.silhouette,
    relationToSete: 'relationToSete' in c ? (c.relationToSete as Localized) : undefined,
  })) as GrayCharacter[],
};
