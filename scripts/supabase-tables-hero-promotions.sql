-- =============================================================================
-- "Could not find the table ... in the schema cache" (promotions, pricing_content 등)
-- Supabase → SQL Editor 에서 이 파일 전체를 실행하세요.
-- (스토리지 버킷만 만들고 이 스크립트를 안 돌린 경우가 많습니다.)
-- =============================================================================

create table if not exists public.hero_banners (
  id uuid primary key default gen_random_uuid(),
  title text,
  subtitle text,
  image_url text not null,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.promotions (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  summary text,
  period text,
  thumbnail_url text not null,
  detail_images jsonb,
  content text,
  sort_order int not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.notices (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  content text,
  author text not null default '연세미의원',
  sort_order int not null default 0,
  is_published boolean not null default true,
  images jsonb,
  attachments jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.hero_banners enable row level security;
alter table public.promotions enable row level security;
alter table public.notices enable row level security;

create table if not exists public.pricing_content (
  singleton text primary key default 'main',
  payload jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.pricing_content enable row level security;

drop policy if exists "public_read_hero_active" on public.hero_banners;
create policy "public_read_hero_active" on public.hero_banners
for select using (is_active = true);

drop policy if exists "public_read_published_promotions" on public.promotions;
create policy "public_read_published_promotions" on public.promotions
for select using (is_published = true);

drop policy if exists "admin_all_hero" on public.hero_banners;
create policy "admin_all_hero" on public.hero_banners
for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "admin_all_promotions" on public.promotions;
create policy "admin_all_promotions" on public.promotions
for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "public_read_published_notices" on public.notices;
create policy "public_read_published_notices" on public.notices
for select using (is_published = true);

drop policy if exists "admin_all_notices" on public.notices;
create policy "admin_all_notices" on public.notices
for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "public_read_pricing_content" on public.pricing_content;
create policy "public_read_pricing_content" on public.pricing_content
for select using (true);

drop policy if exists "admin_all_pricing_content" on public.pricing_content;
create policy "admin_all_pricing_content" on public.pricing_content
for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- PostgREST가 새 테이블을 바로 인식하도록 (권한 오류 나면 이 줄만 제거 후 재시도)
notify pgrst, 'reload schema';
