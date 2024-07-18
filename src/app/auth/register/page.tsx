import SignupForm from "@/components/auth/SignupForm";

import LoginSideAnimation from "@/components/ui/LoginSideAnimation";

import React from "react";

function Register() {
  return (
    <div className="w-full lg:flex items-start text-white p-32">
      <div className="lg:w-[50%] space-x-24">
        <h1 className="font-bold">Register a new Account</h1>
        <p>
          Create an account in just a few steps and gain unlimited access to all
          our services.
        </p>
        <SignupForm />
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

export default Register;
