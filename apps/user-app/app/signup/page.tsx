"use client";

import { useState } from "react";

export default function SignupPage() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignup() {
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, password }),
    });

    const data = await res.json();
    alert(data.message);
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl mb-4">Signup</h1>

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
        className="bg-green-600 text-white px-4 py-2 rounded"
        onClick={handleSignup}
      >
        Signup
      </button>
    </div>
  );
}
