import Image from "next/image";
import React from "react";
import Button from "../ui/Button";

function Hero() {
  return (
    <div className="h-[700px] w-full relative">
      <Image src={"/hero1.png"} fill alt="hero image" />
      <div className="w-full h-full pt-[100px] flex px-[20%]">
        <div>
          <h1>Heroe</h1>
          <p>blababs</p>
          <Button props={{ text: "Login" }} />
        </div>
      </div>
    </div>
  );
}

export default Hero;
