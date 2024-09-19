"use client";

import {
  AdvancedMarker,
  APIProvider,
  ControlPosition,
  Map,
  MapControl,
  useApiIsLoaded,
  useApiLoadingStatus,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
import { LocateFixedIcon } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/Input/Input";
import { env } from "~/env";
import { PlaceAutocompleteClassic } from "./autocomplete-classic";
import MapHandler from "./map-handler";
import { toast } from "../ui/use-toast";
import { set } from "zod";
import { is } from "drizzle-orm";

type Position = google.maps.LatLngLiteral | undefined;
type PlaceResult = google.maps.places.PlaceResult;

const Distance = () => {
  //   const geocodingApiLoaded = useMapsLibrary("geocoding");

  //   const geometry = useMapsLibrary("geometry");
  //   const [geocodingService, setGeocodingService] =
  //     useState<google.maps.Geocoder>();

  //   useEffect(() => {
  //     if (!geocodingApiLoaded) return;
  //     setGeocodingService(new window.google.maps.Geocoder());
  //   }, [geocodingApiLoaded]);

  //   const [place, setPlace] = useState<PlaceResult | null>(null);
  //   const [placeToCheck, setPlaceToCheck] = useState<PlaceResult | null>(null);

  //   //   const [radius, setRadius] = useState(0);
  //   const [geocodingResult, setGeocodingResult] =
  //     useState<google.maps.GeocoderResult>();
  //   //   const [distance, setDistance] = useState<number | null>(null);

  //   useEffect(() => {
  //     if (!geocodingService || !place) return;
  //     geocodingService.geocode(
  //       { address: place.formatted_address! },
  //       (results, status) => {
  //         if (results && status === "OK") {
  //           setGeocodingResult(results[0]);
  //         }
  //       },
  //     );
  //   }, [geocodingService, place]);

  //   if (!geocodingService) return <div>Loading...</div>;

  //   const checkIfLocationInRadius = () => {
  //     console.log(place);
  //     console.log(placeToCheck);

  //     const placeGeocode = geocoding?.Geocoder;

  //     const distance = geometry?.spherical.computeDistanceBetween(
  //       location!,
  //       locationToCheck!,
  //     );

  //     setDistance(distance!);
  //   };

  //   interface isLocationInRadiusProps {
  //     location: Position;
  //     radius: number;
  //     locationToCheck: google.maps.LatLngLiteral;
  //   }

  //   const isLocationInRadius = (props: isLocationInRadiusProps) => {
  //     const { location, radius, locationToCheck } = props;

  // const distance = google.maps.geometry.spherical.computeDistanceBetween(
  //   new google.maps.LatLng(location),
  //   new google.maps.LatLng(locationToCheck),
  // );
  //     const distance = geometry?.spherical.computeDistanceBetween(
  //       location!,
  //       locationToCheck,
  //       radius,
  //     );
  //     console.log(distance);

  //     return distance! <= radius;
  //   };

  //   useEffect(() => {
  //     const Gdańsk = { lat: 54.35202520000001, lng: 18.6466384 };
  //     const Radius = 30 * 1000; // 30 km

  //     const result = isLocationInRadius({
  //       location: Gdańsk,
  //       radius: Radius,
  //       locationToCheck: location!,
  //     });
  //     console.log(result);
  //   }, [location]);

  const geocodingApiLoaded = useMapsLibrary("geocoding");
  const places = useMapsLibrary("places");
  const geometry = useMapsLibrary("geometry");

  const [geocodingService, setGeocodingService] =
    useState<google.maps.Geocoder>();

  useEffect(() => {
    console.log(geocodingApiLoaded);

    if (!geocodingApiLoaded) return;
    console.log("geocodingApiLoaded");
    setGeocodingService(new window.google.maps.Geocoder());
  }, [geocodingApiLoaded]);

  const [place, setPlace] = useState<PlaceResult | null>(null);
  const [placeToCheck, setPlaceToCheck] = useState<PlaceResult | null>(null);

  const calculateDistance = () => {
    if (!place || !placeToCheck) {
      console.log("nie wybrano miejsc");
      return;
    }
    const placeLocation = place.geometry?.location;
    const placeToCheckLocation = placeToCheck.geometry?.location;

    if (placeLocation && placeToCheckLocation && geometry) {
      const distance = geometry.spherical.computeDistanceBetween(
        placeLocation,
        placeToCheckLocation,
      );

      // distance jest w metrach, można podzielić przez 1000, aby uzyskać kilometry
      console.log(`Odległość: ${distance / 1000} km`);
    } else {
      if (!placeLocation) console.log("Brak współrzędnych dla 1");
      if (!placeToCheckLocation) console.log("Brak współrzędnych dla 2");
      if (!places) console.log("Brak biblioteki places");
      if (!geometry) console.log("Brak biblioteki geometry");
    }
  };

  return (
    <div className="h-screen">
      <h1>Dodaj ofertę</h1>
      <APIProvider
        apiKey={env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}
        onLoad={() => console.log("Maps API has loaded.")}
      >
        <div className="mb-28 flex gap-4">
          <PlaceAutocompleteClassic onPlaceSelect={setPlace} />
          <PlaceAutocompleteClassic onPlaceSelect={setPlaceToCheck} />
          {/* <Input
            className="w-[150px]"
            type="number"
            id="radius"
            step="1"
            placeholder="Promień działania (km)"
            value={radius}
            onChange={(e) => {
              console.log(e.target.value);

              setRadius(parseInt(e.target.value));
            }}
          /> */}
        </div>
        <Button variant={"default"} onClick={calculateDistance}>
          check distance
        </Button>
        <Map
          defaultZoom={3}
          defaultCenter={{ lat: 22.54992, lng: 0 }}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
          streetViewControl={false}
        />
      </APIProvider>
    </div>
  );
};

export default Distance;
