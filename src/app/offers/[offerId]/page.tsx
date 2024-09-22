"use client";

import React from "react";
import { trpc } from "~/trpc/react";
import Image from "next/image";
import { Card, CardContent } from "~/components/ui/card";
import { Tag } from "~/components/Tag/Tag";
import { ArrowLeftIcon, DollarSign, MapPin } from "lucide-react";
import { Button } from "~/components/ui/Button/Button";
import APIProviderWrapper from "~/components/LocationGoogle/APIProviderWrapper";
import { AdvancedMarker, Map } from "@vis.gl/react-google-maps";
import { Circle } from "~/components/LocationGoogle/Circle";
import TipTap from "~/components/RichTextEditor/Tiptap";
import Link from "next/link";
import { OfferFilePreview } from "~/components/OfferFilePreview";

export default function OfferView({ params }: { params: { offerId: string } }) {
  const { offerId } = params;

  const { data } = trpc.offers.getById.useQuery(offerId);

  if (!data) {
    return <div>Loading...</div>;
  }

  const position = { lat: data.location.y, lng: data.location.x };

  return (
    <div className="container relative flex flex-1 flex-col justify-between gap-2 bg-neo-gray px-6 py-10 align-middle sm:w-9/12 sm:px-12 md:rounded-lg">
      <div className="flex w-full items-center justify-start">
        <Button variant="link" className="flex items-center gap-2 px-0">
          <ArrowLeftIcon className="size-6" />
          Cofnij
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Offer header */}
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-3xl font-bold leading-none">{data.name}</h1>
          <p className="flex text-lg text-muted-foreground">
            {data.shortDescription}
          </p>
        </div>

        {/* Offer location & price */}
        <APIProviderWrapper>
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-2">
                <DollarSign className="size-8 text-neo-dark-gray" />
                <span className="text-xl font-semibold">123123123 zł</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="size-8 text-neo-dark-gray" />
                <span className="text-lg">Gdańsk</span>
              </div>
            </div>
            <div className="h-full w-full overflow-hidden rounded-md max-lg:aspect-[21/9]">
              <Map
                defaultCenter={position}
                defaultZoom={10}
                gestureHandling={"greedy"}
                streetViewControl={false}
                mapId="OFFER_MAP"
              >
                {data.distance > 0 && (
                  <Circle
                    radius={data.distance * 1000} // m to km
                    center={position}
                    strokeColor={"#0c4cb3"}
                    strokeOpacity={1}
                    strokeWeight={3}
                    fillColor={"#3b82f6"}
                    fillOpacity={0.3}
                  />
                )}
                <AdvancedMarker position={position} />
              </Map>
            </div>
          </div>
        </APIProviderWrapper>
      </div>

      <Card className="w-full">
        <CardContent className="space-y-6 pt-6">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Główny opis</h2>
            <TipTap
              placeholder=""
              charLimit={1}
              content={data.longDescription}
              toolbarActive={false}
              editable={false}
            />
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Tagi</h2>
            <div className="flex flex-wrap gap-2">
              {data.offerTags?.map((el) => <Tag key={el.id}>{el.name}</Tag>)}
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Galeria</h2>
            <div className="flex flex-wrap gap-4">
              {data.files?.map((file, index) => (
                <OfferFilePreview key={index} file={file} />
              ))}
            </div>
            {data.files?.length === 0 && (
              <div className="flex h-36 w-full items-center justify-center rounded-md bg-gray-200">
                <span className="text-gray-400">Brak zdjęć</span>
              </div>
            )}
          </div>

          <div className="flex w-full justify-start md:justify-end">
            <Link href={`/chat/${data.users.id}`}>
              <Button className="flex gap-2" size="lg" variant="secondary">
                <Image
                  src={data.users.image!}
                  alt={data.users.name!}
                  width={40}
                  height={40}
                  className="overflow-hidden rounded-full"
                />
                <span className="text-lg">Skontaktuj się</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
