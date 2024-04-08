import React from "react";
import { Icon } from "../ui/Icon/Icon";

interface SearchEngine {}

/**
 *
 */
export const SearchEngine = ({}: SearchEngine) => {
  return (
    <div className="w-[500px] border">
      <div className="flex w-[300px] flex-col rounded-lg bg-white px-4 font-normal">
        <input type="text" placeholder="Enter any tag, category or name" />
        <div> tagi </div>
      </div>
      <div>lokalizacja</div>
      <button>
        <Icon style="w-4 h-4 text-white" name="magnifier" fill="#FFFFFF" />
      </button>
    </div>
  );
};
