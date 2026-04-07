import { Fragment } from "react";
import { Link } from "react-router";
import logo from "../../imports/logo.svg";
import { cn } from "./ui/utils";

const footerLinks = [
  { to: "/notice", label: "공지사항" },
  { to: "/privacy", label: "개인정보처리방침" },
  { to: "/terms", label: "서비스이용약관" },
] as const;

type FooterProps = {
  className?: string;
};

export function Footer({ className }: FooterProps) {
  return (
    <footer className={cn("mt-auto", className)}>
      {/* 상단: 본문과 구분 — 살짝 다른 톤의 배경으로 한 덩어리 */}
      <div className="border-t border-border bg-muted/50">
        <div className="max-w-xl mx-auto px-6 py-12 md:py-14 flex flex-col items-center text-center">
          <Link
            to="/"
            className="inline-block group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-accent/40 rounded-sm"
            aria-label="연세미의원 홈"
          >
            <img
              src={logo}
              alt="연세미의원"
              className="h-[4.75rem] sm:h-[5.5rem] md:h-24 w-auto opacity-95 group-hover:opacity-100 transition-opacity"
            />
          </Link>

          <div className="w-12 h-px bg-gold-accent/35 my-7 md:my-8" aria-hidden />

          <ul className="text-sm text-muted-foreground space-y-2.5 leading-relaxed w-full max-w-sm">
            <li>
              <span className="text-charcoal/70 font-medium">대표자</span> 심형경
            </li>
            <li>
              <span className="text-charcoal/70 font-medium">사업자등록번호</span> 587-10-03051
            </li>
            <li>
              <span className="text-charcoal/70 font-medium">주소</span> 경북 경주시 화랑로 132, 2층 연세미의원
            </li>
            <li>
              <span className="text-charcoal/70 font-medium">전화</span>{" "}
              <a
                href="tel:0547728575"
                className="text-gold-accent font-medium hover:underline underline-offset-2 transition-colors"
              >
                054-772-8575
              </a>
            </li>
          </ul>

          <nav
            className="mt-10 flex flex-wrap justify-center items-center gap-x-1 gap-y-2 text-sm"
            aria-label="법적 고지"
          >
            {footerLinks.map((item, i) => (
              <Fragment key={item.to}>
                {i > 0 && (
                  <span className="text-muted-foreground/35 px-2 select-none" aria-hidden>
                    |
                  </span>
                )}
                <Link
                  to={item.to}
                  className="text-charcoal/85 hover:text-gold-accent transition-colors px-1 py-0.5 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-accent/40"
                >
                  {item.label}
                </Link>
              </Fragment>
            ))}
          </nav>
        </div>
      </div>

      {/* 하단: 색 띠로 명확히 구분 */}
      <div className="border-t border-primary/15 bg-secondary">
        <div className="max-w-xl mx-auto px-6 py-3.5">
          <p className="text-center text-muted-foreground text-[11px] sm:text-xs tracking-wide">
            © {new Date().getFullYear()} 연세미의원. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
