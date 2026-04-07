import React from "react";

const NAVER_RESERVATION_URL =
  "https://map.naver.com/p/entry/place/1084784069?placePath=/home?from=map&fromPanelNum=1&additionalHeight=76&timestamp=202604071448&locale=ko&svcName=map_pcv5&c=16.52,0,0,0,dh";

const GOOGLE_MAPS_EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3234.1930747588513!2d129.212623776708!3d35.844268972535126!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x35664e4195c7c2cf%3A0xa3a7117464dabddd!2z7Jew7IS466-47J2Y7JuQIOqyveyjvO2UvOu2gOqzvA!5e0!3m2!1sko!2skr!4v1775533999427!5m2!1sko!2skr";

export function Contact() {
  return (
    <section id="contact" className="py-32 px-6 bg-background relative">
      <div className="max-w-7xl mx-auto">
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
            Visit Us
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            오시는 길, 진료 시간, 예약 안내를 확인하세요
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
          {/* Map — left on large screens; below Visit Us on mobile */}
          <div className="order-2 lg:order-1 min-h-[280px] sm:min-h-[340px] lg:min-h-[520px]">
            <div className="border border-border overflow-hidden bg-muted h-full min-h-[inherit]">
              <iframe
                src={GOOGLE_MAPS_EMBED_SRC}
                className="w-full h-full min-h-[280px] sm:min-h-[340px] lg:min-h-[520px] border-0 block"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="연세미의원 위치 — 구글 지도"
              />
            </div>
          </div>

          {/* Visit Us — right on large screens; first on mobile */}
          <div className="order-1 lg:order-2">
            <div className="bg-champagne p-8 sm:p-12 h-full">
              <div className="space-y-8">
                {/* Address */}
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 border border-gold-accent/40 flex items-center justify-center shrink-0">
                    <svg
                      className="w-5 h-5 text-gold-accent"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                      />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-charcoal mb-3 tracking-wide" style={{ fontWeight: "500" }}>
                      주소 · 오시는 길
                    </h3>
                    <div className="text-muted-foreground text-sm leading-relaxed space-y-3">
                      <p className="text-charcoal/90 font-medium">
                        경북 경주시 화랑로 132, 2층 연세미의원
                      </p>
                      <p className="text-muted-foreground">(경주역 우체국 옆 GS편의점 2층)</p>
                      <ul className="space-y-2 pt-1 border-t border-gold-accent/15">
                        <li className="flex gap-2">
                          <span className="text-gold-accent shrink-0 font-medium" aria-hidden>
                            ·
                          </span>
                          <span>경주역 역전삼거리에서 KT삼거리 방향으로 약 150m 직진</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-gold-accent shrink-0 font-medium" aria-hidden>
                            ·
                          </span>
                          <span>경주우체국 버스정류장 도보 1분</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-gold-accent shrink-0 font-medium" aria-hidden>
                            ·
                          </span>
                          <span>건물 외부 1층에 노상 유료주차장</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 border border-gold-accent/40 flex items-center justify-center shrink-0">
                    <svg
                      className="w-5 h-5 text-gold-accent"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-charcoal mb-2 tracking-wide" style={{ fontWeight: "500" }}>
                      전화
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      <a href="tel:0547728575" className="text-gold-accent hover:underline underline-offset-2">
                        054-772-8575
                      </a>
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 border border-gold-accent/40 flex items-center justify-center shrink-0">
                    <svg
                      className="w-5 h-5 text-gold-accent"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-charcoal mb-3 tracking-wide" style={{ fontWeight: "500" }}>
                      진료 시간
                    </h3>
                    <div className="border border-gold-accent/20 rounded-sm overflow-hidden text-sm">
                      <dl className="divide-y divide-gold-accent/15">
                        <div className="flex items-center justify-between gap-6 px-4 py-3 bg-champagne/70">
                          <dt className="text-charcoal font-medium">월·목·금</dt>
                          <dd className="text-muted-foreground tabular-nums shrink-0">10:00 – 20:00</dd>
                        </div>
                        <div className="flex items-center justify-between gap-6 px-4 py-3">
                          <dt className="text-charcoal font-medium">화·수</dt>
                          <dd className="text-muted-foreground tabular-nums shrink-0">10:00 – 18:00</dd>
                        </div>
                        <div className="flex items-start justify-between gap-6 px-4 py-3 bg-champagne/40">
                          <dt className="text-charcoal font-medium">토</dt>
                          <dd className="text-muted-foreground tabular-nums shrink-0 text-right leading-snug">
                            10:00 – 15:00
                            <span className="text-muted-foreground/80 text-[11px] sm:text-xs font-normal block">
                              (점심시간 없음)
                            </span>
                          </dd>
                        </div>
                        <div className="flex items-center justify-between gap-6 px-4 py-3">
                          <dt className="text-charcoal font-medium">점심</dt>
                          <dd className="text-muted-foreground tabular-nums shrink-0">13:00 – 14:00</dd>
                        </div>
                      </dl>
                      <p className="px-4 py-3 text-destructive text-xs sm:text-sm text-center bg-muted/30">
                        일요일·공휴일은 휴무입니다
                      </p>
                    </div>

                    <div className="mt-6">
                      <a
                        href={NAVER_RESERVATION_URL}
                        target="_blank"
                        rel="noreferrer"
                        className="group relative inline-flex w-full items-center justify-center px-10 py-4 bg-primary text-primary-foreground overflow-hidden transition-all duration-500 hover:shadow-xl"
                      >
                        <span className="relative z-10 tracking-wider uppercase text-sm">예약하기</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                      </a>
                      <p className="mt-3 text-xs text-muted-foreground leading-relaxed text-center">
                        버튼을 누르면 네이버 지도로 이동합니다.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
