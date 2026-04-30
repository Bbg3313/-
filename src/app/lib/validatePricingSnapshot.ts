import type { PricingSnapshot } from "../../data/pricingData";

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}

function isStringArray(a: unknown): a is string[] {
  return Array.isArray(a) && a.every((x) => typeof x === "string");
}

function isStringMatrix(a: unknown): a is string[][] {
  return Array.isArray(a) && a.every((row) => Array.isArray(row) && row.every((c) => typeof c === "string"));
}

/**
 * 관리자가 저장한 JSON이 최소한의 형태를 갖는지 검사합니다.
 * (세부 필드까지 완전 검증하지는 않고, 페이지가 깨지지 않는 수준만 확인)
 */
export function parsePricingSnapshot(raw: unknown): PricingSnapshot | null {
  if (!isRecord(raw)) return null;
  if (typeof raw.vatNote !== "string" || !raw.vatNote.trim()) return null;
  if (!Array.isArray(raw.categories) || raw.categories.length === 0) return null;
  if (!Array.isArray(raw.sections) || raw.sections.length === 0) return null;

  for (const c of raw.categories) {
    if (!isRecord(c)) return null;
    if (typeof c.id !== "string" || typeof c.label !== "string") return null;
  }

  for (const s of raw.sections) {
    if (!isRecord(s)) return null;
    if (typeof s.id !== "string" || typeof s.categoryId !== "string" || typeof s.title !== "string") return null;
    if (!Array.isArray(s.tables)) return null;
    for (const t of s.tables) {
      if (!isRecord(t)) return null;
      if (!isStringArray(t.headers)) return null;
      if (!isStringMatrix(t.rows)) return null;
      if (t.priceColumns !== undefined && typeof t.priceColumns !== "number") return null;
    }
    if (s.description !== undefined && typeof s.description !== "string") return null;
    if (s.footnotes !== undefined) {
      if (!Array.isArray(s.footnotes) || !s.footnotes.every((x) => typeof x === "string")) return null;
    }
    if (s.laserHairRows !== undefined) {
      if (!Array.isArray(s.laserHairRows)) return null;
    }
  }

  return raw as PricingSnapshot;
}
