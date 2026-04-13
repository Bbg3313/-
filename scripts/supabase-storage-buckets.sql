-- =============================================================================
-- 업로드 오류 "Bucket not found" 일 때: Supabase → SQL Editor 에서 한 번 실행
-- 프로모션 저장 시 "promotions 테이블 없음" 이면 → supabase-tables-hero-promotions.sql 먼저 실행
-- =============================================================================

insert into storage.buckets (id, name, public)
values ('hero-images', 'hero-images', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('promotion-images', 'promotion-images', true)
on conflict (id) do nothing;

-- 공개 읽기 (사이트 방문자가 이미지 URL로 조회)
drop policy if exists "public_read_hero_images" on storage.objects;
create policy "public_read_hero_images" on storage.objects
for select using (bucket_id = 'hero-images');

drop policy if exists "public_read_promotion_images" on storage.objects;
create policy "public_read_promotion_images" on storage.objects
for select using (bucket_id = 'promotion-images');

-- 로그인한 관리자만 업로드·삭제·덮어쓰기
drop policy if exists "auth_write_hero_images" on storage.objects;
create policy "auth_write_hero_images" on storage.objects
for all using (bucket_id = 'hero-images' and auth.role() = 'authenticated')
with check (bucket_id = 'hero-images' and auth.role() = 'authenticated');

drop policy if exists "auth_write_promotion_images" on storage.objects;
create policy "auth_write_promotion_images" on storage.objects
for all using (bucket_id = 'promotion-images' and auth.role() = 'authenticated')
with check (bucket_id = 'promotion-images' and auth.role() = 'authenticated');
