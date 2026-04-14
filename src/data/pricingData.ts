/**
 * 비급여 시술 안내 — 단위 원, VAT 10% 별도 (원본 수가표 기준)
 * 표기 오탈자는 의료 안내 가독성을 위해 최소한만 정리했습니다.
 */

export type PricingCategoryId =
  | "botox-filler"
  | "pigment"
  | "lifting"
  | "pore-scar"
  | "medical-skincare"
  | "booster"
  | "fat"
  | "hair"
  | "iv"
  | "noncovered";

export type PricingTable = {
  headers: string[];
  rows: string[][];
  /** 가격 열을 오른쪽 정렬 (마지막 N열) */
  priceColumns?: number;
};

/** 제모: 할인가+할인율 / 정가(원가표와 동일) */
export type LaserHairPriceCol =
  | { kind: "single"; price: string }
  | { kind: "tiered"; sale: string; discountPct: string; regular: string };

export type LaserHairRow = {
  area: string;
  detail: string;
  once: LaserHairPriceCol;
  five: LaserHairPriceCol;
  ten: LaserHairPriceCol;
};

export type PricingSection = {
  id: string;
  categoryId: PricingCategoryId;
  title: string;
  description?: string;
  tables: PricingTable[];
  /** 여성·남성 제모 전용(할인율·정가 분리 표기) */
  laserHairRows?: LaserHairRow[];
  footnotes?: string[];
};

export const VAT_NOTE = "단위 원, VAT 10% 별도";

export const PRICING_CATEGORIES: {
  id: PricingCategoryId | "all";
  label: string;
}[] = [
  { id: "all", label: "전체보기(11)" },
  { id: "botox-filler", label: "보톡스·필러" },
  { id: "pigment", label: "점·색소·홍조" },
  { id: "lifting", label: "리프팅·탄력" },
  { id: "pore-scar", label: "피지선·흉터·모공" },
  { id: "medical-skincare", label: "메디컬 스킨케어" },
  { id: "booster", label: "물광·스킨부스터" },
  { id: "fat", label: "지방·비만관리" },
  { id: "hair", label: "제모" },
  { id: "iv", label: "수액·실비치료" },
  { id: "noncovered", label: "비급여·제증명" },
];

function hairSingle(price: string): LaserHairPriceCol {
  return { kind: "single", price };
}

