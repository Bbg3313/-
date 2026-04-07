import logo from "../../imports/logo.svg";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { SITE_LOGO_IMG_CLASS } from "../config/logo";
import { useHomeLogoClick } from "../hooks/useHomeLogoClick";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const onHomeLogoClick = useHomeLogoClick();
  const isHome = location.pathname === "/";
  const solid = !isHome || isScrolled;

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
      <nav className="max-w-7xl mx-auto px-6 py-4 md:py-5 flex items-center justify-between gap-4">
        <Link to="/" onClick={onHomeLogoClick} className="flex items-center shrink-0 group">
          <img
            src={logo}
            alt="연세미의원"
            className={`${SITE_LOGO_IMG_CLASS} transition-all duration-300 ${
              solid ? "opacity-100" : "opacity-95"
            }`}
          />
        </Link>

        <ul className="hidden md:flex items-center gap-10">
          <li>
            <Link to="/#services" className={`text-sm tracking-wider uppercase transition-colors duration-300 ${navClass}`}>
              진료안내
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
            <Link
              to="/#events"
              className={`text-sm tracking-wider uppercase transition-colors duration-300 ${navClass}`}
            >
              이벤트
            </Link>
          </li>
          <li>
            <Link to="/#contact" className={`text-sm tracking-wider uppercase transition-colors duration-300 ${navClass}`}>
              예약·문의
            </Link>
          </li>
          <li>
            <Link to="/pricing" className={`text-sm tracking-wider uppercase transition-colors duration-300 ${navClass}`}>
              시술/가격
            </Link>
          </li>
        </ul>

        <Link to="/#contact">
          <button
            className={`group relative px-8 py-3 overflow-hidden transition-all duration-500 ${
              solid
                ? "bg-primary text-primary-foreground hover:shadow-lg"
                : "bg-white/10 text-white border border-white/30 backdrop-blur-sm hover:bg-white/20"
            }`}
          >
            <span className="relative z-10 tracking-wider uppercase text-sm">예약</span>
            {solid && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            )}
          </button>
        </Link>
      </nav>
    </header>
  );
}
