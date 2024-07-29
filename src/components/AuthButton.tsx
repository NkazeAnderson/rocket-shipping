"use client";
import React, { useState } from "react";
import { BsPersonCheck } from "react-icons/bs";
import LogOutButtonWrapper from "./LogOutButtonWrapper";
import Link from "next/link";
import Button from "./ui/Button";
import { FaShareSquare } from "react-icons/fa";
import { logOut } from "@/actions";
import { account } from "@/utils/appwrite";
import { useRouter } from "next/navigation";
import { FaRightFromBracket, FaRightToBracket } from "react-icons/fa6";

function AuthButton({
  loggedIn,
  userEmail,
}: {
  loggedIn: boolean;
  userEmail?: string;
}) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  return (
    <>
      {loggedIn ? (
        <div className="md:flex md:space-x-8 space-y-8 md:space-y-0 items-center text-primary">
          <div className="flex space-x-8 items-center">
            <BsPersonCheck size={25} />
            <p className=" italic font-semibold text-[20px] text-primary">
              {userEmail && userEmail}
            </p>
          </div>
          <LogOutButtonWrapper>
            <div
              onClick={async () => {
                setPending(true);
                try {
                  await logOut();
                  await account.deleteSessions();
                  router.replace("/auth/login");
                } catch (error) {}

                setPending(false);
              }}
            >
              <Button
                props={{ text: "Logout", icon: FaRightFromBracket, pending }}
              />
            </div>
          </LogOutButtonWrapper>
        </div>
      ) : (
        <Link href={"/auth/login"}>
          <Button props={{ text: "Login", icon: FaRightToBracket }} />
        </Link>
      )}
    </>
  );
}

export default AuthButton;
