"use client";
import React, { useCallback, useContext, useEffect, useState } from "react";
import Input from "../ui/Input";
import { FormProvider, useForm } from "react-hook-form";
import Link from "next/link";
import Button from "../ui/Button";
import { appContextT, loginFormT } from "@/types/types";
import { useRouter } from "next/navigation";
import { FaPlane } from "react-icons/fa";
import toast from "react-hot-toast";
import { AppContext } from "../ContextProviders/AppProvider";

function Loginform() {
  const methods = useForm<loginFormT>();
  const [pending, setPending] = useState(false);
  const {
    userMethods: { user, authenticateUser, isAuthenticated },
  } = useContext(AppContext) as appContextT;
  const router = useRouter();

  const sumbit = useCallback(
    async (data: { email: string; access: string }) => {
      if (data.email && data.access) {
        setPending(true);
        try {
          await authenticateUser(data.email, data.access);
          toast.success("Successfully logged in");
        } catch (error) {
          toast.error("Failed logging in");
          console.log(error);
        }
        setPending(false);
      }
    },
    []
  );

  useEffect(() => {
    isAuthenticated && !user && toast.success("Loading user info");
    user && router.push("/dashboard");
  }, [user, isAuthenticated]);

  return (
    <FormProvider {...methods}>
      <form
        className=" py-32 md:py-48 space-y-16"
        onSubmit={methods.handleSubmit(sumbit)}
      >
        <Input name="email" placeholder="email" label="Email" type="email" />
        <Input
          name="access"
          placeholder="Tracking Number"
          label="Tracking Number"
          type="text"
        />
        <div>
          <Link
            className="text-right font-bold underline hidden"
            href={"/auth/reset-password"}
          >
            Forgot access key
          </Link>
        </div>
        <div className="flex justify-center">
          <Button props={{ text: "Track", icon: FaPlane, pending }} />
        </div>
      </form>
    </FormProvider>
  );
}

export default Loginform;
