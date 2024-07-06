import { navLinkT } from "@/types/types";
import Link from "next/link";
import React from "react";
import { FaHome } from "react-icons/fa";

function NavLink({ props }: { props: navLinkT }) {
  const Icon = props.icon;
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
