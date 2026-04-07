import { ImageWithFallback } from "./figma/ImageWithFallback";

const DIRECTOR = {
  name: "심형경",
  role: "대표원장",
  specialty: "피부과 전문의",
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
    <section id="doctors" className="py-32 px-6 bg-background relative">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-3xl mb-16 lg:mb-20">
          <div className="w-12 h-px bg-gold-accent mb-8" />
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
          <p className="text-xl text-muted-foreground leading-relaxed">
            피부과 전문의로 구성된 최고의 의료진이 여러분을 기다립니다
          </p>
        </div>

        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] gap-12 lg:gap-16 items-start">
          <div className="relative max-w-md mx-auto lg:mx-0 w-full">
            <div className="relative aspect-[3/4] overflow-hidden bg-muted shadow-xl">
              <ImageWithFallback
                src={DIRECTOR.image}
                alt={`${DIRECTOR.name} ${DIRECTOR.role}`}
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute top-4 right-4 w-16 h-16 border border-gold-accent/50 pointer-events-none" />
            </div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 border border-gold-accent/20 -z-10 hidden lg:block" />
          </div>

          <div className="pt-0 lg:pt-4">
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
            <p className="text-muted-foreground text-lg mb-10 pb-10 border-b border-charcoal/10">
              {DIRECTOR.specialty}
            </p>

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
