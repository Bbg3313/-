/**
 * 시술 상세 — 부위·시간·회복 등 (엑셀 원본 반영 시 이 객체를 수정·분리하면 됨)
 * 가격표 `PRICING_SECTIONS.id`와 키가 일치해야 합니다.
 */

export type ProcedureDetailSpecs = {
  /** 부위 */
  area: string;
  /** 시술정보 */
  procedureInfo: string;
  /** 마취시간 */
  anesthesiaTime: string;
  /** 시술시간 */
  procedureTime: string;
  /** 회복기간 */
  recoveryPeriod: string;
  /** 유지기간 */
  effectDuration: string;
  /** 재시술주기 */
  retreatmentInterval: string;
  /** 주의사항 */
  precautions: string;
};

export const PROCEDURE_SPEC_LABELS: { key: keyof ProcedureDetailSpecs; label: string }[] = [
  { key: "area", label: "부위" },
  { key: "procedureInfo", label: "시술정보" },
  { key: "anesthesiaTime", label: "마취시간" },
  { key: "procedureTime", label: "시술시간" },
  { key: "recoveryPeriod", label: "회복기간" },
  { key: "effectDuration", label: "유지기간" },
  { key: "retreatmentInterval", label: "재시술주기" },
  { key: "precautions", label: "주의사항" },
];

const C = {
  consult: "개인차·시술 범위에 따라 내원 상담 시 구체 안내드립니다.",
  sun: "자외선 차단·보습을 꾸준히 해 주시고, 시술 부위 긁거나 자극하지 마세요.",
  drug: "복용 중인 약·보조제, 임신·수유 가능 여부는 반드시 미리 알려 주세요.",
} as const;

