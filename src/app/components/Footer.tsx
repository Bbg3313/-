import { Link } from "react-router";
import logo from "../../imports/logo.svg";
import { cn } from "./ui/utils";

const footerLinks = [
  { to: "/notice", label: "공지사항" },
  { to: "/privacy", label: "개인정보처리방침" },
  { to: "/terms", label: "서비스이용약관" },
] as const;

type FooterProps = {
  className?: string;
};

export function Footer({ className }: FooterProps) {
  return (
    <footer className={cn("border-t border-border/50", className)}>
      <div className="bg-background">
        <div className="max-w-7xl mx-auto px-6 py-14 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 lg:items-center">
            <div className="lg:col-span-4 flex flex-row items-center gap-5">
              <Link to="/" className="shrink-0 block">
                <img src={logo} alt="연세미의원" className="h-12 md:h-14 w-auto" />
              </Link>
              <div>
                <p className="text-charcoal font-semibold text-lg tracking-tight">연세미의원</p>
                <p className="text-muted-foreground text-sm mt-1">경주시 화랑로</p>
              </div>
            </div>

            <div className="lg:col-span-5 text-sm text-muted-foreground space-y-2 leading-relaxed">
              <p>
                <span className="text-charcoal/80 font-medium">대표자</span> 심형경
              </p>
              <p>
                <span className="text-charcoal/80 font-medium">사업자등록번호</span> 587-10-03051
              </p>
              <p>
                <span className="text-charcoal/80 font-medium">주소</span> 경북 경주시 화랑로 132, 2층 연세미의원
              </p>
              <p>
                <span className="text-charcoal/80 font-medium">전화</span>{" "}
                <a
                  href="tel:0547728575"
                  className="text-gold-accent hover:underline underline-offset-2 transition-colors"
                >
                  054-772-8575
                </a>
              </p>
            </div>

            <nav
              className="lg:col-span-3 flex flex-col sm:flex-row lg:flex-col gap-1 sm:gap-6 lg:gap-3 text-sm border-t border-border/40 lg:border-t-0 pt-8 lg:pt-0"
              aria-label="법적 고지"
            >
              {footerLinks.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className="text-charcoal/80 hover:text-gold-accent transition-colors py-1 lg:py-0"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      <div className="border-t border-border/50 bg-secondary/90">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <p className="text-center text-muted-foreground text-xs tracking-wide">
            © {new Date().getFullYear()} 연세미의원. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
