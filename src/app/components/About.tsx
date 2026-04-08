import { ImageWithFallback } from "./figma/ImageWithFallback";

export function About() {
  return (
    <section id="about" className="py-20 sm:py-24 lg:py-32 px-6 bg-champagne relative overflow-hidden">
      {/* Subtle decorative element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-radial from-gold-accent/10 to-transparent blur-3xl" />

      <div className="max-w-7xl mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-20 items-stretch">
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
          <div className="h-full flex flex-col">
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

            <p className="text-xl text-charcoal/90 mb-6 leading-relaxed">
              안녕하세요 연세미의원입니다. 진료과 1인 대표원장의 상담 및 시술 책임제 병원으로서 경주의 아름다움을 선도하고 있는 병원입니다.
            </p>

            <p className="text-muted-foreground mb-12 leading-relaxed text-lg">
              공장형 네트워크 병원과는 다른 시술 퀄리티를 보장합니다.
              <br />
              <span className="inline-block mt-1 text-[0.95em] text-charcoal/55 whitespace-nowrap">
                보톡스 / 필러 / 레이저토닝 / 레이저 리프팅 / 실리프팅 / 다이어트 약 / 스킨부스터
              </span>
            </p>

            {/* Features */}
            <div className="space-y-8 mt-auto">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 border border-gold-accent/45 bg-gold-accent/5 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-gold-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 12.75L11.4 14.4 14.25 10.95" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3.75l6.75 2.25v5.7c0 4.425-2.85 7.95-6.75 8.55-3.9-.6-6.75-4.125-6.75-8.55V6l6.75-2.25z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-charcoal mb-2 tracking-wide" style={{ fontWeight: "500" }}>
                    양심적인 진료
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    고민을 나눌 동반자로서 정직하고 신중한 진료를 약속드립니다.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 border border-gold-accent/45 bg-gold-accent/5 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-gold-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 10.5A4.5 4.5 0 1112 15a4.5 4.5 0 01-4.5-4.5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 20.25c1.8-2.7 4.65-4.125 8.25-4.125s6.45 1.425 8.25 4.125" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-charcoal mb-2 tracking-wide" style={{ fontWeight: "500" }}>
                    배려하는 임직원
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    따스한 말과 행동으로 편안하고 신뢰할 수 있는 진료 환경을 만듭니다.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 border border-gold-accent/45 bg-gold-accent/5 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-gold-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75v5.25l3.75 2.25" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-charcoal mb-2 tracking-wide" style={{ fontWeight: "500" }}>
                    대표원장 1:1 책임 전담제
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    상담부터 사후 관리까지 대표원장이 직접 책임지고 끝까지 함께합니다.
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