export const PROCEDURE_DETAIL_SPECS = {
  botox: {
    area: "주름·윤곽 목적에 따른 얼굴·바디 근육 부위 (이마·미간·눈가·턱끝·침샘·종아리·손바닥 등, 상담 시 결정)",
    procedureInfo:
      "보툴리눔 톡신을 근육층에 주입해 과도한 근육 수축을 완화하고 주름·윤곽 보조에 활용하는 시술입니다. 브랜드·농도는 상담 후 선택합니다.",
    anesthesiaTime: "대부분 불필요. 민감하신 분은 국소 도포 마취 약 5~10분 후 진행할 수 있습니다.",
    procedureTime: "부위·용량에 따라 약 10~30분 (바디·다한증 등은 더 소요될 수 있음)",
    recoveryPeriod: "당일 가벼운 일상생활 가능한 경우가 많습니다. 멍·붓기는 수일 내 완화되는 경우가 많습니다.",
    effectDuration: "제품·부위·근육량에 따라 보통 약 3~6개월 (개인차)",
    retreatmentInterval: "효과가 줄어들 때 또는 원장이 권장하는 간격 (보통 수개월 단위, 상담 시 조정)",
    precautions: `시술 직후 세안·누움·사우나 등에 대한 시간 제한이 있을 수 있으니 원내 안내를 따릅니다. ${C.sun} ${C.drug}`,
  },
  filler: {
    area: "꺼짐·주름·볼륨이 필요한 부위 (팔자·입술·턱·목주름 등, 상담 후 결정)",
    procedureInfo:
      "히알루론산 등 필러를 진피·피하층에 주입해 볼륨·주름 개선을 돕는 시술입니다. 실(하이코)·필러 병행 여부는 상담 시 결정합니다.",
    anesthesiaTime: "국소 도포 마취 또는 음각 주사 마취 약 10~20분 (시술 범위에 따라 상이)",
    procedureTime: "부위·cc 수에 따라 약 20~45분",
    recoveryPeriod: "붓기·멍·압통은 수일 내 호전되는 경우가 많으며, 당일 세안·화장은 원장 안내에 따릅니다.",
    effectDuration: "제형·부위에 따라 통상 수개월~1년 이상 (개인차, 흡수 속도 상이)",
    retreatmentInterval: "흡수·만족도에 따라 결정. 리터치는 원내 정책·상담에 따릅니다.",
    precautions: `시술 후 일시적 불균형·압통이 있을 수 있습니다. 과도한 마사지·압박을 피하고 ${C.sun} ${C.drug}`,
  },
  co2: {
    area: "점·검버섯·비립종·한관종 등 병변 부위 (크기·개수에 따라 범위 조정)",
    procedureInfo:
      "CO₂ 레이저로 병변을 제거·연마하는 시술입니다. 크기·깊이에 따라 샷 수와 에너지가 달라집니다.",
    anesthesiaTime: "부위 도포 마취 또는 국소주사 마취 약 15~30분 (범위에 따라 상이)",
    procedureTime: "병변 개수에 따라 약 15~60분",
    recoveryPeriod: "딱지·붉은기·부종이 수일~2주 내외로 지속될 수 있으며, 색소침착 주의 기간이 있습니다.",
    effectDuration: "병변 제거 목적은 지속적이나, 재발·추가 병변은 개인차",
    retreatmentInterval: "피부 회복 후 필요 시 (보통 수주~수개월 이상 간격 권장, 상담 시 결정)",
    precautions: `딱지를 억지로 떼지 마세요. 자외선 엄격 차단, 자극성 화장품 금지. ${C.drug}`,
  },
  "pigment-laser": {
    area: "얼굴 전체 또는 색소·홍조 관심 부위 (겨드랑이·무릎 등 부위별 미백 토닝 포함 가능)",
    procedureInfo:
      "토닝·제네시스 등 레이저로 색소·홍조·모공 등을 복합적으로 개선하는 시술군입니다. 피부 타입에 따라 기기·모드가 달라집니다.",
    anesthesiaTime: "대부분 불필요. 통증 민감 시 냉각·도포 마취 등으로 조절합니다.",
    procedureTime: "시술 종류에 따라 약 15~40분",
    recoveryPeriod: "일시적 홍반·각질이 있을 수 있으며, 대부분 당일~수일 내 일상 가능합니다 (시술별 상이).",
    effectDuration: "시술 종류·색소 깊이에 따라 다름. 누적 시술이 도움되는 경우가 많습니다.",
    retreatmentInterval: "보통 1~4주 간격 권장이나, 피부 반응에 따라 원장이 조정합니다.",
    precautions: `시술 전후 자외선 차단 필수. 멜라닌 억제제·박리 성분 사용은 지시에 따릅니다. ${C.drug}`,
  },
  "tattoo-removal": {
    area: "반영구·문신 부위 (눈썹·아이라인·입술 등)",
    procedureInfo:
      "레이저로 색소 입자를 분쇄해 체내 대사를 돕는 문신 제거 시술입니다. 색·깊이에 따라 횟수가 달라집니다.",
    anesthesiaTime: "도포 마취 또는 국소 마취 약 15~30분 (통증에 따라 조절)",
    procedureTime: "크기에 따라 약 15~45분",
    recoveryPeriod: "붓기·딱지·색 변화가 수일~수주 지속될 수 있습니다.",
    effectDuration: "완전 제거까지 다회 필요, 색조·깊이에 따라 상이",
    retreatmentInterval: "피부 회복 후 보통 수주~수개월 간격 (원장 판단)",
    precautions: `딱지 관리·자외선 차단 필수. 포진 경험·켈로이드 체질 등은 사전 상담 시 알려 주세요. ${C.drug}`,
  },
  "laser-lifting": {
    area: "얼굴 라인·턱선·볼·눈가 등 리프팅 목표 부위 (기기별 샷·부위 상담)",
    procedureInfo:
      "초음파·고주파 등 에너지로 진피~근막층까지 자극해 탄력·리프팅을 돕는 시술군입니다 (리프테라·볼뉴머·덴서티 등).",
    anesthesiaTime: "기기·강도에 따라 국소도포 또는 크림 마취 약 20~40분",
    procedureTime: "샷 수에 따라 약 30~90분",
    recoveryPeriod: "홍반·붓기·압통은 수일 내 완화되는 경우가 많고, 종류에 따라 당일 세안 가능 여부가 다릅니다.",
    effectDuration: "개인차가 크나 통상 수개월 단위로 느껴지는 경우가 많습니다.",
    retreatmentInterval: "보통 6개월~1년 이후 또는 만족도에 따라 상담 후 재시술",
    precautions: `금속성 물질·임플란트 부위는 사전 알림 필요. 시술 후 일시적 통증·마비감이 있을 수 있습니다. ${C.sun} ${C.drug}`,
  },
  "thread-lifting": {
    area: "팔자·볼·턱선 등 실이 필요한 꺼짐·처짐 부위",
    procedureInfo:
      "녹는 실(PDO·PCL 등)을 삽입해 조직 지지·콜라겐 생성을 유도하는 리프팅 시술입니다.",
    anesthesiaTime: "국소주사 마취(라인 따라) 약 15~30분",
    procedureTime: "실 개수에 따라 약 30~60분",
    recoveryPeriod: "붓기·멍·당김감이 1~2주 내 완화되는 경우가 많습니다. 과한 표정은 잠시 자제 권장.",
    effectDuration: "실 종류에 따라 통상 수개월~2년대까지 개인차 큼",
    retreatmentInterval: "효과 소멸·처짐 재발 시 상담 후 (보통 1년 이후 권장되는 경우 많음)",
    precautions: `시술 후 과음·사우나·격한 운동은 제한될 수 있습니다. 감염 징후 시 내원. ${C.sun} ${C.drug}`,
  },
  "pore-scar": {
    area: "나비존·얼굴 전체 등 모공·흉터 관심 부위",
    procedureInfo:
      "마이크로니들 RF·레이저 등으로 모공·흉터·결 개선을 목표로 하는 시술군입니다. 쥬베룩 스킨 등 병행이 있을 수 있습니다.",
    anesthesiaTime: "도포 마취 약 30~45분 (팁·깊이에 따라 상이)",
    procedureTime: "약 30~60분 (패키지·부위에 따라 상이)",
    recoveryPeriod: "붉은기·미세 각질·붓기가 수일~1주 지속될 수 있습니다.",
    effectDuration: "흉터·모공 유형에 따라 다회 시술이 필요한 경우가 많습니다.",
    retreatmentInterval: "피부 회복 후 보통 3~6주 간격 (원장이 조정)",
    precautions: `시술 후 자외선 차단·보습 필수. 스스로 각질 떼지 않기. ${C.sun} ${C.drug}`,
  },
  "daily-care": {
    area: "얼굴 전체 또는 관리 목적에 따른 부위",
    procedureInfo:
      "아쿠아필·LDM·라라필·이온토 등 데일리 피부관리로 각질·유분·진정·재생을 돕습니다.",
    anesthesiaTime: "대부분 불필요 (민감 시 냉각만)",
    procedureTime: "관리 종류에 따라 약 40~70분",
    recoveryPeriod: "대부분 당일 일상 가능. 일시적 홍조는 짧게 지속될 수 있습니다.",
    effectDuration: "관리 지속 시 피부결·유지에 도움 (누적 효과)",
    retreatmentInterval: "피부 상태에 따라 보통 1~4주 간격 권장",
    precautions: `시술 직후 강한 자외선·사우나는 자제. ${C.sun}`,
  },
  "acne-care": {
    area: "여드름 발생 얼굴 부위 (염증·좁쌀·자국 등)",
    procedureInfo:
      "압출·필링·레이저·주사 등 단계별로 염증·모공·자국 관리를 조합하는 여드름 프로그램입니다.",
    anesthesiaTime: "도포 마취 또는 불필요 (관리 단계별 상이)",
    procedureTime: "패키지에 따라 약 50~90분",
    recoveryPeriod: "압출 후 붉은기·각질이 며칠 지속될 수 있습니다. 자외선 주의.",
    effectDuration: "여드름 단계·생활습관에 따라 상이, 꾸준한 관리가 중요합니다.",
    retreatmentInterval: "보통 1~2주 간격 (피부 반응에 따라 조정)",
    precautions: `짜기 금지, 자가 압출 주의. 처방약·외용제는 지시대로 사용. ${C.sun} ${C.drug}`,
  },
  booster: {
    area: "나비존·얼굴 전체 등 주입 목표 부위",
    procedureInfo:
      "스킨부스터·물광·리쥬란·쥬베룩 등 피부층에 유효 성분을 전달해 수분·결·재생을 돕는 주사 시술군입니다.",
    anesthesiaTime: "도포 마취 약 20~40분 (크림 마취)",
    procedureTime: "약 30~50분 (부위·용량에 따라 상이)",
    recoveryPeriod: "멍·붓기·압통이 수일 내 호전되는 경우가 많습니다. 당일 세안은 안내에 따릅니다.",
    effectDuration: "제품별로 수주~수개월 (개인차)",
    retreatmentInterval: "제품·목표에 따라 보통 2~8주 이상 간격 (상담 시 결정)",
    precautions: `시술 후 음주·사우나·격한 운동은 수일 제한될 수 있습니다. ${C.sun} ${C.drug}`,
  },
  fat: {
    area: "얼굴 윤곽·콧볼·복부 등 지방분해 주사 목표 부위 (상담 시 결정)",
    procedureInfo:
      "지방분해 주사·디센바·SPC 등으로 국소 지방·윤곽 보조를 목표로 합니다. 다이어트약은 별도 처방 상담입니다.",
    anesthesiaTime: "대부분 불필요 또는 국소 도포",
    procedureTime: "약 15~40분 (부위·용량에 따라 상이)",
    recoveryPeriod: "붓기·압통·멍이 며칠~1주 지속될 수 있습니다.",
    effectDuration: "생활습관·체형에 따라 상이, 다회 권장되는 경우 많음",
    retreatmentInterval: "보통 1~2주 이상 간격 (제품·부위별 상담)",
    precautions: `시술 부위 마사지·온열은 지시에 따릅니다. 간·신장 질환·복용약은 사전 알림. ${C.drug}`,
  },
  "hair-female": {
    area: "얼굴·팔·다리·바디 등 제모 희망 부위 (가격표 부위별)",
    procedureInfo:
      "레이저에 멜라닌을 흡수시켜 모낭을 열화시키는 제모 시술입니다. 부위·모발색에 따라 반응이 다릅니다.",
    anesthesiaTime: "대부분 불필요 (냉각기 병행)",
    procedureTime: "부위에 따라 약 10~40분",
    recoveryPeriod: "일시적 홍반· 따끔함이 수시간 내 호전되는 경우가 많습니다.",
    effectDuration: "모 주기에 따라 다회 시술 후 감소 목표 (개인차)",
    retreatmentInterval: "보통 4~8주 간격 (부위·성장기에 따라 조정)",
    precautions: `시술 전 제모제·뽑기 금지 기간이 있습니다. 자외선 차단. ${C.drug}`,
  },
  "hair-male": {
    area: "수염·얼굴·바디 등 제모 희망 부위 (가격표 부위별)",
    procedureInfo:
      "남성 모발은 굵고 색이 진한 경우가 많아 에너지·횟수 설계가 중요합니다. 레이저 제모로 모량 감소를 목표로 합니다.",
    anesthesiaTime: "대부분 불필요 (냉각)",
    procedureTime: "부위에 따라 약 15~50분",
    recoveryPeriod: "홍반· 따끔함이 당일 내 완화되는 경우가 많습니다.",
    effectDuration: "다회 시술 누적에 따라 모량·질감 변화 (개인차)",
    retreatmentInterval: "보통 4~8주 간격 (부위별 상담)",
    precautions: `면도만 허용되는 준비 기간이 있을 수 있습니다. 자외선·자극 주의. ${C.drug}`,
  },
  iv: {
    area: "정맥 주사 (팔 정맥 등)",
    procedureInfo:
      "감초·비타민·백옥·신데렐라·태반주사 등 목적에 따른 수액·주사 치료입니다.",
    anesthesiaTime: "불필요",
    procedureTime: "약 15~30분 (종류에 따라 상이)",
    recoveryPeriod: "대부분 당일 일상 가능. 주사부위 멍 가능",
    effectDuration: "항목별로 상이 (유지 목적이면 주기적 시술)",
    retreatmentInterval: "항목별 권장 주기(표기) 또는 원장 상담 (예: 1~4주 등)",
    precautions: `수액 반응·어지러움이 있으면 알려 주세요. ${C.drug}`,
  },
  noncovered: {
    area: "진료·서류 목적에 따라 상이 (주사·처방·제증명 등)",
    procedureInfo:
      "비급여 처방, 성형·피부 TR주사, 수면마취, 각종 진단·확인서 등 건강보험 적용 외 항목입니다.",
    anesthesiaTime: "해당 시술·처치에 따라 상이 (수면은 별도 비용·시간 안내)",
    procedureTime: "항목별 상이 (수 분~수십 분)",
    recoveryPeriod: "시술별 상이, 당일 안내를 따릅니다.",
    effectDuration: "해당 없음 또는 항목별 상이",
    retreatmentInterval: C.consult,
    precautions: `서류 발급은 법정 수수료·원내 규정을 따릅니다. ${C.drug}`,
  },
} satisfies Record<string, ProcedureDetailSpecs>;

export function getProcedureDetailSpecs(sectionId: string): ProcedureDetailSpecs | undefined {
  return PROCEDURE_DETAIL_SPECS[sectionId];
}
