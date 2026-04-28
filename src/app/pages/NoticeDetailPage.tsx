import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { fetchNoticeBySlug } from "../lib/cmsApi";
import type { Notice, NoticeAttachment } from "../types/cms";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const MINOR_CONSENT_FALLBACK_URL =
  "https://rmwiwktaxokgyptrxyrz.supabase.co/storage/v1/object/public/notice-files/1777359387578-0k5fxof02jxw.png";

function toAttachments(value: Notice["attachments"]): NoticeAttachment[] {
  return Array.isArray(value) ? value : [];
}

function toImages(value: Notice["images"]): string[] {
  return Array.isArray(value) ? value : [];
}

function getNoticeDownload(notice: Notice | null): { name: string; url: string } | null {
  if (!notice) return null;
  const files = toAttachments(notice.attachments);
  if (files.length > 0) {
    const first = files[0];
    return { name: first.name || "첨부파일", url: first.url };
  }
  if (notice.title.includes("미성년자") && notice.title.includes("동의서")) {
    return { name: "minor-consent-form.png", url: MINOR_CONSENT_FALLBACK_URL };
  }
  return null;
}

export function NoticeDetailPage() {
  const { slug } = useParams();
  const [notice, setNotice] = useState<Notice | null>(null);

  useEffect(() => {
    if (!slug) return;
    fetchNoticeBySlug(slug)
      .then((row) => setNotice(row))
      .catch(() => setNotice(null));
  }, [slug]);

  const images = toImages(notice?.images ?? null);
  const downloadFile = getNoticeDownload(notice);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 px-6 pt-32 md:pt-36 pb-20">
        <div className="mx-auto max-w-4xl">
          <Link to="/notice" className="inline-flex items-center py-1 text-sm text-muted-foreground hover:text-gold-accent">
            ← 공지사항 목록
          </Link>

          {notice ? (
            <article className="mt-6 border border-border/70 bg-background">
              <header className="border-b border-border/70 px-5 py-5 sm:px-7">
                <div className="flex flex-wrap items-end justify-between gap-3">
                  <h1 className="text-2xl font-semibold tracking-tight text-charcoal sm:text-3xl">{notice.title}</h1>
                  {downloadFile ? (
                    <a
                      href={downloadFile.url}
                      download={downloadFile.name}
                      className="rounded border border-gold-accent/40 px-3 py-1.5 text-sm font-medium text-gold-accent hover:bg-gold-accent/10"
                    >
                      동의서 다운로드
                    </a>
                  ) : null}
                </div>
                <div className="mt-3 text-sm text-muted-foreground">
                  <span>글쓴이: 연세미의원</span>
                </div>
              </header>

              <div className="space-y-6 px-5 py-6 sm:px-7">
                {notice.content ? <p className="whitespace-pre-line leading-relaxed text-charcoal/90">{notice.content}</p> : null}

                {images.length > 0 ? (
                  <div className="space-y-4">
                    {images.map((url) => (
                      <ImageWithFallback key={url} src={url} alt={notice.title} className="h-auto w-full object-cover" />
                    ))}
                  </div>
                ) : null}
              </div>
            </article>
          ) : (
            <p className="mt-10 text-muted-foreground">공지사항을 찾을 수 없습니다.</p>
          )}
        </div>
      </main>
      <Footer className="mt-auto" />
    </div>
  );
}

