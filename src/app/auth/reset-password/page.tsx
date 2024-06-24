import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaLock } from "react-icons/fa";

function Login() {
  return (
    <div className="w-full lg:flex items-start text-white p-32">
      <div className="lg:w-[50%] space-x-24">
        <h1 className="font-bold">Lost My Access Key?</h1>
        <p>
          Easily recovery your access key by submitting your email and have your
          access key sent your email address securely.
        </p>
        <form className=" py-32 md:py-48 space-y-16" action="">
          <Input placeholder="email" label="Email" type="email" />
          <p className="text-right">
            <Link className="font-bold  text-primary" href={"/auth/login"}>
              Return to login
            </Link>
          </p>
          <Button props={{ text: "Get Access Key", icon: FaLock }} />
        </form>
      </div>
      <div className="w-[50%] hidden  h-full lg:flex items-center justify-center">
        <div className="w-[450px] h-[450px] relative">
          <Image fill src="/authImgReset.png" alt="AuthImage" />
        </div>
      </div>
    </div>
  );
}

export default Login;
