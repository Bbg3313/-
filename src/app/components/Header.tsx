import logo from "../../imports/logo.svg";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { MenuIcon } from "lucide-react";
import { SITE_LOGO_IMG_CLASS } from "../config/logo";
import { useHomeLogoClick } from "../hooks/useHomeLogoClick";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { SITE_LINKS } from "../config/siteLinks";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";

const MOBILE_SHEET_QUICK = {
  kakaoLabel: "\uCE74\uD1A1\uC0C1\uB2F4",
  naverTalkLabel: "\uB124\uC774\uBC84\uD1A1\uD1A1\uC0C1\uB2F4",
  reserveLabel: "\uBC14\uB85C\uC608\uC57D",
  nTalkBadge: "N\uD1A1",
  kakaoAria: "\uCE74\uCE74\uC624\uD1A1 \uCC44\uB110 \uC0C1\uB2F4",
  naverTalkAria: "\uB124\uC774\uBC84 \uD1A1\uD1A1 \uC0C1\uB2F4",
  reserveAria: "\uB124\uC774\uBC84 \uC608\uC57D \uBC14\uB85C\uAC00\uAE30",
  calendarEmoji: "\uD83D\uDCC5",
} as const;

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const onHomeLogoClick = useHomeLogoClick();
  const isHome = location.pathname === "/";
  const solid = !isHome || isScrolled || mobileOpen;
  const isExternalReservation = /^https?:\/\//.test(SITE_LINKS.reservation);
  const isEventsActive = location.pathname === "/events";
  const isAboutActive = isHome && location.hash === "#about";
  const isDoctorsActive = isHome && location.hash === "#doctors";
  const isPricingActive = location.pathname === "/pricing";
  const isReservationActive = !isExternalReservation && location.pathname === SITE_LINKS.reservation;

  useEffect(() => {
    if (!isHome) return;
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  const navClass = solid
    ? "text-charcoal hover:text-gold-accent"
    : "text-white/90 hover:text-white";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          solid ? "bg-background/98 backdrop-blur-md border-b border-border/50 shadow-sm" : "bg-transparent"
        }`}
      >
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 sm:px-6 sm:py-4 md:py-5">
        <Link to="/" onClick={onHomeLogoClick} className="flex items-center shrink-0 group">
          <img
            src={logo}
            alt="연세미의원"
            className={`${SITE_LOGO_IMG_CLASS} h-14 sm:h-[5.5rem] md:h-24 transition-all duration-300 ${
              solid ? "opacity-100" : "opacity-95"
            }`}
          />
        </Link>

        <ul className="hidden md:flex items-center gap-10">
          <li>
            <Link to="/events" className={`text-sm tracking-wider uppercase transition-colors duration-300 ${navClass}`}>
              이벤트
            </Link>
          </li>
          <li>
            <Link to="/#about" className={`text-sm tracking-wider uppercase transition-colors duration-300 ${navClass}`}>
              병원소개
            </Link>
          </li>
          <li>
            <Link to="/#doctors" className={`text-sm tracking-wider uppercase transition-colors duration-300 ${navClass}`}>
              의료진
            </Link>
          </li>
          <li>
            {isExternalReservation ? (
              <a
                href={SITE_LINKS.reservation}
                target="_blank"
                rel="noreferrer"
                className={`text-sm tracking-wider uppercase transition-colors duration-300 ${navClass}`}
              >
                예약·문의
              </a>
            ) : (
              <Link
                to={SITE_LINKS.reservation}
                className={`text-sm tracking-wider uppercase transition-colors duration-300 ${navClass}`}
              >
                예약·문의
              </Link>
            )}
          </li>
          <li>
            <Link to="/pricing" className={`text-sm tracking-wider uppercase transition-colors duration-300 ${navClass}`}>
              시술/가격
            </Link>
          </li>
        </ul>

        <div className="hidden md:flex items-center gap-2">
          <Link
            to="/admin/login"
            className={`inline-flex items-center justify-center px-3 py-2 border text-xs tracking-wide transition-colors ${
              solid
                ? "border-border text-charcoal hover:border-gold-accent/40"
                : "border-white/35 text-white/90 hover:bg-white/10"
            }`}
          >
            관리자 로그인
          </Link>
          <LanguageSwitcher />
        </div>

        <div className="flex items-center gap-1.5 md:hidden">
          <LanguageSwitcher />
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="메뉴 열기"
                className={`inline-flex h-10 w-10 items-center justify-center rounded-md border transition-colors ${
                  solid
                    ? "border-border text-charcoal hover:border-gold-accent/40"
                    : "border-white/35 text-white/90 hover:bg-white/10"
                }`}
              >
                <MenuIcon className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[84vw] max-w-[21rem] p-0">
              <div className="px-6 py-5 border-b border-border/60">
                <SheetTitle className="text-base tracking-tight text-charcoal">메뉴</SheetTitle>
              </div>
              <div className="grid grid-cols-3 gap-2 border-b border-border/50 px-4 py-4 sm:px-6">
                <a
                  href={SITE_LINKS.kakaoChannel}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="flex min-w-0 flex-col items-center justify-center gap-1.5 rounded-lg border border-border/60 bg-background px-1 py-3 text-center transition-colors hover:border-gold-accent/40 hover:bg-muted/30"
                  aria-label={MOBILE_SHEET_QUICK.kakaoAria}
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#FEE500]/85 text-[8px] font-bold tracking-tight text-[#191919]">
                    TALK
                  </span>
                  <span className="break-keep text-[10px] font-semibold leading-snug text-charcoal">
                    {MOBILE_SHEET_QUICK.kakaoLabel}
                  </span>
                </a>
                <a
                  href={SITE_LINKS.naverTalk}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="flex min-w-0 flex-col items-center justify-center gap-1.5 rounded-lg border border-border/60 bg-background px-1 py-3 text-center transition-colors hover:border-gold-accent/40 hover:bg-muted/30"
                  aria-label={MOBILE_SHEET_QUICK.naverTalkAria}
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-[#03C75A]/25 bg-[#03C75A]/10 text-[10px] font-bold tracking-tight text-[#03C75A]">
                    {MOBILE_SHEET_QUICK.nTalkBadge}
                  </span>
                  <span className="break-keep text-[9px] font-semibold leading-snug text-charcoal sm:text-[10px]">
                    {MOBILE_SHEET_QUICK.naverTalkLabel}
                  </span>
                </a>
                <a
                  href={SITE_LINKS.naverReservation}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="flex min-w-0 flex-col items-center justify-center gap-1.5 rounded-lg border border-border/60 bg-background px-1 py-3 text-center transition-colors hover:border-gold-accent/40 hover:bg-muted/30"
                  aria-label={MOBILE_SHEET_QUICK.reserveAria}
                >
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-emerald-50 text-base leading-none"
                    aria-hidden
                  >
                    {MOBILE_SHEET_QUICK.calendarEmoji}
                  </span>
                  <span className="break-keep text-[10px] font-semibold leading-snug text-charcoal">
                    {MOBILE_SHEET_QUICK.reserveLabel}
                  </span>
                </a>
              </div>
              <div className="px-6 py-4 space-y-1">
                <SheetClose asChild>
                  <Link to="/events" className="block rounded-md px-3 py-3 text-sm text-charcoal hover:bg-muted/40">
                    이벤트
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link to="/#about" className="block rounded-md px-3 py-3 text-sm text-charcoal hover:bg-muted/40">
                    병원소개
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link to="/#doctors" className="block rounded-md px-3 py-3 text-sm text-charcoal hover:bg-muted/40">
                    의료진
                  </Link>
                </SheetClose>
                {isExternalReservation ? (
                  <a
                    href={SITE_LINKS.reservation}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-md px-3 py-3 text-sm text-charcoal hover:bg-muted/40"
                  >
                    예약·문의
                  </a>
                ) : (
                  <SheetClose asChild>
                    <Link
                      to={SITE_LINKS.reservation}
                      className="block rounded-md px-3 py-3 text-sm text-charcoal hover:bg-muted/40"
                    >
                      예약·문의
                    </Link>
                  </SheetClose>
                )}
                <SheetClose asChild>
                  <Link to="/pricing" className="block rounded-md px-3 py-3 text-sm text-charcoal hover:bg-muted/40">
                    시술/가격
                  </Link>
                </SheetClose>
              </div>
              <div className="mt-auto px-6 pb-6 pt-3">
                <SheetClose asChild>
                  <Link
                    to="/admin/login"
                    className="inline-flex w-full items-center justify-center rounded-md border border-border px-3 py-2.5 text-xs tracking-wide text-charcoal hover:border-gold-accent/40"
                  >
                    관리자 로그인
                  </Link>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border/70 bg-background/95 backdrop-blur-md md:hidden">
        <ul className="mx-auto grid max-w-7xl grid-cols-5">
          <li>
            <Link
              to="/events"
              className={`flex flex-col items-center justify-center px-1 py-2 text-[10px] font-medium leading-tight transition-colors ${
                isEventsActive ? "text-gold-accent" : "text-muted-foreground"
              }`}
            >
              이벤트
            </Link>
          </li>
          <li>
            <Link
              to="/#about"
              className={`flex flex-col items-center justify-center px-1 py-2 text-[10px] font-medium leading-tight transition-colors ${
                isAboutActive ? "text-gold-accent" : "text-muted-foreground"
              }`}
            >
              병원소개
            </Link>
          </li>
          <li>
            <Link
              to="/#doctors"
              className={`flex flex-col items-center justify-center px-1 py-2 text-[10px] font-medium leading-tight transition-colors ${
                isDoctorsActive ? "text-gold-accent" : "text-muted-foreground"
              }`}
            >
              의료진
            </Link>
          </li>
          <li>
            {isExternalReservation ? (
              <a
                href={SITE_LINKS.reservation}
                target="_blank"
                rel="noreferrer"
                className="flex flex-col items-center justify-center px-1 py-2 text-[10px] font-medium leading-tight text-muted-foreground transition-colors hover:text-gold-accent"
              >
                예약문의
              </a>
            ) : (
              <Link
                to={SITE_LINKS.reservation}
                className={`flex flex-col items-center justify-center px-1 py-2 text-[10px] font-medium leading-tight transition-colors ${
                  isReservationActive ? "text-gold-accent" : "text-muted-foreground"
                }`}
              >
                예약문의
              </Link>
            )}
          </li>
          <li>
            <Link
              to="/pricing"
              className={`flex flex-col items-center justify-center px-1 py-2 text-[10px] font-medium leading-tight transition-colors ${
                isPricingActive ? "text-gold-accent" : "text-muted-foreground"
              }`}
            >
              시술/가격
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
