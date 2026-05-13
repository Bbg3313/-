import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router";
import { AnimatePresence, motion, useInView } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  getProcedureTreatment,
  listTreatmentsByCategory,
  procedureDetailPath,
  type ProcedureTreatment,
} from "../../data/treatmentsCatalog";
import { useProcedureHeroImageOverrides } from "../hooks/useProcedureHeroImageOverrides";
import { pickProcedureHeroImageUrl } from "../lib/procedureHeroImages";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { cn } from "./ui/utils";

const easeLux = [0.22, 1, 0.36, 1] as const;

const ABOUT_BODY_FONT =
  '"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans KR", "Apple SD Gothic Neo", "Malgun Gothic", "Helvetica Neue", Arial, sans-serif';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
};

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={fadeUp}
      transition={{ duration: 0.75, delay, ease: easeLux }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function LuxImageCard({ className = "", children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={`group relative overflow-hidden rounded-xl border border-white/75 bg-white/50 shadow-[0_20px_56px_-28px_rgba(35,30,26,0.28)] ring-1 ring-black/[0.04] ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 z-[6] rounded-xl ring-1 ring-inset ring-gold-accent/18" />
      <div className="pointer-events-none absolute inset-0 z-[5] rounded-xl bg-gradient-to-br from-white/30 via-transparent to-amber-950/[0.05]" />
      <div className="pointer-events-none absolute inset-0 z-[7] rounded-xl opacity-0 shadow-[inset_0_0_90px_rgba(30,24,18,0.14)] transition-opacity duration-500 group-hover:opacity-100" />
      {children}
    </div>
  );
}

const ABOUT_CLINIC_SLIDES = [
  { src: "/images/about-clinic-main.png", alt: "연세미의원 로고와 인테리어" },
  { src: "/images/about-clinic-slide-waiting.png", alt: "대기·안내 공간" },
  { src: "/images/about-clinic-lobby.png", alt: "로비" },
  { src: "/images/about-clinic-slide-laser-room.png", alt: "레이저 시술실" },
  { src: "/images/about-clinic-room.png", alt: "시술실" },
] as const;

function GalleryTile({
  src,
  alt,
  className,
  delay = 0,
  /** 히어로: 비율 고정 없이 전체가 보이도록 contain (로고·하단 카피 잘림 방지) */
  layout = "tile",
}: {
  src: string;
  alt: string;
  className?: string;
  delay?: number;
  layout?: "tile" | "hero";
}) {
  const isHero = layout === "hero";

  return (
    <motion.figure
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-24px" }}
      transition={{ duration: 0.6, delay, ease: easeLux }}
      className={cn("min-h-0 overflow-hidden", isHero ? "h-auto w-full" : "h-full", className)}
    >
      <LuxImageCard
        className={cn(
          "rounded-lg border-white/60 shadow-[0_18px_48px_-32px_rgba(35,30,26,0.22)] sm:rounded-xl",
          isHero ? "h-auto" : "h-full",
        )}
      >
        {isHero ? (
          <div className="relative flex w-full items-center justify-center bg-gradient-to-b from-[#f7f5f1] to-[#ebe6df] px-1 py-1.5 sm:px-2 sm:py-2">
            <ImageWithFallback
              src={src}
              alt={alt}
              className="h-auto w-full max-w-full object-contain object-center"
            />
          </div>
        ) : (
          <div className="relative h-full min-h-[120px] w-full cursor-zoom-in overflow-hidden bg-gradient-to-b from-[#f7f5f1] to-[#ebe6df]">
            <ImageWithFallback
              src={src}
              alt={alt}
              className="h-full w-full origin-center object-cover object-center transition-[transform,filter] duration-500 ease-out group-hover:scale-[1.1] group-hover:brightness-[1.03]"
            />
          </div>
        )}
      </LuxImageCard>
    </motion.figure>
  );
}

/** 병원 소개 — 상단 메인 히어로 + 슬라이드 순서대로 5장 그리드 */
function AboutGalleryImages() {
  const [mainSlide, ...restSlides] = ABOUT_CLINIC_SLIDES;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.85, ease: easeLux }}
      className="w-full shrink-0"
    >
      <div className="mx-auto w-full max-w-6xl px-0 sm:max-w-7xl">
        {/* 위: 메인 전체 노출(contain, 높이 제한 없음) / 아래: 간격·셀 높이 줄여 세로 확보 */}
        <div className="flex flex-col gap-2 sm:gap-2.5 md:gap-3">
          <GalleryTile
            key={mainSlide.src}
            src={mainSlide.src}
            alt={mainSlide.alt}
            delay={0}
            layout="hero"
            className="w-full"
          />

          <div className="grid grid-cols-2 gap-2 sm:gap-2.5 md:grid-cols-4 md:gap-2.5 lg:gap-3">
            {restSlides.map((slide, i) => (
              <GalleryTile
                key={slide.src}
                src={slide.src}
                alt={slide.alt}
                delay={0.05 + i * 0.04}
                className="aspect-[3/4] min-h-0 min-w-0"
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function AboutGalleryShell({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`relative mx-auto flex min-h-0 w-full max-w-3xl flex-col gap-3 sm:max-w-5xl sm:gap-5 lg:max-w-7xl lg:gap-6 ${className}`}
    >
      <div className="pointer-events-none absolute -left-3 -top-3 h-14 w-14 border-l border-t border-gold-accent/40 sm:-left-4 sm:-top-4" />
      <div className="pointer-events-none absolute -bottom-3 -right-3 h-14 w-14 border-b border-r border-gold-accent/40 sm:-bottom-4 sm:-right-4" />
      {children}
    </div>
  );
}

type SignatureService = {
  id: string;
  label: string;
  /** 하이라이트 칩 (펼침 없음) */
  variant?: "brand";
  gallery?: {
    eyebrow: string;
    title: string;
    subtitle?: string;
  };
};

/** 시그니처 탭 → 시술 안내(카탈로그) 매핑. 썸네일은 `heroImage` + Supabase `procedure_hero_images` 오버레이 */
type SignatureCatalogSpec =
  | { mode: "slugs"; slugs: { categorySlug: string; slug: string }[] }
  | { mode: "category"; categorySlug: string; maxItems?: number };

const SIGNATURE_CATALOG_BY_TAB: Record<string, SignatureCatalogSpec> = {
  botox: {
    mode: "slugs",
    slugs: [
      { categorySlug: "botox-filler", slug: "jaw-botox" },
      { categorySlug: "botox-filler", slug: "wrinkle-botox" },
      { categorySlug: "botox-filler", slug: "skin-botox" },
    ],
  },
  filler: {
    mode: "slugs",
    slugs: [
      { categorySlug: "botox-filler", slug: "filler-domestic" },
      { categorySlug: "botox-filler", slug: "filler-import" },
      { categorySlug: "botox-filler", slug: "filler-dissolving-injection" },
    ],
  },
  booster: { mode: "category", categorySlug: "glow-booster", maxItems: 12 },
  toning: {
    mode: "slugs",
    slugs: [
      { categorySlug: "laser", slug: "laser-miin-toning" },
      { categorySlug: "laser", slug: "laser-gd-toning" },
    ],
  },
  lifting: { mode: "category", categorySlug: "lifting-laser", maxItems: 8 },
  thread: { mode: "category", categorySlug: "thread-lifting", maxItems: 8 },
  /** 화상·흉터: 카탈로그 대표 시술(CO2) 안내 */
  tele: { mode: "slugs", slugs: [{ categorySlug: "laser", slug: "laser-co2" }] },
  hair: { mode: "category", categorySlug: "hair-removal", maxItems: 4 },
};

function resolveSignatureTreatments(tabId: string): ProcedureTreatment[] {
  const spec = SIGNATURE_CATALOG_BY_TAB[tabId];
  if (!spec) return [];
  if (spec.mode === "slugs") {
    return spec.slugs
      .map(({ categorySlug, slug }) => getProcedureTreatment(categorySlug, slug))
      .filter((t): t is ProcedureTreatment => t != null);
  }
  const list = listTreatmentsByCategory(spec.categorySlug);
  const cap = spec.maxItems ?? 24;
  return list.slice(0, cap);
}

const SIGNATURE_SERVICES: SignatureService[] = [
  {
    id: "botox",
    label: "보톡스",
    gallery: {
      eyebrow: "Botulinum toxin",
      title: "보톡스 · 정품 시약",
      subtitle: "대표원장이 직접 상담·시술하며, 브랜드별 특성에 맞춘 맞춤 처방을 안내드립니다.",
    },
  },
  {
    id: "filler",
    label: "필러",
    gallery: {
      eyebrow: "Dermal filler",
      title: "필러 · 정품 라인업",
      subtitle: "국산·수입 정품 필러로 부위와 목적에 맞는 볼륨·주름 교정을 상담 시 안내드립니다.",
    },
  },
  {
    id: "booster",
    label: "스킨부스터",
    gallery: {
      eyebrow: "Skin booster",
      title: "물광 · 스킨부스터",
      subtitle: "하이주·리쥬란·쥬베룩 등 정품 라인으로 피부 결·탄력을 상담 시 안내드립니다.",
    },
  },
  {
    id: "toning",
    label: "레이저토닝",
    gallery: {
      eyebrow: "Laser toning",
      title: "레이저 토닝",
      subtitle: "미인·GD 토닝 등 피부 톤·잡티 관리를 상담 시 맞춤 안내드립니다.",
    },
  },
  {
    id: "lifting",
    label: "레이저 리프팅",
    gallery: {
      eyebrow: "Laser lifting",
      title: "레이저 리프팅",
      subtitle: "슈링크·덴서티·볼뉴머 등 초음파·고주파 리프팅을 상담 시 안내드립니다.",
    },
  },
  {
    id: "thread",
    label: "실리프팅",
    gallery: {
      eyebrow: "Thread lifting",
      title: "실리프팅 · 녹는실",
      subtitle: "민트·PCL·잼버·하이코 등 녹는 실 라인을 상담 시 안내드립니다.",
    },
  },
  {
    id: "tele",
    label: "화상",
    gallery: {
      eyebrow: "Scar & skin surface",
      title: "화상 · 흉터 케어",
      subtitle: "화상·흉터·표면 재생 케어를 상담 시 안내드립니다.",
    },
  },
  {
    id: "hair",
    label: "제모",
    gallery: {
      eyebrow: "Laser hair removal",
      title: "레이저 제모",
      subtitle: "듀얼 파장 레이저 제모 등을 상담 시 안내드립니다.",
    },
  },
];

const features = [
  {
    title: "양심적인 진료",
    body: "고민을 나눌 동반자로서 정직하고 신중한 진료를 약속드립니다.",
    icon: (
      <svg className="w-[1.35rem] h-[1.35rem]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.35">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 12.75L11.4 14.4 14.25 10.95" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3.75l6.75 2.25v5.7c0 4.425-2.85 7.95-6.75 8.55-3.9-.6-6.75-4.125-6.75-8.55V6l6.75-2.25z" />
      </svg>
    ),
  },
  {
    title: "배려하는 임직원",
    body: "따스한 말과 행동으로 편안하고 신뢰할 수 있는 진료 환경을 만듭니다.",
    icon: (
      <svg className="w-[1.35rem] h-[1.35rem]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.35">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 10.5A4.5 4.5 0 1112 15a4.5 4.5 0 01-4.5-4.5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 20.25c1.8-2.7 4.65-4.125 8.25-4.125s6.45 1.425 8.25 4.125" />
      </svg>
    ),
  },
  {
    title: "대표원장 1:1 책임 전담제",
    body: "상담부터 사후 관리까지 대표원장이 직접 책임지고 끝까지 함께합니다.",
    icon: (
      <svg className="w-[1.35rem] h-[1.35rem]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.35">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75v5.25l3.75 2.25" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

const DEFAULT_SIGNATURE_TAB_ID = SIGNATURE_SERVICES.find((s) => s.gallery)?.id ?? "botox";

function signaturePillClass(isBrand: boolean, _isSelected: boolean, isInteractive: boolean) {
  if (isBrand) {
    return "flex min-h-[2.35rem] items-center justify-center rounded-md border border-gold-accent/45 bg-gradient-to-br from-[#fff8ea] via-[#f6e7c5] to-[#ead3a0] px-2 py-2 text-center text-[11px] font-semibold leading-snug tracking-wide text-charcoal break-keep [word-break:keep-all] shadow-[0_8px_18px_-12px_rgba(120,90,38,0.55),inset_0_1px_0_rgba(255,255,255,0.72)] sm:text-xs";
  }
  const base =
    "flex min-h-[2.35rem] w-full items-center justify-center rounded-xl px-2 py-2 text-center text-[11px] font-medium leading-snug tracking-wide break-keep [word-break:keep-all] transition-[color,background-color,box-shadow,transform] duration-200 sm:text-xs";
  if (!isInteractive) {
    return `${base} cursor-default border border-transparent bg-transparent text-charcoal/40`;
  }
  return `${base} border border-transparent bg-transparent text-charcoal/45 hover:bg-black/[0.03] hover:text-charcoal/80 active:scale-[0.98]`;
}

export function About() {
  const [openSignatureId, setOpenSignatureId] = useState<string>(DEFAULT_SIGNATURE_TAB_ID);
  const openService = SIGNATURE_SERVICES.find((s) => s.id === openSignatureId);
  const { map: procedureHeroOverrides } = useProcedureHeroImageOverrides();
  const signatureTreatments = openService?.gallery ? resolveSignatureTreatments(openService.id) : [];
  const signatureTabsRef = useRef<HTMLDivElement>(null);
  const [signatureTabScroll, setSignatureTabScroll] = useState({ canLeft: false, canRight: false });
  /** 한 줄에 모두 들어갈 때만 탭 사이·끝 여백을 균등 분배 (왼쪽 몰림·오른쪽 빈 칸 방지) */
  const [signatureTabsFitRow, setSignatureTabsFitRow] = useState(false);

  useEffect(() => {
    const el = signatureTabsRef.current;
    if (!el) return;
    const sync = () => {
      const maxScroll = el.scrollWidth - el.clientWidth;
      setSignatureTabsFitRow(maxScroll <= 2);
      setSignatureTabScroll({
        canLeft: el.scrollLeft > 2,
        canRight: maxScroll > 2 && el.scrollLeft < maxScroll - 2,
      });
    };
    sync();
    el.addEventListener("scroll", sync, { passive: true });
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", sync);
      ro.disconnect();
    };
  }, []);

  const scrollSignatureTabs = (dir: "left" | "right") => {
    const el = signatureTabsRef.current;
    if (!el) return;
    const step = Math.max(160, Math.floor(el.clientWidth * 0.75));
    el.scrollBy({ left: dir === "right" ? step : -step, behavior: "smooth" });
  };

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-champagne px-6 py-14 text-charcoal sm:py-28 lg:py-36"
      style={{ fontFamily: ABOUT_BODY_FONT }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `radial-gradient(ellipse 80% 50% at 20% 0%, rgba(180, 140, 80, 0.12), transparent 55%),
            radial-gradient(ellipse 60% 40% at 100% 100%, rgba(140, 110, 70, 0.08), transparent 50%),
            linear-gradient(180deg, rgba(255,255,255,0.4) 0%, transparent 35%)`,
        }}
      />
      <div className="pointer-events-none absolute top-24 right-[-10%] h-[min(32rem,50vw)] w-[min(32rem,50vw)] rounded-full bg-gold-accent/[0.07] blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-accent/25 to-transparent" />

      <div className="relative mx-auto w-full max-w-[90rem]">
        {/* 상단: 센터 정렬 헤드라인 + 소개 */}
        <div className="mx-auto max-w-4xl text-center">
          <Reveal className="shrink-0">
            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.35em] text-gold-accent/90 md:mb-4">Yonsei Mi Clinic</p>
            <div className="mx-auto mb-5 h-px w-20 bg-gradient-to-r from-transparent via-gold-accent to-transparent md:mb-8" />
          </Reveal>

          <Reveal delay={0.05} className="shrink-0">
            <h2
              className="mx-auto mb-5 w-full max-w-3xl text-balance text-center text-charcoal tracking-[-0.02em] sm:mb-7 md:mb-8"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2.1rem, 4.2vw, 3.35rem)",
                lineHeight: 1.12,
                fontWeight: 500,
              }}
            >
              <span className="text-[#2a241f] [text-shadow:0_8px_20px_rgba(33,26,20,0.14)]">Where Science</span>
              <br />
              <span className="inline-flex flex-wrap items-baseline justify-center gap-x-2 gap-y-0 [text-shadow:0_10px_24px_rgba(146,118,74,0.16)]">
                <span className="text-[#6d5a44]">Meets</span>
                <span className="bg-gradient-to-r from-[#b08a54] via-[#d9bc8a] to-[#8a6a3f] bg-clip-text font-semibold text-transparent">
                  Beauty
                </span>
              </span>
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="shrink-0">
            <p className="mx-auto mb-4 max-w-2xl text-base font-normal leading-[1.72] text-charcoal/88 [word-break:keep-all] sm:mb-5 sm:text-lg md:text-xl">
              안녕하세요 연세미의원입니다. 진료과 1인 대표원장의 상담 및 시술 책임제 병원으로서 경주의 아름다움을 선도하고 있는 병원입니다.
            </p>
          </Reveal>

          <Reveal delay={0.14} className="shrink-0">
            <p className="mx-auto max-w-xl border-t border-gold-accent/25 pt-5 text-[15px] font-normal leading-relaxed text-muted-foreground [word-break:keep-all] sm:pt-6 sm:text-base">
              공장형 네트워크 병원과는 다른 시술 퀄리티를 보장합니다.
            </p>
          </Reveal>
        </div>

        {/* 병원 가치 — 아이콘+제목 한 줄, 본문은 아래 */}
        <Reveal delay={0.15} className="mt-10 w-full sm:mt-12 md:mt-14">
          <ul
            className="mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-4 md:gap-5"
            role="list"
          >
            {features.map((item) => (
              <li
                key={item.title}
                className="flex flex-col rounded-2xl border border-gold-accent/18 bg-gradient-to-b from-white/90 to-[#faf7f2]/95 px-4 py-4 shadow-[0_10px_36px_-24px_rgba(35,28,22,0.18)] ring-1 ring-white/70 backdrop-blur-sm transition-[box-shadow,transform,border-color] duration-300 hover:-translate-y-0.5 hover:border-gold-accent/28 hover:shadow-[0_16px_44px_-26px_rgba(35,28,22,0.22)] sm:px-5 sm:py-5"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gold-accent/30 bg-gradient-to-br from-white via-[#fffdf9] to-[#f3ead8] text-gold-accent shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_4px_14px_-8px_rgba(140,110,60,0.25)]"
                    aria-hidden
                  >
                    <span className="[&_svg]:block [&_svg]:h-[1.1rem] [&_svg]:w-[1.1rem] [&_svg]:stroke-[1.3]">
                      {item.icon}
                    </span>
                  </div>
                  <h3 className="m-0 min-w-0 flex-1 self-center text-left text-[0.9375rem] font-semibold leading-snug tracking-tight text-[#2a241f] sm:text-base">
                    {item.title}
                  </h3>
                </div>
                <p className="mt-3.5 border-t border-gold-accent/12 pt-3.5 text-left text-[13px] font-normal leading-[1.65] text-muted-foreground [word-break:keep-all] sm:mt-4 sm:pt-4 sm:text-sm">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* 클리닉 이미지 — 본문 아래 전폭 센터 */}
        <Reveal delay={0.12} className="mt-12 w-full sm:mt-14 md:mt-16 lg:mt-20">
          <AboutGalleryShell>
            <AboutGalleryImages />
          </AboutGalleryShell>
        </Reveal>

        {/* 시그니처 케어 — 클리닉 갤러리(AboutGalleryShell)와 동일한 좌우 폭 */}
        <div className="relative mx-auto mt-14 w-full max-w-3xl sm:mt-16 sm:max-w-5xl md:mt-20 lg:mt-24 lg:max-w-7xl">
            <Reveal delay={0.17} className="shrink-0 w-full">
              <div className="flex w-full flex-col items-center px-0">
                <p className="mb-3 text-center text-[11px] font-medium uppercase tracking-[0.35em] text-gold-accent/90 md:mb-4">
                  Signature Care
                </p>
                <div
                  className="mx-auto h-px w-20 bg-gradient-to-r from-transparent via-gold-accent to-transparent"
                  aria-hidden
                />
              </div>
              <div className="mt-5 mb-7 sm:mt-6 sm:mb-10">
              <div
                className="mb-5 rounded-2xl bg-black/[0.035] p-1.5 ring-1 ring-black/[0.04] backdrop-blur-[2px] sm:mb-6"
              >
                <div className="flex items-stretch gap-1 sm:gap-1.5">
                  <button
                    type="button"
                    aria-label="시그니처 메뉴 이전"
                    disabled={!signatureTabScroll.canLeft}
                    onClick={() => scrollSignatureTabs("left")}
                    className="flex w-9 shrink-0 items-center justify-center rounded-lg border border-black/[0.06] bg-white/80 text-charcoal shadow-sm transition-colors hover:bg-white hover:text-gold-accent disabled:cursor-not-allowed disabled:opacity-35 sm:w-10"
                  >
                    <ChevronLeft className="h-5 w-5" aria-hidden />
                  </button>
                  <div
                    ref={signatureTabsRef}
                    className={cn(
                      "flex min-h-[2.75rem] min-w-0 flex-1 flex-nowrap overflow-x-auto scroll-smooth rounded-xl py-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
                      signatureTabsFitRow ? "justify-evenly gap-1.5 px-0.5 sm:gap-2 sm:px-1" : "justify-start gap-1",
                    )}
                    role="tablist"
                    aria-label="Signature care treatments"
                  >
                    {SIGNATURE_SERVICES.map((svc) => {
                      const isBrand = svc.variant === "brand";
                      const hasGallery = Boolean(svc.gallery);
                      const isOpen = openSignatureId === svc.id;
                      const pillClass = signaturePillClass(isBrand, isOpen, hasGallery);

                      if (hasGallery) {
                        return (
                          <button
                            key={svc.id}
                            type="button"
                            role="tab"
                            aria-selected={isOpen}
                            aria-controls="signature-care-panel"
                            id={`signature-tab-${svc.id}`}
                            className="relative flex min-h-[2.35rem] shrink-0 items-center justify-center overflow-hidden rounded-[10px] px-3 py-2 text-center text-[11px] font-semibold leading-snug tracking-wide break-keep [word-break:keep-all] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f4efe8] sm:min-w-[5.25rem] sm:px-3.5 sm:text-xs"
                            onClick={() => setOpenSignatureId(svc.id)}
                          >
                            {isOpen ? (
                              <motion.span
                                layoutId="signature-gallery-pill"
                                className="absolute inset-0 z-0 rounded-[10px] bg-white shadow-[0_1px_0_rgba(0,0,0,0.05),0_14px_36px_-20px_rgba(28,22,18,0.16)] ring-1 ring-black/[0.06]"
                                transition={{ type: "spring", stiffness: 500, damping: 34 }}
                              />
                            ) : null}
                            <span
                              className={`relative z-[1] ${isOpen ? "text-charcoal" : "text-charcoal/48 hover:text-charcoal/72"}`}
                            >
                              {svc.label}
                            </span>
                          </button>
                        );
                      }

                      return (
                        <span key={svc.id} className={`${pillClass} shrink-0`} role="presentation">
                          {svc.label}
                        </span>
                      );
                    })}
                  </div>
                  <button
                    type="button"
                    aria-label="시그니처 메뉴 다음"
                    disabled={!signatureTabScroll.canRight}
                    onClick={() => scrollSignatureTabs("right")}
                    className="flex w-9 shrink-0 items-center justify-center rounded-lg border border-black/[0.06] bg-white/80 text-charcoal shadow-sm transition-colors hover:bg-white hover:text-gold-accent disabled:cursor-not-allowed disabled:opacity-35 sm:w-10"
                  >
                    <ChevronRight className="h-5 w-5" aria-hidden />
                  </button>
                </div>
              </div>

              <AnimatePresence initial={false} mode="wait">
                {openService?.gallery ? (
                  <motion.div
                    key={openService.id}
                    id="signature-care-panel"
                    role="tabpanel"
                    aria-labelledby={`signature-tab-${openService.id}`}
                    initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -8, filter: "blur(3px)" }}
                    transition={{ duration: 0.32, ease: easeLux }}
                    className="overflow-hidden rounded-3xl bg-white/75 p-4 shadow-[0_32px_64px_-40px_rgba(24,18,14,0.35)] ring-1 ring-black/[0.05] backdrop-blur-md sm:p-6"
                  >
                    <div
                      className={cn(
                        "mb-4 border-b border-black/[0.06] pb-4",
                        openService.gallery.subtitle?.trim()
                          ? "flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between sm:gap-6"
                          : "flex flex-col gap-1",
                      )}
                    >
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-gold-accent/85">
                          {openService.gallery.eyebrow}
                        </p>
                        <h3 className="mt-1 font-serif text-lg font-medium tracking-tight text-charcoal sm:text-xl">{openService.gallery.title}</h3>
                      </div>
                      {openService.gallery.subtitle?.trim() ? (
                        <p className="max-w-xl text-[13px] leading-relaxed text-muted-foreground [word-break:keep-all] sm:text-sm">
                          {openService.gallery.subtitle}
                        </p>
                      ) : null}
                    </div>
                    {signatureTreatments.length === 0 ? (
                      <p className="py-8 text-center text-sm text-muted-foreground [word-break:keep-all]">
                        이 탭에 등록된 시술이 없습니다.
                      </p>
                    ) : (
                    <div
                      className={cn(
                        "-mx-1 flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 pb-1 [scrollbar-width:thin] sm:mx-0 sm:grid sm:auto-rows-fr sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 md:gap-6",
                        "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
                      )}
                    >
                      {signatureTreatments.map((t) => {
                        const thumb =
                          pickProcedureHeroImageUrl(
                            t.categorySlug,
                            t.slug,
                            t.heroImage,
                            procedureHeroOverrides,
                          ) ?? "";
                        return (
                        <Link
                          key={`${t.categorySlug}-${t.slug}`}
                          to={procedureDetailPath(t.categorySlug, t.slug)}
                          className="group flex h-full min-h-0 w-[min(90vw,22rem)] shrink-0 snap-center flex-col overflow-hidden rounded-2xl border border-black/[0.05] bg-white shadow-[0_16px_40px_-28px_rgba(28,22,18,0.28)] transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_48px_-26px_rgba(28,22,18,0.22)] sm:w-auto"
                        >
                          <div className="relative flex h-[14rem] w-full shrink-0 items-center justify-center overflow-hidden bg-gradient-to-b from-[#faf9f7] to-[#f0ebe4] sm:h-[17rem] md:h-[19rem] lg:h-[20rem]">
                            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_0%,rgba(255,255,255,0.9),transparent_55%)]" />
                            {thumb ? (
                              <ImageWithFallback
                                src={thumb}
                                alt=""
                                className="relative z-[1] h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                              />
                            ) : (
                              <span className="relative z-[1] px-4 text-center text-xs text-muted-foreground [word-break:keep-all]">
                                이미지 등록 예정
                              </span>
                            )}
                          </div>
                          <div className="flex min-h-[3.25rem] flex-1 flex-col justify-center border-t border-gold-accent/12 bg-gradient-to-b from-white to-[#fdfcfa] px-3 py-3 sm:min-h-[3.5rem] sm:px-4 sm:py-3">
                            <p className="text-center text-sm font-semibold tracking-tight text-charcoal [word-break:keep-all]">{t.title}</p>
                          </div>
                        </Link>
                        );
                      })}
                    </div>
                    )}
                  </motion.div>
                ) : null}
              </AnimatePresence>
              </div>
            </Reveal>
        </div>
      </div>
    </section>
  );
}
