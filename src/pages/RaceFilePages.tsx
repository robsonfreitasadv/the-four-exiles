import { GraysDossier } from '../components/GraysDossier';
import { grays } from '../data/lore/grays';
import { CivilizationPage } from './CivilizationPage';

/** Grays: the dossier (docs/lore/grays.json) plus the civilization file. */
export function GraysPage() {
  const vhalEtt = grays.characters.find((c) => c.id === 'VHAL_ETT');
  return (
    <CivilizationPage
      race="grays"
      dossier={<GraysDossier />}
      sheetCharacter={vhalEtt && { role: vhalEtt.role, status: vhalEtt.status }}
      leaderStatus="CANON_APPROVED"
    />
  );
}

/** Nordics: the civilization file (docs/lore/nordics-civilization.json). */
export function NordicsPage() {
  // ILVANI is the Nordic on the official sheet (owner decision); Sael stays the provisional featured character.
  return <CivilizationPage race="nordics" sheetCharacter={{ status: 'CANON_APPROVED' }} leaderStatus="PROVISIONAL" />;
}
