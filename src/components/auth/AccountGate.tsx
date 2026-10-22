import { useState, type FormEvent, type ReactNode } from 'react';
import { factions } from '../../data/factions';
import { supabase, type Race } from '../../lib/supabase';
import { useI18n } from '../../i18n/I18nProvider';
import { useCensus } from '../choose/chosenRace';
import { useAccount, type Account } from './useAccount';

const field =
  'mt-2 w-full rounded-2xl border border-graphite-500 bg-graphite-800 px-4 py-3 text-bone placeholder:text-bone-muted focus:border-bone focus:outline-none';

/** E-mail sign-in with a 6-digit code (no redirect, so it also works inside previews). */
function SignIn() {
  const { t } = useI18n();
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState<'email' | 'code'>('email');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function sendCode(e: FormEvent) {
    e.preventDefault();
    if (!supabase) return;
    setBusy(true);
    setError('');
    // The e-mail carries a 6-digit code (custom templates) or a link back to this page (default templates).
    const back = `${window.location.origin}${window.location.pathname}`;
    const { error: err } = await supabase.auth.signInWithOtp({ email: email.trim(), options: { shouldCreateUser: true, emailRedirectTo: back } });
    setBusy(false);
    if (err) setError(t.account.sendFailed);
    else setStep('code');
  }

  async function verify(e: FormEvent) {
    e.preventDefault();
    if (!supabase) return;
    setBusy(true);
    setError('');
    const { error: err } = await supabase.auth.verifyOtp({ email: email.trim(), token: code.trim(), type: 'email' });
    setBusy(false);
    if (err) setError(t.account.badCode);
  }

  return step === 'email' ? (
    <form onSubmit={sendCode} className="space-y-3">
      <p className="text-bone-dim">{t.account.signInIntro}</p>
      <label className="block">
        <span className="text-sm text-bone-muted">{t.account.email}</span>
        <input type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className={field} />
      </label>
      <button type="submit" disabled={busy} className="btn-primary w-full disabled:opacity-60">
        {busy ? t.account.sending : t.account.sendCode}
      </button>
      {error && <p className="text-sm text-signal" role="alert">{error}</p>}
      <p className="text-xs text-bone-muted">{t.account.privacyNote}</p>
    </form>
  ) : (
    <form onSubmit={verify} className="space-y-3">
      <p className="text-bone-dim">{t.account.codeIntro.replace('{email}', email)}</p>
      <label className="block">
        <span className="text-sm text-bone-muted">{t.account.code}</span>
        <input inputMode="numeric" autoComplete="one-time-code" required pattern="[0-9]{6}" maxLength={6} value={code} onChange={(e) => setCode(e.target.value)} className={field} />
      </label>
      <button type="submit" disabled={busy} className="btn-primary w-full disabled:opacity-60">
        {busy ? t.account.checking : t.account.enter}
      </button>
      <button type="button" className="text-sm text-bone-muted underline" onClick={() => setStep('email')}>
        {t.account.otherEmail}
      </button>
      {error && <p className="text-sm text-signal" role="alert">{error}</p>}
    </form>
  );
}

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
