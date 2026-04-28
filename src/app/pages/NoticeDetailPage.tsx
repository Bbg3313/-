import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { fetchNoticeBySlug } from "../lib/cmsApi";
import type { Notice, NoticeAttachment } from "../types/cms";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

function toAttachments(value: Notice["attachments"]): NoticeAttachment[] {
  return Array.isArray(value) ? value : [];
}

function toImages(value: Notice["images"]): string[] {
  return Array.isArray(value) ? value : [];
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

  const attachments = toAttachments(notice?.attachments ?? null);
  const images = toImages(notice?.images ?? null);

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
                <h1 className="text-2xl font-semibold tracking-tight text-charcoal sm:text-3xl">{notice.title}</h1>
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

                {attachments.length > 0 ? (
                  <section className="border-t border-border/70 pt-5">
                    <h2 className="mb-3 text-sm font-semibold text-charcoal">첨부파일</h2>
                    <ul className="space-y-2 text-sm">
                      {attachments.map((file, idx) => (
                        <li key={`${file.url}-${idx}`}>
                          <a href={file.url} download className="text-gold-accent hover:underline underline-offset-2">
                            {file.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </section>
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

