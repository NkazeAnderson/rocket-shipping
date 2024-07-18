import Loginform from "@/components/auth/Loginform";

import LoginSideAnimation from "@/components/ui/LoginSideAnimation";

import React from "react";

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
        <Loginform />
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
