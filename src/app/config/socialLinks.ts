/**
 * SNS 전체 URL을 넣으면 푸터 아이콘이 링크로 동작합니다.
 * 빈 문자열이면 해당 아이콘은 비활성(회색)으로만 표시됩니다.
 *
 * (선택) .env에 VITE_INSTAGRAM_URL, VITE_NAVER_BLOG_URL 이 있으면 그 값이 우선합니다.
 */
const envIg = typeof import.meta.env.VITE_INSTAGRAM_URL === "string" ? import.meta.env.VITE_INSTAGRAM_URL.trim() : "";
const envNb = typeof import.meta.env.VITE_NAVER_BLOG_URL === "string" ? import.meta.env.VITE_NAVER_BLOG_URL.trim() : "";

/** 파일에서 직접 넣을 주소 (env가 비어 있을 때 사용) */
const FILE_IG = "";
const FILE_NB = "";

export const SOCIAL_LINKS = {
  instagram: envIg || FILE_IG,
  naverBlog: envNb || FILE_NB,
} as const;
