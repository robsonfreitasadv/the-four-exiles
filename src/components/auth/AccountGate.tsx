import { useState, type FormEvent, type ReactNode } from 'react';
import { factions } from '../../data/factions';
import { supabase, type Race } from '../../lib/supabase';
import { useI18n } from '../../i18n/I18nProvider';
import { useCensus } from '../choose/chosenRace';
import { SignIn, field } from './SignIn';
import { useAccount, type Account } from './useAccount';

/** First visit after signing in: nickname and race (defaults to the one chosen on the site). */
function ProfileSetup({ userId, onDone }: { userId: string; onDone: () => void }) {
  const { t, l } = useI18n();
  const { entry } = useCensus();
  const [name, setName] = useState(entry?.name ?? '');
  const [race, setRace] = useState<Race>(entry?.race ?? 'grays');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function save(e: FormEvent) {
    e.preventDefault();
    if (!supabase) return;
    setBusy(true);
    const { error: err } = await supabase.from('profiles').insert({ id: userId, display_name: name.trim(), race });
    setBusy(false);
    if (err) setError(t.account.profileFailed);
    else onDone();
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
  if (!account.session) return <SignIn />;
  if (!account.profile) return <ProfileSetup userId={account.session.user.id} onDone={() => void account.reload()} />;
  return <>{children(account)}</>;
}
