"use client";
import React from "react";
import Input from "../ui/Input";
import Link from "next/link";
import Button from "../ui/Button";
import { useForm } from "react-hook-form";
import { FaLock } from "react-icons/fa";

function ResetPassword() {
  const group = { email: "" };
  const { register } = useForm();
  return (
    <form className=" py-32 md:py-48 space-y-16" action="">
      <Input
        register={register}
        name="email"
        placeholder="email"
        label="Email"
        type="email"
        group={group}
      />
      <p className="text-right">
        <Link className="font-bold  text-primary" href={"/auth/login"}>
          Return to login
        </Link>
      </p>
      <Button props={{ text: "Get Access Key", icon: FaLock }} />
    </form>
  );
}

export default ResetPassword;
