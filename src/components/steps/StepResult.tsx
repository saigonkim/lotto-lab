"use client";

import { useEffect } from "react";
import type { GenerateResult, EngineType } from "@/types";
import LottoBall from "@/components/ui/LottoBall";
import ShareButton from "@/components/ui/ShareButton";
import AdBanner from "@/components/ads/AdBanner";
import { ENGINES } from "@/lib/utils/engines-config";

interface StepResultProps {
  result: GenerateResult;
  onReset: () => void;
  onRetry: () => void;
}

const ENGINE_LABELS: Record<EngineType, { badge: string; detail: string }> = {
  bayesian: {
    badge: "📈 흐름 추적형",
    detail: "최근 출현 빈도 가중치를 적용하여 핫/콜드 번호를 최적 비율로 배합했습니다.",
  },
  constraint: {
    badge: "⚖️ 균형 필터형",
    detail: "역대 1등 당첨 조합의 92% 이상이 포함된 통계적 황금 비율을 완벽히 통과한 조합입니다.",
  },
  pattern: {
    badge: "🔮 패턴 매칭형",
    detail: "과거 당첨 번호들 사이의 평균 간격을 분석하여 가장 이상적인 분포 패턴을 찾아냈습니다.",
  },
};

export default function StepResult({ result, onReset, onRetry }: StepResultProps) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const label = ENGINE_LABELS[result.engine];
  const engineInfo = ENGINES.find((e) => e.id === result.engine)!;

  return (
    <div className="w-full max-w-2xl mx-auto px-4 sm:px-0">
      {/* 상단 AdSense 배너 */}
      <AdBanner slot="top" />

      {/* 엔진 뱃지 */}
      <div className="text-center mb-8">
        <span className="inline-block px-5 py-2 glass-panel text-[--primary] rounded-full text-xs font-bold tracking-widest mb-4 border-[--primary]/30 shadow-[0_0_15px_rgba(148,170,255,0.2)]">
          {label.badge}
        </span>
        <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-[--primary] drop-shadow-md mb-2">
          이번 주 분석 결과
        </h2>
        <p className="text-[#a3aac4] text-sm max-w-md mx-auto">{label.detail}</p>
      </div>

      {/* 번호 공 */}
      <div className="glass-panel rounded-[2rem] p-8 mb-6 relative overflow-hidden backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.5)]">
        <div className="absolute top-0 right-0 w-48 h-48 bg-[--tertiary] blur-[100px] rounded-full opacity-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[--secondary] blur-[100px] rounded-full opacity-10 pointer-events-none" />
        
        <div className="flex justify-center gap-3 sm:gap-4 flex-wrap mb-8 relative z-10">
          {result.numbers.map((num, i) => (
            <div key={num} className="relative group">
              <div className="absolute inset-0 bg-[#ffe792] blur-md opacity-0 group-hover:opacity-40 transition-opacity duration-300 rounded-full" />
              <LottoBall number={num} size="lg" animate delay={i * 100} />
            </div>
          ))}
        </div>

        {/* 통계 정보 */}
        <div className="border-t border-white/10 pt-6 grid grid-cols-3 gap-4 text-center relative z-10">
          <div className="glass-panel bg-opacity-20 rounded-2xl p-4 border border-white/5 hover:border-white/20 transition-colors">
            <p className="text-[10px] sm:text-xs text-[#a3aac4] mb-1 font-mono tracking-widest uppercase">SUM</p>
            <p className="text-xl sm:text-2xl font-black text-white">{result.stats.sum}</p>
          </div>
          <div className="glass-panel bg-opacity-20 rounded-2xl p-4 border border-white/5 hover:border-white/20 transition-colors">
            <p className="text-[10px] sm:text-xs text-[#a3aac4] mb-1 font-mono tracking-widest uppercase">ODD:EVEN</p>
            <p className="text-xl sm:text-2xl font-black text-white">
              {result.stats.oddCount}:{result.stats.evenCount}
            </p>
          </div>
          <div className="glass-panel bg-opacity-20 rounded-2xl p-4 border border-white/5 hover:border-white/20 transition-colors">
            <p className="text-[10px] sm:text-xs text-[#a3aac4] mb-1 font-mono tracking-widest uppercase">SEQ</p>
            <p className="text-base sm:text-xl font-black text-white mt-1 sm:mt-0">
              {result.stats.hasConsecutive ? "YES" : "NO"}
            </p>
          </div>
        </div>

        {/* 근거 설명 */}
        <div className="mt-6 glass-panel bg-[--primary]/5 border-[--primary]/20 rounded-2xl p-4 relative z-10">
          <p className="text-xs text-[--primary] font-bold tracking-widest flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[--primary] animate-pulse" />
            ANALYSIS RATIONALE
          </p>
          <p className="text-sm text-white/80 mt-2 leading-relaxed">{result.rationale}</p>
        </div>
      </div>

      {/* 액션 버튼 */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={onRetry}
          className="flex-1 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-white font-bold text-sm transition-all duration-300 backdrop-blur-md"
        >
          🔄 타 정보 재분석
        </button>
        <div className="flex-1">
           <ShareButton numbers={result.numbers} engine={engineInfo.name} />
        </div>
      </div>

      <button
        onClick={onReset}
        className="w-full py-4 bg-transparent border border-[#a3aac4]/20 hover:border-[#a3aac4]/50 hover:bg-white/5 text-[#a3aac4] hover:text-white rounded-2xl transition-all duration-300 font-medium tracking-wide flex items-center justify-center gap-2"
      >
        <span>⚙️</span> 알고리즘 엔진 변경
      </button>

      {/* 하단 AdSense 배너 */}
      <div className="mt-8">
        <AdBanner slot="bottom" />
      </div>
    </div>
  );
}
