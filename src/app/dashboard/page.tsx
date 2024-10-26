import { setAlert } from "@/actions";
import DashBoardWrapper from "@/components/dashBoardPage/DashBoardWrapper";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

function Dashboard() {
  const loggedIn = cookies().get("loggedIn");
  console.log("Logged in", loggedIn);

  if (!loggedIn) {
    redirect("/auth/login");
  }
  return <DashBoardWrapper></DashBoardWrapper>;
}

export default Dashboard;
