import { createContext, createElement, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { api, type Me, type Profile, type User } from '../../lib/api';

export interface Account {
  /** False when the API can't be reached (e.g. `npm run dev` without wrangler): the site shows "coming soon". */
  enabled: boolean;
  loading: boolean;
  user: User | null;
  profile: Profile | null;
  moderator: boolean;
  reload: () => Promise<void>;
  /** Takes the answer of a sign-in, sign-up or profile call, so the page updates without asking again. */
  apply: (me: Me) => void;
  signOut: () => Promise<void>;
}

const AccountContext = createContext<Account | null>(null);

const signedOut: Me = { user: null, profile: null, moderator: false };

/** One shared sign-in state for the whole site (header, account page, missions, moderation). */
export function AccountProvider({ children }: { children: ReactNode }) {
  const [me, setMe] = useState<Me>(signedOut);
  const [enabled, setEnabled] = useState(true);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async () => {
    const { data, error } = await api.me();
    if (data) {
      setMe(data);
      setEnabled(true);
    } else {
      setMe(signedOut);
      // Only an API that isn't there turns accounts off; a passing error keeps the sign-in form.
      setEnabled(error !== 'network' && error !== 'not_found' && error !== 'server_error');
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    void reload();
  }, [reload]);

  const value = useMemo<Account>(
    () => ({
      enabled,
      loading,
      user: me.user,
      profile: me.profile,
      moderator: me.moderator,
      reload,
      apply: setMe,
      signOut: async () => {
        await api.signOut();
        // Signed out here even when the network call failed; the cookie then just expires.
        setMe(signedOut);
      },
    }),
    [enabled, loading, me, reload],
  );

  return createElement(AccountContext.Provider, { value }, children);
}

export function useAccount(): Account {
  const account = useContext(AccountContext);
  if (!account) throw new Error('useAccount needs <AccountProvider>');
  return account;
}
