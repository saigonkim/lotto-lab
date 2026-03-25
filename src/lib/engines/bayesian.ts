import type { LottoRecord, GenerateResult } from "@/types";
import { calcStats } from "@/lib/utils/lotto-stats";

/**
 * 흐름 추적형 (Bayesian)
 * - 전체 히스토리 기반 빈도 가중치
 * - 최근 50회차에 2배 가중치 부여 (최신 트렌드 반영)
 * - 빈출 번호와 미출현 번호를 적절히 혼합
 */
export function generateByWeights(records: LottoRecord[]): GenerateResult {
  // 1~45 번호별 출현 횟수 집계 (전체)
  const counts = new Array(46).fill(0);
  for (const record of records) {
    for (const n of record.numbers) {
      counts[n]++;
    }
  }

  // 최근 50회차에 추가 가중치 (최신 트렌드 강조)
  const recentRecords = records.slice(-50);
  const recentBoost = new Array(46).fill(0);
  for (const record of recentRecords) {
    for (const n of record.numbers) {
      recentBoost[n]++;
    }
  }

  // 최종 가중치: 전체 빈도 + 최근 빈도 × 1.5배 보너스
  const minCount = Math.max(1, Math.min(...counts.slice(1).filter((c) => c > 0)));
  const weights = counts.slice(1).map((c, i) => {
    const base = c === 0 ? minCount * 0.5 : c;
    const boost = recentBoost[i + 1] * 1.5;
    return base + boost;
  });

  // 가중치 기반 비복원 추출
  const selected: number[] = [];
  const remainWeights = [...weights];

  for (let i = 0; i < 6; i++) {
    const total = remainWeights.reduce((a, b) => a + b, 0);
    let r = Math.random() * total;
    for (let j = 0; j < remainWeights.length; j++) {
      r -= remainWeights[j];
      if (r <= 0) {
        selected.push(j + 1);
        remainWeights[j] = 0;
        break;
      }
    }
  }

  const numbers = selected.sort((a, b) => a - b);
  const stats = calcStats(numbers);

  // 핫/콜드 번호 설명 생성
  const sorted = [...counts.slice(1)]
    .map((c, i) => ({ num: i + 1, count: c }))
    .sort((a, b) => b.count - a.count);
  const hotNums = sorted.slice(0, 5).map((x) => x.num);
  const coldNums = sorted.slice(-5).map((x) => x.num);
  const hotInResult = numbers.filter((n) => hotNums.includes(n));
  const coldInResult = numbers.filter((n) => coldNums.includes(n));

  const rationale =
    `합계 ${stats.sum} | 홀짝 ${stats.oddCount}:${stats.evenCount} | ` +
    `빈출 번호 ${hotInResult.length}개 · 미출현 번호 ${coldInResult.length}개 포함 ` +
    `(최근 ${recentRecords.length}회차 트렌드 반영)`;

  return { numbers, engine: "bayesian", stats, rationale };
}
