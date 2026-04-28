import { FormEvent, useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import {
  createNotice,
  deleteNotice,
  fetchNoticesAdmin,
  formatSupabaseClientError,
  updateNotice,
  uploadImage,
} from "../../lib/cmsApi";
import type { Notice, NoticeAttachment } from "../../types/cms";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w가-힣\s-]/g, "")
    .replace(/\s+/g, "-");
}

function toAttachments(value: Notice["attachments"]): NoticeAttachment[] {
  return Array.isArray(value) ? value : [];
}

function toImages(value: Notice["images"]): string[] {
  return Array.isArray(value) ? value : [];
}

function NoticeEditRow({ item, onReload }: { item: Notice; onReload: () => Promise<void> }) {
  const [title, setTitle] = useState(item.title);
  const [slug, setSlug] = useState(item.slug);
  const [content, setContent] = useState(item.content ?? "");
  const [sortOrder, setSortOrder] = useState(item.sort_order);
  const [published, setPublished] = useState(item.is_published);
  const [images, setImages] = useState<string[]>(toImages(item.images));
  const [attachments, setAttachments] = useState<NoticeAttachment[]>(toAttachments(item.attachments));
  const [newImageFiles, setNewImageFiles] = useState<File[]>([]);
  const [newAttachmentFiles, setNewAttachmentFiles] = useState<File[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setTitle(item.title);
    setSlug(item.slug);
    setContent(item.content ?? "");
    setSortOrder(item.sort_order);
    setPublished(item.is_published);
    setImages(toImages(item.images));
    setAttachments(toAttachments(item.attachments));
    setNewImageFiles([]);
    setNewAttachmentFiles([]);
    setError("");
  }, [item.id, item.updated_at]);

  const save = async () => {
    setBusy(true);
    setError("");
    try {
      const uploadedImageUrls: string[] = [];
      for (const file of newImageFiles) {
        uploadedImageUrls.push(await uploadImage("notice-files", file));
      }

      const uploadedFiles: NoticeAttachment[] = [];
      for (const file of newAttachmentFiles) {
        const url = await uploadImage("notice-files", file);
        uploadedFiles.push({
          name: file.name,
          url,
          mime_type: file.type || null,
          size_bytes: file.size,
        });
      }

      const mergedImages = [...images, ...uploadedImageUrls];
      const mergedFiles = [...attachments, ...uploadedFiles];

      await updateNotice(item.id, {
        title,
        slug,
        content: content || null,
        author: "연세미의원",
        sort_order: Number(sortOrder) || 0,
        is_published: published,
        images: mergedImages.length ? mergedImages : null,
        attachments: mergedFiles.length ? mergedFiles : null,
      });
      await onReload();
    } catch (e: unknown) {
      setError(formatSupabaseClientError(e));
    } finally {
      setBusy(false);
    }
  };

  const remove = async () => {
    if (!window.confirm(`「${item.title}」 공지사항을 삭제할까요?`)) return;
    setBusy(true);
    setError("");
    try {
      await deleteNotice(item.id);
      await onReload();
    } catch (e: unknown) {
      setError(formatSupabaseClientError(e));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-4 border border-border/70 bg-background p-4 sm:p-6">
      <div className="grid gap-3 md:grid-cols-2">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-border bg-background px-3 py-2 text-sm"
          placeholder="제목"
        />
        <input
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="border border-border bg-background px-3 py-2 text-sm font-mono"
          placeholder="slug"
        />
      </div>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="min-h-32 w-full border border-border bg-background px-3 py-2 text-sm"
        placeholder="본문"
      />
      <div className="flex flex-wrap items-center gap-4 text-sm">
        <label className="flex items-center gap-2">
          정렬
          <input
            type="number"
            value={sortOrder}
            onChange={(e) => setSortOrder(Number(e.target.value))}
            className="w-20 border border-border bg-background px-2 py-1.5"
          />
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} />
          게시
        </label>
      </div>

      <div className="space-y-3 rounded-lg border border-border/60 bg-muted/15 p-4">
        <p className="text-xs font-medium text-muted-foreground">본문 이미지</p>
        <div className="flex flex-wrap gap-2">
          {images.map((url, idx) => (
            <button
              key={`${url}-${idx}`}
              type="button"
              onClick={() => setImages((prev) => prev.filter((_, i) => i !== idx))}
              className="rounded border border-border/80 px-2 py-1 text-xs text-muted-foreground hover:border-destructive/40 hover:text-destructive"
              title="목록에서 제거"
            >
              이미지 {idx + 1} 삭제
            </button>
          ))}
          {images.length === 0 ? <span className="text-xs text-muted-foreground">등록된 이미지 없음</span> : null}
        </div>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => setNewImageFiles(Array.from(e.target.files ?? []))}
          className="w-full text-xs file:mr-2 file:rounded file:border-0 file:bg-champagne file:px-2 file:py-1 file:text-charcoal"
        />
      </div>

      <div className="space-y-3 rounded-lg border border-border/60 bg-muted/15 p-4">
        <p className="text-xs font-medium text-muted-foreground">첨부파일</p>
        <div className="flex flex-wrap gap-2">
          {attachments.map((file, idx) => (
            <button
              key={`${file.url}-${idx}`}
              type="button"
              onClick={() => setAttachments((prev) => prev.filter((_, i) => i !== idx))}
              className="rounded border border-border/80 px-2 py-1 text-xs text-muted-foreground hover:border-destructive/40 hover:text-destructive"
              title="목록에서 제거"
            >
              {file.name}
            </button>
          ))}
          {attachments.length === 0 ? <span className="text-xs text-muted-foreground">등록된 파일 없음</span> : null}
        </div>
        <input
          type="file"
          multiple
          onChange={(e) => setNewAttachmentFiles(Array.from(e.target.files ?? []))}
          className="w-full text-xs file:mr-2 file:rounded file:border-0 file:bg-champagne file:px-2 file:py-1 file:text-charcoal"
        />
      </div>

      {error ? <p className="text-sm text-destructive whitespace-pre-wrap">{error}</p> : null}

      <div className="flex flex-wrap gap-2">
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

