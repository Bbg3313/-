import type { ReactNode } from "react";
import { SITE_LINKS } from "../config/siteLinks";

type ConsultationChannelsSectionProps = {
  heading?: string;
  description?: ReactNode;
  showHeader?: boolean;
};

type Channel = {
  href: string;
  external?: boolean;
  icon: ReactNode;
  iconClassName: string;
  hint: string;
  title: string;
  /** 전화 링크 등 화살표 생략 */
  plainTitle?: boolean;
};

const channels: Channel[] = [
  {
    href: SITE_LINKS.naverReservation,
    external: true,
    iconClassName: "bg-emerald-50 text-emerald-600",
    icon: (
      <span className="text-lg" aria-hidden>
        🗓️
      </span>
    ),
    hint: "상담없이 바로 예약",
    title: "네이버 예약",
  },
  {
    href: SITE_LINKS.naverTalk,
    external: true,
    iconClassName: "border border-[#03C75A]/25 bg-[#03C75A]/10",
    icon: (
      <span className="text-[11px] font-bold tracking-tight text-[#03C75A]" aria-hidden>
        N톡
      </span>
    ),
    hint: "예약과 상담을 동시에",
    title: "네이버 톡톡 상담",
  },
  {
    href: SITE_LINKS.kakaoChannel,
    external: true,
    iconClassName: "border border-[#FEE500]/80 bg-[#FEE500]/50",
    icon: (
      <span className="text-[10px] font-bold tracking-tight text-[#191919]" aria-hidden>
        TALK
      </span>
    ),
    hint: "다양한 혜택 알림",
    title: "카카오톡 상담",
  },
  {
    href: "tel:0547728575",
    iconClassName: "bg-fuchsia-50 text-fuchsia-600",
    icon: (
      <span className="text-lg" aria-hidden>
        📞
      </span>
    ),
    hint: "실시간 전화 상담",
    title: "054-772-8575",
    plainTitle: true,
  },
];

export function ConsultationChannelsSection({
  heading = "상담안내",
  description = (
    <>
      궁금하신 부분이 있다면 언제든 연락해주세요.
      <br className="hidden sm:block" />
      빠른 상담과 예약 안내를 도와드립니다.
    </>
  ),
  showHeader = true,
}: ConsultationChannelsSectionProps) {
  return (
    <section className="relative mt-8 border-t border-gold-accent/20 bg-gradient-to-b from-muted/30 via-background to-background px-0 pt-8 pb-8 sm:mt-10 sm:pt-10 sm:pb-10 md:pt-12 md:pb-12">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 md:max-w-5xl md:px-8">
        {showHeader ? (
          <header className="mb-8 text-center sm:mb-10">
            <h2 className="mb-3 text-[clamp(1.35rem,2.8vw,1.75rem)] font-semibold leading-snug tracking-tight text-charcoal">
              {heading}
            </h2>
            <p className="mx-auto max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg [word-break:keep-all]">
              {description}
            </p>
          </header>
        ) : null}

        <ul className="grid list-none grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4" role="list">
          {channels.map((ch) => (
            <li key={ch.href} className="min-w-0">
              <a
                href={ch.href}
                {...(ch.external ? { target: "_blank", rel: "noreferrer" } : {})}
                className="group flex min-h-[4.75rem] items-center gap-4 rounded-xl border border-border/60 bg-background/90 px-4 py-4 shadow-sm ring-1 ring-black/[0.03] transition-[border-color,box-shadow,transform] hover:-translate-y-0.5 hover:border-gold-accent/35 hover:shadow-md sm:min-h-[5rem] sm:px-5 sm:py-4"
              >
                <span
                  className={`flex size-11 shrink-0 items-center justify-center rounded-full text-center transition-colors group-hover:opacity-95 sm:size-12 ${ch.iconClassName}`}
                  aria-hidden
                >
                  {ch.icon}
                </span>
                <span className="min-w-0 flex-1 text-left">
                  <span className="mb-0.5 block text-sm text-muted-foreground [word-break:keep-all]">{ch.hint}</span>
                  <span className="flex items-center gap-1 font-semibold tracking-tight text-charcoal [word-break:keep-all]">
                    {ch.title}
                    {!ch.plainTitle && (
                      <span className="text-gold-accent/90 transition-transform group-hover:translate-x-0.5" aria-hidden>
                        →
                      </span>
                    )}
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
