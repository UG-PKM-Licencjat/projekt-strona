import React from "react";
import { Icon } from "../ui/Icon/Icon";
import { Input } from "../ui/Input/Input";
import { Tag } from "../Tag/Tag";

interface SearchEngine {}

/**
 * Główna wyszukiwarka ofert i profili
 */
export const SearchEngine = ({}: SearchEngine) => {
  const tags = [
    "producent",
    "pro",
    "gitarzysta",
    "dj",
    "wokalista",
    "zespół",
    "rock",
    "jazz",
  ];

  return (
    <div className="flex gap-4">
      <div className="flex min-h-10 w-[300px] flex-col justify-center rounded-lg bg-white font-normal">
        <Input type="text" placeholder="Enter any tag, category or name" />
        <ul className="flex flex-wrap gap-2 p-2">
          {tags.map((tag, i) => (
            <li key={i}>
              <Tag label={tag} />
            </li>
          ))}
        </ul>
      </div>
      <button className="font-lg h-10 items-center rounded-lg bg-white px-4 text-lg">
        Location
      </button>
      <button className="h-10">
        <Icon style="w-8 h-8 text-white" name="magnifier" fill="#FFFFFF" />
      </button>
    </div>
  );
};
