import { useEffect, useMemo, useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Link } from "react-router";
import { SITE_LINKS } from "../config/siteLinks";
import { fetchActiveHeroBanners } from "../lib/cmsApi";
import type { HeroBanner } from "../types/cms";

export function Hero() {
  const isExternalReservation = /^https?:\/\//.test(SITE_LINKS.reservation);
  const [banners, setBanners] = useState<HeroBanner[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetchActiveHeroBanners()
      .then((rows) => setBanners(rows))
      .catch(() => setBanners([]));
  }, []);

  useEffect(() => {
    if (banners.length <= 1) return;
    const t = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => window.clearInterval(t);
  }, [banners.length]);

  const currentBanner = useMemo(() => {
    if (!banners.length) return null;
    return banners[index] ?? banners[0];
  }, [banners, index]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Large editorial background image */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src={
            currentBanner?.image_url ??
            "https://images.unsplash.com/photo-1722185388507-0a46e2d9dcca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzcGElMjBuYXR1cmFsJTIwbGlnaHQlMjBtaW5pbWFsfGVufDF8fHx8MTc3NTQ2NDY2MXww&ixlib=rb-4.1.0&q=80&w=1080"
          }
          alt="Luxury dermatology clinic"
          className="w-full h-full object-cover"
        />
        {/* Elegant gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-20 md:py-28 lg:py-32">
        <div className="max-w-2xl">
          {/* Gold accent line */}
          <div className="mb-4 h-0.5 w-16 bg-gradient-to-r from-gold-accent to-transparent md:mb-8" />

          {/* Main headline - elegant serif */}
          <h1
            className="mb-4 text-white tracking-tight leading-tight md:mb-8"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "4.5rem",
              fontWeight: "500",
              lineHeight: "1.1",
            }}
          >
            {currentBanner?.title ? (
              <>
                {currentBanner.title}
                <br />
                {currentBanner.subtitle || "Radiant Skin"}
              </>
            ) : (
              <>
                The Art of<br />Radiant Skin
              </>
            )}
          </h1>

          {/* Subheadline - Korean */}
          <p className="mb-4 max-w-[24ch] text-[1.35rem] leading-relaxed text-white/90 [word-break:keep-all] sm:mb-8 sm:text-[1.65rem] md:text-[1.75rem]">
            건강하고 아름다운 피부를 위한 전문 클리닉
          </p>

          {/* Description */}
          <p className="mb-8 max-w-xl text-base leading-relaxed text-white/70 [word-break:keep-all] sm:text-lg md:mb-12">
            대표원장의 체계적인 진료와 최신 의료 장비로
            여러분의 피부 건강을 책임집니다
          </p>

          {/* CTA */}
          <div className="flex">
            {isExternalReservation ? (
              <a
                href={SITE_LINKS.reservation}
                target="_blank"
                rel="noreferrer"
                className="group relative inline-flex items-center justify-center px-10 py-4 bg-primary text-primary-foreground overflow-hidden transition-all duration-500 hover:shadow-2xl"
              >
                <span className="relative z-10 tracking-wider uppercase text-sm">예약 상담</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              </a>
            ) : (
              <Link
                to={SITE_LINKS.reservation}
                className="group relative inline-flex items-center justify-center px-10 py-4 bg-primary text-primary-foreground overflow-hidden transition-all duration-500 hover:shadow-2xl"
              >
                <span className="relative z-10 tracking-wider uppercase text-sm">예약 상담</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 md:bottom-12">
        <div className="flex flex-col items-center gap-1.5 text-white/60 md:gap-2">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <div className="h-12 w-px bg-gradient-to-b from-white/60 to-transparent md:h-16" />
        </div>
      </div>
    </section>
  );
}
