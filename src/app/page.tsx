"use client";
import React from "react";
import { Icon } from "src/components/ui/Icon/Icon";
import playingpiano from "public/svg/playingpiano.svg";
import Image from "next/image";
import SearchBar from "../components/SearchBar/seachbar";
import { trpc } from "~/trpc/react";
import OfferCard from "~/components/OfferCard/OfferCard";
import SkeletonCard from "~/components/ui/SkeletonCard/SkeletonCard";
import { Button } from "~/components/ui/Button/Button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";

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

  // const session = useSession();

  // get params

  const { data, refetch } = trpc.offers.search.useQuery({
    text: "",
    location: { x: null, y: null },
    skip: 0,
    limit: 10,
  });

  return (
    <div className="flex flex-col items-center">
      <div className="w-full md:bg-neo-castleton">
        <header className="flex flex-col items-center md:container md:h-[500px]">
          <Image
            src={playingpiano}
            alt="playing piano"
            className="w-screen md:hidden"
            sizes="(max-width: 768px) 100vw, 200px"
          />
          <div className="relative flex w-full flex-1 flex-col justify-center gap-10 max-md:items-center max-sm:w-full">
            <h1 className="mt-4 text-5xl font-bold max-lg:text-4xl max-md:w-3/4 max-md:text-3xl max-md:text-black">
              Poczuj <span className="text-neo-sage">rytm...</span>
            </h1>
            <h2 className="l flex w-2/3 justify-end pl-10 text-4xl text-black max-lg:text-3xl max-md:w-3/4 max-md:pl-0 max-md:pr-4 max-md:text-left max-md:text-xl max-md:text-neo-castleton lg:mt-2">
              <span className="text-neo-sage">...</span>
              na weselu swojej córki
            </h2>
            <h2 className="text-black max-md:w-3/4 max-md:text-xl md:hidden">
              <span className="text-neo-pink">Wyszukuj</span>, bądź <br />
              <span className="text-neo-mantis">reklamuj</span> muzykę, <br />
              rękodzieło i inne <br />
              wyrazy
              <span className="text-neo-sage"> sztuki</span>
            </h2>
            <Icon
              className="absolute right-14 h-[500px] max-md:hidden"
              name="girl-pointing"
              stroke="transparent"
              viewBox="0 0 204 410"
            />
          </div>
          <div className="my-10 w-3/4 md:hidden">
            <Button className="w-full">Przejdź do wyszukiwarki</Button>
          </div>
        </header>
      </div>
      <div className="w-max-[1000px] mt-10 w-3/4 max-md:hidden">
        <h2 className="text-2xl font-bold">
          Znajdź <span className="text-neo-pink">artystę</span> na swoje
          <span className="text-neo-mantis"> wydarzenie</span> juz
          <span className="text-neo-sage"> teraz!</span>
        </h2>
        <h3 className="mt-4 text-xl">
          Wpisz w wyszukiwarce poniżej co Cię interesuje, a my znajdziemy dla
          Ciebie osobę która spełni Twoje oczekiwania. <br />
          Jesteś artystą? Nie czekaj i dodaj swoją ofertę!
        </h3>
      </div>
      <div className="w-max-[1000px] mt-10 w-3/4 max-md:hidden">
        <SearchBar />
      </div>

      <div className="w-max-[1000px] mt-10 h-max w-3/4">
        <h2 className="text-2xl font-bold">Przykładowe oferty</h2>
      </div>
      <div className="w-max-[1000px] mt-10 grid w-3/4 grid-cols-1 gap-6 max-xl:hidden sm:grid-cols-2 lg:grid-cols-3">
        {data
          ? data.offers.map((offer) => (
              <OfferCard key={offer.id} offer={offer} />
            ))
          : Array.from({ length: 3 }).map((_, ind) => (
              <SkeletonCard key={ind} className="h-40" randomColor />
            ))}
      </div>
      <Carousel opts={{ loop: true }} className="w-3/4 xl:hidden">
        <CarouselContent>
          {data
            ? data.offers.map((offer) => (
                <CarouselItem className="h-40 lg:basis-1/2" key={offer.id}>
                  <OfferCard key={offer.id} offer={offer} />
                </CarouselItem>
              ))
            : Array.from({ length: 3 }).map((_, ind) => (
                <CarouselItem key={ind}>
                  <SkeletonCard key={ind} className="h-40" randomColor />
                </CarouselItem>
              ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <footer className="mt-16 flex-grow bg-black"></footer>
    </div>
  );
}
