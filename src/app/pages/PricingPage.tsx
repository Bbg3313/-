import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import {
  PRICING_CATEGORIES,
  PRICING_SECTIONS,
  VAT_NOTE,
  type LaserHairPriceCol,
  type LaserHairRow,
  type PricingCategoryId,
  type PricingSection,
  type PricingTable,
} from "../../data/pricingData";

/** 시술/가격 영역은 본문과 동일하게 Pretendard만 사용 */
const PRICING_FONT =
  '"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans KR", "Apple SD Gothic Neo", "Malgun Gothic", "Helvetica Neue", Arial, sans-serif';

/** 한글 줄바꿈: 어절 단위 유지 + 긴 구문만 필요 시 분할 */
const KO_WRAP = "break-keep [word-break:keep-all] [overflow-wrap:anywhere]";
/** 금액 열: 숫자·콤마가 어색하게 끊기지 않게 anywhere 제외 */
const KO_PRICE = "break-keep [word-break:keep-all]";

function padRow(row: string[], len: number): string[] {
  const next = [...row];
  while (next.length < len) next.push("—");
  return next.slice(0, len);
}

function normalizeMixedKoreanPrice(text: string): string {
  return text.replace(/(\d+)\s*만(?:\s*(\d{1,3}(?:,\d{3})*|\d+))?/g, (_, man: string, extra?: string) => {
    const extraNum = extra ? Number(extra.replace(/,/g, "")) : 0;
    const total = Number(man) * 10000 + extraNum;
    return Number.isFinite(total) ? total.toLocaleString("ko-KR") : _;
  });
}

/** table-layout:fixed + colgroup용 — 카드마다 열 픽셀이 달라지지 않게 % 고정 */
function pricingColumnWidths(colCount: number, labelCols: number, priceCols: number): number[] {
  if (colCount === 0) return [];
  if (labelCols === 0) {
    const eq = 100 / colCount;
    return Array.from({ length: colCount }, () => eq);
  }
  let labelTotalPct = 36;
  if (priceCols >= 5) labelTotalPct = 22;
  else if (priceCols === 4) labelTotalPct = 26;
  else if (priceCols === 3) labelTotalPct = 36;
  else if (priceCols === 2) labelTotalPct = 40;
  else if (priceCols === 1) labelTotalPct = 46;

  const perLabel = labelTotalPct / labelCols;
  const perPrice = priceCols > 0 ? (100 - labelTotalPct) / priceCols : 0;
  return Array.from({ length: colCount }, (_, i) => (i < labelCols ? perLabel : perPrice));
}

function HairPriceCell({ col, align = "end" }: { col: LaserHairPriceCol; align?: "end" | "center" }) {
  const wrap = align === "center" ? "items-center text-center" : "items-end text-right";

  if (col.kind === "single") {
    return (
      <div className={`flex flex-col ${wrap}`}>
        <span className={`text-sm font-normal tabular-nums text-charcoal ${KO_PRICE}`}>
          {normalizeMixedKoreanPrice(col.price)}
        </span>
      </div>
    );
  }

  const saleRow =
    align === "center"
      ? "flex flex-wrap items-baseline justify-center gap-x-1 gap-y-0.5 tabular-nums leading-tight"
      : "flex flex-wrap items-baseline justify-end gap-x-1 gap-y-0.5 tabular-nums leading-tight";

  return (
    <div className={`flex flex-col gap-1 ${wrap}`}>
      <div className={saleRow}>
        <span className={`text-sm font-normal text-charcoal ${KO_PRICE}`}>{normalizeMixedKoreanPrice(col.sale)}</span>
        <span className="shrink-0 rounded bg-gold-accent/15 px-1.5 py-0.5 text-[10px] font-medium text-gold-accent tabular-nums whitespace-nowrap">
          {col.discountPct}
        </span>
      </div>
      <div
        className={`text-xs tabular-nums text-muted-foreground/50 line-through decoration-muted-foreground/35 ${KO_PRICE}`}
      >
        {normalizeMixedKoreanPrice(col.regular)}
      </div>
    </div>
  );
}

