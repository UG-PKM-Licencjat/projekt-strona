import React from "react";
import { SearchEngine } from "~/components/SearchEngine/SearchEngine";

export default function Home() {
  return (
    <main>
      <header className="flex h-[500px] justify-between bg-pink-700">
        <div className="flex h-full w-3/5 flex-col justify-around pl-20">
          <h1 className="text-4xl text-white">ARTYŚCI-APKA</h1>
          <SearchEngine />
        </div>
        <div
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 20% 100%)",
          }}
          className="bg-kontrabas h-full w-2/5 bg-cover bg-center bg-no-repeat"
        ></div>
      </header>
    </main>
  );
}
