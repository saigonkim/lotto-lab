"use client";

import type { EngineType } from "@/types";
import { ENGINES } from "@/lib/utils/engines-config";
import EngineCard from "@/components/ui/EngineCard";

interface StepEngineSelectProps {
  selected: EngineType | null;
  onSelect: (engine: EngineType) => void;
  onStart: () => void;
}

export default function StepEngineSelect({ selected, onSelect, onStart }: StepEngineSelectProps) {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {ENGINES.map((engine) => (
          <EngineCard
            key={engine.id}
            engine={engine}
            selected={selected === engine.id}
            onSelect={onSelect}
          />
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={onStart}
          disabled={!selected}
          className={`
            px-12 py-5 rounded-full text-lg font-bold tracking-widest uppercase transition-all duration-300 relative overflow-hidden group
            ${selected
              ? "neon-btn text-black"
              : "bg-gray-800/50 text-gray-500 cursor-not-allowed border border-gray-700/50"
            }
          `}
        >
          {selected && (
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
          )}
          <span className="relative z-10 flex items-center justify-center">
            시스템 연동 시작
          </span>
        </button>
      </div>
    </div>
  );
}
