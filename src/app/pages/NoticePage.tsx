import { Link } from "react-router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { SITE_LINKS } from "../config/siteLinks";

export function NoticePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 pt-28 md:pt-32 pb-16 px-6">
        <article className="max-w-5xl mx-auto">
          <Link
            to="/"
            className="inline-block text-sm text-muted-foreground hover:text-gold-accent transition-colors mb-8"
          >
            ← 홈으로
          </Link>
          <h1
            className="text-charcoal text-3xl md:text-4xl mb-8 tracking-tight"
            style={{ fontFamily: "'Playfair Display', serif", fontWeight: 500 }}
          >
            공지사항
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            등록된 공지사항이 없습니다. 안내가 있을 경우 이곳에 게시됩니다.
          </p>

          <section className="mt-14 border border-border/70 bg-muted/30 p-6 sm:p-8 md:p-10">
            <div className="text-center mb-8">
              <h2 className="text-charcoal text-2xl md:text-3xl tracking-tight mb-3" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 500 }}>
                상담안내
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                궁금하신 부분이 있다면 언제든 연락해주세요.<br className="hidden sm:block" />
                빠른 상담과 예약 안내를 도와드립니다.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
              <a
                href={SITE_LINKS.reservation}
                target="_blank"
                rel="noreferrer"
                className="group bg-background border border-border/70 px-5 py-5 hover:border-gold-accent/40 hover:shadow-sm transition-all"
              >
                <div className="flex items-start gap-3">
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-md bg-emerald-50 text-emerald-600 text-lg">🗓️</span>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">상담없이 바로 예약</p>
                    <p className="text-charcoal font-semibold tracking-tight">네이버 예약 &gt;</p>
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
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-md bg-green-50 text-green-600 text-lg">💬</span>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">예약과 상담을 동시에</p>
                    <p className="text-charcoal font-semibold tracking-tight">네이버 톡톡 상담 &gt;</p>
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
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-md bg-amber-50 text-amber-700 text-lg">🗨️</span>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">다양한 혜택 알림</p>
                    <p className="text-charcoal font-semibold tracking-tight">카카오톡 상담 &gt;</p>
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
                    <p className="text-xs text-muted-foreground mb-1">실시간 전화 상담</p>
                    <p className="text-charcoal font-semibold tracking-tight">054-772-8575 &gt;</p>
                  </div>
                </div>
              </a>
            </div>
          </section>
        </article>
      </main>
      <Footer className="mt-auto" />
    </div>
  );
}
