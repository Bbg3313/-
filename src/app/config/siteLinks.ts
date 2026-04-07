/**
 * 사이트 내 주요 외부 링크를 한 곳에서 관리합니다.
 * (선택) .env에 값이 있으면 그 값이 우선합니다.
 */

const envEventBoard =
  typeof import.meta.env.VITE_EVENT_BOARD_URL === "string" ? import.meta.env.VITE_EVENT_BOARD_URL.trim() : "";
const envReservation =
  typeof import.meta.env.VITE_NAVER_RESERVATION_URL === "string" ? import.meta.env.VITE_NAVER_RESERVATION_URL.trim() : "";

// 파일 기본값 (env가 비어 있을 때 사용)
const FILE_EVENT_BOARD_URL = "https://blog.naver.com/kj_yslove";
const FILE_NAVER_RESERVATION_URL =
  "https://map.naver.com/p/entry/place/1084784069?placePath=/home?from=map&fromPanelNum=1&additionalHeight=76&timestamp=202604071448&locale=ko&svcName=map_pcv5&c=16.52,0,0,0,dh";

export const SITE_LINKS = {
  eventBoard: envEventBoard || FILE_EVENT_BOARD_URL,
  reservation: envReservation || FILE_NAVER_RESERVATION_URL,
} as const;

