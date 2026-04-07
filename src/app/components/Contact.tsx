import { useState } from "react";

const GOOGLE_MAPS_EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3234.1930747588513!2d129.212623776708!3d35.844268972535126!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x35664e4195c7c2cf%3A0xa3a7117464dabddd!2z7Jew7IS466-47J2Y7JuQIOqyveyjvO2UvOu2gOqzvA!5e0!3m2!1sko!2skr!4v1775533999427!5m2!1sko!2skr";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    date: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <section id="contact" className="py-32 px-6 bg-background relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20">
          {/* Left - Booking Form */}
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
              Book Your<br />Consultation
            </h2>
            <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
              전문의와의 상담 예약을 통해 맞춤형 치료 계획을 시작하세요
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm tracking-wider uppercase text-charcoal/60 mb-3">
                  성함 *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-4 bg-champagne border-b border-gold-accent/30 focus:border-gold-accent outline-none transition-colors duration-300"
                  placeholder="이름을 입력하세요"
                />
              </div>

              {/* Phone & Email */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm tracking-wider uppercase text-charcoal/60 mb-3">
                    연락처 *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-6 py-4 bg-champagne border-b border-gold-accent/30 focus:border-gold-accent outline-none transition-colors duration-300"
                    placeholder="010-0000-0000"
                  />
                </div>

                <div>
                  <label className="block text-sm tracking-wider uppercase text-charcoal/60 mb-3">
                    이메일
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-6 py-4 bg-champagne border-b border-gold-accent/30 focus:border-gold-accent outline-none transition-colors duration-300"
                    placeholder="email@example.com"
                  />
                </div>
              </div>

              {/* Service Selection */}
              <div>
                <label className="block text-sm tracking-wider uppercase text-charcoal/60 mb-3">
                  상담 분야 *
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-4 bg-champagne border-b border-gold-accent/30 focus:border-gold-accent outline-none transition-colors duration-300 appearance-none cursor-pointer"
                >
                  <option value="">선택하세요</option>
                  <option value="general">일반 피부과</option>
                  <option value="cosmetic">미용 피부과</option>
                  <option value="antiaging">안티에이징</option>
                  <option value="pigmentation">색소 치료</option>
                  <option value="laser">레이저 시술</option>
                  <option value="skincare">피부 관리</option>
                </select>
              </div>

              {/* Preferred Date */}
              <div>
                <label className="block text-sm tracking-wider uppercase text-charcoal/60 mb-3">
                  희망 날짜
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-6 py-4 bg-champagne border-b border-gold-accent/30 focus:border-gold-accent outline-none transition-colors duration-300"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm tracking-wider uppercase text-charcoal/60 mb-3">
                  추가 문의사항
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-6 py-4 bg-champagne border-b border-gold-accent/30 focus:border-gold-accent outline-none transition-colors duration-300 resize-none"
                  placeholder="궁금하신 점을 자유롭게 작성해주세요"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="group relative w-full px-12 py-5 bg-primary text-primary-foreground overflow-hidden transition-all duration-500 hover:shadow-xl"
              >
                <span className="relative z-10 tracking-wider uppercase text-sm">
                  예약 신청하기
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              </button>

              <p className="text-xs text-muted-foreground text-center leading-relaxed">
                예약 신청 후 담당자가 확인하여 연락드립니다.
                <br />
                급한 문의는 전화로 연락 주시기 바랍니다.
              </p>
            </form>
          </div>

          {/* Right - Clinic Info */}
          <div>
            <div className="bg-champagne p-12 mb-8">
              <h3
                className="mb-8 text-charcoal"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "2rem",
                  fontWeight: "500",
                }}
              >
                Visit Us
              </h3>

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
                    <h4 className="text-charcoal mb-3 tracking-wide" style={{ fontWeight: "500" }}>
                      주소 · 오시는 길
                    </h4>
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
                    <h4 className="text-charcoal mb-2 tracking-wide" style={{ fontWeight: "500" }}>
                      전화
                    </h4>
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
                    <h4 className="text-charcoal mb-3 tracking-wide" style={{ fontWeight: "500" }}>
                      진료 시간
                    </h4>
                    <div className="border border-gold-accent/20 rounded-sm overflow-hidden text-sm">
                      <div className="grid grid-cols-[1fr_auto] gap-x-4 sm:gap-x-8 items-baseline px-4 py-2.5 border-b border-gold-accent/15 bg-champagne/80">
                        <span className="text-charcoal font-medium">월·목·금요일</span>
                        <span className="text-muted-foreground tabular-nums shrink-0">10:00 ~ 20:00</span>
                      </div>
                      <div className="grid grid-cols-[1fr_auto] gap-x-4 sm:gap-x-8 items-baseline px-4 py-2.5 border-b border-gold-accent/15">
                        <span className="text-charcoal font-medium">화·수요일</span>
                        <span className="text-muted-foreground tabular-nums shrink-0">10:00 ~ 18:00</span>
                      </div>
                      <div className="grid grid-cols-[1fr_auto] gap-x-4 sm:gap-x-8 items-baseline px-4 py-2.5 border-b border-gold-accent/15 bg-champagne/40">
                        <span className="text-charcoal font-medium">토요일</span>
                        <span className="text-muted-foreground tabular-nums shrink-0 text-right leading-snug">
                          10:00 ~ 15:00
                          <span className="text-muted-foreground/80 text-[11px] sm:text-xs font-normal block sm:inline sm:ml-1">
                            (점심시간 없음)
                          </span>
                        </span>
                      </div>
                      <div className="grid grid-cols-[1fr_auto] gap-x-4 sm:gap-x-8 items-baseline px-4 py-2.5 border-b border-gold-accent/15">
                        <span className="text-charcoal font-medium">점심시간</span>
                        <span className="text-muted-foreground tabular-nums shrink-0">13:00 ~ 14:00</span>
                      </div>
                      <p className="px-4 py-2.5 text-destructive text-xs sm:text-sm text-center bg-muted/30">
                        일요일·공휴일은 휴무입니다
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-border overflow-hidden bg-muted">
              <iframe
                src={GOOGLE_MAPS_EMBED_SRC}
                className="w-full h-[280px] sm:h-[340px] md:h-[450px] border-0 block"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="연세미의원 위치 — 구글 지도"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
