/** Supabase `procedure_hero_images.treatment_slug` 저장 키 (카테고리 내 유일) */
export function procedureHeroImageStorageKey(categorySlug: string, treatmentSlug: string): string {
  return `${categorySlug}/${treatmentSlug}`;
}

export function pickProcedureHeroImageUrl(
  categorySlug: string,
  treatmentSlug: string,
  defaultUrl: string | undefined,
  overrides: Record<string, string>,
): string | undefined {
  const composite = procedureHeroImageStorageKey(categorySlug, treatmentSlug);
  const fromDb = overrides[composite]?.trim() || overrides[treatmentSlug]?.trim();
  if (fromDb) return fromDb;
  return defaultUrl;
}
