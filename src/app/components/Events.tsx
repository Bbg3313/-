import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { fetchPublishedPromotions } from "../lib/cmsApi";
import type { Promotion } from "../types/cms";

const EVENTS = [
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
  {
    slug: "event-03",
    title: "안티에이징 집중 관리",
    period: "2026.04",
    thumbnail:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw2fHxza2luJTIwdHJlYXRtZW50fGVufDF8fHx8MTc3NTQ2NDY2Mnww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    slug: "event-04",
    title: "여드름/흉터 케어 프로그램",
    period: "2026.04",
    thumbnail:
      "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw2fHxkZXJtYXRvbG9neXxlbnwxfHx8fDE3NzU0NjQ2NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
] as const;

export function Events() {
  const [rows, setRows] = useState<Promotion[]>([]);

  useEffect(() => {
    fetchPublishedPromotions()
      .then((data) => setRows(data))
      .catch(() => setRows([]));
  }, []);

  const cards = rows.length
    ? rows.map((row) => ({
        slug: row.slug,
        title: row.title,
        period: row.period ?? "",
        thumbnail: row.thumbnail_url,
      }))
    : EVENTS;

  return (
    <section id="events" className="relative overflow-hidden bg-background px-6 py-12 sm:py-24 lg:py-32">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent" />
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-gradient-radial from-gold-accent/6 to-transparent blur-3xl -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-gradient-radial from-gold-accent/6 to-transparent blur-3xl -translate-y-1/2" />

      <div className="max-w-[90rem] mx-auto relative">
        <div className="mb-8 text-center md:mb-16 lg:mb-20">
          <div className="mx-auto mb-4 h-px w-12 bg-gold-accent md:mb-8" />
          <h2
            className="mb-3 text-charcoal tracking-tight md:mb-6"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "3.5rem",
              lineHeight: "1.1",
              fontWeight: "500",
            }}
          >
            Events
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto [word-break:keep-all]">
            이달의 혜택을 확인해보세요
          </p>
          <p className="mt-3 md:mt-5">
            <Link
              to="/events"
              className="text-sm font-medium text-gold-accent hover:underline underline-offset-4 decoration-gold-accent/50"
            >
              이벤트 전체 보기 →
            </Link>
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 md:gap-6 lg:grid-cols-4 lg:gap-8">
          {cards.map((event) => (
            <Link
              key={event.slug}
              to={`/promotions/${event.slug}`}
              className="group relative block overflow-hidden rounded-[1.05rem] border border-[#d8c5a1]/45 bg-white/95 shadow-[0_8px_26px_rgba(28,24,18,0.06)] ring-1 ring-[#f3ead7]/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#c6a36b]/65 hover:shadow-[0_14px_34px_rgba(28,24,18,0.12)] hover:ring-[#e8d8b8]"
              aria-label={`${event.title} 상세 보기`}
            >
              <div className="pointer-events-none absolute inset-0 rounded-[1.05rem] bg-gradient-to-br from-white/25 via-transparent to-gold-accent/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative aspect-[5/4] overflow-hidden bg-muted/40">
                <ImageWithFallback
                  src={event.thumbnail}
                  alt={event.title}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="bg-gradient-to-b from-white to-[#fdfaf4] p-3.5 md:p-5 lg:p-6">
                <p className="mb-1 text-[11px] font-medium uppercase tracking-[0.18em] text-[#b08a4c] md:mb-2">{event.period}</p>
                <p className="line-clamp-2 text-[15px] font-semibold leading-snug tracking-[0.005em] text-[#27211b] lg:text-base [word-break:keep-all]">
                  {event.title}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

