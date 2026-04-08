import { Link } from "react-router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { PrivacyPolicyContent } from "../components/PrivacyPolicyContent";

export function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 pt-32 md:pt-36 pb-20 px-6">
        <article className="max-w-3xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center py-1 text-sm leading-none text-muted-foreground hover:text-gold-accent transition-colors mb-8"
          >
            ← 홈으로
          </Link>
          <h1 className="text-charcoal text-3xl md:text-4xl font-semibold mb-10 tracking-tight">
            개인정보처리방침
          </h1>
          <div className="text-sm">
            <PrivacyPolicyContent />
          </div>
        </article>
      </main>
      <Footer className="mt-auto" />
    </div>
  );
}
