"use client";

import React from "react";
import { Appbar } from "@repo/ui/Appbar";
import { useSession, signIn, signOut } from "next-auth/react";
import "../global.css";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen">
      {/* TOP APPBAR (Fixed) */}
      <div className="fixed top-0 left-0 right-0 z-20">
        <Appbar
          user={session?.user ?? null}
          onSignin={() => signIn("credentials")}
          onSignout={() => signOut()}
        />
      </div>

      {/* MAIN */}
      <div className="flex pt-[70px]"> 
        {/* 70px = Appbar height */}

        {/* SIDEBAR */}
        <div className="w-60 fixed left-0 top-[70px] h-screen border-r bg-gray-50 p-6">
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

        {/* PAGE CONTENT */}
        <div className="ml-60 w-full p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
