import { useRef, type ReactNode } from "react";
import { motion, useInView } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

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

/** 병원 소개 사진 스택 — 데스크톱·모바일 동일 마크업(크기·비율 동일) */
function AboutGalleryImages() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.85, ease: easeLux }}
        className="shrink-0"
      >
        <LuxImageCard>
          <div className="relative w-full bg-gradient-to-b from-[#f4f1ec] to-[#e9e4dc]">
            <ImageWithFallback
              src="/images/about-clinic-main.png"
              alt="연세미의원 로고와 인테리어"
              className="mx-auto block h-auto w-full max-h-[min(68vh,680px)] object-contain object-bottom transition-transform duration-[1.15s] ease-out group-hover:scale-[1.01]"
            />
          </div>
        </LuxImageCard>
      </motion.div>

      <div className="grid shrink-0 grid-cols-2 gap-3 sm:gap-5">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.08, ease: easeLux }}
        >
          <LuxImageCard>
            <div className="relative aspect-[4/5]">
              <ImageWithFallback
                src="/images/about-clinic-room.png"
                alt="시술실"
                className="h-full w-full object-cover transition-transform duration-[1s] ease-out group-hover:scale-[1.03]"
              />
            </div>
          </LuxImageCard>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.16, ease: easeLux }}
        >
          <LuxImageCard>
            <div className="relative aspect-[4/5]">
              <ImageWithFallback
                src="/images/about-clinic-lobby.png"
                alt="로비"
                className="h-full w-full object-cover transition-transform duration-[1s] ease-out group-hover:scale-[1.03]"
              />
            </div>
          </LuxImageCard>
        </motion.div>
      </div>
    </>
  );
}

function AboutGalleryShell({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`relative mx-auto flex h-full min-h-0 w-full max-w-xl flex-col gap-3 sm:gap-5 lg:mx-0 lg:max-w-none lg:gap-6 ${className}`}
    >
      <div className="pointer-events-none absolute -left-3 -top-3 h-14 w-14 border-l border-t border-gold-accent/40 sm:-left-4 sm:-top-4" />
      <div className="pointer-events-none absolute -bottom-3 -right-3 h-14 w-14 border-b border-r border-gold-accent/40 sm:-bottom-4 sm:-right-4" />
      {children}
    </div>
  );
}

const services = [
  "보톡스",
  "필러",
  "레이저토닝",
  "레이저 리프팅",
  "실리프팅",
  "다이어트 약",
  "스킨부스터",
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
        <div className="grid min-h-0 gap-6 md:gap-10 lg:grid-cols-2 lg:items-stretch lg:gap-12 xl:gap-16">
          {/* Left: 데스크톱(lg+)만 — 사진 스택. 모바일은 오른쪽 시그니처 케어 위에 동일 블록 삽입 */}
          <Reveal className="hidden min-h-0 h-full w-full flex-col lg:flex">
            <AboutGalleryShell>
              <AboutGalleryImages />
            </AboutGalleryShell>
          </Reveal>

          {/* Right: 상단 카피는 원래 스타일. 특징+푸터 카드만 lg에서 flex-1로 남는 높이까지 채움 */}
          <div className="flex min-h-0 w-full min-w-0 flex-col lg:h-full lg:min-h-0 lg:pl-2 xl:pl-4">
            <Reveal className="shrink-0">
              <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.35em] text-gold-accent/90 md:mb-5">Yonsei Mi Clinic</p>
              <div className="mb-4 h-px w-20 bg-gradient-to-r from-gold-accent via-gold-accent/60 to-transparent md:mb-7" />
            </Reveal>

            <Reveal delay={0.05} className="shrink-0">
              <h2
                className="mb-4 w-full text-balance text-charcoal tracking-[-0.02em] md:mb-7"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(2.1rem, 3.6vw, 3.15rem)",
                  lineHeight: 1.12,
                  fontWeight: 500,
                }}
              >
                Where Science
                <br />
                <span className="bg-gradient-to-r from-charcoal via-charcoal to-gold-accent/75 bg-clip-text text-transparent">
                  Meets Beauty
                </span>
              </h2>
            </Reveal>

            <Reveal delay={0.1} className="shrink-0">
              <p className="mb-3 w-full max-w-none text-base font-normal leading-[1.72] text-charcoal/88 [word-break:keep-all] sm:mb-4 sm:text-xl">
                안녕하세요 연세미의원입니다. 진료과 1인 대표원장의 상담 및 시술 책임제 병원으로서 경주의 아름다움을 선도하고 있는 병원입니다.
              </p>
            </Reveal>

            <Reveal delay={0.14} className="shrink-0">
              <p className="mb-4 w-full max-w-none border-l border-gold-accent/35 pl-5 text-[15px] font-normal leading-relaxed text-muted-foreground [word-break:keep-all] sm:mb-6 sm:text-base">
                공장형 네트워크 병원과는 다른 시술 퀄리티를 보장합니다.
              </p>
            </Reveal>

            <Reveal delay={0.15} className="shrink-0 lg:hidden">
              <AboutGalleryShell className="mb-6 sm:mb-8">
                <AboutGalleryImages />
              </AboutGalleryShell>
            </Reveal>

            <Reveal delay={0.17} className="shrink-0">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-muted-foreground/80">Signature care</p>
              <div className="mb-6 grid w-full grid-cols-2 gap-2 sm:mb-9 sm:grid-cols-4 lg:grid-cols-7">
                {services.map((label) => (
                  <span
                    key={label}
                    className="flex min-h-[2.35rem] items-center justify-center rounded-md border border-gold-accent/25 bg-white/55 px-2 py-2 text-center text-[11px] font-medium leading-tight tracking-wide text-charcoal/75 shadow-sm backdrop-blur-sm transition-colors hover:border-gold-accent/45 hover:text-charcoal sm:text-xs"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.24} className="mt-5 w-full shrink-0 md:mt-8 lg:mt-8 lg:flex lg:min-h-0 lg:flex-1 lg:flex-col">
              <div className="flex min-h-0 w-full flex-1 flex-col overflow-hidden rounded-xl border border-gold-accent/15 bg-white/40 px-4 py-1 shadow-[0_8px_28px_-20px_rgba(45,38,32,0.12)] backdrop-blur-sm sm:px-5 sm:py-0">
                <ul className="flex min-h-0 flex-1 flex-col divide-y divide-gold-accent/12 lg:min-h-0">
                  {features.map((item) => (
                    <li
                      key={item.title}
                      className="flex min-h-0 flex-1 gap-3 py-3 sm:gap-5 sm:py-5 lg:min-h-0 lg:items-center"
                    >
                      <div
                        className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold-accent/25 bg-white/90 text-gold-accent shadow-[inset_0_1px_0_rgba(255,255,255,0.95)] sm:mt-0 sm:h-11 sm:w-11"
                        aria-hidden
                      >
                        <span className="[&_svg]:block [&_svg]:h-[1rem] [&_svg]:w-[1rem] [&_svg]:stroke-[1.25] sm:[&_svg]:h-[1.1rem] sm:[&_svg]:w-[1.1rem]">
                          {item.icon}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1 self-center">
                        <h3 className="mb-1.5 text-sm font-semibold leading-snug tracking-tight text-charcoal">
                          {item.title}
                        </h3>
                        <p className="text-sm font-normal leading-relaxed text-muted-foreground [word-break:keep-all]">
                          {item.body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
