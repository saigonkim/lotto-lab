import fs from "fs";
import path from "path";
import type { LottoHistoryData, LottoRecord } from "@/types";

let cachedData: LottoRecord[] | null = null;

export function loadLottoHistory(): LottoRecord[] {
  // 개발 환경에서는 캐시를 사용하지 않아 JSON 파일 변경이 즉시 반영됨
  if (cachedData && process.env.NODE_ENV === "production") {
    return cachedData;
  }

  const filePath = path.join(process.cwd(), "public", "data", "lotto_history.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  const parsed: LottoHistoryData = JSON.parse(raw);

  // numbers 배열이 비어있는 불량 데이터 필터링
  const validData = parsed.data.filter(
    (record) => Array.isArray(record.numbers) && record.numbers.length === 6
  );

  cachedData = validData;
  return cachedData;
}
