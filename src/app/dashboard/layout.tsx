import React from "react";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="w-full h-full overflow-x-hidden bg-primary/10 overflow-y-hidden pt-[78px]  md:pt-[90px]"
      style={{ scrollbarWidth: "none" }}
    >
      {children}
    </div>
  );
}

export default DashboardLayout;
