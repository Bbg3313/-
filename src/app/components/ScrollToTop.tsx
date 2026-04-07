import { useLayoutEffect } from "react";
import { useLocation } from "react-router";

/** 라우트가 바뀔 때마다 문서 스크롤을 맨 위로 (공지/약관 등 긴 페이지 대응) */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
