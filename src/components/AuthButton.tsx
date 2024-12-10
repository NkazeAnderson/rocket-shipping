"use client";
import React, { useContext, useState } from "react";
import { BsPersonCheck } from "react-icons/bs";
import LogOutButtonWrapper from "./LogOutButtonWrapper";
import Link from "next/link";
import Button from "./ui/Button";
import { FaRightFromBracket, FaRightToBracket } from "react-icons/fa6";
import { AppContext } from "./ContextProviders/AppProvider";
import { appContextT } from "@/types/types";

function AuthButton() {
  const [pending, setPending] = useState(false);
  const {userMethods: {user, deAuthenticateUser} } = useContext(AppContext) as appContextT
  return (
    <>
      {user ? (
        <div className="md:flex md:space-x-8 space-y-8 md:space-y-0 items-center text-primary">
          <div className="flex space-x-8 items-center">
            <BsPersonCheck size={25} />
            <p className=" italic font-semibold text-[14px] text-primary">
              {user.email }
            </p>
          </div>
          <LogOutButtonWrapper>
            <div
              onClick={async () => {
                setPending(true);
                try {
                  await deAuthenticateUser()
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
