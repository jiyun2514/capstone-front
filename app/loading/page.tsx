"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoadingPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/result");
    }, 2500);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#FFFDF7] px-6">
      <div className="mb-8 h-20 w-20 animate-spin rounded-full border-4 border-[#FFE8C2] border-t-[#FFB84D]" />

      <h1 className="mb-3 text-3xl font-black text-[#2D2A26]">
        AI가 분석 중이에요 🐶
      </h1>

      <p className="text-center leading-7 text-[#6B655D]">
        얼굴 유사도와 인터뷰 응답을 기반으로
        가장 잘 어울리는 유기견을 찾고 있어요.
      </p>
    </main>
  );
}