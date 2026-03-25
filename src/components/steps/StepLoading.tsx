"use client";

import { useEffect, useState } from "react";
import type { EngineType } from "@/types";
import { ENGINES } from "@/lib/utils/engines-config";

interface StepLoadingProps {
  engine: EngineType;
}

export default function StepLoading({ engine }: StepLoadingProps) {
  const engineInfo = ENGINES.find((e) => e.id === engine)!;
  const messages = engineInfo.loadingMessages;

  const [messageIndex, setMessageIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => Math.min(prev + 1, messages.length - 1));
      setProgress((prev) => Math.min(prev + 20, 100));
    }, 600);
    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className="w-full max-w-lg mx-auto px-6 py-8 glass-panel rounded-[2rem] text-center relative overflow-hidden backdrop-blur-xl border border-white/10 shadow-2xl">
      <div className="absolute top-0 right-0 w-32 h-32 bg-[--secondary] blur-[80px] rounded-full opacity-30 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-[--primary] blur-[80px] rounded-full opacity-30 pointer-events-none" />
      
      <div className="mb-10 relative z-10">
        <div className="w-24 h-24 mx-auto mb-8 relative flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-white/10" />
          <div className="absolute inset-0 rounded-full border-t border-[--primary] animate-spin drop-shadow-[0_0_8px_var(--primary)]" style={{ animationDuration: '1s' }} />
          <div className="absolute inset-2 rounded-full border border-transparent border-r-[--secondary] animate-spin drop-shadow-[0_0_8px_var(--secondary)]" style={{ animationDuration: '1.5s', animationDirection: 'reverse' }} />
          <div className="text-3xl filter drop-shadow-[0_0_10px_white]">
            🔬
          </div>
        </div>

        <h2 className="text-2xl font-black text-white mb-2 tracking-wide">데이터 동기화 진행 중</h2>
        <p className="text-sm text-[#a3aac4]">
          현재 <span className="font-bold text-[--primary] neon-text">{engineInfo.name}</span> 알고리즘 구동 중입니다.
        </p>
      </div>

      <div className="glass-panel bg-opacity-20 rounded-2xl p-5 mb-8 text-left space-y-3 relative z-10 font-mono">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex items-start gap-3 text-sm transition-all duration-300 ${
              i < messageIndex
                ? "text-[--primary]"
                : i === messageIndex
                ? "text-white font-medium drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]"
                : "text-white/20"
            }`}
          >
            <span className="text-xs w-4 mt-0.5 opacity-80">
              {i < messageIndex ? "[OK]" : i === messageIndex ? "[>>]" : "[--]"}
            </span>
            <span>{msg}</span>
          </div>
        ))}
      </div>

      <div className="relative z-10">
        <div className="w-full bg-[#091328] rounded-full h-1.5 overflow-hidden mb-2">
          <div
            className="bg-gradient-to-r from-[--primary] to-[--secondary] h-full rounded-full transition-all duration-500 shadow-[0_0_10px_var(--primary)] relative"
            style={{ width: `${progress}%` }}
          >
             <div className="absolute right-0 top-0 bottom-0 w-10 bg-white/50 blur-[2px]" />
          </div>
        </div>
        <p className="text-xs text-[--primary] font-mono font-bold tracking-widest text-right">{progress}%</p>
      </div>
    </div>
  );
}
