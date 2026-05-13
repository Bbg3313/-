/**
 * 시술 안내 — 카테고리 / 상세 (엑셀·이미지 반영 시 이 파일 또는 Supabase로 확장)
 * priceSectionId: 시술/가격 페이지의 섹션 DOM id 접두사 없이 section id만 (예: pigment-laser)
 */

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
  /** pricingData PRICING_SECTIONS.id — UI에서 가격표 안내용 */
  priceSectionId?: string;
  sort: number;
};

export const PROCEDURE_CATEGORIES: ProcedureCategory[] = [
  { slug: "pigment", label: "기미·색소", blurb: "색소·기미·잡티 레이저 및 복합 케어", sort: 10 },
  { slug: "lifting", label: "리프팅·탄력", blurb: "초음파·고주파·실 리프팅 등", sort: 20 },
  { slug: "acne", label: "여드름", blurb: "염증·자국·흉터까지 단계별 프로토콜", sort: 30 },
  { slug: "pore-scar", label: "모공·흉터", blurb: "모공·박피·흉터 개선 시술", sort: 40 },
  { slug: "hair", label: "제모", blurb: "부위·피부 타입에 맞는 레이저 제모", sort: 50 },
  { slug: "flush", label: "홍조·민감성", blurb: "홍조·혈관·장벽 케어", sort: 60 },
  { slug: "booster", label: "스킨부스터", blurb: "수분·재생·탄력 부스터", sort: 70 },
  { slug: "special", label: "특수클리닉", blurb: "집중·맞춤 프로그램", sort: 80 },
  { slug: "medical-skincare", label: "메디컬스킨케어", blurb: "재생·진정·데일리 케어", sort: 90 },
].sort((a, b) => a.sort - b.sort);

export const PROCEDURE_TREATMENTS: ProcedureTreatment[] = [
  {
    slug: "pigment-laser-guide",
    categorySlug: "pigment",
    title: "색소 레이저 시술 바로알기",
    subtitle: "Q-Switched Nd:YAG 등 레이저 토닝·색소 치료 개요",
    heroImage: "/images/signature-care/laser-miin.png",
    priceSectionId: "pigment-laser",
    sort: 10,
    body:
      "색소 레이저는 피부 속 멜라닌을 선택적으로 분쇄해 기미·잡티· 문신 등을 개선하는 시술입니다.\n\n시술 전 피부 타입·색소 깊이를 확인하고, 단계별 에너지로 진행합니다. 자외선 차단과 보습은 시술 후 관리에 매우 중요합니다.",
  },
  {
    slug: "blemish-freckle",
    categorySlug: "pigment",
    title: "기미·잡티·주근깨·색소침착",
    subtitle: "부위별 맞춤 프로토콜",
    heroImage: "/images/signature-care/laser-miin.png",
    priceSectionId: "pigment-laser",
    sort: 20,
    body:
      "얼굴 전체 또는 부위별로 색소 침착 정도를 평가한 뒤, 레이저 종류와 간격을 조절합니다.\n\n개인차가 크므로 상담 후 횟수·간격을 안내드립니다.",
  },
  {
    slug: "shurink-lifting",
    categorySlug: "lifting",
    title: "초음파 리프팅 · 슈링크",
    subtitle: "피부층 깊이에 에너지 전달",
    heroImage: "/images/signature-care/lifting-shurink.png",
    priceSectionId: "laser-lifting",
    sort: 10,
    body:
      "HIFU 에너지로 SMAS 층까지 자극해 탄력·리프팅을 도와줍니다.\n\n통증·붓기는 개인차가 있으며, 시술 직후 일상생활이 가능한 경우가 많습니다.",
  },
  {
    slug: "density-lifting",
    categorySlug: "lifting",
    title: "덴시티 (DENSITY) · 듀얼 고주파",
    subtitle: "깊고 넓은 리프팅 케어",
    heroImage: "/images/signature-care/lifting-density.png",
    priceSectionId: "laser-lifting",
    sort: 20,
    body:
      "듀얼 고주파 에너지로 피부 깊이와 넓이에 맞춰 탄력 개선을 목표로 합니다.\n\n보톡스·필러 등과 병행 여부는 내원 상담 시 결정합니다.",
  },
  {
    slug: "acne-program",
    categorySlug: "acne",
    title: "여드름 집중 프로그램",
    subtitle: "염증 조절 · 모공 · 자국 관리",
    priceSectionId: "acne-care",
    sort: 10,
    body:
      "여드름 단계(염성·비염성)와 부위에 따라 약물·시술·스킨케어를 조합합니다.\n\n생활 습관·스킨루틴도 함께 안내드립니다.",
  },
  {
    slug: "pore-scar-care",
    categorySlug: "pore-scar",
    title: "모공·흉터 케어",
    subtitle: "레이저·필링 복합",
    priceSectionId: "pore-scar",
    sort: 10,
    body:
      "모공 확대와 흉터(소양·함몰) 유형을 구분해 시술을 선택합니다.\n\n회복 기간과 주의사항은 시술별로 상이합니다.",
  },
  {
    slug: "laser-hair-removal",
    categorySlug: "hair",
    title: "레이저 제모",
    subtitle: "듀얼 파장 레이저",
    heroImage: "/images/signature-care/hair-dual-accento-n.png",
    priceSectionId: "hair-female",
    sort: 10,
    body:
      "부위·모발 색·피부 타입에 맞춰 샷 수와 간격을 조절합니다.\n\n제모 레이저는 여러 회차가 필요하며, 상담 시 견적을 안내드립니다.",
  },
  {
    slug: "flush-sensitive",
    categorySlug: "flush",
    title: "홍조·민감 피부 케어",
    subtitle: "혈관·장벽 중심",
    priceSectionId: "pigment-laser",
    sort: 10,
    body:
      "홍조와 민감도를 동시에 고려해 자극을 최소화하는 방향으로 계획합니다.\n\n장벽 회복과 자외선 차단을 병행합니다.",
  },
  {
    slug: "skin-booster-line",
    categorySlug: "booster",
    title: "스킨부스터",
    subtitle: "수분·광채·재생",
    priceSectionId: "booster",
    sort: 10,
    body:
      "히알루론산·필요 시 복합 성분으로 피부 결·탄력을 보조합니다.\n\n시술 간격은 제품·상태에 따라 조절합니다.",
  },
  {
    slug: "special-focus",
    categorySlug: "special",
    title: "특수 집중 클리닉",
    subtitle: "맞춤 프로토콜",
    sort: 10,
    body:
      "원장 상담 후 단기 집중 또는 시즌 케어 형태로 구성할 수 있습니다.\n\n문의 시 가능 여부를 안내드립니다.",
  },
  {
    slug: "medical-skin-daily",
    categorySlug: "medical-skincare",
    title: "메디컬 스킨케어",
    subtitle: "진정·재생·데일리",
    priceSectionId: "daily-care",
    sort: 10,
    body:
      "시술 전후 관리와 홈케어 연계를 포함한 스킨케어 라인입니다.\n\n피부 반응에 따라 제품·순서를 조정합니다.",
  },
].sort((a, b) => (a.categorySlug === b.categorySlug ? a.sort - b.sort : a.categorySlug.localeCompare(b.categorySlug)));

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
