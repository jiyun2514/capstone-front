"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Message = {
  role: "ai" | "user";
  text: string;
};

const questions = [
  {
    question:
      "안녕하세요! 저는 입양 매칭을 도와주는 AI 인터뷰어예요. 평소 집에 있는 시간이 많은 편인가요, 아니면 외출이 잦은 편인가요?",
    suggestions: [
      "집에 있는 시간이 많아요",
      "외출이 잦은 편이에요",
      "규칙적인 생활을 해요",
    ],
  },
  {
    question: "좋아요. 원하는 반려견 성격은 어떤 편인가요?",
    suggestions: ["차분한 아이", "활발한 아이", "사람을 잘 따르는 아이"],
  },
  {
    question: "산책은 얼마나 자주 가능한가요?",
    suggestions: ["매일 가능해요", "주 3~4회 가능해요", "주말 위주 가능해요"],
  },
  {
    question: "입양할 때 가장 중요하게 생각하는 조건은 무엇인가요?",
    suggestions: ["성격과 생활 패턴", "외모와 첫인상", "건강 상태와 관리 난이도"],
  },
];

export default function InterviewPage() {
  const router = useRouter();

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      text: questions[0].question,
    },
  ]);

  const [input, setInput] = useState("");
  const [step, setStep] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    localStorage.removeItem("interviewAnswers");
  }, []);

  const handleSend = (customInput?: string) => {
    const messageText = customInput || input;

    if (!messageText.trim() || isFinished) return;

    const userMessage: Message = {
      role: "user",
      text: messageText,
    };

    const savedAnswers = JSON.parse(
      localStorage.getItem("interviewAnswers") || "[]"
    );

    localStorage.setItem(
      "interviewAnswers",
      JSON.stringify([...savedAnswers, messageText])
    );

    const updatedMessages: Message[] = [...messages, userMessage];

    if (step < questions.length - 1) {
      updatedMessages.push({
        role: "ai",
        text: questions[step + 1].question,
      });

      setStep(step + 1);
    } else {
      updatedMessages.push({
        role: "ai",
        text:
          "답변 감사합니다! 인터뷰 내용을 기반으로 사용자 성향 프로필 생성을 완료했어요. 이제 얼굴 분위기 분석을 위해 사진을 업로드해주세요.",
      });

      setIsFinished(true);
    }

    setMessages(updatedMessages);
    setInput("");
  };

  return (
    <main className="min-h-screen bg-[#FFFDF7] px-6 pt-28">
      <section className="mx-auto flex max-w-4xl flex-col">
        <div className="mb-8 text-center">
          <p className="mb-3 text-sm font-bold text-[#FF9F1C]">
            STEP 1. LLM INTERVIEW
          </p>

          <h1 className="mb-3 text-4xl font-black text-[#2D2A26]">
            AI와 입양 인터뷰를 진행해요 💬
          </h1>

          <p className="text-[#6B655D]">
            생활 패턴, 반려 선호, 입양 조건을 대화로 파악해요.
          </p>
        </div>

        <div className="rounded-[2rem] border border-[#F1E8DA] bg-white p-5 shadow-sm">
          <div className="mb-5 h-[520px] space-y-4 overflow-y-auto rounded-3xl bg-[#FFFCF7] p-5">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[75%] rounded-3xl px-5 py-4 text-sm leading-7 ${
                    message.role === "user"
                      ? "bg-[#2D2A26] text-white"
                      : "bg-[#FFE8C2] text-[#4A3B2A]"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          {!isFinished && (
            <div className="mb-4 flex flex-wrap gap-3">
              {questions[step].suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => handleSend(suggestion)}
                  className="rounded-full border border-[#E5DED3] bg-white px-4 py-2 text-sm font-semibold text-[#5C5A57] transition hover:border-[#FFB84D] hover:bg-[#FFF3DD]"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          <div className="flex gap-3">
            <input
              value={input}
              disabled={isFinished}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSend();
              }}
              placeholder={
                isFinished
                  ? "인터뷰가 완료되었어요."
                  : "직접 답변을 입력할 수도 있어요."
              }
              className="flex-1 rounded-2xl border border-[#E5DED3] bg-white px-5 py-4 text-sm outline-none focus:border-[#FFB84D] disabled:bg-gray-100"
            />

            <button
              onClick={() => handleSend()}
              disabled={isFinished}
              className="rounded-2xl bg-[#2D2A26] px-6 font-bold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              전송
            </button>
          </div>

          <button
            onClick={() => {
              if (!isFinished) {
                alert("인터뷰를 먼저 완료해주세요!");
                return;
              }

              router.push("/upload");
            }}
            className={`mt-4 w-full rounded-2xl py-4 font-bold transition ${
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