"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  FieldValues,
  Path,
  PathValue,
  useFormContext,
  UseFormRegister,
} from "react-hook-form";
import { AppContext } from "../ContextProviders/AppProvider";
import { appContextT } from "@/types/types";
import { Suggestion } from "use-places-autocomplete";

function Input<T extends FieldValues, U extends {$id:string} & Record<string, any>>({
  label,
  placeholder,
  type,
  name,
  min,
  max,
  required,
  options,
  defaultValue,
  disabled,
  location,
  optionsDisplayKeys
}: {
  label: string;
  placeholder: string;
  type: string;
  name: Path<T>;
  min?: number;
  max?: number;
  defaultValue?: string | number | readonly string[] | undefined;
  required?: boolean;
  location?: boolean;
  options?: string[] | U[];
  optionsDisplayKeys?: (keyof U)[]
  disabled?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const { placeApi } = useContext(AppContext) as appContextT;
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = placeApi;
  const methods = useFormContext<T>();
  const queryText = methods.watch(name);
  const currentValue = methods.getValues()[name]
  
  options && options.forEach(value => 
    {
     
  }
  )
 
  useEffect(() => {
    ready && focused && location && setValue(queryText);
  }, [ready, queryText]);

  const handleSelect =
    ({ description }: Suggestion) =>
    () => {
      // When the user selects a place, we can replace the keyword without request data from API
      // by setting the second parameter to "false" { lat: 5.9929375, lng: 10.1846875 }
      setValue(description, false);
      console.log(description);

      methods.setValue(name, description as PathValue<T, Path<T>>);
      setFocused(false);
      setValue("", false);

      clearSuggestions();

      // Get latitude and longitude via utility functions
      // getGeocode({ address: description }).then((results) => {
      //   const { lat, lng } = getLatLng(results[0]);
      //   console.log("📍 Coordinates: ", { lat, lng });
      // });
    };
  return (
    <div className="w-full" >
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
          {...methods.register(name)}
          className=" w-full p-8"
          defaultValue={defaultValue}
          disabled={disabled}
        >
          {options.map((item, index) => {
             let optionText = ""
             const isSelect = typeof item === "string" && currentValue == item ? true : typeof item !== "string" && currentValue == item.$id
             const optionValue = typeof item === "string" ? item : item.$id
             
             if (typeof item === "string"){
               optionText= item
               
              }
              else{
               if (optionsDisplayKeys) {
                 for(let key of optionsDisplayKeys) {
                  optionText = optionText ?  `${optionText} - ${item[key]}`: item[key]
                 }
               }
             }

            
            return(
            <option
              key={index}
              value={optionValue}
              selected={isSelect }
            >
              {optionText}
            </option>
          )})}
        </select>
      ) : (
        <>
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
            {...methods.register(name)}
            onFocus={() => {
              setFocused(true);
            }}
          />
          {ready && focused && location && data && (
            <div>
              <p>Select A place</p>
              <ul>
                {status === "OK" &&
                  data.map((suggestion) => (
                    <li
                      key={suggestion.place_id}
                      onClick={handleSelect(suggestion)}
                    >
                      <strong>
                        {suggestion.structured_formatting.main_text + " "}
                      </strong>
                      <small>
                        {suggestion.structured_formatting.secondary_text}
                      </small>
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Input;
