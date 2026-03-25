"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface AdInterstitialProps {
  onClose: () => void;
  duration?: number; // ms
}

const CUSTOM_AD = {
  url: "https://minimal-arcade-777.web.app/",
  title: "Minimal Arcade",
  description: "깔끔하고 미니멀한 아케이드 게임 모음. 지금 바로 무료로 즐겨보세요!",
  badge: "🕹️ 무료 게임",
  cta: "게임 하러 가기",
  thumbnail: "https://minimal-arcade-777.web.app/thumbnail.png", // 없을 경우 fallback 처리
};

export default function AdInterstitial({ onClose, duration = 3000 }: AdInterstitialProps) {
  const [remaining, setRemaining] = useState(Math.ceil(duration / 1000));
  const [mounted, setMounted] = useState(false);
  const [imgError, setImgError] = useState(false);

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

        {/* 커스텀 광고 카드 */}
        <a
          href={CUSTOM_AD.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block group"
        >
          {/* 썸네일 */}
          <div className="relative bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 h-[180px] flex items-center justify-center overflow-hidden">
            {!imgError ? (
              <img
                src={CUSTOM_AD.thumbnail}
                alt={CUSTOM_AD.title}
                className="w-full h-full object-cover"
                onError={() => setImgError(true)}
              />
            ) : (
              /* 이미지 없을 때 그라디언트 배경 + 아이콘 */
              <div className="text-center text-white">
                <div className="text-6xl mb-2 drop-shadow-lg">🕹️</div>
                <p className="text-lg font-black tracking-wide drop-shadow">Minimal Arcade</p>
              </div>
            )}
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
          </div>

          {/* 텍스트 영역 */}
          <div className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs bg-indigo-100 text-indigo-600 font-bold px-2 py-0.5 rounded-full">
                {CUSTOM_AD.badge}
              </span>
            </div>
            <h3 className="font-black text-gray-900 text-base mb-1 group-hover:text-indigo-600 transition-colors">
              {CUSTOM_AD.title}
            </h3>
            <p className="text-gray-500 text-xs leading-relaxed">
              {CUSTOM_AD.description}
            </p>
            <div className="mt-3 text-xs font-bold text-indigo-500 flex items-center gap-1">
              {CUSTOM_AD.cta} →
            </div>
          </div>
        </a>

        {/* 하단 분석 중 텍스트 */}
        <div className="px-4 py-3 bg-[#030614] text-center border-t border-white/10">
          <p className="text-white text-xs font-bold tracking-wide flex items-center justify-center gap-2">
            <span className="animate-spin inline-block">⚙️</span> 데이터 정밀 분석 중...
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
}
