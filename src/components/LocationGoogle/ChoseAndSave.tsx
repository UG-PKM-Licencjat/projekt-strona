"use client";

import {
  AdvancedMarker,
  APIProvider,
  ControlPosition,
  Map,
  MapControl,
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

type Position = google.maps.LatLngLiteral | undefined;
type PlaceResult = google.maps.places.PlaceResult;

const ChoseAndSave = () => {
  const [location, setLocation] = useState<Position>(undefined);
  const [radius, setRadius] = useState(0);
  const [selectedPlace, setSelectedPlace] = useState<PlaceResult | null>(null);

  const geocodingLib = useMapsLibrary("geocoding");
  const geometry = useMapsLibrary("geometry");

  const geocoder = useMemo(
    () => geocodingLib && new geocodingLib.Geocoder(),
    [geocodingLib],
  );

  useEffect(() => {
    setLocationFromUsersLocation({ setDefault: true });
  }, []);

  const setLocationFromUsersLocation = ({
    setDefault,
  }: {
    setDefault: boolean;
  }) => {
    const success = (position: GeolocationPosition) => {
      console.log("success", position);
      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    };

    const error = () => {
      console.log("Unable to retrieve your location");
      // default location
      if (setDefault) {
        setLocation({ lat: 52.2297, lng: 21.0122 });
      }
    };

    navigator.geolocation.getCurrentPosition(success, error);
  };

  interface isLocationInRadiusProps {
    location: Position;
    radius: number;
    locationToCheck: google.maps.LatLngLiteral;
  }

  const isLocationInRadius = (props: isLocationInRadiusProps) => {
    const { location, radius, locationToCheck } = props;

    // const distance = google.maps.geometry.spherical.computeDistanceBetween(
    //   new google.maps.LatLng(location),
    //   new google.maps.LatLng(locationToCheck),
    // );
    const distance = geometry?.spherical.computeDistanceBetween(
      location!,
      locationToCheck,
      radius,
    );
    console.log(distance);

    return distance! <= radius;
  };

  useEffect(() => {
    const Gdańsk = { lat: 54.35202520000001, lng: 18.6466384 };
    const Radius = 30 * 1000; // 30 km

    const result = isLocationInRadius({
      location: Gdańsk,
      radius: Radius,
      locationToCheck: location!,
    });
    console.log(result);
  }, [location]);

  return (
    <div className="h-screen">
      <h1>Dodaj ofertę</h1>
      <APIProvider apiKey={env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}>
        <div className="mb-28 flex gap-4">
          <PlaceAutocompleteClassic onPlaceSelect={setSelectedPlace} />
          <Input
            className="w-[150px]"
            type="number"
            id="radius"
            step="1"
            placeholder="Promień działania (km)"
            value={radius}
            onChange={(e) => setRadius(parseInt(e.target.value))}
          />
          <Button
            variant={"ghost"}
            size={"icon"}
            onClick={() => setLocationFromUsersLocation({ setDefault: false })}
          >
            <LocateFixedIcon className="h-8 w-8" />
          </Button>
          <Button
            variant={"outline"}
            onClick={() => {
              toast({
                description: JSON.stringify({
                  latitude: selectedPlace?.geometry?.location?.lat(),
                  longitude: selectedPlace?.geometry?.location?.lng(),
                }),
              });
            }}
          >
            Add to calendar
          </Button>
        </div>
        {location && (
          <div className="right-0 h-[300px] w-[400px] rounded-md">
            <Map
              defaultCenter={location}
              defaultZoom={10}
              mapId="DEMO_MAP_ID"
              className="h-96"
            >
              <AdvancedMarker position={location} />
            </Map>
            <MapHandler place={selectedPlace} />
          </div>
        )}
      </APIProvider>
    </div>
  );
};

export default ChoseAndSave;
