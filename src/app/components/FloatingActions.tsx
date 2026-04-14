import React from "react";
import { Link, useLocation } from "react-router";
import { SITE_LINKS } from "../config/siteLinks";

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

  const isEventsBoardActive =
    location.pathname === "/events" || location.pathname.startsWith("/promotions");
  const isNoticeActive = location.pathname === "/notice";
  const isExternalEventBoard = /^https?:\/\//.test(SITE_LINKS.eventBoard);
  const isExternalReservation = /^https?:\/\//.test(SITE_LINKS.reservation);
  const isReservationActive =
    !isExternalReservation && location.pathname === SITE_LINKS.reservation;

  return (
    <div className="fixed right-4 bottom-4 sm:right-6 sm:bottom-6 z-50">
      <div className="flex flex-col gap-3 sm:gap-3.5">
        {isExternalEventBoard ? (
          <a
            href={SITE_LINKS.eventBoard}
            target="_blank"
            rel="noreferrer"
            className={`group inline-flex items-center gap-3.5 rounded-full px-5 py-3.5 shadow-lg border transition-colors ${
              isEventsBoardActive
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
              isEventsBoardActive
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

        {isExternalReservation ? (
          <a
            href={SITE_LINKS.reservation}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-3.5 rounded-full px-5 py-3.5 shadow-lg border border-border bg-background/90 text-charcoal hover:border-gold-accent/40 transition-colors"
            aria-label="예약 페이지로 이동(새 탭)"
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
        ) : (
          <Link
            to={SITE_LINKS.reservation}
            className={`group inline-flex items-center gap-3.5 rounded-full px-5 py-3.5 shadow-lg border transition-colors ${
              isReservationActive
                ? "bg-primary text-primary-foreground border-primary"
                : "border-border bg-background/90 text-charcoal hover:border-gold-accent/40"
            }`}
            aria-label="예약·문의 페이지로 이동"
          >
            <Icon>
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-gold-accent" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 4v3M16 4v3M4.5 9h15" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.5 6.5h11A2.5 2.5 0 0 1 20 9v10A2.5 2.5 0 0 1 17.5 21h-11A2.5 2.5 0 0 1 4 19V9a2.5 2.5 0 0 1 2.5-2.5z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.6 14.2l2 2 4.8-5.2" />
              </svg>
            </Icon>
            <span className="text-[15px] font-semibold tracking-wide">예약</span>
          </Link>
        )}

        <Link
          to={SITE_LINKS.noticeBoard}
          className={`group inline-flex items-center gap-3.5 rounded-full px-5 py-3.5 shadow-lg border transition-colors ${
            isNoticeActive
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border bg-background/90 text-charcoal hover:border-gold-accent/40"
          }`}
          aria-label="공지사항으로 이동"
        >
          <Icon>
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-gold-accent" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h6m-8 8l3.2-2.1c.4-.3.9-.4 1.4-.4h7.9A2.5 2.5 0 0 0 20 15V7A2.5 2.5 0 0 0 17.5 4h-11A2.5 2.5 0 0 0 4 6.5V15a2.5 2.5 0 0 0 2.5 2.5H7V20z" />
            </svg>
          </Icon>
          <span className="text-[15px] font-semibold tracking-wide">공지</span>
        </Link>

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

