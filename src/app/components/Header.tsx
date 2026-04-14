import logo from "../../imports/logo.svg";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { MenuIcon } from "lucide-react";
import { SITE_LOGO_IMG_CLASS } from "../config/logo";
import { useHomeLogoClick } from "../hooks/useHomeLogoClick";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { SITE_LINKS } from "../config/siteLinks";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const onHomeLogoClick = useHomeLogoClick();
  const isHome = location.pathname === "/";
  const solid = !isHome || isScrolled || mobileOpen;
  const isExternalReservation = /^https?:\/\//.test(SITE_LINKS.reservation);

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
  );
}
