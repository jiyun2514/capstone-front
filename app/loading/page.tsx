"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const loadingSteps = [
  "인터뷰 응답을 분석하고 있어요...",
  "사용자 라이프스타일 프로파일 생성 중...",
  "얼굴 분위기 임베딩 생성 중...",
  "유기견 데이터베이스와 매칭 중...",
  "AI 추천 서사를 생성하고 있어요...",
];

export default function LoadingPage() {
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < loadingSteps.length - 1) {
          return prev + 1;
        }

        return prev;
      });
    }, 1300);

    const timeout = setTimeout(() => {
      router.push("/result");
    }, 7000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [router]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FFFDF7] px-6">
      <section className="w-full max-w-2xl rounded-[2.5rem] border border-[#F1E8DA] bg-white p-10 shadow-sm">
        <div className="mb-8 text-center">
          <div className="mb-5 text-6xl">🐶</div>

          <p className="mb-3 text-sm font-bold text-[#FF9F1C]">
            AI MATCHING SYSTEM
          </p>

          <h1 className="text-4xl font-black text-[#2D2A26]">
            당신과 잘 어울리는 아이를 찾고 있어요
          </h1>
        </div>

        <div className="mb-8 flex justify-center">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-[#FFE8C2] border-t-[#FFB84D]" />
        </div>

        <div className="space-y-3">
          {loadingSteps.map((step, index) => {
            const active = index === currentStep;
            const completed = index < currentStep;

            return (
              <div
                key={step}
                className={`flex items-center gap-4 rounded-2xl px-5 py-4 transition ${
                  active
                    ? "bg-[#FFF3DD]"
                    : completed
                    ? "bg-[#F7F5F1]"
                    : "bg-[#FCFBF8]"
                }`}
              >
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-black ${
                    completed
                      ? "bg-[#2D2A26] text-white"
                      : active
                      ? "bg-[#FFB84D] text-white"
                      : "bg-[#EAE4DA] text-[#8B8378]"
                  }`}
                >
                  {completed ? "✓" : index + 1}
                </div>

                <p
                  className={`font-semibold ${
                    active
                      ? "text-[#2D2A26]"
                      : completed
                      ? "text-[#5C5A57]"
                      : "text-[#9C958B]"
                  }`}
                >
                  {step}
                </p>
              </div>
            );
          })}
        </div>

        <p className="mt-8 text-center text-sm leading-6 text-[#8B8378]">
          LLM 인터뷰와 CV 기반 유사도 분석을 통해
          사용자와 가장 잘 어울리는 유기견을 추천하고 있습니다.
        </p>
      </section>
    </main>
  );
}