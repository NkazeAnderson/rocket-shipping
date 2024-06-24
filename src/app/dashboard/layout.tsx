import React from "react";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="w-full h-full overflow-x-hidden overflow-y-scroll pt-[78px]  md:pt-[90px]"
      style={{ scrollbarWidth: "none" }}
    >
      {children}
    </div>
  );
}

export default DashboardLayout;
