import React from "react";
import { Link, useLocation } from "react-router";

const NAVER_RESERVATION_URL =
  "https://map.naver.com/p/entry/place/1084784069?placePath=/home?from=map&fromPanelNum=1&additionalHeight=76&timestamp=202604071448&locale=ko&svcName=map_pcv5&c=16.52,0,0,0,dh";

const PHONE_TEL = "0547728575";

function Icon({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="grid place-items-center shrink-0 w-9 h-9 rounded-full border border-gold-accent/35 bg-background/80 backdrop-blur-sm"
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

  const isNoticeActive = location.pathname === "/notice";

  return (
    <div className="fixed right-4 bottom-4 sm:right-6 sm:bottom-6 z-50">
      <div className="flex flex-col gap-2">
        <Link
          to="/notice"
          className={`group inline-flex items-center gap-3 rounded-full px-4 py-3 shadow-lg border transition-colors ${
            isNoticeActive
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-background/90 text-charcoal border-border hover:border-gold-accent/40"
          }`}
          aria-label="이벤트(공지) 보기"
        >
          <Icon>
            <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 text-gold-accent" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 8h12M6 12h12M6 16h8" />
            </svg>
          </Icon>
          <span className="text-sm font-medium tracking-wide">이벤트</span>
        </Link>

        <a
          href={NAVER_RESERVATION_URL}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-3 rounded-full px-4 py-3 shadow-lg border border-border bg-background/90 text-charcoal hover:border-gold-accent/40 transition-colors"
          aria-label="네이버로 예약하기(새 탭)"
        >
          <Icon>
            <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 text-gold-accent" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 4h10a2 2 0 0 1 2 2v14l-7-3-7 3V6a2 2 0 0 1 2-2z"
              />
            </svg>
          </Icon>
          <span className="text-sm font-medium tracking-wide">예약</span>
        </a>

        <a
          href={`tel:${PHONE_TEL}`}
          className="group inline-flex items-center gap-3 rounded-full px-4 py-3 shadow-lg border border-border bg-background/90 text-charcoal hover:border-gold-accent/40 transition-colors"
          aria-label="전화 상담하기"
        >
          <Icon>
            <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 text-gold-accent" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25z"
              />
            </svg>
          </Icon>
          <span className="text-sm font-medium tracking-wide">상담</span>
        </a>

        <button
          type="button"
          onClick={handleTop}
          className="group inline-flex items-center gap-3 rounded-full px-4 py-3 shadow-lg border border-border bg-background/90 text-charcoal hover:border-gold-accent/40 transition-colors"
          aria-label="맨 위로"
        >
          <Icon>
            <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 text-gold-accent" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 5l-6 6m6-6l6 6M12 5v14" />
            </svg>
          </Icon>
          <span className="text-sm font-medium tracking-wide">TOP</span>
        </button>
      </div>
    </div>
  );
}

