import { Link } from "react-router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export function NoticePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 pt-28 md:pt-32 pb-16 px-6">
        <article className="max-w-3xl mx-auto">
          <Link
            to="/"
            className="inline-block text-sm text-muted-foreground hover:text-gold-accent transition-colors mb-8"
          >
            ← 홈으로
          </Link>
          <h1
            className="text-charcoal text-3xl md:text-4xl mb-8 tracking-tight"
            style={{ fontFamily: "'Playfair Display', serif", fontWeight: 500 }}
          >
            공지사항
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            등록된 공지사항이 없습니다. 안내가 있을 경우 이곳에 게시됩니다.
          </p>
        </article>
      </main>
      <Footer className="mt-auto" />
    </div>
  );
}
