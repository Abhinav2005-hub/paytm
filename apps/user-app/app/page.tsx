"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Appbar } from "@repo/ui/Appbar";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const { data: session } = useSession();
  const router = useRouter();

  // Redirect user to dashboard after login
  useEffect(() => {
    if (session?.user) {
      router.push("/dashboard");
    }
  }, [session, router]);

  return (
    <div>
      <Appbar
        user={session?.user ?? null}
        onSignin={() => signIn("credentials")}
        onSignout={() => signOut()}
      />
    </div>
  );
}
