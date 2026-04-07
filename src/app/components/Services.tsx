import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Services() {
  const services = [
    {
      title: "일반 피부과",
      subtitle: "General Dermatology",
      description: "여드름, 아토피, 건선 등 다양한 피부 질환을 정확하게 진단하고 치료합니다.",
      image: "https://images.unsplash.com/photo-1710580889701-9fa8f2cd5927?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxoZWFsdGh5JTIwc2tpbiUyMHRleHR1cmUlMjBuYXR1cmFsJTIwbGlnaHR8ZW58MXx8fHwxNzc1NDYyNzIwfDA&ixlib=rb-4.1.0&q=80&w=1080",
      size: "large",
    },
    {
      title: "미용 피부과",
      subtitle: "Cosmetic Dermatology",
      description: "레이저 토닝, 필러, 보톡스 등 피부 미용 시술을 제공합니다.",
      image: "https://images.unsplash.com/photo-1773565744218-d8d11de58362?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxtaW5pbWFsaXN0JTIwc3BhJTIwbHV4dXJ5JTIwc2tpbmNhcmV8ZW58MXx8fHwxNzc1NDYyNzIwfDA&ixlib=rb-4.1.0&q=80&w=1080",
      size: "medium",
    },
    {
      title: "안티에이징",
      subtitle: "Anti-Aging",
      description: "주름 개선, 피부 탄력 증진 등 젊고 건강한 피부를 위한 관리를 제공합니다.",
      image: "https://images.unsplash.com/photo-1541752857837-f8a0154fd092?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwc2tpbiUyMHRleHR1cmUlMjBuYXR1cmFsJTIwbGlnaHR8ZW58MXx8fHwxNzc1NDYyNzIwfDA&ixlib=rb-4.1.0&q=80&w=1080",
      size: "medium",
    },
    {
      title: "색소 치료",
      subtitle: "Pigmentation Treatment",
      description: "기미, 주근깨, 잡티 등 색소 질환을 효과적으로 개선합니다.",
      image: "https://images.unsplash.com/photo-1741278232341-33534050414c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw2fHxoZWFsdGh5JTIwc2tpbiUyMHRleHR1cmUlMjBuYXR1cmFsJTIwbGlnaHR8ZW58MXx8fHwxNzc1NDYyNzIwfDA&ixlib=rb-4.1.0&q=80&w=1080",
      size: "small",
    },
    {
      title: "레이저 시술",
      subtitle: "Laser Treatment",
      description: "최신 레이저 장비를 활용한 안전하고 효과적인 시술을 제공합니다.",
      image: "https://images.unsplash.com/photo-1758188753373-5b01a0fc6d9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxtaW5pbWFsaXN0JTIwc3BhJTIwbHV4dXJ5JTIwc2tpbmNhcmV8ZW58MXx8fHwxNzc1NDYyNzIwfDA&ixlib=rb-4.1.0&q=80&w=1080",
      size: "medium",
    },
    {
      title: "피부 관리",
      subtitle: "Skin Care",
      description: "전문적인 스킨케어와 맞춤형 홈케어 프로그램을 제공합니다.",
      image: "https://images.unsplash.com/photo-1760862652442-e8ff7ebdd2f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxtaW5pbWFsaXN0JTIwc3BhJTIwbHV4dXJ5JTIwc2tpbmNhcmV8ZW58MXx8fHwxNzc1NDYyNzIwfDA&ixlib=rb-4.1.0&q=80&w=1080",
      size: "small",
    },
  ];

  return (
    <section id="services" className="py-20 sm:py-24 lg:py-32 px-6 bg-background relative">
      {/* Subtle decorative element */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="max-w-7xl mx-auto">
        {/* Header with elegant typography */}
        <div className="max-w-2xl mb-24">
          <div className="w-12 h-px bg-primary mb-8" />
          <h2
            className="mb-6 text-foreground tracking-tight"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: "3.5rem", lineHeight: "1.1", fontWeight: "600" }}
          >
            Medical Services
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            피부과 전문의의 전문적인 진료와 최신 시술로<br />건강하고 아름다운 피부를 만들어드립니다.
          </p>
        </div>

        {/* Masonry grid layout */}
        <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-6 auto-rows-auto">
          {/* Large card - spans 7 columns */}
          <div className="lg:col-span-7 group">
            <div className="relative h-[600px] overflow-hidden bg-card shadow-sm hover:shadow-xl transition-all duration-700">
              <ImageWithFallback
                src={services[0].image}
                alt={services[0].title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-12">
                <p className="text-white/60 text-sm tracking-widest mb-3 uppercase">
                  {services[0].subtitle}
                </p>
                <h3
                  className="text-white mb-4"
                  style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.5rem", lineHeight: "1.2", fontWeight: "600" }}
                >
                  {services[0].title}
                </h3>
                <p className="text-white/80 leading-relaxed max-w-md">
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
                    <p className="text-white/80 text-sm leading-relaxed">
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
                <p className="text-white/80 text-sm leading-relaxed">
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
                <p className="text-white/80 text-sm leading-relaxed">
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
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
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
                <p className="text-white/80 text-sm leading-relaxed">
                  {services[5].description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA section */}
        <div className="mt-24 text-center">
          <button className="group relative px-12 py-4 bg-primary text-primary-foreground overflow-hidden transition-all duration-500 hover:shadow-lg">
            <span className="relative z-10 tracking-wider text-sm uppercase">상담 예약하기</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          </button>
        </div>
      </div>

      {/* Bottom decorative element */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
    </section>
  );
}
