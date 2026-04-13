import { FormEvent, useEffect, useState } from "react";
import { Link } from "react-router";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import {
  createHeroBanner,
  deleteHeroBanner,
  fetchHeroBannersAdmin,
  formatSupabaseClientError,
  updateHeroBanner,
  uploadImage,
} from "../../lib/cmsApi";
import type { HeroBanner } from "../../types/cms";

export function AdminHeroPage() {
  const [items, setItems] = useState<HeroBanner[]>([]);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [sortOrder, setSortOrder] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      setItems(await fetchHeroBannersAdmin());
    } catch (e: unknown) {
      setError(formatSupabaseClientError(e));
    }
  };

  useEffect(() => {
    load();
  }, []);

  const onCreate = async (e: FormEvent) => {
    e.preventDefault();
    if (!imageFile) return setError("배너 이미지를 선택하세요.");
    setSaving(true);
    setError("");
    try {
      const imageUrl = await uploadImage("hero-images", imageFile);
      await createHeroBanner({
        title: title || null,
        subtitle: subtitle || null,
        image_url: imageUrl,
        sort_order: Number(sortOrder) || 0,
        is_active: isActive,
      });
      setTitle("");
      setSubtitle("");
      setSortOrder(0);
      setIsActive(true);
      setImageFile(null);
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
            <h1 className="text-3xl font-semibold text-charcoal">히어로 배너 관리</h1>
            <Link to="/admin" className="text-sm text-muted-foreground hover:text-gold-accent">← 관리자 홈</Link>
          </div>

          <form onSubmit={onCreate} className="border border-border/70 bg-muted/20 p-6 grid md:grid-cols-2 gap-4 mb-8">
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="제목(선택)" className="border border-border bg-background px-3 py-2 text-sm" />
            <input value={subtitle} onChange={(e) => setSubtitle(e.target.value)} placeholder="서브타이틀(선택)" className="border border-border bg-background px-3 py-2 text-sm" />
            <input type="number" value={sortOrder} onChange={(e) => setSortOrder(Number(e.target.value))} placeholder="정렬순서" className="border border-border bg-background px-3 py-2 text-sm" />
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} /> 활성</label>
            <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] ?? null)} className="md:col-span-2 text-sm" />
            {error && <p className="text-sm text-destructive md:col-span-2">{error}</p>}
            <button disabled={saving} className="md:col-span-2 bg-primary text-primary-foreground px-4 py-2 text-sm font-medium disabled:opacity-60">
              {saving ? "저장 중..." : "배너 등록"}
            </button>
          </form>

          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="border border-border/70 bg-background p-4 grid md:grid-cols-[220px_1fr_auto] gap-4 items-center">
                <img src={item.image_url} alt={item.title ?? "hero"} className="w-full h-28 object-cover border border-border" />
                <div className="space-y-2">
                  <input
                    value={item.title ?? ""}
                    onChange={(e) => setItems((prev) => prev.map((x) => (x.id === item.id ? { ...x, title: e.target.value } : x)))}
                    className="w-full border border-border px-3 py-2 text-sm"
                  />
                  <input
                    value={item.subtitle ?? ""}
                    onChange={(e) => setItems((prev) => prev.map((x) => (x.id === item.id ? { ...x, subtitle: e.target.value } : x)))}
                    className="w-full border border-border px-3 py-2 text-sm"
                  />
                  <div className="flex gap-3">
                    <input
                      type="number"
                      value={item.sort_order}
                      onChange={(e) => setItems((prev) => prev.map((x) => (x.id === item.id ? { ...x, sort_order: Number(e.target.value) } : x)))}
                      className="w-28 border border-border px-3 py-2 text-sm"
                    />
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={item.is_active}
                        onChange={(e) => setItems((prev) => prev.map((x) => (x.id === item.id ? { ...x, is_active: e.target.checked } : x)))}
                      />
                      활성
                    </label>
                  </div>
                </div>
                <div className="flex md:flex-col gap-2">
                  <button
                    type="button"
                    onClick={async () => {
                      await updateHeroBanner(item.id, {
                        title: item.title,
                        subtitle: item.subtitle,
                        sort_order: item.sort_order,
                        is_active: item.is_active,
                      });
                      await load();
                    }}
                    className="border border-border px-3 py-2 text-sm hover:border-gold-accent/40"
                  >
                    수정
                  </button>
                  <button
                    type="button"
                    onClick={async () => {
                      await deleteHeroBanner(item.id);
                      await load();
                    }}
                    className="border border-destructive/40 text-destructive px-3 py-2 text-sm"
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

