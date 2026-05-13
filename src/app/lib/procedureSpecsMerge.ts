import type { ProcedureDetailSpecs } from "../../data/proceduresExcelCatalog";
import { PROCEDURE_SPEC_LABELS } from "../../data/treatmentsCatalog";

export function sanitizeSpecPatch(raw: unknown): Partial<ProcedureDetailSpecs> {
  if (!raw || typeof raw !== "object") return {};
  const allowed = new Set<string>(PROCEDURE_SPEC_LABELS.map((x) => x.key));
  const out: Partial<ProcedureDetailSpecs> = {};
  for (const [k, v] of Object.entries(raw as Record<string, unknown>)) {
    if (!allowed.has(k)) continue;
    if (typeof v === "string") (out as Record<string, string>)[k] = v;
  }
  return out;
}

export function mergeProcedureSpecs(
  base: ProcedureDetailSpecs,
  patch: Partial<ProcedureDetailSpecs> | undefined,
): ProcedureDetailSpecs {
  if (!patch || Object.keys(patch).length === 0) return base;
  return { ...base, ...patch };
}
