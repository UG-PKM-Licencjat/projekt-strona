import React from "react";

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
      <div>wyszukaj</div>
    </div>
  );
};
