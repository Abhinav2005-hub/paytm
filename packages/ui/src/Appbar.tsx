"use client";

import { Button } from "./button";

interface AppbarProps {
  user: any | null;
  onSignin: () => void;
  onSignout: () => void;
}

export const Appbar = ({ user, onSignin, onSignout }: AppbarProps) => {
  return (
    <div className="flex justify-between border-b px-4 py-2">
      <div className="text-lg flex flex-col justify-center">
        PayTM
      </div>

      <div className="flex flex-col justify-center px-6 py-2 bg-black text-white rounded">
        <Button onClick={user ? onSignout : onSignin}>
          {user ? "Logout" : "Login"}
        </Button>
      </div>
    </div>
  );
};
