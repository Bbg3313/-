import { FormEvent, useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import {
  createPromotion,
  deletePromotion,
  fetchPromotionsAdmin,
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

export function AdminPromotionsPage() {
  const [items, setItems] = useState<Promotion[]>([]);
  const [title, setTitle] = useState("");
  const [period, setPeriod] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [sortOrder, setSortOrder] = useState(0);
  const [published, setPublished] = useState(true);
  const [thumbFile, setThumbFile] = useState<File | null>(null);
  const [detailFiles, setDetailFiles] = useState<File[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const slug = useMemo(() => slugify(title), [title]);

  const load = async () => {
    try {
      setItems(await fetchPromotionsAdmin());
    } catch (e: any) {
      setError(e?.message ?? "프로모션 목록을 불러오지 못했습니다.");
    }
  };

  useEffect(() => {
    load();
  }, []);

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
      await load();
    } catch (e: any) {
      setError(e?.message ?? "프로모션 저장 중 오류가 발생했습니다.");
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
            <Link to="/admin" className="text-sm text-muted-foreground hover:text-gold-accent">← 관리자 홈</Link>
          </div>

          <form onSubmit={onCreate} className="border border-border/70 bg-muted/20 p-6 grid md:grid-cols-2 gap-4 mb-8">
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="제목" className="border border-border bg-background px-3 py-2 text-sm" required />
            <input value={period} onChange={(e) => setPeriod(e.target.value)} placeholder="기간 (예: 2026.04)" className="border border-border bg-background px-3 py-2 text-sm" />
            <input value={summary} onChange={(e) => setSummary(e.target.value)} placeholder="요약 문구" className="border border-border bg-background px-3 py-2 text-sm md:col-span-2" />
            <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="상세 내용" className="border border-border bg-background px-3 py-2 text-sm md:col-span-2 min-h-28" />
            <input type="number" value={sortOrder} onChange={(e) => setSortOrder(Number(e.target.value))} placeholder="정렬순서" className="border border-border bg-background px-3 py-2 text-sm" />
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} /> 게시</label>
            <input type="file" accept="image/*" onChange={(e) => setThumbFile(e.target.files?.[0] ?? null)} className="md:col-span-2 text-sm" />
            <input type="file" accept="image/*" multiple onChange={(e) => setDetailFiles(Array.from(e.target.files ?? []))} className="md:col-span-2 text-sm" />
            <p className="md:col-span-2 text-xs text-muted-foreground">자동 slug: {slug || "-"}</p>
            {error && <p className="md:col-span-2 text-sm text-destructive">{error}</p>}
            <button disabled={saving} className="md:col-span-2 bg-primary text-primary-foreground px-4 py-2 text-sm font-medium disabled:opacity-60">
              {saving ? "저장 중..." : "프로모션 등록"}
            </button>
          </form>

          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="border border-border/70 bg-background p-4 grid md:grid-cols-[170px_1fr_auto] gap-4">
                <img src={item.thumbnail_url} alt={item.title} className="w-full h-28 object-cover border border-border" />
                <div className="space-y-2">
                  <input
                    value={item.title}
                    onChange={(e) => setItems((prev) => prev.map((x) => (x.id === item.id ? { ...x, title: e.target.value } : x)))}
                    className="w-full border border-border px-3 py-2 text-sm"
                  />
                  <input
                    value={item.slug}
                    onChange={(e) => setItems((prev) => prev.map((x) => (x.id === item.id ? { ...x, slug: e.target.value } : x)))}
                    className="w-full border border-border px-3 py-2 text-sm"
                  />
                  <input
                    value={item.summary ?? ""}
                    onChange={(e) => setItems((prev) => prev.map((x) => (x.id === item.id ? { ...x, summary: e.target.value } : x)))}
                    className="w-full border border-border px-3 py-2 text-sm"
                  />
                  <div className="flex gap-3">
                    <input
                      value={item.period ?? ""}
                      onChange={(e) => setItems((prev) => prev.map((x) => (x.id === item.id ? { ...x, period: e.target.value } : x)))}
                      className="w-36 border border-border px-3 py-2 text-sm"
                    />
                    <input
                      type="number"
                      value={item.sort_order}
                      onChange={(e) => setItems((prev) => prev.map((x) => (x.id === item.id ? { ...x, sort_order: Number(e.target.value) } : x)))}
                      className="w-28 border border-border px-3 py-2 text-sm"
                    />
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={item.is_published}
                        onChange={(e) =>
                          setItems((prev) => prev.map((x) => (x.id === item.id ? { ...x, is_published: e.target.checked } : x)))
                        }
                      />
                      게시
                    </label>
                  </div>
                </div>
                <div className="flex md:flex-col gap-2">
                  <button
                    type="button"
                    className="border border-border px-3 py-2 text-sm hover:border-gold-accent/40"
                    onClick={async () => {
                      await updatePromotion(item.id, {
                        title: item.title,
                        slug: item.slug,
                        summary: item.summary,
                        period: item.period,
                        sort_order: item.sort_order,
                        is_published: item.is_published,
                      });
                      await load();
                    }}
                  >
                    수정
                  </button>
                  <button
                    type="button"
                    className="border border-destructive/40 text-destructive px-3 py-2 text-sm"
                    onClick={async () => {
                      await deletePromotion(item.id);
                      await load();
                    }}
                  >
                    삭제
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

