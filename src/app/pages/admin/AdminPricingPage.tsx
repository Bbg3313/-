import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { fetchPricingSnapshot, formatSupabaseClientError, savePricingSnapshotAdmin } from "../../lib/cmsApi";
import { parsePricingSnapshot } from "../../lib/validatePricingSnapshot";
import { getDefaultPricingSnapshot } from "../../../data/pricingData";

export function AdminPricingPage() {
  const [text, setText] = useState("");
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const loadIntoEditor = (pretty: string) => {
    setText(pretty);
    setMsg("");
  };

  useEffect(() => {
    fetchPricingSnapshot()
      .then((snap) => {
        const data = snap ?? getDefaultPricingSnapshot();
        loadIntoEditor(JSON.stringify(data, null, 2));
      })
      .catch(() => {
        loadIntoEditor(JSON.stringify(getDefaultPricingSnapshot(), null, 2));
      })
      .finally(() => setLoaded(true));
  }, []);

  const handleSave = async () => {
    setBusy(true);
    setMsg("");
    try {
      let parsed: unknown;
      try {
        parsed = JSON.parse(text) as unknown;
      } catch {
        setMsg("JSON 형식이 잘못되었습니다. 따옴표·쉼표·대괄호를 다시 확인해 주세요.");
        return;
      }
      const snap = parsePricingSnapshot(parsed);
      if (!snap) {
        setMsg("데이터 구조가 맞지 않습니다. vatNote, categories, sections가 필요하고 표는 headers(글자 배열)와 rows(글자 이중 배열) 형태여야 합니다.");
        return;
      }
      await savePricingSnapshotAdmin(snap);
      setMsg("저장되었습니다. 시술/가격 페이지에서 새로고침해 확인해 주세요.");
    } catch (e: unknown) {
      setMsg(formatSupabaseClientError(e));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 px-6 pt-32 md:pt-36 pb-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
            <h1 className="text-3xl font-semibold tracking-tight text-charcoal">시술 · 가격 수정</h1>
            <Link to="/admin" className="text-sm text-muted-foreground hover:text-gold-accent">
              ← 관리자 홈
            </Link>
          </div>

          <section className="mb-6 space-y-3 rounded-lg border border-border/70 bg-muted/15 p-5 text-sm leading-relaxed text-charcoal">
            <p className="font-medium">이렇게만 하시면 됩니다</p>
            <ol className="list-decimal space-y-1.5 pl-5 text-muted-foreground">
              <li>아래 글 상자에서 숫자·문구만 고칩니다. (표는 `headers`와 `rows`로 되어 있습니다.)</li>
              <li>망가졌다 싶으면 <span className="text-charcoal font-medium">기본값 불러오기</span>를 눌러 처음 상태로 되돌립니다.</li>
              <li>
                <span className="text-charcoal font-medium">저장</span>을 누르면 웹사이트 시술/가격 페이지에 반영됩니다.
              </li>
            </ol>
            <p className="text-xs text-muted-foreground">
              Supabase에 `pricing_content` 테이블이 없으면 저장이 안 됩니다. SQL Editor에서 프로젝트의{" "}
              <code className="rounded bg-background px-1">scripts/supabase-schema.sql</code> 또는{" "}
              <code className="rounded bg-background px-1">scripts/supabase-tables-hero-promotions.sql</code> 최신 내용을 실행해 주세요.
            </p>
          </section>

          <div className="mb-3 flex flex-wrap gap-2">
            <button
              type="button"
              disabled={busy}
              onClick={() => loadIntoEditor(JSON.stringify(getDefaultPricingSnapshot(), null, 2))}
              className="rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-charcoal hover:border-gold-accent/40 disabled:opacity-50"
            >
              기본값 불러오기
            </button>
            <button
              type="button"
              disabled={busy || !loaded}
              onClick={() => {
                setBusy(true);
                setMsg("");
                fetchPricingSnapshot()
                  .then((snap) => loadIntoEditor(JSON.stringify(snap ?? getDefaultPricingSnapshot(), null, 2)))
                  .catch((e) => setMsg(formatSupabaseClientError(e)))
                  .finally(() => setBusy(false));
              }}
              className="rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-charcoal hover:border-gold-accent/40 disabled:opacity-50"
            >
              서버에서 다시 불러오기
            </button>
            <button
              type="button"
              disabled={busy || !loaded}
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
              시술/가격 페이지 열기 ↗
            </Link>
          </div>

          {msg ? (
            <p className={`mb-3 text-sm whitespace-pre-wrap ${msg.includes("저장되었") ? "text-emerald-700" : "text-destructive"}`}>
              {msg}
            </p>
          ) : null}

          <label className="block">
            <span className="sr-only">가격표 데이터</span>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              spellCheck={false}
              className="min-h-[70vh] w-full resize-y rounded-lg border border-border/80 bg-background p-4 font-mono text-xs leading-relaxed text-charcoal shadow-inner sm:text-sm"
              disabled={!loaded}
              placeholder={loaded ? "" : "불러오는 중…"}
            />
          </label>
        </div>
      </main>
      <Footer />
    </div>
  );
}
