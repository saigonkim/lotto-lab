import type { EngineType, GenerateResult, LottoRecord } from "@/types";
import { generateByWeights } from "./bayesian";
import { generateWithFilters } from "./constraint";
import { generateByPattern } from "./pattern";

export function runEngine(engine: EngineType, records: LottoRecord[]): GenerateResult {
  switch (engine) {
    case "bayesian":
      return generateByWeights(records);
    case "constraint":
      return generateWithFilters(records);
    case "pattern":
      return generateByPattern(records);
    default:
      throw new Error(`Unknown engine: ${engine}`);
  }
}
