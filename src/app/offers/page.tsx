"use client";

import Image from "next/image";
import {
  MapPin,
  Star,
  Search,
  ChevronDown,
  Check,
  X,
  Grid,
  List,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import ArtistCard, { type Artist } from "~/components/ArtistCard/ArtistCard";

const artists: Artist[] = [
  {
    id: 1,
    name: "Alex Johnson",
    professions: ["Painter", "Illustrator"],
    description:
      "Versatile artist specializing in vibrant acrylic paintings and digital illustrations.",
    priceRange: "$50 - $500",
    cities: ["New York", "Boston"],
    rating: 4.8,
    imageUrl: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    name: "Sam Lee",
    professions: ["Photographer", "Videographer"],
    description:
      "Capturing life's moments through the lens, specializing in events and portraits.",
    priceRange: "$100 - $1000",
    cities: ["Los Angeles", "San Francisco"],
    rating: 4.9,
    imageUrl: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    name: "Emily Chen",
    professions: ["Graphic Designer", "UI/UX Designer"],
    description:
      "Creating stunning visuals and user-friendly interfaces for digital platforms.",
    priceRange: "$75 - $750",
    cities: ["Chicago", "Seattle"],
    rating: 4.7,
    imageUrl: "/placeholder.svg?height=100&width=100",
  },
];

export default function SearchPage() {
  const [viewMode, setViewMode] = useState("grid");
  const professionFilterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        professionFilterRef.current &&
        !professionFilterRef.current.contains(event.target as Node)
      ) {
        // setShowProfessionFilter(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <main className="container mx-auto p-4">
        <div className="mb-8 rounded-lg bg-[#f0e4d7] p-4 shadow-md">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search artists..."
                className="w-full rounded-md border border-[#97b085] py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[#5f8d4e]"
              />
              <Search
                className="absolute left-3 top-2.5 text-[#5f8d4e]"
                size={20}
              />
            </div>
            <div className="relative">
              <select className="appearance-none rounded-md border border-[#97b085] bg-white px-4 py-2 pr-8 text-[#2d6a4f] focus:outline-none focus:ring-2 focus:ring-[#5f8d4e]">
                <option>Select City</option>
                <option>New York</option>
                <option>Los Angeles</option>
                <option>Chicago</option>
              </select>
              <MapPin
                className="absolute right-3 top-2.5 text-[#5f8d4e]"
                size={20}
              />
            </div>

            <button className="rounded-md bg-[#5f8d4e] px-4 py-2 text-white transition duration-300 hover:bg-[#4a6741]">
              Search
            </button>
          </div>
        </div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-[#2d6a4f]">
            Featured Artists
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`rounded p-2 ${viewMode === "grid" ? "bg-[#97b085]" : "bg-[#f0e4d7]"} transition-colors duration-200`}
              aria-label="Grid view"
            >
              <Grid
                size={20}
                className={
                  viewMode === "grid" ? "text-[#f0e4d7]" : "text-[#5f8d4e]"
                }
              />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`rounded p-2 ${viewMode === "list" ? "bg-[#97b085]" : "bg-[#f0e4d7]"} transition-colors duration-200`}
              aria-label="List view"
            >
              <List
                size={20}
                className={
                  viewMode === "list" ? "text-[#f0e4d7]" : "text-[#5f8d4e]"
                }
              />
            </button>
          </div>
        </div>
        <div
          className={`grid ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"} gap-6`}
        >
          {artists.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      </main>
    </div>
  );
}
