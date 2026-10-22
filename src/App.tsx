import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { ChoosePage } from './pages/ChoosePage';
import { LegalPage } from './pages/LegalPage';
import { Season0Page } from './pages/Season0Page';
import { StorePage } from './pages/StorePage';
import { ModerationPage } from './pages/ModerationPage';
import { AccountPage } from './pages/AccountPage';
import { SiteFooter } from './components/layout/SiteFooter';
import { SiteHeader } from './components/layout/SiteHeader';
import { ScrollToTop } from './components/ui/primitives';
import { FactionDetailPage, FactionsPage } from './pages/FactionPages';
import { HomePage } from './pages/HomePage';
import { GraysPage, MantisPage, NordicsPage, ReptiliansPage } from './pages/RaceFilePages';
import {
  CharactersPage,
  CollectiblesPage,
  GalacticWarPage,
  
  LorePage,
  MarketPage,
  TransparencyPage,
} from './pages/InfoPages';
import { MissionDetailPage, MissionsPage } from './pages/MissionPages';
import { NotFoundPage } from './pages/NotFoundPage';

const renamedRaces: Record<string, string> = {
  'vhal-ett': 'grays',
  ilvani: 'nordics',
  sazhi: 'reptilians',
  'xhalen-kthrix': 'mantis',
};

function Layout() {
  return (
    <>
      <ScrollToTop />
      <SiteHeader />
      <main id="main" tabIndex={-1} className="outline-none">
        <Outlet />
      </main>
      <SiteFooter />
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="factions" element={<FactionsPage />} />
        {/* races were renamed after the characters on their official sheets (now characters) */}
        {Object.entries(renamedRaces).map(([from, to]) => (
          <Route key={from} path={`factions/${from}`} element={<Navigate to={`/factions/${to}`} replace />} />
        ))}
        <Route path="factions/:id" element={<FactionDetailPage />} />
        <Route path="lore" element={<LorePage />} />
        <Route path="characters" element={<CharactersPage />} />
        <Route path="grays" element={<GraysPage />} />
        <Route path="nordics" element={<NordicsPage />} />
        <Route path="reptilians" element={<ReptiliansPage />} />
        <Route path="mantis" element={<MantisPage />} />
        <Route path="galactic-war" element={<GalacticWarPage />} />
        <Route path="choose" element={<ChoosePage />} />
        <Route path="season-0" element={<Season0Page />} />
        <Route path="store" element={<StorePage />} />
        <Route path="moderation" element={<ModerationPage />} />
        <Route path="account" element={<AccountPage />} />
        <Route path="missions" element={<MissionsPage />} />
        <Route path="missions/:slug" element={<MissionDetailPage />} />
        <Route path="collectibles" element={<CollectiblesPage />} />
        <Route path="market" element={<MarketPage />} />
        <Route path="transparency" element={<TransparencyPage />} />
        <Route path="privacy" element={<LegalPage kind="privacy" />} />
        <Route path="terms" element={<LegalPage kind="terms" />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
