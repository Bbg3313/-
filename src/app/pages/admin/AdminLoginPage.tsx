import { FormEvent, useState } from "react";
import { Navigate } from "react-router";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import {
  adminLoginIdToEmail,
  getSupabaseEnvDiagnostics,
  isSupabaseConfigured,
  supabase,
} from "../../lib/supabase";

function SupabaseMissingConfig() {
  const { hasUrl, hasKey } = getSupabaseEnvDiagnostics();
  const isProd = import.meta.env.PROD;

  return (
    <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-charcoal space-y-4">
      <p className="font-semibold text-destructive">Supabase 연결 정보가 이 사이트 빌드에 없습니다</p>
      <p className="text-muted-foreground leading-relaxed">
        Supabase 대시보드에 관리자 계정을 만들어 두었어도, 여기(브라우저에서 돌아가는 프런트)에는{" "}
        <strong className="text-charcoal">프로젝트 URL</strong>과 <strong className="text-charcoal">anon public 키</strong>가
        환경 변수로 넣어져야 로그인 폼이 열립니다. 이름은 반드시 아래처럼 <code className="text-xs bg-muted px-1 py-0.5 rounded">VITE_</code>로
        시작해야 합니다.
      </p>
      <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
        <li>
          <code className="text-xs bg-muted px-1 py-0.5 rounded">VITE_SUPABASE_URL</code>{" "}
          {hasUrl ? (
            <span className="text-emerald-700">— 설정됨</span>
          ) : (
            <span className="text-destructive font-medium">— 없음</span>
          )}
        </li>
        <li>
          <code className="text-xs bg-muted px-1 py-0.5 rounded">VITE_SUPABASE_ANON_KEY</code>{" "}
          {hasKey ? (
            <span className="text-emerald-700">— 설정됨</span>
          ) : (
            <span className="text-destructive font-medium">— 없음</span>
          )}
        </li>
      </ul>
      <div className="space-y-2 text-muted-foreground border-t border-border/60 pt-3">
        {isProd ? (
          <p>
            <strong className="text-charcoal">Vercel(또는 사용 중인 호스팅)</strong>: Project → Settings → Environment
            Variables에 위 두 변수를 추가한 뒤, <strong className="text-charcoal">Redeploy</strong>를 실행하세요. (저장만으로는
            이미 빌드된 파일이 바뀌지 않습니다.)
          </p>
        ) : (
          <p>
            <strong className="text-charcoal">로컬</strong>: 프로젝트 루트에 <code className="text-xs bg-muted px-1 py-0.5 rounded">.env</code>{" "}
            또는 <code className="text-xs bg-muted px-1 py-0.5 rounded">.env.local</code> 파일을 만들고 두 변수를 넣은 다음{" "}
            <code className="text-xs bg-muted px-1 py-0.5 rounded">npm run dev</code>를 다시 실행하세요.
          </p>
        )}
        <p className="text-xs">
          값은 Supabase → Project Settings → API 에서 <strong className="text-charcoal">Project URL</strong>과{" "}
          <strong className="text-charcoal">anon public</strong> 키를 복사하면 됩니다.
        </p>
      </div>
    </div>
  );
}

function formatAuthError(message: string): string {
  const m = message.toLowerCase();
  if (m.includes("invalid login credentials")) return "이메일 또는 비밀번호가 올바르지 않습니다.";
  if (m.includes("email not confirmed")) return "이메일 인증이 완료되지 않았습니다. Supabase 대시보드에서 해당 사용자를 확인(Confirm)해 주세요.";
  if (m.includes("too many requests")) return "시도 횟수가 너무 많습니다. 잠시 후 다시 시도해 주세요.";
  return message;
}

export function AdminLoginPage() {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    setError("");
    setLoading(true);
    const email = adminLoginIdToEmail(loginId);
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password: password.trim(),
    });
    if (signInError) setError(formatAuthError(signInError.message));
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
          <p className="text-sm text-muted-foreground mb-6">
            히어로 배너 및 프로모션 관리 페이지입니다. 아이디만 입력해도 되며, 이메일을 그대로 입력하는 경우에는 전체 주소를
            적어 주세요.
          </p>
          {!isSupabaseConfigured ? (
            <SupabaseMissingConfig />
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                inputMode="email"
                autoComplete="username"
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
                placeholder="아이디 또는 이메일"
                className="w-full border border-border bg-background px-4 py-3 text-sm"
                required
              />
              {loginId.trim() ? (
                <p className="text-xs text-muted-foreground -mt-2">
                  Supabase 로그인 주소: <span className="font-medium text-charcoal">{adminLoginIdToEmail(loginId)}</span>
                </p>
              ) : null}
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

