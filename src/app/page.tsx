"use client";
import React from "react";
import { Icon } from "src/components/ui/Icon/Icon";
// import { useSession } from "next-auth/react";
// import { redirect } from "next/navigation";
// import SkeletonCard from "~/components/ui/SkeletonCard/SkeletonCard";
import { trpc } from "~/trpc/react";
// import { useEffect } from "react";
import playingpiano from "public/svg/playingpiano.svg";
import Image from "next/image";

export default function Home() {
  // // TO DO WHEN OFFERS FETCHING IS READY
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   if (isLoading) {
  //     const intervalId = setInterval(() => {
  //       // Symulacja zmiany stanu isLoading po pewnym czasie
  //       if (Math.random() > 0.8) {
  //         setIsLoading(false);
  //       }
  //     }, 1000); // Powtarzanie co 1 sekundę

  //     // Czyszczenie interwału po zmianie isLoading
  //     return () => clearInterval(intervalId);
  //   }
  // }, [isLoading]);

  const { data } = trpc.testProcedure.useQuery();

  // const session = useSession();

  return (
    <div className="flex flex-col text-white md:bg-neo-castleton">
      <header className="flex h-[500px] flex-col bg-neo-castleton md:container md:pt-4">
        <Image
          src={playingpiano}
          alt="playing piano"
          className="w-screen md:hidden"
          sizes="(max-width: 768px) 100vw, 200px"
        />
        <div className="relative flex w-full flex-1 flex-col justify-center gap-10 px-10 max-md:gap-0 max-md:bg-white">
          <h1 className="mt-4 text-5xl font-bold max-lg:text-4xl max-md:text-3xl max-md:text-black">
            Poczuj {data}
            <span className="text-neo-sage">rytm...</span>
          </h1>
          <h2 className="mt-2 flex w-2/3 justify-end pl-10 text-4xl text-black max-lg:text-3xl max-md:w-full max-md:pl-0 max-md:pr-4 max-md:text-left max-md:text-xl max-md:text-neo-castleton">
            <span className="text-neo-sage">...</span>
            na weselu swojej córki
          </h2>
          <h2 className="text-black max-md:text-xl md:hidden">
            <span className="text-neo-pink">Wyszukuj</span>, bądź <br />
            <span className="text-neo-mantis">reklamuj</span> muzykę, <br />
            rękodzieło i inne <br />
            wyrazy
            <span className="text-neo-sage"> sztuki</span>
          </h2>
          <Icon
            className="absolute right-14 h-full max-md:hidden"
            name="girl-pointing"
            stroke="transparent"
            viewBox="0 0 204 410"
          />
        </div>
      </header>
      <footer className="mt-16 flex-grow bg-black"></footer>
      {/* Categories Section */}
      {/* <section className="bg-white px-10 py-8 text-black">
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
      </section> */}

      {/* Promoted Offers Section */}
      {/* <section className="bg-gray-100 px-10 py-8">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {[...Array<number>(9)].map((el, idx) => {
            return <SkeletonCard key={idx} className="h-40" randomColor />;
          })}
        </div>
      </section> */}
    </div>
  );
}
