import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { fetchPublishedPromotions } from "../lib/cmsApi";
import type { Promotion } from "../types/cms";

const FALLBACK_EVENTS = [
  {
    slug: "event-01",
    title: "봄맞이 피부케어 이벤트",
    period: "2026.04",
    thumbnail:
      "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxza2luY2FyZXxlbnwxfHx8fDE3NzU0NjI3MjB8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    slug: "event-02",
    title: "레이저 패키지 프로모션",
    period: "2026.04",
    thumbnail:
      "https://images.unsplash.com/photo-1580281658628-9bc861a5a1f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxtZWRpY2FsJTIwY2xpbmljfGVufDF8fHx8MTc3NTQ2NDY2Mnww&ixlib=rb-4.1.0&q=80&w=1080",
  },
] as const;

export function EventsBoardPage() {
  const [rows, setRows] = useState<Promotion[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetchPublishedPromotions()
      .then((data) => setRows(data))
      .catch(() => setRows([]))
      .finally(() => setLoaded(true));
  }, []);

  const cards = rows.length
    ? rows.map((row) => ({
        slug: row.slug,
        title: row.title,
        period: row.period ?? "",
        thumbnail: row.thumbnail_url,
      }))
    : [...FALLBACK_EVENTS];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 pt-32 md:pt-36 pb-20 px-6">
        <div className="max-w-[90rem] mx-auto">
          <Link
            to="/"
            className="inline-flex items-center py-1 text-sm leading-none text-muted-foreground hover:text-gold-accent transition-colors mb-8"
          >
            ← 홈으로
          </Link>

          <div className="text-center mb-14 lg:mb-16">
            <div className="w-12 h-px bg-gold-accent mx-auto mb-8" />
            <h1
              className="mb-4 text-charcoal tracking-tight"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
                lineHeight: "1.1",
                fontWeight: "500",
              }}
            >
              Events
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              진행 중인 이벤트·프로모션만 모아 두었습니다. 카드를 누르면 상세 페이지로 이동합니다.
            </p>
          </div>

          {!loaded ? (
            <p className="text-center text-muted-foreground py-16">불러오는 중…</p>
          ) : rows.length === 0 ? (
            <p className="text-center text-sm text-muted-foreground border border-dashed border-border/70 rounded-lg py-10 mb-10">
              등록된 프로모션이 없어 샘플 카드를 보여 드립니다. 관리자에서 프로모션을 등록하면 이곳에 반영됩니다.
            </p>
          ) : null}

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {cards.map((event) => (
              <Link
                key={event.slug}
                to={`/promotions/${event.slug}`}
                className="group block bg-white overflow-hidden border border-border/70 hover:border-gold-accent/25 transition-colors shadow-sm hover:shadow-md"
                aria-label={`${event.title} 상세 보기`}
              >
                <div className="relative aspect-[5/4] overflow-hidden bg-muted">
                  <ImageWithFallback
                    src={event.thumbnail}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="p-5 lg:p-6">
                  <p className="text-xs tracking-widest uppercase text-gold-accent mb-2">{event.period}</p>
                  <p className="text-charcoal font-semibold leading-snug line-clamp-2 text-[15px] lg:text-base">
                    {event.title}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer className="mt-auto" />
    </div>
  );
}
