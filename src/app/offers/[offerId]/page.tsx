"use client";

import React from "react";
import { trpc } from "~/trpc/react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Card, CardContent } from "~/components/ui/card";
import { Tag } from "~/components/Tag/Tag";
import { DollarSign, Mail, MapPin } from "lucide-react";
import { Button } from "~/components/ui/Button/Button";
import APIProviderWrapper from "~/components/LocationGoogle/APIProviderWrapper";
import { AdvancedMarker, Map } from "@vis.gl/react-google-maps";
import { Circle } from "~/components/LocationGoogle/Circle";
import TipTap from "~/components/RichTextEditor/Tiptap";

export default function OfferView({ params }: { params: { offerId: string } }) {
  const { offerId } = params;

  const { data } = trpc.offers.getById.useQuery(offerId);

  if (!data) {
    return <div>Loading...</div>;
  }

  const position = { lat: data.location.y, lng: data.location.x };

  return (
    <div className="container flex flex-1 flex-col justify-between gap-2 rounded-lg bg-transparent px-6 py-10 align-middle sm:w-9/12 sm:px-12 md:bg-neo-gray">
      <div className="flex justify-between">
        {/* Offer header */}
        <div className="flex items-center space-x-4">
          <Avatar className="h-32 w-32 border-4 border-white">
            <AvatarImage
              src="/placeholder-avatar.jpg"
              alt="Artist's profile picture"
            />
            <AvatarFallback>AP</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold">{data.name}</h1>
            <p className="flex text-lg text-muted-foreground">
              {data.shortDescription}
            </p>
          </div>
        </div>

        {/* Offer location & price */}
        <APIProviderWrapper>
          <div className="flex flex-col items-end justify-end space-y-4">
            <div className="flex items-center gap-2">
              <MapPin className="size-8 text-muted-foreground" />
              <span className="text-lg">Gdańsk</span>
            </div>
            <div className="h-[250px] w-[250px] overflow-hidden rounded-md">
              <Map
                defaultCenter={position}
                defaultZoom={8}
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
                <div
                  key={index}
                  className="flex aspect-square w-44 items-center justify-center rounded-md bg-gray-200"
                >
                  <span className="text-gray-400">Image {index}</span>
                </div>
              ))}
            </div>
            {data.files?.length === 0 && (
              <div className="flex h-36 w-full items-center justify-center rounded-md bg-gray-200">
                <span className="text-gray-400">Brak zdjęć</span>
              </div>
            )}
          </div>

          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-muted-foreground" />
              <span>123123123 zł</span>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-4 sm:flex-row">
            <Button className="w-full sm:w-auto">
              <Mail className="mr-2 h-4 w-4" />
              Kontakt
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
