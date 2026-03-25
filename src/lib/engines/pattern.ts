import type { LottoRecord, GenerateResult } from "@/types";
import { calcStats } from "@/lib/utils/lotto-stats";

/**
 * 패턴 매칭형 (Pattern/Clustering)
 * 과거 당첨 번호 간 평균 간격(diff)을 분석하여 유사한 분포로 번호 생성
 * - 최근 100회차 데이터를 우선 활용 (최신 트렌드 반영)
 * - noise 범위 확장(-3~+3)으로 다양성 향상
 * - 시작 번호 범위 확장(1~12)으로 커버리지 향상
 */
export function generateByPattern(records: LottoRecord[]): GenerateResult {
  // 최근 100회차 우선 사용 (충분한 통계 확보)
  const targetRecords = records.length >= 100 ? records.slice(-100) : records;

  // 각 회차의 정렬된 6개 번호로부터 5개 간격 계산
  const gapSums = [0, 0, 0, 0, 0];
  let validCount = 0;

  for (const record of targetRecords) {
    const sorted = [...record.numbers].sort((a, b) => a - b);
    if (sorted.length !== 6) continue;
    for (let i = 0; i < 5; i++) {
      gapSums[i] += sorted[i + 1] - sorted[i];
    }
    validCount++;
  }

  const avgGaps =
    validCount > 0
      ? gapSums.map((s) => Math.round(s / validCount))
      : [6, 7, 6, 7, 6];

  // 시작 번호: 1~12 랜덤 (커버리지 확장)
  const MAX_ATTEMPTS = 1000;
  const NOISE_RANGE = 3; // -3 ~ +3

  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    const start = Math.floor(Math.random() * 12) + 1;
    const candidate: number[] = [start];

    let valid = true;
    for (let i = 0; i < 5; i++) {
      const noise = Math.floor(Math.random() * (NOISE_RANGE * 2 + 1)) - NOISE_RANGE;
      const next = candidate[candidate.length - 1] + avgGaps[i] + noise;

      if (next > 45 || next < 1 || candidate.includes(next)) {
        valid = false;
        break;
      }
      candidate.push(next);
    }

    if (valid && candidate.length === 6) {
      const numbers = candidate.sort((a, b) => a - b);
      const stats = calcStats(numbers);
      const rationale =
        `합계 ${stats.sum} | 홀짝 ${stats.oddCount}:${stats.evenCount} | ` +
        `최근 ${validCount}회차 평균 간격 패턴(${avgGaps.join("-")}) 매칭`;
      return { numbers, engine: "pattern", stats, rationale };
    }
  }

  // 폴백: 평균 간격을 직접 적용한 균등 생성
  const start = Math.floor(Math.random() * 8) + 1;
  const fallback: number[] = [start];
  for (let i = 0; i < 5; i++) {
    const next = fallback[fallback.length - 1] + avgGaps[i];
    if (next >= 1 && next <= 45 && !fallback.includes(next)) {
      fallback.push(next);
    }
  }
  // 6개 미만이면 랜덤 보충
  while (fallback.length < 6) {
    const n = Math.floor(Math.random() * 45) + 1;
    if (!fallback.includes(n)) fallback.push(n);
  }

  const numbers = fallback.slice(0, 6).sort((a, b) => a - b);
  const stats = calcStats(numbers);
  return {
    numbers,
    engine: "pattern",
    stats,
    rationale: `합계 ${stats.sum} | 홀짝 ${stats.oddCount}:${stats.evenCount} | 평균 간격 패턴 적용`,
  };
}
