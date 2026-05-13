import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import {
  deleteProcedureHeroImage,
  fetchProcedureHeroImagesAdmin,
  formatSupabaseClientError,
  upsertProcedureHeroImage,
  uploadImage,
} from "../../lib/cmsApi";
import { pickProcedureHeroImageUrl, procedureHeroImageStorageKey } from "../../lib/procedureHeroImages";
import { getProcedureCategory, PROCEDURE_TREATMENTS } from "../../../data/treatmentsCatalog";

export function AdminProcedureImagesPage() {
  const [byKey, setByKey] = useState<Record<string, string>>({});
  const [savingKey, setSavingKey] = useState<string | null>(null);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      const rows = await fetchProcedureHeroImagesAdmin();
      setByKey(Object.fromEntries(rows.map((r) => [r.treatment_slug, r.hero_image_url])));
      setError("");
    } catch (e: unknown) {
      setError(formatSupabaseClientError(e));
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const treatments = [...PROCEDURE_TREATMENTS].sort((a, b) =>
    a.categorySlug === b.categorySlug ? a.sort - b.sort : a.categorySlug.localeCompare(b.categorySlug),
  );

  const onPickFile = async (storageKey: string, file: File | undefined) => {
    if (!file) return;
    setSavingKey(storageKey);
    setError("");
    try {
      const url = await uploadImage("procedure-images", file);
      await upsertProcedureHeroImage(storageKey, url);
      setByKey((prev) => ({ ...prev, [storageKey]: url }));
    } catch (e: unknown) {
      setError(formatSupabaseClientError(e));
    } finally {
      setSavingKey(null);
    }
  };

  const onReset = async (storageKey: string) => {
    setSavingKey(storageKey);
    setError("");
    try {
      await deleteProcedureHeroImage(storageKey);
      setByKey((prev) => {
        const next = { ...prev };
        delete next[storageKey];
        return next;
      });
    } catch (e: unknown) {
      setError(formatSupabaseClientError(e));
    } finally {
      setSavingKey(null);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 px-6 pb-20 pt-32 md:pt-36">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 flex items-center justify-between gap-3">
            <h1 className="text-3xl font-semibold tracking-tight text-charcoal">시술 이미지(히어로)</h1>
            <Link to="/admin" className="text-sm text-muted-foreground hover:text-gold-accent">
              ← 관리자 홈
            </Link>
          </div>

          <p className="mb-6 text-sm leading-relaxed text-muted-foreground [word-break:keep-all]">
            카테고리·시술 목록 카드와 상세 상단에 쓰는 이미지입니다. 업로드 시 Supabase Storage(
            <code className="text-xs">procedure-images</code>)와 DB(
            <code className="text-xs">procedure_hero_images</code>)에 반영됩니다. 키는{" "}
            <code className="text-xs">카테고리슬러그/시술슬러그</code> 형식입니다.
          </p>

          {error ? <p className="mb-6 text-sm text-destructive">{error}</p> : null}

          <div className="space-y-3">
            {treatments.map((t) => {
              const storageKey = procedureHeroImageStorageKey(t.categorySlug, t.slug);
              const cat = getProcedureCategory(t.categorySlug);
              const preview = pickProcedureHeroImageUrl(t.categorySlug, t.slug, t.heroImage, byKey);
              const busy = savingKey === storageKey;
              return (
                <div
                  key={storageKey}
                  className="grid gap-4 border border-border/70 bg-muted/15 p-4 sm:grid-cols-[100px_1fr_auto] sm:items-center"
                >
                  <div className="flex justify-center sm:block">
                    {preview ? (
                      <img src={preview} alt="" className="h-20 w-full max-w-[100px] object-cover sm:h-24" />
                    ) : (
                      <div className="flex h-20 w-full max-w-[100px] items-center justify-center bg-muted/40 text-[10px] text-muted-foreground sm:h-24">
                        없음
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 space-y-1">
                    <p className="text-xs text-muted-foreground">{cat?.label ?? t.categorySlug}</p>
                    <p className="font-medium text-charcoal">{t.title}</p>
                    <p className="truncate font-mono text-[11px] text-muted-foreground">{storageKey}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 sm:flex-col sm:items-stretch">
                    <label className="cursor-pointer rounded border border-border bg-background px-3 py-2 text-center text-xs font-medium hover:border-gold-accent/40">
                      {busy ? "처리 중…" : "이미지 선택"}
                      <input
                        type="file"
                        accept="image/*"
                        disabled={busy}
                        className="hidden"
                        onChange={(e) => {
                          const f = e.target.files?.[0];
                          void onPickFile(storageKey, f);
                          e.target.value = "";
                        }}
                      />
                    </label>
                    <button
                      type="button"
                      disabled={busy || !byKey[storageKey]}
                      onClick={() => void onReset(storageKey)}
                      className="rounded border border-border px-3 py-2 text-xs text-muted-foreground hover:border-gold-accent/40 disabled:opacity-40"
                    >
                      DB 덮어쓰기 해제
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
