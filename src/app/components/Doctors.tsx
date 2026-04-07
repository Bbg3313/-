import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Doctors() {
  const doctors = [
    {
      name: "김민지",
      title: "대표 원장",
      specialty: "피부과 전문의",
      credentials: [
        "서울대학교 의과대학 졸업",
        "세브란스병원 피부과 전문의",
        "대한피부과학회 정회원",
      ],
      image: "https://images.unsplash.com/photo-1758691461516-7e716e0ca135?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxwcm9mZXNzaW9uYWwlMjBkb2N0b3IlMjBwb3J0cmFpdCUyMG1lZGljYWx8ZW58MXx8fHwxNzc1NDY0NjYxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      name: "이서준",
      title: "진료 원장",
      specialty: "레이저 및 미용 피부과",
      credentials: [
        "연세대학교 의과대학 졸업",
        "삼성서울병원 피부과 전문의",
        "대한레이저의학회 정회원",
      ],
      image: "https://images.unsplash.com/photo-1615177393114-bd2917a4f74a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw2fHxwcm9mZXNzaW9uYWwlMjBkb2N0b3IlMjBwb3J0cmFpdCUyMG1lZGljYWx8ZW58MXx8fHwxNzc1NDY0NjYxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      name: "박지원",
      title: "진료 원장",
      specialty: "아토피 및 피부질환",
      credentials: [
        "가톨릭대학교 의과대학 졸업",
        "서울아산병원 피부과 전문의",
        "대한피부연구학회 정회원",
      ],
      image: "https://images.unsplash.com/photo-1614105687119-93b4f75e8ca9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw3fHxwcm9mZXNzaW9uYWwlMjBkb2N0b3IlMjBwb3J0cmFpdCUyMG1lZGljYWx8ZW58MXx8fHwxNzc1NDY0NjYxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ];

  return (
    <section id="doctors" className="py-32 px-6 bg-background relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-24">
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

        {/* Doctors Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {doctors.map((doctor, index) => (
            <div key={index} className="group">
              {/* Doctor Image */}
              <div className="relative h-[500px] overflow-hidden mb-8 bg-muted">
                <ImageWithFallback
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Gold accent border */}
                <div className="absolute top-4 right-4 w-16 h-16 border border-gold-accent/50 group-hover:border-gold-accent transition-colors duration-500" />
              </div>

              {/* Doctor Info */}
              <div>
                <p className="text-sm tracking-widest uppercase text-gold-accent mb-2">
                  {doctor.title}
                </p>
                <h3
                  className="text-charcoal mb-2"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "2rem",
                    fontWeight: "500",
                  }}
                >
                  {doctor.name}
                </h3>
                <p className="text-muted-foreground mb-6">{doctor.specialty}</p>

                {/* Credentials */}
                <div className="space-y-2">
                  {doctor.credentials.map((credential, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-1 h-1 bg-gold-accent mt-2 shrink-0" />
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {credential}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
