# -*- coding: utf-8 -*-
"""siseol-parsed.json → src/data/proceduresExcelContent.json (slug → specs + body)."""
from __future__ import annotations

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "scripts" / "siseol-parsed.json"
OUT = ROOT / "src" / "data" / "proceduresExcelContent.json"


def fix_jaw(proc: str) -> tuple[str, str]:
    """턱보톡스: 끝 '없음' → 마취."""
    if proc.endswith("없음"):
        return proc[:-2].rstrip(), "없음"
    return proc, ""


def fix_contour_typo(proc: str) -> str:
    return proc.replace("울퉁불퉁한 시술정보", "울퉁불퉁한").replace("울퉁불퉁한\n\n윤곽 주사는", "윤곽 주사는")


def fix_cellas(proc: str) -> str:
    if proc.startswith("라스 레이저"):
        return "셀라스 " + proc
    return proc


def fix_density_proc(proc: str) -> str:
    dup = (
        "\n\n늘어진 피부를 당겨주고 콜라겐 생성을 촉진하여 자연스러운 V라인 개선 효과를 기대할 수 있으며, "
        "비교적 부담이 적어 꾸준한 관리가 가능한 리프팅 시술입니다."
    )
    return proc.replace(dup, "")


def fix_violet(proc: str) -> str:
    """라벨 잡음 제거: 시술 위치 섹션만 정리."""
    proc = re.sub(r"\n{3,}", "\n\n", proc)
    return proc.strip()


def fix_mint(proc: str) -> str:
    return proc.replace("\n\n시술정보\n\n", "\n\n").replace("\n시술정보\n", "\n")


def row_to_specs(row: dict) -> dict:
    return {
        "area": row.get("area") or "-",
        "procedureInfo": row.get("procedureInfo") or "-",
        "anesthesiaTime": row.get("anesthesiaTime") or "-",
        "procedureTime": row.get("procedureTime") or "-",
        "recoveryPeriod": row.get("recoveryPeriod") or "-",
        "effectDuration": row.get("effectDuration") or "-",
        "retreatmentInterval": row.get("retreatmentInterval") or "-",
        "precautions": row.get("precautions") or "-",
    }


