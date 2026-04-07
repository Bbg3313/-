import { Link } from "react-router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { TermsOfServiceContent } from "../components/TermsOfServiceContent";

export function TermsPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 pt-28 md:pt-32 pb-20 px-6">
        <article className="max-w-3xl mx-auto">
          <Link
            to="/"
            className="inline-block text-sm text-muted-foreground hover:text-gold-accent transition-colors mb-8"
          >
            ← 홈으로
          </Link>
          <h1
            className="text-charcoal text-3xl md:text-4xl mb-10 tracking-tight"
            style={{ fontFamily: "'Playfair Display', serif", fontWeight: 500 }}
          >
            서비스이용약관
          </h1>
          <TermsOfServiceContent />
        </article>
      </main>
      <Footer className="mt-auto" />
    </div>
  );
}
