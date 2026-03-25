import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "로또 랩 - 데이터 기반 번호 연구소",
  description:
    "한국 로또 과거 당첨 데이터를 통계적으로 분석해 번호를 추천합니다. 흐름 추적형, 균형 필터형, 패턴 매칭형 3가지 엔진 제공.",
  keywords: ["로또", "로또번호", "로또분석", "로또추천", "당첨번호"],
  openGraph: {
    title: "로또 랩 - 데이터 기반 번호 연구소",
    description: "과거 당첨 데이터 분석 기반 로또 번호 추천 서비스",
    type: "website",
    locale: "ko_KR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${geist.variable} h-full antialiased`}>
      <body className="flex flex-col min-h-screen relative overflow-x-hidden text-white">
        {/* Ambient background glow */}
        <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#cb7bff] blur-[150px] opacity-20 pointer-events-none" />
        <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#94aaff] blur-[150px] opacity-20 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col flex-1 w-full min-h-screen">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
