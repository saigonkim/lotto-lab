import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "서비스 소개",
  description:
    "로또 랩은 한국 로또 6/45 역대 당첨 데이터를 통계적으로 분석하여 번호를 추천하는 서비스입니다. 베이지안, 균형 필터, 패턴 매칭 3가지 알고리즘을 제공합니다.",
  alternates: {
    canonical: "https://lotto-lab-sand.vercel.app/about",
  },
};

export default function AboutPage() {
  return (
    <main className="flex-1 max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-[#94aaff] mb-8 drop-shadow-md">
        로또 랩 소개
      </h1>

      <div className="space-y-6">
        {/* 서비스 소개 */}
        <section className="glass-panel p-8 rounded-3xl border border-white/10">
          <h2 className="text-xl font-bold text-white mb-4">🔬 로또 랩이란?</h2>
          <p className="text-[#dee5ff]/80 leading-relaxed mb-4">
            로또 랩(Lotto Lab)은 한국 로또 6/45의 역대 당첨 데이터를 통계적으로 분석하여
            번호를 추천하는 데이터 기반 서비스입니다. 단순한 무작위 생성이 아닌,
            <strong className="text-[#94aaff]"> 3가지 고유 알고리즘</strong>을 통해
            통계적 근거가 담긴 번호 조합을 제공합니다.
          </p>
          <p className="text-[#dee5ff]/60 text-sm leading-relaxed">
            ⚠️ 로또는 수학적으로 완전한 무작위 추첨입니다. 본 서비스는 재미와 오락 목적의
            통계 분석 도구이며, 당첨을 보장하지 않습니다.
          </p>
        </section>

        {/* 3가지 알고리즘 */}
        <section className="glass-panel p-8 rounded-3xl border border-white/10">
          <h2 className="text-xl font-bold text-white mb-6">⚙️ 3가지 분석 알고리즘</h2>
          <div className="space-y-5">
            <div className="border-l-2 border-blue-400 pl-4">
              <h3 className="font-bold text-white mb-1">📈 흐름 추적형 (베이지안)</h3>
              <p className="text-[#dee5ff]/70 text-sm leading-relaxed">
                역대 당첨 데이터에서 각 번호(1~45)의 출현 빈도를 집계하고,
                최근 트렌드에 추가 가중치를 부여한 뒤 가중치 기반 비복원 추출로 번호를 선택합니다.
                자주 나온 '핫 번호'와 오래 나오지 않은 '콜드 번호'를 적절히 배합합니다.
              </p>
            </div>
            <div className="border-l-2 border-emerald-400 pl-4">
              <h3 className="font-bold text-white mb-1">⚖️ 균형 필터형 (통계 필터)</h3>
              <p className="text-[#dee5ff]/70 text-sm leading-relaxed">
                역대 1등 당첨 조합의 통계를 분석한 결과, 대부분의 당첨 조합은
                합계 100~175, 홀짝 비율 2:4~4:2, 3개 이상 연속 번호 없음의 조건을 만족합니다.
                이 조건들을 동시에 통과하는 번호 조합만 최종 추천합니다.
              </p>
            </div>
            <div className="border-l-2 border-violet-400 pl-4">
              <h3 className="font-bold text-white mb-1">🔮 패턴 매칭형 (간격 분석)</h3>
              <p className="text-[#dee5ff]/70 text-sm leading-relaxed">
                과거 당첨 번호 6개를 정렬했을 때 번호 사이의 간격(diff)을 분석합니다.
                평균 간격 패턴을 계산한 후, 유사한 간격 분포를 가진 번호 조합을 생성합니다.
                특정 구간에 번호가 몰리지 않고 고루 분산된 조합을 추천합니다.
              </p>
            </div>
          </div>
        </section>

        {/* 데이터 출처 */}
        <section className="glass-panel p-8 rounded-3xl border border-white/10">
          <h2 className="text-xl font-bold text-white mb-4">📊 데이터 출처</h2>
          <p className="text-[#dee5ff]/80 leading-relaxed">
            로또 6/45 공식 당첨 번호 데이터(1회차, 2002년 12월~현재)를 기반으로 합니다.
            데이터는 동행복권 공개 정보를 참조하며, 통계 분석 목적으로만 활용됩니다.
          </p>
        </section>

        {/* FAQ */}
        <section className="glass-panel p-8 rounded-3xl border border-white/10">
          <h2 className="text-xl font-bold text-white mb-6">❓ 자주 묻는 질문</h2>
          <div className="space-y-5">
            <div>
              <h3 className="font-semibold text-[#94aaff] mb-2">
                Q. 이 번호를 사면 정말 당첨될 확률이 높아지나요?
              </h3>
              <p className="text-[#dee5ff]/70 text-sm leading-relaxed">
                A. 아니오. 로또는 매 회차 독립적인 완전 무작위 추첨입니다. 과거 데이터가 미래 결과에
                영향을 주지 않습니다. 본 서비스의 번호는 통계적 참고 자료이며 재미 목적으로만
                이용하시기 바랍니다.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-[#94aaff] mb-2">
                Q. 매번 다른 번호가 나오는 이유는 무엇인가요?
              </h3>
              <p className="text-[#dee5ff]/70 text-sm leading-relaxed">
                A. 알고리즘의 최종 단계에서 확률적 샘플링을 사용하기 때문입니다. 동일한 엔진을
                선택해도 매번 다양한 번호 조합이 생성됩니다.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-[#94aaff] mb-2">
                Q. 어떤 알고리즘을 선택하는 게 좋을까요?
              </h3>
              <p className="text-[#dee5ff]/70 text-sm leading-relaxed">
                A. 세 알고리즘 모두 수학적으로 유효한 통계 방법론이며, 어느 하나가
                다른 것보다 당첨 확률이 높다고 볼 수 없습니다. 각 방법론의 철학이 마음에 드는
                것을 선택하시면 됩니다.
              </p>
            </div>
          </div>
        </section>

        <div className="text-center pt-4">
          <Link
            href="/"
            className="inline-block px-8 py-3 neon-btn rounded-full font-bold text-sm"
          >
            🔬 번호 분석하러 가기
          </Link>
        </div>
      </div>
    </main>
  );
}
