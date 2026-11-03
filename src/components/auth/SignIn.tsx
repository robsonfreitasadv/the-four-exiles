import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import { enabledOAuthProviders, supabase, type OAuthProvider } from '../../lib/supabase';
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

const providerLabel: Record<OAuthProvider, string> = { google: 'Google', apple: 'Apple' };

function ProviderIcon({ provider }: { provider: OAuthProvider }) {
  if (provider === 'apple')
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
        <path d="M16.37 12.6c-.02-2.2 1.8-3.26 1.88-3.31-1.03-1.5-2.62-1.7-3.18-1.73-1.35-.14-2.64.8-3.33.8-.69 0-1.74-.78-2.87-.76-1.47.02-2.83.86-3.59 2.18-1.53 2.66-.39 6.6 1.1 8.75.73 1.05 1.6 2.24 2.73 2.2 1.1-.05 1.51-.71 2.84-.71 1.32 0 1.7.71 2.86.69 1.18-.02 1.93-1.07 2.65-2.13.84-1.22 1.18-2.4 1.2-2.46-.03-.01-2.3-.88-2.32-3.5zM14.2 6.13c.6-.73 1.01-1.75.9-2.76-.87.04-1.92.58-2.54 1.31-.56.64-1.05 1.67-.92 2.66.97.08 1.96-.49 2.56-1.21z" />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.1A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.44.34-2.1V7.06H2.18A11 11 0 0 0 1 12c0 1.78.43 3.45 1.18 4.94l3.66-2.84z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
    </svg>
  );
}

/** "Continue with Google / Apple", shown only for providers switched on in Supabase. */
function SocialSignIn() {
  const { t } = useI18n();
  const [providers, setProviders] = useState<OAuthProvider[]>([]);
  const [busy, setBusy] = useState<OAuthProvider | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let live = true;
    void enabledOAuthProviders().then((p) => live && setProviders(p));
    return () => {
      live = false;
    };
  }, []);

  async function start(provider: OAuthProvider) {
    if (!supabase) return;
    setBusy(provider);
    setError('');
    // On success the browser leaves for the provider and comes back through main.tsx.
    const { error: err } = await supabase.auth.signInWithOAuth({ provider, options: { redirectTo: backUrl() } });
    if (err) {
      setBusy(null);
      setError(t.account.socialFailed);
    }
  }

  if (providers.length === 0) return null;
  return (
    <div className="space-y-3">
      {providers.map((p) => (
        <button
          key={p}
          type="button"
          disabled={busy !== null}
          onClick={() => void start(p)}
          className="flex w-full items-center justify-center gap-3 rounded-full border border-graphite-500 bg-bone px-5 py-3 font-medium text-graphite-800 transition hover:opacity-90 disabled:opacity-60"
        >
          <ProviderIcon provider={p} />
          {busy === p ? t.account.socialOpening : t.account.continueWith.replace('{provider}', providerLabel[p])}
        </button>
      ))}
      {error && (
        <p className="text-sm text-signal" role="alert">
          {error}
        </p>
      )}
      <div className="flex items-center gap-3 text-xs text-bone-muted">
        <span className="h-px flex-1 bg-graphite-500" />
        {t.account.orEmail}
        <span className="h-px flex-1 bg-graphite-500" />
      </div>
    </div>
  );
}

/**
 * Sign in with Google or Apple (when switched on), e-mail and password, create an account, recover a forgotten
 * password, or get a sign-in link.
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
        <SocialSignIn />
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
      <SocialSignIn />
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
