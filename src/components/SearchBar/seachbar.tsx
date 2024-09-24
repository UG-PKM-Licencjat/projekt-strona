"use client";

import { Search } from "lucide-react";

import { Button } from "~/components/ui/Button/Button";
import { Input } from "~/components/ui/Input/Input";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const router = useRouter();
  const [searchText, setSearchText] = useState<string>("");

  function onSearchTextChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchText(event.target.value);
  }

  function search() {
    router.push("/search?q=" + searchText);
  }

  return (
    <div className="mb-8 rounded-lg bg-neo-castleton p-4 shadow-md">
      <form
        className="flex flex-col gap-4 md:flex-row"
        onSubmit={(e) => {
          e.preventDefault();
          search();
        }}
      >
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

        <Button onClick={search}>Szukaj</Button>
      </form>
    </div>
  );
}
