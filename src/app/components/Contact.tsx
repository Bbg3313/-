import { useState } from "react";
import { PrivacyPolicyContent } from "./PrivacyPolicyContent";

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
                  <div>
                    <h4 className="text-charcoal mb-2 tracking-wide" style={{ fontWeight: "500" }}>
                      Address
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      경북 경주시 화랑로 132, 2층
                      <br />
                      연세미의원
                    </p>
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
                      Phone
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">054-772-8575</p>
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
                  <div>
                    <h4 className="text-charcoal mb-2 tracking-wide" style={{ fontWeight: "500" }}>
                      Hours
                    </h4>
                    <div className="text-muted-foreground leading-relaxed space-y-1">
                      <p>평일: 오전 10시 - 오후 7시</p>
                      <p>토요일: 오전 10시 - 오후 2시</p>
                      <p className="text-destructive">일요일 및 공휴일 휴진</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="h-[300px] bg-muted flex items-center justify-center border border-border">
              <div className="text-center">
                <svg
                  className="w-16 h-16 mx-auto mb-4 text-muted-foreground/30"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"
                  />
                </svg>
                <p className="text-muted-foreground">Map Location</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 mt-24 space-y-16 text-muted-foreground text-sm leading-relaxed">
        <section id="notice" className="scroll-mt-28 border-t border-border/50 pt-16">
          <h3
            className="text-charcoal text-xl mb-4 tracking-wide"
            style={{ fontFamily: "'Playfair Display', serif", fontWeight: 500 }}
          >
            공지사항
          </h3>
          <p>등록된 공지사항이 없습니다. 안내가 있을 경우 이곳에 게시됩니다.</p>
        </section>

        <section id="privacy" className="scroll-mt-28 border-t border-border/50 pt-16">
          <h3
            className="text-charcoal text-xl mb-6 tracking-wide"
            style={{ fontFamily: "'Playfair Display', serif", fontWeight: 500 }}
          >
            개인정보처리방침
          </h3>
          <PrivacyPolicyContent />
        </section>

        <section id="terms" className="scroll-mt-28 border-t border-border/50 pt-16">
          <h3
            className="text-charcoal text-xl mb-4 tracking-wide"
            style={{ fontFamily: "'Playfair Display', serif", fontWeight: 500 }}
          >
            서비스이용약관
          </h3>
          <div className="space-y-4">
            <p>
              본 웹사이트는 연세미의원의 진료 안내 및 예약·상담 신청을 위한 정보 제공 목적으로 운영됩니다.
            </p>
            <p>
              웹사이트에 게시된 정보는 참고용이며, 실제 진료는 의료진 판단에 따릅니다. 예약 후 변경·취소가 필요한
              경우 병원으로 연락해 주세요.
            </p>
            <p>
              이용자는 본 약관 및 관련 법령을 준수해야 하며, 허위 정보 제공·시스템 악용 등에 대해 병원은 서비스 이용을
              제한할 수 있습니다.
            </p>
          </div>
        </section>
      </div>

      <footer className="mt-24 pt-12 border-t border-border/50 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row lg:justify-between gap-10">
            <div className="text-sm text-muted-foreground space-y-2">
              <p className="text-charcoal font-medium text-base">연세미의원</p>
              <p>대표자 심형경</p>
              <p>사업자등록번호 587-10-03051</p>
              <p>주소 경북 경주시 화랑로 132, 2층 연세미의원</p>
            </div>
            <nav className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted-foreground items-start">
              <a href="#notice" className="hover:text-gold-accent transition-colors">
                공지사항
              </a>
              <a href="#privacy" className="hover:text-gold-accent transition-colors">
                개인정보처리방침
              </a>
              <a href="#terms" className="hover:text-gold-accent transition-colors">
                서비스이용약관
              </a>
            </nav>
          </div>
          <p className="text-muted-foreground text-xs mt-10">© 2026 연세미의원. All rights reserved.</p>
        </div>
      </footer>
    </section>
  );
}
