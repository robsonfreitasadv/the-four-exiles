import { useState, type FormEvent, type ReactNode } from 'react';
import { supabase } from '../../lib/supabase';
import { useI18n } from '../../i18n/I18nProvider';
import { Captcha, TURNSTILE_SITE_KEY } from './Captcha';

export const field =
  'mt-2 w-full rounded-2xl border border-graphite-500 bg-graphite-800 px-4 py-3 text-bone placeholder:text-bone-muted focus:border-bone focus:outline-none';

export const MIN_PASSWORD = 8;

type Mode = 'password' | 'signup' | 'forgot' | 'link' | 'code';

/** Where e-mail links come back to. Hash URLs can't carry the route, so main.tsx lands on the account page. */
function backUrl() {
  return `${window.location.origin}${window.location.pathname}`;
}

/**
 * Sign in with e-mail and password, create an account, recover a forgotten password, or get a sign-in link.
 * Messages never say whether an e-mail has an account.
 */
export function SignIn() {
  const { t, lang } = useI18n();
  const [mode, setMode] = useState<Mode>('password');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [code, setCode] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [captchaRound, setCaptchaRound] = useState(0);

  function go(next: Mode) {
    setMode(next);
    setError('');
    setNotice('');
    setPassword('');
    setConfirm('');
  }

  /** Runs one auth call with the bot-check token; each token works once, so the widget resets after. */
  async function run(call: (captcha?: string) => Promise<{ error: { message?: string; code?: string } | null }>) {
    if (!supabase) return null;
    if (TURNSTILE_SITE_KEY && !captchaToken) {
      setError(t.account.captchaNeeded);
      return null;
    }
    setBusy(true);
    setError('');
    setNotice('');
    const { error: err } = await call(captchaToken ?? undefined);
    setBusy(false);
    setCaptchaToken(null);
    setCaptchaRound((n) => n + 1);
    return { err };
  }

  /** Rate limits and failed bot checks get their own message, so they don't look like a wrong password. */
  function limited(code?: string) {
    return code === 'over_request_rate_limit' || code === 'over_email_send_rate_limit' || code === 'captcha_failed';
  }

  async function signInWithPassword(e: FormEvent) {
    e.preventDefault();
    const r = await run((captchaToken) => supabase!.auth.signInWithPassword({ email: email.trim(), password, options: { captchaToken } }));
    if (!r?.err) return;
    if (limited(r.err.code)) return setError(t.account.tooMany);
    setError(r.err.code === 'email_not_confirmed' ? t.account.notConfirmed : t.account.badLogin);
  }

  async function signUp(e: FormEvent) {
    e.preventDefault();
    if (password !== confirm) return setError(t.account.mismatch);
    const r = await run((captchaToken) =>
      supabase!.auth.signUp({ email: email.trim(), password, options: { emailRedirectTo: backUrl(), captchaToken } }),
    );
    if (!r) return;
    if (r.err) return setError(limited(r.err.code) ? t.account.tooMany : r.err.code === 'weak_password' ? t.account.passwordHint : t.account.signUpFailed);
    // With e-mail confirmation on there is no session yet: the person confirms through the link, then signs in.
    go('password');
    setNotice(t.account.signUpDone.replace('{email}', email.trim()));
  }

  async function forgot(e: FormEvent) {
    e.preventDefault();
    const r = await run((captchaToken) => supabase!.auth.resetPasswordForEmail(email.trim(), { redirectTo: backUrl(), captchaToken }));
    if (!r) return;
    if (r.err) return setError(limited(r.err.code) ? t.account.tooMany : t.account.sendFailed);
    setNotice(t.account.forgotDone.replace('{email}', email.trim()));
  }

  async function sendLink(e: FormEvent) {
    e.preventDefault();
    const r = await run((captchaToken) =>
      supabase!.auth.signInWithOtp({ email: email.trim(), options: { shouldCreateUser: true, emailRedirectTo: backUrl(), captchaToken } }),
    );
    if (!r) return;
    if (r.err) setError(limited(r.err.code) ? t.account.tooMany : t.account.sendFailed);
    else setMode('code');
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

  const emailInput = (
    <label className="block">
      <span className="text-sm text-bone-muted">{t.account.email}</span>
      <input type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className={field} />
    </label>
  );
  const passwordInput = (label: string, value: string, set: (v: string) => void, autoComplete: string) => (
    <label className="block">
      <span className="text-sm text-bone-muted">{label}</span>
      <input
        type="password"
        required
        minLength={mode === 'password' ? undefined : MIN_PASSWORD}
        autoComplete={autoComplete}
        value={value}
        onChange={(e) => set(e.target.value)}
        className={field}
      />
    </label>
  );
  const captcha = <Captcha onToken={setCaptchaToken} lang={lang} resetKey={captchaRound} />;
  const messages = (
    <>
      {error && (
        <p className="text-sm text-signal" role="alert">
          {error}
        </p>
      )}
      {notice && (
        <p className="text-sm text-bone" role="status">
          {notice}
        </p>
      )}
    </>
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

  if (mode === 'code')
    return (
      <form onSubmit={verify} className="space-y-3">
        <p className="text-bone-dim">{t.account.codeIntro.replace('{email}', email)}</p>
        <label className="block">
          <span className="text-sm text-bone-muted">{t.account.code}</span>
          <input inputMode="numeric" autoComplete="one-time-code" required pattern="[0-9]{6}" maxLength={6} value={code} onChange={(e) => setCode(e.target.value)} className={field} />
        </label>
        {submit(t.account.enter, t.account.checking)}
        {messages}
        {footer(link('password', t.account.backToSignIn))}
      </form>
    );

  if (mode === 'signup')
    return (
      <form onSubmit={signUp} className="space-y-3">
        <p className="text-bone-dim">{t.account.signUpIntro}</p>
        {emailInput}
        {passwordInput(t.account.password, password, setPassword, 'new-password')}
        {passwordInput(t.account.passwordConfirm, confirm, setConfirm, 'new-password')}
        <p className="text-xs text-bone-muted">{t.account.passwordHint}</p>
        {captcha}
        {submit(t.account.createAccount, t.account.sending)}
        {messages}
        {footer(link('password', t.account.haveAccount))}
        <p className="text-xs text-bone-muted">{t.account.privacyNote}</p>
      </form>
    );

  if (mode === 'forgot')
    return (
      <form onSubmit={forgot} className="space-y-3">
        <p className="text-bone-dim">{t.account.forgotIntro}</p>
        {emailInput}
        {captcha}
        {submit(t.account.forgotButton, t.account.sending)}
        {messages}
        {footer(link('password', t.account.backToSignIn))}
      </form>
    );

  if (mode === 'link')
    return (
      <form onSubmit={sendLink} className="space-y-3">
        <p className="text-bone-dim">{t.account.signInIntro}</p>
        {emailInput}
        {captcha}
        {submit(t.account.sendCode, t.account.sending)}
        {messages}
        {footer(link('password', t.account.backToSignIn))}
        <p className="text-xs text-bone-muted">{t.account.privacyNote}</p>
      </form>
    );

  return (
    <form onSubmit={signInWithPassword} className="space-y-3">
      <p className="text-bone-dim">{t.account.passwordIntro}</p>
      {emailInput}
      {passwordInput(t.account.password, password, setPassword, 'current-password')}
      {captcha}
      {submit(t.account.enter, t.account.checking)}
      {messages}
      {footer(link('forgot', t.account.forgot), link('signup', t.account.createAccount), link('link', t.account.linkInstead))}
      <p className="text-xs text-bone-muted">{t.account.privacyNote}</p>
    </form>
  );
}
