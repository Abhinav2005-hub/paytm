"use client";

import React from "react";
import { Appbar } from "@repo/ui/Appbar";
import { useSession, signIn, signOut } from "next-auth/react";
import "../global.css";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();

  return (
    <div>
      {/* TOP APPBAR WITH LOGOUT BUTTON */}
      <Appbar
        user={session?.user ?? null}
        onSignin={() => signIn("credentials")}
        onSignout={() => signOut()}
      />

      {/* Main layout */}
      <div className="flex">

        {/* Sidebar */}
        <div className="w-64 border-r h-screen p-6 bg-gray-50 pt-20 fixed left-0 top-12">
          <h2 className="text-xl font-bold mb-4">Menu</h2>

          <div className="flex flex-col gap-3">
            <a href="/dashboard/transfer" className="hover:text-blue-500">
              Transfer
            </a>

            <a href="/dashboard/transactions" className="hover:text-blue-500">
              Transactions
            </a>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 pt-20 ml-64 p-6">{children}</div>
      </div>
    </div>
  );
}
