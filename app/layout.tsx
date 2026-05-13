import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "견생연분",
  description: "나와 닮은 유기견 매칭 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="bg-[#FFFDF7] text-[#2D2A26]">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}