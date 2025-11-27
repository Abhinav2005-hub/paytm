"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Appbar } from "@repo/ui/appbar";

export default function Page() {
  const session = useSession();

  // Define the Signin function
  const Signin = () => {
    signIn();
  };

  // Define the Signout function
  const Signout = () => {
    signOut();
  };

  return (
    <div>
      <Appbar onSignin={Signin} onSignout={Signout} user={session.data?.user} />
    </div>
  );
}