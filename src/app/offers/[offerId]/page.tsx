"use client";

import React from "react";
import { Icon } from "~/components/ui/Icon/Icon";
import { Tag } from "~/components/Tag/Tag";
import { redirect } from "next/navigation";
import { OfferSegment } from "~/components/ui/OfferSegment/OfferSegment";
import { StarRating } from "~/components/ui/StarRating/StarRating";
import { trpc } from "~/app/_trpc/client";
// import Image from "next/image";

export default function OfferPage({ params }: { params: { offerId: string } }) {
  const [tags, setTags] = React.useState<{ name: string; id: string }[]>([
    { name: "hashtag1", id: "0" },
    { name: "hashtag2", id: "1" },
    { name: "hashtag3", id: "2" },
  ]);
  const description = [
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos eum fugit ex sed saepe quo consectetur nostrum illo autem recusandae.",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat alias facere itaque natus repellendus debitis voluptas facilis maiores quia rerum.",
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut inventore, libero dignissimos rerum quos, dolorem amet consectetur labore sint odio vero itaque obcaecati earum? Recusandae odio laborum aut voluptatum nesciunt?",
  ];
  let uriDecoded: string;
  try {
    uriDecoded = decodeURIComponent(params.offerId);
  } catch (e) {
    redirect("/offers");
  }
  const { data } = trpc.getOffer.useQuery({ id: uriDecoded });

  React.useEffect(() => {
    console.log(data);
    if (data) {
      setTags(data?.offerTags);
    }
  }, [data]);

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
            <h1 className="break-all text-4xl font-semibold uppercase text-blue-950">
              Offer {uriDecoded}
              {/* MICHAŁ MATCZAK */}
            </h1>
            <h3 className="text-2xl font-bold capitalize text-black/40">
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
              <div className="bg-muted-foreground animate-pulse rounded-md px-40 py-6" />
            )}
            {tags?.map((tag, index) => <Tag label={tag.name} key={index} />)}
          </div>
          {/* TODO quick placeholder - get someone to design this */}
          <div className="bg-primary stroke-primary-foreground text-primary-foreground flex items-center gap-3 rounded-full border px-4 py-2 font-semibold">
            <Icon name="wallet" className="size-8" />
            100 000 zł
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
