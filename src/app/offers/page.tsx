"use client";

import {
  MapPin,
  Search,
  Grid,
  List,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { useState, useEffect } from "react";
import OfferCard, { type Offer } from "~/components/OfferCard/OfferCard";
import { Button } from "~/components/ui/Button/Button";
import { Input } from "~/components/ui/Input/Input";
import SkeletonCard from "~/components/ui/SkeletonCard/SkeletonCard";
import { trpc } from "~/trpc/react";

export default function SearchPage() {
  const LIMIT = 6;
  const [viewMode, setViewMode] = useState("grid");

  const [location, setLocation] = useState("");
  const [searchText, setSearchText] = useState("");
  const [skip, setSkip] = useState(0);

  const { data, refetch } = trpc.offers.search.useQuery({
    text: searchText,
    location: location,
    skip: skip,
    limit: LIMIT,
  });

  const { data: offerCount } = trpc.offers.countSearch.useQuery({
    text: searchText,
    location: location,
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

  const handlePageClick = (page: number) => {
    setSkip((page - 1) * LIMIT);
  };

  const getPaginationButtons = () => {
    const currentPage = skip / LIMIT + 1;
    const totalPages = offerCount ? Math.ceil(offerCount / LIMIT) : 0;

    const buttons = [];

    if (currentPage > 1) {
      buttons.push(
        <Button
          key="first"
          variant="ghost"
          size="icon"
          onClick={() => handlePageClick(1)}
          className="size-12 rounded-md transition-colors duration-200 hover:bg-neo-castleton hover:text-white"
        >
          1
        </Button>,
      );
    }

    if (currentPage >= 3) {
      buttons.push(
        <span key="dots-start" className="px-2">
          ...
        </span>,
      );
    }

    for (let i = currentPage; i <= Math.min(currentPage + 2, totalPages); i++) {
      buttons.push(
        <Button
          key={i}
          size="icon"
          variant="ghost"
          onClick={() => handlePageClick(i)}
          className={`size-12 rounded-md transition-colors duration-200 hover:bg-neo-castleton hover:text-white ${
            currentPage === i ? "bg-neo-castleton text-white" : ""
          }`}
        >
          {i}
        </Button>,
      );
    }

    if (currentPage + 2 < totalPages) {
      buttons.push(
        <span key="dots-end" className="px-2">
          ...
        </span>,
      );
    }

    if (currentPage + 2 < totalPages) {
      buttons.push(
        <Button
          key="last"
          size="sm"
          variant="ghost"
          onClick={() => handlePageClick(totalPages)}
          className="size-12 rounded-md transition-colors duration-200 hover:bg-neo-castleton hover:text-white"
        >
          {totalPages}
        </Button>,
      );
    }

    return buttons;
  };

  return (
    <div className="flex-1 bg-[#f5f5f5]">
      <main className="container mx-auto flex h-full flex-col p-4">
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

            <Button
              onClick={search}
              className="rounded-md bg-neo-pink px-4 py-2 text-white transition duration-300 hover:bg-[#4a6741]"
            >
              Szukaj
            </Button>
          </div>
        </div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-[#2d6a4f]">
            Wyniki wyszukiwania
          </h2>
          <div className="flex gap-2">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setViewMode("grid")}
              className={`${
                viewMode === "grid"
                  ? "bg-neo-castleton hover:bg-neo-castleton"
                  : "bg-neo-sage hover:bg-neo-sage-hover"
              } transition-colors duration-200`}
              aria-label="Grid view"
            >
              <Grid
                size={20}
                className={
                  viewMode === "grid" ? "text-neo-sage" : "text-neo-castleton"
                }
              />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setViewMode("list")}
              className={`${
                viewMode === "list"
                  ? "bg-neo-castleton hover:bg-neo-castleton"
                  : "bg-neo-sage hover:bg-neo-sage-hover"
              } transition-colors duration-200`}
              aria-label="List view"
            >
              <List
                size={20}
                className={
                  viewMode === "list" ? "text-neo-sage" : "text-neo-castleton"
                }
              />
            </Button>
          </div>
        </div>
        <div
          className={`grid flex-1 ${
            viewMode === "grid"
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-1"
          } gap-6`}
        >
          {data
            ? data.map((offer) => <OfferCard key={offer.id} offer={offer} />)
            : Array.from({ length: LIMIT }).map((_, ind) => (
                <SkeletonCard key={ind} className="h-40" randomColor />
              ))}
        </div>

        {/* Pagination Buttons */}
        {offerCount && (
          <div className="mt-8 flex items-center justify-center space-x-2">
            {
              <Button
                onClick={() => setSkip(skip - LIMIT)}
                size="icon"
                variant="ghost"
                className="size-12"
                disabled={skip == 0}
                // className="rounded-md px-3 py-1 text-white transition-colors duration-200 hover:bg-neo-castleton"
              >
                <ChevronLeft />
              </Button>
            }

            {getPaginationButtons()}

            {
              <Button
                onClick={() => setSkip(skip + LIMIT)}
                size="icon"
                variant="ghost"
                className={`size-12 ${skip > 0 ? "disabled" : ""}`}
                disabled={skip / LIMIT + 1 >= Math.ceil(offerCount / LIMIT)}
                // className="rounded-md px-3 py-1 text-white transition-colors duration-200 hover:bg-neo-castleton"
              >
                <ChevronRight />
              </Button>
            }
          </div>
        )}
      </main>
    </div>
  );
}
