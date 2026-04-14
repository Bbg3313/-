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

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] lg:items-stretch lg:gap-16 xl:gap-20">
          {/* Left: 이미지는 고정 비율(짤림 최소화), 남는 세로는 스페이서로 흡수해 오른쪽과 하단만 맞춤 */}
          <Reveal className="flex h-full min-h-0 flex-col">
            <div className="relative mx-auto flex w-full max-w-xl flex-1 flex-col gap-5 sm:gap-6 lg:mx-0 lg:max-w-none">
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
                  <div className="relative aspect-[16/10] sm:aspect-[16/9]">
                    <ImageWithFallback
                      src="/images/about-clinic-main.png"
                      alt="연세미의원 로고와 인테리어"
                      className="h-full w-full object-cover transition-transform duration-[1.15s] ease-out group-hover:scale-[1.02]"
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

              <div className="hidden min-h-0 flex-1 lg:block" aria-hidden />
            </div>
          </Reveal>

          {/* Right — Pretendard 통일, 하단 카드는 열이 늘어날 때 아래로 붙여 왼쪽 이미지 하단과 맞춤 */}
          <div className="flex h-full min-h-0 flex-col">
            <Reveal>
              <p className="mb-6 text-[11px] font-medium uppercase tracking-[0.35em] text-gold-accent/90">Yonsei Mi Clinic</p>
              <div className="mb-8 h-px w-16 bg-gradient-to-r from-gold-accent via-gold-accent/60 to-transparent" />
            </Reveal>

            <Reveal delay={0.05}>
              <h2
                className="mb-8 max-w-[20ch] text-charcoal tracking-[-0.02em]"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(2.35rem, 4.2vw, 3.35rem)",
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

            <Reveal delay={0.1}>
              <p className="mb-5 max-w-prose text-lg font-normal leading-[1.75] text-charcoal/88 sm:text-xl">
                안녕하세요 연세미의원입니다. 진료과 1인 대표원장의 상담 및 시술 책임제 병원으로서 경주의 아름다움을 선도하고 있는 병원입니다.
              </p>
            </Reveal>

            <Reveal delay={0.14}>
              <p className="mb-8 max-w-prose border-l border-gold-accent/35 pl-5 text-base font-normal leading-relaxed text-muted-foreground">
                공장형 네트워크 병원과는 다른 시술 퀄리티를 보장합니다.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-muted-foreground/80">Signature care</p>
              <div className="mb-12 flex flex-wrap gap-2">
                {services.map((label) => (
                  <span
                    key={label}
                    className="inline-flex rounded-md border border-gold-accent/25 bg-white/45 px-3 py-1.5 text-[11px] font-medium tracking-wide text-charcoal/70 shadow-sm backdrop-blur-sm transition-colors hover:border-gold-accent/45 hover:text-charcoal"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.22} className="mt-auto">
              <div className="rounded-xl border border-gold-accent/20 bg-white/25 p-6 shadow-[0_20px_50px_-28px_rgba(45,38,32,0.2)] backdrop-blur-md sm:p-8">
                <ul className="space-y-10">
                  {features.map((item) => (
                    <li key={item.title} className="flex gap-5 sm:gap-6">
                      <div
                        className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-amber-200/90 text-[#3d3319] shadow-[0_4px_16px_-4px_rgba(100,72,28,0.35),inset_0_1px_0_rgba(255,255,255,0.55)] ring-1 ring-inset ring-white/40 transition-[transform,box-shadow] duration-300 hover:scale-[1.03] hover:shadow-[0_6px_20px_-4px_rgba(100,72,28,0.42),inset_0_1px_0_rgba(255,255,255,0.6)]"
                        style={{
                          background:
                            "linear-gradient(145deg, #fdf6e4 0%, #f0dfa8 28%, #d4b76a 55%, #b8943f 78%, #9a7828 100%)",
                        }}
                        aria-hidden
                      >
                        <span
                          className="pointer-events-none absolute inset-0 rounded-lg opacity-70"
                          style={{
                            background:
                              "linear-gradient(165deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.08) 38%, transparent 52%, rgba(80,55,20,0.12) 100%)",
                          }}
                        />
                        <span className="pointer-events-none absolute inset-[2px] rounded-[5px] ring-1 ring-amber-950/[0.06]" />
                        <span className="relative drop-shadow-[0_1px_0_rgba(255,255,255,0.35)]">{item.icon}</span>
                      </div>
                      <div className="min-w-0 pt-0.5">
                        <h3 className="mb-2 text-base font-semibold tracking-tight text-charcoal">{item.title}</h3>
                        <p className="text-sm font-normal leading-relaxed text-muted-foreground sm:text-[15px]">{item.body}</p>
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
