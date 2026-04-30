import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { fetchPricingSnapshot, formatSupabaseClientError, savePricingSnapshotAdmin } from "../../lib/cmsApi";
import { parsePricingSnapshot } from "../../lib/validatePricingSnapshot";
import type { PricingSnapshot, PricingTable } from "../../../data/pricingData";
import { getDefaultPricingSnapshot } from "../../../data/pricingData";

function deepClone<T>(v: T): T {
  return JSON.parse(JSON.stringify(v)) as T;
}

/** 한 줄을 `|` 기준으로 나눕니다. 엑셀에서 복사한 뒤 `|`로 맞춰 붙여넣기도 가능합니다. */
function splitPipedRow(line: string): string[] {
  return line.split("|").map((s) => s.trim());
}

function tableToPipedBlock(table: PricingTable): string {
  const lines = [table.headers.join(" | ")];
  for (const row of table.rows) {
    const cells = [...row];
    while (cells.length < table.headers.length) cells.push("");
    lines.push(cells.slice(0, table.headers.length).join(" | "));
  }
  return lines.join("\n");
}

function pipedBlockToTable(raw: string, prev?: PricingTable): PricingTable | null {
  const lines = raw
    .split(/\r?\n/)
    .map((l) => l.trimEnd())
    .filter((l) => l.replace(/\s/g, "").length > 0);
  if (lines.length === 0) return null;
  const headers = splitPipedRow(lines[0]);
  if (headers.length === 0) return null;
  const rows = lines.slice(1).map((line) => {
    const cells = splitPipedRow(line);
    while (cells.length < headers.length) cells.push("");
    return cells.slice(0, headers.length);
  });
  let priceColumns = prev?.priceColumns;
  if (priceColumns === undefined || priceColumns < 0 || priceColumns > headers.length) {
    priceColumns = Math.max(0, headers.length - 1);
  }
  return { headers, rows, priceColumns };
}

const FIELD =
  "w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-charcoal placeholder:text-muted-foreground";
const LABEL = "mb-1 block text-xs font-medium text-muted-foreground";

