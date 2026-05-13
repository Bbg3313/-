import { Link, useParams } from "react-router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import {
  getProcedureCategory,
  listTreatmentsByCategory,
  procedureCategoryPath,
  procedureDetailPath,
} from "../../data/treatmentsCatalog";
import { useProcedureHeroImageOverrides } from "../hooks/useProcedureHeroImageOverrides";
import { pickProcedureHeroImageUrl } from "../lib/procedureHeroImages";

export function ProcedureCategoryPage() {
  const { categorySlug = "" } = useParams();
  const category = getProcedureCategory(categorySlug);
  const treatments = category ? listTreatmentsByCategory(categorySlug) : [];
  const { map: heroOverrides } = useProcedureHeroImageOverrides();

  if (!category) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <Header />
        <main className="flex-1 px-4 pb-28 pt-28 text-center sm:px-6 md:pb-24 md:pt-36">
          <p className="text-muted-foreground">카테고리를 찾을 수 없습니다.</p>
          <Link to="/procedures" className="mt-4 inline-block text-gold-accent hover:underline">
            시술 안내 홈
          </Link>
        </main>
        <Footer className="mt-auto" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 px-4 pb-28 pt-28 sm:px-6 md:pb-24 md:pt-36">
        <div className="mx-auto max-w-6xl">
          <nav className="mb-5 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs text-muted-foreground sm:mb-6 sm:gap-2 sm:text-sm">
            <Link to="/" className="hover:text-gold-accent">
              홈
            </Link>
            <span aria-hidden>/</span>
            <Link to="/procedures" className="hover:text-gold-accent">
              시술 안내
            </Link>
            <span aria-hidden>/</span>
            <span className="text-charcoal">{category.label}</span>
          </nav>

          <header className="mb-8 border-b border-gold-accent/15 pb-6 md:mb-12 md:pb-8">
            <h1 className="text-2xl font-semibold leading-tight tracking-tight text-charcoal sm:text-3xl md:text-[2.125rem]">
              {category.label}
            </h1>
            {category.blurb ? (
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground [word-break:keep-all] sm:text-base">
                {category.blurb}
              </p>
            ) : null}
          </header>

          {treatments.length === 0 ? (
            <p className="text-muted-foreground">등록된 시술 항목이 없습니다.</p>
          ) : (
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:gap-6">
              {treatments.map((t) => {
                const heroSrc = pickProcedureHeroImageUrl(category.slug, t.slug, t.heroImage, heroOverrides);
                return (
                <li key={t.slug}>
                  <Link
                    to={procedureDetailPath(category.slug, t.slug)}
                    className="group flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-border/60 bg-white shadow-[0_8px_28px_-18px_rgba(35,28,22,0.12)] transition-[transform,box-shadow] duration-300 active:scale-[0.99] sm:hover:-translate-y-0.5 sm:hover:shadow-[0_14px_36px_-20px_rgba(35,28,22,0.18)]"
                  >
                    {heroSrc ? (
                      <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-muted/30">
                        <ImageWithFallback
                          src={heroSrc}
                          alt=""
                          className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-70" />
                      </div>
                    ) : (
                      <div className="aspect-[16/10] w-full shrink-0 bg-gradient-to-br from-[#f5f0e8] to-[#e8dfd2]" />
                    )}
                    <div className="flex flex-1 flex-col p-4 pb-5 sm:p-5">
                      <h2 className="text-[15px] font-semibold leading-snug text-charcoal [word-break:keep-all] sm:text-lg">
                        {t.title}
                      </h2>
                      {t.subtitle ? (
                        <p className="mt-1.5 text-sm text-muted-foreground [word-break:keep-all]">{t.subtitle}</p>
                      ) : null}
                      <span className="mt-auto pt-4 text-xs font-medium text-gold-accent">내용 보기 →</span>
                    </div>
                  </Link>
                </li>
                );
              })}
            </ul>
          )}

          <div className="mt-12 text-center">
            <Link to="/procedures" className="text-sm text-muted-foreground hover:text-gold-accent">
              ← 전체 카테고리
            </Link>
          </div>
        </div>
      </main>
      <Footer className="mt-auto" />
    </div>
  );
}
