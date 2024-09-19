import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

interface LocationInputSearchProps {
  onLocationChange: (params: {
    position: [number, number] | null;
    radius: number;
  }) => void;
}

export default function LocationInputSearch({
  onLocationChange,
}: LocationInputSearchProps) {
  const defaultPosition: [number, number] = [52.1141903, 16.9287151];
  const [position, setPosition] = useState<[number, number] | null>([
    52.1141903, 16.9287151,
  ]);
  const [zoom, setZoom] = useState<number>(6);
  const [radius, setRadius] = useState<number>(100000);
  const [search, setSearch] = useState<string>("");
  const mapRef = React.useRef<any>();

  const handleMapClick = (e: any) => {
    const { lat, lng } = e.latlng;
    setPosition([lat, lng]);
    onLocationChange({ position: [lat, lng], radius });
  };

  const handleRadiusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newRadius = parseInt(e.target.value, 10);
    setRadius(newRadius);
    onLocationChange({ position, radius: newRadius });
  };

  const MapEvents = () => {
    useMapEvents({
      click: handleMapClick,
    });

    return null;
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (location) => {
          const { latitude, longitude } = location.coords;
          setPosition([latitude, longitude]);
          setZoom(15);
          onLocationChange({ position: [latitude, longitude], radius });
          if (mapRef.current) {
            mapRef.current.flyTo([latitude, longitude], 15);
          }
        },
        (error) => {
          console.error("Error getting user location:", error.message);
        },
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const handleSearch = async (query: string) => {
    try {
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(query)}&key=${process.env.REACT_APP_OPENCAGEDATA_API_KEY}`,
      );
      const data = await response.json();

      if (data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry;
        setPosition([lat, lng]);
        onLocationChange({ position: [lat, lng], radius: radius });
        setZoom(15);
        if (mapRef.current) {
          mapRef.current.flyTo([lat, lng], 15);
        }
      } else {
        console.error("No results found");
      }
    } catch (error: any) {
      if (error.instanceOf(Error) && error.message.includes("429")) {
        alert("Too many requests. Please try again later.");
      }
      if (error.instanceOf(Error) && error.message.includes("400")) {
        alert("Invalid request. Please try again.");
      } else {
        console.error("Error fetching geocoding data:", error.message);
      }
    }
  };

  const customIcon = new L.Icon({
    iconUrl: require("../../red.png"),
    iconSize: [32, 42],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  const circleCenter = position || defaultPosition;

  return (
    <div className="location-input pt-2">
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Search for a location (eg. Wroniecka 9, 61-763 Poznań, Poland)"
          className="mb-2 w-full border p-2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          type="button"
          className="mb-2 ml-2 rounded border bg-neutral-600 p-2 text-white transition-colors duration-300 ease-in-out hover:bg-teal-500 hover:text-black"
          onClick={() => handleSearch(search)}
        >
          Search
        </button>
      </div>
      <MapContainer
        ref={mapRef}
        center={defaultPosition}
        zoom={zoom}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapEvents />
        {position && (
          <Marker position={position} icon={customIcon}>
            <Popup>Your selected location</Popup>
          </Marker>
        )}
        <Circle
          center={circleCenter}
          radius={radius}
          className="circle"
          fillColor="teal"
          fillOpacity={0.2}
          color="teal"
        />
      </MapContainer>
      <p>
        Latitude: {circleCenter[0]}, Longitude: {circleCenter[1]}
      </p>
      <label className="block w-full" htmlFor="radius">
        <input
          type="range"
          min={1000}
          max={400000}
          value={radius}
          step={1000}
          onChange={handleRadiusChange}
          className="w-full rounded p-2 accent-teal-500"
        />
        Radius: {radius / 1000}{" "}
        {radius / 1000 === 1 ? "kilometer" : "kilometers"}
      </label>
      <br />
      <button
        className="full rounded border p-2"
        type="button"
        onClick={getUserLocation}
      >
        Get My Location
      </button>
    </div>
  );
}
