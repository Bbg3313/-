/**
 * 사이트 내 주요 외부 링크를 한 곳에서 관리합니다.
 * (선택) .env에 값이 있으면 그 값이 우선합니다.
 */

const envEventBoard =
  typeof import.meta.env.VITE_EVENT_BOARD_URL === "string" ? import.meta.env.VITE_EVENT_BOARD_URL.trim() : "";
const envReservation =
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
const FILE_NAVER_RESERVATION_URL =
  "https://map.naver.com/p/entry/place/1084784069?placePath=/home?from=map&fromPanelNum=1&additionalHeight=76&timestamp=202604071448&locale=ko&svcName=map_pcv5&c=16.52,0,0,0,dh";
const FILE_NAVER_TALK_URL = "https://talk.naver.com/ct/w42fn5?frm=mnmb&frm=nmb_detail#nafullscreen";
const FILE_KAKAO_CHANNEL_URL = "http://pf.kakao.com/_ijdXs";

export const SITE_LINKS = {
  /** 이벤트 게시판(내부 /events 또는 외부 URL) */
  eventBoard: envEventBoard || FILE_EVENT_BOARD_URL,
  /** 공지사항 */
  noticeBoard: NOTICE_BOARD_PATH,
  reservation: envReservation || FILE_NAVER_RESERVATION_URL,
  naverTalk: envNaverTalk || FILE_NAVER_TALK_URL,
  kakaoChannel: envKakaoChannel || FILE_KAKAO_CHANNEL_URL,
} as const;

