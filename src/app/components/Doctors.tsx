import { ImageWithFallback } from "./figma/ImageWithFallback";

const DIRECTOR = {
  name: "심형경",
  role: "대표원장",
  image: "/images/doctor-shim-hyeong-gyeong.png",
  credentials: [
    "경상대학교 의과대학 졸업",
    "고려대학교 의과대학 외래교수",
    "서울다빈치의원 피부과원장",
    "중국우한한진성형병원 피부과원장",
    "중국선전연수성형병원 피부과원장",
    "대구파르베의원 피부과 원장",
    "한국미용외과의학회 정회원",
    "한국피부비만성형학회 정회원",
    "대한비만체형학회 정회원",
    "대한레이져피부모발학회 정회원",
  ],
} as const;

export function Doctors() {
  return (
    <section id="doctors" className="relative bg-background px-6 py-12 sm:py-24 lg:py-32">
      <div className="max-w-6xl mx-auto">
        <div className="mx-auto mb-8 max-w-3xl text-center md:mb-16 lg:mb-20">
          <div className="mx-auto mb-4 h-px w-12 bg-gold-accent md:mb-8" />
          <h2
            className="mb-3 text-charcoal tracking-tight md:mb-6"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "3.5rem",
              lineHeight: "1.1",
              fontWeight: "500",
            }}
          >
            Meet Our Specialists
          </h2>
          <p className="mb-3 text-lg font-medium leading-relaxed text-charcoal/90 [word-break:keep-all] sm:mb-4 sm:text-xl">
            20년의 숙련도, 확신 있는 결과.
          </p>
          <p className="mx-auto max-w-[32ch] text-base sm:text-lg text-muted-foreground leading-relaxed [word-break:keep-all]">
            상담부터 시술, 사후 관리까지
            <br className="sm:hidden" />
            대표원장이 직접 책임집니다.
          </p>
        </div>

        <div className="grid w-full items-start justify-center gap-6 lg:grid-cols-[minmax(0,420px)_minmax(0,600px)] lg:items-stretch lg:gap-20 lg:translate-x-10 xl:gap-24 xl:translate-x-14">
          <div className="flex justify-center lg:justify-end lg:items-end w-full">
            <div className="relative w-full max-w-md lg:h-full">
              <div className="relative h-[min(52vh,420px)] overflow-hidden bg-muted shadow-xl sm:h-[480px] md:h-[560px] lg:h-full">
                <ImageWithFallback
                  src={DIRECTOR.image}
                  alt={`${DIRECTOR.name} ${DIRECTOR.role}`}
                  className="w-full h-full object-cover object-bottom"
                />
              </div>
            </div>
          </div>

          <div className="pt-0 lg:pt-4 max-w-xl mx-auto w-full lg:max-w-none lg:mx-0 lg:pl-6 xl:pl-8">
            <p className="mb-4 text-sm font-medium tracking-[0.15em] text-gold-accent md:mb-6">
              [ 의료진 소개 ]
            </p>
            <h3
              className="text-charcoal mb-2"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2rem, 4vw, 2.75rem)",
                fontWeight: "500",
                lineHeight: "1.2",
              }}
            >
              {DIRECTOR.name}{" "}
              <span className="text-charcoal/90 text-[0.92em] font-normal">
                {DIRECTOR.role}
              </span>
            </h3>
            <div className="mb-6 border-b border-charcoal/10 pb-6 md:mb-10 md:pb-10" />

            <ul className="space-y-2.5 md:space-y-3.5">
              {DIRECTOR.credentials.map((line) => (
                <li key={line} className="flex items-start gap-3.5">
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-accent"
                    aria-hidden
                  />
                  <span className="text-base text-muted-foreground leading-relaxed">
                    {line}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
