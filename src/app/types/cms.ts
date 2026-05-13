export type HeroBanner = {
  id: string;
  title: string | null;
  subtitle: string | null;
  image_url: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type Promotion = {
  id: string;
  slug: string;
  title: string;
  summary: string | null;
  period: string | null;
  thumbnail_url: string;
  detail_images: string[] | null;
  content: string | null;
  sort_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
};

export type NoticeAttachment = {
  name: string;
  url: string;
  mime_type: string | null;
  size_bytes: number | null;
};

export type Notice = {
  id: string;
  slug: string;
  title: string;
  content: string | null;
  author: string;
  sort_order: number;
  is_published: boolean;
  images: string[] | null;
  attachments: NoticeAttachment[] | null;
  created_at: string;
  updated_at: string;
};

/** `treatment_slug` 컬럼: 권장 `categorySlug/treatmentSlug`, 레거시로 시술 슬러그만 저장된 행도 허용 */
export type ProcedureHeroImageRow = {
  treatment_slug: string;
  hero_image_url: string;
  updated_at: string;
};

/** 시술 요약 JSON — 키는 ProcedureDetailSpecs 필드명과 동일 */
export type ProcedureSpecsOverrideRow = {
  treatment_key: string;
  specs_patch: Record<string, string>;
  updated_at: string;
};

