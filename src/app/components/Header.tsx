import { useState, useEffect, useRef, useLayoutEffect, useCallback } from "react";
import { Link, useLocation } from "react-router";
import { Bell, CalendarDays, ChevronDown, Hospital, LayoutGrid, MenuIcon, Stethoscope, Ticket } from "lucide-react";
import { SiteLogo } from "./branding/SiteLogo";
import { useHomeLogoClick } from "../hooks/useHomeLogoClick";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { SITE_LINKS } from "../config/siteLinks";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";
import {
  PROCEDURE_CATEGORIES,
  listTreatmentsByCategory,
  procedureCategoryPath,
  procedureDetailPath,
} from "../../data/treatmentsCatalog";

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

/** Google 번역 시 라벨이 길어져도 겹치지 않도록 — nowrap 금지, 2줄까지·칸 축소 허용 */
const MOBILE_TABBAR_ITEM =
  "flex min-h-[2.85rem] w-full min-w-0 flex-col items-center justify-center gap-0.5 px-0.5 py-1.5 text-center transition-colors sm:min-h-[3.1rem] sm:gap-1 sm:py-2";
const MOBILE_TABBAR_LABEL =
  "line-clamp-2 w-full min-w-0 max-w-full text-balance break-keep text-[9px] font-semibold leading-[1.2] sm:text-[10px]";

