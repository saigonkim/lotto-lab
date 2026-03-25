import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full glass-panel border-b border-white/10 sticky top-0 z-40 shadow-[0_4px_30px_rgba(0,0,0,0.5)] backdrop-blur-xl bg-opacity-30">
      <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl drop-shadow-[0_0_8px_var(--primary)]">🔬</span>
          <div>
            <span className="font-bold text-white text-base tracking-wide">로또 랩</span>
            <span className="text-[--primary] text-xs ml-1.5 hidden sm:inline font-medium">데이터 기반 번호 분석</span>
          </div>
        </Link>
        <nav className="flex items-center gap-4 text-xs text-[#a3aac4] font-medium">
          <Link href="/about" className="hover:text-white transition-colors hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">소개</Link>
          <Link href="/contact" className="hover:text-white transition-colors hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">문의</Link>
          <Link href="/privacy" className="hidden sm:inline hover:text-white transition-colors hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">개인정보처리방침</Link>
          <Link href="/terms" className="hidden sm:inline hover:text-white transition-colors hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">이용약관</Link>
        </nav>
      </div>
    </header>
  );
}
