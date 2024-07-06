import React from "react";

function Badge({ count }: { count: number }) {
  return (
    <div className="rounded-full bg-danger  flex items-center justify-center w-[24px] h-[24px]">
      <span className=" text-[12px]">{count}</span>
    </div>
  );
}

export default Badge;
