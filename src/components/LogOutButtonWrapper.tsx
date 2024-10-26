"use client";
import { logOut } from "@/actions";
import { account } from "@/utils/appwrite";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

function LogOutButtonWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <div
      onClick={async () => {
        await logOut();
        try {
          await account.deleteSessions();
          toast.success("You are now logged out");
        } catch (error) {}
        router.replace("/auth/login");
      }}
    >
      {children}
    </div>
  );
}

export default LogOutButtonWrapper;
