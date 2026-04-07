import type { MouseEvent } from "react";
import { useLocation, useNavigate } from "react-router";

/** 홈이면 최상단 스크롤, 해시만 있으면 제거. 다른 페이지에서는 기본 링크 이동. */
export function useHomeLogoClick() {
  const location = useLocation();
  const navigate = useNavigate();

  return (e: MouseEvent<HTMLAnchorElement>) => {
    if (location.pathname !== "/") return;
    e.preventDefault();
    if (location.hash) {
      void navigate("/", { replace: true });
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
}
