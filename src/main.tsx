import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import App from './App';
import { AccountProvider, RECOVERY_KEY } from './components/auth/useAccount';
import { I18nProvider } from './i18n/I18nProvider';
import { supabase } from './lib/supabase';
import './index.css';

/** Static builds (`npm run build:static`) use hash URLs so they work on any file host without rewrites. */
const hashRouting = import.meta.env.VITE_HASH_ROUTER === 'true';
const Router = hashRouting ? HashRouter : BrowserRouter;

/**
 * The sign-in link comes back as `…/#access_token=…`. With hash URLs the router would read that as a page, so
 * let Supabase take the session from the address first, then land on the account page.
 */
async function finishEmailSignIn() {
  if (!supabase || !/(access_token|error_description)=/.test(window.location.hash)) return;
  const recovery = /type=recovery/.test(window.location.hash);
  try {
    // An expired link just leaves the person signed out.
    const { data } = await supabase.auth.getSession();
    // A valid "forgot password" link: the account page then opens with the new-password form first.
    if (recovery && data.session) {
      try {
        sessionStorage.setItem(RECOVERY_KEY, '1');
      } catch {
        /* storage blocked: the password form is still on the account page */
      }
    }
  } finally {
    const clean = window.location.pathname + window.location.search;
    window.history.replaceState(null, '', hashRouting ? `${clean}#/account` : clean);
  }
}

void finishEmailSignIn().finally(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <Router>
        <I18nProvider>
          <AccountProvider>
            <App />
          </AccountProvider>
        </I18nProvider>
      </Router>
    </StrictMode>,
  );
});
