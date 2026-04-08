-- Run in Supabase SQL editor

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

alter table public.hero_banners enable row level security;
alter table public.promotions enable row level security;

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

-- Storage buckets
insert into storage.buckets (id, name, public)
values ('hero-images', 'hero-images', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('promotion-images', 'promotion-images', true)
on conflict (id) do nothing;

-- Public read
drop policy if exists "public_read_hero_images" on storage.objects;
create policy "public_read_hero_images" on storage.objects
for select using (bucket_id = 'hero-images');

drop policy if exists "public_read_promotion_images" on storage.objects;
create policy "public_read_promotion_images" on storage.objects
for select using (bucket_id = 'promotion-images');

-- Authenticated write
drop policy if exists "auth_write_hero_images" on storage.objects;
create policy "auth_write_hero_images" on storage.objects
for all using (bucket_id = 'hero-images' and auth.role() = 'authenticated')
with check (bucket_id = 'hero-images' and auth.role() = 'authenticated');

drop policy if exists "auth_write_promotion_images" on storage.objects;
create policy "auth_write_promotion_images" on storage.objects
for all using (bucket_id = 'promotion-images' and auth.role() = 'authenticated')
with check (bucket_id = 'promotion-images' and auth.role() = 'authenticated');

