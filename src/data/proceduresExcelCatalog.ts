/**
 * 시술 안내 — 세부 시술 목록·스펙은 가격표와 무관합니다.
 * `시술정리.xlsx` (또는 동일 구조) 내용을 아래 `EXCEL_PROCEDURE_TREATMENTS`에 그대로 반영하세요.
 * 엑셀 컬럼 예: 부위 | 시술정보 | 마취시간 | 시술시간 | 회복기간 | 유지기간 | 재시술주기 | 주의사항 | 제목 | 부제 | 본문
 * (선택) 가격표와 연결할 때만 `priceSectionId`에 pricing 섹션 id를 넣습니다.
 */

export type ProcedureDetailSpecs = {
  area: string;
  procedureInfo: string;
  anesthesiaTime: string;
  procedureTime: string;
  recoveryPeriod: string;
  effectDuration: string;
  retreatmentInterval: string;
  precautions: string;
};

export const PROCEDURE_SPEC_LABELS: { key: keyof ProcedureDetailSpecs; label: string }[] = [
  { key: "area", label: "부위" },
  { key: "procedureInfo", label: "시술정보" },
  { key: "anesthesiaTime", label: "마취시간" },
  { key: "procedureTime", label: "시술시간" },
  { key: "recoveryPeriod", label: "회복기간" },
  { key: "effectDuration", label: "유지기간" },
  { key: "retreatmentInterval", label: "재시술주기" },
  { key: "precautions", label: "주의사항" },
];

/** 엑셀 붙여넣기 전 공통 스펙 틀 — 행마다 엑셀 값으로 바꾸면 됩니다. */
export const EXCEL_SPEC_TEMPLATE: ProcedureDetailSpecs = {
  area: "엑셀「부위」",
  procedureInfo: "엑셀「시술정보」",
  anesthesiaTime: "엑셀「마취시간」",
  procedureTime: "엑셀「시술시간」",
  recoveryPeriod: "엑셀「회복기간」",
  effectDuration: "엑셀「유지기간」",
  retreatmentInterval: "엑셀「재시술주기」",
  precautions: "엑셀「주의사항」",
};

export type ProcedureCategory = {
  slug: string;
  label: string;
  blurb?: string;
  sort: number;
};

export type ProcedureTreatment = {
  slug: string;
  categorySlug: string;
  title: string;
  subtitle?: string;
  body: string;
  heroImage?: string;
  gallery?: string[];
  specs: ProcedureDetailSpecs;
  /** 넣을 때만: 가격표 앵커 `#pricing-{id}` (없으면 가격 페이지 일반 링크만) */
  priceSectionId?: string;
  sort: number;
};

export const PROCEDURE_CATEGORIES: ProcedureCategory[] = [
  {
    slug: "botox-filler",
    label: "보톡스/필러",
    blurb: "보톡스·필러·바디·스킨보톡스 등",
    sort: 10,
  },
  { slug: "thread-lifting", label: "실리프팅", blurb: "녹는 실 리프팅", sort: 20 },
  { slug: "laser", label: "레이저", blurb: "색소·CO₂·문신·모공·제모 등", sort: 30 },
  { slug: "lifting-laser", label: "리프팅레이저", blurb: "초음파·고주파 리프팅", sort: 40 },
  {
    slug: "glow-booster",
    label: "물광/스킨부스터",
    blurb: "물광·부스터·피부관리·주사 케어 등",
    sort: 50,
  },
].sort((a, b) => a.sort - b.sort);

const S = EXCEL_SPEC_TEMPLATE;

/**
 * 세부 시술 — 엑셀 행 순서·문구에 맞춰 이 배열만 수정하세요.
 * slug는 영문·숫자·하이픈(한 카테고리 안에서 중복 없음).
 */
type ExcelProcedureRowInput = Omit<ProcedureTreatment, "body"> & { body?: string };

