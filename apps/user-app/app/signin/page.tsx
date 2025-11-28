"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SigninPage() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    await signIn("credentials", {
      phone,
      password,
      redirect: true,
      callbackUrl: "/",
    });
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl mb-4">Login</h1>

      <input
        className="border px-3 py-2 mb-2"
        placeholder="Phone number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <input
        className="border px-3 py-2 mb-2"
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={handleLogin}
      >
        Login
      </button>
    </div>
  );
}
