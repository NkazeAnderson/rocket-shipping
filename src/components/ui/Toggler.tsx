"use client";
import React from "react";

function Toggler({
  value,
  values,
  setValue,
}: {
  value: string;
  values: [string, string];
  setValue: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className="mx-auto w-fit p-8 flex justify-between space-x-24 rounded-30 bg-dark-gray">
      <span
        onClick={() => setValue(values[0])}
        className={`p-8 ${
          values[0] === value ? "bg-primary text-white" : "text-primary"
        }   rounded-30 font-bold capitalize hover:cursor-pointer`}
      >
        {values[0]}
      </span>
      <span
        onClick={() => setValue(values[1])}
        className={`p-8 rounded-30 ${
          values[1] === value ? "bg-primary text-white" : "text-primary"
        }  font-bold capitalize hover:cursor-pointer`}
      >
        {values[1]}
      </span>
    </div>
  );
}

export default Toggler;
