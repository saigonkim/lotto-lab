"use client";

interface ShareButtonProps {
  numbers: number[];
  engine: string;
}

export default function ShareButton({ numbers, engine }: ShareButtonProps) {
  const handleShare = async () => {
    const text = `[로또 랩] ${engine} 추천 번호\n🎱 ${numbers.map((n) => String(n).padStart(2, "0")).join(" - ")}\n\n데이터 기반 번호 분석 👉 https://lotto-lab.vercel.app`;

    if (typeof window !== "undefined" && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(text);
        alert("번호가 클립보드에 복사되었습니다!");
      } catch {
        alert(text);
      }
    }
  };

  return (
    <button
      onClick={handleShare}
      className="w-full h-full py-4 bg-[--primary]/10 hover:bg-[--primary]/20 border border-[--primary]/30 rounded-2xl text-[--primary] font-bold text-sm transition-all duration-300 backdrop-blur-md flex items-center justify-center gap-2"
    >
      <span>📋</span>
      번호 공유하기
    </button>
  );
}
