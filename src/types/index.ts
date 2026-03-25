export type EngineType = "bayesian" | "constraint" | "pattern";

export interface EngineInfo {
  id: EngineType;
  name: string;
  tagline: string;
  description: string;
  color: string;
  loadingMessages: string[];
}

export interface LottoStats {
  sum: number;
  oddCount: number;
  evenCount: number;
  hasConsecutive: boolean;
}

export interface GenerateResult {
  numbers: number[];
  engine: EngineType;
  stats: LottoStats;
  rationale: string;
}

export interface LottoRecord {
  round: number;
  date: string;
  numbers: number[];
  bonus: number;
}

export interface LottoHistoryData {
  lastUpdated: string;
  totalRounds: number;
  data: LottoRecord[];
}

export type AppStep = "select" | "loading" | "result";
