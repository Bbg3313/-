import { Fragment, type ReactNode } from "react";
import { Link } from "react-router";
import { Instagram } from "lucide-react";
import logo from "../../imports/logo.svg";
import { SITE_LOGO_IMG_CLASS } from "../config/logo";
import { SITE_LINKS } from "../config/siteLinks";
import { SOCIAL_LINKS } from "../config/socialLinks";
import { useHomeLogoClick } from "../hooks/useHomeLogoClick";
import { NaverBlogIcon } from "./icons/NaverBlogIcon";
import { cn } from "./ui/utils";

const footerLinks = [
  { to: SITE_LINKS.eventBoard, label: "이벤트" },
  { to: SITE_LINKS.noticeBoard, label: "공지사항" },
  { to: "/privacy", label: "개인정보처리방침" },
  { to: "/terms", label: "서비스이용약관" },
] as const;

function InfoLine({ label, children }: { label: string; children: ReactNode }) {
  return (
    <li className="flex flex-wrap items-center justify-center gap-x-2 sm:gap-x-3 text-sm text-muted-foreground leading-relaxed">
      <span className="text-charcoal/75 font-medium shrink-0">{label}</span>
      <span className="text-muted-foreground/45 select-none font-light" aria-hidden>
        |
      </span>
      <span className="min-w-0 text-left sm:text-center [word-break:keep-all]">{children}</span>
    </li>
  );
}

const socialInactive =
  "flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border/70 bg-background text-charcoal shadow-sm";

function SocialButton({
  href,
  label,
  variant,
  children,
}: {
  href: string;
  label: string;
  variant: "instagram" | "naver";
  children: ReactNode;
}) {
  if (!href) {
    return (
      <span
        className={cn(socialInactive, "cursor-not-allowed opacity-45")}
        title={`${label} 주소는 src/app/config/socialLinks.ts (또는 .env)에서 설정하세요`}
        role="img"
        aria-label={`${label} (링크 미설정)`}
      >
        {children}
      </span>
    );
  }

  const brand =
    variant === "instagram"
      ? "border-0 bg-gradient-to-br from-[#f58529] via-[#dd2a7b] to-[#8134af] text-white shadow-md hover:brightness-105 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-muted/50"
      : "border-0 bg-[#03C75A] text-white shadow-md hover:bg-[#02b351] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#03C75A]/80 focus-visible:ring-offset-2 focus-visible:ring-offset-muted/50";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-all duration-200",
        brand,
      )}
      aria-label={`${label} 새 창`}
    >
      {children}
    </a>
  );
}

type FooterProps = {
  className?: string;
};

export function Footer({ className }: FooterProps) {
  const onHomeLogoClick = useHomeLogoClick();

  return (
    <footer className={cn("mt-auto", className)}>
      <div className="border-t border-border bg-muted/50">
        <div className="mx-auto flex max-w-xl flex-col items-center px-6 py-6 md:py-12">
          {/* 로고: 정확히 가로 중앙 정렬 */}
          <div className="w-full flex justify-center">
            <Link
              to="/"
              onClick={onHomeLogoClick}
              className="group inline-flex mx-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-accent/40 rounded-sm max-w-full"
              aria-label="연세미의원 홈 — 맨 위로 이동"
            >
              <img
                src={logo}
                alt="연세미의원"
                className={`${SITE_LOGO_IMG_CLASS} mx-auto translate-x-1 opacity-95 group-hover:opacity-100 transition-opacity`}
              />
            </Link>
          </div>

          <div className="my-4 h-px w-12 shrink-0 bg-gold-accent/35 md:my-7" aria-hidden />

          <ul className="text-center space-y-2.5 w-full max-w-md mx-auto">
            <InfoLine label="대표자">심형경</InfoLine>
            <InfoLine label="사업자등록번호">587-10-03051</InfoLine>
            <InfoLine label="주소">경북 경주시 화랑로 132, 2층 연세미의원</InfoLine>
            <InfoLine label="전화">
              <a
                href="tel:0547728575"
                className="text-gold-accent font-medium hover:underline underline-offset-2 transition-colors"
              >
                054-772-8575
              </a>
            </InfoLine>
          </ul>

          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <SocialButton href={SOCIAL_LINKS.instagram} label="인스타그램" variant="instagram">
              <Instagram className="h-[22px] w-[22px]" strokeWidth={2} />
            </SocialButton>
            <SocialButton href={SOCIAL_LINKS.naverBlog} label="네이버 블로그" variant="naver">
              <NaverBlogIcon className="h-[26px] w-[26px] text-white" />
            </SocialButton>
          </div>

          <div className="mt-7 w-full max-w-3xl mx-auto border border-border/60 bg-background/60 backdrop-blur-sm px-5 py-4">
            <p className="text-center text-xs tracking-widest text-charcoal/80 font-medium mb-2">주의사항</p>
            <p className="text-center text-xs sm:text-sm text-muted-foreground leading-relaxed [word-break:keep-all]">
              해당 수술 및 시술의 결과는 개인마다 차이가 있을 수 있습니다. 개인에 따라 피부 트러블, 붓기, 출혈, 염증, 멍,
              신경손상 등 부작용이 발생할 수 있으므로 주의를 요합니다.
            </p>
          </div>

          <nav
            className="mt-7 flex flex-wrap justify-center items-center gap-x-1 gap-y-2 text-sm w-full"
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
