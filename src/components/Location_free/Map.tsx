import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface MapComponentProps {
  x: number;
  y: number;
}

const MapComponent: React.FC<MapComponentProps> = ({ x, y }) => {
  useEffect(() => {
    const map = L.map("map").setView([x, y], 15);

    const mapIcon = L.icon({
      iconUrl: require("../../red.png"),
      iconSize: [62, 92],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    const marker = L.marker([x, y], { icon: mapIcon })
      .addTo(map)
      .bindPopup("Seller location");

    marker.on("mouseover", () => {
      marker.openPopup();
    });

    marker.on("mouseout", () => {
      marker.closePopup();
    });
  }, []);

  return <div id="map" style={{ height: "150px", width: "150px" }} />;
};

export default MapComponent;
