"use client";
import React, { useContext, useEffect, useState } from "react";
import Input from "../ui/Input";
import { useForm } from "react-hook-form";
import Link from "next/link";
import Button from "../ui/Button";
import { FaShareFromSquare } from "react-icons/fa6";
import { logIn } from "@/actions";
import { appContextT, loginFormT } from "@/types/types";
import { account, getMyInfo } from "@/utils/appwrite";
import { useRouter } from "next/navigation";
import { FaPlane, FaPlaneArrival } from "react-icons/fa";
import { getCookie } from "@/utils/frontendCookies";
import toast from "react-hot-toast";
import { AppContext } from "../ContextProviders/AppProvider";

function Loginform() {
  const { register, handleSubmit } = useForm<loginFormT>();
  const [pending, setPending] = useState(false);
  const { setUser, user } = useContext(AppContext) as appContextT;
  const router = useRouter();
  const group: loginFormT = {
    email: "",
    access: "",
  };
  useEffect(() => {
    user && router.push("/dashboard");
  }, []);

  return (
    <form
      className=" py-32 md:py-48 space-y-16"
      onSubmit={handleSubmit(async (data) => {
        if (data.email && data.access) {
          setPending(true);
          try {
            await account.createEmailPasswordSession(data.email, data.access);
            const myInfo = await getMyInfo();
            setUser(myInfo);
            const loggedIn = await logIn(data.email);
            toast.success("Successfully logged in");
            loggedIn === "ok" && router.push("/dashboard");
          } catch (error) {
            toast.error("Failed logging in");
            console.log(error);
          }
          setPending(false);
        }
      })}
    >
      <div
        onClick={() => {
          console.log("Pressed");

          toast.success("Ok");
        }}
      >
        Press
      </div>
      <Input
        name="email"
        register={register}
        placeholder="email"
        label="Email"
        type="email"
        group={group}
      />
      <Input
        name="access"
        register={register}
        placeholder="Access Key"
        label="Access"
        type="text"
        group={group}
      />
      <div>
        <Link
          className="text-right font-bold underline "
          href={"/auth/reset-password"}
        >
          Forgot access key
        </Link>
      </div>
      <div className="flex justify-center">
        <Button props={{ text: "Track", icon: FaPlane, pending }} />
      </div>
      <div className=" pt-24 md:pt-48">
        <h5 className="text-right">
          {"Don't have an account? "}
          <Link className="font-bold underline " href={"/auth/register"}>
            Register a new account
          </Link>
        </h5>
      </div>
    </form>
  );
}

export default Loginform;
