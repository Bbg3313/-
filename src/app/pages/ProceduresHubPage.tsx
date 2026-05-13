import { Link } from "react-router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import {
  PROCEDURE_CATEGORIES,
  listTreatmentsByCategory,
  procedureCategoryPath,
  procedureDetailPath,
} from "../../data/treatmentsCatalog";

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
              각 카테고리 아래에서 시술명을 누르면 상세로 이동합니다. 가격은 시술·가격 페이지에서 안내드립니다.
            </p>
          </div>

          <ul className="mx-auto grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PROCEDURE_CATEGORIES.map((cat) => {
              const treatments = listTreatmentsByCategory(cat.slug);
              return (
                <li key={cat.slug}>
                  <div className="flex h-full flex-col rounded-2xl border border-gold-accent/18 bg-gradient-to-b from-white to-[#faf8f4] p-6 shadow-[0_10px_36px_-24px_rgba(35,28,22,0.15)] ring-1 ring-white/70 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-0.5 hover:border-gold-accent/30 hover:shadow-[0_16px_44px_-26px_rgba(35,28,22,0.2)]">
                    <Link
                      to={procedureCategoryPath(cat.slug)}
                      className="text-lg font-semibold tracking-tight text-charcoal transition-colors hover:text-gold-accent sm:text-xl"
                    >
                      {cat.label}
                    </Link>
                    {treatments.length > 0 ? (
                      <ul className="mt-4 max-h-[14rem] space-y-2 overflow-y-auto pr-1 text-sm [scrollbar-gutter:stable]">
                        {treatments.map((t) => (
                          <li key={t.slug}>
                            <Link
                              to={procedureDetailPath(cat.slug, t.slug)}
                              className="text-muted-foreground transition-colors [word-break:keep-all] hover:text-gold-accent"
                            >
                              {t.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mt-4 text-sm text-muted-foreground">등록된 시술이 없습니다.</p>
                    )}
                    <Link
                      to={procedureCategoryPath(cat.slug)}
                      className="mt-5 text-xs font-medium uppercase tracking-[0.2em] text-gold-accent/90 transition-colors hover:text-gold-accent"
                    >
                      카테고리 전체 보기 →
                    </Link>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </main>
      <Footer className="mt-auto" />
    </div>
  );
}
