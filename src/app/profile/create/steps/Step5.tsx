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
import { MinusIcon, PlusIcon } from "lucide-react";

type PlaceResult = google.maps.places.PlaceResult;
type Position = google.maps.LatLngLiteral | undefined;

const STEP = 5;
const MAX_DISTANCE = 600;
const MIN_DISTANCE = 0;

export default function Step5() {
  const { setValue, getValues, watch, register, trigger } =
    useFormContext<ArtistFormData>();

  const distance = watch("distance");
  const locationPlaceholder = watch("locationPlaceholder");
  const { onBlur } = register("locationName");

  const increment = () => {
    if (distance + STEP >= MAX_DISTANCE) {
      setValue("distance", MAX_DISTANCE);
      return;
    }
    setValue("distance", distance + STEP);
  };

  const decrement = () => {
    if (distance - STEP <= MIN_DISTANCE) {
      setValue("distance", MIN_DISTANCE);
      return;
    }
    setValue("distance", distance - STEP);
  };

  // add zoom level management

  const [place, setPlace] = useState<PlaceResult | null>(null);
  const [placePosition, setPlacePosition] = useState<Position | null>(null);
  const location = getValues("location");

  const defaultPos = {
    lat: location?.y ?? 52.2297,
    lng: location?.x ?? 21.0122,
  };

  const [center, setCenter] = useState<Position>(defaultPos);

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
      setCenter(defaultPos);
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
    setValue("locationPlaceholder", place.formatted_address ?? "");
    void trigger("locationName");
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
              value={locationPlaceholder}
              onChange={(e) => setValue("locationPlaceholder", e.target.value)}
              onBlur={(e) => {
                void onBlur(e);
                const locationName = getValues("locationName");
                if (!locationName) {
                  setValue("locationName", "");
                  void trigger("locationName");
                }
                setValue("locationPlaceholder", locationName ?? "");
              }}
              onPlaceSelect={setPlace}
              placeholder={"Wpisz lokalizację.."}
            />
            <CustomError name="locationName" />
          </Label>
          <Label className="flex flex-col justify-between gap-2">
            <span>Maksymalna Odległość</span>
            <span>(ogarnąć nieograniczoną)</span>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div
                  className="shrink-0 cursor-pointer rounded-full p-1 transition-colors hover:bg-black/20"
                  onClick={decrement}
                >
                  <MinusIcon className="size-5" />
                </div>
                <Slider
                  min={MIN_DISTANCE}
                  max={MAX_DISTANCE}
                  step={STEP}
                  onValueChange={(value) => setValue("distance", value[0]!)}
                  value={[distance]}
                />
                <div
                  className="shrink-0 cursor-pointer rounded-full p-1 transition-colors hover:bg-black/20"
                  onClick={increment}
                >
                  <PlusIcon className="size-5" />
                </div>
              </div>
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
