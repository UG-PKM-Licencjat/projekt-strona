import React from "react";
import { Navbar } from "~/components/Navbar/Navbar";
import { Icon } from "~/components/ui/Icon/Icon";
import { Offer } from "~/components/Offer/Offer";

const placeholderOffers = [
  {
    name: "Pizza",
    description: "Pizza w pieśni",
    tags: ["Pizza", "Pie", "Pizza", "Pizza"],
  },
  {
    name: "Pizza",
    description: "Pizza w pieśni",
    tags: ["Pizza", "Pie", "Pizza", "Pizza"],
  },
  {
    name: "Cake",
    description: "Kakao w pieśni",
    tags: ["Cake", "Cake", "Cake", "Cake"],
  },
  {
    name: "Pasta",
    description: "Pasta w pieśni",
    tags: ["Pasta", "Pasta", "Pasta", "Pasta"],
  },
];

export default function Page() {
  return (
    <>
      <Navbar />
      <div className="flex w-full flex-col items-center gap-32 bg-white p-10">
        <div className="flex flex-col items-start gap-20">
          <h1 className="text-6xl font-semibold text-blue-950">ARTYŚCI-APKA</h1>
          <div className="flex items-center gap-10 font-semibold">
            <div className="flex items-center rounded-lg border-2 border-blue-950">
              <input
                type="text"
                placeholder="Wpisz nazwę oferty"
                className="rounded-lg p-2 focus:outline-none"
              />
              <div className="h-full border-r-2 border-blue-950"></div>
              <Icon name="magnifier" className="m-2 h-6 w-6" />
            </div>
            {/* TODO: add logic and popover? */}
            <button className="flex gap-2 rounded-lg border-2 border-blue-950 p-2">
              Lokalizacja
              <Icon name="arrow-down" className="h-6 w-6" />
            </button>
          </div>
        </div>
        {/* Offers container */}
        <div className="flex w-full flex-wrap items-center justify-center gap-2">
          {placeholderOffers.map((offer, index) => (
            <Offer
              key={index}
              name={offer.name}
              description={offer.description}
              tags={offer.tags}
              className="basis-1/4"
            />
          ))}
        </div>
      </div>
    </>
  );
}
