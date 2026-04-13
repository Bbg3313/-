import { FormEvent, useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import {
  createPromotion,
  deletePromotion,
  fetchPromotionsAdmin,
  formatSupabaseClientError,
  updatePromotion,
  uploadImage,
} from "../../lib/cmsApi";
import type { Promotion } from "../../types/cms";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w가-힣\s-]/g, "")
    .replace(/\s+/g, "-");
}

function ImageUploadField({
  label,
  hint,
  acceptMultiple,
  onChange,
  previewUrls,
}: {
  label: string;
  hint?: string;
  acceptMultiple?: boolean;
  onChange: (files: File[]) => void;
  previewUrls: string[];
}) {
  return (
    <div className="md:col-span-2 rounded-lg border-2 border-dashed border-border/80 bg-background px-4 py-4 hover:border-gold-accent/35 transition-colors">
      <p className="text-sm font-medium text-charcoal mb-1">{label}</p>
      {hint ? <p className="text-xs text-muted-foreground mb-3">{hint}</p> : null}
      <input
        type="file"
        accept="image/*"
        multiple={acceptMultiple}
        onChange={(e) => onChange(Array.from(e.target.files ?? []))}
        className="w-full text-sm file:mr-3 file:rounded file:border-0 file:bg-champagne file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-charcoal"
      />
      {previewUrls.length > 0 ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {previewUrls.map((url) => (
            <img key={url} src={url} alt="" className="h-20 w-auto max-w-[140px] rounded border border-border object-cover" />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function PromotionEditRow({ item, onReload }: { item: Promotion; onReload: () => Promise<void> }) {
  const [title, setTitle] = useState(item.title);
  const [slug, setSlug] = useState(item.slug);
  const [summary, setSummary] = useState(item.summary ?? "");
  const [period, setPeriod] = useState(item.period ?? "");
  const [content, setContent] = useState(item.content ?? "");
  const [sortOrder, setSortOrder] = useState(item.sort_order);
  const [published, setPublished] = useState(item.is_published);
  const [detailUrls, setDetailUrls] = useState<string[]>(item.detail_images ?? []);
  const [newThumb, setNewThumb] = useState<File | null>(null);
  const [newThumbPreview, setNewThumbPreview] = useState<string | null>(null);
  const [newDetailFiles, setNewDetailFiles] = useState<File[]>([]);
  const [newDetailPreviews, setNewDetailPreviews] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    setTitle(item.title);
    setSlug(item.slug);
    setSummary(item.summary ?? "");
    setPeriod(item.period ?? "");
    setContent(item.content ?? "");
    setSortOrder(item.sort_order);
    setPublished(item.is_published);
    setDetailUrls([...(item.detail_images ?? [])]);
    setNewThumb(null);
    setNewThumbPreview(null);
    setNewDetailFiles([]);
    setNewDetailPreviews([]);
    setMsg("");
  }, [item.id, item.updated_at]);

  useEffect(() => {
    if (!newThumb) {
      setNewThumbPreview(null);
      return;
    }
    const u = URL.createObjectURL(newThumb);
    setNewThumbPreview(u);
    return () => URL.revokeObjectURL(u);
  }, [newThumb]);

  useEffect(() => {
    const urls = newDetailFiles.map((f) => URL.createObjectURL(f));
    setNewDetailPreviews(urls);
    return () => urls.forEach((u) => URL.revokeObjectURL(u));
  }, [newDetailFiles]);

  const save = async () => {
    setBusy(true);
    setMsg("");
    try {
      let thumbnail_url = item.thumbnail_url;
      if (newThumb) {
        thumbnail_url = await uploadImage("promotion-images", newThumb);
      }
      const uploaded: string[] = [];
      for (const f of newDetailFiles) {
        uploaded.push(await uploadImage("promotion-images", f));
      }
      const mergedDetails = [...detailUrls, ...uploaded];
      await updatePromotion(item.id, {
        title,
        slug,
        summary: summary || null,
        period: period || null,
        content: content || null,
        thumbnail_url,
        detail_images: mergedDetails.length ? mergedDetails : null,
        sort_order: Number(sortOrder) || 0,
        is_published: published,
      });
      await onReload();
    } catch (e: unknown) {
      setMsg(formatSupabaseClientError(e));
    } finally {
      setBusy(false);
    }
  };

  const remove = async () => {
    if (!window.confirm(`「${item.title}」프로모션을 삭제할까요?`)) return;
    setBusy(true);
    setMsg("");
    try {
      await deletePromotion(item.id);
      await onReload();
    } catch (e: unknown) {
      setMsg(formatSupabaseClientError(e));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="border border-border/70 bg-background p-4 sm:p-6 space-y-4">
      <div className="grid gap-4 md:grid-cols-[160px_1fr]">
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground">썸네일</p>
          <div className="relative aspect-[4/3] w-full max-w-[200px] overflow-hidden rounded-lg border border-border bg-muted/30">
            <img
              src={newThumbPreview ?? item.thumbnail_url}
              alt={title}
              className="h-full w-full object-cover"
            />
          </div>
          <label className="block">
            <span className="mb-1 block text-xs text-muted-foreground">이미지 교체</span>
            <input
              type="file"
              accept="image/*"
              disabled={busy}
              onChange={(e) => setNewThumb(e.target.files?.[0] ?? null)}
              className="w-full text-xs file:mr-2 file:rounded file:border-0 file:bg-champagne file:px-2 file:py-1 file:text-charcoal"
            />
          </label>
        </div>

        <div className="space-y-3 min-w-0">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목"
            className="w-full border border-border bg-background px-3 py-2 text-sm"
          />
          <input
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="slug (URL)"
            className="w-full border border-border bg-background px-3 py-2 text-sm font-mono"
          />
          <input
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="요약"
            className="w-full border border-border bg-background px-3 py-2 text-sm"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="상세 본문"
            className="w-full min-h-[100px] border border-border bg-background px-3 py-2 text-sm"
          />
          <div className="flex flex-wrap gap-3">
            <input
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              placeholder="기간"
              className="w-40 border border-border bg-background px-3 py-2 text-sm"
            />
            <input
              type="number"
              value={sortOrder}
              onChange={(e) => setSortOrder(Number(e.target.value))}
              placeholder="정렬"
              className="w-24 border border-border bg-background px-3 py-2 text-sm"
            />
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} />
              게시
            </label>
          </div>
        </div>
      </div>

      <div>
        <p className="text-xs font-medium text-muted-foreground mb-2">상세 이미지 (저장 시 서버에 반영)</p>
        <div className="flex flex-wrap gap-2 mb-3">
          {detailUrls.map((url, idx) => (
            <div key={`${url}-${idx}`} className="group relative">
              <img src={url} alt="" className="h-20 w-auto max-w-[120px] rounded border border-border object-cover" />
              <button
                type="button"
                disabled={busy}
                onClick={() => setDetailUrls((prev) => prev.filter((_, i) => i !== idx))}
                className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-[11px] font-bold text-destructive-foreground shadow opacity-90 hover:opacity-100"
                title="목록에서 제거"
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <label className="block rounded-lg border border-dashed border-border/80 bg-muted/10 px-3 py-3">
          <span className="mb-2 block text-xs text-muted-foreground">이미지 추가 (복수 선택 가능)</span>
          <input
            type="file"
            accept="image/*"
            multiple
            disabled={busy}
            onChange={(e) => setNewDetailFiles(Array.from(e.target.files ?? []))}
            className="w-full text-xs file:mr-2 file:rounded file:border-0 file:bg-champagne file:px-2 file:py-1 file:text-charcoal"
          />
        </label>
        {newDetailPreviews.length > 0 ? (
          <p className="mt-2 text-xs text-muted-foreground">새로 추가될 미리보기 {newDetailPreviews.length}장</p>
        ) : null}
        <div className="mt-2 flex flex-wrap gap-2">
          {newDetailPreviews.map((u, i) => (
            <img key={i} src={u} alt="" className="h-16 w-auto max-w-[100px] rounded border border-border object-cover opacity-80" />
          ))}
        </div>
      </div>

      {msg ? <p className="text-sm text-destructive whitespace-pre-wrap break-words">{msg}</p> : null}

      <div className="flex flex-wrap gap-2 border-t border-border/50 pt-4">
        <button
          type="button"
          disabled={busy}
          onClick={() => void save()}
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-60"
        >
          {busy ? "처리 중..." : "변경 저장"}
        </button>
        <button
          type="button"
          disabled={busy}
          onClick={() => void remove()}
          className="rounded-md border border-destructive/50 px-4 py-2 text-sm font-medium text-destructive hover:bg-destructive/5 disabled:opacity-60"
        >
          삭제
        </button>
      </div>
    </div>
  );
}

export function AdminPromotionsPage() {
  const [items, setItems] = useState<Promotion[]>([]);
  const [title, setTitle] = useState("");
  const [period, setPeriod] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [sortOrder, setSortOrder] = useState(0);
  const [published, setPublished] = useState(true);
  const [thumbFile, setThumbFile] = useState<File | null>(null);
  const [thumbPreview, setThumbPreview] = useState<string | null>(null);
  const [detailFiles, setDetailFiles] = useState<File[]>([]);
  const [detailPreviews, setDetailPreviews] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  /** 비우면 제목으로 자동 slug */
  const [slugManual, setSlugManual] = useState("");

  const slug = useMemo(() => {
    const manual = slugManual.trim();
    if (manual) return slugify(manual);
    return slugify(title);
  }, [title, slugManual]);

  const load = async () => {
    try {
      setItems(await fetchPromotionsAdmin());
    } catch (e: unknown) {
      setError(formatSupabaseClientError(e));
    }
  };

  useEffect(() => {
    void load();
  }, []);

  useEffect(() => {
    if (!thumbFile) {
      setThumbPreview(null);
      return;
    }
    const u = URL.createObjectURL(thumbFile);
    setThumbPreview(u);
    return () => URL.revokeObjectURL(u);
  }, [thumbFile]);

  useEffect(() => {
    const urls = detailFiles.map((f) => URL.createObjectURL(f));
    setDetailPreviews(urls);
    return () => urls.forEach((u) => URL.revokeObjectURL(u));
  }, [detailFiles]);

  const onCreate = async (e: FormEvent) => {
    e.preventDefault();
    if (!thumbFile) return setError("썸네일 이미지를 선택하세요.");
    if (!slug) return setError("제목을 입력하세요.");
    setSaving(true);
    setError("");
    try {
      const thumbnailUrl = await uploadImage("promotion-images", thumbFile);
      const detailImages: string[] = [];
      for (const file of detailFiles) {
        detailImages.push(await uploadImage("promotion-images", file));
      }
      await createPromotion({
        slug,
        title,
        period: period || null,
        summary: summary || null,
        content: content || null,
        thumbnail_url: thumbnailUrl,
        detail_images: detailImages.length ? detailImages : null,
        sort_order: Number(sortOrder) || 0,
        is_published: published,
      });
      setTitle("");
      setPeriod("");
      setSummary("");
      setContent("");
      setSortOrder(0);
      setPublished(true);
      setThumbFile(null);
      setDetailFiles([]);
      setSlugManual("");
      await load();
    } catch (e: unknown) {
      setError(formatSupabaseClientError(e));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 px-6 pt-32 md:pt-36 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-semibold text-charcoal">프로모션 관리</h1>
            <Link to="/admin" className="text-sm text-muted-foreground hover:text-gold-accent">
              ← 관리자 홈
            </Link>
          </div>

          <section className="mb-10 rounded-xl border border-border/70 bg-muted/15 p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-charcoal mb-1">새 프로모션 등록</h2>
            <p className="text-sm text-muted-foreground mb-6">
              썸네일은 필수입니다. 상세 이미지는 여러 장 선택할 수 있으며, 저장 시 Supabase Storage(
              <code className="text-xs">promotion-images</code>)에 올라갑니다.
            </p>
            <form onSubmit={(e) => void onCreate(e)} className="grid md:grid-cols-2 gap-4">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="제목 *"
                className="border border-border bg-background px-3 py-2 text-sm"
                required
              />
              <input
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                placeholder="기간 (예: 2026.04)"
                className="border border-border bg-background px-3 py-2 text-sm"
              />
              <input
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="요약 문구"
                className="border border-border bg-background px-3 py-2 text-sm md:col-span-2"
              />
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="상세 본문"
                className="border border-border bg-background px-3 py-2 text-sm md:col-span-2 min-h-28"
              />
              <input
                type="number"
                value={sortOrder}
                onChange={(e) => setSortOrder(Number(e.target.value))}
                placeholder="정렬순서"
                className="border border-border bg-background px-3 py-2 text-sm"
              />
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} />
                게시
              </label>

              <ImageUploadField
                label="썸네일 이미지 *"
                hint="목록·상단에 쓰이는 대표 이미지입니다."
                onChange={(files) => setThumbFile(files[0] ?? null)}
                previewUrls={thumbPreview ? [thumbPreview] : []}
              />
              <ImageUploadField
                label="상세 이미지 (선택, 복수)"
                hint="이벤트 상세 페이지에 세로로 나열됩니다."
                acceptMultiple
                onChange={(files) => setDetailFiles(files)}
                previewUrls={detailPreviews}
              />

              <input
                value={slugManual}
                onChange={(e) => setSlugManual(e.target.value)}
                placeholder="URL slug 직접 지정 (비우면 제목으로 자동 생성)"
                className="border border-border bg-background px-3 py-2 text-sm md:col-span-2 font-mono"
              />
              <p className="md:col-span-2 text-xs text-muted-foreground">
                저장 시 사용할 slug: <span className="font-mono text-charcoal">{slug || "—"}</span>
                {slugManual.trim() ? "" : " · 제목을 바꿔도 slug가 겹치면 여기에 다른 값을 적어 주세요."}
              </p>
              {error ? (
                <p className="md:col-span-2 text-sm text-destructive whitespace-pre-wrap break-words">{error}</p>
              ) : null}
              <button
                type="submit"
                disabled={saving}
                className="md:col-span-2 rounded-md bg-primary text-primary-foreground px-4 py-3 text-sm font-medium disabled:opacity-60"
              >
                {saving ? "저장 중..." : "프로모션 등록"}
              </button>
            </form>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-charcoal mb-4">등록된 프로모션</h2>
            <div className="space-y-6">
              {items.length === 0 ? (
                <p className="text-sm text-muted-foreground border border-dashed border-border/70 rounded-lg p-8 text-center">
                  아직 등록된 프로모션이 없습니다.
                </p>
              ) : (
                items.map((item) => <PromotionEditRow key={item.id} item={item} onReload={load} />)
              )}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
