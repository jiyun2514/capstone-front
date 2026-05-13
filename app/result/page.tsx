"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const bestMatch = {
  name: "초코",
  age: "2살",
  gender: "여아",
  breed: "믹스견",
  image:
    "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=900&q=80",
  visualScore: 86,
  personalityScore: 91,
  totalScore: 89,
  shelter: "서초구 유기견 보호소",
  reason:
    "초코는 차분하고 사람을 잘 따르는 성향을 가진 아이예요. 사진 분석 결과 둥근 눈매와 부드러운 인상이 비슷하게 나타났고, 인터뷰 응답 기준으로도 실내 생활과 가벼운 산책을 선호하는 점이 잘 맞아요.",
  tags: ["차분함", "사람을 좋아함", "실내 생활 적합", "산책 좋아함"],
};

export default function ResultPage() {
  const [userImage, setUserImage] = useState<string | null>(null);
  const [interviewAnswers, setInterviewAnswers] = useState<string[]>([]);

  useEffect(() => {
    const savedImage = localStorage.getItem("userImage");
    const savedAnswers = localStorage.getItem("interviewAnswers");

    if (savedImage) {
      setUserImage(savedImage);
    }

    if (savedAnswers) {
      setInterviewAnswers(JSON.parse(savedAnswers));
    }
  }, []);

  return (
    <main className="min-h-screen bg-[#FFFDF7] px-6 pt-32">
      <section className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-bold text-[#FF9F1C]">
            STEP 3. MATCHING RESULT
          </p>

          <h1 className="mb-3 text-4xl font-black text-[#2D2A26]">
            운명의 유기견을 찾았어요 🐶
          </h1>

          <p className="text-[#6B655D]">
            사진 유사도와 인터뷰 응답을 함께 반영한 추천 결과예요.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_1fr_1.05fr]">
          <article className="overflow-hidden rounded-[2rem] border border-[#F1E8DA] bg-white shadow-sm">
            <div className="h-96 overflow-hidden bg-[#F8EFE3]">
              {userImage ? (
                <img
                  src={userImage}
                  alt="user"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-6xl">
                  📷
                </div>
              )}
            </div>

            <div className="p-7">
              <p className="mb-2 text-sm font-bold text-[#FF9F1C]">
                USER PROFILE
              </p>

              <h2 className="text-3xl font-black text-[#2D2A26]">
                사용자 사진
              </h2>

              <p className="mt-3 leading-7 text-[#6B655D]">
                업로드된 사용자 이미지를 기반으로 얼굴 분위기와 인상을
                분석했어요.
              </p>

              <div className="mt-7">
                <h3 className="mb-3 text-lg font-black text-[#2D2A26]">
                  인터뷰 기반 사용자 성향
                </h3>

                {interviewAnswers.length > 0 ? (
                  <div className="space-y-2">
                    {interviewAnswers.map((answer, index) => (
                      <div
                        key={index}
                        className="rounded-2xl bg-[#FFFCF7] px-4 py-3 text-sm leading-6 text-[#5C5A57]"
                      >
                        Q{index + 1}. {answer}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-[#6B655D]">
                    아직 저장된 인터뷰 답변이 없어요.
                  </p>
                )}
              </div>
            </div>
          </article>

          <article className="overflow-hidden rounded-[2rem] border border-[#F1E8DA] bg-white shadow-sm">
            <div className="h-96 overflow-hidden bg-[#F8EFE3]">
              <img
                src={bestMatch.image}
                alt={bestMatch.name}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="p-7">
              <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                  <p className="mb-2 text-sm font-bold text-[#FF9F1C]">
                    BEST MATCH
                  </p>

                  <h2 className="text-3xl font-black text-[#2D2A26]">
                    {bestMatch.name}
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    {bestMatch.breed} · {bestMatch.age} · {bestMatch.gender}
                  </p>
                </div>

                <div className="shrink-0 rounded-2xl bg-[#FFF3DD] px-5 py-4 text-center">
                  <p className="text-xs font-bold text-[#A56700]">종합</p>
                  <p className="text-2xl font-black text-[#FF9F1C]">
                    {bestMatch.totalScore}%
                  </p>
                </div>
              </div>

              <p className="text-sm text-gray-500">
                보호소: {bestMatch.shelter}
              </p>

              <div className="mt-7">
                <h3 className="mb-3 text-lg font-black text-[#2D2A26]">
                  초코의 키워드
                </h3>

                <div className="flex flex-wrap gap-2">
                  {bestMatch.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-[#FFE8C2] px-3 py-2 text-xs font-bold text-[#7A4E00]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </article>

          <section className="space-y-6">
            <article className="rounded-[2rem] border border-[#F1E8DA] bg-white p-7 shadow-sm">
              <h3 className="mb-5 text-2xl font-black text-[#2D2A26]">
                매칭 분석 결과
              </h3>

              <div className="space-y-5">
                <ScoreBar label="외모 유사도" score={bestMatch.visualScore} />
                <ScoreBar
                  label="성향 매칭"
                  score={bestMatch.personalityScore}
                />
                <ScoreBar label="종합 매칭" score={bestMatch.totalScore} />
              </div>
            </article>

            <article className="rounded-[2rem] border border-[#F1E8DA] bg-white p-7 shadow-sm">
              <h3 className="mb-4 text-2xl font-black text-[#2D2A26]">
                AI 추천 이유
              </h3>

              <p className="leading-8 text-[#5C5A57]">{bestMatch.reason}</p>
            </article>

            <div className="grid gap-3 md:grid-cols-2">
              <Link
                href="/consult"
                className="rounded-2xl bg-[#2D2A26] py-4 text-center font-bold text-white transition hover:bg-black"
              >
                입양 상담 연결하기
              </Link>

              <button className="rounded-2xl border border-[#E5DED3] bg-white py-4 font-bold text-[#5C5A57] transition hover:border-[#FFB84D]">
                SNS 공유하기
              </button>
            </div>
          </section>
        </div>

        <div className="mt-12 flex justify-center gap-4">
          <Link
            href="/upload"
            className="rounded-full border border-[#E5DED3] bg-white px-6 py-3 font-bold text-[#5C5A57]"
          >
            다시 업로드하기
          </Link>

          <Link
            href="/"
            className="rounded-full bg-[#2D2A26] px-6 py-3 font-bold text-white"
          >
            홈으로
          </Link>
        </div>
      </section>
    </main>
  );
}

function ScoreBar({ label, score }: { label: string; score: number }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <p className="font-bold text-[#5C5A57]">{label}</p>
        <p className="font-black text-[#FF9F1C]">{score}%</p>
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-[#F1E8DA]">
        <div
          className="h-full rounded-full bg-[#FFB84D]"
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}