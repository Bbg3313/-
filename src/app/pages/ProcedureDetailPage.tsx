import { Link, useParams } from "react-router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { PROCEDURE_SPEC_LABELS } from "../../data/procedureDetailSpecs";
import {
  getProcedureCategory,
  getProcedureTreatment,
  procedureCategoryPath,
} from "../../data/treatmentsCatalog";

export function ProcedureDetailPage() {
  const { categorySlug = "", treatmentSlug = "" } = useParams();
  const category = getProcedureCategory(categorySlug);
  const treatment = getProcedureTreatment(categorySlug, treatmentSlug);

  if (!category || !treatment) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <Header />
        <main className="flex-1 px-6 pb-24 pt-32 text-center md:pt-36">
          <p className="text-muted-foreground">시술 정보를 찾을 수 없습니다.</p>
          <Link to="/procedures" className="mt-4 inline-block text-gold-accent hover:underline">
            시술 안내 홈
          </Link>
        </main>
        <Footer className="mt-auto" />
      </div>
    );
  }

  const priceHref = treatment.priceSectionId ? `/pricing#pricing-${treatment.priceSectionId}` : "/pricing";

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 px-6 pb-24 pt-32 md:pt-36">
        <div className="mx-auto max-w-3xl">
          <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-gold-accent">
              홈
            </Link>
            <span aria-hidden>/</span>
            <Link to="/procedures" className="hover:text-gold-accent">
              시술 안내
            </Link>
            <span aria-hidden>/</span>
            <Link to={procedureCategoryPath(category.slug)} className="hover:text-gold-accent">
              {category.label}
            </Link>
            <span aria-hidden>/</span>
            <span className="text-charcoal">{treatment.title}</span>
          </nav>

          <article>
            <header className="mb-8">
              <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-gold-accent/90">Procedure</p>
              <h1
                className="mt-2 text-charcoal"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(1.75rem, 3.2vw, 2.35rem)",
                  lineHeight: 1.15,
                  fontWeight: 500,
                }}
              >
                {treatment.title}
              </h1>
              {treatment.subtitle ? (
                <p className="mt-3 text-base text-muted-foreground [word-break:keep-all] sm:text-lg">{treatment.subtitle}</p>
              ) : null}
            </header>

            {treatment.heroImage ? (
              <div className="mb-8 overflow-hidden rounded-2xl border border-border/50 bg-muted/20 shadow-sm">
                <ImageWithFallback src={treatment.heroImage} alt="" className="w-full object-cover object-center" />
              </div>
            ) : null}

            <section
              className="mb-8 overflow-hidden rounded-2xl border border-border/55 bg-white/90 shadow-sm ring-1 ring-black/[0.03]"
              aria-labelledby="procedure-spec-heading"
            >
              <h2
                id="procedure-spec-heading"
                className="border-b border-gold-accent/20 bg-[#faf8f4] px-4 py-3 text-sm font-semibold tracking-tight text-charcoal sm:px-5"
              >
                시술 요약
              </h2>
              <dl className="divide-y divide-border/50">
                {PROCEDURE_SPEC_LABELS.map(({ key, label }) => (
                  <div
                    key={key}
                    className="grid gap-1 px-4 py-3 sm:grid-cols-[minmax(7rem,9rem)_1fr] sm:items-start sm:gap-4 sm:px-5 sm:py-3.5"
                  >
                    <dt className="text-xs font-semibold uppercase tracking-wide text-gold-accent/90 sm:pt-0.5">
                      {label}
                    </dt>
                    <dd className="whitespace-pre-line text-[14px] leading-relaxed text-charcoal/90 [word-break:keep-all] sm:text-[15px]">
                      {treatment.specs[key]}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>

            {treatment.gallery && treatment.gallery.length > 0 ? (
              <ul className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {treatment.gallery.map((src) => (
                  <li key={src} className="overflow-hidden rounded-xl border border-border/40">
                    <ImageWithFallback src={src} alt="" className="aspect-square w-full object-cover" />
                  </li>
                ))}
              </ul>
            ) : null}

            <div className="rounded-2xl border border-gold-accent/15 bg-white/80 p-5 shadow-sm ring-1 ring-black/[0.03] sm:p-7">
              <p className="whitespace-pre-line text-[15px] leading-[1.75] text-charcoal/90 [word-break:keep-all] sm:text-base">
                {treatment.body}
              </p>
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Link
                to={priceHref}
                className="inline-flex items-center justify-center rounded-xl border border-gold-accent/35 bg-gradient-to-b from-[#fff9ed] to-[#f3e6c8] px-5 py-3 text-sm font-semibold text-charcoal shadow-sm transition hover:border-gold-accent/55"
              >
                시술 · 가격표에서 금액 보기
              </Link>
              <Link
                to={procedureCategoryPath(category.slug)}
                className="inline-flex items-center justify-center rounded-xl border border-border px-5 py-3 text-sm font-medium text-muted-foreground transition hover:border-gold-accent/30 hover:text-charcoal"
              >
                ← {category.label} 목록
              </Link>
            </div>
          </article>
        </div>
      </main>
      <Footer className="mt-auto" />
    </div>
  );
}
