import React from "react";
import { Link } from "react-router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export function PricingPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 pt-28 md:pt-32 pb-16 px-6">
        <article className="max-w-4xl mx-auto">
          <Link to="/" className="inline-block text-sm text-muted-foreground hover:text-gold-accent transition-colors mb-8">
            ← 홈으로
          </Link>
          <h1
            className="text-charcoal text-3xl md:text-4xl mb-6 tracking-tight"
            style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600 }}
          >
            시술/가격
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            시술 안내 및 가격 정보는 준비 중입니다. 내용 전달 주시면 이 페이지에 월별/카테고리별로 정리해드릴게요.
          </p>
        </article>
      </main>
      <Footer className="mt-auto" />
    </div>
  );
}

