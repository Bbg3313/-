/**
 * 시술 안내 — 데이터는 `proceduresExcelCatalog.ts`(엑셀 기준)만 사용합니다.
 * 가격표와 동기화하지 않습니다.
 */

export type {
  ProcedureCategory,
  ProcedureTreatment,
  ProcedureDetailSpecs,
} from "./proceduresExcelCatalog";

export {
  PROCEDURE_SPEC_LABELS,
  PROCEDURE_CATEGORIES,
  EXCEL_PROCEDURE_TREATMENTS,
  PROCEDURE_TREATMENTS,
  getProcedureCategory,
  listTreatmentsByCategory,
  getProcedureTreatment,
  procedureDetailPath,
  procedureCategoryPath,
} from "./proceduresExcelCatalog";
