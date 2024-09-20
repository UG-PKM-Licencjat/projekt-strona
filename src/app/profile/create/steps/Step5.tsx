import { useEffect, useState } from "react";
import APIProviderWrapper from "~/components/LocationGoogle/APIProviderWrapper";
import { PlaceAutocompleteClassic } from "~/components/LocationGoogle/autocomplete-classic";
import { Label } from "~/components/ui/label";
import CustomError from "~/components/Form/CustomError";
import { AdvancedMarker, Map } from "@vis.gl/react-google-maps";
import MapHandler from "~/components/LocationGoogle/map-handler";
import { Circle } from "~/components/LocationGoogle/Circle";
import { useFormContext } from "react-hook-form";
import { type ArtistFormData } from "~/lib/artistSchema";
import { Slider } from "~/components/ui/slider";

type PlaceResult = google.maps.places.PlaceResult;
type Position = google.maps.LatLngLiteral | undefined;

export default function Step5() {
  const { setValue, getValues, register, watch } =
    useFormContext<ArtistFormData>();

  const distance = watch("distance");

  const [place, setPlace] = useState<PlaceResult | null>(null);

  const { ref, onChange, name } = register("distance", { valueAsNumber: true });

  // add zoom level management

  const [placePosition, setPlacePosition] = useState<Position | null>(null);

  const [center, setCenter] = useState<Position>({
    lat: 52.2297,
    lng: 21.0122,
  });

  // Get user location
  useEffect(() => {
    const success = (position: GeolocationPosition) => {
      console.log("success", position);
      setCenter({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    };

    const error = () => {
      console.log("Unable to retrieve your location");
      // default location
      setCenter({ lat: 52.2297, lng: 21.0122 });
    };

    navigator.geolocation.getCurrentPosition(success, error);
  }, []);

  // Set place position (coords)
  useEffect(() => {
    if (!place) return;
    const placeLocation = place.geometry?.location;
    if (!placeLocation) {
      // error handling na brak kordów (to sie na 99,9 nie wydarzy nigdy z tego co rozumiem)
      return;
    }
    setValue("location", { x: placeLocation.lng(), y: placeLocation.lat() });
    setValue("locationName", place.formatted_address ?? "");
    console.log("place", place);
    setPlacePosition({
      lat: placeLocation.lat(),
      lng: placeLocation.lng(),
    });
  }, [place]);

  return (
    <div className="flex h-full justify-between">
      <APIProviderWrapper>
        <div className="flex flex-col gap-4">
          <Label className="flex flex-col justify-between gap-2">
            <span>Twoja Lokalizacja</span>
            <PlaceAutocompleteClassic
              onPlaceSelect={setPlace}
              placeholder={"Wpisz lokalizację.."}
              className="w-64"
            />
            <CustomError name="location" />
          </Label>
          <Label className="flex flex-col justify-between gap-2">
            <span>Maksymalna Odległość</span>
            <span>(ogarnąć nieograniczoną)</span>
            <div className="flex flex-col gap-2">
              <Slider
                ref={ref}
                min={0}
                max={600}
                step={1}
                onChange={onChange}
                name={name}
                defaultValue={[getValues("distance")]}
              />
              {distance}km
            </div>
            <CustomError name="distance" />
          </Label>
        </div>
        <div className="w-1/2 overflow-hidden rounded-md border">
          <Map
            defaultZoom={10}
            defaultCenter={center}
            gestureHandling={"greedy"}
            streetViewControl={false}
            mapId="STEP5_MAP_ID"
          >
            {distance > 0 && (
              <Circle
                radius={distance * 1000} // m to km
                center={placePosition ? placePosition : center}
                strokeColor={"#0c4cb3"}
                strokeOpacity={1}
                strokeWeight={3}
                fillColor={"#3b82f6"}
                fillOpacity={0.3}
              />
            )}
          </Map>
          <AdvancedMarker position={placePosition ? placePosition : center} />
          <MapHandler place={place} />
        </div>
      </APIProviderWrapper>
    </div>
  );
}
