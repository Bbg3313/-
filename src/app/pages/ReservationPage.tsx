import { Link } from "react-router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { ContactInner } from "../components/Contact";
import { ConsultationChannelsSection } from "../components/ConsultationChannelsSection";

export function ReservationPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 pt-32 md:pt-36 pb-16 px-6">
        <article className="max-w-[90rem] mx-auto">
          <Link
            to="/"
            className="inline-flex items-center py-1 text-sm leading-none text-muted-foreground hover:text-gold-accent transition-colors mb-8"
          >
            ← 홈으로
          </Link>

          <div className="text-center mb-14 lg:mb-16">
            <div className="w-12 h-px bg-gold-accent mx-auto mb-8" />
            <h1
              className="mb-4 text-charcoal tracking-tight"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
                lineHeight: "1.1",
                fontWeight: "500",
              }}
            >
              예약·문의
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              오시는 길과 진료 시간을 확인하신 뒤, 편하신 채널로 예약해 주세요.
            </p>
          </div>

          <ContactInner hideReservationCta />

          <ConsultationChannelsSection
            heading="예약·상담 채널"
            description={
              <>
                네이버 예약, 톡톡, 카카오톡, 전화 중 원하시는 방법을 선택해 주세요.
              </>
            }
          />
        </article>
      </main>
      <Footer className="mt-auto" />
    </div>
  );
}
