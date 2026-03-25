import type { LottoStats } from "@/types";

export function calcStats(numbers: number[]): LottoStats {
  const sorted = [...numbers].sort((a, b) => a - b);

  const sum = sorted.reduce((acc, n) => acc + n, 0);
  const oddCount = sorted.filter((n) => n % 2 !== 0).length;
  const evenCount = 6 - oddCount;

  let hasConsecutive = false;
  for (let i = 0; i < sorted.length - 1; i++) {
    if (sorted[i + 1] - sorted[i] === 1) {
      hasConsecutive = true;
      break;
    }
  }

  return { sum, oddCount, evenCount, hasConsecutive };
}

/**
 * 연속된 번호 쌍의 수를 반환합니다.
 * 예) [1,2,10,11,20,30] → 2 (1-2 쌍, 10-11 쌍)
 * 예) [1,2,3,10,20,30] → 2 (1-2 쌍, 2-3 쌍)
 */
export function countConsecutivePairs(numbers: number[]): number {
  const sorted = [...numbers].sort((a, b) => a - b);
  let pairs = 0;
  for (let i = 0; i < sorted.length - 1; i++) {
    if (sorted[i + 1] - sorted[i] === 1) pairs++;
  }
  return pairs;
}

/**
 * 3개 이상 연속 번호 존재 여부를 반환합니다.
 * 예) [1,2,3,10,20,30] → true
 * 예) [1,2,10,11,20,30] → false
 */
export function hasTripleConsecutive(numbers: number[]): boolean {
  const sorted = [...numbers].sort((a, b) => a - b);
  for (let i = 0; i < sorted.length - 2; i++) {
    if (
      sorted[i + 1] - sorted[i] === 1 &&
      sorted[i + 2] - sorted[i + 1] === 1
    ) {
      return true;
    }
  }
  return false;
}

/** @deprecated Use countConsecutivePairs instead */
export function countMaxConsecutivePairs(numbers: number[]): number {
  return countConsecutivePairs(numbers);
}

export function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
