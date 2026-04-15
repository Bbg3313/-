import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Link } from "react-router";
import { SITE_LINKS } from "../config/siteLinks";

export function Services() {
  const isExternalReservation = /^https?:\/\//.test(SITE_LINKS.reservation);
  const services = [
    {
      title: "일반 피부과",
      subtitle: "General Dermatology",
      description: "여드름, 아토피, 건선 등 피부 질환을 정확하게 진단·치료합니다.",
      image: "https://images.unsplash.com/photo-1710580889701-9fa8f2cd5927?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxoZWFsdGh5JTIwc2tpbiUyMHRleHR1cmUlMjBuYXR1cmFsJTIwbGlnaHR8ZW58MXx8fHwxNzc1NDYyNzIwfDA&ixlib=rb-4.1.0&q=80&w=1080",
      size: "large",
    },
    {
      title: "미용 피부과",
      subtitle: "Cosmetic Dermatology",
      description: "레이저 토닝, 필러, 보톡스 등 맞춤 미용 시술을 제공합니다.",
      image: "/images/cosmetic-derm.png",
      size: "medium",
    },
    {
      title: "안티에이징",
      subtitle: "Anti-Aging",
      description: "주름 개선과 탄력 증진으로 젊고 건강한 피부를 관리합니다.",
      image: "/images/anti-aging.png",
      size: "medium",
    },
    {
      title: "색소 치료",
      subtitle: "Pigmentation Treatment",
      description: "기미, 주근깨, 잡티 등 색소 질환을 정밀하게 개선합니다.",
      image: "https://images.unsplash.com/photo-1741278232341-33534050414c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw2fHxoZWFsdGh5JTIwc2tpbiUyMHRleHR1cmUlMjBuYXR1cmFsJTIwbGlnaHR8ZW58MXx8fHwxNzc1NDYyNzIwfDA&ixlib=rb-4.1.0&q=80&w=1080",
      size: "small",
    },
    {
      title: "레이저 시술",
      subtitle: "Laser Treatment",
      description: "최신 레이저 장비로 안전하고 효과적인 시술을 제공합니다.",
      image: "/images/laser-treatment.png",
      size: "medium",
    },
    {
      title: "화상진료",
      subtitle: "Telemedicine",
      description:
        "내원 전 상담이 필요하거나 경과 확인이 필요한 경우, 영상 통화를 통해 간편하게 상담과 진료 안내를 도와드립니다.",
      image: "/images/telemedicine-original.png",
      size: "small",
    },
  ];

  return (
    <section id="services" className="relative bg-background px-6 py-12 sm:py-24 lg:py-32">
      {/* Subtle decorative element */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="max-w-7xl mx-auto">
        {/* Header with elegant typography */}
        <div className="mb-10 max-w-2xl md:mb-20 lg:mb-24">
          <div className="mb-4 h-px w-12 bg-primary md:mb-8" />
          <h2
            className="mb-3 text-foreground tracking-tight md:mb-6"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: "3.5rem", lineHeight: "1.1", fontWeight: "600" }}
          >
            Medical Services
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed [word-break:keep-all]">
            피부과 전문의의 전문적인 진료와 최신 시술로 건강하고 아름다운 피부를 만들어드립니다.
          </p>
        </div>

        {/* 모바일만: 3열, 열당 2장 세로 스택 (총 6장) — 카드·글자 크게 */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 md:hidden">
          {(
            [
              [services[0], services[1]],
              [services[2], services[3]],
              [services[4], services[5]],
            ] as const
          ).map((pair, col) => (
            <div key={col} className="flex min-h-0 flex-col gap-2.5 sm:gap-3">
              {pair.map((service) => (
                <div
                  key={service.title}
                  className="group relative min-h-[13.5rem] flex-1 overflow-hidden rounded-xl border border-border/50 bg-card shadow-md sm:min-h-[15.5rem]"
                >
                  <ImageWithFallback
                    src={service.image}
                    alt={service.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-2.5 pb-3 pt-10 sm:p-3 sm:pb-3.5 sm:pt-12">
                    <p className="line-clamp-1 text-[10px] font-medium uppercase tracking-wide text-white/65 sm:text-xs">
                      {service.subtitle}
                    </p>
                    <h3
                      className="mt-1 line-clamp-2 text-xs font-semibold leading-snug text-white [word-break:keep-all] sm:text-sm sm:leading-tight"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {service.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Masonry grid layout — 태블릿·데스크톱 */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-12 gap-6 auto-rows-auto">
          {/* Large card - spans 7 columns */}
          <div className="lg:col-span-7 group">
            <div className="relative h-[600px] overflow-hidden bg-card shadow-sm hover:shadow-xl transition-all duration-700">
              <ImageWithFallback
                src={services[0].image}
                alt={services[0].title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-12">
                <p className="text-white/60 text-sm tracking-widest mb-3 uppercase">
                  {services[0].subtitle}
                </p>
                <h3
                  className="mb-4 text-white text-[1.9rem] leading-[1.2] sm:text-[2.5rem]"
                  style={{ fontFamily: "'Playfair Display', serif", fontWeight: "600" }}
                >
                  {services[0].title}
                </h3>
                <p className="text-[0.9rem] sm:text-[0.95rem] leading-relaxed text-white/80 whitespace-normal sm:whitespace-nowrap [word-break:keep-all]">
                  {services[0].description}
                </p>
              </div>
            </div>
          </div>

          {/* Medium cards - span 5 columns */}
          <div className="lg:col-span-5 space-y-6">
            {services.slice(1, 3).map((service, index) => (
              <div key={index} className="group">
                <div className="relative h-[290px] overflow-hidden bg-card shadow-sm hover:shadow-xl transition-all duration-700">
                  <ImageWithFallback
                    src={service.image}
                    alt={service.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <p className="text-white/60 text-xs tracking-widest mb-2 uppercase">
                      {service.subtitle}
                    </p>
                    <h3
                      className="text-white mb-3"
                      style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.75rem", lineHeight: "1.2", fontWeight: "600" }}
                    >
                      {service.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-white/80 whitespace-normal sm:whitespace-nowrap [word-break:keep-all]">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Small cards - 4 columns each */}
          <div className="lg:col-span-4 group">
            <div className="relative h-[400px] overflow-hidden bg-card shadow-sm hover:shadow-xl transition-all duration-700">
              <ImageWithFallback
                src={services[3].image}
                alt={services[3].title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <p className="text-white/60 text-xs tracking-widest mb-2 uppercase">
                  {services[3].subtitle}
                </p>
                <h3
                  className="text-white mb-3"
                  style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.75rem", lineHeight: "1.2", fontWeight: "600" }}
                >
                  {services[3].title}
                </h3>
                <p className="text-sm leading-relaxed text-white/80 whitespace-normal sm:whitespace-nowrap [word-break:keep-all]">
                  {services[3].description}
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 group">
            <div className="relative h-[400px] overflow-hidden bg-card shadow-sm hover:shadow-xl transition-all duration-700">
              <ImageWithFallback
                src={services[4].image}
                alt={services[4].title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <p className="text-white/60 text-xs tracking-widest mb-2 uppercase">
                  {services[4].subtitle}
                </p>
                <h3
                  className="text-white mb-3"
                  style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.75rem", lineHeight: "1.2", fontWeight: "600" }}
                >
                  {services[4].title}
                </h3>
                <p className="text-sm leading-relaxed text-white/80 whitespace-normal sm:whitespace-nowrap [word-break:keep-all]">
                  {services[4].description}
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 group">
            <div className="relative h-[400px] overflow-hidden bg-card shadow-sm hover:shadow-xl transition-all duration-700">
              <ImageWithFallback
                src={services[5].image}
                alt={services[5].title}
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <p className="text-white/60 text-xs tracking-widest mb-2 uppercase">
                  {services[5].subtitle}
                </p>
                <h3
                  className="text-white mb-3"
                  style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.75rem", lineHeight: "1.2", fontWeight: "600" }}
                >
                  {services[5].title}
                </h3>
                <p className="text-white/80 text-sm leading-relaxed [word-break:keep-all]">
                  {services[5].description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA section */}
        <div className="mt-12 text-center md:mt-24">
          {isExternalReservation ? (
            <a
              href={SITE_LINKS.reservation}
              target="_blank"
              rel="noreferrer"
              className="group relative inline-flex px-12 py-4 bg-primary text-primary-foreground overflow-hidden transition-all duration-500 hover:shadow-lg"
            >
              <span className="relative z-10 tracking-wider text-sm uppercase">상담 예약하기</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            </a>
          ) : (
            <Link
              to={SITE_LINKS.reservation}
              className="group relative inline-flex px-12 py-4 bg-primary text-primary-foreground overflow-hidden transition-all duration-500 hover:shadow-lg"
            >
              <span className="relative z-10 tracking-wider text-sm uppercase">상담 예약하기</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            </Link>
          )}
        </div>
      </div>

      {/* Bottom decorative element */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
    </section>
  );
}
