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

  return (
    <>
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="inline-flex items-center gap-2.5 px-3 py-2.5 border border-border bg-background/90 backdrop-blur-sm text-charcoal hover:border-gold-accent/50 transition-colors min-w-[156px] justify-between disabled:cursor-not-allowed disabled:opacity-70"
          aria-haspopup="listbox"
          aria-expanded={open}
          disabled={!isTranslateReady}
          title={!isTranslateReady ? "번역 도구 로딩 중" : undefined}
        >
          <span className="inline-flex items-center gap-2">
            <img src={selected.flag} alt={selectedLabel} className="w-[18px] h-[13px] object-cover border border-border/60" />
            <span className="text-sm">{selectedLabel}</span>
          </span>
          <span className="text-xs text-charcoal/70">▾</span>
        </button>

        {open && (
          <div
            className="absolute right-0 mt-2 w-full border border-border bg-background shadow-lg z-50"
            role="listbox"
          >
            {LANG_OPTIONS.map((lang) => (
              <button
                key={lang.code}
                type="button"
                onClick={() => {
                  setSelected(lang);
                  applyLanguageWithRetry(lang.code);
                  setOpen(false);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-left text-sm hover:bg-muted/60 transition-colors"
              >
                <img src={lang.flag} alt={lang.label} className="w-[18px] h-[13px] object-cover border border-border/60" />
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