def main() -> None:
    data = json.loads(SRC.read_text(encoding="utf-8"))
    out: dict[str, dict] = {}

    def add(slug: str, row: dict, proc_fix=None):
        proc = row.get("procedureInfo") or ""
        if proc_fix:
            proc = proc_fix(proc)
        specs = row_to_specs({**row, "procedureInfo": proc})
        body = proc if proc else specs["procedureInfo"]
        out[slug] = {"specs": specs, "body": body}

    # 단일 매칭
    singles = [
        ("턱보톡스", "jaw-botox"),
        ("주름보톡스", "wrinkle-botox"),
        ("스킨보톡스", "skin-botox"),
        ("코조각주사", "nose-contour-injection"),
        ("필러 녹이는주사", "filler-dissolving-injection"),
        ("CO₂ 레이저", "laser-co2"),
        ("듀얼 악센토 레이저", "laser-dual-accento"),
        ("미인토닝", "laser-miin-toning"),
        ("GD 토닝", "laser-gd-toning"),
        ("인피니 레이저", "laser-inpini"),
        ("셀라스 레이저", "laser-cellas"),
        ("리프테라 2", "lifting-liftera-2"),
        ("볼뉴머 (Volnewmer)", "lifting-volnewmer"),
        ("슈링크 (SHRINK)", "lifting-shurink"),
        ("하이주 (HYJU)", "glow-haiju"),
        ("릴리이드 M (LILIID M)", "glow-lilied-m"),
        ("바이리즌 (VYREZIN)", "glow-baireizen"),
        ("뉴라미스 스킨인핸서 (NEURAMIS Skin Enhancer)", "glow-neuramis-skin-enhancer"),
        ("리쥬란 (REJURAN Healer)", "glow-rejuran"),
        ("리쥬란 HB (Rejuran HB Plus)", "glow-rejuran-hb"),
        ("리쥬란 아이 (REJURAN i)", "glow-rejuran-eye"),
        ("쥬베룩 스킨 (Juvelook Skin)", "glow-juvelook-skin"),
        ("쥬베룩 아이 (Juvelook Eye)", "glow-juvelook-eye"),
        ("리투오 (LITUO Filler)", "glow-retoo"),
        ("문신 제거 (미인토닝)", "tattoo-removal"),
    ]
    title_row: dict[str, dict] = {}
    for r in data:
        t = r["excelTitle"].strip()
        if t not in title_row:
            title_row[t] = r
    for title, slug in singles:
        row = title_row.get(title)
        if not row:
            print("missing", title, file=sys.stderr)
            continue
        proc = row.get("procedureInfo") or ""
        if slug == "jaw-botox":
            proc, an = fix_jaw(proc)
            row = {**row, "procedureInfo": proc, "anesthesiaTime": an or "없음"}
        elif slug == "laser-cellas":
            row = {**row, "procedureInfo": fix_cellas(proc)}
        else:
            row = {**row, "procedureInfo": proc}
        add(slug, row, None)

    # 엑셀 오탈자 보정 (재생성 시에도 동일)
    if "lifting-shurink" in out:
        ri = out["lifting-shurink"]["specs"]["retreatmentInterval"]
        if ri.endswith("))"):
            out["lifting-shurink"]["specs"]["retreatmentInterval"] = ri[:-1]
    if "filler-import" in out:
        ri = out["filler-import"]["specs"]["retreatmentInterval"]
        if "6개월~1 이후" in ri:
            out["filler-import"]["specs"]["retreatmentInterval"] = ri.replace("6개월~1 이후", "6개월~1년 이후")

    # 윤곽 / 브이올렛
    y = title_row.get("윤곽주사  ( 윤곽주사  / 디센바 동일 )")
    if y:
        y = {**y, "procedureInfo": fix_contour_typo(y.get("procedureInfo") or "")}
        add("contour-descenba", y, None)

    v = title_row.get("브이올렛")
    if v:
        v = {**v, "procedureInfo": fix_violet(v.get("procedureInfo") or "")}
        add("contour-violet", v, None)

    # 필러 국산·수입
    for title, slug in [
        ("필러 (국산 )", "filler-domestic"),
        ("필러 ( 수입 )", "filler-import"),
    ]:
        row = title_row.get(title)
        if row:
            add(slug, row, None)

    # 쥬베룩 볼륨 (괄호 깨짐)
    for row in data:
        if row["excelTitle"].strip().startswith("쥬베룩 볼륨"):
            add("glow-juvelook-volume", row, None)
            break

    # 실리프팅 ×4
    thread_slugs = ["thread-mint", "thread-pcl", "thread-jamber", "thread-hiko"]
    ti = 0
    for row in data:
        if row["excelTitle"].strip() != "실리프팅":
            continue
        if ti >= len(thread_slugs):
            break
        slug = thread_slugs[ti]
        proc = row.get("procedureInfo") or ""
        if slug == "thread-mint":
            proc = fix_mint(proc)
        row2 = {**row, "procedureInfo": proc}
        add(slug, row2, None)
        ti += 1

    # 제모 (엑셀 없음 — 사이트 문구)
    out["hair-removal"] = {
        "specs": {
            "area": "겨드랑이·팔·다리·얼굴·비키니 등 털이 고민되는 부위 (상담 후 결정)",
            "procedureInfo": "듀얼 악센토 N(DUAL Accento N) 레이저를 이용한 제모 시술로, 755nm·1064nm 듀얼 파장으로 모발 색·피부 타입에 맞춰 조사합니다.\n\n털의 성장 주기에 맞춰 여러 회 반복 시술이 필요하며, 부위별로 상이하니 상담 시 일정과 횟수를 안내드립니다.",
            "anesthesiaTime": "부위·강도에 따라 마취크림 적용 (상담 시 안내)",
            "procedureTime": "부위별 상이 (대개 수분~수십 분)",
            "recoveryPeriod": "시술 직후 약간의 붉은기· 따가움이 있을 수 있으며 당일 가벼운 일상생활 가능한 경우가 많습니다.",
            "effectDuration": "모발 색·굵기·부위·호르몬 등에 따라 개인차가 큽니다.",
            "retreatmentInterval": "털 성장 주기에 맞춘 간격(보통 약 4~8주)으로 여러 회 권장",
            "precautions": "시술 전후 일정 기간 자외선 차단을 권장합니다.\n\n시술 부위를 긁거나 털을 뽑는 행위는 피해 주세요.\n\n사우나·찜질방·격한 운동은 일정 기간 삼가해 주세요.",
        },
        "body": out.get("hair-removal", {}).get("body", "")
        if "hair-removal" in out
        else "",
    }
    out["hair-removal"]["body"] = out["hair-removal"]["specs"]["procedureInfo"]

    # 덴서티: 엑셀 754행이 슈링크 문구와 중복되어 있어 본문은 748~753 + 팁 757~767만 반영
    out["lifting-density"] = {
        "specs": {
            "area": "-",
            "procedureInfo": (
                "덴서티는 고주파(RF) 에너지를 이용하여 피부 진피층에 열 자극을 전달해 콜라겐 재생을 유도하고, 피부 탄력과 밀도를 개선하는 리프팅 시술입니다.\n\n"
                "피부 속부터 탄탄하게 채워주는 방식으로 처진 피부를 자연스럽게 끌어올리며, 잔주름, 모공, 피부결 개선에도 도움을 줍니다.\n\n"
                "비수술적 시술로 일상생활에 큰 지장 없이 탄력 개선 효과를 기대할 수 있습니다.\n\n"
                "본원은 다양한 팁을 활용하여 개인의 피부 상태와 부위에 맞춘 맞춤 시술을 진행합니다.\n\n"
                "【덴서티 팁 종류】\n"
                "* 클래식 팁 (Classic Tip)\n"
                "피부 전반에 균일하게 에너지를 전달하여 기본적인 탄력 개선과 피부결 개선에 적합한 팁입니다.\n"
                "전체적인 피부 컨디션을 끌어올리는 데 효과적입니다.\n\n"
                "* 하이 팁 (High Tip)\n"
                "보다 높은 에너지를 깊은 층까지 전달하여 리프팅과 탄력 개선 효과를 강화한 팁입니다.\n"
                "처짐이 있는 부위나 윤곽 개선이 필요한 경우에 적합합니다.\n\n"
                "* 알파 팁 (Alpha Tip)\n"
                "섬세한 부위에 정교하게 에너지를 전달할 수 있어 눈가, 입가 등 디테일한 탄력 개선에 효과적입니다.\n"
                "잔주름 및 얇은 피부 부위 시술에 적합합니다."
            ),
            "anesthesiaTime": "약 20~30분 (마취크림)",
            "procedureTime": "약 20~30분 이내",
            "recoveryPeriod": "당일 일상생활 가능",
            "effectDuration": "3~6개월 (개인별 상이)",
            "retreatmentInterval": "4주 간격 3회 이상 권장 (상담 필요)",
            "precautions": (
                "시술 후 일시적인 붉은기, 열감, 건조함이 나타날 수 있습니다.\n\n"
                "시술 후 충분한 보습과 자외선 차단이 중요합니다.\n\n"
                "시술 후 1주일 정도 사우나, 찜질방, 음주, 격한 운동은 피해주세요.\n\n"
                "피부 자극을 줄이기 위해 강한 필링이나 스크럽은 일시적으로 중단하는 것이 좋습니다.\n\n"
                "개인에 따라 미세한 붓기나 당김 현상이 발생할 수 있습니다."
            ),
        },
        "body": "",
    }
    out["lifting-density"]["body"] = out["lifting-density"]["specs"]["procedureInfo"]

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(out, ensure_ascii=False, indent=2), encoding="utf-8")
    print(OUT, "keys", len(out))


if __name__ == "__main__":
    main()
