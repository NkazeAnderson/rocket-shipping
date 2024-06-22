import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Image from "next/image";
import React from "react";
import { FaUser } from "react-icons/fa";
import { FaShareFromSquare } from "react-icons/fa6";

function Login() {
  return (
    <div className="w-full lg:flex items-start text-white p-32">
      <div className="lg:w-[50%] space-x-24">
        <h1 className="font-bold">Register a new Account</h1>
        <p>
          Access and manage all your shipments in a single location. Stay
          connected with your courier via live tracking, messaging and calls.
          Check history, progress and status of your shipments
        </p>
        <form className=" py-32 md:py-48 space-y-16" action="">
          <Input placeholder="john doe" label="Name" type="text" />
          <Input placeholder="email" label="Email" type="email" />
          <Input placeholder="key" label="Access" type="text" />
          <Button props={{ text: "Register", icon: FaUser }} />
        </form>
      </div>
      <div className="w-[50%] hidden  h-full lg:flex items-center justify-center">
        <div className="w-[450px] h-[450px] relative">
          <Image fill src="/authImgLogin.png" alt="AuthImage" />
        </div>
      </div>
    </div>
  );
}

export default Login;
