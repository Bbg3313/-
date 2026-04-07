import React from "react";
import { Link, useLocation } from "react-router";
import { SITE_LINKS } from "../config/siteLinks";

const PHONE_TEL = "0547728575";

function Icon({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="grid place-items-center shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-gold-accent/35 bg-background/80 backdrop-blur-sm"
      aria-hidden
    >
      {children}
    </span>
  );
}

export function FloatingActions() {
  const location = useLocation();

  const handleTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isEventsActive = location.pathname.startsWith("/events") || location.pathname === "/notice";
  const isExternalEventBoard = /^https?:\/\//.test(SITE_LINKS.eventBoard);

  return (
    <div className="fixed right-4 bottom-4 sm:right-6 sm:bottom-6 z-50">
      <div className="flex flex-col gap-3 sm:gap-3.5">
        {isExternalEventBoard ? (
          <a
            href={SITE_LINKS.eventBoard}
            target="_blank"
            rel="noreferrer"
            className={`group inline-flex items-center gap-3.5 rounded-full px-5 py-3.5 shadow-lg border transition-colors ${
              isEventsActive
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-background/90 text-charcoal border-border hover:border-gold-accent/40"
            }`}
            aria-label="이벤트 보드로 이동(새 탭)"
          >
            <Icon>
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-gold-accent" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8h18v4H3V8z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12v8h14v-8" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v12" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c0-2.2-2.2-4-4.4-3.2C5.7 5.5 6.8 8 9 8m3 0c0-2.2 2.2-4 4.4-3.2 1.9.7.8 3.2-1.4 3.2" />
              </svg>
            </Icon>
            <span className="text-[15px] font-semibold tracking-wide">이벤트</span>
          </a>
        ) : (
          <Link
            to={SITE_LINKS.eventBoard}
            className={`group inline-flex items-center gap-3.5 rounded-full px-5 py-3.5 shadow-lg border transition-colors ${
              isEventsActive
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-background/90 text-charcoal border-border hover:border-gold-accent/40"
            }`}
            aria-label="이벤트 게시판으로 이동"
          >
            <Icon>
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-gold-accent" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8h18v4H3V8z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12v8h14v-8" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v12" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c0-2.2-2.2-4-4.4-3.2C5.7 5.5 6.8 8 9 8m3 0c0-2.2 2.2-4 4.4-3.2 1.9.7.8 3.2-1.4 3.2" />
              </svg>
            </Icon>
            <span className="text-[15px] font-semibold tracking-wide">이벤트</span>
          </Link>
        )}

        <a
          href={SITE_LINKS.reservation}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-3.5 rounded-full px-5 py-3.5 shadow-lg border border-border bg-background/90 text-charcoal hover:border-gold-accent/40 transition-colors"
          aria-label="네이버로 예약하기(새 탭)"
        >
          <Icon>
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-gold-accent" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 4v3M16 4v3M4.5 9h15" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.5 6.5h11A2.5 2.5 0 0 1 20 9v10A2.5 2.5 0 0 1 17.5 21h-11A2.5 2.5 0 0 1 4 19V9a2.5 2.5 0 0 1 2.5-2.5z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.6 14.2l2 2 4.8-5.2" />
            </svg>
          </Icon>
          <span className="text-[15px] font-semibold tracking-wide">예약</span>
        </a>

        <a
          href={`tel:${PHONE_TEL}`}
          className="group inline-flex items-center gap-3.5 rounded-full px-5 py-3.5 shadow-lg border border-border bg-background/90 text-charcoal hover:border-gold-accent/40 transition-colors"
          aria-label="전화 상담하기"
        >
          <Icon>
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-gold-accent" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25z"
              />
            </svg>
          </Icon>
          <span className="text-[15px] font-semibold tracking-wide">상담</span>
        </a>

        <button
          type="button"
          onClick={handleTop}
          className="group inline-flex items-center gap-3.5 rounded-full px-5 py-3.5 shadow-lg border border-border bg-background/90 text-charcoal hover:border-gold-accent/40 transition-colors"
          aria-label="맨 위로"
        >
          <Icon>
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-gold-accent" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 5l-6 6m6-6l6 6M12 5v14" />
            </svg>
          </Icon>
          <span className="text-[15px] font-semibold tracking-wide">TOP</span>
        </button>
      </div>
    </div>
  );
}

