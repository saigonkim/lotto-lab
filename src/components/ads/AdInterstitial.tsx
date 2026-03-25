"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface AdInterstitialProps {
  onClose: () => void;
  duration?: number; // ms
}

export default function AdInterstitial({ onClose, duration = 3000 }: AdInterstitialProps) {
  const [remaining, setRemaining] = useState(Math.ceil(duration / 1000));
  const [mounted, setMounted] = useState(false);
  const isDev = process.env.NODE_ENV === "development";

  useEffect(() => {
    setMounted(true);
    const countdown = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const closeTimer = setTimeout(onClose, duration);

    return () => {
      clearInterval(countdown);
      clearTimeout(closeTimer);
    };
  }, [onClose, duration]);

  if (!mounted) return null;

  return createPortal(
    <div className="fixed top-0 left-0 w-screen h-[100dvh] z-[99999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 m-0 box-border">
      <div className="bg-white rounded-2xl w-[90%] max-w-[360px] mx-auto overflow-hidden shadow-2xl relative flex flex-col">
        {/* 광고 헤더 */}
        <div className="bg-gray-50 px-4 py-3 flex items-center justify-between border-b">
          <span className="text-xs text-gray-400 font-bold tracking-wide">광고</span>
          <span className="text-xs text-gray-500 font-medium">
            {remaining}초 후 자동으로 닫힙니다
          </span>
        </div>

        {/* 광고 영역 */}
        {isDev ? (
          <div className="h-[250px] bg-gray-100 flex items-center justify-center">
            <div className="text-center text-gray-400 flex flex-col items-center">
              <div className="text-4xl mb-3">📢</div>
              <p className="text-sm font-mono tracking-tight">[ AdSense 전면 광고 영역 ]</p>
              <p className="text-xs mt-1">개발 환경 플레이스홀더</p>
            </div>
          </div>
        ) : (
          <div className="h-[250px] flex items-center justify-center">
            {/* 실제 AdSense Interstitial 또는 광고 단위 */}
            <ins
              className="adsbygoogle"
              style={{ display: "block", width: "100%", height: "100%" }}
              data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}
              data-ad-slot={process.env.NEXT_PUBLIC_ADSENSE_INTERSTITIAL_SLOT}
              data-ad-format="auto"
            />
          </div>
        )}

        {/* 안내 텍스트 */}
        <div className="p-5 bg-[#030614] text-center border-t border-[--primary]/20">
          <p className="text-white text-sm font-bold tracking-wide flex items-center justify-center gap-2">
            <span className="animate-spin text-[--primary]">⚙️</span> 데이터 정밀 분석 중...
          </p>
          <p className="text-[#a3aac4] text-xs mt-2 font-medium">과거 당첨 데이터를 통계적으로 처리하고 있습니다</p>
        </div>
      </div>
    </div>,
    document.body
  );
}
