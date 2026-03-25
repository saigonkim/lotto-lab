"use client";

import { useEffect } from "react";

interface AdBannerProps {
  slot: "top" | "bottom" | "side";
}

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export default function AdBanner({ slot }: AdBannerProps) {
  const isDev = process.env.NODE_ENV === "development";
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
  const slotId = process.env.NEXT_PUBLIC_ADSENSE_BANNER_SLOT;

  useEffect(() => {
    if (!isDev && clientId && slotId) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch {}
    }
  }, [isDev, clientId, slotId]);

  if (isDev || !clientId || !slotId) {
    return (
      <div className="w-full h-20 bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center">
        <span className="text-xs text-gray-400 font-mono">[ AdSense 광고 - {slot} ]</span>
      </div>
    );
  }

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client={clientId}
      data-ad-slot={slotId}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
