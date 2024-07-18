import ResetPassword from "@/components/auth/ResetPassword";

import Image from "next/image";

import React from "react";

function Login() {
  return (
    <div className="w-full lg:flex items-start text-white p-32">
      <div className="lg:w-[50%] space-x-24">
        <h1 className="font-bold">Lost My Access Key?</h1>
        <p>
          Easily recovery your access key by submitting your email and have your
          access key sent your email address securely.
        </p>
        <ResetPassword />
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
