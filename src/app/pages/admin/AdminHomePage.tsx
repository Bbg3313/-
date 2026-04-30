import { Link } from "react-router";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { supabase } from "../../lib/supabase";

export function AdminHomePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 px-6 pt-32 md:pt-36 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between gap-3 mb-8">
            <h1 className="text-3xl font-semibold text-charcoal tracking-tight">관리자 대시보드</h1>
            <button
              type="button"
              onClick={() => supabase?.auth.signOut()}
              className="border border-border px-4 py-2 text-sm text-charcoal hover:border-gold-accent/40"
            >
              로그아웃
            </button>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            <Link to="/admin/hero" className="border border-border/70 bg-muted/20 p-6 hover:border-gold-accent/40 transition-colors">
              <p className="text-xs text-muted-foreground mb-1">Hero Carousel</p>
              <p className="text-xl font-semibold text-charcoal">히어로 배너 관리</p>
            </Link>
            <Link
              to="/admin/promotions"
              className="border border-border/70 bg-muted/20 p-6 hover:border-gold-accent/40 transition-colors"
            >
              <p className="text-xs text-muted-foreground mb-1">Promotions</p>
              <p className="text-xl font-semibold text-charcoal">프로모션 관리</p>
            </Link>
            <Link
              to="/admin/notices"
              className="border border-border/70 bg-muted/20 p-6 hover:border-gold-accent/40 transition-colors"
            >
              <p className="text-xs text-muted-foreground mb-1">Notice Board</p>
              <p className="text-xl font-semibold text-charcoal">공지사항 관리</p>
            </Link>
            <Link
              to="/admin/pricing"
              className="border border-border/70 bg-muted/20 p-6 hover:border-gold-accent/40 transition-colors"
            >
              <p className="text-xs text-muted-foreground mb-1">Pricing</p>
              <p className="text-xl font-semibold text-charcoal">시술 · 가격 수정</p>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

