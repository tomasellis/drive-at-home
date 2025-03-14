import { SignInButton } from "@clerk/nextjs";
import { Button } from "~/components/ui/button";

export default function SignInPage() {
  console.log("signignpage");
  return (
    <>
      <div className="flex items-center gap-2">
        <SignInButton>
          <Button
            variant="default"
            size="lg"
            className="text-zinc-400 hover:text-white"
          >
            Sign In
          </Button>
        </SignInButton>
      </div>
    </>
  );
}
