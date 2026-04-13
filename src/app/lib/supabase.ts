import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

const trimmedUrl = supabaseUrl?.trim();
const trimmedKey = supabaseAnonKey?.trim();

export const isSupabaseConfigured = Boolean(trimmedUrl && trimmedKey);

/** 로그인 화면 등에서 누락 항목 안내용 (값 자체는 노출하지 않음) */
export function getSupabaseEnvDiagnostics(): { hasUrl: boolean; hasKey: boolean } {
  return {
    hasUrl: Boolean(trimmedUrl),
    hasKey: Boolean(trimmedKey),
  };
}

export const supabase = isSupabaseConfigured
  ? createClient(trimmedUrl!, trimmedKey!, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : null;

/** 관리자 로그인: @ 없으면 `아이디@${도메인}`으로 Supabase 이메일 로그인 */
const DEFAULT_ADMIN_LOGIN_DOMAIN = "admin.yonsaemi.kr";

export function adminLoginIdToEmail(loginId: string): string {
  const t = loginId.trim();
  if (!t) return t;
  if (t.includes("@")) return t;
  const domain = (import.meta.env.VITE_ADMIN_LOGIN_DOMAIN as string | undefined)?.trim() || DEFAULT_ADMIN_LOGIN_DOMAIN;
  return `${t}@${domain}`;
}

