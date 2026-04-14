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
    <section id="doctors" className="py-20 sm:py-24 lg:py-32 px-6 bg-background relative">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-3xl mx-auto mb-16 lg:mb-20 text-center">
          <div className="w-12 h-px bg-gold-accent mb-8 mx-auto" />
          <h2
            className="mb-6 text-charcoal tracking-tight"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "3.5rem",
              lineHeight: "1.1",
              fontWeight: "500",
            }}
          >
            Meet Our Specialists
          </h2>
          <p className="text-lg sm:text-xl text-charcoal/90 leading-relaxed font-medium mb-4 [word-break:keep-all]">
            20년의 숙련도, 확신 있는 결과.
          </p>
          <p className="mx-auto max-w-[32ch] text-base sm:text-lg text-muted-foreground leading-relaxed [word-break:keep-all]">
            상담부터 시술, 사후 관리까지
            <br className="sm:hidden" />
            대표원장이 직접 책임집니다.
          </p>
        </div>

        <div className="w-full grid lg:grid-cols-[minmax(0,420px)_minmax(0,600px)] justify-center gap-12 lg:gap-20 xl:gap-24 items-start lg:items-stretch lg:translate-x-10 xl:translate-x-14">
          <div className="flex justify-center lg:justify-end lg:items-end w-full">
            <div className="relative w-full max-w-md lg:h-full">
              <div className="relative h-[560px] lg:h-full overflow-hidden bg-muted shadow-xl">
                <ImageWithFallback
                  src={DIRECTOR.image}
                  alt={`${DIRECTOR.name} ${DIRECTOR.role}`}
                  className="w-full h-full object-cover object-bottom"
                />
              </div>
            </div>
          </div>

          <div className="pt-0 lg:pt-4 max-w-xl mx-auto w-full lg:max-w-none lg:mx-0 lg:pl-6 xl:pl-8">
            <p className="text-sm tracking-[0.15em] text-gold-accent mb-6 font-medium">
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
            <div className="mb-10 pb-10 border-b border-charcoal/10" />

            <ul className="space-y-3.5">
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
