import { FormEvent, useState } from "react";
import { Navigate } from "react-router";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { isSupabaseConfigured, supabase } from "../../lib/supabase";

export function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    setError("");
    setLoading(true);
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    if (signInError) setError(signInError.message);
    else setLoggedIn(true);
    setLoading(false);
  };

  if (loggedIn) return <Navigate to="/admin" replace />;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 px-6 pt-32 md:pt-36 pb-20">
        <div className="max-w-md mx-auto border border-border/70 bg-muted/20 p-6 sm:p-8">
          <h1 className="text-2xl font-semibold text-charcoal mb-2">관리자 로그인</h1>
          <p className="text-sm text-muted-foreground mb-6">히어로 배너 및 프로모션 관리 페이지입니다.</p>
          {!isSupabaseConfigured ? (
            <p className="text-sm text-destructive">
              Supabase 설정이 없습니다. `.env`에 `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`를 추가하세요.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="관리자 이메일"
                className="w-full border border-border bg-background px-4 py-3 text-sm"
                required
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호"
                className="w-full border border-border bg-background px-4 py-3 text-sm"
                required
              />
              {error && <p className="text-sm text-destructive">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-primary-foreground px-4 py-3 text-sm font-medium disabled:opacity-60"
              >
                {loading ? "로그인 중..." : "로그인"}
              </button>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

