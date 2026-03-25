"use client";

import { useState, useCallback, useRef } from "react";
import type { EngineType, GenerateResult, AppStep } from "@/types";
import StepEngineSelect from "@/components/steps/StepEngineSelect";
import StepLoading from "@/components/steps/StepLoading";
import StepResult from "@/components/steps/StepResult";
import AdInterstitial from "@/components/ads/AdInterstitial";

const MIN_AD_DURATION = 3000; // 전면 광고 최소 노출 시간 (ms)

export default function Home() {
  const [step, setStep] = useState<AppStep>("select");
  const [selectedEngine, setSelectedEngine] = useState<EngineType | null>(null);
  const [result, setResult] = useState<GenerateResult | null>(null);
  const [showAd, setShowAd] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const apiResultRef = useRef<GenerateResult | null>(null);

  const handleStart = useCallback(async () => {
    if (!selectedEngine) return;

    setError(null);
    setShowAd(true);
    apiResultRef.current = null;

    // API 호출과 광고 노출을 동시에 시작
    const adTimer = new Promise<void>((resolve) =>
      setTimeout(resolve, MIN_AD_DURATION)
    );

    const apiFetch = fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ engine: selectedEngine }),
    })
      .then((res) => res.json())
      .then((data: GenerateResult) => {
        apiResultRef.current = data;
      })
      .catch(() => {
        setError("분석 중 오류가 발생했습니다. 다시 시도해 주세요.");
      });

    // 광고 타이머와 API 응답 중 늦은 것을 기다림
    await Promise.all([adTimer, apiFetch]);
  }, [selectedEngine]);

  const handleAdClose = useCallback(() => {
    setShowAd(false);

    if (error) {
      setStep("select");
      return;
    }

    if (apiResultRef.current) {
      setResult(apiResultRef.current);
      setStep("result");
    } else {
      setStep("loading");
      const poll = setInterval(() => {
        if (apiResultRef.current) {
          clearInterval(poll);
          setResult(apiResultRef.current);
          setStep("result");
        } else if (error) {
          clearInterval(poll);
          setStep("select");
        }
      }, 200);
    }
  }, [error]);

  const handleReset = () => {
    setStep("select");
    setSelectedEngine(null);
    setResult(null);
    setError(null);
  };

  const handleRetry = useCallback(() => {
    if (selectedEngine) {
      setResult(null);
      handleStart();
    }
  }, [selectedEngine, handleStart]);

  return (
    <main className="flex-1 flex flex-col items-center justify-center py-10 relative z-10 w-full px-4 sm:px-0">
      {showAd && (
        <AdInterstitial onClose={handleAdClose} duration={MIN_AD_DURATION} />
      )}

      {error && (
        <div className="w-full max-w-md mx-auto mb-6">
          <div className="glass-panel border-red-500/30 rounded-xl p-4 text-sm text-red-500 text-center">
            {error}
          </div>
        </div>
      )}

      {step === "select" && (
        <div className="w-full max-w-4xl mx-auto glass-panel p-8 sm:p-12 rounded-[2rem] shadow-2xl relative overflow-hidden backdrop-blur-xl">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[--primary] to-transparent opacity-50" />
          <div className="text-center mb-10 px-4">
            <h1 className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-[#94aaff] mb-4 neon-text tracking-wide">
              로또 번호 분석기
            </h1>
            <p className="text-[#a3aac4] text-lg max-w-md mx-auto">
              데이터 기반 로또 번호 추천 서비스<br/>
              원하는 분석 알고리즘을 선택해주세요.
            </p>
          </div>
          <StepEngineSelect
            selected={selectedEngine}
            onSelect={setSelectedEngine}
            onStart={handleStart}
          />
        </div>
      )}

      {step === "loading" && selectedEngine && (
        <StepLoading engine={selectedEngine} />
      )}

      {step === "result" && result && (
        <StepResult result={result} onReset={handleReset} onRetry={handleRetry} />
      )}
    </main>
  );
}
