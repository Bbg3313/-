import { useRef, type ReactNode } from "react";
import { motion, useInView } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { cn } from "./ui/utils";
import { SECTION_TITLE_RULE_CLASS } from "../config/sectionDecor";

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

export function About() {
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
            <div className={SECTION_TITLE_RULE_CLASS} aria-hidden />
          </Reveal>

          <Reveal delay={0.05} className="shrink-0">
            <h2
              className="mx-auto mb-5 w-full max-w-3xl text-balance text-center text-charcoal tracking-[-0.02em] max-md:text-[clamp(2.35rem,8vw,3.5rem)] max-md:leading-[1.1] md:text-[clamp(2.1rem,4.2vw,3.35rem)] md:leading-[1.12] sm:mb-7 md:mb-8"
              style={{
                fontFamily: "'Playfair Display', serif",
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
      </div>
    </section>
  );
}
