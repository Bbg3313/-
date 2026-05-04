import logo from "../../../imports/logo.svg";
import { cn } from "../ui/utils";

type SiteLogoProps = {
  /** 히어로 위 투명 헤더: 밝은 텍스트 */
  inverted?: boolean;
  layout?: "horizontal" | "vertical";
  className?: string;
};

export function SiteLogo({ inverted = false, layout = "horizontal", className }: SiteLogoProps) {
  const textBlock = (
    <div
      className={cn(
        "flex min-w-0 flex-col justify-center leading-tight",
        layout === "vertical" && "items-center text-center",
      )}
    >
      <span
        className={cn(
          "text-[8.5px] font-medium uppercase tracking-[0.28em] sm:text-[9.5px]",
          inverted ? "text-white/78 [text-shadow:0_1px_8px_rgba(0,0,0,0.35)]" : "text-gold-accent/88",
        )}
        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
      >
        Dermatology · Gyeongju
      </span>
    </div>
  );

  /** 병원 로고 SVG — 헤더·푸터 높이에 맞춤 */
  const imgClass =
    layout === "vertical"
      ? "block h-[4.25rem] w-auto max-w-[min(100%,12.5rem)] shrink-0 object-contain object-center sm:h-[4.75rem] sm:max-w-[min(100%,14rem)]"
      : "h-10 w-auto max-h-[3.25rem] max-w-[min(46vw,7.5rem)] shrink-0 object-contain object-left sm:h-12 sm:max-h-[3.75rem] sm:max-w-[min(40vw,8.5rem)] md:h-[3.35rem] md:max-h-[4rem] md:max-w-[9.5rem]";

  return (
    <span
      className={cn(
        "select-none",
        layout === "horizontal"
          ? "inline-flex items-center gap-2.5 sm:gap-3 md:gap-3.5"
          : "mx-auto flex w-auto max-w-full flex-col items-center gap-2.5 sm:gap-3",
        className,
      )}
    >
      <img
        src={logo}
        alt="연세미의원"
        width={103}
        height={61}
        decoding="async"
        draggable={false}
        className={cn(
          "transition-opacity duration-300 group-hover:opacity-100",
          inverted ? "opacity-[0.92] drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)]" : "opacity-[0.96]",
          imgClass,
        )}
      />
      {textBlock}
    </span>
  );
}
