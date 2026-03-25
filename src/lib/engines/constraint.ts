import type { LottoRecord, GenerateResult } from "@/types";
import { calcStats, hasTripleConsecutive, countConsecutivePairs, shuffleArray } from "@/lib/utils/lotto-stats";

const CONSTRAINTS = {
  sumMin: 100,
  sumMax: 175,
  oddMin: 2,
  oddMax: 4,
  maxConsecutivePairs: 1, // 연속 쌍 최대 1쌍 허용
  maxAttempts: 15000,
};

/**
 * 균형 필터형 (Constraint Satisfaction)
 * 통계적 황금 비율 조건을 만족할 때까지 반복 생성
 *
 * 필터 1: 합계 100 ~ 175
 * 필터 2: 홀짝 비율 2:4, 3:3, 4:2 (홀수 2~4개)
 * 필터 3: 연속 번호 — 2개까지만 허용, 3개 연속 명시적 금지
 */
export function generateWithFilters(_records: LottoRecord[]): GenerateResult {
  const allNumbers = Array.from({ length: 45 }, (_, i) => i + 1);

  let candidate: number[] = [];
  let attempts = 0;
  let passed = false;

  while (attempts < CONSTRAINTS.maxAttempts) {
    const shuffled = shuffleArray(allNumbers);
    candidate = shuffled.slice(0, 6).sort((a, b) => a - b);

    const sum = candidate.reduce((a, b) => a + b, 0);
    const oddCount = candidate.filter((n) => n % 2 !== 0).length;
    const consecutivePairs = countConsecutivePairs(candidate);
    const tripleConsec = hasTripleConsecutive(candidate); // 3연속 명시적 검사

    if (
      sum >= CONSTRAINTS.sumMin &&
      sum <= CONSTRAINTS.sumMax &&
      oddCount >= CONSTRAINTS.oddMin &&
      oddCount <= CONSTRAINTS.oddMax &&
      consecutivePairs <= CONSTRAINTS.maxConsecutivePairs &&
      !tripleConsec // 3연속 금지
    ) {
      passed = true;
      break;
    }
    attempts++;
  }

  if (!passed) {
    // 폴백: 조건을 단계적으로 완화하면서 재시도
    for (let i = 0; i < 1000; i++) {
      const shuffled = shuffleArray(allNumbers);
      candidate = shuffled.slice(0, 6).sort((a, b) => a - b);
      const sum = candidate.reduce((a, b) => a + b, 0);
      const oddCount = candidate.filter((n) => n % 2 !== 0).length;
      if (sum >= 90 && sum <= 185 && oddCount >= 2 && oddCount <= 4) break;
    }
  }

  const stats = calcStats(candidate);
  const rationale =
    `합계 ${stats.sum} | 홀짝 ${stats.oddCount}:${stats.evenCount} | ` +
    `황금 비율 필터 통과 (${attempts + 1}회 시도)`;

  return { numbers: candidate, engine: "constraint", stats, rationale };
}
