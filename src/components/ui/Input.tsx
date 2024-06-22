import React from "react";

function Input({
  label,
  placeholder,
  type,
}: {
  label: string;
  placeholder: string;
  type: string;
}) {
  return (
    <div className="w-full">
      <label htmlFor={label}>
        <p className="font-bold pb-8">{label}</p>
      </label>
      <input
        className="w-full p-8 caret-success rounded-15 text-black"
        type={type}
        name={label}
        id={label}
        placeholder={placeholder}
      />
    </div>
  );
}

export default Input;
