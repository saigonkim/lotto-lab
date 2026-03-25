import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/10 mt-auto bg-[#030614] text-[#a3aac4] relative z-10">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-lg opacity-80">🔬</span>
            <span className="font-bold text-white tracking-wide">로또 랩</span>
          </div>

          <p className="text-xs text-white/50 leading-relaxed max-w-lg mx-auto mb-6 bg-white/5 p-4 rounded-xl border border-white/5">
            본 서비스는 과거 데이터를 기반으로 한 통계적 추천일 뿐, 당첨을 보장하지 않습니다.
            <br />
            로또는 사행성 게임이므로 과도한 몰입을 지양하고 재미로만 즐겨주시기 바랍니다.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-white/40 mb-4">
            <Link href="/about" className="hover:text-[--primary] transition-colors">서비스 소개</Link>
            <span>·</span>
            <Link href="/contact" className="hover:text-[--primary] transition-colors">문의하기</Link>
            <span>·</span>
            <Link href="/privacy" className="hover:text-[--primary] transition-colors">개인정보처리방침</Link>
            <span>·</span>
            <Link href="/terms" className="hover:text-[--primary] transition-colors">이용약관</Link>
          </div>

          <p className="text-xs text-white/30 font-mono">
            © 2026 로또 랩. NO GUARANTEE.
          </p>
        </div>
      </div>
    </footer>
  );
}
