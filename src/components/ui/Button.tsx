import { button } from "@/types/types";
import React from "react";
import { FaSpinner } from "react-icons/fa6";

function Button({ props }: { props: button }) {
  const Icon = props.icon;
  return (
    <button
      className="py-[20px] px-[40px] border border-primary rounded-15 flex space-x-16 bg-primary items-center text-white hover:bg-success"
      disabled={props.disabled || props.pending}
    >
      {props.pending && <FaSpinner className=" animate-spin" />}
      <p className="font-bold">{props.text}</p>
      {Icon && <Icon size={25} />}
    </button>
  );
}

export default Button;
