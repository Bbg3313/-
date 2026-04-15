import React, { useEffect, useMemo, useState } from "react";

declare global {
  interface Window {
    google?: any;
    googleTranslateElementInit?: () => void;
  }
}

const LANG_OPTIONS = [
  { code: "ko", label: "한국어", flag: "https://flagcdn.com/w40/kr.png" },
  { code: "th", label: "ไทย", flag: "https://flagcdn.com/w40/th.png" },
  { code: "vi", label: "Tiếng Việt", flag: "https://flagcdn.com/w40/vn.png" },
] as const;

export function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<(typeof LANG_OPTIONS)[number]>(LANG_OPTIONS[0]);
  const [isTranslateReady, setIsTranslateReady] = useState(false);

  const selectedLabel = useMemo(() => selected.label, [selected]);

  useEffect(() => {
    if (document.getElementById("google-translate-script")) return;

    window.googleTranslateElementInit = () => {
      if (!window.google?.translate?.TranslateElement) return;
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "ko",
          includedLanguages: "ko,th,vi",
          autoDisplay: false,
        },
        "google_translate_element",
      );
    };

    const script = document.createElement("script");
    script.id = "google-translate-script";
    script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    let tries = 0;
    const maxTries = 40;
    const timer = window.setInterval(() => {
      const combo = document.querySelector<HTMLSelectElement>(".goog-te-combo");
      if (combo) {
        setIsTranslateReady(true);
        window.clearInterval(timer);
        return;
      }
      tries += 1;
      if (tries >= maxTries) window.clearInterval(timer);
    }, 200);
    return () => window.clearInterval(timer);
  }, []);

  const applyLanguageWithRetry = (lang: string) => {
    let tries = 0;
    const maxTries = 20;
    const timer = window.setInterval(() => {
      const combo = document.querySelector<HTMLSelectElement>(".goog-te-combo");
      if (!combo) {
        tries += 1;
        if (tries >= maxTries) window.clearInterval(timer);
        return;
      }
      combo.value = lang;
      combo.dispatchEvent(new Event("change"));
      setIsTranslateReady(true);
      window.clearInterval(timer);
    }, 150);
  };

  const resetToOriginalKorean = () => {
    const expired = "Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = `googtrans=;expires=${expired};path=/`;
    document.cookie = `googtrans=;expires=${expired};path=/;domain=${window.location.hostname}`;
    if (window.location.hostname.includes(".")) {
      const rootDomain = window.location.hostname.split(".").slice(-2).join(".");
      document.cookie = `googtrans=;expires=${expired};path=/;domain=.${rootDomain}`;
    }
    window.location.reload();
  };

  return (
    <>
      {/* z-index: 헤더(z-50) 위에 드롭다운이 오도록; shrink-0: 모바일 flex에서 눌림 방지 */}
      <div className="relative z-[70] shrink-0">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="inline-flex min-h-11 min-w-0 max-w-[min(100vw-8rem,11.5rem)] items-center justify-between gap-2 border border-border bg-background/95 px-2.5 py-2 text-charcoal backdrop-blur-sm transition-colors hover:border-gold-accent/50 sm:min-w-[156px] sm:px-3 sm:py-2.5"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-busy={!isTranslateReady}
          title={!isTranslateReady ? "번역 도구 로딩 중 — 탭하면 메뉴가 열립니다" : "언어 선택"}
        >
          <span className="inline-flex items-center gap-2">
            <img
              src={selected.flag}
              alt={selectedLabel}
              className="pointer-events-none h-[13px] w-[18px] border border-border/60 object-cover"
              draggable={false}
            />
            <span className="text-sm">{selectedLabel}</span>
          </span>
          <span className="text-xs text-charcoal/70">▾</span>
        </button>

        {open && (
          <div
            className="absolute right-0 z-[80] mt-2 w-full min-w-[11rem] rounded-md border border-border bg-background py-0.5 shadow-lg"
            role="listbox"
          >
            {!isTranslateReady ? (
              <p className="px-3 py-2.5 text-xs leading-relaxed text-muted-foreground">번역 도구를 불러오는 중입니다. 잠시 후 다시 선택해 주세요.</p>
            ) : null}
            {LANG_OPTIONS.map((lang) => (
              <button
                key={lang.code}
                type="button"
                disabled={!isTranslateReady && lang.code !== "ko"}
                onClick={() => {
                  setSelected(lang);
                  if (lang.code === "ko") {
                    resetToOriginalKorean();
                  } else {
                    applyLanguageWithRetry(lang.code);
                  }
                  setOpen(false);
                }}
                className="flex w-full min-h-11 items-center gap-2 px-3 py-2 text-left text-sm transition-colors hover:bg-muted/60 disabled:pointer-events-none disabled:opacity-50"
              >
                <img
                  src={lang.flag}
                  alt={lang.label}
                  className="pointer-events-none h-[13px] w-[18px] border border-border/60 object-cover"
                  draggable={false}
                />
                <span>{lang.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
      <div id="google_translate_element" className="hidden" />
    </>
  );
}

