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
      className="relative overflow-hidden py-24 sm:py-28 lg:py-36 px-6 bg-champagne text-charcoal"
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
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-12 xl:gap-16">
          {/* Left: 이미지 스택 높이만 사용(빈 스페이서 없음) — 행 높이는 이미지 쪽이 우선 */}
          <Reveal className="flex min-h-0 flex-col">
            <div className="relative mx-auto flex w-full max-w-xl flex-col gap-5 sm:gap-6 lg:mx-0 lg:max-w-none">
              <div className="pointer-events-none absolute -left-3 -top-3 h-14 w-14 border-l border-t border-gold-accent/40 sm:-left-4 sm:-top-4" />
              <div className="pointer-events-none absolute -bottom-3 -right-3 h-14 w-14 border-b border-r border-gold-accent/40 sm:-bottom-4 sm:-right-4" />

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

              <div className="grid shrink-0 grid-cols-2 gap-4 sm:gap-5">
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
            </div>
          </Reveal>

          {/* Right — 짧을 때는 열 하단에 붙여 이미지 하단과 맞춤 */}
          <div className="flex min-h-0 w-full min-w-0 flex-col lg:self-end lg:pl-2 xl:pl-4">
            <Reveal>
              <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.35em] text-gold-accent/90 lg:mb-2">Yonsei Mi Clinic</p>
              <div className="mb-5 h-px w-20 bg-gradient-to-r from-gold-accent via-gold-accent/60 to-transparent lg:mb-4" />
            </Reveal>

            <Reveal delay={0.05}>
              <h2
                className="mb-5 w-full text-[clamp(2.1rem,3.6vw,3.15rem)] leading-[1.12] text-charcoal tracking-[-0.02em] text-balance lg:mb-3 lg:text-[clamp(1.65rem,2.35vw,2.4rem)]"
                style={{
                  fontFamily: "'Playfair Display', serif",
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

            <Reveal delay={0.1}>
              <p className="mb-3 w-full max-w-none text-lg font-normal leading-[1.65] text-charcoal/88 sm:text-xl lg:mb-2.5 lg:text-[1.05rem] lg:leading-[1.62]">
                안녕하세요 연세미의원입니다. 진료과 1인 대표원장의 상담 및 시술 책임제 병원으로서 경주의 아름다움을 선도하고 있는 병원입니다.
              </p>
            </Reveal>

            <Reveal delay={0.14}>
              <p className="mb-5 w-full max-w-none border-l border-gold-accent/35 pl-4 text-[15px] font-normal leading-snug text-muted-foreground lg:mb-4 lg:pl-4 lg:text-sm lg:leading-relaxed">
                공장형 네트워크 병원과는 다른 시술 퀄리티를 보장합니다.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.28em] text-muted-foreground/80">Signature care</p>
              <div className="mb-5 grid w-full grid-cols-2 gap-1.5 sm:grid-cols-4 sm:gap-2 lg:mb-4 lg:grid-cols-7">
                {services.map((label) => (
                  <span
                    key={label}
                    className="flex min-h-[2.05rem] items-center justify-center rounded-md border border-gold-accent/25 bg-white/55 px-1.5 py-1.5 text-center text-[10px] font-medium leading-tight tracking-wide text-charcoal/75 shadow-sm backdrop-blur-sm transition-colors hover:border-gold-accent/45 hover:text-charcoal sm:min-h-[2.2rem] sm:px-2 sm:py-2 sm:text-[11px] lg:min-h-[2rem] lg:py-1.5 lg:text-[11px]"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.22} className="mt-4 w-full lg:mt-3">
              <div className="w-full overflow-hidden rounded-xl border border-gold-accent/15 bg-white/40 shadow-[0_8px_28px_-20px_rgba(45,38,32,0.12)] backdrop-blur-sm">
                <ul className="divide-y divide-gold-accent/12 px-3.5 sm:px-4">
                  {features.map((item) => (
                    <li key={item.title} className="flex gap-3 py-3 sm:gap-4 lg:py-2.5">
                      <div
                        className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold-accent/25 bg-white/90 text-gold-accent shadow-[inset_0_1px_0_rgba(255,255,255,0.95)] sm:h-10 sm:w-10"
                        aria-hidden
                      >
                        <span className="[&_svg]:block [&_svg]:h-[0.95rem] [&_svg]:w-[0.95rem] [&_svg]:stroke-[1.25] sm:[&_svg]:h-[1rem] sm:[&_svg]:w-[1rem]">
                          {item.icon}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="mb-1 text-[13px] font-semibold leading-snug tracking-tight text-charcoal sm:text-sm">
                          {item.title}
                        </h3>
                        <p className="text-[12px] font-normal leading-relaxed text-muted-foreground sm:text-sm lg:leading-snug">
                          {item.body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* 브랜드 무드: 별도 카드 대신 한 카드 하단 푸터로 합쳐 세로 높이 절감 */}
                <div className="relative border-t border-gold-accent/12 bg-gradient-to-b from-white/35 to-[#faf8f5]/50 px-3.5 py-2.5 sm:px-4 sm:py-3 lg:py-2">
                  <div
                    className="pointer-events-none absolute inset-0 opacity-[0.14]"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at 1px 1px, rgba(165, 124, 72, 0.2) 1px, transparent 0)",
                      backgroundSize: "18px 18px",
                    }}
                  />
                  <div className="relative flex flex-col items-center gap-2 text-center sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-4 sm:gap-y-2 sm:text-left lg:flex-nowrap lg:justify-between lg:gap-3">
                    <div className="flex flex-col items-center gap-1.5 sm:flex-row sm:items-center sm:gap-2.5 sm:shrink-0">
                      <div
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gold-accent/28 bg-white/75 text-[8px] font-semibold tracking-[0.26em] text-gold-accent shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] sm:h-8 sm:w-8 sm:text-[9px]"
                        aria-hidden
                      >
                        YM
                      </div>
                      <p
                        className="text-[12px] leading-snug text-charcoal/90 sm:max-w-[10.5rem] sm:text-[13px]"
                        style={{ fontFamily: "'Playfair Display', serif", fontWeight: 500, fontStyle: "italic" }}
                      >
                        The art of understated elegance.
                      </p>
                    </div>
                    <p className="max-w-[18rem] text-[10px] leading-snug text-muted-foreground sm:max-w-[14rem] sm:text-[11px] lg:max-w-[12rem] lg:text-right">
                      과하지 않은 완성도와 섬세한 배려로, 오래 머무는 아름다움을 지향합니다.
                    </p>
                    <p className="w-full shrink-0 text-[8px] font-medium uppercase tracking-[0.3em] text-gold-accent/75 sm:w-auto sm:text-left lg:text-[9px]">
                      Yonsei Mi · Gyeongju
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
