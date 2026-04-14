import React from "react";
import { Link, useLocation } from "react-router";
import { SITE_LINKS } from "../config/siteLinks";

function Icon({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-gold-accent/35 bg-background/80 backdrop-blur-sm md:h-11 md:w-11"
      aria-hidden
    >
      {children}
    </span>
  );
}

const fabRowClass =
  "group inline-flex items-center gap-2.5 rounded-full border px-3.5 py-2 shadow-lg transition-colors md:gap-3.5 md:px-5 md:py-3.5";

const fabLabelClass = "text-xs font-semibold tracking-wide md:text-[15px]";

const fabSvgClass = "h-4 w-4 text-gold-accent md:h-5 md:w-5";

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
    <div className="hidden fixed bottom-16 right-3 z-50 md:bottom-6 md:right-6 md:block">
      <div className="flex flex-col gap-2 md:gap-3.5">
        {isExternalEventBoard ? (
          <a
            href={SITE_LINKS.eventBoard}
            target="_blank"
            rel="noreferrer"
            className={`${fabRowClass} ${
              isEventsBoardActive
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-background/90 text-charcoal hover:border-gold-accent/40"
            }`}
            aria-label="이벤트 보드로 이동(새 탭)"
          >
            <Icon>
              <svg viewBox="0 0 24 24" className={fabSvgClass} fill="none" stroke="currentColor" strokeWidth="1.6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8h18v4H3V8z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12v8h14v-8" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v12" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c0-2.2-2.2-4-4.4-3.2C5.7 5.5 6.8 8 9 8m3 0c0-2.2 2.2-4 4.4-3.2 1.9.7.8 3.2-1.4 3.2" />
              </svg>
            </Icon>
            <span className={fabLabelClass}>이벤트</span>
          </a>
        ) : (
          <Link
            to={SITE_LINKS.eventBoard}
            className={`${fabRowClass} ${
              isEventsBoardActive
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-background/90 text-charcoal hover:border-gold-accent/40"
            }`}
            aria-label="이벤트 게시판으로 이동"
          >
            <Icon>
              <svg viewBox="0 0 24 24" className={fabSvgClass} fill="none" stroke="currentColor" strokeWidth="1.6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8h18v4H3V8z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12v8h14v-8" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v12" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c0-2.2-2.2-4-4.4-3.2C5.7 5.5 6.8 8 9 8m3 0c0-2.2 2.2-4 4.4-3.2 1.9.7.8 3.2-1.4 3.2" />
              </svg>
            </Icon>
            <span className={fabLabelClass}>이벤트</span>
          </Link>
        )}

        {isExternalReservation ? (
          <a
            href={SITE_LINKS.reservation}
            target="_blank"
            rel="noreferrer"
            className={`${fabRowClass} border-border bg-background/90 text-charcoal hover:border-gold-accent/40`}
            aria-label="예약 페이지로 이동(새 탭)"
          >
            <Icon>
              <svg viewBox="0 0 24 24" className={fabSvgClass} fill="none" stroke="currentColor" strokeWidth="1.6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 4v3M16 4v3M4.5 9h15" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.5 6.5h11A2.5 2.5 0 0 1 20 9v10A2.5 2.5 0 0 1 17.5 21h-11A2.5 2.5 0 0 1 4 19V9a2.5 2.5 0 0 1 2.5-2.5z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.6 14.2l2 2 4.8-5.2" />
              </svg>
            </Icon>
            <span className={fabLabelClass}>예약</span>
          </a>
        ) : (
          <Link
            to={SITE_LINKS.reservation}
            className={`${fabRowClass} ${
              isReservationActive
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-background/90 text-charcoal hover:border-gold-accent/40"
            }`}
            aria-label="예약·문의 페이지로 이동"
          >
            <Icon>
              <svg viewBox="0 0 24 24" className={fabSvgClass} fill="none" stroke="currentColor" strokeWidth="1.6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 4v3M16 4v3M4.5 9h15" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.5 6.5h11A2.5 2.5 0 0 1 20 9v10A2.5 2.5 0 0 1 17.5 21h-11A2.5 2.5 0 0 1 4 19V9a2.5 2.5 0 0 1 2.5-2.5z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.6 14.2l2 2 4.8-5.2" />
              </svg>
            </Icon>
            <span className={fabLabelClass}>예약</span>
          </Link>
        )}

        <Link
          to={SITE_LINKS.noticeBoard}
          className={`${fabRowClass} ${
            isNoticeActive
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border bg-background/90 text-charcoal hover:border-gold-accent/40"
          }`}
          aria-label="공지사항으로 이동"
        >
          <Icon>
            <svg viewBox="0 0 24 24" className={fabSvgClass} fill="none" stroke="currentColor" strokeWidth="1.6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h6m-8 8l3.2-2.1c.4-.3.9-.4 1.4-.4h7.9A2.5 2.5 0 0 0 20 15V7A2.5 2.5 0 0 0 17.5 4h-11A2.5 2.5 0 0 0 4 6.5V15a2.5 2.5 0 0 0 2.5 2.5H7V20z" />
            </svg>
          </Icon>
          <span className={fabLabelClass}>공지</span>
        </Link>

        <button
          type="button"
          onClick={handleTop}
          className={`${fabRowClass} border-border bg-background/90 text-charcoal hover:border-gold-accent/40`}
          aria-label="맨 위로"
        >
          <Icon>
            <svg viewBox="0 0 24 24" className={fabSvgClass} fill="none" stroke="currentColor" strokeWidth="1.8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 5l-6 6m6-6l6 6M12 5v14" />
            </svg>
          </Icon>
          <span className={fabLabelClass}>TOP</span>
        </button>
      </div>
    </div>
  );
}

