import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import LoginSideAnimation from "@/components/ui/LoginSideAnimation";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaUser } from "react-icons/fa";
import { FaShareFromSquare } from "react-icons/fa6";

function Login() {
  return (
    <div className="w-full lg:flex items-start text-white p-32">
      <div className="lg:w-[50%] space-x-24">
        <h1 className="font-bold">Register a new Account</h1>
        <p>
          Create an account in just a few steps and gain unlimited access to all
          our services.
        </p>
        <form className=" py-32 md:py-48 space-y-16" action="">
          <Input placeholder="john doe" label="Name" type="text" />
          <Input placeholder="email" label="Email" type="email" />
          <Input placeholder="key" label="Access" type="text" />
          <Button props={{ text: "Register", icon: FaUser }} />
          <h5 className="text-right">
            {"Already have an account? "}
            <Link className="font-bold underline " href={"/auth/login"}>
              Login
            </Link>
          </h5>
        </form>
      </div>
      <div className="w-[50%] hidden  h-full lg:flex items-center justify-center   relative bottom-[15svh]">
        <div className="">
          {/* <Image fill src="/authImgLogin.png" alt="AuthImage" /> */}
          <LoginSideAnimation />
        </div>
      </div>
    </div>
  );
}

export default Login;
