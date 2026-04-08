import React from "react";
import { Link, useParams } from "react-router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export function EventDetailPage() {
  const { slug } = useParams();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 px-6 pt-32 md:pt-36 pb-20">
        <div className="max-w-3xl mx-auto">
          <div className="w-12 h-px bg-gold-accent mb-8" />
          <h1 className="mb-6 text-charcoal tracking-tight text-3xl md:text-5xl font-semibold">
            이벤트 상세
          </h1>
          <p className="text-muted-foreground leading-relaxed mb-10">
            선택한 이벤트: <span className="text-charcoal font-medium">{slug ?? "-"}</span>
            <br />
            상세 페이지 내용은 곧 추가될 예정입니다.
          </p>

          <Link to="/#events" className="text-gold-accent hover:underline underline-offset-2">
            이벤트 목록으로 돌아가기
          </Link>
        </div>
      </main>
      <Footer className="mt-20 md:mt-28" />
    </div>
  );
}

