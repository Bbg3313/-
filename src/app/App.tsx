import { BrowserRouter, Route, Routes } from "react-router";
import { ScrollToTop } from "./components/ScrollToTop";
import { HomePage } from "./pages/HomePage";
import { NoticePage } from "./pages/NoticePage";
import { PrivacyPage } from "./pages/PrivacyPage";
import { TermsPage } from "./pages/TermsPage";
import { ReservationPage } from "./pages/ReservationPage";
import { RESERVATION_PAGE_PATH } from "./config/siteLinks";
import { FloatingActions } from "./components/FloatingActions";
import { EventDetailPage } from "./pages/EventDetailPage";
import { EventsBoardPage } from "./pages/EventsBoardPage";
import { PricingPage } from "./pages/PricingPage";
import { AdminLoginPage } from "./pages/admin/AdminLoginPage";
import { AdminHomePage } from "./pages/admin/AdminHomePage";
import { AdminHeroPage } from "./pages/admin/AdminHeroPage";
import { AdminPromotionsPage } from "./pages/admin/AdminPromotionsPage";
import { RequireAdmin } from "./components/admin/RequireAdmin";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/notice" element={<NoticePage />} />
        <Route path={RESERVATION_PAGE_PATH} element={<ReservationPage />} />
        <Route path="/events" element={<EventsBoardPage />} />
        <Route path="/events/:slug" element={<EventDetailPage />} />
        <Route path="/promotions/:slug" element={<EventDetailPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route
          path="/admin"
          element={
            <RequireAdmin>
              <AdminHomePage />
            </RequireAdmin>
          }
        />
        <Route
          path="/admin/hero"
          element={
            <RequireAdmin>
              <AdminHeroPage />
            </RequireAdmin>
          }
        />
        <Route
          path="/admin/promotions"
          element={
            <RequireAdmin>
              <AdminPromotionsPage />
            </RequireAdmin>
          }
        />
      </Routes>
      <FloatingActions />
    </BrowserRouter>
  );
}
