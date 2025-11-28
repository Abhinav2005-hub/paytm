"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Appbar } from "@repo/ui/appbar";

export default function Page() {
  const { data: session } = useSession();

  return (
    <div>
      <Appbar
        onSignin={() => signIn()}
        onSignout={() => signOut()}
        user={session?.user ?? null}
      />
    </div>
  );
}
