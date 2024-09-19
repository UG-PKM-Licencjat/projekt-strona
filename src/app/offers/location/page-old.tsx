"use client";

import React, { useState } from "react";
import {
  APIProvider,
  ControlPosition,
  Map,
  MapControl,
} from "@vis.gl/react-google-maps";

import MapHandler from "../../../components/LocationGoogle/map-handler";

import { env } from "~/env";
import { PlaceAutocompleteClassic } from "../../../components/LocationGoogle/autocomplete-classic";

export type AutocompleteMode = { id: string; label: string };

const AddOffer = () => {
  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.PlaceResult | null>(null);

  return (
    <APIProvider apiKey={env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}>
      <PlaceAutocompleteClassic onPlaceSelect={setSelectedPlace} />
      <MapControl position={ControlPosition.TOP}>
        <PlaceAutocompleteClassic onPlaceSelect={setSelectedPlace} />
      </MapControl>
      <div className="h-[300px] w-[300px]">
        <Map
          defaultZoom={3}
          defaultCenter={{ lat: 22.54992, lng: 0 }}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
          streetViewControl={false}
        />
      </div>
      {/* <MapHandler place={selectedPlace} /> */}
    </APIProvider>
  );
};

export default AddOffer;
