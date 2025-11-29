"use client";

import React from "react";
import "../global.css";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      {/* Top Header */}
      <div className="fixed top-0 left-0 right-0 bg-white border-b p-4 z-10">
        <h1 className="text-xl font-bold">PayTM Dashboard</h1>
      </div>

      {/* Sidebar */}
      <div className="w-64 border-r h-screen p-6 bg-gray-50 pt-20 fixed left-0 top-0">
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
  );
}
