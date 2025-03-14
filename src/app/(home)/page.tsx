import { Button } from "~/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default function Home() {
  return (
    <>
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter text-white md:text-4xl lg:text-5xl">
              your files. my files. any files really. (￣^￣)ゞ
            </h1>
            <p className="mx-auto max-w-[700px] text-lg text-zinc-400 md:text-xl lg:text-2xl">
              file storing has never been so hard... and yet here we are.
            </p>
          </div>
          <form
            action={async () => {
              "use server";

              const session = await auth();

              if (!session.userId) {
                return redirect("/sign-in");
              }

              return redirect("/drive");
            }}
          >
            <div className="space-x-4">
              <Button
                type="submit"
                className="bg-white px-5 py-5 text-lg text-black hover:bg-zinc-200"
              >
                get filing ( ಠ_ಠ)
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
