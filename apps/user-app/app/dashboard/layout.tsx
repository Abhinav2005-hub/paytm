"use client";

import React from "react";
import { Appbar } from "@repo/ui/Appbar";
import { useSession, signIn, signOut } from "next-auth/react";
import "../global.css";

// Add p2p 
function P2PTransferIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-5 h-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
      />
    </svg>
  );
}

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

            <a href="/dashboard/p2p" className="hover:text-blue-500 flex items-center gap-2">
              <P2PTransferIcon />
              P2P Transfer
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
