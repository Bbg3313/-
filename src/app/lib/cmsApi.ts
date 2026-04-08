import type { HeroBanner, Promotion } from "../types/cms";
import { supabase } from "./supabase";

type UploadBucket = "hero-images" | "promotion-images";

function getClient() {
  if (!supabase) {
    throw new Error("Supabase is not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.");
  }
  return supabase;
}

export async function uploadImage(bucket: UploadBucket, file: File) {
  const client = getClient();
  const ext = file.name.split(".").pop() || "png";
  const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const { error } = await client.storage.from(bucket).upload(path, file, { upsert: false });
  if (error) throw error;
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
  if (error) throw error;
  return (data ?? []) as HeroBanner[];
}

export async function fetchHeroBannersAdmin() {
  const client = getClient();
  const { data, error } = await client.from("hero_banners").select("*").order("sort_order", { ascending: true });
  if (error) throw error;
  return (data ?? []) as HeroBanner[];
}

export async function createHeroBanner(payload: Partial<HeroBanner>) {
  const client = getClient();
  const { error } = await client.from("hero_banners").insert(payload);
  if (error) throw error;
}

export async function updateHeroBanner(id: string, payload: Partial<HeroBanner>) {
  const client = getClient();
  const { error } = await client.from("hero_banners").update(payload).eq("id", id);
  if (error) throw error;
}

export async function deleteHeroBanner(id: string) {
  const client = getClient();
  const { error } = await client.from("hero_banners").delete().eq("id", id);
  if (error) throw error;
}

export async function fetchPublishedPromotions() {
  const client = getClient();
  const { data, error } = await client
    .from("promotions")
    .select("*")
    .eq("is_published", true)
    .order("sort_order", { ascending: true });
  if (error) throw error;
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
  if (error) throw error;
  return (data ?? null) as Promotion | null;
}

export async function fetchPromotionsAdmin() {
  const client = getClient();
  const { data, error } = await client.from("promotions").select("*").order("sort_order", { ascending: true });
  if (error) throw error;
  return (data ?? []) as Promotion[];
}

export async function createPromotion(payload: Partial<Promotion>) {
  const client = getClient();
  const { error } = await client.from("promotions").insert(payload);
  if (error) throw error;
}

export async function updatePromotion(id: string, payload: Partial<Promotion>) {
  const client = getClient();
  const { error } = await client.from("promotions").update(payload).eq("id", id);
  if (error) throw error;
}

export async function deletePromotion(id: string) {
  const client = getClient();
  const { error } = await client.from("promotions").delete().eq("id", id);
  if (error) throw error;
}

