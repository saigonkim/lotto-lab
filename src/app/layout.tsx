import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const SITE_URL = "https://lotto-lab-sand.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "로또 랩 - 데이터 기반 로또 번호 추천",
    template: "%s | 로또 랩",
  },
  description:
    "한국 로또 6/45 역대 당첨 데이터를 통계적으로 분석해 번호를 추천하는 서비스. 베이지안 가중치, 균형 필터, 패턴 매칭 3가지 알고리즘으로 이번 주 로또 번호를 생성합니다.",
  keywords: [
    "로또번호추천",
    "로또번호생성",
    "로또분석",
    "이번주로또번호",
    "로또당첨번호",
    "로또통계",
    "로또패턴",
    "645로또",
    "로또번호조합",
    "데이터기반로또",
  ],
  authors: [{ name: "로또 랩" }],
  creator: "로또 랩",
  publisher: "로또 랩",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
    languages: { "ko-KR": SITE_URL },
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: SITE_URL,
    siteName: "로또 랩",
    title: "로또 랩 - 데이터 기반 로또 번호 추천",
    description:
      "역대 로또 당첨 데이터 통계 분석으로 이번 주 번호를 추천합니다. 3가지 알고리즘(베이지안·필터·패턴)으로 근거 있는 번호 조합 생성.",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "로또 랩 - 데이터 기반 번호 연구소",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "로또 랩 - 데이터 기반 로또 번호 추천",
    description: "역대 당첨 데이터 통계 분석으로 이번 주 로또 번호를 추천합니다.",
    images: [`${SITE_URL}/og-image.png`],
  },
  verification: {
    google: "", // Google Search Console 인증 코드 입력
  },
};

// JSON-LD 구조화 데이터
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "@id": `${SITE_URL}/#webapp`,
      name: "로또 랩",
      url: SITE_URL,
      description:
        "한국 로또 6/45 역대 당첨 데이터를 통계적으로 분석하여 번호를 추천하는 웹 애플리케이션. 베이지안 가중치, 균형 필터, 패턴 매칭 3가지 알고리즘 제공.",
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Web Browser",
      inLanguage: "ko-KR",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "KRW",
      },
      featureList: [
        "베이지안 가중치 기반 번호 추천",
        "통계적 균형 필터 번호 생성",
        "과거 데이터 패턴 매칭 번호 생성",
        "역대 당첨 데이터 통계 분석",
      ],
      screenshot: `${SITE_URL}/og-image.png`,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "로또 랩",
      description: "데이터 기반 로또 번호 연구소",
      inLanguage: "ko-KR",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE_URL}/?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "로또 번호 추천이 실제로 당첨에 도움이 되나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "로또는 수학적으로 완전한 무작위 추첨이므로 어떤 방법으로도 당첨을 보장할 수 없습니다. 로또 랩은 역대 당첨 데이터의 통계적 패턴을 분석해 '데이터 기반 참고 번호'를 생성하며, 재미와 오락 목적으로만 이용하시기 바랍니다.",
          },
        },
        {
          "@type": "Question",
          name: "베이지안, 균형 필터, 패턴 매칭 알고리즘의 차이는 무엇인가요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "베이지안(흐름 추적형)은 과거 출현 빈도를 가중치로 삼아 핫/콜드 번호를 배합합니다. 균형 필터형은 합계 100~175, 홀짝 비율 2:4~4:2 등 역대 1등 조합의 통계적 황금 비율을 만족하는 번호를 생성합니다. 패턴 매칭형은 과거 당첨 번호 사이의 평균 간격 패턴을 분석해 유사한 분포의 번호를 생성합니다.",
          },
        },
        {
          "@type": "Question",
          name: "로또 번호 추천 데이터는 어디서 가져오나요?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "한국 동행복권의 로또 6/45 공식 당첨 데이터를 기반으로 합니다. 1회차(2002년 12월)부터 현재까지의 당첨 번호 통계를 분석합니다.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${geist.variable} h-full antialiased`}>
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1150366709235728"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="flex flex-col min-h-screen relative overflow-x-hidden text-white">
        {/* Google Analytics GA4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-F2XKS7GKB5"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-F2XKS7GKB5');
          `}
        </Script>

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
