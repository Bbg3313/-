import { useId } from "react";
import { cn } from "../ui/utils";

type SiteLogoProps = {
  /** 히어로 위 투명 헤더: 밝은 텍스트 */
  inverted?: boolean;
  layout?: "horizontal" | "vertical";
  className?: string;
};

function LogoMark({ className, gradientId }: { className?: string; gradientId: string }) {
  return (
    <svg
      viewBox="0 0 56 56"
      className={cn("shrink-0", className)}
      aria-hidden
    >
      <defs>
        <linearGradient id={`${gradientId}-gold`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f4ead0" />
          <stop offset="32%" stopColor="#d4b46a" />
          <stop offset="62%" stopColor="#b8923f" />
          <stop offset="100%" stopColor="#7a5a24" />
        </linearGradient>
        <linearGradient id={`${gradientId}-shine`} x1="18%" y1="12%" x2="52%" y2="48%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="45%" stopColor="#ffffff" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={`${gradientId}-halo`} cx="32%" cy="28%" r="70%">
          <stop offset="0%" stopColor="#fff9ed" stopOpacity="0.65" />
          <stop offset="55%" stopColor="#fff9ed" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#fff9ed" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="28" cy="28" r="27" fill={`url(#${gradientId}-halo)`} />
      <circle cx="28" cy="28" r="25.25" fill="#fdfaf6" stroke={`url(#${gradientId}-gold)`} strokeWidth="1.15" />
      <circle cx="28" cy="28" r="25.25" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="0.5" opacity="0.45" transform="rotate(-52 28 28)" />
      <path
        d="M28 13.25c-6.85 0-12.4 5.05-12.4 11.35 0 5.95 5.55 11.65 12.4 19.15 6.85-7.5 12.4-13.2 12.4-19.15 0-6.3-5.55-11.35-12.4-11.35z"
        fill={`url(#${gradientId}-gold)`}
      />
      <path
        d="M28 13.25c-6.85 0-12.4 5.05-12.4 11.35 0 5.95 5.55 11.65 12.4 19.15 6.85-7.5 12.4-13.2 12.4-19.15 0-6.3-5.55-11.35-12.4-11.35z"
        fill={`url(#${gradientId}-shine)`}
      />
      <path
        d="M28 20.5c-3.35 0-6.1 2.45-6.1 5.45 0 2.85 2.75 5.55 6.1 9.1 3.35-3.55 6.1-6.25 6.1-9.1 0-3-2.75-5.45-6.1-5.45z"
        fill="rgba(255,253,248,0.22)"
      />
    </svg>
  );
}

export function SiteLogo({ inverted = false, layout = "horizontal", className }: SiteLogoProps) {
  const gid = useId().replace(/:/g, "");

  const textBlock = (
    <div
      className={cn(
        "flex min-w-0 flex-col justify-center leading-tight",
        layout === "vertical" && "items-center text-center",
      )}
    >
      <span
        className={cn(
          "font-semibold tracking-[-0.03em] [word-break:keep-all]",
          layout === "vertical"
            ? "text-lg sm:text-xl"
            : "text-[1.02rem] sm:text-[1.12rem] md:text-[1.22rem]",
          inverted ? "text-white [text-shadow:0_2px_14px_rgba(0,0,0,0.38)]" : "text-charcoal",
        )}
        style={{ fontFamily: '"Pretendard Variable", Pretendard, system-ui, sans-serif' }}
      >
        연세미의원
      </span>
      <span
        className={cn(
          "mt-[0.2rem] text-[8.5px] font-medium uppercase tracking-[0.28em] sm:text-[9.5px]",
          inverted ? "text-white/78 [text-shadow:0_1px_8px_rgba(0,0,0,0.35)]" : "text-gold-accent/88",
        )}
        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
      >
        Dermatology · Gyeongju
      </span>
    </div>
  );

  return (
    <span
      className={cn(
        "inline-flex select-none",
        layout === "horizontal" ? "items-center gap-2.5 sm:gap-3 md:gap-3.5" : "flex-col items-center gap-2.5 sm:gap-3",
        className,
      )}
    >
      <LogoMark
        gradientId={gid}
        className={cn(
          "drop-shadow-[0_3px_14px_rgba(120,90,38,0.22)]",
          layout === "vertical"
            ? "h-[3.75rem] w-[3.75rem] sm:h-[4.25rem] sm:w-[4.25rem]"
            : "h-11 w-11 sm:h-12 sm:w-12 md:h-[3.85rem] md:w-[3.85rem]",
        )}
      />
      {textBlock}
    </span>
  );
}
