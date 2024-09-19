import { useState } from "react";
import APIProviderWrapper from "~/components/LocationGoogle/APIProviderWrapper";
import { PlaceAutocompleteClassic } from "~/components/LocationGoogle/autocomplete-classic";

type PlaceResult = google.maps.places.PlaceResult;

export default function Step5() {
  // City select - chip inputs with searchbox
  // Price picker - two options, single price or range (slider?)

  const [place, setPlace] = useState<PlaceResult | null>(null);

  return (
    <div className="flex-1 bg-pink-100">
      <APIProviderWrapper>
        <PlaceAutocompleteClassic
          onPlaceSelect={setPlace}
          placeholder={"Wpisz lokalizację.."}
          className="w-32"
        />
      </APIProviderWrapper>
    </div>
  );
}
