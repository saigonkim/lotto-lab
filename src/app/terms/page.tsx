import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "이용약관 - 로또 랩",
};

export default function TermsPage() {
  return (
    <main className="flex-1 max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-[#94aaff] mb-8 drop-shadow-md">
        이용약관
      </h1>

      <div className="glass-panel p-8 rounded-3xl space-y-8 backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.5)]">
        <section>
          <h2 className="text-xl font-bold text-white mb-3 tracking-wide">제1조 (목적)</h2>
          <p className="text-[#dee5ff]/80 font-medium leading-relaxed">
            본 약관은 로또 랩(이하 "서비스")의 이용조건 및 절차에 관한 사항을 규정함을 목적으로 합니다.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3 tracking-wide">제2조 (서비스 성격)</h2>
          <p className="text-[#dee5ff]/80 font-medium leading-relaxed">
            본 서비스는 과거 로또 당첨 데이터를 기반으로 한 통계적 번호 추천 서비스입니다.
            제공되는 번호는 수학적 통계에 기반한 참고 자료이며, <strong className="text-[--primary] font-bold">당첨을 보장하지 않습니다.</strong>
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3 tracking-wide">제3조 (책임 한계)</h2>
          <p className="text-[#dee5ff]/80 font-medium leading-relaxed">
            서비스는 번호 추천 결과로 인한 어떠한 손실이나 손해에 대해서도 책임을 지지 않습니다.
            로또는 사행성 게임으로, 과도한 구매는 재정적 손실을 초래할 수 있습니다.
            재미와 오락 목적으로만 이용하시기 바랍니다.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3 tracking-wide">제4조 (서비스 변경 및 중단)</h2>
          <p className="text-[#dee5ff]/80 font-medium leading-relaxed">
            서비스 운영자는 사전 고지 없이 서비스 내용을 변경하거나 중단할 수 있습니다.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3 tracking-wide">제5조 (데이터 출처)</h2>
          <p className="text-[#dee5ff]/80 font-medium leading-relaxed mb-4">
            로또 당첨 번호 데이터는 공개된 정보를 기반으로 하며, 서비스의 분석 결과는
            과거 데이터의 통계적 패턴을 나타낼 뿐 미래 당첨을 예측하지 않습니다.
          </p>
          <div className="pt-4 border-t border-white/10">
            <p className="text-xs text-[#a3aac4] font-mono">시행일: 2026년 3월 25일</p>
          </div>
        </section>
      </div>
    </main>
  );
}
