import { useEffect, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { AccountGate } from '../components/auth/AccountGate';
import type { Account } from '../components/auth/useAccount';
import { SectionHeading } from '../components/ui/primitives';
import { factionById } from '../data/factions';
import { missions } from '../data/missions';
import { supabase, type Submission } from '../lib/supabase';
import { useI18n } from '../i18n/I18nProvider';

const field =
  'mt-2 w-full rounded-2xl border border-graphite-500 bg-graphite-800 px-4 py-3 text-bone placeholder:text-bone-muted focus:border-bone focus:outline-none';

function Nickname({ account }: { account: Account }) {
  const { t } = useI18n();
  const [name, setName] = useState(account.profile!.display_name);
  const [message, setMessage] = useState('');

  async function save(e: FormEvent) {
    e.preventDefault();
    if (!supabase) return;
    const { error } = await supabase.from('profiles').update({ display_name: name.trim() }).eq('id', account.profile!.id);
    setMessage(error ? t.account.profileFailed : t.accountPage.saved);
    if (!error) void account.reload();
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

function Entries({ userId }: { userId: string }) {
  const { t, l } = useI18n();
  const [items, setItems] = useState<Submission[] | null>(null);

  useEffect(() => {
    if (!supabase) return;
    void supabase
      .from('submissions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .then(function loaded({ data }) {
        setItems((data as Submission[] | null) ?? []);
      });
  }, [userId]);

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

function DeleteAccount({ account }: { account: Account }) {
  const { t } = useI18n();
  const [confirm, setConfirm] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const word = t.accountPage.deleteWord;

  async function remove(e: FormEvent) {
    e.preventDefault();
    if (!supabase || confirm.trim().toUpperCase() !== word) return;
    setBusy(true);
    setError('');
    // Images first (the database cannot delete storage files), then the account and everything tied to it.
    const folder = account.session!.user.id;
    const { data: files } = await supabase.storage.from('submissions').list(folder, { limit: 1000 });
    if (files?.length) await supabase.storage.from('submissions').remove(files.map((f) => `${folder}/${f.name}`));
    const { error: err } = await supabase.rpc('delete_my_account');
    setBusy(false);
    if (err) return setError(t.accountPage.deleteFailed);
    await account.signOut();
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

/** Sign in, see your entries and points, change your nickname or delete everything. */
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
                    {t.accountPage.email}: <span className="text-bone">{account.session!.user.email}</span>
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
                  <Entries userId={account.session!.user.id} />
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
