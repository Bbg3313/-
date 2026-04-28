import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { ConsultationChannelsSection } from "../components/ConsultationChannelsSection";
import { fetchPublishedNotices } from "../lib/cmsApi";
import type { Notice, NoticeAttachment } from "../types/cms";

function toAttachments(value: Notice["attachments"]): NoticeAttachment[] {
  return Array.isArray(value) ? value : [];
}

function getPdfAttachment(notice: Notice): NoticeAttachment | null {
  const files = toAttachments(notice.attachments);
  return files.find((file) => file.name.toLowerCase().endsWith(".pdf")) ?? null;
}

export function NoticePage() {
  const [items, setItems] = useState<Notice[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetchPublishedNotices()
      .then((rows) => setItems(rows))
      .catch(() => setItems([]))
      .finally(() => setLoaded(true));
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 px-6 pb-24 pt-32 md:pb-16 md:pt-36">
        <article className="max-w-6xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center py-1 text-sm leading-none text-muted-foreground hover:text-gold-accent transition-colors mb-8"
          >
            ← 홈으로
          </Link>
          <h1 className="text-charcoal text-3xl md:text-4xl font-semibold mb-8 tracking-tight">
            공지사항
          </h1>

          <p className="mb-6 text-sm text-muted-foreground">Total {items.length}건 1 페이지</p>

          <div className="border-t border-border/70">
            <div className="grid grid-cols-[80px_1fr_130px] items-center border-b border-border/70 px-4 py-3 text-sm text-muted-foreground">
              <span>번호</span>
              <span>제목</span>
              <span className="text-right">글쓴이</span>
            </div>

            {!loaded ? (
              <p className="border-b border-border/70 px-4 py-8 text-center text-sm text-muted-foreground">불러오는 중...</p>
            ) : items.length === 0 ? (
              <p className="border-b border-border/70 px-4 py-8 text-center text-sm text-muted-foreground">
                등록된 공지사항이 없습니다.
              </p>
            ) : (
              items.map((item, idx) => (
                <div
                  key={item.id}
                  className="grid grid-cols-[80px_1fr_130px] items-center border-b border-border/70 px-4 py-4 text-sm text-charcoal transition-colors hover:bg-muted/20"
                >
                  <span className="text-muted-foreground">{items.length - idx}</span>
                  <div className="flex min-w-0 items-center gap-3">
                    <Link to={`/notice/${item.slug}`} className="truncate font-medium hover:text-gold-accent">
                      {item.title}
                    </Link>
                    {item.title.includes("미성년자 시술 및 수술 동의서") && getPdfAttachment(item) ? (
                      <a
                        href={getPdfAttachment(item)?.url ?? "#"}
                        download
                        className="shrink-0 rounded border border-gold-accent/40 px-2 py-1 text-xs text-gold-accent hover:bg-gold-accent/10"
                      >
                        PDF 다운로드
                      </a>
                    ) : null}
                  </div>
                  <span className="text-right text-muted-foreground">연세미의원</span>
                </div>
              ))
            )}
          </div>

          <ConsultationChannelsSection />
        </article>
      </main>
      <Footer className="mt-auto" />
    </div>
  );
}
