/** Grays-specific views of the dossier in docs/lore/GRAYS.json (see dossier.ts). */
import { factions } from '../factions';
import { dossiers } from './dossier';

export type { LoreStatus } from './dossier';

export const grays = dossiers.grays!;

/**
 * The dossier also lists ILVANI, SAZHI and XHALEN-KTHRIX as Grays, but the owner decided (2026-10-20)
 * that they are characters of their own races (Nordics, Reptilians, Mantis), as on the official sheet.
 * Those entries are hidden until grays.json is corrected; VHAL-ETT, the Gray on the sheet, is shown.
 */
const otherRacesCharacters = new Set(factions.filter((f) => f.id !== 'grays').map((f) => f.sheetCharacter));
export const graysCharactersShown = grays.characters.filter((c) => !otherRacesCharacters.has(c.name));
