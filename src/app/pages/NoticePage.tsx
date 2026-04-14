import { Link } from "react-router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { ConsultationChannelsSection } from "../components/ConsultationChannelsSection";

export function NoticePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 pt-32 md:pt-36 pb-16 px-6">
        <article className="max-w-5xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center py-1 text-sm leading-none text-muted-foreground hover:text-gold-accent transition-colors mb-8"
          >
            ← 홈으로
          </Link>
          <h1 className="text-charcoal text-3xl md:text-4xl font-semibold mb-8 tracking-tight">
            공지사항
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            등록된 공지사항이 없습니다. 안내가 있을 경우 이곳에 게시됩니다.
          </p>

          <ConsultationChannelsSection />
        </article>
      </main>
      <Footer className="mt-auto" />
    </div>
  );
}
