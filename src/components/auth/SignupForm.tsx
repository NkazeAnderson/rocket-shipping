"use client";
import React, { useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { signUp } from "@/actions";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { signUpFormT } from "@/types/types";
import { account, db } from "@/utils/appwrite";
import { AppwriteException, ID, Query } from "appwrite";
import { database, userCollection } from "@/utils/contants";
import toast from "react-hot-toast";

function SignupForm() {
  const methods = useForm<signUpFormT>();
  const router = useRouter();
  const [response, signUpActionState] = useFormState(signUp, null);
  const [pending, setPending] = useState(false);
  // useEffect(() => {
  //   if (response === "ok") {
  //     router.push("/auth/login");
  //   }
  // }, [response]);

  const onSubmit: SubmitHandler<signUpFormT> = async (data) => {
    setPending(true);
    if (data.access && data.email && data.name) {
      try {
        const user = await db.listDocuments(database, userCollection, [
          Query.equal("email", data.email.trim()),
        ]);
        if (user.total === 0) {
          const id = ID.unique();
          await db.createDocument(database, userCollection, id, {
            name: data.name,
            email: data.email,
          });
          await account.create(id, data.email, data.access, data.name);
          toast.success("Account created");
        }
        router.push("/auth/login");
      } catch (error) {
        if (
          error instanceof AppwriteException &&
          error.message.includes("email")
        ) {
          router.push("/auth/login");
        }
      }
    }
    setPending(false);
  };

  return (
    <FormProvider {...methods}>
      <form
        className=" py-32 md:py-48 space-y-16"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <Input name="name" placeholder="john doe" label="Name" type="text" />
        <Input name="email" placeholder="email" label="Email" type="email" />
        <Input name="access" placeholder="key" label="Access" type="text" />
        <Button props={{ text: "Register", icon: FaUser, pending }} />
        <h5 className="text-right">
          {"Already have an account? "}
          <Link className="font-bold underline " href={"/auth/login"}>
            Login
          </Link>
        </h5>
      </form>
    </FormProvider>
  );
}

export default SignupForm;
