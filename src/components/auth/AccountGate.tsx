import { useState, type FormEvent, type ReactNode } from 'react';
import { factions } from '../../data/factions';
import { api, type Race } from '../../lib/api';
import { useI18n } from '../../i18n/I18nProvider';
import { useCensus } from '../choose/chosenRace';
import { SignIn, field } from './SignIn';
import { useAccount, type Account } from './useAccount';

/** First visit after signing in: nickname and race (defaults to the one chosen on the site). */
function ProfileSetup() {
  const { t, l } = useI18n();
  const account = useAccount();
  const { entry } = useCensus();
  const [name, setName] = useState(entry?.name ?? '');
  const [race, setRace] = useState<Race>(entry?.race ?? 'grays');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function save(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError('');
    const { data, error: err } = await api.createProfile(name.trim(), race);
    setBusy(false);
    if (data) account.apply(data);
    else if (err === 'has_profile') void account.reload();
    else setError(err === 'nickname_taken' ? t.account.nicknameTaken : t.account.profileFailed);
  }

  return (
    <form onSubmit={save} className="space-y-3">
      <p className="text-bone-dim">{t.account.profileIntro}</p>
      <label className="block">
        <span className="text-sm text-bone-muted">{t.account.nickname}</span>
        <input required minLength={2} maxLength={30} value={name} onChange={(e) => setName(e.target.value)} className={field} />
      </label>
      <label className="block">
        <span className="text-sm text-bone-muted">{t.account.race}</span>
        <select value={race} onChange={(e) => setRace(e.target.value as Race)} className={field}>
          {factions.map((f) => (
            <option key={f.id} value={f.id}>
              {l(f.name)}
            </option>
          ))}
        </select>
      </label>
      <p className="text-xs text-bone-muted">{t.account.raceNote}</p>
      <button type="submit" disabled={busy} className="btn-primary w-full disabled:opacity-60">
        {t.account.saveProfile}
      </button>
      {error && <p className="text-sm text-signal" role="alert">{error}</p>}
    </form>
  );
}

/** Renders children only for a signed-in person with a profile; otherwise walks them through it. */
export function AccountGate({ children }: { children: (account: Account) => ReactNode }) {
  const { t } = useI18n();
  const account = useAccount();

  if (!account.enabled) return <p className="panel p-5 text-sm text-bone-muted">{t.account.soon}</p>;
  if (account.loading) return <p className="text-sm text-bone-muted">{t.account.loading}</p>;
  if (!account.user) return <SignIn />;
  if (!account.profile) return <ProfileSetup />;
  return <>{children(account)}</>;
}
