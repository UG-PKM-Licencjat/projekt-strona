import React from "react";
import { Icon } from "../ui/Icon/Icon";

interface SearchEngine {}

/**
 * Główna wyszukiwarka ofert i profili
 */
export const SearchEngine = ({}: SearchEngine) => {
  return (
    <div className="flex w-[500px] gap-4">
      <div className="flex min-h-10 w-[300px] flex-col justify-center rounded-lg bg-white px-4 font-normal">
        <input
          className="h-10"
          type="text"
          placeholder="Enter any tag, category or name"
        />
        <div hidden>tags</div>
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
