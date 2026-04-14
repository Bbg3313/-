import React, { useCallback, useState } from "react";
import { Link } from "react-router";
import { Check, Copy } from "lucide-react";
import { SITE_LINKS } from "../config/siteLinks";
import { ConsultationChannelsSection } from "./ConsultationChannelsSection";

/** 지도·내비 등에 붙여넣기 좋은 한 줄 주소 */
const CLINIC_ADDRESS_FOR_CLIPBOARD =
  "경북 경주시 화랑로 132, 2층 연세미의원 (경주역 우체국 옆 GS편의점 2층)";

const GOOGLE_MAPS_EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3234.1930747588513!2d129.212623776708!3d35.844268972535126!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x35664e4195c7c2cf%3A0xa3a7117464dabddd!2z7Jew7IS466-47J2Y7JuQIOqyveyjvO2UvOu2gOqzvA!5e0!3m2!1sko!2skr!4v1775533999427!5m2!1sko!2skr";

export type ContactInnerProps = {
  /** 예약 전용 페이지 등에서 중복 CTA 숨김 */
  hideReservationCta?: boolean;
};

export function ContactInner({ hideReservationCta = false }: ContactInnerProps) {
  const isExternalReservation = /^https?:\/\//.test(SITE_LINKS.reservation);
  const [addressCopied, setAddressCopied] = useState(false);

  const copyAddress = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(CLINIC_ADDRESS_FOR_CLIPBOARD);
      setAddressCopied(true);
      window.setTimeout(() => setAddressCopied(false), 2000);
    } catch {
      setAddressCopied(false);
    }
  }, []);

  return (
    <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
      <div className="min-h-[300px] sm:min-h-[360px] lg:min-h-[560px]">
        <div className="border border-border/70 overflow-hidden bg-muted h-full">
          <iframe
            src={GOOGLE_MAPS_EMBED_SRC}
            className="w-full h-full min-h-[300px] sm:min-h-[360px] lg:min-h-[560px] border-0 block"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="연세미의원 위치 — 구글 지도"
          />
        </div>
      </div>

      <div className="bg-champagne p-6 sm:p-7 lg:p-8 shadow-sm border border-border/60 h-full min-h-[300px] sm:min-h-[360px] lg:min-h-[560px]">
        <div className="h-full grid grid-rows-[auto_auto_1fr] gap-5">
          <div className="border border-gold-accent/20 bg-background/35 p-5">
            <p className="text-xs tracking-[0.18em] text-gold-accent uppercase mb-2">Address</p>
            <div className="flex items-start gap-3">
              <p className="min-w-0 flex-1 text-charcoal font-medium leading-relaxed">
                경북 경주시 화랑로 132, 2층 연세미의원
              </p>
              <button
                type="button"
                onClick={copyAddress}
                className="group inline-flex shrink-0 items-center gap-1.5 rounded-md border border-gold-accent/35 bg-background/60 px-2.5 py-1.5 text-xs font-medium text-charcoal transition-colors hover:border-gold-accent/60 hover:bg-background"
                aria-label={addressCopied ? "주소가 복사되었습니다" : "주소 복사"}
              >
                {addressCopied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-gold-accent" aria-hidden />
                    복사됨
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5 text-gold-accent opacity-80 group-hover:opacity-100" aria-hidden />
                    복사
                  </>
                )}
              </button>
            </div>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">(경주역 우체국 옆 GS편의점 2층)</p>
          </div>

          <div
            className={`grid gap-4 items-center border border-gold-accent/20 bg-background/35 p-5 ${
              hideReservationCta ? "" : "sm:grid-cols-[1fr_auto]"
            }`}
          >
            <div>
              <p className="text-xs tracking-[0.18em] text-gold-accent uppercase mb-2">Call</p>
              <a href="tel:0547728575" className="text-xl font-semibold text-charcoal hover:text-gold-accent transition-colors">
                054-772-8575
              </a>
            </div>
            {!hideReservationCta &&
              (isExternalReservation ? (
                <a
                  href={SITE_LINKS.reservation}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative inline-flex w-full sm:w-auto items-center justify-center px-8 py-3 bg-primary text-primary-foreground overflow-hidden transition-all duration-500 hover:shadow-xl"
                >
                  <span className="relative z-10 tracking-wider text-sm">예약하기</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                </a>
              ) : (
                <Link
                  to={SITE_LINKS.reservation}
                  className="group relative inline-flex w-full sm:w-auto items-center justify-center px-8 py-3 bg-primary text-primary-foreground overflow-hidden transition-all duration-500 hover:shadow-xl"
                >
                  <span className="relative z-10 tracking-wider text-sm">예약하기</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                </Link>
              ))}
          </div>

          <div className="border border-gold-accent/20 bg-background/35 p-5">
            <p className="text-xs tracking-[0.18em] text-gold-accent uppercase mb-3">Hours</p>
            <dl className="space-y-2.5 text-sm">
              <div className="flex items-center justify-between gap-4">
                <dt className="text-charcoal font-medium">월·목·금</dt>
                <dd className="text-muted-foreground tabular-nums">10:00 - 20:00</dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-charcoal font-medium">화·수</dt>
                <dd className="text-muted-foreground tabular-nums">10:00 - 18:00</dd>
              </div>
              <div className="flex items-start justify-between gap-4">
                <dt className="text-charcoal font-medium">토</dt>
                <dd className="text-muted-foreground tabular-nums text-right">
                  10:00 - 15:00
                  <span className="block text-[11px] text-muted-foreground/80">(점심시간 없음)</span>
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4 pt-2 border-t border-gold-accent/15">
                <dt className="text-charcoal font-medium">점심</dt>
                <dd className="text-muted-foreground tabular-nums">13:00 - 14:00</dd>
              </div>
            </dl>
            <p className="mt-4 text-xs text-destructive">일요일·공휴일 휴무</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Contact() {
  return (
    <section id="contact" className="py-20 sm:py-24 lg:py-32 px-6 bg-background relative">
      <div className="max-w-[90rem] mx-auto">
        <div className="max-w-3xl mx-auto mb-16 lg:mb-20 text-center">
          <div className="w-12 h-px bg-gold-accent mb-8 mx-auto" />
          <h2
            className="mb-6 text-charcoal tracking-tight"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "3.5rem",
              lineHeight: "1.1",
              fontWeight: "500",
            }}
          >
            Visit Us
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            오시는 길, 진료 시간, 예약 안내를 확인하세요
          </p>
        </div>

        <ContactInner />

        <ConsultationChannelsSection />
      </div>
    </section>
  );
}
