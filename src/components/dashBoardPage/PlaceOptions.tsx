import React, { useContext, useEffect } from "react";
import {
  getGeocode,
  getLatLng,
  HookReturn,
  Suggestion,
} from "use-places-autocomplete";
import { AppContext } from "../ContextProviders/AppProvider";
import { appContextT } from "@/types/types";
import {
  Control,
  FieldValues,
  Path,
  useController,
  useWatch,
} from "react-hook-form";

function PlaceOptions<T extends FieldValues>({
  control,
  active,
  name,
}: {
  name: Path<T>;
  control: Control<T, any>;
  active: boolean;
}) {
  const { placeApi } = useContext(AppContext) as appContextT;
  const { field } = useController({ name, control });
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = placeApi;
  useEffect(() => {
    ready && active && setValue(field.value);
  }, [ready, field.value]);

  const handleSelect =
    ({ description }: Suggestion) =>
    () => {
      // When the user selects a place, we can replace the keyword without request data from API
      // by setting the second parameter to "false" { lat: 5.9929375, lng: 10.1846875 }
      setValue(description, false);
      clearSuggestions();

      // Get latitude and longitude via utility functions
      getGeocode({ address: description }).then((results) => {
        const { lat, lng } = getLatLng(results[0]);
        console.log("📍 Coordinates: ", { lat, lng });
      });
    };
  return (
    <>
      {ready && active && (
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
  );
}

export default PlaceOptions;
