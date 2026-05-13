import { Link } from "react-router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { cn } from "../components/ui/utils";
import { SECTION_TITLE_RULE_CLASS } from "../config/sectionDecor";
import {
  PROCEDURE_CATEGORIES,
  listTreatmentsByCategory,
  procedureCategoryPath,
  procedureDetailPath,
} from "../../data/treatmentsCatalog";

/** 모바일에서 대카테고리 카드만 색으로 구분 (md 이상은 기존 통일 톤) */
function hubCategoryCardMobileClass(slug: string): string {
  const bySlug: Record<string, string> = {
    "botox-filler":
      "max-md:border max-md:border-rose-200/80 max-md:border-l-[6px] max-md:border-l-rose-500 max-md:bg-gradient-to-br max-md:from-rose-50 max-md:to-amber-50/90 max-md:ring-1 max-md:ring-rose-100/45",
    "thread-lifting":
      "max-md:border max-md:border-violet-200/75 max-md:border-l-[6px] max-md:border-l-violet-500 max-md:bg-gradient-to-br max-md:from-violet-50 max-md:to-fuchsia-50/85 max-md:ring-1 max-md:ring-violet-100/40",
    laser:
      "max-md:border max-md:border-sky-200/80 max-md:border-l-[6px] max-md:border-l-sky-500 max-md:bg-gradient-to-br max-md:from-sky-50 max-md:to-cyan-50/90 max-md:ring-1 max-md:ring-sky-100/40",
    "lifting-laser":
      "max-md:border max-md:border-amber-200/80 max-md:border-l-[6px] max-md:border-l-amber-500 max-md:bg-gradient-to-br max-md:from-amber-50 max-md:to-orange-50/85 max-md:ring-1 max-md:ring-amber-100/40",
    "glow-booster":
      "max-md:border max-md:border-emerald-200/75 max-md:border-l-[6px] max-md:border-l-emerald-500 max-md:bg-gradient-to-br max-md:from-emerald-50 max-md:to-teal-50/88 max-md:ring-1 max-md:ring-emerald-100/38",
    "hair-removal":
      "max-md:border max-md:border-slate-200/85 max-md:border-l-[6px] max-md:border-l-slate-500 max-md:bg-gradient-to-br max-md:from-slate-50 max-md:to-zinc-50/90 max-md:ring-1 max-md:ring-slate-100/45",
    "tattoo-removal":
      "max-md:border max-md:border-indigo-200/75 max-md:border-l-[6px] max-md:border-l-indigo-500 max-md:bg-gradient-to-br max-md:from-indigo-50 max-md:to-violet-50/85 max-md:ring-1 max-md:ring-indigo-100/40",
  };
  return (
    bySlug[slug] ??
    "max-md:border max-md:border-gold-accent/25 max-md:border-l-[6px] max-md:border-l-gold-accent max-md:bg-gradient-to-b max-md:from-white max-md:to-[#faf8f4] max-md:ring-1 max-md:ring-white/70"
  );
}

export function ProceduresHubPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 px-4 pb-28 pt-28 sm:px-6 md:pb-24 md:pt-36">
        <div className="mx-auto max-w-6xl">
          <Link
            to="/"
            className="mb-6 inline-flex min-h-11 items-center py-2 text-sm text-muted-foreground transition-colors active:text-gold-accent hover:text-gold-accent sm:mb-8"
          >
            ← 홈으로
          </Link>

          <div className="mb-8 text-center md:mb-14">
            <div className={SECTION_TITLE_RULE_CLASS} aria-hidden />
            <h1 className="mb-2 text-2xl font-semibold leading-tight tracking-tight text-charcoal sm:mb-4 sm:text-3xl md:text-4xl">
              시술 안내
            </h1>
            <p className="mx-auto max-w-2xl px-1 text-sm leading-relaxed text-muted-foreground [word-break:keep-all] sm:px-0 sm:text-base">
              각 카테고리 아래에서 시술명을 누르면 상세로 이동합니다. 가격은 시술·가격 페이지에서 안내드립니다.
            </p>
          </div>

          <ul className="mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PROCEDURE_CATEGORIES.map((cat) => {
              const treatments = listTreatmentsByCategory(cat.slug);
              return (
                <li key={cat.slug}>
                  <div
                    className={cn(
                      "flex h-full flex-col rounded-2xl border p-4 shadow-[0_10px_36px_-24px_rgba(35,28,22,0.15)] transition-[transform,box-shadow,border-color] duration-300 active:scale-[0.99] sm:p-6 sm:hover:-translate-y-0.5 sm:hover:shadow-[0_16px_44px_-26px_rgba(35,28,22,0.2)]",
                      "md:border-gold-accent/18 md:bg-gradient-to-b md:from-white md:to-[#faf8f4] md:ring-1 md:ring-white/70 md:hover:border-gold-accent/30",
                      hubCategoryCardMobileClass(cat.slug),
                    )}
                  >
                    <Link
                      to={procedureCategoryPath(cat.slug)}
                      className="min-h-11 text-base font-semibold tracking-tight text-charcoal transition-colors active:text-gold-accent sm:min-h-0 sm:text-lg sm:hover:text-gold-accent md:text-xl"
                    >
                      {cat.label}
                    </Link>
                    {treatments.length > 0 ? (
                      <ul className="mt-3 max-h-[min(40vh,15rem)] space-y-0.5 overflow-y-auto pr-1 text-sm [scrollbar-gutter:stable] sm:mt-4 sm:max-h-[14rem] sm:space-y-2">
                        {treatments.map((t) => (
                          <li key={t.slug}>
                            <Link
                              to={procedureDetailPath(cat.slug, t.slug)}
                              className="block min-h-11 rounded-md py-2.5 text-muted-foreground transition-colors [word-break:keep-all] active:bg-muted/50 active:text-gold-accent sm:min-h-0 sm:py-0 sm:hover:text-gold-accent"
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
                      className="mt-4 inline-flex min-h-11 items-center text-xs font-medium uppercase tracking-[0.2em] text-gold-accent/90 transition-colors active:text-gold-accent sm:mt-5 sm:min-h-0 sm:hover:text-gold-accent"
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
