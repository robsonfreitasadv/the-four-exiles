import { createContext, createElement, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase, type Profile } from '../../lib/supabase';

export interface Account {
  enabled: boolean;
  loading: boolean;
  session: Session | null;
  profile: Profile | null;
  moderator: boolean;
  reload: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AccountContext = createContext<Account | null>(null);

/** One shared sign-in state for the whole site (header, account page, missions, moderation). */
export function AccountProvider({ children }: { children: ReactNode }) {
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
    // The callback must not await other Supabase calls directly (it holds the auth lock), so defer the load.
    const { data } = supabase.auth.onAuthStateChange(function changed(_event, s) {
      setTimeout(() => void load(s), 0);
    });
    return () => data.subscription.unsubscribe();
  }, [load]);

  const value = useMemo<Account>(
    () => ({
      enabled: Boolean(supabase),
      loading,
      session,
      profile,
      moderator,
      reload: () => load(session),
      signOut: async () => {
        // 'local' clears this browser's session even when the network call fails.
        await supabase?.auth.signOut({ scope: 'local' });
      },
    }),
    [loading, session, profile, moderator, load],
  );

  return createElement(AccountContext.Provider, { value }, children);
}

export function useAccount(): Account {
  const account = useContext(AccountContext);
  if (!account) throw new Error('useAccount needs <AccountProvider>');
  return account;
}
