import React from "react";
import { Link } from "react-router";
import { ImageWithFallback } from "./figma/ImageWithFallback";

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
  return (
    <section id="events" className="py-32 px-6 bg-champagne relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-gradient-radial from-gold-accent/5 to-transparent blur-3xl -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-gradient-radial from-gold-accent/5 to-transparent blur-3xl -translate-y-1/2" />

      <div className="max-w-[90rem] mx-auto relative">
        <div className="text-center mb-16 lg:mb-20">
          <div className="w-12 h-px bg-gold-accent mx-auto mb-8" />
          <h2
            className="mb-6 text-charcoal tracking-tight"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "3.5rem",
              lineHeight: "1.1",
              fontWeight: "500",
            }}
          >
            Events
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            진행 중인 이벤트를 확인하세요. 썸네일을 누르면 상세 페이지로 이동합니다.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {EVENTS.map((event) => (
            <Link
              key={event.slug}
              to={`/events/${event.slug}`}
              className="group block bg-white/60 backdrop-blur-sm overflow-hidden border border-gold-accent/10 hover:border-gold-accent/30 transition-colors"
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
    </section>
  );
}

