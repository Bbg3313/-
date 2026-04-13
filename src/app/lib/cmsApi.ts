import type { HeroBanner, Promotion } from "../types/cms";
import { supabase } from "./supabase";

type UploadBucket = "hero-images" | "promotion-images";

function getClient() {
  if (!supabase) {
    throw new Error("Supabase is not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.");
  }
  return supabase;
}

/**
 * Supabase Postgrest/GoTrue 등에서 던진 객체는 `Error`가 아닐 수 있어,
 * UI에서 `instanceof Error`만 쓰면 메시지가 사라집니다. 항상 이 함수로 문장화하세요.
 */
export function formatSupabaseClientError(err: unknown): string {
  if (err == null) return "알 수 없는 오류입니다.";

  const o = err as Record<string, unknown>;
  const code = typeof o.code === "string" ? o.code : "";
  const message = typeof o.message === "string" ? o.message : "";
  const details = typeof o.details === "string" ? o.details : "";
  const hint = typeof o.hint === "string" ? o.hint : "";
  const combined = [message, details, hint].filter(Boolean).join(" — ");
  const lower = combined.toLowerCase();

  if (code === "23505" || lower.includes("duplicate key") || lower.includes("unique constraint")) {
    return [
      "이미 같은 URL(slug)로 등록된 프로모션이 있어 저장할 수 없습니다.",
      "제목을 조금 바꾸면 자동 slug가 달라집니다. 또는 아래 목록에서 기존 항목을 수정·삭제하세요.",
      combined ? `(원문: ${combined})` : "",
    ]
      .filter(Boolean)
      .join(" ");
  }
  if (
    code === "42501" ||
    lower.includes("row-level security") ||
    (lower.includes("new row violates") && lower.includes("policy")) ||
    (lower.includes("permission denied") && lower.includes("policy"))
  ) {
    return [
      "데이터베이스 보안 정책(RLS) 때문에 저장이 거절되었습니다.",
      "① 관리자로 로그인했는지 확인 ② Supabase에서 scripts/supabase-schema.sql 의 promotions RLS 정책(admin_all_promotions)이 적용됐는지 확인하세요.",
      combined ? `(원문: ${combined})` : "",
    ]
      .filter(Boolean)
      .join(" ");
  }
  if (lower.includes("relation ") && lower.includes("does not exist")) {
    return `DB 테이블이 없습니다. scripts/supabase-schema.sql 을 Supabase SQL Editor에서 실행했는지 확인하세요. ${combined ? `(${combined})` : ""}`;
  }
  if (lower.includes("could not find the table") || lower.includes("schema cache")) {
    return [
      "Supabase에 `public.promotions`(또는 hero_banners) 테이블이 없거나, API 스키마 캐시에 아직 반영되지 않았습니다.",
      "① SQL Editor에서 scripts/supabase-tables-hero-promotions.sql 전체를 실행하세요. (스토리지 SQL만 돌렸다면 이 단계가 빠진 겁니다.)",
      "② 실행 후 10~30초 기다렸다가 관리자 페이지를 새로고침한 뒤 다시 저장해 보세요.",
      combined ? `(원문: ${combined})` : "",
    ]
      .filter(Boolean)
      .join(" ");
  }

  if (combined) return combined;
  if (typeof err === "string") return err;
  if (err instanceof Error) return err.message;
  try {
    return JSON.stringify(err);
  } catch {
    return String(err);
  }
}

function throwDb(error: { message?: string; code?: string; details?: string; hint?: string } | null) {
  if (error) throw new Error(formatSupabaseClientError(error));
}

function storageUploadErrorMessage(bucket: UploadBucket, raw: string): string {
  const lower = raw.toLowerCase();
  if (lower.includes("bucket not found") || lower.includes("not found")) {
    return [
      `스토리지 버킷 "${bucket}"이(가) Supabase에 없습니다.`,
      "Supabase 대시보드 → Storage에서 버킷 이름을 정확히 만들거나,",
      "SQL Editor에서 프로젝트의 scripts/supabase-storage-buckets.sql 파일 내용을 실행하세요.",
      "(버킷 ID는 hero-images, promotion-images 이어야 합니다. 공개 Public 권장)",
    ].join(" ");
  }
  if (lower.includes("row-level security") || lower.includes("rls") || lower.includes("policy")) {
    return [
      "스토리지 업로드가 권한 정책(RLS)에 막혔습니다.",
      "관리자로 로그인한 뒤 다시 시도하고, scripts/supabase-storage-buckets.sql 의 storage 정책이 적용됐는지 확인하세요.",
      `원본: ${raw}`,
    ].join(" ");
  }
  return raw;
}

export async function uploadImage(bucket: UploadBucket, file: File) {
  const client = getClient();
  const ext = file.name.split(".").pop() || "png";
  const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const { error } = await client.storage.from(bucket).upload(path, file, { upsert: false });
  if (error) {
    throw new Error(storageUploadErrorMessage(bucket, error.message ?? String(error)));
  }
  const { data } = client.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}

export async function fetchActiveHeroBanners() {
  const client = getClient();
  const { data, error } = await client
    .from("hero_banners")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });
  if (error) throwDb(error);
  return (data ?? []) as HeroBanner[];
}

export async function fetchHeroBannersAdmin() {
  const client = getClient();
  const { data, error } = await client.from("hero_banners").select("*").order("sort_order", { ascending: true });
  if (error) throwDb(error);
  return (data ?? []) as HeroBanner[];
}

export async function createHeroBanner(payload: Partial<HeroBanner>) {
  const client = getClient();
  const { error } = await client.from("hero_banners").insert(payload);
  if (error) throwDb(error);
}

export async function updateHeroBanner(id: string, payload: Partial<HeroBanner>) {
  const client = getClient();
  const { error } = await client.from("hero_banners").update(payload).eq("id", id);
  if (error) throwDb(error);
}

export async function deleteHeroBanner(id: string) {
  const client = getClient();
  const { error } = await client.from("hero_banners").delete().eq("id", id);
  if (error) throwDb(error);
}

export async function fetchPublishedPromotions() {
  const client = getClient();
  const { data, error } = await client
    .from("promotions")
    .select("*")
    .eq("is_published", true)
    .order("sort_order", { ascending: true });
  if (error) throwDb(error);
  return (data ?? []) as Promotion[];
}

export async function fetchPromotionBySlug(slug: string) {
  const client = getClient();
  const { data, error } = await client
    .from("promotions")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();
  if (error) throwDb(error);
  return (data ?? null) as Promotion | null;
}

export async function fetchPromotionsAdmin() {
  const client = getClient();
  const { data, error } = await client.from("promotions").select("*").order("sort_order", { ascending: true });
  if (error) throwDb(error);
  return (data ?? []) as Promotion[];
}

export async function createPromotion(payload: Partial<Promotion>) {
  const client = getClient();
  const { error } = await client.from("promotions").insert(payload);
  if (error) throwDb(error);
}

export async function updatePromotion(id: string, payload: Partial<Promotion>) {
  const client = getClient();
  const { error } = await client.from("promotions").update(payload).eq("id", id);
  if (error) throwDb(error);
}

export async function deletePromotion(id: string) {
  const client = getClient();
  const { error } = await client.from("promotions").delete().eq("id", id);
  if (error) throwDb(error);
}

