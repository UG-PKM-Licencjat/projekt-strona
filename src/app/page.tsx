"use client";
import React from "react";
import { SearchEngine } from "~/components/SearchEngine/SearchEngine";
import { Button } from "src/components/ui/Button/Button";
import Image from "next/image";
import { Icon } from "src/components/ui/Icon/Icon";
import { signIn, signOut } from "next-auth/react";

export default function Home() {
  return (
    <div className="min-h-screen bg-neo-castleton text-white">
      {/* Header Section */}
      <header className="container flex h-[400px] flex-col pt-4">
        <div className="flex h-1/5 flex-row justify-between">
          <Icon name="logo" viewBox="0 0 151 44" />
          {/* <button className="h-11 rounded-full bg-white px-4 py-2 text-green-900 shadow-md">
            Sign in with Google
          </button> */}
          <Button
            className="rounded-full bg-white px-4 py-2 text-green-900 shadow-md"
            variant={null}
            size="sm"
            onClick={() => alert("log in wip")}
          >
            Sign in with Google
          </Button>
        </div>
        <div className="relative mr-10 flex h-4/5 flex-col">
          <h1 className="mt-4 text-5xl max-lg:text-4xl">
            Poczuj <span className="text-neo-sage">rytm...</span>
          </h1>
          <h2 className="mt-2 flex w-2/3 justify-end pl-10 text-4xl text-black max-lg:text-3xl">
            <span className="text-neo-sage">...</span>
            na weselu twojej babci
          </h2>
          <Icon
            className="absolute right-0 h-full max-md:hidden"
            name="girl-pointing"
            stroke="transparent"
          />
        </div>
      </header>

      {/* Categories Section */}
      <section className="bg-white px-10 py-8 text-black">
        <div className="mx-auto max-w-4xl">
          <h4 className="mb-4 text-2xl font-bold">Kategorie</h4>
          <div className="grid grid-cols-2 gap-4 text-lg sm:grid-cols-3">
            <div>
              <h5 className="font-semibold">Muzyka</h5>
              <ul>
                <li>zespoły</li>
                <li>soliści</li>
                <li>reszta</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold">Performance</h5>
              <ul>
                <li>taniec</li>
                <li>magik</li>
                <li>kuglarz</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold">Rękodzieła</h5>
              <ul>
                <li>obrazy</li>
                <li>rzeźby</li>
                <li>portrety</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold">Wideo i fotografia</h5>
              <ul>
                <li>sesje zdjęciowe</li>
                <li>filmowcy</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold">Obróbka komputerowa</h5>
              <ul>
                <li>montowanie</li>
                <li>mix</li>
                <li>photoshop</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Promoted Offers Section */}
      <section className="bg-gray-100 px-10 py-8">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          <div className="h-40 rounded-lg bg-rose-300"></div>
          <div className="h-40 rounded-lg bg-green-900"></div>
          <div className="h-40 rounded-lg bg-green-200"></div>
          <div className="h-40 rounded-lg bg-green-500"></div>
          <div className="h-40 rounded-lg bg-green-500"></div>
          <div className="h-40 rounded-lg bg-rose-300"></div>
          <div className="h-40 rounded-lg bg-green-200"></div>
          <div className="h-40 rounded-lg bg-green-500"></div>
        </div>
      </section>
    </div>
  );
}
