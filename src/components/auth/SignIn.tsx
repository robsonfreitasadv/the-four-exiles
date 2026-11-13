import { useState, type FormEvent, type ReactNode } from 'react';
import { api, MIN_PASSWORD, type ApiError } from '../../lib/api';
import { useI18n } from '../../i18n/I18nProvider';
import { useAccount } from './useAccount';

export const field =
  'mt-2 w-full rounded-2xl border border-graphite-500 bg-graphite-800 px-4 py-3 text-bone placeholder:text-bone-muted focus:border-bone focus:outline-none';

export { MIN_PASSWORD };

type Mode = 'password' | 'signup';

/**
 * Sign in with e-mail and password, or create an account. Messages never say whether an e-mail has an account.
 * Password recovery and e-mail confirmation wait for the project's own domain (functions/_lib/email.ts).
 */
export function SignIn() {
  const { t } = useI18n();
  const account = useAccount();
  const [mode, setMode] = useState<Mode>('password');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  function go(next: Mode) {
    setMode(next);
    setError('');
    setPassword('');
    setConfirm('');
  }

  /** Rate limits get their own message, so they don't look like a wrong password. */
  function message(code: ApiError, otherwise: string) {
    return code === 'too_many' ? t.account.tooMany : otherwise;
  }

  async function signIn(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError('');
    const { data, error: err } = await api.signIn(email.trim(), password);
    setBusy(false);
    if (data) return account.apply(data);
    setError(message(err, err === 'bad_login' || err === 'invalid' ? t.account.badLogin : t.account.failed));
  }

  async function signUp(e: FormEvent) {
    e.preventDefault();
    if (password !== confirm) return setError(t.account.mismatch);
    if ([...password].length < MIN_PASSWORD) return setError(t.account.passwordHint);
    setBusy(true);
    setError('');
    const { data, error: err } = await api.signUp(email.trim(), password);
    setBusy(false);
    if (data) return account.apply(data);
    setError(message(err, err === 'network' || err === 'server_error' ? t.account.failed : t.account.signUpFailed));
  }

  const emailInput = (
    <label className="block">
      <span className="text-sm text-bone-muted">{t.account.email}</span>
      <input type="email" required maxLength={254} autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className={field} />
    </label>
  );
  const passwordInput = (label: string, value: string, set: (v: string) => void, autoComplete: string) => (
    <label className="block">
      <span className="text-sm text-bone-muted">{label}</span>
      <input
        type="password"
        required
        minLength={mode === 'password' ? undefined : MIN_PASSWORD}
        maxLength={256}
        autoComplete={autoComplete}
        value={value}
        onChange={(e) => set(e.target.value)}
        className={field}
      />
    </label>
  );
  const messages = error && (
    <p className="text-sm text-signal" role="alert">
      {error}
    </p>
  );
  const link = (to: Mode, label: string) => (
    <button key={to} type="button" className="text-sm text-bone-muted underline hover:text-bone" onClick={() => go(to)}>
      {label}
    </button>
  );
  const submit = (label: string, busyLabel: string) => (
    <button type="submit" disabled={busy} className="btn-primary w-full disabled:opacity-60">
      {busy ? busyLabel : label}
    </button>
  );
  const footer = (...items: ReactNode[]) => <div className="flex flex-wrap gap-x-5 gap-y-2">{items}</div>;

  if (mode === 'signup')
    return (
      <form onSubmit={signUp} className="space-y-3">
        <p className="text-bone-dim">{t.account.signUpIntro}</p>
        {emailInput}
        {passwordInput(t.account.password, password, setPassword, 'new-password')}
        {passwordInput(t.account.passwordConfirm, confirm, setConfirm, 'new-password')}
        <p className="text-xs text-bone-muted">{t.account.passwordHint}</p>
        {submit(t.account.createAccount, t.account.sending)}
        {messages}
        {footer(link('password', t.account.haveAccount))}
        <p className="text-xs text-bone-muted">{t.account.privacyNote}</p>
      </form>
    );

  return (
    <form onSubmit={signIn} className="space-y-3">
      <p className="text-bone-dim">{t.account.passwordIntro}</p>
      {emailInput}
      {passwordInput(t.account.password, password, setPassword, 'current-password')}
      {submit(t.account.enter, t.account.checking)}
      {messages}
      {footer(link('signup', t.account.createAccount))}
      <p className="text-xs text-bone-muted">{t.account.recoverySoon}</p>
      <p className="text-xs text-bone-muted">{t.account.privacyNote}</p>
    </form>
  );
}
