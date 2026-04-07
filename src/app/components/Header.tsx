import logo from "../../imports/logo.svg";
import { useState, useEffect } from "react";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/98 backdrop-blur-md border-b border-border/50 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center">
          <img
            src={logo}
            alt="Dermatology Clinic Logo"
            className={`h-10 transition-all duration-300 ${
              isScrolled ? "opacity-100" : "opacity-90"
            }`}
          />
        </a>

        {/* Navigation Menu */}
        <ul className="hidden md:flex items-center gap-10">
          <li>
            <a
              href="#services"
              className={`text-sm tracking-wider uppercase transition-colors duration-300 ${
                isScrolled
                  ? "text-charcoal hover:text-gold-accent"
                  : "text-white/90 hover:text-white"
              }`}
            >
              진료안내
            </a>
          </li>
          <li>
            <a
              href="#about"
              className={`text-sm tracking-wider uppercase transition-colors duration-300 ${
                isScrolled
                  ? "text-charcoal hover:text-gold-accent"
                  : "text-white/90 hover:text-white"
              }`}
            >
              클리닉 소개
            </a>
          </li>
          <li>
            <a
              href="#doctors"
              className={`text-sm tracking-wider uppercase transition-colors duration-300 ${
                isScrolled
                  ? "text-charcoal hover:text-gold-accent"
                  : "text-white/90 hover:text-white"
              }`}
            >
              의료진
            </a>
          </li>
          <li>
            <a
              href="#testimonials"
              className={`text-sm tracking-wider uppercase transition-colors duration-300 ${
                isScrolled
                  ? "text-charcoal hover:text-gold-accent"
                  : "text-white/90 hover:text-white"
              }`}
            >
              고객후기
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className={`text-sm tracking-wider uppercase transition-colors duration-300 ${
                isScrolled
                  ? "text-charcoal hover:text-gold-accent"
                  : "text-white/90 hover:text-white"
              }`}
            >
              예약·문의
            </a>
          </li>
        </ul>

        {/* CTA Button */}
        <a href="#contact">
          <button
            className={`group relative px-8 py-3 overflow-hidden transition-all duration-500 ${
              isScrolled
                ? "bg-primary text-primary-foreground hover:shadow-lg"
                : "bg-white/10 text-white border border-white/30 backdrop-blur-sm hover:bg-white/20"
            }`}
          >
            <span className="relative z-10 tracking-wider uppercase text-sm">예약</span>
            {isScrolled && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            )}
          </button>
        </a>
      </nav>
    </header>
  );
}
