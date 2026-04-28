import { Link } from "react-router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { ContactInner } from "../components/Contact";
import { ConsultationChannelsSection } from "../components/ConsultationChannelsSection";

export function ReservationPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 px-6 pb-24 pt-32 md:pb-16 md:pt-36">
        <article className="max-w-[90rem] mx-auto">
          <Link
            to="/"
            className="inline-flex items-center py-1 text-sm leading-none text-muted-foreground hover:text-gold-accent transition-colors mb-8"
          >
            ← 홈으로
          </Link>

          <div className="text-center mb-14 lg:mb-16">
            <div className="w-12 h-px bg-gold-accent mx-auto mb-8" />
            <h1 className="mb-4 text-charcoal tracking-tight text-3xl sm:text-4xl md:text-[2.75rem] font-semibold leading-tight">
              예약·문의
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto [word-break:keep-all]">
              오시는 길과 진료 시간을 확인하신 뒤, 편하신 채널로 예약해 주세요.
            </p>
          </div>

          <ConsultationChannelsSection showHeader={false} />

          <div className="mx-auto w-full max-w-6xl">
            <ContactInner hideReservationCta />
          </div>
        </article>
      </main>
      <Footer className="mt-auto" />
    </div>
  );
}
