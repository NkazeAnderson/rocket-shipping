import React from "react";

function Input({
  label,
  placeholder,
  type,
  name,
  min,
  max,
  required,
  value,
}: {
  label: string;
  placeholder: string;
  type: string;
  name?: string;
  min?: number;
  max?: number;
  required?: boolean;
  value?: string | number | readonly string[];
}) {
  return (
    <div className="w-full">
      <label htmlFor={label}>
        <p className="font-bold pb-8">{label}</p>
      </label>
      <input
        className="w-full p-8 caret-success rounded-15 text-black"
        type={type}
        name={name}
        id={label}
        placeholder={placeholder}
        min={min}
        max={max}
        required={required}
        value={value}
      />
      {value ? (
        <input
          className="w-full p-8 caret-success rounded-15 text-black"
          type={type}
          name={name}
          id={label}
          placeholder={placeholder}
          min={min}
          max={max}
          required={required}
          value={value}
        />
      ) : (
        <input
          className="w-full p-8 caret-success rounded-15 text-black"
          type={type}
          name={name}
          id={label}
          placeholder={placeholder}
          min={min}
          max={max}
          required={required}
        />
      )}
    </div>
  );
}

export default Input;
