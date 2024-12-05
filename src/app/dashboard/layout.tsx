//import { setAlert } from "@/actions";
import React from "react";

async function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="w-full h-full overflow-x-hidden bg-primary/10 overflow-y-hidden"
      style={{ scrollbarWidth: "none" }}
    >
      {children}
    </div>
  );
}

export default DashboardLayout;
