import { FormEvent, useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import type { ProcedureDetailSpecs } from "../../../data/proceduresExcelCatalog";
import {
  PROCEDURE_SPEC_LABELS,
  PROCEDURE_TREATMENTS,
  getProcedureCategory,
} from "../../../data/treatmentsCatalog";
import {
  deleteProcedureSpecsOverride,
  fetchProcedureSpecsOverridesAdmin,
  formatSupabaseClientError,
  upsertProcedureSpecsOverride,
} from "../../lib/cmsApi";
import { procedureHeroImageStorageKey } from "../../lib/procedureHeroImages";
import { mergeProcedureSpecs } from "../../lib/procedureSpecsMerge";

export function AdminProcedureSpecsPage() {
  const sortedTreatments = useMemo(
    () =>
      [...PROCEDURE_TREATMENTS].sort((a, b) =>
        a.categorySlug === b.categorySlug ? a.sort - b.sort : a.categorySlug.localeCompare(b.categorySlug),
      ),
    [],
  );

  const [selectedKey, setSelectedKey] = useState(
    () =>
      procedureHeroImageStorageKey(sortedTreatments[0].categorySlug, sortedTreatments[0].slug),
  );
  const [overrideByKey, setOverrideByKey] = useState<Record<string, Partial<ProcedureDetailSpecs>>>({});
  const [fields, setFields] = useState<ProcedureDetailSpecs>(sortedTreatments[0].specs);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadOverrides = async () => {
    try {
      const rows = await fetchProcedureSpecsOverridesAdmin();
      setOverrideByKey(
        Object.fromEntries(rows.map((r) => [r.treatment_key, r.specs_patch as Partial<ProcedureDetailSpecs>])),
      );
      setError("");
    } catch (e: unknown) {
      setError(formatSupabaseClientError(e));
    }
  };

  useEffect(() => {
    void loadOverrides();
  }, []);

  useEffect(() => {
    const t = sortedTreatments.find(
      (x) => procedureHeroImageStorageKey(x.categorySlug, x.slug) === selectedKey,
    );
    if (!t) return;
    const patch = overrideByKey[selectedKey];
    setFields(mergeProcedureSpecs(t.specs, patch));
  }, [selectedKey, overrideByKey, sortedTreatments]);

  const selectedTreatment = sortedTreatments.find(
    (x) => procedureHeroImageStorageKey(x.categorySlug, x.slug) === selectedKey,
  );

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectedTreatment) return;
    setSaving(true);
    setError("");
    try {
      await upsertProcedureSpecsOverride(selectedKey, fields);
      setOverrideByKey((prev) => ({ ...prev, [selectedKey]: { ...fields } }));
    } catch (err: unknown) {
      setError(formatSupabaseClientError(err));
    } finally {
      setSaving(false);
    }
  };

  const onResetToCatalog = async () => {
    if (!selectedTreatment) return;
    setSaving(true);
    setError("");
    try {
      await deleteProcedureSpecsOverride(selectedKey);
      setOverrideByKey((prev) => {
        const next = { ...prev };
        delete next[selectedKey];
        return next;
      });
      setFields({ ...selectedTreatment.specs });
    } catch (err: unknown) {
      setError(formatSupabaseClientError(err));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 px-6 pb-20 pt-32 md:pt-36">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 flex items-center justify-between gap-3">
            <h1 className="text-3xl font-semibold tracking-tight text-charcoal">시술 요약(스펙) 수정</h1>
            <Link to="/admin" className="text-sm text-muted-foreground hover:text-gold-accent">
              ← 관리자 홈
            </Link>
          </div>

          <p className="mb-6 text-sm leading-relaxed text-muted-foreground [word-break:keep-all]">
            시술 안내 상세의「시술 요약」블록에 표시되는 항목입니다. 저장 시 Supabase 테이블{" "}
            <code className="text-xs">procedure_specs_overrides</code>에 반영되며, 키는{" "}
            <code className="text-xs">카테고리슬러그/시술슬러그</code>입니다. 비워 두지 말고 기본값과 동일하게 두려면
            「DB 덮어쓰기 해제」로 행을 삭제하세요.
          </p>

          {error ? <p className="mb-4 text-sm text-destructive">{error}</p> : null}

          <form onSubmit={onSubmit} className="space-y-6 border border-border/70 bg-muted/15 p-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-charcoal">시술 선택</label>
              <select
                value={selectedKey}
                onChange={(e) => setSelectedKey(e.target.value)}
                className="w-full border border-border bg-background px-3 py-2 text-sm"
              >
                {sortedTreatments.map((t) => {
                  const key = procedureHeroImageStorageKey(t.categorySlug, t.slug);
                  const cat = getProcedureCategory(t.categorySlug);
                  return (
                    <option key={key} value={key}>
                      [{cat?.label ?? t.categorySlug}] {t.title}
                    </option>
                  );
                })}
              </select>
              <p className="mt-1 font-mono text-[11px] text-muted-foreground">{selectedKey}</p>
            </div>

            {PROCEDURE_SPEC_LABELS.map(({ key, label }) => (
              <div key={key}>
                <label htmlFor={`spec-${key}`} className="mb-1.5 block text-xs font-semibold text-charcoal">
                  {label}
                </label>
                <textarea
                  id={`spec-${key}`}
                  rows={4}
                  value={fields[key]}
                  onChange={(e) => setFields((prev) => ({ ...prev, [key]: e.target.value }))}
                  className="w-full resize-y border border-border bg-background px-3 py-2 text-sm leading-relaxed"
                />
              </div>
            ))}

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="submit"
                disabled={saving}
                className="bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-60"
              >
                {saving ? "저장 중…" : "저장"}
              </button>
              <button
                type="button"
                disabled={saving}
                onClick={() => void onResetToCatalog()}
                className="border border-border px-4 py-2 text-sm text-muted-foreground hover:border-gold-accent/40 disabled:opacity-60"
              >
                DB 덮어쓰기 해제 (카탈로그만 사용)
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
