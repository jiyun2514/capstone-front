import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FFFDF7] px-6">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center">
        <div className="mb-6 rounded-full bg-[#FFE8C2] px-5 py-2 text-sm font-semibold text-[#7A4E00]">
          AI 유기견 매칭 서비스
        </div>

        <h1 className="mb-5 text-center text-6xl font-black leading-tight text-[#2D2A26]">
          견생연분
        </h1>

        <p className="mb-12 max-w-2xl text-center text-lg leading-8 text-[#5C5A57]">
          AI 인터뷰와 얼굴 분위기 분석을 기반으로
          사용자와 잘 어울리는 유기견을 추천하고,
          입양 상담까지 연결해드립니다.
        </p>

        <div className="mb-14 grid w-full max-w-4xl grid-cols-1 gap-5 md:grid-cols-4">

          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="mb-4 text-4xl">💬</div>
            <h3 className="mb-2 text-lg font-bold text-[#2D2A26]">
              인터뷰
            </h3>
            <p className="text-sm leading-6 text-gray-500">
              AI와 대화를 통해 사용자 성향을 분석해요
            </p>
          </div>

          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="mb-4 text-4xl">📸</div>
            <h3 className="mb-2 text-lg font-bold text-[#2D2A26]">
              사진 업로드
            </h3>
            <p className="text-sm leading-6 text-gray-500">
              사용자 사진을 업로드해요
            </p>
          </div>

          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="mb-4 text-4xl">🔍</div>
            <h3 className="mb-2 text-lg font-bold text-[#2D2A26]">
              AI 유사도 분석
            </h3>
            <p className="text-sm leading-6 text-gray-500">
              얼굴 특징과 분위기를 분석해요
            </p>
          </div>

          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="mb-4 text-4xl">💛</div>
            <h3 className="mb-2 text-lg font-bold text-[#2D2A26]">
              입양 연결
            </h3>
            <p className="text-sm leading-6 text-gray-500">
              보호소 및 유기견 정보를 제공해요
            </p>
          </div>
        </div>

        <Link
          href="/interview"
          className="rounded-full bg-[#2D2A26] px-10 py-4 text-lg font-bold text-white transition hover:scale-105 hover:bg-black"
        >
          매칭 시작하기
        </Link>  
      </section>
    </main>
  );
}