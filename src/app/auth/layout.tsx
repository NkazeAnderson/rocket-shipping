import React from "react";

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full bg-success overflow-hidden">
      <div className="pt-[10svh]">{children}</div>
    </div>
  );
}

export default AuthLayout;
