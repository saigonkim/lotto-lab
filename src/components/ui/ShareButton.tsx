"use client";

const SITE_URL = "https://lotto-lab-sand.vercel.app/";

interface ShareButtonProps {
  numbers: number[];
  engine: string;
}

export default function ShareButton({ numbers, engine }: ShareButtonProps) {
  const shareText = `[로또 랩] ${engine} 추천 번호\n🎱 ${numbers.map((n) => String(n).padStart(2, "0")).join(" - ")}\n\n데이터 기반 번호 분석 👉 ${SITE_URL}`;

  const handleShare = async () => {
    // Web Share API 지원 시 디바이스 공유 시트 사용
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: "로또 랩 추천 번호",
          text: shareText,
          url: SITE_URL,
        });
        return;
      } catch (err) {
        // 사용자가 공유 취소한 경우(AbortError)는 무시
        if (err instanceof Error && err.name === "AbortError") return;
      }
    }

    // 폴백: 클립보드 복사
    try {
      await navigator.clipboard.writeText(shareText);
      alert("번호가 클립보드에 복사되었습니다!");
    } catch {
      alert(shareText);
    }
  };

  return (
    <button
      onClick={handleShare}
      className="w-full h-full py-4 bg-[--primary]/10 hover:bg-[--primary]/20 border border-[--primary]/30 rounded-2xl text-[--primary] font-bold text-sm transition-all duration-300 backdrop-blur-md flex items-center justify-center gap-2"
    >
      <span>🔗</span>
      번호 공유하기
    </button>
  );
}
