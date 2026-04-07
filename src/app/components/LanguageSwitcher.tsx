import React, { useEffect } from "react";

declare global {
  interface Window {
    google?: any;
    googleTranslateElementInit?: () => void;
  }
}

const LANG_OPTIONS = [
  { code: "ko", label: "🇰🇷 한국어" },
  { code: "th", label: "🇹🇭 ไทย" },
  { code: "vi", label: "🇻🇳 Tiếng Việt" },
] as const;

function applyLanguage(lang: string) {
  const combo = document.querySelector<HTMLSelectElement>(".goog-te-combo");
  if (!combo) return;
  combo.value = lang;
  combo.dispatchEvent(new Event("change"));
}

export function LanguageSwitcher() {
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

  return (
    <>
      <div className="fixed top-20 right-4 sm:right-6 z-50 flex items-center gap-1 rounded-full border border-border bg-background/90 backdrop-blur-sm p-1 shadow-sm">
        {LANG_OPTIONS.map((lang) => (
          <button
            key={lang.code}
            type="button"
            onClick={() => applyLanguage(lang.code)}
            className="px-2.5 py-1.5 text-[11px] sm:text-xs text-charcoal hover:text-gold-accent transition-colors"
          >
            {lang.label}
          </button>
        ))}
      </div>
      <div id="google_translate_element" className="hidden" />
    </>
  );
}

