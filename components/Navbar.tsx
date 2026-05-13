import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed left-0 top-0 z-50 w-full border-b border-[#F1E8DA] bg-[#FFFDF7]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-black text-[#2D2A26]">
          견생연분 🐶
        </Link>

        <div className="flex items-center gap-6 text-sm font-semibold text-[#5C5A57]">
          <Link href="/" className="transition hover:text-[#2D2A26]">
            홈
          </Link>
          <Link href="/upload" className="transition hover:text-[#2D2A26]">
            업로드
          </Link>
          <Link href="/result" className="transition hover:text-[#2D2A26]">
            결과
          </Link>
        </div>
      </div>
    </nav>
  );
}