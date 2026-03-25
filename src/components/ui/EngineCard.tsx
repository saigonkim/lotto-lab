"use client";

import type { EngineInfo, EngineType } from "@/types";

interface EngineCardProps {
  engine: EngineInfo;
  selected: boolean;
  onSelect: (id: EngineType) => void;
}

export default function EngineCard({ engine, selected, onSelect }: EngineCardProps) {
  return (
    <button
      onClick={() => onSelect(engine.id)}
      className={`
        relative w-full h-full flex flex-col rounded-[1.5rem] p-6 text-left transition-all duration-300
        border cursor-pointer overflow-hidden glass-card-hover
        ${selected
          ? `border-opacity-100 bg-gradient-to-br from-white/5 to-[--surface-bright] bg-opacity-10 scale-105 neon-text shadow-[0_0_20px_rgba(148,170,255,0.3)]`
          : "border-white/10 glass-panel opacity-70 hover:opacity-100"
        }
      `}
      style={{
        borderColor: selected ? 'var(--primary)' : 'rgba(255, 255, 255, 0.1)'
      }}
    >

      <div className="text-4xl mb-4 drop-shadow-md">{engine.id === "bayesian" ? "📈" : engine.id === "constraint" ? "⚖️" : "🔮"}</div>
      <h3 className={`text-xl font-bold mb-1 tracking-tight ${selected ? "text-white drop-shadow-sm" : "text-[#dee5ff]"}`}>
        {engine.name}
      </h3>
      <p className={`text-sm font-medium mb-3 ${selected ? "text-[--primary]" : "text-[#94aaff]/70"}`}>
        {engine.tagline}
      </p>
      <p className={`text-xs leading-relaxed mt-auto pr-2 ${selected ? "text-white/90" : "text-white/50"}`}>
        {engine.description}
      </p>
      
      {/* Decorative background glow for selected card */}
      {selected && (
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[--primary] rounded-full filter blur-[50px] opacity-20 pointer-events-none" />
      )}
    </button>
  );
}