export const PRICING_SECTIONS: PricingSection[] = [
  {
    id: "botox",
    categoryId: "botox-filler",
    title: "보톡스",
    description: "브랜드별 단가 안내",
    tables: [
      {
        headers: ["목적", "메디톡스 (국산)", "코어톡스 (국산)", "제오민 (수입)"],
        rows: [
          ["주름 부위1", "20,000", "70,000", "90,000"],
          ["턱 보톡스", "40,000", "80,000", "110,000"],
          ["침샘·측두근·잇몸 보톡스", "50,000", "120,000", "190,000"],
        ],
        priceColumns: 3,
      },
      {
        headers: ["목적", "메디톡스", "코어톡스", "제오민"],
        rows: [["스킨보톡스 얼굴전체", "150,000", "300,000", "350,000"]],
        priceColumns: 3,
      },
      {
        headers: ["목적", "메디톡스", "코어톡스", "제오민"],
        rows: [
          ["바디보톡스 100U", "119,000", "169,000", "299,000"],
          ["바디보톡스 200U", "219,000", "299,000", "509,000"],
        ],
        priceColumns: 3,
      },
      {
        headers: ["목적", "메디톡스", "코어톡스", "제오민"],
        rows: [["다한증 보톡스 100U", "150,000", "240,000", "330,000"]],
        priceColumns: 3,
      },
    ],
    footnotes: [
      "부위: 이마 / 미간 / 눈가 / 눈밑 / 콧등 / 치맛주름 / 자갈턱 / 입꼬리",
      "바디보톡스 부위: 승모근 / 종아리 — 근육량에 따라 100U ~ 200U 주사",
      "다한증 보톡스 부위: 손바닥 / 발바닥 / 겨드랑이 — 정도에 따라 100U ~ 400U 주사",
    ],
  },
  {
    id: "filler",
    categoryId: "botox-filler",
    title: "필러",
    tables: [
      {
        headers: ["목적", "아띠에르 (국산)", "뉴라미스 (국산)", "레스틸렌 (수입)", "벨로테로 (수입)"],
        rows: [
          ["볼륨필러 1cc", "100,000", "150,000", "290,000", "290,000"],
          ["주름필러", "150,000", "210,000", "380,000", "380,000"],
          ["주름필러 (얼굴전체)", "990,000", "1,190,000", "2,500,000", "2,500,000"],
        ],
        priceColumns: 4,
      },
      {
        headers: ["종류", "비용"],
        rows: [
          ["레스틸렌 키스 (입술전용 스웨덴 필러, 1cc)", "300,000"],
          ["목주름필러 (국산) + 스킨보톡스", "590,000"],
          ["목주름필러 (수입) + 스킨보톡스", "1,200,000"],
        ],
        priceColumns: 1,
      },
      {
        headers: ["목적", "실 단가"],
        rows: [["하이코 4줄 (콧대 2줄 + 코끝 2줄, 녹는실 PCL)", "300,000"]],
        priceColumns: 1,
      },
    ],
    footnotes: [
      "주름필러는 주름의 깊이에 따라 가격 변동이 있습니다. 보톡스 서비스, 2주 내 리터치 무료.",
      "하이코 실: 녹는실(PCL)로 코의 교정 지지대를 시술하는 방식입니다.",
      "볼륨필러 추가 시 가격 변동",
    ],
  },
  {
    id: "co2",
    categoryId: "pigment",
    title: "CO₂ 레이저",
    tables: [
      {
        headers: ["목적", "개당", "얼굴전체 (약 20개 기준)"],
        rows: [
          ["점 제거 (3달 뒤 리터치 가능)", "6,000 ~", "120,000"],
          ["검버섯 제거 (3달 뒤 리터치 가능)", "10,000 ~", "250,000"],
          ["기타 병변 (비립종, 한관종, 쥐젖)", "10,000 ~", "—"],
        ],
        priceColumns: 2,
      },
    ],
    footnotes: [
      "점: 리터치 비용 개당 4,000원, 얼굴전체 리터치는 점 정도에 따라 상담 후 결정",
      "검버섯: 정도에 따라 리터치 비용 상담 후 결정",
      "사마귀(바이러스) 치료는 하지 않습니다.",
    ],
  },
  {
    id: "pigment-laser",
    categoryId: "pigment",
    title: "색소 레이저 · 홍조 · 토닝",
    description:
      "미인토닝, 클라리티, 듀얼악센토, 제네시스, 모공축소 레이저(셀라스·인피니) 등 복합 프로토콜은 상담 시 안내드립니다.",
    tables: [
      {
        headers: ["종류", "1회", "5회", "10회"],
        rows: [
          ["듀얼 토닝", "150,000", "700,000", "1,350,000"],
          ["트리플 토닝", "170,000", "800,000", "1,550,000"],
          ["쿼드라 토닝", "250,000", "1,200,000", "2,350,000"],
          ["홍조 토닝 (트리플 토닝과 동일)", "170,000", "800,000", "1,550,000"],
          ["제네시스 토닝 (듀얼 토닝과 동일)", "150,000", "700,000", "1,350,000"],
          ["부위별 미백 토닝 (듀얼 토닝과 동일, 겨드랑이·무릎 등 한 부위)", "150,000", "700,000", "1,350,000"],
          ["흑자 개선 (개당)", "300,000 ~", "—", "—"],
        ],
        priceColumns: 3,
      },
    ],
    footnotes: [
      "흑자 개선: 개당 300,000원~ — 상담 후 결정. 흑자의 정도와 크기에 따라 추가 비용이 발생할 수 있습니다.",
      "듀얼악센토: 알렉스-색소개선 / 프레클-주근깨·잡티 / 제네시스-장벽강화·혈관홍조 등 모드별 상담",
    ],
  },
  {
    id: "tattoo-removal",
    categoryId: "pigment",
    title: "문신 제거 레이저",
    tables: [
      {
        headers: ["종류", "1회", "5회"],
        rows: [
          ["눈썹 반영구 문신", "100,000", "450,000"],
          ["아이라인 반영구 문신", "90,000", "400,000"],
        ],
        priceColumns: 2,
      },
      {
        headers: ["크기", "1회", "5회"],
        rows: [
          ["500원 동전 크기", "50,000", "200,000"],
          ["명함 1장 크기", "110,000", "500,000"],
        ],
        priceColumns: 2,
      },
    ],
    footnotes: [
      "문신 제거는 색조 및 크기에 따라 추가 요금이 발생할 수 있으므로 상담 후 결정하시기 바랍니다.",
    ],
  },
  {
    id: "laser-lifting",
    categoryId: "lifting",
    title: "레이저 리프팅",
    tables: [
      {
        headers: ["리프테라2 LINE", "100샷", "300샷", "500샷"],
        rows: [["", "79,000", "159,000", "299,000"]],
        priceColumns: 3,
      },
      {
        headers: ["리프테라2 PEN", "1000샷", "3000샷", "5000샷"],
        rows: [["", "59,000", "159,000", "299,000"]],
        priceColumns: 3,
      },
      {
        headers: ["볼뉴머 브이 리프팅", "100샷", "300샷", "600샷"],
        rows: [["", "309,000", "900,000", "1,600,000"]],
        priceColumns: 3,
      },
      {
        headers: ["볼뉴머 아이 리프팅", "100샷", "200샷", ""],
        rows: [["", "309,000", "600,000", ""]],
        priceColumns: 2,
      },
      {
        headers: ["덴서티 리프팅 (클래식)", "100샷", "300샷", "600샷"],
        rows: [["", "350,000", "900,000", "1,800,000"]],
        priceColumns: 3,
      },
      {
        headers: ["덴서티 리프팅 (하이)", "100샷", "300샷", "600샷"],
        rows: [["", "400,000", "1,100,000", "2,000,000"]],
        priceColumns: 3,
      },
      {
        headers: ["덴서티 리프팅 (알파)", "100샷", "300샷", "600샷"],
        rows: [["", "550,000", "1,550,000", "2,200,000"]],
        priceColumns: 3,
      },
    ],
    footnotes: [
      "리프테라2: 고강도 집속 초음파, 안면 리프팅, 주름과 피부결 개선",
      "볼뉴머: 고주파 에너지로 피부 리프팅 및 재생 / 아이: 눈 밑 다크써클·주름 개선에 집중",
      "덴서티: 피부 깊은 곳까지 리프팅 — 하이는 모노폴라·바이폴라 동시 적용",
    ],
  },
  {
    id: "thread-lifting",
    categoryId: "lifting",
    title: "실 리프팅",
    tables: [
      {
        headers: ["종류", "1줄"],
        rows: [
          ["민트실 (녹는 PDO 실)", "100,000"],
          ["PCL 실", "150,000"],
          ["잼버실", "200,000"],
        ],
        priceColumns: 1,
      },
    ],
    footnotes: [
      "정품 민트실, 평균 6개월 ~ 1년 유지, KFDA와 FDA 허가",
      "PCL 실: PLLA 성분, 평균 2~3년 지속, KFDA 인증. 녹는 실 중 비교적 길게 유지됩니다.",
      "잼버실: 스프링 형태로 감긴 실, 콜라겐 생성 유도. 팔자주름·눈가·인디언 주름 등 꺼진 부위를 채우는 실로, 필러의 이물감이 싫은 분께 추천드립니다.",
    ],
  },
  {
    id: "pore-scar",
    categoryId: "pore-scar",
    title: "피지선 · 흉터 · 모공",
    tables: [
      {
        headers: ["레이저 시술", "부위", "1회", "3회", "5회"],
        rows: [
          ["셀라스 레이저 (재생관리 포함)", "나비존", "79,000", "229,000", "369,000"],
          ["", "얼굴전체", "149,000", "429,000", "709,000"],
          ["인피니 레이저 (팁값 별도)", "나비존", "99,000", "279,000", "459,000"],
          ["", "얼굴전체", "169,000", "499,000", "809,000"],
          ["모공축소 레이저 패키지 (셀라스+인피니)", "나비존", "149,000", "429,000", "729,000"],
          ["", "얼굴전체", "250,000", "700,000", "1,150,000"],
        ],
        priceColumns: 3,
      },
      {
        headers: ["주사 시술", "부위·용량", "1회", "3회", "5회"],
        rows: [
          ["쥬베룩 스킨 (스킨부스터)", "나비존 (3cc)", "100,000", "190,000", "280,000"],
          ["", "얼굴전체 (6cc)", "550,000", "1,590,000", "2,590,000"],
        ],
        priceColumns: 3,
      },
    ],
  },
  {
    id: "daily-care",
    categoryId: "medical-skincare",
    title: "데일리 피부관리",
    tables: [
      {
        headers: ["종류", "안내", "1회", "3회", "5회"],
        rows: [
          ["수분폭탄 케어", "", "20,000", "50,000", ""],
          ["안티에이징", "선택1: 미백 / 탄력", "30,000", "80,000", "120,000"],
          ["아쿠아필", "각질·모낭충·노폐물 / 코 피지·모공·보습·진정", "40,000", "110,000", "180,000"],
          ["LDM 부스터", "미백 / 재생", "70,000", "190,000", "320,000"],
          ["LDM 물방울 리프팅", "수분 / 피부탄력", "140,000", "380,000", "640,000"],
          ["라라필", "피지선 억제·좁쌀 여드름 재발 방지", "60,000", "150,000", "250,000"],
          ["이온토", "피부진정 / 재생·회복", "60,000", "150,000", "250,000"],
          ["플라필", "피지선 억제·항염·물광", "80,000", "220,000", "350,000"],
        ],
        priceColumns: 3,
      },
    ],
  },
  {
    id: "acne-care",
    categoryId: "medical-skincare",
    title: "여드름 관리",
    tables: [
      {
        headers: ["종류", "1회", "5회", "10회"],
        rows: [
          ["항염증주사", "5,000", "", ""],
          ["기본 여드름관리", "50,000", "200,000", ""],
          ["라라필 여드름관리", "80,000", "350,000", "650,000"],
          ["플라필 여드름관리", "100,000", "450,000", "850,000"],
          ["라라필 + 제네시스토닝", "100,000", "450,000", "850,000"],
          ["라라샷 + 제네시스토닝", "120,000", "550,000", "1,000,000"],
          ["플라필 + 제네시스토닝", "130,000", "600,000", "1,100,000"],
          ["라라닥터+라라올레+제네시스토닝", "170,000", "800,000", ""],
          ["골드PTT + 제네시스토닝", "190,000", "950,000", ""],
        ],
        priceColumns: 3,
      },
    ],
    footnotes: [
      "각 관리별 세부 단계(스티머·압출·LDM·모델링팩 등)는 시술 안내 참고",
      "여드름 관리: 압출, 항염증주사, 코 피지 관리 포함",
    ],
  },
  {
    id: "booster",
    categoryId: "booster",
    title: "물광 · 스킨부스터",
    tables: [
      {
        headers: ["종류", "용량·부위", "1회", "3회"],
        rows: [
          ["YSM 여신주사 (쥬베룩+리쥬란+물광 등 조합)", "나비존", "500,000", ""],
          ["", "얼굴전체", "1,000,000", "2,400,000"],
          ["트리필 추가옵션 (서브시전 원리 진피재생, CO₂ 미세박리)", "", "100,000", ""],
          ["물광주사", "2cc", "150,000", "300,000"],
          ["리쥬란HB", "2cc", "300,000", "849,000"],
          ["리쥬란힐러", "2cc", "300,000", "849,000"],
          ["쥬베룩", "3cc", "300,000", "849,000"],
          ["쥬베룩 볼륨", "1cc", "150,000", ""],
          ["리투오 (Re2O)", "1회(5cc)", "700,000", "2,000,000"],
        ],
        priceColumns: 2,
      },
    ],
    footnotes: ["스킨보톡스 추가 시 가격 변동"],
  },
  {
    id: "fat",
    categoryId: "fat",
    title: "지방 · 비만 관리",
    tables: [
      {
        headers: ["종류", "용량", "1회", "3회"],
        rows: [
          ["지방분해 주사 (얼굴 전용, NO 스테로이드)", "5cc", "70,000", "190,000"],
          ["코조각주사 (콧망울·콧볼 피하지방)", "", "90,000", "250,000"],
          ["디센바", "5cc", "120,000", ""],
          ["SPC 주사 (몸 전용)", "10cc", "90,000", ""],
          ["SPC 주사 (몸 전용)", "20cc", "160,000", ""],
        ],
        priceColumns: 2,
      },
      {
        headers: ["다이어트약 처방료", "", "초진", "재진"],
        rows: [["", "", "30,000", "15,000"]],
        priceColumns: 2,
      },
    ],
    footnotes: ["디센바: 지방세포 파괴유도, 천연성분 전신 사용 가능"],
  },
  {
    id: "hair-female",
    categoryId: "hair",
    title: "여성 제모",
    description: "1·5·10회 단가 안내 (VAT 별도).",
    tables: [],
    laserHairRows: [
      {
        area: "얼굴",
        detail: "[ 미간 / 인중 / 겨드랑이 ] 선택1",
        once: hairSingle("15,000"),
        five: hairSingle("70,000"),
        ten: hairSingle("130,000"),
      },
      {
        area: "",
        detail: "[ 인중+겨드랑이 / 헤어라인 / 구레나룻 / 턱 ] 선택1",
        once: hairSingle("20,000"),
        five: hairSingle("110,000"),
        ten: hairSingle("220,000"),
      },
      { area: "", detail: "이마 전체", once: hairSingle("20,000"), five: hairSingle("80,000"), ten: hairSingle("150,000") },
      { area: "", detail: "얼굴 하관", once: hairSingle("40,000"), five: hairSingle("170,000"), ten: hairSingle("300,000") },
      {
        area: "",
        detail: "얼굴 전체",
        once: hairSingle("90,000"),
        five: hairSingle("430,000"),
        ten: hairSingle("820,000"),
      },
      { area: "", detail: "뒷목 부분", once: hairSingle("30,000"), five: hairSingle("120,000"), ten: hairSingle("210,000") },
      { area: "", detail: "뒷목 전체", once: hairSingle("50,000"), five: hairSingle("210,000"), ten: hairSingle("400,000") },
      { area: "팔", detail: "손등 + 손가락", once: hairSingle("40,000"), five: hairSingle("160,000"), ten: hairSingle("280,000") },
      {
        area: "",
        detail: "[ 팔 상완 / 팔 하완 ] 선택1",
        once: hairSingle("57,000"),
        five: hairSingle("235,000"),
        ten: hairSingle("415,000"),
      },
      { area: "", detail: "팔 전체", once: hairSingle("100,000"), five: hairSingle("420,000"), ten: hairSingle("800,000") },
      { area: "하체", detail: "발등 + 발가락", once: hairSingle("50,000"), five: hairSingle("210,000"), ten: hairSingle("400,000") },
      {
        area: "",
        detail: "종아리",
        once: hairSingle("70,000"),
        five: hairSingle("340,000"),
        ten: hairSingle("625,000"),
      },
      {
        area: "",
        detail: "허벅지",
        once: hairSingle("80,000"),
        five: hairSingle("360,000"),
        ten: hairSingle("680,000"),
      },
      { area: "", detail: "다리 전체", once: hairSingle("150,000"), five: hairSingle("670,000"), ten: hairSingle("1,200,000") },
      {
        area: "",
        detail: "비키니라인",
        once: hairSingle("145,000"),
        five: hairSingle("625,000"),
        ten: hairSingle("1,200,000"),
      },
      {
        area: "",
        detail: "브라질리언 (항문제외)",
        once: hairSingle("180,000"),
        five: hairSingle("780,000"),
        ten: hairSingle("1,500,000"),
      },
      { area: "상체", detail: "베레나룻", once: hairSingle("25,000"), five: hairSingle("100,000"), ten: hairSingle("180,000") },
      {
        area: "",
        detail: "[ 복부 상완 / 복부 하완 ] 선택1",
        once: hairSingle("70,000"),
        five: hairSingle("300,000"),
        ten: hairSingle("550,000"),
      },
      { area: "", detail: "복부 전체", once: hairSingle("120,000"), five: hairSingle("520,000"), ten: hairSingle("940,000") },
      { area: "", detail: "등 전체", once: hairSingle("150,000"), five: hairSingle("670,000"), ten: hairSingle("1,250,000") },
    ],
  },
  {
    id: "hair-male",
    categoryId: "hair",
    title: "남성 제모",
    description: "1·5·10회 단가 안내 (VAT 별도).",
    tables: [],
    laserHairRows: [
      {
        area: "얼굴",
        detail: "[ 미간 / 인중 / 겨드랑이 ] 선택1",
        once: hairSingle("30,000"),
        five: hairSingle("133,000"),
        ten: hairSingle("260,000"),
      },
      {
        area: "",
        detail: "[ 인중+겨드랑이 / 헤어라인 / 구레나룻 / 턱 ] 선택1",
        once: hairSingle("45,000"),
        five: hairSingle("233,000"),
        ten: hairSingle("460,000"),
      },
      { area: "", detail: "이마 전체", once: hairSingle("30,000"), five: hairSingle("120,000"), ten: hairSingle("210,000") },
      {
        area: "",
        detail: "얼굴 하관 + 진정관리",
        once: hairSingle("64,000"),
        five: hairSingle("285,000"),
        ten: hairSingle("523,000"),
      },
      {
        area: "",
        detail: "얼굴 전체 + 진정관리",
        once: hairSingle("105,000"),
        five: hairSingle("500,000"),
        ten: hairSingle("970,000"),
      },
      { area: "", detail: "뒷목 부분", once: hairSingle("40,000"), five: hairSingle("170,000"), ten: hairSingle("300,000") },
      { area: "", detail: "뒷목 전체", once: hairSingle("60,000"), five: hairSingle("270,000"), ten: hairSingle("500,000") },
      { area: "팔", detail: "손등 + 손가락", once: hairSingle("45,000"), five: hairSingle("200,000"), ten: hairSingle("360,000") },
      {
        area: "",
        detail: "[ 팔 상완 / 팔 하완 ] 선택1",
        once: hairSingle("72,000"),
        five: hairSingle("310,000"),
        ten: hairSingle("583,000"),
      },
      { area: "", detail: "팔 전체", once: hairSingle("110,000"), five: hairSingle("470,000"), ten: hairSingle("900,000") },
      { area: "하체", detail: "발등 + 발가락", once: hairSingle("55,000"), five: hairSingle("240,000"), ten: hairSingle("410,000") },
      {
        area: "",
        detail: "종아리",
        once: hairSingle("88,000"),
        five: hairSingle("416,000"),
        ten: hairSingle("800,000"),
      },
      {
        area: "",
        detail: "허벅지",
        once: hairSingle("95,000"),
        five: hairSingle("446,000"),
        ten: hairSingle("865,000"),
      },
      { area: "", detail: "다리 전체", once: hairSingle("160,000"), five: hairSingle("720,000"), ten: hairSingle("1,300,000") },
      {
        area: "",
        detail: "브라질리언 (항문제외)",
        once: hairSingle("150,000"),
        five: hairSingle("625,000"),
        ten: hairSingle("1,660,000"),
      },
      { area: "상체", detail: "베레나룻", once: hairSingle("30,000"), five: hairSingle("120,000"), ten: hairSingle("210,000") },
      {
        area: "",
        detail: "[ 복부 상완 / 복부 하완 ] 선택1",
        once: hairSingle("80,000"),
        five: hairSingle("300,000"),
        ten: hairSingle("550,000"),
      },
      { area: "", detail: "복부 전체", once: hairSingle("150,000"), five: hairSingle("650,000"), ten: hairSingle("1,200,000") },
      { area: "", detail: "등 전체", once: hairSingle("200,000"), five: hairSingle("900,000"), ten: hairSingle("1,600,000") },
    ],
  },
  {
    id: "iv",
    categoryId: "iv",
    title: "수액 · 실비치료",
    tables: [
      {
        headers: ["종류", "권장주기·안내", "1회"],
        rows: [
          ["감초주사 (간기능·항염·면역)", "2주 자주 / 4주 이상 휴식 권장", "20,000"],
          ["비타민C (만성피로·영양·면역)", "1주 간격 1회 이상", "30,000"],
          ["비타민D (골·우울·면역)", "3개월 간격 1회", "30,000"],
          ["백옥주사 (피부결·미백·노화)", "2주 간격 10회 이상", "30,000"],
          ["신데렐라주사 (다이어트·스트레스·부종)", "1주 간격 5회 이상", "30,000"],
          ["태반주사(플라몬주사)", "주 1회 3주 연속 권장 / 실비보험", "80,000 / 60,000"],
        ],
        priceColumns: 1,
      },
    ],
    footnotes: ["태반주사: 원문 할인 표기에 따른 두 가지 단가 — 상담 시 확인"],
  },
  {
    id: "noncovered",
    categoryId: "noncovered",
    title: "비급여 · 제증명",
    tables: [
      {
        headers: ["종류", "1회"],
        rows: [
          ["비급여 약제 처방료", "10,000"],
          ["성형TR 주사 (켈로이드·비대성 흉터, 용량별)", "50,000 ~"],
          ["피부TR 주사 (1부위)", "5,000"],
          ["피부TR 주사 (얼굴전체)", "20,000"],
          ["LLD 주사 (필러 녹이는 주사, 용량별)", "50,000 ~"],
          ["수면마취 비용 (추가)", "50,000"],
          ["진료 의뢰서 (진료비 별도)", "0"],
          ["진료 확인서 (진단명 미기재, 진료비 별도)", "0"],
          ["진료 확인서 (진단명 기재)", "10,000"],
          ["의사 소견서 (진단명 기재)", "15,000"],
          ["일반 진단서 (진단명 기재)", "15,000"],
          ["서류 재발행 (동일 내용)", "1,000"],
        ],
        priceColumns: 1,
      },
    ],
    footnotes: [
      "「국민건강보호법」 등에 따른 비급여 진료비용·재증명 수수료 고지 안내는 원내 게시 기준을 따릅니다.",
    ],
  },
];
