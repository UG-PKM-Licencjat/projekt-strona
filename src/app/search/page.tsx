"use client";

import {
  MapPin,
  Search,
  Grid,
  List,
  ChevronRight,
  ChevronLeft,
  XIcon,
} from "lucide-react";
import { useState } from "react";
import OfferCard from "~/components/Offer/OfferCard";
import { Button } from "~/components/ui/Button/Button";
import { Input } from "~/components/ui/Input/Input";
import SkeletonCard from "~/components/ui/SkeletonCard/SkeletonCard";
import { trpc } from "~/trpc/react";
import {
  useQueryStates,
  useQueryState,
  parseAsFloat,
  parseAsInteger,
  parseAsString,
} from "nuqs";
import { useDebounce } from "@uidotdev/usehooks";
import { PlaceAutocompleteClassic } from "~/components/LocationGoogle/autocomplete-classic";
import { cn } from "~/lib/utils";

type PlaceResult = google.maps.places.PlaceResult;

export default function SearchPage() {
  const LIMIT = 6;
  const [viewMode, setViewMode] = useState("grid");

  const [location, setLocation] = useQueryStates({
    x: parseAsFloat,
    y: parseAsFloat,
    placeName: parseAsString.withDefault(""),
  });

  const [placeholderName, setPlaceholderName] = useState(location.placeName);

  const [searchText, setSearchText] = useQueryState(
    "q",
    parseAsString.withDefault(""),
  );
  const debouncedSearchText = useDebounce(searchText, 300);

  const [skip, setSkip] = useQueryState("skip", parseAsInteger.withDefault(0));

  const { data, refetch } = trpc.offers.search.useQuery({
    text: debouncedSearchText,
    location: location,
    skip: skip,
    limit: LIMIT,
  });

  async function onLocationChange(place: PlaceResult | null) {
    if (!place?.geometry && place?.name !== "") return;
    const name = place?.name ?? "";
    const lat = place?.geometry?.location?.lat() ?? null;
    const lng = place?.geometry?.location?.lng() ?? null;
    await setLocation({ placeName: name, x: lng, y: lat });
    setPlaceholderName(name);
  }

  async function resetLocation() {
    await setLocation({ placeName: null, x: null, y: null });
    setPlaceholderName("");
    void refetch();
  }

  async function onSearchTextChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    await setSearchText(event.target.value);
  }

  function search() {
    void refetch();
  }

  const handlePageClick = async (page: number) => {
    await setSkip((page - 1) * LIMIT);
  };

  const getPaginationButtons = () => {
    const currentPage = skip / LIMIT + 1;
    const totalPages = data?.offerCount
      ? Math.ceil(data?.offerCount / LIMIT)
      : 0;

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
    <div className="flex h-full bg-neo-gray">
      <main className="container flex flex-col p-4">
        <div className="mb-8 rounded-lg bg-neo-castleton p-4 shadow-md">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-grow">
              <Input
                type="text"
                value={searchText}
                onChange={onSearchTextChange}
                placeholder="zespół weselny, gitara"
                className="w-full rounded-md border border-neo-castleton py-2 pl-14 pr-4 focus:outline-none focus:ring-2 focus:ring-neo-castleton"
              />
              <Search
                className="absolute left-3 top-2.5 text-neo-castleton"
                size={35}
              />
            </div>
            <div className="group relative">
              <PlaceAutocompleteClassic
                value={placeholderName}
                onBlur={() => setPlaceholderName(location.placeName)}
                onChange={(e) => setPlaceholderName(e.target.value)}
                onPlaceSelect={onLocationChange}
                className="appearance-none rounded-md border border-neo-mantis bg-white px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-neo-mantis"
              />
              {location.placeName && (
                <div
                  className={cn(
                    "absolute right-0 top-0 flex h-full items-center justify-end pr-14 transition-all md:opacity-0",
                    location.placeName && "group-hover:opacity-100",
                  )}
                >
                  <XIcon
                    className="size-6 cursor-pointer text-neo-castleton"
                    onClick={resetLocation}
                  />
                </div>
              )}
              <MapPin
                className="absolute right-3 top-2.5 text-neo-castleton"
                size={35}
              />
            </div>

            <Button onClick={search}>Szukaj</Button>
          </div>
        </div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-neo-castleton">
            Wyniki wyszukiwania
          </h2>
          <div className="flex gap-2 max-md:hidden">
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
          className={cn(
            "grid grid-cols-1 gap-6",
            viewMode === "grid" ? "sm:grid-cols-2 lg:grid-cols-3" : null,
          )}
        >
          {data
            ? data.offers.map((offer) => (
                <OfferCard key={offer.id} offer={offer} />
              ))
            : Array.from({ length: LIMIT }).map((_, ind) => (
                <SkeletonCard key={ind} className="h-64" randomColor />
              ))}
        </div>

        {data && data?.offerCount === 0 ? (
          <div className="mx-auto max-w-lg rounded-xl bg-white p-8 shadow-lg">
            <h1 className="text-neo-green-dark mb-4 text-2xl font-semibold">
              Nie znaleźliśmy tego czego szukasz.
            </h1>
            <p className="mb-6 text-lg text-gray-600">
              Spróbuj dostosować parametry wyszukiwania.
            </p>
          </div>
        ) : null}

        {/* Pagination Buttons */}
        {data?.offerCount ? (
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
                disabled={
                  skip / LIMIT + 1 >= Math.ceil(data?.offerCount / LIMIT)
                }
                // className="rounded-md px-3 py-1 text-white transition-colors duration-200 hover:bg-neo-castleton"
              >
                <ChevronRight />
              </Button>
            }
          </div>
        ) : null}
      </main>
    </div>
  );
}
