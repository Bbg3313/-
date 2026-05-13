import { Fragment, type ReactNode } from "react";
import { Link } from "react-router";
import { Instagram } from "lucide-react";
import { SiteLogo } from "./branding/SiteLogo";
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
    <li className="flex flex-wrap items-center justify-center gap-x-1.5 text-xs leading-snug text-muted-foreground sm:gap-x-3 sm:text-sm sm:leading-relaxed">
      <span className="shrink-0 font-medium text-charcoal/75">{label}</span>
      <span className="select-none font-light text-muted-foreground/45" aria-hidden>
        |
      </span>
      <span className="min-w-0 text-center [word-break:keep-all]">{children}</span>
    </li>
  );
}

const socialInactive =
  "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border/70 bg-background text-charcoal shadow-sm sm:h-11 sm:w-11";

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
        "flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-200 sm:h-11 sm:w-11",
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
        <div className="mx-auto flex max-w-xl flex-col items-center px-4 pb-3 pt-1.5 sm:px-6 sm:pb-6 sm:pt-2 md:pb-12 md:pt-3">
          <div className="flex w-full flex-col items-center">
            <Link
              to="/"
              onClick={onHomeLogoClick}
              className="group inline-flex max-w-full scale-[0.88] flex-col items-center rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-muted/50 sm:scale-100"
              aria-label="연세미의원 홈 — 맨 위로 이동"
            >
              <SiteLogo layout="vertical" className="opacity-95 transition-opacity group-hover:opacity-100" />
            </Link>
          </div>

          <div className="my-2.5 h-px w-10 shrink-0 bg-gold-accent/35 sm:my-4 md:my-7" aria-hidden />

          <div className="mx-auto flex w-full max-w-md flex-col items-stretch gap-3 sm:gap-6">
            <ul className="space-y-1 text-center sm:space-y-2.5">
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

            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              <SocialButton href={SOCIAL_LINKS.instagram} label="인스타그램" variant="instagram">
                <Instagram className="h-[18px] w-[18px] sm:h-[22px] sm:w-[22px]" strokeWidth={2} />
              </SocialButton>
              <SocialButton href={SOCIAL_LINKS.naverBlog} label="네이버 블로그" variant="naver">
                <NaverBlogIcon className="h-[22px] w-[22px] text-white sm:h-[26px] sm:w-[26px]" />
              </SocialButton>
            </div>

            <div className="border border-border/60 bg-background/60 px-3 py-2 backdrop-blur-sm sm:px-5 sm:py-4">
              <p className="mb-1 text-center text-[10px] font-medium tracking-widest text-charcoal/80 sm:mb-2 sm:text-xs">
                주의사항
              </p>
              <p className="text-center text-[10px] leading-relaxed text-muted-foreground [word-break:keep-all] sm:text-sm sm:leading-relaxed">
                해당 수술 및 시술의 결과는 개인마다 차이가 있을 수 있습니다. 개인에 따라 피부 트러블, 붓기, 출혈, 염증, 멍,
                신경손상 등 부작용이 발생할 수 있으므로 주의를 요합니다.
              </p>
            </div>
          </div>

          <nav
            className="mt-4 flex w-full flex-wrap items-center justify-center gap-x-0.5 gap-y-1 text-xs sm:mt-7 sm:gap-x-1 sm:gap-y-2 sm:text-sm"
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
        <div className="mx-auto max-w-xl px-4 py-2 sm:px-6 sm:py-3.5">
          <p className="text-center text-[10px] tracking-wide text-muted-foreground sm:text-xs">
            © {new Date().getFullYear()} 연세미의원. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
