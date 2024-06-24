import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import LoginSideAnimation from "@/components/ui/LoginSideAnimation";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaShareFromSquare } from "react-icons/fa6";

function Login() {
  return (
    <div className="w-full lg:flex items-start text-white p-32">
      <div className="lg:w-[50%] space-x-24">
        <h1 className="font-bold">Log Into Your Account</h1>
        <p>
          Access and manage all your shipments in a single location. Stay
          connected with your courier via live tracking, messaging and calls.
          Check history, progress and status of your shipments
        </p>
        <form className=" py-32 md:py-48 space-y-16" action="">
          <Input placeholder="email" label="Email" type="email" />
          <Input placeholder="Access Key" label="Access" type="text" />
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
      </div>
      <div className="w-[50%] hidden  h-full lg:flex items-center justify-center  relative bottom-[15svh]">
        <div className="">
          {/* <Image fill src="/authImgLogin.png" alt="AuthImage" /> */}
          <LoginSideAnimation />
        </div>
      </div>
    </div>
  );
}

export default Login;
