"use client";
import { logOut } from "@/actions";
import { account } from "@/utils/appwrite";
import { useRouter } from "next/navigation";
import React from "react";

function LogOutButtonWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <div
      onClick={async () => {
        await logOut();
        await account.deleteSessions();
        router.replace("/auth/login");
      }}
    >
      {children}
    </div>
  );
}

export default LogOutButtonWrapper;
