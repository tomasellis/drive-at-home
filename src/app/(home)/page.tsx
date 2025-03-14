import Link from "next/link";
import { FolderOpen } from "lucide-react";

import { Button } from "~/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

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
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl lg:text-6xl">
                  your files. my files. any files really. (￣^￣)ゞ
                </h1>
                <p className="mx-auto max-w-[700px] py-5 text-zinc-400 md:text-xl">
                  file storing has never been so hard... and yet here we are.
                </p>
              </div>
              <div className="space-x-4">
                <form
                  action={async () => {
                    "use server";

                    const session = await auth();

                    if (!session.userId) {
                      return redirect("sign-in");
                    }

                    return redirect("/drive");
                  }}
                >
                  <Button
                    size="lg"
                    type="submit"
                    className="bg-white text-lg text-black hover:bg-zinc-200"
                  >
                    get filing ( ಠ_ಠ)
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
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
