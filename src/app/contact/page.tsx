import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "문의하기",
  description: "로또 랩 서비스 관련 문의사항이 있으시면 이메일로 연락해 주세요.",
  alternates: {
    canonical: "https://lotto-lab-sand.vercel.app/contact",
  },
};

export default function ContactPage() {
  return (
    <main className="flex-1 max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-[#94aaff] mb-8 drop-shadow-md">
        문의하기
      </h1>

      <div className="glass-panel p-8 rounded-3xl border border-white/10 space-y-8">
        <section>
          <h2 className="text-xl font-bold text-white mb-4">📬 연락처</h2>
          <p className="text-[#dee5ff]/80 leading-relaxed mb-4">
            서비스 이용 중 불편한 점, 오류 신고, 개인정보 관련 문의 등이 있으시면
            아래 이메일로 연락해 주세요. 빠른 시일 내에 답변드리겠습니다.
          </p>
          <div className="glass-panel rounded-2xl p-5 border border-[#94aaff]/20">
            <p className="text-xs text-[#a3aac4] font-mono mb-1">이메일</p>
            <p className="text-[#94aaff] font-bold text-lg">studioplab@gmail.com</p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4">📋 문의 유형</h2>
          <ul className="space-y-3 text-[#dee5ff]/70 text-sm">
            <li className="flex items-start gap-3">
              <span className="text-[#94aaff] font-bold mt-0.5">•</span>
              <span><strong className="text-white">서비스 오류/버그</strong> — 번호 생성, 공유 기능 등 동작 오류</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#94aaff] font-bold mt-0.5">•</span>
              <span><strong className="text-white">개인정보 관련</strong> — 개인정보처리방침 관련 문의 및 삭제 요청</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#94aaff] font-bold mt-0.5">•</span>
              <span><strong className="text-white">기타 문의</strong> — 서비스 개선 제안, 제휴 문의 등</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4">⏰ 답변 안내</h2>
          <p className="text-[#dee5ff]/70 text-sm leading-relaxed">
            문의 접수 후 영업일 기준 2~3일 이내에 답변드립니다.
            주말·공휴일에 접수된 문의는 다음 영업일에 처리됩니다.
          </p>
        </section>

        <div className="border-t border-white/10 pt-6">
          <p className="text-xs text-[#a3aac4] text-center">
            광고 관련 문의는 Google AdSense 정책에 따라 처리됩니다.
          </p>
        </div>
      </div>
    </main>
  );
}
