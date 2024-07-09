"use client";
import React from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

function Input({
  label,
  placeholder,
  type,
  name,
  min,
  max,
  required,
  options,
  register,
  defaultValue,
  disabled,
}: {
  label: string;
  placeholder: string;
  type: string;
  name: string;
  min?: number;
  max?: number;
  defaultValue?: string | number | readonly string[] | undefined;
  required?: boolean;
  options?: string[];
  register: UseFormRegister<FieldValues>;
  disabled?: boolean;
}) {
  return (
    <div className="w-full">
      <label htmlFor={label}>
        <p className="font-bold pb-8">
          {label}{" "}
          <span className=" text-danger/40 text-xs">
            {disabled && " - Can't edit"}
          </span>
        </p>
      </label>
      {options ? (
        <select
          id={name}
          {...register(name)}
          className=" w-full p-8"
          disabled={disabled}
        >
          {options.map((item, index) => (
            <option
              key={index}
              value={index}
              selected={index === defaultValue ? true : undefined}
            >
              {item}
            </option>
          ))}
        </select>
      ) : (
        <input
          className="w-full p-8 caret-success rounded-15 text-black"
          type={type}
          id={name}
          placeholder={placeholder}
          min={min}
          max={max}
          defaultValue={defaultValue}
          required={required}
          disabled={disabled}
          {...register(name)}
        />
      )}
    </div>
  );
}

export default Input;
