import { useCallback, useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase, type Profile } from '../../lib/supabase';

/** Signed-in session, the person's profile (race and nickname) and whether they moderate. */
export function useAccount() {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [moderator, setModerator] = useState(false);
  const [loading, setLoading] = useState(Boolean(supabase));

  const load = useCallback(async (s: Session | null) => {
    setSession(s);
    if (!supabase || !s) {
      setProfile(null);
      setModerator(false);
      setLoading(false);
      return;
    }
    const [{ data: p }, { data: m }] = await Promise.all([
      supabase.from('profiles').select('id, display_name, race').eq('id', s.user.id).maybeSingle(),
      supabase.from('moderators').select('user_id').eq('user_id', s.user.id).maybeSingle(),
    ]);
    setProfile((p as Profile | null) ?? null);
    setModerator(Boolean(m));
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!supabase) return;
    void supabase.auth.getSession().then(function initial({ data }) {
      return load(data.session);
    });
    const { data } = supabase.auth.onAuthStateChange(function changed(_event, s) {
      void load(s);
    });
    return () => data.subscription.unsubscribe();
  }, [load]);

  return {
    enabled: Boolean(supabase),
    loading,
    session,
    profile,
    moderator,
    reload: () => load(session),
    signOut: async () => {
      await supabase?.auth.signOut();
    },
  };
}
