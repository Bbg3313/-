import { Link } from "react-router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { PROCEDURE_CATEGORIES, procedureCategoryPath } from "../../data/treatmentsCatalog";

export function ProceduresHubPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 px-6 pb-24 pt-32 md:pt-36">
        <div className="mx-auto max-w-6xl">
          <Link
            to="/"
            className="mb-8 inline-flex items-center py-1 text-sm text-muted-foreground transition-colors hover:text-gold-accent"
          >
            ← 홈으로
          </Link>

          <div className="mb-10 text-center md:mb-14">
            <div className="mx-auto mb-5 h-px w-12 bg-gold-accent sm:mb-6" />
            <h1
              className="mb-3 text-charcoal sm:mb-4"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2rem, 4vw, 2.75rem)",
                lineHeight: 1.12,
                fontWeight: 500,
              }}
            >
              시술 안내
            </h1>
            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-muted-foreground [word-break:keep-all] sm:text-base">
              카테고리별 시술 정보를 확인하실 수 있습니다. 가격은 시술·가격 페이지에서 함께 안내드립니다.
            </p>
          </div>

          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {PROCEDURE_CATEGORIES.map((cat) => (
              <li key={cat.slug}>
                <Link
                  to={procedureCategoryPath(cat.slug)}
                  className="group flex h-full flex-col rounded-2xl border border-gold-accent/18 bg-gradient-to-b from-white to-[#faf8f4] p-5 shadow-[0_10px_36px_-24px_rgba(35,28,22,0.15)] ring-1 ring-white/70 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-0.5 hover:border-gold-accent/30 hover:shadow-[0_16px_44px_-26px_rgba(35,28,22,0.2)] sm:p-6"
                >
                  <h2 className="text-lg font-semibold tracking-tight text-charcoal group-hover:text-gold-accent sm:text-xl">
                    {cat.label}
                  </h2>
                  {cat.blurb ? (
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground [word-break:keep-all]">{cat.blurb}</p>
                  ) : null}
                  <span className="mt-4 text-xs font-medium uppercase tracking-[0.2em] text-gold-accent/90">자세히 →</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer className="mt-auto" />
    </div>
  );
}
