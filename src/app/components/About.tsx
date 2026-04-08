import { ImageWithFallback } from "./figma/ImageWithFallback";

export function About() {
  return (
    <section id="about" className="py-20 sm:py-24 lg:py-32 px-6 bg-champagne relative overflow-hidden">
      {/* Subtle decorative element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-radial from-gold-accent/10 to-transparent blur-3xl" />

      <div className="max-w-7xl mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left - Images Grid */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-6">
              {/* Large image */}
              <div className="col-span-2 relative h-[400px] overflow-hidden">
                <ImageWithFallback
                  src="/images/about-clinic-main.png"
                  alt="Modern clinic interior"
                  className="w-full h-full object-cover shadow-2xl"
                />
              </div>

              {/* Two smaller images */}
              <div className="relative h-[250px] overflow-hidden">
                <ImageWithFallback
                  src="/images/about-clinic-room.png"
                  alt="Clinic waiting area"
                  className="w-full h-full object-cover shadow-xl"
                />
              </div>

              <div className="relative h-[250px] overflow-hidden">
                <ImageWithFallback
                  src="/images/about-clinic-lobby.png"
                  alt="Clinic environment"
                  className="w-full h-full object-cover shadow-xl"
                />
              </div>
            </div>

            {/* Gold accent frame */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 border border-gold-accent/30 -z-10" />
          </div>

          {/* Right - Content */}
          <div>
            <div className="w-12 h-px bg-gold-accent mb-8" />

            <h2
              className="mb-6 text-charcoal tracking-tight"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "3rem",
                lineHeight: "1.2",
                fontWeight: "500",
              }}
            >
              Where Science<br />Meets Beauty
            </h2>

            <p className="text-xl text-charcoal/80 mb-8 leading-relaxed">
              전문성과 예술성의 완벽한 조화
            </p>

            <p className="text-muted-foreground mb-12 leading-relaxed text-lg">
              풍부한 임상 경험과 끊임없는 연구를 통해 최상의 진료를 제공하는 피부과 전문의가 직접 진료합니다.
              개인별 피부 특성을 세밀하게 분석하여 맞춤형 치료 계획을 수립합니다.
            </p>

            {/* Features with elegant line icons */}
            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 border border-gold-accent/40 flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 text-gold-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-charcoal mb-2 tracking-wide" style={{ fontWeight: "500" }}>
                    피부과 전문의 자격
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    대한피부과학회 정회원, 국제 학술지 논문 발표 다수
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 border border-gold-accent/40 flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 text-gold-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-charcoal mb-2 tracking-wide" style={{ fontWeight: "500" }}>
                    최신 의료 장비
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    FDA 승인 레이저 및 첨단 피부 진단 시스템 완비
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 border border-gold-accent/40 flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 text-gold-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-charcoal mb-2 tracking-wide" style={{ fontWeight: "500" }}>
                    맞춤형 케어
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    개인별 피부 상태 분석을 통한 최적의 치료 계획 수립
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
