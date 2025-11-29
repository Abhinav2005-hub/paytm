"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Appbar } from "@repo/ui/appbar";

export default function Page() {
  const { data: session } = useSession();

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
