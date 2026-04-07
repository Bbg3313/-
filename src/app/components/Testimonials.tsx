export function Testimonials() {
  const testimonials = [
    {
      quote:
        "피부과 진료를 받으면서 이렇게 세심한 상담과 관리를 경험한 것은 처음입니다. 저의 피부 상태를 정확히 파악하고 맞춤형 치료를 제공해주셔서 정말 만족스러웠습니다.",
      author: "김은지",
      location: "서울, 강남구",
      treatment: "색소 레이저 치료",
    },
    {
      quote:
        "오랜 기간 고민했던 아토피가 전문의의 체계적인 치료로 많이 개선되었습니다. 클리닉의 청결하고 편안한 환경도 치료에 큰 도움이 되었습니다.",
      author: "박준호",
      location: "서울, 서초구",
      treatment: "아토피 피부염 치료",
    },
    {
      quote:
        "안티에이징 시술에 대해 많은 걱정이 있었는데, 원장님께서 자세히 설명해주시고 자연스러운 결과를 만들어주셨습니다. 주변에서 피부가 좋아졌다는 이야기를 많이 듣습니다.",
      author: "최서연",
      location: "서울, 송파구",
      treatment: "보톡스 & 필러",
    },
  ];

  return (
    <section id="testimonials" className="py-32 px-6 bg-champagne relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-gradient-radial from-gold-accent/5 to-transparent blur-3xl -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-gradient-radial from-gold-accent/5 to-transparent blur-3xl -translate-y-1/2" />

      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <div className="text-center mb-24">
          <div className="w-12 h-px bg-gold-accent mx-auto mb-8" />
          <h2
            className="mb-6 text-charcoal tracking-tight"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "3.5rem",
              lineHeight: "1.1",
              fontWeight: "500",
            }}
          >
            Patient Journeys
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            고객님들의 소중한 경험과 변화의 이야기
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group relative bg-white/60 backdrop-blur-sm p-12 hover:shadow-2xl transition-all duration-500"
            >
              {/* Quote mark */}
              <div className="absolute top-8 left-8">
                <svg
                  className="w-12 h-12 text-gold-accent/30"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                </svg>
              </div>

              {/* Quote */}
              <blockquote
                className="mb-8 mt-8 text-charcoal/80 leading-relaxed"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.25rem",
                  fontStyle: "italic",
                  lineHeight: "1.8",
                }}
              >
                {testimonial.quote}
              </blockquote>

              {/* Author Info */}
              <div className="border-t border-gold-accent/20 pt-6">
                <p className="text-charcoal mb-1" style={{ fontWeight: "500" }}>
                  {testimonial.author}
                </p>
                <p className="text-sm text-muted-foreground mb-2">
                  {testimonial.location}
                </p>
                <p className="text-xs tracking-widest uppercase text-gold-accent">
                  {testimonial.treatment}
                </p>
              </div>

              {/* Decorative corner */}
              <div className="absolute bottom-0 right-0 w-24 h-24 border-r border-b border-gold-accent/20 group-hover:border-gold-accent/40 transition-colors duration-500" />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-20">
          <p className="text-muted-foreground mb-6">
            당신의 피부 고민을 전문의와 함께 해결하세요
          </p>
          <button className="group relative px-12 py-4 bg-primary text-primary-foreground overflow-hidden transition-all duration-500 hover:shadow-lg">
            <span className="relative z-10 tracking-wider text-sm uppercase">무료 상담 신청</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          </button>
        </div>
      </div>
    </section>
  );
}
