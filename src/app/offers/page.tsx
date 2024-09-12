"use client";

import { MapPin, Search, Grid, List } from "lucide-react";
import { useState, useEffect } from "react";
import ArtistCard, { type Artist } from "~/components/ArtistCard/ArtistCard";
import { Input } from "~/components/ui/Input/Input";
import { trpc } from "~/trpc/react";

export default function SearchPage() {
  const [viewMode, setViewMode] = useState("grid");

  const [location, setLocation] = useState("");
  const [searchText, setSearchText] = useState("");

  const { data, refetch } = trpc.offers.search.useQuery({
    text: searchText,
    location: location,
    skip: 0,
    limit: 5,
  });

  function onLocationChange(event: React.ChangeEvent<HTMLInputElement>) {
    setLocation(event.target.value);
  }

  function onSearchTextChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchText(event.target.value);
  }

  function search() {
    void refetch();
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <main className="container mx-auto p-4">
        <div className="mb-8 rounded-lg bg-neo-castleton p-4 shadow-md">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-grow">
              <Input
                type="text"
                value={searchText}
                onChange={onSearchTextChange}
                placeholder="Karol Piwowarek, gitara"
                className="w-full rounded-md border border-neo-castleton py-2 pl-14 pr-4 focus:outline-none focus:ring-2 focus:ring-neo-castleton"
              />
              <Search
                className="absolute left-3 top-2.5 text-neo-castleton"
                size={35}
              />
            </div>
            <div className="relative">
              <Input
                placeholder="Warszawa"
                onChange={onLocationChange}
                className="appearance-none rounded-md border border-[#97b085] bg-white px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-[#5f8d4e]"
                value={location}
              />
              <MapPin
                className="absolute right-3 top-2.5 text-neo-castleton"
                size={35}
              />
            </div>

            <button
              onClick={search}
              className="rounded-md bg-neo-pink px-4 py-2 text-white transition duration-300 hover:bg-[#4a6741]"
            >
              Szukaj
            </button>
          </div>
        </div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-[#2d6a4f]">
            Wyniki wyszukiwania
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`rounded p-2 ${viewMode === "grid" ? "bg-neo-castleton" : "bg-neo-sage"} transition-colors duration-200`}
              aria-label="Grid view"
            >
              <Grid
                size={20}
                className={
                  viewMode === "grid" ? "text-neo-sage" : "text-neo-castleton"
                }
              />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`rounded p-2 ${viewMode === "list" ? "bg-neo-castleton" : "bg-neo-sage"} transition-colors duration-200`}
              aria-label="List view"
            >
              <List
                size={20}
                className={
                  viewMode === "list" ? "text-neo-sage" : "text-neo-castleton"
                }
              />
            </button>
          </div>
        </div>
        <div
          className={`grid ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"} gap-6`}
        >
          {data?.map((offer) => <h1 key={offer.id}>{offer.name}</h1>)}
          {/* {artists.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))} */}
        </div>
      </main>
    </div>
  );
}
