import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface LocationInputProps {
  onLocationChange: (params: { position: [number, number] }) => void;
}

export default function LocationInput({
  onLocationChange,
}: LocationInputProps) {
  const [search, setSearch] = useState<string>("");
  const [position, setPosition] = useState<[number, number]>([
    52.1141903, 16.9287151,
  ]);
  const [zoom, setZoom] = useState<number>(6);
  const mapRef = React.useRef<any>();

  const handleMapClick = (e: any) => {
    const { lat, lng } = e.latlng;
    setPosition([lat, lng]);
    onLocationChange({ position: [lat, lng] });
  };

  const MapEvents = () => {
    useMapEvents({
      click: handleMapClick,
    });

    return null;
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
        onLocationChange({ position: [lat, lng] });
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

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (location) => {
          const { latitude, longitude } = location.coords;
          setPosition([latitude, longitude]);
          onLocationChange({ position: [latitude, longitude] });
          setZoom(15);
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

  const customIcon = new L.Icon({
    iconUrl: require("../../red.png"),
    iconSize: [32, 42],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  return (
    <div className="location-input">
      <br />
      <h1 className="mb-1 block font-bold">Location</h1>
      <div className="flex items-center">
        <input
          type="text"
          name="location"
          placeholder="Search for a location (eg. Wroniecka 9, 61-763 Poznań, Poland)"
          className="mb-2 w-full border p-2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          type="button"
          name="location"
          className="mb-2 ml-2 rounded border bg-neutral-600 p-2 text-white transition-colors duration-300 ease-in-out hover:bg-teal-500 hover:text-black"
          onClick={() => handleSearch(search)}
        >
          Search
        </button>
      </div>
      <MapContainer
        ref={mapRef}
        center={[52.1141903, 16.9287151]}
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
      </MapContainer>
      <p>
        Latitude: {position[0]}, Longitude: {position[1]}
      </p>
      <button
        type="button"
        className="mb-4 mt-2 rounded border bg-neutral-600 p-2 text-white transition-colors duration-300 ease-in-out hover:bg-teal-500 hover:text-black"
        onClick={getUserLocation}
      >
        Get my location
      </button>
    </div>
  );
}
