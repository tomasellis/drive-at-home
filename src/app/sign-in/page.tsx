import Link from "next/link";
import { FolderOpen } from "lucide-react";

import { SignInButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-black to-zinc-900">
      <header className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold text-white"
        >
          <span className="flex">
            (ノ°□°)ノ︵ <div className="mx-1"></div>
            <FolderOpen className="h-6 w-6" />
            <div className="mx-2"></div>
            Drive @ Home
          </span>
        </Link>
      </header>
      <main className="flex flex-1 items-center">
        <SignInButton forceRedirectUrl={"/drive"} />
      </main>
      <footer className="w-full border-t border-zinc-800 py-6 md:py-8">
        <div className="container flex-col items-center justify-center gap-4 px-4 md:flex-row md:gap-8 md:px-6">
          <p className="text-center text-sm text-zinc-500">
            2025 Drive at Home Inc. ᕦ(ò_óˇ)ᕤ{" "}
          </p>
          <p className="text-center text-sm text-zinc-500">
            Not made with love, made with sweat and tears
          </p>
        </div>
      </footer>
    </div>
  );
}
