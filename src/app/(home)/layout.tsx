import Link from "next/link";
import { FolderOpen } from "lucide-react";

export default function HomePage(props: { children: React.ReactNode }) {
  console.log("layout");
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-black to-zinc-900">
      <header className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold text-white"
        >
          <span className="flex">
            (╯°□°）╯︵
            <div className="mx-1"></div>
            <FolderOpen className="h-6 w-6" />
            <div className="mx-2"></div>
            Drive @ Home Inc.
          </span>
        </Link>
      </header>
      <main className="flex flex-1 items-center justify-center">
        {props.children}
      </main>
      <footer className="w-full border-t border-zinc-800 py-6 md:py-8">
        <div className="container flex-col items-center justify-center gap-4 px-4 md:flex-row md:gap-8 md:px-6">
          <p className="text-center text-sm text-zinc-500">
            © {new Date().getFullYear()} Drive at Home Inc. ᕦ(ò_óˇ)ᕤ
          </p>
          <p className="text-center text-sm text-zinc-500">
            not made with ❤️, made with blood, sweat and tears
          </p>
        </div>
      </footer>
    </div>
  );
}
