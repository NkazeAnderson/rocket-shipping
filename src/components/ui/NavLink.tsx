import { navLinkT } from "@/types/types";
import Link from "next/link";
import React from "react";
import { FaEdit, FaHome } from "react-icons/fa";
import { GiCargoShip } from "react-icons/gi";
import { MdEmail } from "react-icons/md";

function NavLink({ props }: { props: navLinkT }) {
  const Icon =
    props.icon === "FaHome"
      ? FaHome
      : props.icon === "FaEdit"
      ? FaEdit
      : props.icon === "GiCargoShip"
      ? GiCargoShip
      : MdEmail;
  return (
    <Link href={props.path} replace={props.text.toLowerCase() === "dashboard"}>
      <div className="flex space-x-8  text-success hover:text-primary items-center py-16 lg:py-0">
        <Icon size={25} data-testid="icon" />
        <p className="font-bold" data-test-id="nav">
          {props.text}
        </p>
      </div>
    </Link>
  );
}

export default NavLink;
