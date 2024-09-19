"use client";

import { useEffect, useState } from "react";
import { PlaceAutocompleteClassic } from "./autocomplete-classic";

type Props = {
  placeholder?: string;
  className?: string;
};

type PlaceResult = google.maps.places.PlaceResult;

const LocationInput = (props: Props) => {
  const { placeholder, className } = props;

  const [place, setPlace] = useState<PlaceResult | null>(null);

  return (
    <PlaceAutocompleteClassic
      onPlaceSelect={setPlace}
      placeholder={placeholder}
      className={className}
    />
  );
};
