import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import App from './App';
import { AccountProvider } from './components/auth/useAccount';
import { I18nProvider } from './i18n/I18nProvider';
import './index.css';

/** Static builds (`npm run build:static`) use hash URLs so they work on any file host without rewrites. */
const hashRouting = import.meta.env.VITE_HASH_ROUTER === 'true';
const Router = hashRouting ? HashRouter : BrowserRouter;

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
