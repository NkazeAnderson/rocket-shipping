"use client";
import React, { useContext, useEffect, useState } from "react";
import Input from "../ui/Input";
import { FormProvider, useForm } from "react-hook-form";
import Link from "next/link";
import Button from "../ui/Button";
import { appContextT, loginFormT } from "@/types/types";
import { getMyInfo, logIn } from "@/utils/appwrite";
import { useRouter } from "next/navigation";
import { FaPlane } from "react-icons/fa";
import toast from "react-hot-toast";
import { AppContext } from "../ContextProviders/AppProvider";
import useUser from "../../../hooks/useUser";

function Loginform() {
  const methods = useForm<loginFormT>();
  const [pending, setPending] = useState(false);
 const {user, authenticateUser, isAuthenticated}= useUser()
  const router = useRouter();

  useEffect(() => {
    isAuthenticated && !user && toast.success("Loading user info")
 user && router.push("/dashboard");
  }, [user, isAuthenticated]);

  return (
    <FormProvider {...methods}>
      <form
        className=" py-32 md:py-48 space-y-16"
        onSubmit={methods.handleSubmit(async (data) => {
          if (data.email && data.access) {
            setPending(true);
            try {
              await authenticateUser(data.email, data.access)
              toast.success("Successfully logged in");
            } catch (error) {     
              toast.error("Failed logging in");
              console.log(error);
            }
            setPending(false);
          }
        })}
      >
       
        <Input name="email" placeholder="email" label="Email" type="email" />
        <Input
          name="access"
          placeholder="Access Key"
          label="Access"
          type="text"
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
    </FormProvider>
  );
}

export default Loginform;
