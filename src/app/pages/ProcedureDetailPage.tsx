import { Link, useParams } from "react-router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import {
  PROCEDURE_SPEC_LABELS,
  getProcedureCategory,
  getProcedureTreatment,
  procedureCategoryPath,
} from "../../data/treatmentsCatalog";
import { useProcedureHeroImageOverrides } from "../hooks/useProcedureHeroImageOverrides";
import { useProcedureSpecOverridesMap } from "../hooks/useProcedureSpecOverridesMap";
import { pickProcedureHeroImageUrl, procedureHeroImageStorageKey } from "../lib/procedureHeroImages";
import { mergeProcedureSpecs } from "../lib/procedureSpecsMerge";

export function ProcedureDetailPage() {
  const { categorySlug = "", treatmentSlug = "" } = useParams();
  const { map: heroOverrides } = useProcedureHeroImageOverrides();
  const { map: specOverrides } = useProcedureSpecOverridesMap();
  const category = getProcedureCategory(categorySlug);
  const treatment = getProcedureTreatment(categorySlug, treatmentSlug);

  if (!category || !treatment) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <Header />
        <main className="flex-1 px-4 pb-28 pt-28 text-center sm:px-6 md:pb-24 md:pt-36">
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
  const heroSrc = pickProcedureHeroImageUrl(categorySlug, treatmentSlug, treatment.heroImage, heroOverrides);
  const specStorageKey = procedureHeroImageStorageKey(categorySlug, treatmentSlug);
  const displaySpecs = mergeProcedureSpecs(treatment.specs, specOverrides[specStorageKey] ?? specOverrides[treatmentSlug]);

  const normalizeText = (s: string) => s.replace(/\r\n/g, "\n").trim();
  const showBodyNarrative =
    treatment.body.trim().length > 0 &&
    normalizeText(treatment.body) !== normalizeText(displaySpecs.procedureInfo);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 px-4 pb-28 pt-28 sm:px-6 md:pb-24 md:pt-36">
        <div className="mx-auto max-w-3xl">
          <nav className="mb-5 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs text-muted-foreground sm:mb-6 sm:gap-2 sm:text-sm">
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
            <header className="mb-6 sm:mb-8">
              <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-gold-accent/90">Procedure</p>
              <h1
                className="mt-2 text-charcoal"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(1.55rem, 5vw, 2.35rem)",
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

            {heroSrc ? (
              <div className="relative mb-8 aspect-[16/10] w-full overflow-hidden rounded-2xl border border-border/50 bg-muted/20 shadow-sm">
                <ImageWithFallback
                  src={heroSrc}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover object-center"
                />
              </div>
            ) : null}

            <section
              className="mb-8 overflow-hidden rounded-2xl border border-border/55 bg-white/90 shadow-sm ring-1 ring-black/[0.03]"
              aria-labelledby="procedure-spec-heading"
            >
              <h2
                id="procedure-spec-heading"
                className="border-b border-gold-accent/20 bg-[#faf8f4] px-3 py-2.5 text-sm font-semibold tracking-tight text-charcoal sm:px-5 sm:py-3"
              >
                시술 요약
              </h2>
              <dl className="divide-y divide-border/50">
                {PROCEDURE_SPEC_LABELS.map(({ key, label }) => (
                  <div
                    key={key}
                    className="grid gap-1 px-3 py-3 sm:grid-cols-[minmax(7rem,9rem)_1fr] sm:items-start sm:gap-4 sm:px-5 sm:py-3.5"
                  >
                    <dt className="text-xs font-semibold uppercase tracking-wide text-gold-accent/90 sm:pt-0.5">
                      {label}
                    </dt>
                    <dd className="whitespace-pre-line text-[15px] leading-relaxed text-charcoal/90 [word-break:keep-all] sm:text-[15px]">
                      {displaySpecs[key]}
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

            {showBodyNarrative ? (
              <div className="rounded-2xl border border-gold-accent/15 bg-white/80 p-5 shadow-sm ring-1 ring-black/[0.03] sm:p-7">
                <p className="whitespace-pre-line text-[15px] leading-[1.75] text-charcoal/90 [word-break:keep-all] sm:text-base">
                  {treatment.body}
                </p>
              </div>
            ) : null}

            <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center">
              <Link
                to={priceHref}
                className="inline-flex min-h-12 w-full items-center justify-center rounded-xl border border-gold-accent/35 bg-gradient-to-b from-[#fff9ed] to-[#f3e6c8] px-5 py-3 text-sm font-semibold text-charcoal shadow-sm transition active:opacity-90 sm:min-h-0 sm:w-auto sm:hover:border-gold-accent/55"
              >
                시술 · 가격표에서 금액 보기
              </Link>
              <Link
                to={procedureCategoryPath(category.slug)}
                className="inline-flex min-h-12 w-full items-center justify-center rounded-xl border border-border px-5 py-3 text-sm font-medium text-muted-foreground transition active:bg-muted/40 sm:min-h-0 sm:w-auto sm:hover:border-gold-accent/30 sm:hover:text-charcoal"
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
