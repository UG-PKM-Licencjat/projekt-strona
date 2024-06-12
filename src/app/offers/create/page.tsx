"use client";

import React from "react";
import { Icon } from "~/components/ui/Icon/Icon";
import { Tag } from "~/components/Tag/Tag";
// import { redirect } from "next/navigation";
import { OfferSegment } from "~/components/ui/OfferSegment/OfferSegment";
import { StarRating } from "~/components/ui/StarRating/StarRating";
// import { trpc } from "~/app/_trpc/client";
// import Image from "next/image";

export default function OfferPage() {
  const tags: { name: string; id: string }[] | undefined = [
    { name: "hashtag1", id: "0" },
    { name: "hashtag2", id: "1" },
    { name: "hashtag3", id: "2" },
  ];
  const description = [
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos eum fugit ex sed saepe quo consectetur nostrum illo autem recusandae.",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat alias facere itaque natus repellendus debitis voluptas facilis maiores quia rerum.",
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut inventore, libero dignissimos rerum quos, dolorem amet consectetur labore sint odio vero itaque obcaecati earum? Recusandae odio laborum aut voluptatum nesciunt?",
  ];

  return (
    <div className="flex flex-col items-start gap-20 px-16 py-8">
      {/* HEADER */}
      <div className="flex items-start gap-10">
        <img
          src="https://i.pinimg.com/736x/dc/e1/8e/dce18e21ab55156563e17affb71314fc.jpg"
          alt="avatar"
          className="size-64 rounded-full"
        />

        <div className="mt-4 flex flex-col items-start justify-center gap-4">
          <div className="flex items-end justify-center gap-12">
            {/* Offer create */}
            <h1 className="break-all text-4xl font-semibold uppercase text-blue-950 outline-none">
              MICHAŁ MATCZAK
            </h1>
            <h3 className="text-gra text-2xl font-bold capitalize text-black/40">
              {/* Warszawa */}
              Location
            </h3>
          </div>
          <div className="flex items-center justify-center gap-4">
            <StarRating currentRating={3.4} />
            <Icon name="badge-check" className="size-12" />
          </div>
          <div className="flex items-start justify-center gap-4">
            {!tags && (
              <div className="animate-pulse rounded-md bg-muted-foreground px-40 py-6" />
            )}
            {tags?.map((tag, index) => <Tag label={tag.name} key={index} />)}
          </div>
          {/* TODO quick placeholder - get someone to design this */}
          <div className="flex items-center gap-3 rounded-full border bg-primary stroke-primary-foreground px-4 py-2 font-semibold text-primary-foreground">
            <Icon name="wallet" className="size-8" />
            <input
              type="text"
              min={0}
              max={999999999}
              step={1}
              className="w-[5.8rem] bg-inherit text-right outline-none"
              placeholder="XXXXXXXX"

              // TODO - figure this out
              // onKeyDown={(event) => {
              //   if (
              //     !/\d+/.test(event.key) &&
              //     event.key !== "Backspace" &&
              //     event.key !== "Delete" &&
              //     event.key !== "ArrowLeft" &&
              //     event.key !== "ArrowRight" &&
              //     event.key !== "Enter" &&
              //     event.key !== "Home" &&
              //     event.key !== "End"
              //   ) {
              //     event.preventDefault();
              //   }
              // }}
              // onChange={(event) => {
              //   const val = event.target.value;
              //   const numVal = Number(val);
              //   if (numVal > 999999999 && !isNaN(numVal)) {
              //     event.target.value = val.slice(0, -1);
              //   }
              // }}
            />
            zł
          </div>
        </div>
      </div>

      {/* O MNIE */}
      <OfferSegment heading="O MNIE" info={description} />

      {/* CO OFERUJĘ */}
      <OfferSegment heading="CO OFERUJĘ" info={description} />

      {/* MOJE PORTFOLIO */}
      <OfferSegment
        heading="MOJE PORTFOLIO"
        info={[
          "https://www.youtube.com/embed/F2YpXC1itEE",
          "https://www.youtube.com/embed/F2YpXC1itEE",
        ]}
        type="video"
      />

      {/* LINKI */}
      <OfferSegment
        heading="LINKI"
        info={["https://www.youtube.com/embed/F2YpXC1itEE"]}
        type="link"
      />

      {/* OPINIE */}
      <OfferSegment heading="OPINIE">
        TUTAJ IDĄ KOMENTARZE I OPINIE
      </OfferSegment>
    </div>
  );
}
