import React from "react";
import { Icon } from "~/components/ui/Icon/Icon";
import { Offer } from "~/components/Offer/Offer";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
const placeholderOffers = [
  {
    name: "IMIE NAZWISKO",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    tags: ["hashtag", "hashtag", "hashtag", "hashtag"],
  },
  {
    name: "IMIE NAZWISKO",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id repudiandae similique aperiam optio earum quidem, ad tempore necessitatibus suscipit iusto?",
    tags: ["hashtag", "hashtag", "hashtag", "hashtag"],
  },
  {
    name: "IMIE NAZWISKO",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id repudiandae similique aperiam optio earum quidem, ad tempore necessitatibus suscipit iusto?",
    tags: ["hashtag", "hashtag", "hashtag", "hashtag"],
  },
  {
    name: "IMIE NAZWISKO",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione alias animi nostrum quo, ipsa doloribus aut a error laborum assumenda eius harum quia, dolor libero. Possimus iusto ullam animi voluptatum distinctio enim suscipit magnam, quaerat omnis quae vitae veritatis laborum reiciendis aliquid dolor quisquam dignissimos accusantium vero dolorum similique cum. Doloremque mollitia sunt voluptates error doloribus, delectus nulla dolorum incidunt, recusandae iusto assumenda deserunt harum, culpa temporibus! Quam nisi corrupti accusantium nostrum dolorum eligendi. Dolorum eaque illo asperiores aperiam nisi delectus eligendi voluptate odit unde! Quisquam, eius! Exercitationem reprehenderit aperiam sit quos accusamus dicta, fugiat sunt possimus. Sed, quibusdam numquam!",
    tags: ["hashtag", "hashtag", "hashtag", "hashtag"],
  },
];

export default function Page() {
  return (
    <>
      <div className="flex w-full flex-col items-center gap-32 bg-white p-10">
        <div className="flex flex-col items-start gap-20">
          <h1 className="text-6xl font-semibold text-blue-950">ARTYŚCI-APKA</h1>
          <div className="flex items-center gap-20 font-semibold">
            <div className="flex items-center divide-x-2 divide-blue-950 rounded-lg border-2 border-blue-950 drop-shadow-md">
              <input
                type="text"
                placeholder="Wpisz nazwę oferty"
                className="rounded-lg p-2 focus:outline-none"
              />
              <Icon name="magnifier" className="size-10 p-2" />
            </div>
            {/* TODO: add logic */}
            <Select>
              <SelectTrigger className="flex h-full w-44 gap-2 rounded-lg border-2 border-blue-950 p-2">
                <SelectValue placeholder="Lokalizacja" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="1">Lokalizacja 1</SelectItem>
                  <SelectItem value="2">Lokalizacja 2</SelectItem>
                  <SelectItem value="3">Lokalizacja 3</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        {/* Offers container */}
        <div className="grid max-w-[75rem] items-center justify-center gap-2 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-5">
          {placeholderOffers.map((offer, index) => (
            <Offer
              key={index}
              name={offer.name}
              description={offer.description}
              tags={offer.tags}
              className={index % 3 === 0 ? "xl:col-span-3" : "xl:col-span-2"}
            />
          ))}
        </div>
      </div>
    </>
  );
}
