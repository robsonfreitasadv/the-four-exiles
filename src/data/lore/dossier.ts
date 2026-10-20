/**
 * Race dossiers, maintained with the chat project in docs/lore/<race>.json. Edit the JSON, not this file.
 * Status rules: only CANON_APPROVED is canon; PROVISIONAL and OPEN_QUESTION are always labeled in the UI.
 * Files differ slightly (Grays: canon.approved; others: canonLinks.items), so they are normalized here.
 */
import graysRaw from '../../../docs/lore/grays.json';
import mantisRaw from '../../../docs/lore/mantis.json';
import reptiliansRaw from '../../../docs/lore/reptilians.json';
import type { FactionId, Localized } from '../types';

export type LoreStatus = 'CANON_APPROVED' | 'PROVISIONAL' | 'OPEN_QUESTION';

export interface LoreItem {
  id: string;
  status: LoreStatus;
  text: Localized;
}

export interface TextBlock {
  status: LoreStatus;
  text: Localized;
}

/** Characters keep their raw shape; relationTo<Name> keys are read by the civilization module. */
export type DossierCharacter = { id: string; name: string; status: LoreStatus; role: Localized } & Record<string, unknown>;

export interface RaceDossier {
  tagline: Localized;
  summary: Localized;
  approved: LoreItem[];
  homeworld?: { status: LoreStatus; name: Localized; description: Localized };
  appearance?: { status: LoreStatus; text: Localized; variants?: Record<'en' | 'pt-BR', string[]> };
  eras?: { status: LoreStatus; note?: Localized; items: { id: string; name: Localized }[] };
  ancientDecision?: TextBlock;
  humanContact?: TextBlock & { programName: string };
  internalGroups?: { status: LoreStatus; note: Localized; groups: { id: string; name: Localized; motto: Localized }[] };
  governance?: TextBlock;
  economy?: TextBlock;
  technology?: TextBlock & { limits?: { id: string; limit: Localized }[] };
  characters: DossierCharacter[];
  openQuestions: LoreItem[];
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function toDossier(raw: any): RaceDossier {
  const p = raw.provisional ?? {};
  return {
    tagline: raw.tagline,
    summary: raw.summary,
    approved: raw.canon?.approved ?? raw.canonLinks?.items ?? [],
    homeworld: p.homeworld,
    appearance: p.appearance,
    eras: p.historicalEras && { status: p.historicalEras.status, note: p.historicalEras.note, items: p.historicalEras.eras },
    ancientDecision: p.ancientDecision,
    humanContact: p.humanContact,
    internalGroups: p.internalGroups,
    governance: p.governance,
    economy: p.economy,
    technology: p.technology,
    characters: p.characters ?? [],
    openQuestions: p.openQuestions ?? [],
  };
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export const dossiers: Partial<Record<FactionId, RaceDossier>> = {
  grays: toDossier(graysRaw),
  reptilians: toDossier(reptiliansRaw),
  mantis: toDossier(mantisRaw),
};