export function AdminPricingPage() {
  const [snapshot, setSnapshot] = useState<PricingSnapshot | null>(null);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [jsonText, setJsonText] = useState("");

  const applySnapshot = useCallback((data: PricingSnapshot) => {
    setSnapshot(deepClone(data));
    setJsonText(JSON.stringify(data, null, 2));
    setMsg("");
  }, []);

  useEffect(() => {
    fetchPricingSnapshot()
      .then((snap) => applySnapshot(snap ?? getDefaultPricingSnapshot()))
      .catch(() => applySnapshot(getDefaultPricingSnapshot()))
      .finally(() => setLoaded(true));
  }, [applySnapshot]);

  useEffect(() => {
    if (snapshot && advancedOpen) setJsonText(JSON.stringify(snapshot, null, 2));
  }, [snapshot, advancedOpen]);

  const handleSave = async () => {
    if (!snapshot) return;
    setBusy(true);
    setMsg("");
    try {
      const checked = parsePricingSnapshot(JSON.parse(JSON.stringify(snapshot)));
      if (!checked) {
        setMsg("저장할 데이터 형식이 올바르지 않습니다. 고급(JSON)에서 복구하거나 기본값을 불러오세요.");
        return;
      }
      await savePricingSnapshotAdmin(checked);
      setMsg("저장되었습니다. 시술/가격 페이지를 새로고침해 확인해 주세요.");
    } catch (e: unknown) {
      setMsg(formatSupabaseClientError(e));
    } finally {
      setBusy(false);
    }
  };

  const loadDefault = () => applySnapshot(getDefaultPricingSnapshot());

  const reloadServer = () => {
    setBusy(true);
    setMsg("");
    fetchPricingSnapshot()
      .then((snap) => applySnapshot(snap ?? getDefaultPricingSnapshot()))
      .catch((e) => setMsg(formatSupabaseClientError(e)))
      .finally(() => setBusy(false));
  };

  if (!snapshot) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 px-6 pt-32 pb-20">
          <p className="text-muted-foreground">{loaded ? "데이터를 불러올 수 없습니다." : "불러오는 중…"}</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 px-6 pt-32 md:pt-36 pb-20">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
            <h1 className="text-3xl font-semibold tracking-tight text-charcoal">시술 · 가격 수정</h1>
            <Link to="/admin" className="text-sm text-muted-foreground hover:text-gold-accent">
              ← 관리자 홈
            </Link>
          </div>

          <section className="mb-6 space-y-2 rounded-lg border border-gold-accent/25 bg-champagne/30 p-5 text-sm leading-relaxed text-charcoal">
            <p className="font-semibold text-charcoal">쉬운 수정 방법</p>
            <ul className="list-disc space-y-1.5 pl-5 text-muted-foreground">
              <li>
                <strong className="text-charcoal">표</strong>는 한 칸씩 나눌 때 <strong className="text-charcoal">세로줄(|)</strong>을
                씁니다. 첫 줄이 머리글, 그 아래가 한 줄씩 가격입니다.
              </li>
              <li>엑셀에서 표를 복사한 뒤, 열 사이에 <code className="rounded bg-background px-1">|</code>만 넣어 붙여넣어도 됩니다.</li>
              <li>
                <strong className="text-charcoal">제모(레이저) 할인 표</strong>는 모양이 달라 이 화면에서 안 보입니다. 웹에는 그대로
                나가고, 바꿀 때만 맨 아래 <strong className="text-charcoal">고급(JSON)</strong>을 쓰세요.
              </li>
            </ul>
          </section>

          <div className="mb-6 flex flex-wrap gap-2">
            <button
              type="button"
              disabled={busy}
              onClick={loadDefault}
              className="rounded-md border border-border bg-background px-4 py-2 text-sm font-medium hover:border-gold-accent/40 disabled:opacity-50"
            >
              기본값 불러오기
            </button>
            <button
              type="button"
              disabled={busy}
              onClick={reloadServer}
              className="rounded-md border border-border bg-background px-4 py-2 text-sm font-medium hover:border-gold-accent/40 disabled:opacity-50"
            >
              서버에서 다시 불러오기
            </button>
            <button
              type="button"
              disabled={busy}
              onClick={() => void handleSave()}
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
            >
              {busy ? "처리 중..." : "저장"}
            </button>
            <Link
              to="/pricing"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-md border border-gold-accent/40 px-4 py-2 text-sm font-medium text-gold-accent hover:bg-gold-accent/10"
            >
              시술/가격 보기 ↗
            </Link>
          </div>

          {msg ? (
            <p className={`mb-6 text-sm whitespace-pre-wrap ${msg.includes("저장되었") ? "text-emerald-700" : "text-destructive"}`}>
              {msg}
            </p>
          ) : null}

          <div className="space-y-8">
            <div className="rounded-xl border border-border/70 bg-card/50 p-5">
              <label className={LABEL}>부가세 안내 한 줄 (표 위에 반복되는 문구)</label>
              <input
                className={FIELD}
                value={snapshot.vatNote}
                onChange={(e) => setSnapshot({ ...snapshot, vatNote: e.target.value })}
              />
            </div>

            <div className="rounded-xl border border-border/70 bg-card/50 p-5">
              <p className="mb-3 text-sm font-semibold text-charcoal">위쪽 카테고리 탭 이름</p>
              <div className="space-y-3">
                {snapshot.categories.map((c, i) => (
                  <div key={c.id} className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
                    <span className="shrink-0 text-xs text-muted-foreground sm:w-36">
                      {c.id === "all" ? "전체 보기 탭" : `코드: ${c.id}`}
                    </span>
                    <input
                      className={FIELD}
                      value={c.label}
                      onChange={(e) => {
                        const next = deepClone(snapshot);
                        next.categories[i].label = e.target.value;
                        setSnapshot(next);
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {snapshot.sections.map((section, si) => (
              <details key={section.id} className="group rounded-xl border border-border/70 bg-card/50 open:border-gold-accent/30 open:shadow-sm">
                <summary className="cursor-pointer list-none px-5 py-4 text-base font-semibold text-charcoal marker:content-none [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center justify-between gap-2">
                    <span className="truncate">{section.title}</span>
                    <span className="text-xs font-normal text-muted-foreground group-open:hidden">펼치기</span>
                    <span className="hidden text-xs font-normal text-muted-foreground group-open:inline">접기</span>
                  </span>
                </summary>
                <div className="space-y-4 border-t border-border/50 px-5 pb-5 pt-4">
                  <div>
                    <label className={LABEL}>이 항목 제목</label>
                    <input
                      className={FIELD}
                      value={section.title}
                      onChange={(e) => {
                        const next = deepClone(snapshot);
                        next.sections[si].title = e.target.value;
                        setSnapshot(next);
                      }}
                    />
                  </div>
                  <div>
                    <label className={LABEL}>설명 (없으면 비워 두세요)</label>
                    <textarea
                      className={`${FIELD} min-h-[4rem] resize-y`}
                      value={section.description ?? ""}
                      onChange={(e) => {
                        const next = deepClone(snapshot);
                        next.sections[si].description = e.target.value || undefined;
                        setSnapshot(next);
                      }}
                    />
                  </div>

                  {section.laserHairRows && section.laserHairRows.length > 0 ? (
                    <p className="rounded-md border border-amber-200/80 bg-amber-50/80 px-3 py-2 text-xs text-amber-950">
                      이 구간은 <strong>제모 할인 표</strong>가 따로 들어 있습니다. 여기서는 글만 고치고, 표 숫자는 고급(JSON)에서
                      수정하세요.
                    </p>
                  ) : null}

                  {section.tables.map((table, ti) => (
                    <div key={ti} className="rounded-lg border border-border/60 bg-background/80 p-4">
                      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                        <span className="text-xs font-medium text-muted-foreground">표 {ti + 1}</span>
                        {section.tables.length > 1 ? (
                          <button
                            type="button"
                            className="text-xs text-destructive hover:underline"
                            onClick={() => {
                              if (!window.confirm("이 표를 삭제할까요?")) return;
                              const next = deepClone(snapshot);
                              next.sections[si].tables = next.sections[si].tables.filter((_, j) => j !== ti);
                              setSnapshot(next);
                            }}
                          >
                            표 삭제
                          </button>
                        ) : null}
                      </div>
                      <p className="mb-2 text-xs text-muted-foreground">
                        첫 줄 = 머리글(열 이름을 | 로 구분), 둘째 줄부터 = 한 줄에 한 행
                      </p>
                      <textarea
                        className={`${FIELD} min-h-[10rem] font-mono text-xs leading-relaxed sm:text-sm`}
                        spellCheck={false}
                        value={tableToPipedBlock(table)}
                        onChange={(e) => {
                          const parsed = pipedBlockToTable(e.target.value, table);
                          if (!parsed) return;
                          const next = deepClone(snapshot);
                          next.sections[si].tables[ti] = { ...next.sections[si].tables[ti], ...parsed };
                          setSnapshot(next);
                        }}
                      />
                    </div>
                  ))}

                  <button
                    type="button"
                    className="text-sm font-medium text-gold-accent hover:underline"
                    onClick={() => {
                      const next = deepClone(snapshot);
                      next.sections[si].tables.push({
                        headers: ["항목", "금액"],
                        rows: [["", ""]],
                        priceColumns: 1,
                      });
                      setSnapshot(next);
                    }}
                  >
                    + 빈 표 추가
                  </button>

                  <div>
                    <label className={LABEL}>각주 (한 줄에 하나씩)</label>
                    <textarea
                      className={`${FIELD} min-h-[5rem] resize-y`}
                      value={(section.footnotes ?? []).join("\n")}
                      onChange={(e) => {
                        const next = deepClone(snapshot);
                        const lines = e.target.value.split(/\r?\n/).map((l) => l.trim());
                        next.sections[si].footnotes = lines.some((l) => l.length > 0) ? lines.filter(Boolean) : undefined;
                        setSnapshot(next);
                      }}
                    />
                  </div>
                </div>
              </details>
            ))}
          </div>

          <details
            className="mt-10 rounded-xl border border-border/60 bg-muted/20"
            open={advancedOpen}
            onToggle={(e) => setAdvancedOpen(e.currentTarget.open)}
          >
            <summary className="cursor-pointer px-4 py-3 text-sm font-medium text-muted-foreground">
              고급: 전체 JSON (개발자용)
            </summary>
            <div className="space-y-3 border-t border-border/50 p-4">
              <p className="text-xs text-muted-foreground">
                제모 표나 구조를 통째로 바꿀 때만 사용하세요. 적용 후 위 폼과 동기화됩니다.
              </p>
              <textarea
                className={`${FIELD} min-h-[240px] font-mono text-xs`}
                spellCheck={false}
                value={jsonText}
                onChange={(e) => setJsonText(e.target.value)}
              />
              <button
                type="button"
                className="rounded-md border border-border px-3 py-2 text-sm"
                onClick={() => {
                  try {
                    const parsed = JSON.parse(jsonText) as unknown;
                    const snap = parsePricingSnapshot(parsed);
                    if (!snap) {
                      setMsg("JSON이 올바른 가격표 형식이 아닙니다.");
                      return;
                    }
                    applySnapshot(snap);
                    setMsg("고급 JSON을 편집 화면에 반영했습니다. 저장은 별도로 눌러 주세요.");
                  } catch {
                    setMsg("JSON 파싱에 실패했습니다.");
                  }
                }}
              >
                JSON 내용을 편집 화면에 반영
              </button>
            </div>
          </details>
        </div>
      </main>
      <Footer />
    </div>
  );
}
