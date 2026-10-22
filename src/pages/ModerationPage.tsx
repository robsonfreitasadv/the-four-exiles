import { useCallback, useEffect, useState } from 'react';
import { AccountGate } from '../components/auth/AccountGate';
import { SectionHeading } from '../components/ui/primitives';
import { supabase, type Submission } from '../lib/supabase';
import { useI18n } from '../i18n/I18nProvider';

interface Row extends Submission {
  imageUrl?: string;
}

function Queue() {
  const { t } = useI18n();
  const [rows, setRows] = useState<Row[]>([]);
  const [notes, setNotes] = useState<Record<string, string>>({});

  const load = useCallback(async () => {
    if (!supabase) return;
    const { data } = await supabase.from('submissions').select('*').eq('status', 'pending').order('created_at').limit(50);
    const list = (data as Submission[] | null) ?? [];
    const withImages = await Promise.all(
      list.map(async (s) => {
        if (!s.image_path || !supabase) return s;
        const { data: signed } = await supabase.storage.from('submissions').createSignedUrl(s.image_path, 3600);
        return { ...s, imageUrl: signed?.signedUrl };
      }),
    );
    setRows(withImages);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function review(id: string, status: 'approved' | 'rejected') {
    if (!supabase) return;
    await supabase.from('submissions').update({ status, moderator_note: notes[id]?.trim() || null }).eq('id', id);
    void load();
  }

  if (!rows.length) return <p className="text-bone-dim">{t.moderation.empty}</p>;
  return (
    <ul className="grid gap-4 md:grid-cols-2">
      {rows.map((s) => (
        <li key={s.id} className="rounded-[24px] bg-graphite-800 p-5">
          <p className="text-xs text-bone-muted">
            {s.mission_slug} · {new Date(s.created_at).toLocaleString()}
          </p>
          <h3 className="mt-1 font-display text-xl font-semibold text-bone">{s.title}</h3>
          {s.imageUrl && <img src={s.imageUrl} alt="" className="mt-3 max-h-80 rounded-xl object-contain" />}
          {s.link_url && (
            <a href={s.link_url} target="_blank" rel="noopener noreferrer nofollow" className="mt-2 block break-all text-sm text-link underline">
              {s.link_url}
            </a>
          )}
          {s.note && <p className="mt-2 text-sm text-bone-dim">{s.note}</p>}
          <input
            placeholder={t.moderation.note}
            maxLength={500}
            value={notes[s.id] ?? ''}
            onChange={(e) => setNotes({ ...notes, [s.id]: e.target.value })}
            className="mt-3 w-full rounded-xl border border-graphite-500 bg-graphite-700 px-3 py-2 text-sm text-bone"
          />
          <div className="mt-3 flex gap-2">
            <button type="button" className="btn-primary px-4 py-2 text-sm" onClick={() => void review(s.id, 'approved')}>
              {t.moderation.approve}
            </button>
            <button type="button" className="btn-ghost px-4 py-2 text-sm" onClick={() => void review(s.id, 'rejected')}>
              {t.moderation.reject}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

/** Moderation queue: only people listed in public.moderators see entries (enforced by the database). */
export function ModerationPage() {
  const { t } = useI18n();
  return (
    <div className="container-x py-14 md:py-20">
      <SectionHeading as="h1" kicker={t.moderation.kicker} title={t.moderation.title} intro={t.moderation.intro} />
      <div className="max-w-5xl">
        <AccountGate>{(account) => (account.moderator ? <Queue /> : <p className="text-bone-dim">{t.moderation.notModerator}</p>)}</AccountGate>
      </div>
    </div>
  );
}
