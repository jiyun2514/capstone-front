"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UploadPage() {
  const [preview, setPreview] = useState<string | null>(null);

  const router = useRouter();

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);
  };

  return (
    <main className="min-h-screen bg-[#FFFDF7] px-6 pt-32">
      <section className="mx-auto max-w-2xl">
        <div className="mb-10 text-center">
          <h1 className="mb-3 text-4xl font-black text-[#2D2A26]">
            사진 업로드 📸
          </h1>

          <p className="text-[#6B655D]">
            얼굴 사진을 업로드하면
            닮은 유기견을 분석해드려요.
          </p>
        </div>

        <div className="rounded-[2rem] bg-white p-8 shadow-sm">
          <label
            htmlFor="image"
            className="flex h-80 cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-[#E5DED3] bg-[#FFFCF7] transition hover:border-[#FFB84D]"
          >
            {preview ? (
              <img
                src={preview}
                alt="preview"
                className="h-full w-full rounded-3xl object-cover"
              />
            ) : (
              <>
                <p className="mb-3 text-5xl">📷</p>

                <p className="font-semibold text-[#5C5A57]">
                  이미지를 업로드해주세요
                </p>

                <p className="mt-2 text-sm text-gray-400">
                  JPG, PNG 파일 지원
                </p>
              </>
            )}
          </label>

          <input
            id="image"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />

<button
  onClick={() => {
    if (!preview) {
      alert("이미지를 먼저 업로드해주세요!");
      return;
    }

    localStorage.setItem("userImage", preview);

    router.push("/loading");
  }}
  className={`mt-8 w-full rounded-2xl py-4 text-lg font-bold text-white transition ${
    preview
      ? "bg-[#2D2A26] hover:bg-black"
      : "cursor-not-allowed bg-gray-300"
  }`}
>
  분석 시작하기
</button>
        </div>
      </section>
    </main>
  );
}