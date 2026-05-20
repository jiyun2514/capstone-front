import Link from "next/link";

export default function ConsultPage() {
  return (
    <main className="min-h-screen bg-[#FFFDF7] px-6 pt-32">
      <section className="mx-auto max-w-3xl rounded-[2rem] border border-[#F1E8DA] bg-white p-8 text-center shadow-sm">
        <p className="mb-3 text-sm font-bold text-[#FF9F1C]">
          STEP 4. ADOPTION CONSULT
        </p>

        <h1 className="mb-4 text-4xl font-black text-[#2D2A26]">
          입양 상담 연결 준비 중이에요 💛
        </h1>

        <p className="mb-8 leading-8 text-[#6B655D]">
          실제 서비스에서는 보호소 위치, 입양 절차, 특이사항을 확인하고
          상담 챗봇 또는 보호소 문의로 연결됩니다.
        </p>

        <div className="mb-8 rounded-3xl bg-[#FFFCF7] p-6 text-left">
          <p className="mb-2 font-black text-[#2D2A26]">예상 제공 정보</p>
          <ul className="space-y-2 text-[#6B655D]">
            <li>• 보호소 위치 및 연락처</li>
            <li>• 입양 가능 여부</li>
            <li>• 입양 절차 안내</li>
            <li>• 유기견 특이사항 Q&A</li>
          </ul>
        </div>

        <Link
          href="/result"
          className="inline-block rounded-full bg-[#2D2A26] px-8 py-4 font-bold text-white"
        >
          결과로 돌아가기
        </Link>
      </section>
    </main>
  );
}
