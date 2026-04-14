/**
 * 사이트 내 주요 외부 링크를 한 곳에서 관리합니다.
 * (선택) .env에 값이 있으면 그 값이 우선합니다.
 */

const envEventBoard =
  typeof import.meta.env.VITE_EVENT_BOARD_URL === "string" ? import.meta.env.VITE_EVENT_BOARD_URL.trim() : "";
/** 메인 예약 CTA·히어로 등 기본 목적지 (비우면 내부 /reservation) */
const envReservationTarget =
  typeof import.meta.env.VITE_RESERVATION_URL === "string" ? import.meta.env.VITE_RESERVATION_URL.trim() : "";
const envNaverReservation =
  typeof import.meta.env.VITE_NAVER_RESERVATION_URL === "string" ? import.meta.env.VITE_NAVER_RESERVATION_URL.trim() : "";
const envNaverTalk =
  typeof import.meta.env.VITE_NAVER_TALK_URL === "string" ? import.meta.env.VITE_NAVER_TALK_URL.trim() : "";
const envKakaoChannel =
  typeof import.meta.env.VITE_KAKAO_CHANNEL_URL === "string" ? import.meta.env.VITE_KAKAO_CHANNEL_URL.trim() : "";

// 파일 기본값 (env가 비어 있을 때 사용)
/** 이벤트·프로모션 전용 목록 페이지 */
const FILE_EVENT_BOARD_URL = "/events";
/** 공지사항 페이지 */
export const NOTICE_BOARD_PATH = "/notice";
/** 사이트 내 예약·문의 안내 페이지 경로 (라우트와 동일하게 유지) */
export const RESERVATION_PAGE_PATH = "/reservation";
const FILE_NAVER_RESERVATION_URL =
  "https://map.naver.com/p/entry/place/1084784069?placePath=/home?from=map&fromPanelNum=1&additionalHeight=76&timestamp=202604071448&locale=ko&svcName=map_pcv5&c=16.52,0,0,0,dh";
const FILE_NAVER_TALK_URL = "https://talk.naver.com/ct/w42fn5?frm=mnmb&frm=nmb_detail#nafullscreen";
const FILE_KAKAO_CHANNEL_URL = "http://pf.kakao.com/_ijdXs";

export const SITE_LINKS = {
  /** 이벤트 게시판(내부 /events 또는 외부 URL) */
  eventBoard: envEventBoard || FILE_EVENT_BOARD_URL,
  /** 공지사항 */
  noticeBoard: NOTICE_BOARD_PATH,
  /** 예약 안내(기본 내부 페이지, env로 외부 URL로 덮어쓸 수 있음) */
  reservation: envReservationTarget || RESERVATION_PAGE_PATH,
  /** 네이버 플레이스 예약(상담 채널 카드 등) */
  naverReservation: envNaverReservation || FILE_NAVER_RESERVATION_URL,
  naverTalk: envNaverTalk || FILE_NAVER_TALK_URL,
  kakaoChannel: envKakaoChannel || FILE_KAKAO_CHANNEL_URL,
} as const;

