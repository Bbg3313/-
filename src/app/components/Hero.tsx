import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Large editorial background image */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1722185388507-0a46e2d9dcca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzcGElMjBuYXR1cmFsJTIwbGlnaHQlMjBtaW5pbWFsfGVufDF8fHx8MTc3NTQ2NDY2MXww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Luxury dermatology clinic"
          className="w-full h-full object-cover"
        />
        {/* Elegant gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 w-full">
        <div className="max-w-2xl">
          {/* Gold accent line */}
          <div className="w-16 h-0.5 bg-gradient-to-r from-gold-accent to-transparent mb-8" />

          {/* Main headline - elegant serif */}
          <h1
            className="text-white mb-8 tracking-tight leading-tight"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "4.5rem",
              fontWeight: "500",
              lineHeight: "1.1",
            }}
          >
            The Art of<br />Radiant Skin
          </h1>

          {/* Subheadline - Korean */}
          <p className="text-white/90 text-2xl mb-8 leading-relaxed">
            건강하고 아름다운 피부를 위한 전문 클리닉
          </p>

          {/* Description */}
          <p className="text-white/70 text-lg mb-12 leading-relaxed max-w-xl">
            피부과 전문의의 체계적인 진료와 최신 의료 장비로
            여러분의 피부 건강을 책임집니다
          </p>

          {/* CTA Buttons */}
          <div className="flex gap-4">
            <button className="group relative px-10 py-4 bg-primary text-primary-foreground overflow-hidden transition-all duration-500 hover:shadow-2xl">
              <span className="relative z-10 tracking-wider uppercase text-sm">예약 상담</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            </button>
            <button className="px-10 py-4 bg-white/10 text-white border border-white/30 backdrop-blur-sm hover:bg-white/20 transition-all duration-300">
              <span className="tracking-wider uppercase text-sm">클리닉 투어</span>
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10">
        <div className="flex flex-col items-center gap-2 text-white/60">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-16 bg-gradient-to-b from-white/60 to-transparent" />
        </div>
      </div>
    </section>
  );
}
