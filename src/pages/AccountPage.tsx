import { useEffect, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { AccountGate } from '../components/auth/AccountGate';
import { field, MIN_PASSWORD } from '../components/auth/SignIn';
import type { Account } from '../components/auth/useAccount';
import { SectionHeading } from '../components/ui/primitives';
import { factionById } from '../data/factions';
import { missions } from '../data/missions';
import { api, type Submission } from '../lib/api';
import { useI18n } from '../i18n/I18nProvider';

function Nickname({ account }: { account: Account }) {
  const { t } = useI18n();
  const [name, setName] = useState(account.profile!.display_name);
  const [message, setMessage] = useState('');

  async function save(e: FormEvent) {
    e.preventDefault();
    const { data, error } = await api.renameProfile(name.trim());
    if (data) account.apply(data);
    setMessage(data ? t.accountPage.saved : error === 'nickname_taken' ? t.account.nicknameTaken : t.account.profileFailed);
  }

  return (
    <form onSubmit={save} className="flex flex-wrap items-end gap-3">
      <label className="block min-w-[220px] flex-1">
        <span className="text-sm text-bone-muted">{t.account.nickname}</span>
        <input required minLength={2} maxLength={30} value={name} onChange={(e) => setName(e.target.value)} className={field} />
      </label>
      <button type="submit" className="btn-ghost px-5 py-3 text-sm">
        {t.accountPage.saveNickname}
      </button>
      {message && (
        <p className="w-full text-sm text-bone" role="status">
          {message}
        </p>
      )}
    </form>
  );
}

function Entries() {
  const { t, l } = useI18n();
  const [items, setItems] = useState<Submission[] | null>(null);

  useEffect(() => {
    let live = true;
    void api.mySubmissions().then(function loaded({ data }) {
      if (live) setItems(data?.submissions ?? []);
    });
    return () => {
      live = false;
    };
  }, []);

  if (!items) return <p className="text-sm text-bone-muted">{t.account.loading}</p>;
  if (!items.length)
    return (
      <p className="text-bone-dim">
        {t.accountPage.noEntries}{' '}
        <Link to="/missions" className="underline">
          {t.accountPage.seeMissions}
        </Link>
      </p>
    );
  const colour = { pending: 'text-[#ffd60a]', approved: 'text-[#5fe07f]', rejected: 'text-signal' };
  return (
    <ul className="space-y-2">
      {items.map((s) => {
        const mission = missions.find((m) => m.slug === s.mission_slug);
        return (
          <li key={s.id} className="rounded-2xl bg-graphite-800 px-4 py-3 text-sm">
            <Link to={`/missions/${s.mission_slug}`} className="text-xs text-bone-muted underline">
              {mission ? l(mission.title) : s.mission_slug}
            </Link>
            <p className="mt-1">
              <span className="text-bone">{s.title}</span>
              <span className={`ml-2 ${colour[s.status]}`}>· {t.missionForm.status[s.status]}</span>
            </p>
            {s.moderator_note && <p className="mt-1 text-bone-muted">{s.moderator_note}</p>}
          </li>
        );
      })}
    </ul>
  );
}

/** Change the password (asks for the current one); other devices are signed out afterwards. */
function PasswordPanel() {
  const { t } = useI18n();
  const [current, setCurrent] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');

  async function save(e: FormEvent) {
    e.preventDefault();
    if (password !== confirm) return setMessage(t.account.mismatch);
    if ([...password].length < MIN_PASSWORD) return setMessage(t.account.passwordHint);
    setBusy(true);
    const { error } = await api.changePassword(current, password);
    setBusy(false);
    setMessage(error === 'too_many' ? t.account.tooMany : error ? t.accountPage.passwordFailed : t.accountPage.passwordSaved);
    if (!error) {
      setCurrent('');
      setPassword('');
      setConfirm('');
    }
  }

  const input = (label: string, value: string, set: (v: string) => void, autoComplete: string, min?: number) => (
    <label className="block">
      <span className="text-sm text-bone-muted">{label}</span>
      <input
        type="password"
        required
        minLength={min}
        maxLength={256}
        autoComplete={autoComplete}
        value={value}
        onChange={(e) => set(e.target.value)}
        className={field}
      />
    </label>
  );

  return (
    <form onSubmit={save} className="space-y-3">
      <p className="text-sm text-bone-dim">{t.accountPage.passwordIntro}</p>
      {input(t.accountPage.currentPassword, current, setCurrent, 'current-password')}
      {input(t.accountPage.newPassword, password, setPassword, 'new-password', MIN_PASSWORD)}
      {input(t.account.passwordConfirm, confirm, setConfirm, 'new-password', MIN_PASSWORD)}
      <p className="text-xs text-bone-muted">{t.account.passwordHint}</p>
      <button type="submit" disabled={busy} className="btn-primary px-6 py-3 text-sm disabled:opacity-60">
        {t.accountPage.savePassword}
      </button>
      {message && (
        <p className="text-sm text-bone" role="status">
          {message}
        </p>
      )}
    </form>
  );
}

function DeleteAccount({ account }: { account: Account }) {
  const { t } = useI18n();
  const [confirm, setConfirm] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const word = t.accountPage.deleteWord;

  async function remove(e: FormEvent) {
    e.preventDefault();
    if (confirm.trim().toUpperCase() !== word) return;
    setBusy(true);
    setError('');
    // The database removes the profile, entries, images and points together with the login.
    const { error: err } = await api.deleteAccount();
    setBusy(false);
    if (err) return setError(t.accountPage.deleteFailed);
    await account.reload();
  }

  return (
    <form onSubmit={remove} className="space-y-3">
      <p className="text-sm text-bone-dim">{t.accountPage.deleteIntro}</p>
      <label className="block">
        <span className="text-sm text-bone-muted">{t.accountPage.deleteConfirm.replace('{word}', word)}</span>
        <input value={confirm} onChange={(e) => setConfirm(e.target.value)} className={field} autoComplete="off" />
      </label>
      <button type="submit" disabled={busy || confirm.trim().toUpperCase() !== word} className="rounded-full border border-signal px-5 py-3 text-sm text-signal disabled:opacity-40">
        {t.accountPage.deleteButton}
      </button>
      {error && (
        <p className="text-sm text-signal" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}

/** Sign in, see your entries and points, change your nickname or password, or delete everything. */
export function AccountPage() {
  const { t, l } = useI18n();
  return (
    <div className="container-x py-14 md:py-20">
      <SectionHeading as="h1" kicker={t.accountPage.kicker} title={t.accountPage.title} intro={t.accountPage.intro} />
      <div className="max-w-2xl space-y-6">
        <AccountGate>
          {(account) => {
            const race = factionById(account.profile!.race);
            return (
              <>
                <section className="panel space-y-4 p-5">
                  <p className="text-sm text-bone-muted">
                    {t.accountPage.email}: <span className="text-bone">{account.user!.email}</span>
                  </p>
                  <p className="text-sm text-bone-muted">
                    {t.account.race}: <span className="text-bone">{race ? l(race.name) : account.profile!.race}</span> · {t.accountPage.raceLocked}
                  </p>
                  <Nickname account={account} />
                  <div className="flex flex-wrap gap-3">
                    {account.moderator && (
                      <Link to="/moderation" className="btn-ghost px-5 py-2.5 text-sm">
                        {t.moderation.title}
                      </Link>
                    )}
                    <button type="button" className="btn-ghost px-5 py-2.5 text-sm" onClick={() => void account.signOut()}>
                      {t.account.signOut}
                    </button>
                  </div>
                </section>
                <section className="panel space-y-4 p-5">
                  <h2 className="font-display text-2xl font-semibold">{t.accountPage.entries}</h2>
                  <Entries />
                </section>
                <section className="panel space-y-4 p-5">
                  <h2 className="font-display text-2xl font-semibold">{t.accountPage.passwordTitle}</h2>
                  <PasswordPanel />
                </section>
                <section className="panel space-y-4 p-5">
                  <h2 className="font-display text-2xl font-semibold">{t.accountPage.deleteTitle}</h2>
                  <DeleteAccount account={account} />
                </section>
              </>
            );
          }}
        </AccountGate>
      </div>
    </div>
  );
}
