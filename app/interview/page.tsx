"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type Message = {
  role: "ai" | "user";
  text: string;
};

const interviewFlow = [
  {
    ai: "안녕하세요! 저는 입양 매칭을 도와주는 AI 인터뷰어예요. 이전에 반려견을 키워본 경험이 있나요?",
    options: ["네, 키워봤어요", "현재도 키우고 있어요", "아니요, 처음이에요"],
  },
  {
    ai: "좋아요. 원하는 반려견 성격은 어떤 편인가요?",
    options: ["차분한 아이", "활발한 아이", "사람을 좋아하는 아이"],
  },
  {
    ai: "산책은 얼마나 자주 가능한가요?",
    options: ["매일 가능해요", "주 3~4회 가능해요", "주말 위주 가능해요"],
  },
  {
    ai: "입양 시 가장 중요하게 생각하는 요소는 무엇인가요?",
    options: ["성격과 생활 패턴", "외모와 첫인상", "건강 상태"],
  },
  {
    ai : "현재 거주 환경은 어떤 편인가요?",
    options: ["아파트에 살고 있어요", "빌라/주택에 살고 있어요", "마당이 있는 집에 살고 있어요"],
  },
  {
    ai : "반려견이 혼자 있어야 하는 시간은 하루 평균 얼마나 되나요?",
    options: ["1~3시간", "4~6시간", "7시간 이상"],
  }
];

export default function InterviewPage() {
  const router = useRouter();

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      text: interviewFlow[0].ai,
    },
  ]);

  const [step, setStep] = useState(0);
  const [input, setInput] = useState("");
  const [isFinished, setIsFinished] = useState(false);

  const chatEndRef = useRef<HTMLDivElement | null>(null);
  

  //useEffect(() => {
  //  localStorage.removeItem("interviewAnswers");
  //}, []);

  //useEffect(() => {
  //  chatEndRef.current?.scrollIntoView({
  //    behavior: "smooth",
  //  });
  //}, [messages]);//

  const currentOptions = interviewFlow[step]?.options || [];

  const handleSend = (text: string) => {
    const trimmedText = text.trim();

    // 공백 입력 방지
    if (!trimmedText) return;

    // 최소 3글자 미만 검사
    if (trimmedText.length < 3) {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "질문에 대한 답변을 조금 더 자세하게 입력해주세요 😊",
        },
      ]);

      return;
    }

    // 특수문자만 입력한 경우
    const specialOnly = /^[^a-zA-Z0-9가-힣]+$/;

    // 알파벳만 입력한 경우
    const englishOnly = /^[a-zA-Z]+$/;

    // 숫자만 입력한 경우
    const numberOnly = /^[0-9]+$/;

    if (
      specialOnly.test(trimmedText) ||
      englishOnly.test(trimmedText) ||
      numberOnly.test(trimmedText)
    ) {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "질문에 대한 답변을 입력해주세요 😊",
        },
      ]);

      return;
    }

    const updatedMessages: Message[] = [
      ...messages,
      {
        role: "user",
        text: trimmedText,
      },
    ];

    const savedAnswers = JSON.parse(
      localStorage.getItem("interviewAnswers") || "[]"
    );

    localStorage.setItem(
      "interviewAnswers",
      JSON.stringify([...savedAnswers, trimmedText])
    );

    setMessages(updatedMessages);
    setInput("");

    const nextStep = step + 1;

    if (nextStep >= interviewFlow.length) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: "ai",
            text: "좋아요! 인터뷰 분석이 완료되었어요 🐶 이제 사진을 업로드해서 매칭을 진행해볼까요?",
          },
        ]);

        setIsFinished(true);
      }, 600);

      return;
    }

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: interviewFlow[nextStep].ai,
        },
      ]);

      setStep(nextStep);
    }, 600);
  };

  return (
    <main className="min-h-screen bg-[#FFFDF7] px-6 pt-28 pb-20">
      <section className="mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-bold text-[#FF9F1C]">
            STEP 1. LLM INTERVIEW
          </p>

          <h1 className="mb-4 text-5xl font-black text-[#2D2A26]">
            AI와 입양 인터뷰를 진행해요 💬
          </h1>

          <p className="text-lg text-[#6B655D]">
            생활 패턴, 반려 선호, 입양 조건을 대화로 파악해요.
          </p>
        </div>

        <div className="rounded-[2.5rem] border border-[#F1E8DA] bg-white p-5 shadow-sm">
          <div className="h-[500px] overflow-y-auto rounded-[2rem] bg-[#FFFCF8] p-5">
            <div className="space-y-5">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[75%] rounded-[2rem] px-5 py-4 text-sm leading-7 shadow-sm ${
                      message.role === "user"
                        ? "bg-[#2D2A26] text-white"
                        : "bg-[#FFE8C2] text-[#4D3A1A]"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}

              <div ref={chatEndRef} />
            </div>
          </div>

          {!isFinished && (
            <div className="mt-5">
              <div className="mb-4 flex flex-wrap gap-3">
                {currentOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleSend(option)}
                    className="rounded-full border border-[#E5DED3] bg-white px-4 py-2 text-sm font-semibold text-[#5C5A57] transition hover:border-[#FFB84D] hover:bg-[#FFF3DD]"
                  >
                    {option}
                  </button>
                ))}
              </div>

              <div className="flex gap-3">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="직접 입력해보세요..."
                  className="flex-1 rounded-2xl border border-[#E5DED3] bg-white px-5 py-4 text-sm font-semibold text-[#2D2A26] placeholder:text-[#B8ADA0] outline-none focus:border-[#FFB84D]"
                />

                <button
                  onClick={() => handleSend(input)}
                  className="rounded-2xl bg-[#2D2A26] px-6 py-4 text-sm font-bold text-white transition hover:bg-black"
                >
                  전송
                </button>
              </div>
            </div>
          )}

          <button
            disabled={!isFinished}
            onClick={() => router.push("/upload")}
            className={`mt-5 w-full rounded-2xl py-5 text-lg font-bold transition ${
              isFinished
                ? "bg-[#2D2A26] text-white hover:bg-black"
                : "cursor-not-allowed bg-gray-200 text-gray-400"
            }`}
          >
            인터뷰 완료하고 사진 업로드하기
          </button>
        </div>
      </section>
    </main>
  );
}