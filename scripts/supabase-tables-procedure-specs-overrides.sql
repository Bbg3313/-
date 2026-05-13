-- 시술 안내 상세「시술 요약」(ProcedureDetailSpecs) 관리자 오버레이
-- treatment_key: `카테고리슬러그/시술슬러그` (예: botox-filler/jaw-botox)
-- specs_patch: jsonb — 시술 요약 필드 전부 또는 일부 (앱에서 카탈로그와 얕게 병합)

create table if not exists public.procedure_specs_overrides (
  treatment_key text primary key,
  specs_patch jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.procedure_specs_overrides enable row level security;

drop policy if exists "public_read_procedure_specs_overrides" on public.procedure_specs_overrides;
create policy "public_read_procedure_specs_overrides" on public.procedure_specs_overrides
for select using (true);

drop policy if exists "admin_all_procedure_specs_overrides" on public.procedure_specs_overrides;
create policy "admin_all_procedure_specs_overrides" on public.procedure_specs_overrides
for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
