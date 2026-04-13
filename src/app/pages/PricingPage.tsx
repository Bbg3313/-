import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import {
  PRICING_CATEGORIES,
  PRICING_SECTIONS,
  VAT_NOTE,
  type PricingCategoryId,
  type PricingSection,
  type PricingTable,
} from "../../data/pricingData";

/** 시술/가격 영역은 본문과 동일하게 Pretendard만 사용 */
const PRICING_FONT =
  '"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans KR", "Apple SD Gothic Neo", "Malgun Gothic", "Helvetica Neue", Arial, sans-serif';

function padRow(row: string[], len: number): string[] {
  const next = [...row];
  while (next.length < len) next.push("—");
  return next.slice(0, len);
}

function PricingTableView({ table }: { table: PricingTable }) {
  const colCount = table.headers.length;
  const priceCols = table.priceColumns ?? 0;
  const labelCols = Math.max(0, colCount - priceCols);

  return (
    <div className="overflow-x-auto rounded-lg border border-border/60 bg-background">
      <table className="w-full min-w-[520px] text-sm text-left border-collapse">
        <thead>
          <tr className="bg-champagne/50 text-charcoal">
            {table.headers.map((h, i) => (
              <th
                key={i}
                scope="col"
                className={
                  i < labelCols
                    ? "px-3 sm:px-4 py-3 font-semibold tracking-tight border-b border-border/50"
                    : "px-3 sm:px-4 py-3 font-semibold tracking-tight border-b border-border/50 text-right tabular-nums whitespace-nowrap"
                }
              >
                {h || " "}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((raw, ri) => {
            const row = padRow(raw, colCount);
            return (
              <tr key={ri} className="border-b border-border/40 last:border-0 hover:bg-muted/25 transition-colors">
                {row.map((cell, ci) => (
                  <td
                    key={ci}
                    className={
                      ci < labelCols
                        ? "px-3 sm:px-4 py-2.5 text-muted-foreground align-top"
                        : "px-3 sm:px-4 py-2.5 text-right tabular-nums text-charcoal align-top whitespace-nowrap"
                    }
                  >
                    {cell === "" ? " " : cell}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function SectionCard({ section }: { section: PricingSection }) {
  return (
    <section
      id={`pricing-${section.id}`}
      className="scroll-mt-[13.5rem] sm:scroll-mt-[14.5rem] md:scroll-mt-[15.5rem] rounded-xl border border-border/70 bg-card/80 shadow-sm overflow-hidden"
    >
      <div className="px-5 sm:px-7 pt-6 sm:pt-8 pb-2">
        <p className="text-xs tracking-[0.2em] uppercase text-gold-accent mb-2">Price guide</p>
        <h2 className="text-charcoal text-xl sm:text-2xl font-semibold tracking-tight">{section.title}</h2>
        {section.description ? (
          <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">{section.description}</p>
        ) : null}
      </div>

      <div className="px-5 sm:px-7 pb-6 sm:pb-8 space-y-6">
        <p className="text-xs text-muted-foreground border-l-2 border-gold-accent/50 pl-3">{VAT_NOTE}</p>
        <div className="space-y-5">
          {section.tables.map((t, i) => (
            <PricingTableView key={i} table={t} />
          ))}
        </div>
        {section.footnotes?.length ? (
          <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground leading-relaxed list-disc pl-4 marker:text-gold-accent/80">
            {section.footnotes.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}

export function PricingPage() {
  const [active, setActive] = useState<PricingCategoryId | "all">("all");

  const visible = useMemo(() => {
    if (active === "all") return PRICING_SECTIONS;
    return PRICING_SECTIONS.filter((s) => s.categoryId === active);
  }, [active]);

  useEffect(() => {
    if (active === "all") return;
    const first = PRICING_SECTIONS.find((s) => s.categoryId === active);
    if (!first) return;
    const el = document.getElementById(`pricing-${first.id}`);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [active]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main
        className="flex-1 pt-28 md:pt-32 pb-16 px-4 sm:px-6"
        style={{ fontFamily: PRICING_FONT }}
      >
        <article className="max-w-5xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center py-1 text-sm leading-none text-muted-foreground hover:text-gold-accent transition-colors mb-6"
          >
            ← 홈으로
          </Link>

          <header className="mb-8 sm:mb-10">
            <div className="w-12 h-px bg-primary/40 mb-6" />
            <h1 className="text-charcoal text-3xl sm:text-4xl md:text-[2.75rem] font-semibold tracking-tight mb-4">
              시술 · 가격 안내
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
              비급여 시술 항목을 카테고리별로 정리했습니다. 개인 피부 상태와 시술 범위에 따라 달라질 수 있으니, 정확한 견적은 내원 상담을 권장드립니다.
            </p>
          </header>

          <div className="sticky top-[7rem] sm:top-[8rem] md:top-[9rem] z-40 -mx-4 sm:-mx-6 px-4 sm:px-6 py-3 mb-8 bg-background/95 backdrop-blur-md border-b border-border/60 shadow-sm">
            <p className="sr-only">시술 카테고리 필터</p>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 w-full max-w-5xl mx-auto">
              {PRICING_CATEGORIES.map((c) => {
                const isOn = active === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setActive(c.id)}
                    className={
                      isOn
                        ? "min-h-[2.5rem] w-full rounded-lg border border-gold-accent/50 bg-champagne/80 px-2 py-2 text-center text-xs sm:text-sm font-medium text-charcoal leading-snug shadow-sm transition-colors"
                        : "min-h-[2.5rem] w-full rounded-lg border border-border/70 bg-card px-2 py-2 text-center text-xs sm:text-sm font-medium text-muted-foreground leading-snug hover:border-gold-accent/35 hover:text-charcoal transition-colors"
                    }
                  >
                    {c.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-8 sm:space-y-10">
            {visible.length === 0 ? (
              <p className="text-muted-foreground">이 카테고리에 등록된 항목이 없습니다.</p>
            ) : (
              visible.map((section) => <SectionCard key={section.id} section={section} />)
            )}
          </div>

          <aside className="mt-12 sm:mt-16 rounded-lg border border-dashed border-border/80 bg-muted/20 px-5 py-5 text-sm text-muted-foreground leading-relaxed">
            시술 전 충분한 상담으로 맞춤 계획을 안내해 드립니다. VAT는 표기된 금액에 별도이며, 보험 적용 여부는 항목에 따라 다릅니다.
          </aside>
        </article>
      </main>
      <Footer className="mt-auto" />
    </div>
  );
}