const PROCEDURES_MENU_CLOSE_MS = 280;

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [proceduresMenuOpen, setProceduresMenuOpen] = useState(false);
  const [proceduresMegaTopPx, setProceduresMegaTopPx] = useState(0);
  const proceduresMenuCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);
  const location = useLocation();
  const onHomeLogoClick = useHomeLogoClick();
  const isHome = location.pathname === "/";
  const solid = !isHome || isScrolled || mobileOpen;
  const isEventsActive = location.pathname === "/events";
  const isNoticeActive = location.pathname === "/notice" || location.pathname.startsWith("/notice/");
  const isAboutActive = isHome && location.hash === "#about";
  const isDoctorsActive = isHome && location.hash === "#doctors";
  const isPricingActive = location.pathname === "/pricing";
  const isProceduresActive =
    location.pathname === "/procedures" || location.pathname.startsWith("/procedures/");

  useEffect(() => {
    if (!isHome) return;
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  useEffect(() => {
    setProceduresMenuOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(
    () => () => {
      if (proceduresMenuCloseTimer.current) clearTimeout(proceduresMenuCloseTimer.current);
    },
    [],
  );

  const syncProceduresMegaTop = useCallback(() => {
    const el = headerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setProceduresMegaTopPx(Math.max(0, rect.bottom - 10));
  }, []);

  useLayoutEffect(() => {
    if (!proceduresMenuOpen) return;
    syncProceduresMegaTop();
    const onWin = () => syncProceduresMegaTop();
    window.addEventListener("resize", onWin);
    window.addEventListener("scroll", onWin, true);
    return () => {
      window.removeEventListener("resize", onWin);
      window.removeEventListener("scroll", onWin, true);
    };
  }, [proceduresMenuOpen, syncProceduresMegaTop, mobileOpen, isScrolled, solid]);

  const clearProceduresMenuCloseTimer = () => {
    if (proceduresMenuCloseTimer.current) {
      clearTimeout(proceduresMenuCloseTimer.current);
      proceduresMenuCloseTimer.current = null;
    }
  };

  const openProceduresMenu = () => {
    clearProceduresMenuCloseTimer();
    syncProceduresMegaTop();
    setProceduresMenuOpen(true);
  };

  const scheduleCloseProceduresMenu = () => {
    clearProceduresMenuCloseTimer();
    proceduresMenuCloseTimer.current = setTimeout(() => {
      setProceduresMenuOpen(false);
      proceduresMenuCloseTimer.current = null;
    }, PROCEDURES_MENU_CLOSE_MS);
  };

  const navClass = solid
    ? "text-charcoal hover:text-gold-accent"
    : "text-white/90 hover:text-white";

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 overflow-visible transition-all duration-500 pt-[max(0.5rem,env(safe-area-inset-top,0px))] ${
          solid ? "bg-background/98 backdrop-blur-md border-b border-border/50 shadow-sm" : "bg-transparent"
        }`}
      >
      <nav className="relative mx-auto flex max-w-7xl items-center justify-between gap-2 overflow-visible px-3 py-2.5 sm:gap-4 sm:px-6 sm:py-4 md:py-5">
        <Link
          to="/"
          onClick={onHomeLogoClick}
          className="group flex min-w-0 max-w-[min(100%,58vw)] shrink items-center transition-opacity duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-accent/45 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm sm:max-w-none sm:shrink-0"
          aria-label="연세미의원 홈"
        >
          <SiteLogo inverted={!solid} layout="horizontal" className={solid ? "opacity-100" : "opacity-[0.97]"} />
        </Link>

        <ul className="hidden md:flex items-center gap-10">
          <li>
            <Link to="/events" className={`text-sm tracking-wider uppercase transition-colors duration-300 ${navClass}`}>
              이벤트
            </Link>
          </li>
          <li>
            <Link to="/notice" className={`text-sm tracking-wider uppercase transition-colors duration-300 ${navClass}`}>
              공지사항
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
          <li
            className="relative"
            onMouseEnter={openProceduresMenu}
            onMouseLeave={scheduleCloseProceduresMenu}
          >
            <Link
              to="/procedures"
              className={`inline-flex items-center gap-1 text-sm tracking-wider uppercase transition-colors duration-300 ${
                isProceduresActive ? "text-gold-accent" : navClass
              }`}
            >
              시술 안내
              <ChevronDown
                className={`h-3 w-3 opacity-70 transition-transform duration-200 ${proceduresMenuOpen ? "rotate-180" : ""}`}
                aria-hidden
              />
            </Link>
            <div
              className={`fixed inset-x-0 z-[60] pt-3 transition-[opacity,visibility] duration-150 ${
                proceduresMenuOpen
                  ? "visible opacity-100"
                  : "invisible pointer-events-none opacity-0"
              }`}
              style={{ top: `${proceduresMegaTopPx || 72}px` }}
              role="navigation"
              aria-label="시술 카테고리"
              aria-hidden={!proceduresMenuOpen}
            >
              <div className="max-h-[min(70vh,28rem)] overflow-x-auto overflow-y-auto border-b border-border/60 bg-background/[0.99] px-4 py-4 shadow-2xl shadow-black/10 ring-1 ring-black/[0.04] backdrop-blur-md sm:px-6 sm:py-5 md:px-8 md:py-5">
                <div className="mx-auto flex w-full max-w-[1600px] flex-nowrap items-stretch gap-2 md:gap-3 lg:gap-4">
                  {PROCEDURE_CATEGORIES.map((cat) => {
                    const treatments = listTreatmentsByCategory(cat.slug);
                    return (
                      <div
                        key={cat.slug}
                        className="group flex min-h-0 min-w-0 flex-1 basis-0 flex-col rounded-xl border border-border/35 bg-muted/[0.12] p-3 transition-colors hover:border-gold-accent/30 hover:bg-muted/[0.18] sm:p-3.5 md:p-4"
                      >
                        <Link
                          to={procedureCategoryPath(cat.slug)}
                          className="text-[13px] font-semibold leading-snug tracking-tight text-charcoal transition-colors hover:text-gold-accent [word-break:keep-all] md:text-[14px] lg:text-[15px]"
                        >
                          {cat.label}
                        </Link>
                        {treatments.length > 0 ? (
                          <ul className="mt-2 min-h-0 flex-1 max-h-[min(11rem,32vh)] space-y-1 overflow-y-auto pr-0.5 md:max-h-[min(12rem,34vh)]">
                            {treatments.map((t) => (
                              <li key={t.slug}>
                                <Link
                                  to={procedureDetailPath(cat.slug, t.slug)}
                                  className="block text-[11px] leading-snug text-muted-foreground transition-colors [word-break:keep-all] hover:text-gold-accent md:text-[12px]"
                                >
                                  {t.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        ) : null}
                        <Link
                          to={procedureCategoryPath(cat.slug)}
                          className="mt-auto pt-2.5 text-[10px] font-semibold uppercase tracking-wider text-gold-accent/90 transition-colors hover:text-gold-accent"
                        >
                          둘러보기 →
                        </Link>
                      </div>
                    );
                  })}
                </div>
                <div className="mx-auto mt-5 flex max-w-[1600px] flex-wrap items-center justify-between gap-4 border-t border-border/50 pt-4 sm:mt-6 sm:pt-5">
                  <Link
                    to="/procedures"
                    className="text-sm font-semibold uppercase tracking-wider text-charcoal hover:text-gold-accent"
                  >
                    시술 안내 홈
                  </Link>
                  <Link
                    to="/pricing"
                    className="text-sm font-semibold uppercase tracking-wider text-muted-foreground hover:text-gold-accent"
                  >
                    시술·가격표
                  </Link>
                </div>
              </div>
            </div>
          </li>
          <li>
            <Link
              to="/pricing"
              className={`text-sm tracking-wider uppercase transition-colors duration-300 ${
                isPricingActive ? "text-gold-accent" : navClass
              }`}
            >
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

        <div className="flex shrink-0 items-center gap-1 sm:gap-2 md:hidden">
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
                  <Link to="/events" className="flex items-center gap-2 rounded-md px-3 py-3 text-sm text-charcoal hover:bg-muted/40">
                    <Ticket className="h-4 w-4 text-gold-accent/80" />
                    이벤트
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link to="/notice" className="flex items-center gap-2 rounded-md px-3 py-3 text-sm text-charcoal hover:bg-muted/40">
                    <Bell className="h-4 w-4 text-gold-accent/80" />
                    공지사항
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link to="/#about" className="flex items-center gap-2 rounded-md px-3 py-3 text-sm text-charcoal hover:bg-muted/40">
                    <Hospital className="h-4 w-4 text-gold-accent/80" />
                    병원소개
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link to="/#doctors" className="flex items-center gap-2 rounded-md px-3 py-3 text-sm text-charcoal hover:bg-muted/40">
                    <Stethoscope className="h-4 w-4 text-gold-accent/80" />
                    의료진
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    to="/procedures"
                    className="flex items-center gap-2 rounded-md px-3 py-3 text-sm font-semibold text-charcoal hover:bg-muted/40"
                  >
                    <LayoutGrid className="h-4 w-4 shrink-0 text-gold-accent/80" aria-hidden />
                    시술 안내
                  </Link>
                </SheetClose>
                <div className="space-y-1 px-1 pb-2">
                  <p className="px-3 pb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">시술 카테고리</p>
                  {PROCEDURE_CATEGORIES.map((cat) => (
                    <SheetClose asChild key={cat.slug}>
                      <Link
                        to={procedureCategoryPath(cat.slug)}
                        className="block rounded-lg border border-border/50 bg-muted/10 px-3 py-2.5 text-sm font-semibold text-charcoal transition-colors [word-break:keep-all] hover:border-gold-accent/25 hover:bg-muted/25 hover:text-gold-accent"
                      >
                        {cat.label}
                      </Link>
                    </SheetClose>
                  ))}
                </div>
                <SheetClose asChild>
                  <Link to="/pricing" className="flex items-center gap-2 rounded-md px-3 py-3 text-sm text-charcoal hover:bg-muted/40">
                    <CalendarDays className="h-4 w-4 text-gold-accent/80" />
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

      <nav
        data-mobile-tabbar
        className="fixed inset-x-0 bottom-0 z-40 border-t border-border/70 bg-background/95 pb-[max(0.35rem,env(safe-area-inset-bottom))] pt-1 backdrop-blur-md md:hidden"
      >
        <ul className="mx-auto grid w-full max-w-7xl grid-cols-6">
          <li className="min-w-0">
            <Link
              to="/events"
              className={`${MOBILE_TABBAR_ITEM} ${
                isEventsActive ? "text-gold-accent" : "text-muted-foreground"
              }`}
            >
              <Ticket className="h-3.5 w-3.5 shrink-0 text-gold-accent/80 sm:h-4 sm:w-4" aria-hidden />
              <span className={MOBILE_TABBAR_LABEL}>이벤트</span>
            </Link>
          </li>
          <li className="min-w-0">
            <Link
              to="/notice"
              className={`${MOBILE_TABBAR_ITEM} ${
                isNoticeActive ? "text-gold-accent" : "text-muted-foreground"
              }`}
            >
              <Bell className="h-3.5 w-3.5 shrink-0 text-gold-accent/80 sm:h-4 sm:w-4" aria-hidden />
              <span className={MOBILE_TABBAR_LABEL}>공지사항</span>
            </Link>
          </li>
          <li className="min-w-0">
            <Link
              to="/#about"
              className={`${MOBILE_TABBAR_ITEM} ${
                isAboutActive ? "text-gold-accent" : "text-muted-foreground"
              }`}
            >
              <Hospital className="h-3.5 w-3.5 shrink-0 text-gold-accent/80 sm:h-4 sm:w-4" aria-hidden />
              <span className={MOBILE_TABBAR_LABEL}>병원소개</span>
            </Link>
          </li>
          <li className="min-w-0">
            <Link
              to="/#doctors"
              className={`${MOBILE_TABBAR_ITEM} ${
                isDoctorsActive ? "text-gold-accent" : "text-muted-foreground"
              }`}
            >
              <Stethoscope className="h-3.5 w-3.5 shrink-0 text-gold-accent/80 sm:h-4 sm:w-4" aria-hidden />
              <span className={MOBILE_TABBAR_LABEL}>의료진</span>
            </Link>
          </li>
          <li className="min-w-0">
            <Link
              to="/procedures"
              title="시술 안내"
              className={`${MOBILE_TABBAR_ITEM} ${
                isProceduresActive ? "text-gold-accent" : "text-muted-foreground"
              }`}
            >
              <LayoutGrid className="h-3.5 w-3.5 shrink-0 text-gold-accent/80 sm:h-4 sm:w-4" aria-hidden />
              <span className={MOBILE_TABBAR_LABEL}>시술안내</span>
            </Link>
          </li>
          <li className="min-w-0">
            <Link
              to="/pricing"
              title="시술 · 가격"
              className={`${MOBILE_TABBAR_ITEM} ${
                isPricingActive ? "text-gold-accent" : "text-muted-foreground"
              }`}
            >
              <CalendarDays className="h-3.5 w-3.5 shrink-0 text-gold-accent/80 sm:h-4 sm:w-4" aria-hidden />
              <span className={MOBILE_TABBAR_LABEL}>시술가격</span>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
