import React from "react";
import { IconType } from "react-icons";
import { FaFileLines } from "react-icons/fa6";

function Pill({
  text,
  icon,
  isprimary,
  outlined,
  danger,
}: {
  icon?: IconType;
  text: string;
  outlined?: boolean;
  isprimary: boolean;
  danger?: boolean;
}) {
  const Icon = icon;
  return (
    <span
      className={`flex py-8 px-16 md:px-24 space-x-8 rounded-45 justify-around items-center  ${
        danger
          ? "bg-danger text-white"
          : !isprimary && !outlined
          ? "bg-success text-white"
          : isprimary && !outlined
          ? "bg-primary text-white"
          : !isprimary && outlined
          ? "border border-success text-success"
          : "border border-primary text-primary"
      } `}
    >
      {Icon && <Icon />}
      <p className=" inline  font-bold text-nowrap">{text}</p>
    </span>
  );
}

export default Pill;
