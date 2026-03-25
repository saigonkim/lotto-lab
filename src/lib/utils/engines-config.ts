import type { EngineInfo } from "@/types";

export const ENGINES: EngineInfo[] = [
  {
    id: "bayesian",
    name: "흐름 추적형",
    tagline: "핫/콜드 번호를 조합합니다",
    description: "최근 기세가 좋은 번호와 나올 때가 된 번호를 출현 빈도 가중치로 배합합니다.",
    color: "bg-blue-500 ring-blue-400",
    loadingMessages: [
      "과거 당첨 데이터 로딩 중...",
      "번호별 출현 빈도 계산 중...",
      "가중치 모델 적용 중...",
      "핫/콜드 번호 분석 완료",
      "최적 조합 생성 중...",
    ],
  },
  {
    id: "constraint",
    name: "균형 필터형",
    tagline: "통계적 황금 비율을 통과합니다",
    description: "역대 1등 당첨 조합의 합계, 홀짝 비율, 연속성 등 통계적 규칙을 적용합니다.",
    color: "bg-emerald-500 ring-emerald-400",
    loadingMessages: [
      "필터 조건 초기화 중...",
      "무작위 조합 생성 중...",
      "합계 조건 검사 중 (100~175)...",
      "홀짝 비율 검증 중...",
      "연속 번호 패턴 확인 중...",
    ],
  },
  {
    id: "pattern",
    name: "패턴 매칭형",
    tagline: "과거 분포 패턴과 유사하게 생성합니다",
    description: "과거 당첨 데이터의 번호 간격을 분석하여 가장 이상적인 분포 패턴을 찾아냅니다.",
    color: "bg-violet-500 ring-violet-400",
    loadingMessages: [
      "당첨 패턴 로딩 중...",
      "번호 간격 데이터 추출 중...",
      "평균 간격 패턴 계산 중...",
      "유사 패턴 매칭 중...",
      "패턴 기반 번호 생성 완료",
    ],
  },
];