export function AdminNoticesPage() {
  const [items, setItems] = useState<Notice[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [sortOrder, setSortOrder] = useState(0);
  const [published, setPublished] = useState(true);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [attachmentFiles, setAttachmentFiles] = useState<File[]>([]);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [slugManual, setSlugManual] = useState("");

  const slug = useMemo(() => {
    const manual = slugManual.trim();
    if (manual) return slugify(manual);
    return slugify(title);
  }, [slugManual, title]);

  const load = async () => {
    try {
      setItems(await fetchNoticesAdmin());
    } catch (e: unknown) {
      setError(formatSupabaseClientError(e));
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const onCreate = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("제목을 입력하세요.");
      return;
    }
    if (!slug) {
      setError("URL slug를 확인하세요.");
      return;
    }

    setSaving(true);
    setError("");
    try {
      const imageUrls: string[] = [];
      for (const file of imageFiles) {
        imageUrls.push(await uploadImage("notice-files", file));
      }

      const files: NoticeAttachment[] = [];
      for (const file of attachmentFiles) {
        const url = await uploadImage("notice-files", file);
        files.push({
          name: file.name,
          url,
          mime_type: file.type || null,
          size_bytes: file.size,
        });
      }

      await createNotice({
        title: title.trim(),
        slug,
        content: content.trim() || null,
        author: "연세미의원",
        sort_order: Number(sortOrder) || 0,
        is_published: published,
        images: imageUrls.length ? imageUrls : null,
        attachments: files.length ? files : null,
      });

      setTitle("");
      setContent("");
      setSortOrder(0);
      setPublished(true);
      setImageFiles([]);
      setAttachmentFiles([]);
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
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-3xl font-semibold text-charcoal">공지사항 관리</h1>
            <Link to="/admin" className="text-sm text-muted-foreground hover:text-gold-accent">
              ← 관리자 홈
            </Link>
          </div>

          <section className="mb-10 rounded-xl border border-border/70 bg-muted/15 p-6 sm:p-8">
            <h2 className="mb-1 text-lg font-semibold text-charcoal">새 공지 등록</h2>
            <p className="mb-6 text-sm text-muted-foreground">
              글쓴이는 자동으로 연세미의원으로 표시됩니다. 이미지와 첨부파일은 Storage(
              <code className="text-xs">notice-files</code>)에 업로드됩니다.
            </p>
            <form onSubmit={(e) => void onCreate(e)} className="grid gap-4 md:grid-cols-2">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="제목 *"
                className="border border-border bg-background px-3 py-2 text-sm md:col-span-2"
                required
              />
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="본문"
                className="min-h-28 border border-border bg-background px-3 py-2 text-sm md:col-span-2"
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
              <input
                value={slugManual}
                onChange={(e) => setSlugManual(e.target.value)}
                placeholder="URL slug 직접 지정 (비우면 제목 기반 자동 생성)"
                className="border border-border bg-background px-3 py-2 text-sm font-mono md:col-span-2"
              />
              <p className="text-xs text-muted-foreground md:col-span-2">
                저장 slug: <span className="font-mono text-charcoal">{slug || "-"}</span>
              </p>

              <label className="rounded-lg border border-dashed border-border/70 bg-background px-4 py-3 text-sm md:col-span-2">
                <span className="mb-2 block text-xs text-muted-foreground">본문 이미지 업로드 (복수)</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => setImageFiles(Array.from(e.target.files ?? []))}
                  className="w-full text-xs file:mr-2 file:rounded file:border-0 file:bg-champagne file:px-2 file:py-1 file:text-charcoal"
                />
              </label>

              <label className="rounded-lg border border-dashed border-border/70 bg-background px-4 py-3 text-sm md:col-span-2">
                <span className="mb-2 block text-xs text-muted-foreground">첨부파일 업로드 (복수)</span>
                <input
                  type="file"
                  multiple
                  onChange={(e) => setAttachmentFiles(Array.from(e.target.files ?? []))}
                  className="w-full text-xs file:mr-2 file:rounded file:border-0 file:bg-champagne file:px-2 file:py-1 file:text-charcoal"
                />
              </label>

              {error ? <p className="text-sm text-destructive md:col-span-2 whitespace-pre-wrap">{error}</p> : null}
              <button
                type="submit"
                disabled={saving}
                className="rounded-md bg-primary px-4 py-3 text-sm font-medium text-primary-foreground disabled:opacity-60 md:col-span-2"
              >
                {saving ? "저장 중..." : "공지 등록"}
              </button>
            </form>
          </section>

          <section>
            <h2 className="mb-4 text-lg font-semibold text-charcoal">등록된 공지사항</h2>
            <div className="space-y-6">
              {items.length === 0 ? (
                <p className="rounded-lg border border-dashed border-border/70 p-8 text-center text-sm text-muted-foreground">
                  아직 등록된 공지사항이 없습니다.
                </p>
              ) : (
                items.map((item) => <NoticeEditRow key={item.id} item={item} onReload={load} />)
              )}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