function laserHairRowsAllSingle(rows: LaserHairRow[]) {
  return rows.every(
    (r) => r.once.kind === "single" && r.five.kind === "single" && r.ten.kind === "single",
  );
}

function LaserHairTableView({ rows }: { rows: LaserHairRow[] }) {
  const allSingle = laserHairRowsAllSingle(rows);

  return (
    <div className="space-y-3">
      {!allSingle ? (
        <p className={`text-xs text-muted-foreground md:px-1 ${KO_WRAP}`}>
          할인가 옆 숫자는 할인율입니다. <span className="line-through opacity-60">취소선</span>은 정가 안내입니다.
        </p>
      ) : (
        <p className={`text-xs text-muted-foreground md:px-1 ${KO_WRAP}`}>금액 단위: 원, VAT 10% 별도.</p>
      )}

      {/* 모바일: 부위별 카드 */}
      <div className="md:hidden space-y-3">
        {rows.map((row, i) => (
          <div
            key={i}
            className="rounded-xl border border-border/60 bg-background px-4 py-3.5 shadow-sm"
          >
            {row.area ? (
              <p className="text-xs font-medium uppercase tracking-wider text-gold-accent">{row.area}</p>
            ) : null}
            <p className={`text-sm font-normal text-charcoal leading-snug ${row.area ? "mt-1" : ""} ${KO_WRAP}`}>
              {row.detail}
            </p>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {(
                [
                  ["1회", row.once],
                  ["5회", row.five],
                  ["10회", row.ten],
                ] as const
              ).map(([label, col]) => (
                <div key={label} className="rounded-lg bg-muted/25 px-2 py-2.5">
                  <p className="mb-2 text-center text-[10px] font-medium text-muted-foreground">{label}</p>
                  <HairPriceCell col={col} align="center" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 데스크톱: 표 */}
      <div className="hidden md:block overflow-x-auto rounded-xl border border-border/60 bg-background">
        <table className="w-full min-w-[720px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-border/50 bg-champagne/50 text-charcoal">
              <th className="w-[4.5rem] whitespace-nowrap px-3 py-3 text-xs font-semibold">부위</th>
              <th className={`min-w-[11rem] px-3 py-3 text-xs font-semibold ${KO_WRAP}`}>세부</th>
              <th className="w-[8.5rem] px-3 py-3 text-right text-xs font-semibold">1회</th>
              <th className="w-[8.5rem] px-3 py-3 text-right text-xs font-semibold">5회</th>
              <th className="w-[8.5rem] px-3 py-3 text-right text-xs font-semibold">10회</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-b border-border/35 last:border-0 hover:bg-muted/15">
                <td className="align-top px-3 py-3 text-xs font-medium text-gold-accent">{row.area || " "}</td>
                <td className={`align-top px-3 py-3 text-sm font-normal text-muted-foreground leading-snug ${KO_WRAP}`}>
                  {row.detail}
                </td>
                <td className="align-top px-3 py-3">
                  <HairPriceCell col={row.once} />
                </td>
                <td className="align-top px-3 py-3">
                  <HairPriceCell col={row.five} />
                </td>
                <td className="align-top px-3 py-3">
                  <HairPriceCell col={row.ten} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PricingTableView({ table }: { table: PricingTable }) {
  const colCount = table.headers.length;
  const priceCols = table.priceColumns ?? 0;
  const labelCols = Math.max(0, colCount - priceCols);
  const colWidthsPct = pricingColumnWidths(colCount, labelCols, priceCols);

  const paddedRows = useMemo(() => table.rows.map((raw) => padRow(raw, colCount)), [table, colCount]);

  const priceOnlyMobile =
    labelCols === 1 && paddedRows.length > 0 && paddedRows.every((r) => !r[0]?.trim());

  const mobileRows = useMemo(() => {
    const carry: string[] = Array.from({ length: labelCols }, () => "");
    return paddedRows.map((row) => {
      for (let j = 0; j < labelCols; j += 1) {
        const v = row[j]?.trim();
        if (v) carry[j] = v;
      }
      const display = row.map((cell, j) => {
        if (j >= labelCols) return cell;
        const v = cell?.trim();
        return v || carry[j] || "";
      });
      return { row, display };
    });
  }, [paddedRows, labelCols]);

  return (
    <div className="space-y-3">
      <div className="md:hidden space-y-2.5">
        {mobileRows.map(({ row, display }, ri) => (
          <div key={ri} className="rounded-lg border border-border/60 bg-background px-3.5 py-3">
            {priceOnlyMobile ? (
              <>
                <p className={`text-sm font-semibold leading-snug text-charcoal ${KO_WRAP}`}>{table.headers[0] || " "}</p>
                <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {table.headers.map((h, hi) => {
                    if (hi === 0 || !h?.trim()) return null;
                    const cell = row[hi] ?? "";
                    return (
                      <div key={hi} className="rounded-md bg-muted/25 px-2.5 py-2">
                        <p className={`text-[11px] leading-tight text-muted-foreground ${KO_WRAP}`}>{h}</p>
                        <p className={`mt-1 text-sm font-normal tabular-nums text-charcoal ${KO_PRICE}`}>
                          {cell === "" ? "—" : normalizeMixedKoreanPrice(cell)}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <dl className="flex flex-col gap-0">
                {row.map((cell, ci) => {
                  const header = table.headers[ci] || "";
                  const shown = ci < labelCols ? display[ci] : cell;
                  if (ci < labelCols && !shown?.trim()) return null;
                  const isPriceCol = ci >= labelCols;
                  const cellOut =
                    isPriceCol && (!shown?.trim() || shown === "—")
                      ? "—"
                      : normalizeMixedKoreanPrice(shown);
                  return (
                    <div
                      key={ci}
                      className="border-b border-border/35 py-2.5 first:pt-0 last:border-b-0 last:pb-0"
                    >
                      <dt className={`text-[11px] font-medium text-muted-foreground ${KO_WRAP}`}>{header.trim() || "\u00a0"}</dt>
                      <dd
                        className={`mt-1 text-sm leading-snug ${
                          isPriceCol
                            ? `text-right font-normal tabular-nums text-charcoal ${KO_PRICE}`
                            : `text-charcoal/90 ${KO_WRAP}`
                        }`}
                      >
                        {cellOut}
                      </dd>
                    </div>
                  );
                })}
              </dl>
            )}
          </div>
        ))}
      </div>

      <div className="hidden md:block overflow-x-auto rounded-lg border border-border/60 bg-background">
        <table className="w-full min-w-[640px] max-w-full table-fixed border-collapse text-left text-sm">
          <colgroup>
            {colWidthsPct.map((w, i) => (
              <col key={i} style={{ width: `${w}%` }} />
            ))}
          </colgroup>
          <thead>
            <tr className="bg-champagne/50 text-charcoal">
              {table.headers.map((h, i) => (
                <th
                  key={i}
                  scope="col"
                  className={
                    i < labelCols
                      ? `border-b border-border/50 px-3 py-3 text-left align-middle text-xs font-semibold tracking-tight sm:px-4 sm:text-sm ${KO_WRAP}`
                      : "border-b border-border/50 px-3 py-3 text-right align-middle text-xs font-semibold tabular-nums tracking-tight sm:px-4 sm:text-sm whitespace-nowrap"
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
                <tr key={ri} className="border-b border-border/40 transition-colors last:border-0 hover:bg-muted/25">
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      className={
                        ci < labelCols
                          ? `px-3 py-2.5 align-middle text-muted-foreground sm:px-4 ${KO_WRAP}`
                          : `px-3 py-2.5 text-right align-middle tabular-nums text-charcoal sm:px-4 whitespace-nowrap ${KO_PRICE}`
                      }
                    >
                      {cell === "" ? "\u00a0" : normalizeMixedKoreanPrice(cell)}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SectionCard({ section }: { section: PricingSection }) {
  const hasTables = section.tables.length > 0;
  const hasLaser = Boolean(section.laserHairRows?.length);

  return (
    <section
      id={`pricing-${section.id}`}
      className="scroll-mt-[14rem] sm:scroll-mt-[15rem] md:scroll-mt-[16rem] rounded-xl border border-border/70 bg-card/80 shadow-sm overflow-hidden"
    >
      <div className="px-5 sm:px-7 pt-6 sm:pt-8 pb-2">
        <p className="text-xs tracking-[0.2em] uppercase text-gold-accent mb-2">Price guide</p>
        <h2 className={`text-charcoal text-xl font-semibold tracking-tight sm:text-2xl ${KO_WRAP}`}>{section.title}</h2>
        {section.description ? (
          <p className={`mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base ${KO_WRAP}`}>
            {section.description}
          </p>
        ) : null}
      </div>

      <div className="px-5 sm:px-7 pb-6 sm:pb-8 space-y-6">
        <p className={`text-xs text-muted-foreground border-l-2 border-gold-accent/50 pl-3 ${KO_WRAP}`}>{VAT_NOTE}</p>
        {hasLaser && section.laserHairRows ? <LaserHairTableView rows={section.laserHairRows} /> : null}
        {hasTables ? (
          <div className="space-y-5">
            {section.tables.map((t, i) => (
              <PricingTableView key={i} table={t} />
            ))}
          </div>
        ) : null}
        {section.footnotes?.length ? (
          <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground leading-relaxed list-disc pl-4 marker:text-gold-accent/80">
            {section.footnotes.map((line, i) => (
              <li key={i} className={KO_WRAP}>
                {line}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}

export function PricingPage() {
  const [active, setActive] = useState<PricingCategoryId | "all">("all");
  const [scrollActive, setScrollActive] = useState<PricingCategoryId>(PRICING_CATEGORIES[0].id);
  const categoryRailRef = useRef<HTMLDivElement | null>(null);
  const categoryRefs = useRef<Record<PricingCategoryId, HTMLButtonElement | null>>(
    Object.fromEntries(PRICING_CATEGORIES.map((c) => [c.id, null])) as Record<PricingCategoryId, HTMLButtonElement | null>,
  );

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

  useEffect(() => {
    if (active !== "all") return;

    const updateScrollCategory = () => {
      const anchorY = window.innerWidth < 768 ? 170 : 240;
      let current = PRICING_CATEGORIES[0].id;
      let bestDistance = Number.POSITIVE_INFINITY;

      for (const section of PRICING_SECTIONS) {
        const el = document.getElementById(`pricing-${section.id}`);
        if (!el) continue;
        const distance = Math.abs(el.getBoundingClientRect().top - anchorY);
        if (distance < bestDistance) {
          bestDistance = distance;
          current = section.categoryId;
        }
      }

      setScrollActive((prev) => (prev === current ? prev : current));
    };

    updateScrollCategory();
    window.addEventListener("scroll", updateScrollCategory, { passive: true });
    window.addEventListener("resize", updateScrollCategory);
    return () => {
      window.removeEventListener("scroll", updateScrollCategory);
      window.removeEventListener("resize", updateScrollCategory);
    };
  }, [active]);

  useEffect(() => {
    const currentId = active === "all" ? scrollActive : active;
    const rail = categoryRailRef.current;
    const btn = categoryRefs.current[currentId as PricingCategoryId];
    if (!rail || !btn) return;
    const railRect = rail.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    const margin = 10;
    let delta = 0;
    if (btnRect.left < railRect.left + margin) {
      delta = btnRect.left - railRect.left - margin;
    } else if (btnRect.right > railRect.right - margin) {
      delta = btnRect.right - railRect.right + margin;
    }
    if (delta !== 0) {
      rail.scrollBy({ left: delta, behavior: "smooth" });
    }
  }, [active, scrollActive]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main
        className="flex-1 pt-32 md:pt-36 pb-16 px-6"
        style={{ fontFamily: PRICING_FONT }}
      >
        <div className="max-w-5xl mx-auto relative">
          {/* 헤더(z-50) 아래로 확실히 내리고, 스티키 카테고리와 겹치지 않게 여백 확보 */}
          <div className="relative z-0 mb-6">
            <Link
              to="/"
              className="inline-flex items-center py-1 text-sm leading-none text-muted-foreground hover:text-gold-accent transition-colors"
            >
              ← 홈으로
            </Link>
          </div>

          <header className="mb-8 sm:mb-10">
            <div className="w-12 h-px bg-primary/40 mb-6" />
            <h1 className={`text-charcoal text-3xl font-semibold tracking-tight sm:text-4xl md:text-[2.75rem] mb-4 ${KO_WRAP}`}>
              시술 · 가격 안내
            </h1>
            <p className={`max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg ${KO_WRAP}`}>
              개인 피부 상태와 시술 범위에 따라 달라질 수 있으니, 정확한 견적은 내원 상담을 권장드립니다.
            </p>
          </header>
        </div>

        {/* 본문 article 밖 — 스크롤 시 헤더(z-50) 아래 고정 */}
        <div className="sticky z-[45] -mx-6 mb-8 border-b border-border/60 bg-background/95 pt-2 pb-3 shadow-sm backdrop-blur-md supports-[backdrop-filter]:bg-background/88 sm:pt-2.5 md:pt-3 top-[max(5.75rem,calc(env(safe-area-inset-top,0px)+5.35rem))] sm:top-[max(6.85rem,calc(env(safe-area-inset-top,0px)+6.1rem))] md:top-[max(9.35rem,calc(env(safe-area-inset-top,0px)+8.85rem))]">
          <div className="px-6">
            <p className="sr-only">시술 카테고리 필터</p>
            <div
              ref={categoryRailRef}
              className="mx-auto flex w-full max-w-5xl gap-2 overflow-x-auto overscroll-x-contain scroll-pl-2 scroll-pr-2 pb-1 [-webkit-overflow-scrolling:touch] md:grid md:grid-cols-6 md:overflow-visible md:scroll-pl-0 md:scroll-pr-0 md:pb-0"
            >
              {PRICING_CATEGORIES.map((c) => {
                const isOn = active === "all" ? scrollActive === c.id : active === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setActive(c.id)}
                    ref={(el) => {
                      categoryRefs.current[c.id] = el;
                    }}
                    className={
                      isOn
                        ? `min-h-[2.5rem] shrink-0 whitespace-nowrap rounded-lg border border-gold-accent/50 bg-champagne/80 px-3 py-2 text-center text-xs font-medium leading-snug text-charcoal shadow-sm transition-colors md:w-full md:whitespace-normal md:px-2 md:text-sm md:leading-snug ${KO_WRAP}`
                        : `min-h-[2.5rem] shrink-0 whitespace-nowrap rounded-lg border border-border/70 bg-card px-3 py-2 text-center text-xs font-medium leading-snug text-muted-foreground transition-colors hover:border-gold-accent/35 hover:text-charcoal md:w-full md:whitespace-normal md:px-2 md:text-sm md:leading-snug ${KO_WRAP}`
                    }
                  >
                    {c.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <article className="max-w-5xl mx-auto relative">
          <div className="space-y-8 sm:space-y-10">
            {visible.length === 0 ? (
              <p className="text-muted-foreground">이 카테고리에 등록된 항목이 없습니다.</p>
            ) : (
              visible.map((section) => <SectionCard key={section.id} section={section} />)
            )}
          </div>

          <aside className={`mt-12 rounded-lg border border-dashed border-border/80 bg-muted/20 px-5 py-5 text-sm leading-relaxed text-muted-foreground sm:mt-16 ${KO_WRAP}`}>
            시술 전 충분한 상담으로 맞춤 계획을 안내해 드립니다. VAT는 표기된 금액에 별도이며, 보험 적용 여부는 항목에 따라 다릅니다.
          </aside>
        </article>
      </main>
      <Footer className="mt-auto" />
    </div>
  );
}
