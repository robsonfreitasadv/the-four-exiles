import { useCallback, useEffect, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { supabase, type Submission } from '../../lib/supabase';
import { useI18n } from '../../i18n/I18nProvider';
import { AccountGate } from '../auth/AccountGate';

const MAX_BYTES = 5 * 1024 * 1024;
const TYPES = ['image/png', 'image/jpeg', 'image/webp', 'image/gif'];
const field =
  'mt-2 w-full rounded-2xl border border-graphite-500 bg-graphite-800 px-4 py-3 text-bone placeholder:text-bone-muted focus:border-bone focus:outline-none';

function MyEntries({ slug, userId, refresh }: { slug: string; userId: string; refresh: number }) {
  const { t } = useI18n();
  const [items, setItems] = useState<Submission[]>([]);

  useEffect(() => {
    if (!supabase) return;
    void supabase
      .from('submissions')
      .select('*')
      .eq('mission_slug', slug)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .then(function loaded({ data }) {
        setItems((data as Submission[] | null) ?? []);
      });
  }, [slug, userId, refresh]);

  if (!items.length) return null;
  const colour = { pending: 'text-[#ffd60a]', approved: 'text-[#5fe07f]', rejected: 'text-signal' };
  return (
    <div className="mt-6">
      <h3 className="mb-2 text-sm font-semibold text-bone-muted">{t.missionForm.mine}</h3>
      <ul className="space-y-2">
        {items.map((s) => (
          <li key={s.id} className="rounded-2xl bg-graphite-800 px-4 py-3 text-sm">
            <span className="text-bone">{s.title}</span>
            <span className={`ml-2 ${colour[s.status]}`}>· {t.missionForm.status[s.status]}</span>
            {s.moderator_note && <p className="mt-1 text-bone-muted">{s.moderator_note}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Real mission entry: signed-in people send a link or an image; moderators approve and points follow. */
export function MissionSubmit({ slug }: { slug: string }) {
  const { t } = useI18n();
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [note, setNote] = useState('');
  const [licence, setLicence] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [refresh, setRefresh] = useState(0);

  const reset = useCallback(() => {
    setTitle('');
    setLink('');
    setFile(null);
    setNote('');
    setLicence(false);
  }, []);

  async function send(e: FormEvent, userId: string) {
    e.preventDefault();
    if (!supabase) return;
    setMessage('');
    if (!link.trim() && !file) return setMessage(t.missionForm.needOne);
    if (link.trim() && !/^https:\/\/\S{4,500}$/.test(link.trim())) return setMessage(t.missionForm.badLink);
    if (file && (!TYPES.includes(file.type) || file.size > MAX_BYTES)) return setMessage(t.missionForm.badFile);
    setBusy(true);
    let imagePath: string | null = null;
    if (file) {
      const ext = file.type.split('/')[1].replace('jpeg', 'jpg');
      imagePath = `${userId}/${crypto.randomUUID()}.${ext}`;
      const { error } = await supabase.storage.from('submissions').upload(imagePath, file, { contentType: file.type, upsert: false });
      if (error) {
        setBusy(false);
        return setMessage(t.missionForm.failed);
      }
    }
    const { error } = await supabase.from('submissions').insert({
      mission_slug: slug,
      title: title.trim(),
      link_url: link.trim() || null,
      image_path: imagePath,
      note: note.trim() || null,
      licence_ok: licence,
    });
    setBusy(false);
    if (error) return setMessage(t.missionForm.failed);
    reset();
    setRefresh((n) => n + 1);
    setMessage(t.missionForm.sent);
  }

  return (
    <div className="panel space-y-4 p-5">
      <h2 className="font-display text-2xl font-semibold">{t.missionForm.title}</h2>
      <AccountGate>
        {(account) => (
          <>
            <p className="text-sm text-bone-muted">
              {t.missionForm.signedAs.replace('{name}', account.profile!.display_name)}{' '}
              <button type="button" className="underline" onClick={() => void account.signOut()}>
                {t.account.signOut}
              </button>
            </p>
            <form onSubmit={(e) => void send(e, account.session!.user.id)} className="space-y-3">
              <label className="block">
                <span className="text-sm text-bone-muted">{t.missionForm.entryTitle}</span>
                <input required minLength={2} maxLength={120} value={title} onChange={(e) => setTitle(e.target.value)} className={field} />
              </label>
              <label className="block">
                <span className="text-sm text-bone-muted">{t.missionForm.link}</span>
                <input type="url" placeholder="https://" value={link} onChange={(e) => setLink(e.target.value)} className={field} />
              </label>
              <label className="block">
                <span className="text-sm text-bone-muted">{t.missionForm.image}</span>
                <input type="file" accept={TYPES.join(',')} onChange={(e) => setFile(e.target.files?.[0] ?? null)} className="mt-2 block w-full text-sm text-bone-dim" />
              </label>
              <label className="block">
                <span className="text-sm text-bone-muted">{t.missionForm.note}</span>
                <textarea maxLength={1000} rows={3} value={note} onChange={(e) => setNote(e.target.value)} className={field} />
              </label>
              <label className="flex gap-3 text-sm text-bone-dim">
                <input type="checkbox" required checked={licence} onChange={(e) => setLicence(e.target.checked)} className="mt-1" />
                <span>
                  {t.missionForm.licence}{' '}
                  <Link to="/terms" className="underline">
                    {t.nav.terms}
                  </Link>
                </span>
              </label>
              <button type="submit" disabled={busy} className="btn-primary w-full disabled:opacity-60">
                {busy ? t.missionForm.sending : t.missionForm.send}
              </button>
              {message && (
                <p className="text-sm text-bone" role="status">
                  {message}
                </p>
              )}
            </form>
            <MyEntries slug={slug} userId={account.session!.user.id} refresh={refresh} />
          </>
        )}
      </AccountGate>
    </div>
  );
}
