import { BrowserRouter, Route, Routes } from "react-router";
import { ScrollToTop } from "./components/ScrollToTop";
import { HomePage } from "./pages/HomePage";
import { NoticePage } from "./pages/NoticePage";
import { PrivacyPage } from "./pages/PrivacyPage";
import { TermsPage } from "./pages/TermsPage";
import { FloatingActions } from "./components/FloatingActions";
import { EventDetailPage } from "./pages/EventDetailPage";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/notice" element={<NoticePage />} />
        <Route path="/events/:slug" element={<EventDetailPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
      </Routes>
      <FloatingActions />
    </BrowserRouter>
  );
}
