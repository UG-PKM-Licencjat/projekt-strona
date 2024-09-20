import React, { useRef, useEffect, useState } from "react";
import { useMapsLibrary } from "@vis.gl/react-google-maps";
import { Input } from "~/components/ui/Input/Input";

// aliases
type PlaceResult = google.maps.places.PlaceResult;
type Autocomplete = google.maps.places.Autocomplete;

interface Props {
  onPlaceSelect: (place: PlaceResult | null) => void;
  className?: string;
  placeholder?: string;
}

// This is an example of the classic "Place Autocomplete" widget.
// https://developers.google.com/maps/documentation/javascript/place-autocomplete

export const PlaceAutocompleteClassic = ({
  onPlaceSelect,
  className,
  placeholder,
}: Props) => {
  const [placeAutocomplete, setPlaceAutocomplete] =
    useState<Autocomplete | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const places = useMapsLibrary("places");

  useEffect(() => {
    if (!places || !inputRef.current) return;

    const options: google.maps.places.AutocompleteOptions = {
      fields: ["geometry", "name", "formatted_address", "address_component"],
      componentRestrictions: { country: "pl" },
      types: [
        "administrative_area_level_1", // województwo
        "locality", // miasto / większa miejscowość
        "sublocality", // wieś / niższy poziom niż miasto
        "sublocality_level_1", // dzielnica
      ],
    };

    setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
  }, [places]);

  useEffect(() => {
    if (!placeAutocomplete) return;

    placeAutocomplete.addListener("place_changed", () => {
      onPlaceSelect(placeAutocomplete.getPlace());
    });
  }, [onPlaceSelect, placeAutocomplete]);

  return (
    <div className="autocomplete-container">
      <Input ref={inputRef} className={className} placeholder={placeholder} />
    </div>
  );
};
