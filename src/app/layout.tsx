import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Toast from "@/components/ui/Toast";
import SessionProvider from "@/components/providers/SessionProvider";

export const metadata: Metadata = {
  title: {
    default: "시흥시작은도서관협의회",
    template: "%s | 시흥시작은도서관협의회",
  },
  description: "시흥시 작은도서관들이 모여 만드는 따뜻한 도서관 커뮤니티",
  openGraph: {
    title: "시흥시작은도서관협의회",
    description: "시흥시 작은도서관들이 모여 만드는 따뜻한 도서관 커뮤니티",
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="font-pretendard antialiased min-h-screen flex flex-col">
        <SessionProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toast />
        </SessionProvider>
      </body>
    </html>
  );
}
