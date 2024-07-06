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
  setValue,
  options,
}: {
  label: string;
  placeholder: string;
  type: string;
  name?: string;
  min?: number;
  max?: number;
  required?: boolean;
  value?: string | number | readonly string[];
  setValue?: React.Dispatch<React.SetStateAction<string | number>>;
  options?: string[];
}) {
  return (
    <div className="w-full">
      <label htmlFor={label}>
        <p className="font-bold pb-8">{label}</p>
      </label>
      {options ? (
        <select id={name} name={name} className=" w-full p-8">
          {options.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      ) : value ? (
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
          onChange={(e) => {
            setValue && setValue(e.currentTarget.value);
          }}
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
      {}
    </div>
  );
}

export default Input;
