/**
 * The Grays dossier. Source of truth: docs/lore/grays.json, maintained together with the chat project.
 * Edit the JSON, not this file. Status rules: only CANON_APPROVED is canon; PROVISIONAL and
 * OPEN_QUESTION must always be labeled as such in the UI.
 */
import raw from '../../../docs/lore/grays.json';
import { factions } from '../factions';
import type { Localized } from '../types';

export type LoreStatus = 'CANON_APPROVED' | 'PROVISIONAL' | 'OPEN_QUESTION';

interface LoreItem {
  id: string;
  status: LoreStatus;
  text: Localized;
}

export interface GraysDossier {
  name: Localized;
  statusNote: Localized;
  tagline: Localized;
  summary: Localized;
  approved: LoreItem[];
  homeworld: { status: LoreStatus; name: Localized; description: Localized };
  appearance: { status: LoreStatus; text: Localized; variants: Record<'en' | 'pt-BR', string[]> };
  eras: { status: LoreStatus; items: { id: string; name: Localized }[] };
  ancientDecision: { status: LoreStatus; text: Localized };
  humanContact: { status: LoreStatus; programName: string; text: Localized };
  internalGroups: { status: LoreStatus; note: Localized; groups: { id: string; name: Localized; motto: Localized }[] };
  characters: { id: string; name: string; status: LoreStatus; role: Localized }[];
  openQuestions: LoreItem[];
}

const p = raw.provisional;

export const grays: GraysDossier = {
  name: raw.name,
  statusNote: raw.statusNote,
  tagline: raw.tagline,
  summary: raw.summary,
  approved: raw.canon.approved as LoreItem[],
  homeworld: p.homeworld as GraysDossier['homeworld'],
  appearance: p.appearance as GraysDossier['appearance'],
  eras: { status: p.historicalEras.status as LoreStatus, items: p.historicalEras.eras },
  ancientDecision: p.ancientDecision as GraysDossier['ancientDecision'],
  humanContact: p.humanContact as GraysDossier['humanContact'],
  internalGroups: p.internalGroups as GraysDossier['internalGroups'],
  characters: p.characters as GraysDossier['characters'],
  openQuestions: p.openQuestions as LoreItem[],
};

/**
 * Dossier characters whose names collide with the four race names are an unresolved
 * contradiction (see docs/DECISOES.md), so the site leaves them out until the owner decides.
 */
const raceNames = new Set(factions.map((f) => f.name));
export const graysCharactersShown = grays.characters.filter((c) => !raceNames.has(c.name));
