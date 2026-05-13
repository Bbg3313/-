/**
 * 시술 안내 — 세부 시술 목록·스펙은 `시술정리.xlsx`(카카오톡 받은 파일) 기준으로
 * `proceduresExcelContent.json`에 반영 후 빌드 시 함께 배포됩니다.
 *
 * 엑셀 갱신 절차: `scripts/parse-siseol-excel.py` → `scripts/export-procedures-json.py`
 * (기본 경로: Documents/카카오톡 받은 파일/시술정리.xlsx)
 */

import proceduresExcelContent from "./proceduresExcelContent.json";

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

const S: ProcedureDetailSpecs = {
  area: "-",
  procedureInfo: "-",
  anesthesiaTime: "-",
  procedureTime: "-",
  recoveryPeriod: "-",
  effectDuration: "-",
  retreatmentInterval: "-",
  precautions: "-",
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
  priceSectionId?: string;
  sort: number;
};

export const PROCEDURE_CATEGORIES: ProcedureCategory[] = [
  {
    slug: "botox-filler",
    label: "보톡스/필러",
    blurb: "턱·주름·스킨보톡스, 윤곽(디센바·브이올렛), 코조각, 필러(국산·수입), 필러 녹이는 주사",
    sort: 10,
  },
  { slug: "thread-lifting", label: "실리프팅", blurb: "민트실·PCL 실·잼버실·하이코 등 녹는 실 시술", sort: 20 },
  { slug: "laser", label: "레이저", blurb: "CO₂·듀얼 악센토·미인·GD 토닝·인피니·셀라스 등", sort: 30 },
  { slug: "lifting-laser", label: "리프팅레이저", blurb: "리프테라2·볼뉴머·슈링크·덴서티 등", sort: 40 },
  {
    slug: "glow-booster",
    label: "물광/스킨부스터",
    blurb: "하이주·릴리이드M·바이리즌·뉴라미스 스킨인핸서·리쥬란·리쥬란HB·리쥬란아이·쥬베룩·리투오 등",
    sort: 50,
  },
  { slug: "hair-removal", label: "제모", blurb: "레이저 제모", sort: 60 },
  { slug: "tattoo-removal", label: "문신제거", blurb: "레이저 문신 제거", sort: 70 },
].sort((a, b) => a.sort - b.sort);

type ExcelProcedureRowInput = Omit<ProcedureTreatment, "body" | "specs"> & { body?: string; specs?: ProcedureDetailSpecs };

