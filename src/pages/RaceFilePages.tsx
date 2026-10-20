import { RaceDossier } from '../components/RaceDossier';
import { dossiers } from '../data/lore/dossier';
import { grays, graysCharactersShown } from '../data/lore/grays';
import { useI18n } from '../i18n/I18nProvider';
import { CivilizationPage } from './CivilizationPage';

/** Grays: dossier (docs/lore/grays.json, lists its own characters) + civilization file. */
export function GraysPage() {
  const { t } = useI18n();
  const vhalEtt = grays.characters.find((c) => c.id === 'VHAL_ETT');
  return (
    <CivilizationPage
      race="grays"
      dossier={
        <RaceDossier
          dossier={grays}
          kicker={t.civPages.grays.dossierKicker}
          title={t.civPages.grays.dossierTitle}
          characters={graysCharactersShown}
        />
      }
      sheetCharacter={vhalEtt && { role: vhalEtt.role, status: vhalEtt.status }}
      leaderStatus="CANON_APPROVED"
    />
  );
}

/** Nordics: civilization file only (docs/lore/nordics-civilization.json). */
export function NordicsPage() {
  // ILVANI is the Nordic on the official sheet (owner decision); Sael stays the provisional featured character.
  return <CivilizationPage race="nordics" sheetCharacter={{ status: 'CANON_APPROVED' }} leaderStatus="PROVISIONAL" />;
}

/** Reptilians: dossier (docs/lore/reptilians.json) + civilization file. */
export function ReptiliansPage() {
  const { t } = useI18n();
  return (
    <CivilizationPage
      race="reptilians"
      dossier={
        <RaceDossier
          dossier={dossiers.reptilians!}
          kicker={t.civPages.reptilians.dossierKicker}
          title={t.civPages.reptilians.dossierTitle}
        />
      }
      // SAZHI as the Sovereign follows the official sheet, but the dossier names KRAHL-VOR: open question.
      leaderStatus="OPEN_QUESTION"
    />
  );
}

/** Mantis: dossier (docs/lore/mantis.json, written as "Insectoids") + civilization file. */
export function MantisPage() {
  const { t } = useI18n();
  return (
    <CivilizationPage
      race="mantis"
      dossier={
        <RaceDossier dossier={dossiers.mantis!} kicker={t.civPages.mantis.dossierKicker} title={t.civPages.mantis.dossierTitle} />
      }
      // XHALEN-KTHRIX as the Commander is provisional (the sheet says "The Commanders").
      leaderStatus="PROVISIONAL"
    />
  );
}
