import type { ReactNode } from "react";
import { SITE_LINKS } from "../config/siteLinks";

type ConsultationChannelsSectionProps = {
  heading?: string;
  description?: ReactNode;
};

export function ConsultationChannelsSection({
  heading = "상담안내",
  description = (
    <>
      궁금하신 부분이 있다면 언제든 연락해주세요.
      <br className="hidden sm:block" />
      빠른 상담과 예약 안내를 도와드립니다.
    </>
  ),
}: ConsultationChannelsSectionProps) {
  return (
    <section className="mt-14 border border-border/70 bg-muted/30 p-6 sm:p-8 md:p-10">
      <div className="text-center mb-8">
        <h2 className="mb-3 text-[clamp(1.35rem,2.8vw,1.75rem)] font-semibold leading-snug tracking-tight text-charcoal">
          {heading}
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto [word-break:keep-all]">
          {description}
        </p>
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <a
          href={SITE_LINKS.naverReservation}
          target="_blank"
          rel="noreferrer"
          className="group bg-background border border-border/70 px-5 py-5 hover:border-gold-accent/40 hover:shadow-sm transition-all"
        >
          <div className="flex items-start gap-3">
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-md bg-emerald-50 text-emerald-600 text-lg">🗓️</span>
            <div>
              <p className="text-xs text-muted-foreground mb-1 [word-break:keep-all]">상담없이 바로 예약</p>
              <p className="text-charcoal font-semibold tracking-tight [word-break:keep-all]">네이버 예약 &gt;</p>
            </div>
          </div>
        </a>

        <a
          href={SITE_LINKS.naverTalk}
          target="_blank"
          rel="noreferrer"
          className="group bg-background border border-border/70 px-5 py-5 hover:border-gold-accent/40 hover:shadow-sm transition-all"
        >
          <div className="flex items-start gap-3">
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-md bg-[#03C75A]/10 border border-[#03C75A]/20 text-[#03C75A] text-[11px] font-bold tracking-tight">
              N톡
            </span>
            <div>
              <p className="text-xs text-muted-foreground mb-1 [word-break:keep-all]">예약과 상담을 동시에</p>
              <p className="text-charcoal font-semibold tracking-tight [word-break:keep-all]">네이버 톡톡 상담 &gt;</p>
            </div>
          </div>
        </a>

        <a
          href={SITE_LINKS.kakaoChannel}
          target="_blank"
          rel="noreferrer"
          className="group bg-background border border-border/70 px-5 py-5 hover:border-gold-accent/40 hover:shadow-sm transition-all"
        >
          <div className="flex items-start gap-3">
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-md bg-[#FEE500]/70 border border-[#FEE500] text-[#191919] text-[10px] font-bold tracking-tight">
              TALK
            </span>
            <div>
              <p className="text-xs text-muted-foreground mb-1 [word-break:keep-all]">다양한 혜택 알림</p>
              <p className="text-charcoal font-semibold tracking-tight [word-break:keep-all]">카카오톡 상담 &gt;</p>
            </div>
          </div>
        </a>

        <a
          href="tel:0547728575"
          className="group bg-background border border-border/70 px-5 py-5 hover:border-gold-accent/40 hover:shadow-sm transition-all"
        >
          <div className="flex items-start gap-3">
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-md bg-fuchsia-50 text-fuchsia-600 text-lg">📞</span>
            <div>
              <p className="text-xs text-muted-foreground mb-1 [word-break:keep-all]">실시간 전화 상담</p>
              <p className="text-charcoal font-semibold tracking-tight">054-772-8575 &gt;</p>
            </div>
          </div>
        </a>
      </div>
    </section>
  );
}
