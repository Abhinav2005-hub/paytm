"use client";

import React from "react";

export function Appbar({
  onSignin,
  onSignout,
  user,
}: {
  onSignin: () => void;
  onSignout: () => void;
  user?: any;
}) {
  return (
    <div style={{ padding: "10px", background: "#eee" }}>
      <h2>Appbar</h2>

      {user ? (
        <>
          <p>Hello, {user.name}</p>
          <button onClick={onSignout}>Sign out</button>
        </>
      ) : (
        <button onClick={onSignin}>Sign in</button>
      )}
    </div>
  );
}
