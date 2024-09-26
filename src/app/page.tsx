"use client";
import React from "react";
import playingpiano from "public/svg/playingpiano.svg";
import bannerleft from "public/svg/bannerleft.svg";
import bannerright from "public/svg/bannerright.svg";
import Image from "next/image";
import SearchBar from "../components/SearchBar/seachbar";
import { trpc } from "~/trpc/react";
import OfferCard from "~/components/Offer/OfferCard";
import SkeletonCard from "~/components/ui/SkeletonCard/SkeletonCard";
import { Button } from "~/components/ui/Button/Button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export default function Home() {
  const { data } = trpc.offers.search.useQuery({
    text: "",
    location: { x: null, y: null },
    skip: 0,
    limit: 3,
    sortBy: "createdAt",
  });

  return (
    <div className="flex flex-col items-center pb-16">
      <div className="relative w-full md:bg-neo-castleton">
        <div className="flex flex-col items-center md:container md:h-[500px]">
          <Image
            src={playingpiano}
            alt="playing piano"
            priority
            className="w-screen md:hidden"
            sizes="(max-width: 768px) 100vw, 200px"
          />
          <div className="relative z-20 flex w-full flex-1 flex-col justify-center gap-10 max-md:items-center max-sm:w-full">
            <h1 className="mt-4 text-5xl font-bold max-lg:text-4xl max-md:w-3/4 max-md:text-3xl max-md:text-black">
              Poczuj <span className="text-neo-sage">rytm...</span>
            </h1>
            <h2 className="flex w-2/3 justify-end pl-10 text-4xl text-black max-lg:text-3xl max-md:w-3/4 max-md:pl-0 max-md:pr-4 max-md:text-left max-md:text-xl max-md:text-neo-castleton lg:mt-2">
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
          </div>
          <div className="my-10 w-3/4 md:hidden">
            <a href="/search">
              <Button className="w-full">Wyszukaj już teraz!</Button>
            </a>
          </div>
        </div>
        <Image
          src={bannerleft}
          alt="bannerleft"
          priority
          className="absolute bottom-0 left-0 z-10 w-fit max-md:hidden md:h-[80%] lg:h-[90%] xl:h-full"
        />
        <Image
          src={bannerright}
          alt="bannerright"
          priority
          className="absolute bottom-0 right-0 z-10 w-fit max-md:hidden md:h-[80%] lg:h-[90%] xl:h-full"
        />
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
        <h2 className="text-2xl font-bold">Najnowsze oferty</h2>
      </div>
      <div className="w-max-[1000px] mt-10 grid w-3/4 grid-cols-1 gap-6 max-xl:hidden sm:grid-cols-2 lg:grid-cols-3">
        {data
          ? data.offers.map((offer) => (
              <OfferCard key={offer.id} offer={offer} />
            ))
          : Array.from({ length: 3 }).map((_, ind) => (
              <SkeletonCard key={ind} className="h-64" randomColor />
            ))}
      </div>
      <Carousel
        opts={{ loop: true }}
        plugins={[Autoplay({ delay: 10000 })]}
        className="w-3/4 xl:hidden"
      >
        <CarouselContent>
          {data
            ? data.offers.map((offer) => (
                <CarouselItem className="lg:basis-1/2" key={offer.id}>
                  <OfferCard key={offer.id} offer={offer} />
                </CarouselItem>
              ))
            : Array.from({ length: 3 }).map((_, ind) => (
                <CarouselItem key={ind} className="lg:basis-1/2">
                  <SkeletonCard key={ind} className="h-64" randomColor />
                </CarouselItem>
              ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
