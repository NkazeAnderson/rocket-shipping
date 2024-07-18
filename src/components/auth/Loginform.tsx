"use client";
import React from "react";
import Input from "../ui/Input";
import { useForm } from "react-hook-form";
import Link from "next/link";
import Button from "../ui/Button";
import { FaShareFromSquare } from "react-icons/fa6";

function Loginform() {
  const { register } = useForm();
  return (
    <form className=" py-32 md:py-48 space-y-16" action="">
      <Input
        name="email"
        register={register}
        placeholder="email"
        label="Email"
        type="email"
      />
      <Input
        name="access"
        register={register}
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
        <Button props={{ text: "Track", icon: FaShareFromSquare }} />
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