const RAW_EXCEL_PROCEDURE_TREATMENTS: ExcelProcedureRowInput[] = [
  // ——— 보톡스/필러 (엑셀 순서대로 교체) ———
  {
    slug: "botox-forehead-glabella",
    categorySlug: "botox-filler",
    title: "이마·미간 보톡스",
    subtitle: "주름 완화",
    body: "엑셀「본문」",
    heroImage: "/images/signature-care/botox-meditoxin.png",
    specs: { ...S },
    sort: 10,
  },
  {
    slug: "botox-eye",
    categorySlug: "botox-filler",
    title: "눈가·눈밑 보톡스",
    specs: { ...S },
    sort: 20,
  },
  {
    slug: "botox-jaw-masseter",
    categorySlug: "botox-filler",
    title: "턱·침샘 보톡스",
    specs: { ...S },
    sort: 30,
  },
  {
    slug: "skin-botox",
    categorySlug: "botox-filler",
    title: "스킨보톡스",
    specs: { ...S },
    sort: 40,
  },
  {
    slug: "body-botox",
    categorySlug: "botox-filler",
    title: "바디 보톡스",
    specs: { ...S },
    sort: 50,
  },
  {
    slug: "filler-volume",
    categorySlug: "botox-filler",
    title: "볼륨 필러",
    heroImage: "/images/signature-care/filler-atiere.png",
    specs: { ...S },
    sort: 60,
  },
  {
    slug: "filler-wrinkle",
    categorySlug: "botox-filler",
    title: "주름 필러",
    specs: { ...S },
    sort: 70,
  },
  {
    slug: "filler-lips",
    categorySlug: "botox-filler",
    title: "입술 필러",
    specs: { ...S },
    sort: 80,
  },
  // ——— 실리프팅 ———
  {
    slug: "thread-mint",
    categorySlug: "thread-lifting",
    title: "민트실 리프팅",
    heroImage: "/images/signature-care/lifting-density.png",
    specs: { ...S },
    sort: 10,
  },
  {
    slug: "thread-pcl",
    categorySlug: "thread-lifting",
    title: "PCL 실 리프팅",
    specs: { ...S },
    sort: 20,
  },
  {
    slug: "thread-jamber",
    categorySlug: "thread-lifting",
    title: "잼버실",
    specs: { ...S },
    sort: 30,
  },
  // ——— 레이저 ———
  {
    slug: "laser-pigment",
    categorySlug: "laser",
    title: "색소·기미 레이저",
    heroImage: "/images/signature-care/laser-miin.png",
    specs: { ...S },
    sort: 10,
  },
  {
    slug: "laser-co2",
    categorySlug: "laser",
    title: "CO₂ 점·병변",
    specs: { ...S },
    sort: 20,
  },
  {
    slug: "laser-tattoo",
    categorySlug: "laser",
    title: "문신 제거",
    specs: { ...S },
    sort: 30,
  },
  {
    slug: "laser-toning-genesis",
    categorySlug: "laser",
    title: "토닝·제네시스",
    specs: { ...S },
    sort: 40,
  },
  {
    slug: "laser-flush",
    categorySlug: "laser",
    title: "홍조 레이저",
    specs: { ...S },
    sort: 50,
  },
  {
    slug: "laser-pore-scar",
    categorySlug: "laser",
    title: "모공·흉터 레이저",
    specs: { ...S },
    sort: 60,
  },
  {
    slug: "laser-hair-removal",
    categorySlug: "laser",
    title: "레이저 제모",
    heroImage: "/images/signature-care/hair-dual-accento-n.png",
    specs: { ...S },
    sort: 70,
  },
  // ——— 리프팅레이저 ———
  {
    slug: "lifting-hifu",
    categorySlug: "lifting-laser",
    title: "초음파 리프팅",
    heroImage: "/images/signature-care/lifting-shurink.png",
    specs: { ...S },
    sort: 10,
  },
  {
    slug: "lifting-rf-density",
    categorySlug: "lifting-laser",
    title: "고주파 리프팅",
    specs: { ...S },
    sort: 20,
  },
  {
    slug: "lifting-volume-eye",
    categorySlug: "lifting-laser",
    title: "볼륨·아이 리프팅",
    specs: { ...S },
    sort: 30,
  },
  // ——— 물광/스킨부스터 ———
  {
    slug: "glow-skin-booster",
    categorySlug: "glow-booster",
    title: "물광·스킨부스터",
    specs: { ...S },
    sort: 10,
  },
  {
    slug: "glow-rejuran",
    categorySlug: "glow-booster",
    title: "리쥬란",
    specs: { ...S },
    sort: 20,
  },
  {
    slug: "glow-juvelook",
    categorySlug: "glow-booster",
    title: "쥬베룩",
    specs: { ...S },
    sort: 30,
  },
  {
    slug: "glow-goddess",
    categorySlug: "glow-booster",
    title: "여신주사",
    specs: { ...S },
    sort: 40,
  },
  {
    slug: "glow-daily-care",
    categorySlug: "glow-booster",
    title: "데일리 피부관리",
    specs: { ...S },
    sort: 50,
  },
  {
    slug: "glow-acne-program",
    categorySlug: "glow-booster",
    title: "여드름 집중 케어",
    specs: { ...S },
    sort: 60,
  },
  {
    slug: "glow-fat-dissolve",
    categorySlug: "glow-booster",
    title: "지방분해 주사",
    specs: { ...S },
    sort: 70,
  },
  {
    slug: "glow-iv",
    categorySlug: "glow-booster",
    title: "수액·비타민",
    specs: { ...S },
    sort: 80,
  },
];

export const EXCEL_PROCEDURE_TREATMENTS: ProcedureTreatment[] = RAW_EXCEL_PROCEDURE_TREATMENTS.map((row) => ({
  ...row,
  body: row.body ?? "엑셀「본문」",
}));

const allowed = new Set(PROCEDURE_CATEGORIES.map((c) => c.slug));
const seen = new Set<string>();
for (const t of EXCEL_PROCEDURE_TREATMENTS) {
  if (!allowed.has(t.categorySlug)) {
    throw new Error(`[proceduresExcelCatalog] 알 수 없는 categorySlug: ${t.categorySlug} (시술: ${t.slug})`);
  }
  const key = `${t.categorySlug}/${t.slug}`;
  if (seen.has(key)) throw new Error(`[proceduresExcelCatalog] 중복 slug: ${key}`);
  seen.add(key);
}

export const PROCEDURE_TREATMENTS: ProcedureTreatment[] = [...EXCEL_PROCEDURE_TREATMENTS].sort((a, b) =>
  a.categorySlug === b.categorySlug ? a.sort - b.sort : a.categorySlug.localeCompare(b.categorySlug),
);

export function getProcedureCategory(slug: string): ProcedureCategory | undefined {
  return PROCEDURE_CATEGORIES.find((c) => c.slug === slug);
}

export function listTreatmentsByCategory(categorySlug: string): ProcedureTreatment[] {
  return PROCEDURE_TREATMENTS.filter((t) => t.categorySlug === categorySlug).sort((a, b) => a.sort - b.sort);
}

export function getProcedureTreatment(
  categorySlug: string,
  treatmentSlug: string,
): ProcedureTreatment | undefined {
  return PROCEDURE_TREATMENTS.find((t) => t.categorySlug === categorySlug && t.slug === treatmentSlug);
}

export function procedureDetailPath(categorySlug: string, treatmentSlug: string): string {
  return `/procedures/${categorySlug}/${treatmentSlug}`;
}

export function procedureCategoryPath(categorySlug: string): string {
  return `/procedures/${categorySlug}`;
}
