import { Outlet, Route, Routes } from 'react-router-dom';
import { SiteFooter } from './components/layout/SiteFooter';
import { SiteHeader } from './components/layout/SiteHeader';
import { ScrollToTop } from './components/ui/primitives';
import { FactionDetailPage, FactionsPage } from './pages/FactionPages';
import { HomePage } from './pages/HomePage';
import { GraysPage } from './pages/GraysPage';
import {
  CharactersPage,
  CollectiblesPage,
  GalacticWarPage,
  LegalPage,
  LorePage,
  MarketPage,
  TransparencyPage,
} from './pages/InfoPages';
import { MissionDetailPage, MissionsPage } from './pages/MissionPages';
import { NotFoundPage } from './pages/NotFoundPage';

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
        <Route path="factions/:id" element={<FactionDetailPage />} />
        <Route path="lore" element={<LorePage />} />
        <Route path="characters" element={<CharactersPage />} />
        <Route path="grays" element={<GraysPage />} />
        <Route path="galactic-war" element={<GalacticWarPage />} />
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