const RAW_EXCEL_PROCEDURE_TREATMENTS: ExcelProcedureRowInput[] = [
  {
    slug: "jaw-botox",
    categorySlug: "botox-filler",
    title: "턱보톡스",
    heroImage: "/images/signature-care/botox-meditoxin.png",
    sort: 10,
  },
  {
    slug: "wrinkle-botox",
    categorySlug: "botox-filler",
    title: "주름보톡스",
    heroImage: "/images/signature-care/botox-meditoxin.png",
    sort: 20,
  },
  {
    slug: "skin-botox",
    categorySlug: "botox-filler",
    title: "스킨보톡스",
    heroImage: "/images/signature-care/botox-meditoxin.png",
    sort: 30,
  },
  {
    slug: "contour-descenba",
    categorySlug: "botox-filler",
    title: "윤곽주사(디센바)",
    sort: 40,
  },
  {
    slug: "contour-violet",
    categorySlug: "botox-filler",
    title: "브이올렛",
    sort: 50,
  },
  {
    slug: "nose-contour-injection",
    categorySlug: "botox-filler",
    title: "코조각주사",
    sort: 60,
  },
  {
    slug: "filler-domestic",
    categorySlug: "botox-filler",
    title: "필러(국산)",
    heroImage: "/images/signature-care/filler-atiere.png",
    sort: 70,
  },
  {
    slug: "filler-import",
    categorySlug: "botox-filler",
    title: "필러(수입)",
    heroImage: "/images/signature-care/filler-restylane.png",
    sort: 80,
  },
  {
    slug: "filler-dissolving-injection",
    categorySlug: "botox-filler",
    title: "필러 녹이는 주사",
    sort: 90,
  },
  {
    slug: "thread-mint",
    categorySlug: "thread-lifting",
    title: "민트실 리프팅",
    heroImage: "/images/signature-care/lifting-density.png",
    sort: 5,
  },
  {
    slug: "thread-pcl",
    categorySlug: "thread-lifting",
    title: "PCL 실 리프팅",
    heroImage: "/images/signature-care/lifting-density.png",
    sort: 10,
  },
  {
    slug: "thread-jamber",
    categorySlug: "thread-lifting",
    title: "잼버실",
    heroImage: "/images/signature-care/lifting-density.png",
    sort: 20,
  },
  {
    slug: "thread-hiko",
    categorySlug: "thread-lifting",
    title: "하이코",
    heroImage: "/images/signature-care/lifting-density.png",
    sort: 30,
  },
  {
    slug: "laser-co2",
    categorySlug: "laser",
    title: "CO2레이저",
    heroImage: "/images/signature-care/laser-miin.png",
    sort: 10,
  },
  {
    slug: "laser-dual-accento",
    categorySlug: "laser",
    title: "듀얼 악센토 레이저",
    heroImage: "/images/signature-care/laser-miin.png",
    sort: 20,
  },
  {
    slug: "laser-miin-toning",
    categorySlug: "laser",
    title: "미인토닝",
    heroImage: "/images/signature-care/laser-miin.png",
    sort: 30,
  },
  {
    slug: "laser-gd-toning",
    categorySlug: "laser",
    title: "GD 토닝",
    heroImage: "/images/signature-care/laser-miin.png",
    sort: 40,
  },
  {
    slug: "laser-inpini",
    categorySlug: "laser",
    title: "인피니 레이저",
    heroImage: "/images/signature-care/laser-miin.png",
    sort: 50,
  },
  {
    slug: "laser-cellas",
    categorySlug: "laser",
    title: "셀라스 레이저",
    heroImage: "/images/signature-care/laser-miin.png",
    sort: 60,
  },
  {
    slug: "lifting-liftera-2",
    categorySlug: "lifting-laser",
    title: "리프테라 2",
    heroImage: "/images/signature-care/lifting-shurink.png",
    sort: 10,
  },
  {
    slug: "lifting-volnewmer",
    categorySlug: "lifting-laser",
    title: "볼뉴머",
    heroImage: "/images/signature-care/lifting-shurink.png",
    sort: 20,
  },
  {
    slug: "lifting-shurink",
    categorySlug: "lifting-laser",
    title: "슈링크",
    heroImage: "/images/signature-care/lifting-shurink.png",
    sort: 30,
  },
  {
    slug: "lifting-density",
    categorySlug: "lifting-laser",
    title: "덴서티",
    heroImage: "/images/signature-care/lifting-density.png",
    sort: 40,
  },
  {
    slug: "glow-haiju",
    categorySlug: "glow-booster",
    title: "하이주",
    heroImage: "/images/signature-care/filler-atiere.png",
    sort: 10,
  },
  {
    slug: "glow-lilied-m",
    categorySlug: "glow-booster",
    title: "릴리이드M",
    sort: 20,
  },
  {
    slug: "glow-baireizen",
    categorySlug: "glow-booster",
    title: "바이리즌",
    sort: 30,
  },
  {
    slug: "glow-neuramis-skin-enhancer",
    categorySlug: "glow-booster",
    title: "뉴라미스 스킨인핸서",
    heroImage: "/images/signature-care/filler-neuramis.png",
    sort: 40,
  },
  {
    slug: "glow-rejuran",
    categorySlug: "glow-booster",
    title: "리쥬란",
    sort: 50,
  },
  {
    slug: "glow-rejuran-hb",
    categorySlug: "glow-booster",
    title: "리쥬란HB",
    sort: 60,
  },
  {
    slug: "glow-rejuran-eye",
    categorySlug: "glow-booster",
    title: "리쥬란아이",
    sort: 70,
  },
  {
    slug: "glow-juvelook-skin",
    categorySlug: "glow-booster",
    title: "쥬베룩스킨",
    sort: 80,
  },
  {
    slug: "glow-juvelook-volume",
    categorySlug: "glow-booster",
    title: "쥬베룩볼륨",
    sort: 90,
  },
  {
    slug: "glow-juvelook-eye",
    categorySlug: "glow-booster",
    title: "쥬베룩아이",
    sort: 100,
  },
  {
    slug: "glow-retoo",
    categorySlug: "glow-booster",
    title: "리투오",
    sort: 110,
  },
  {
    slug: "hair-removal",
    categorySlug: "hair-removal",
    title: "제모",
    heroImage: "/images/signature-care/hair-dual-accento-n.png",
    sort: 10,
  },
  {
    slug: "tattoo-removal",
    categorySlug: "tattoo-removal",
    title: "문신제거",
    heroImage: "/images/signature-care/laser-miin.png",
    sort: 10,
  },
];

type ExcelPayload = { specs: ProcedureDetailSpecs; body: string };

function applyExcel(row: ExcelProcedureRowInput): ProcedureTreatment {
  const hit = (proceduresExcelContent as Record<string, ExcelPayload>)[row.slug];
  if (!hit) {
    return { ...row, specs: row.specs ?? { ...S }, body: row.body ?? "" };
  }
  return {
    ...row,
    specs: hit.specs,
    body: hit.body,
  };
}

export const EXCEL_PROCEDURE_TREATMENTS: ProcedureTreatment[] = RAW_EXCEL_PROCEDURE_TREATMENTS.map(applyExcel);

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
