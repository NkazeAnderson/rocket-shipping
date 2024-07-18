"use client";
import React from "react";
import { useForm } from "react-hook-form";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Link from "next/link";
import { FaUser } from "react-icons/fa";

function SignupForm() {
  const { register } = useForm();
  return (
    <form className=" py-32 md:py-48 space-y-16" action="">
      <Input
        name="name"
        register={register}
        placeholder="john doe"
        label="Name"
        type="text"
      />
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
        placeholder="key"
        label="Access"
        type="text"
      />
      <Button props={{ text: "Register", icon: FaUser }} />
      <h5 className="text-right">
        {"Already have an account? "}
        <Link className="font-bold underline " href={"/auth/login"}>
          Login
        </Link>
      </h5>
    </form>
  );
}

export default SignupForm;
