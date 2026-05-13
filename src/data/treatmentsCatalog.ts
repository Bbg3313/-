/**
 * 시술 안내 — 상세(세부 시술)는 `pricingData`의 가격표 섹션과 1:1 동기화합니다.
 * 카테고리(5개)는 원내 메뉴 구조이며, 각 섹션은 아래 매핑으로 분류됩니다.
 */

import { PRICING_SECTIONS, type PricingSection } from "./pricingData";
import {
  getProcedureDetailSpecs,
  PROCEDURE_DETAIL_SPECS,
  type ProcedureDetailSpecs,
} from "./procedureDetailSpecs";

export type { ProcedureDetailSpecs } from "./procedureDetailSpecs";

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
  /** 부위·시간·회복 등 (`procedureDetailSpecs`) */
  specs: ProcedureDetailSpecs;
  /** pricingData PRICING_SECTIONS.id — 가격표 앵커 `#pricing-{id}` */
  priceSectionId?: string;
  sort: number;
};

/** 시술 안내 상단 메뉴용 5개 카테고리 (URL slug) */
export const PROCEDURE_CATEGORIES: ProcedureCategory[] = [
  {
    slug: "botox-filler",
    label: "보톡스/필러",
    blurb: "보톡스·필러·바디·스킨보톡스 등 주름·볼륨 시술",
    sort: 10,
  },
  {
    slug: "thread-lifting",
    label: "실리프팅",
    blurb: "녹는 실을 이용한 리프팅·처짐 개선",
    sort: 20,
  },
  {
    slug: "laser",
    label: "레이저",
    blurb: "색소·CO₂·문신 제거·모공·흉터·제모 등 레이저 시술",
    sort: 30,
  },
  {
    slug: "lifting-laser",
    label: "리프팅레이저",
    blurb: "초음파·고주파 등 에너지 기반 리프팅",
    sort: 40,
  },
  {
    slug: "glow-booster",
    label: "물광/스킨부스터",
    blurb: "물광·스킨부스터·피부관리·여드름·지방분해 주사·수액 등",
    sort: 50,
  },
].sort((a, b) => a.sort - b.sort);

/** 가격표 섹션 id → 시술 안내 카테고리 slug */
const DISPLAY_CATEGORY_BY_SECTION_ID: Record<string, string> = {
  botox: "botox-filler",
  filler: "botox-filler",
  "thread-lifting": "thread-lifting",
  "laser-lifting": "lifting-laser",
  co2: "laser",
  "pigment-laser": "laser",
  "tattoo-removal": "laser",
  "pore-scar": "laser",
  "hair-female": "laser",
  "hair-male": "laser",
  booster: "glow-booster",
  "daily-care": "glow-booster",
  "acne-care": "glow-booster",
  fat: "glow-booster",
  iv: "glow-booster",
  noncovered: "glow-booster",
};

function procedureBodyFromSection(s: PricingSection): string {
  const lines: string[] = [];
  if (s.description) lines.push(s.description);
  lines.push(
    "부위·횟수·옵션별 금액은 시술·가격표에서 확인하실 수 있으며, 피부 상태에 따라 시행 여부와 단계는 상담 후 결정됩니다.",
  );
  if (s.footnotes?.length) {
    lines.push("");
    lines.push(s.footnotes.join("\n\n"));
  }
  return lines.join("\n\n");
}

function heroImageForPricingSection(id: string): string | undefined {
  switch (id) {
    case "botox":
      return "/images/signature-care/botox-meditoxin.png";
    case "filler":
      return "/images/signature-care/filler-atiere.png";
    case "co2":
    case "pigment-laser":
    case "tattoo-removal":
    case "pore-scar":
      return "/images/signature-care/laser-miin.png";
    case "laser-lifting":
      return "/images/signature-care/lifting-shurink.png";
    case "thread-lifting":
      return "/images/signature-care/lifting-density.png";
    case "hair-female":
    case "hair-male":
      return "/images/signature-care/hair-dual-accento-n.png";
    default:
      return undefined;
  }
}

const specKeys = new Set(Object.keys(PROCEDURE_DETAIL_SPECS));
for (const s of PRICING_SECTIONS) {
  if (!specKeys.has(s.id)) {
    throw new Error(
      `[treatmentsCatalog] 가격표 섹션 "${s.id}"에 대한 시술 스펙이 procedureDetailSpecs.ts에 없습니다.`,
    );
  }
  if (!DISPLAY_CATEGORY_BY_SECTION_ID[s.id]) {
    throw new Error(
      `[treatmentsCatalog] 가격표 섹션 "${s.id}"에 대한 시술 안내 카테고리 매핑이 없습니다. DISPLAY_CATEGORY_BY_SECTION_ID를 수정하세요.`,
    );
  }
}

const allowedCategorySlugs = new Set(PROCEDURE_CATEGORIES.map((c) => c.slug));
for (const cat of Object.values(DISPLAY_CATEGORY_BY_SECTION_ID)) {
  if (!allowedCategorySlugs.has(cat)) {
    throw new Error(`[treatmentsCatalog] 알 수 없는 시술 카테고리 slug: ${cat}`);
  }
}

const perCategorySeq = new Map<string, number>();

export const PROCEDURE_TREATMENTS: ProcedureTreatment[] = PRICING_SECTIONS.map((s) => {
  const categorySlug = DISPLAY_CATEGORY_BY_SECTION_ID[s.id];
  const n = (perCategorySeq.get(categorySlug) ?? 0) + 1;
  perCategorySeq.set(categorySlug, n);
  const specs = getProcedureDetailSpecs(s.id);
  if (!specs) {
    throw new Error(`[treatmentsCatalog] 시술 스펙 누락: ${s.id}`);
  }
  return {
    slug: s.id,
    categorySlug,
    title: s.title,
    subtitle: s.description,
    body: procedureBodyFromSection(s),
    heroImage: heroImageForPricingSection(s.id),
    specs,
    priceSectionId: s.id,
    sort: n * 10,
  };
}).sort((a, b) =>
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
