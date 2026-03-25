import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "개인정보처리방침 - 로또 랩",
};

export default function PrivacyPage() {
  return (
    <main className="flex-1 max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-[#94aaff] mb-8 drop-shadow-md">
        개인정보처리방침
      </h1>

      <div className="glass-panel p-8 rounded-3xl space-y-8 backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.5)]">
        <section>
          <h2 className="text-xl font-bold text-white mb-3 tracking-wide">1. 수집하는 개인정보</h2>
          <p className="text-[#dee5ff]/80 font-medium leading-relaxed">
            로또 랩(이하 "서비스")은 회원가입 없이 이용 가능하며, 별도의 개인정보를 수집하지 않습니다.
            서비스 이용 시 광고 제공을 위해 구글 애드센스가 쿠키를 사용할 수 있습니다.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3 tracking-wide">2. 광고 및 쿠키</h2>
          <p className="text-[#dee5ff]/80 font-medium leading-relaxed">
            본 서비스는 구글 애드센스(Google AdSense)를 통해 광고를 게재합니다.
            구글은 사용자의 관심사에 맞는 광고를 제공하기 위해 쿠키를 사용할 수 있습니다.
            구글의 광고 쿠키 사용에 대한 자세한 내용은 구글 개인정보처리방침을 참고하세요.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3 tracking-wide">3. 로그 데이터</h2>
          <p className="text-[#dee5ff]/80 font-medium leading-relaxed">
            서비스 운영을 위해 IP 주소, 브라우저 유형, 방문 시간 등의 로그 데이터가
            서버에 자동으로 기록될 수 있습니다. 이 데이터는 서비스 개선 목적으로만 사용됩니다.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3 tracking-wide">4. 개인정보 보호 책임자</h2>
          <p className="text-[#dee5ff]/80 font-medium leading-relaxed">
            개인정보 관련 문의사항이 있으시면 아래로 연락해 주세요.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3 tracking-wide">5. 변경 사항</h2>
          <p className="text-[#dee5ff]/80 font-medium leading-relaxed mb-4">
            본 개인정보처리방침은 법령 또는 서비스 변경에 따라 수정될 수 있으며,
            변경 시 서비스 내 공지를 통해 안내합니다.
          </p>
          <div className="pt-4 border-t border-white/10">
            <p className="text-xs text-[#a3aac4] font-mono">최종 수정일: 2026년 3월 25일</p>
          </div>
        </section>
      </div>
    </main>
  );
}
