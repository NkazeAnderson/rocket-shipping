import { button } from "@/types/types";
import React from "react";

function Button({ props }: { props: button }) {
  const Icon = props.icon;
  return (
    <button className="py-[20px] px-[40px] border border-primary rounded-15 flex space-x-16 bg-primary items-center text-white hover:bg-success">
      <p className="font-bold">{props.text}</p>
      {Icon && <Icon size={25} />}
    </button>
  );
}

export default Button;
