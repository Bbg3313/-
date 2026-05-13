-- 시술 안내 상세/카테고리 히어로 이미지 오버레이 (관리자 업로드)
-- treatment_slug: `카테고리슬러그/시술슬러그` 권장 (예: botox-filler/jaw-botox). 레거시로 시술 슬러그만 둔 행도 앱에서 읽습니다.
-- Supabase SQL Editor에서 실행 후, scripts/supabase-storage-buckets.sql 에 procedure-images 버킷이 있는지 확인하세요.

create table if not exists public.procedure_hero_images (
  treatment_slug text primary key,
  hero_image_url text not null,
  updated_at timestamptz not null default now()
);

alter table public.procedure_hero_images enable row level security;

drop policy if exists "public_read_procedure_hero_images" on public.procedure_hero_images;
create policy "public_read_procedure_hero_images" on public.procedure_hero_images
for select using (true);

drop policy if exists "admin_all_procedure_hero_images" on public.procedure_hero_images;
create policy "admin_all_procedure_hero_images" on public.procedure_hero_images
for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
