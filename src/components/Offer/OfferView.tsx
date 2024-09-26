"use client";

import React from "react";
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
import { OfferFilePreview } from "~/components/Offer/OfferFilePreview";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { Icon } from "~/components/ui/Icon/Icon";

export type OfferData = {
  name: string;
  ratingsSum: number | null;
  votes: number | null;
  price: number;
  shortDescription: string;
  longDescription: string;
  locationName: string;
  location: {
    x: number;
    y: number;
  };
  distance: number;
  files:
    | {
        url: string;
        type: string;
      }[]
    | null;
  users: {
    id: string;
    image: string | null;
    name: string;
  };
  offerTags: {
    id: number;
    name: string;
  }[];
};

export default function OfferView({
  data,
  preview = false,
}: {
  data: OfferData;
  preview?: boolean;
}) {
  const router = useRouter();
  const { data: session } = useSession();

  const position = { lat: data.location.y, lng: data.location.x };

  return (
    <div className="container relative flex flex-1 flex-col justify-between gap-2 rounded-lg bg-neo-gray px-6 py-10 align-middle">
      <div className="flex w-full items-center justify-start">
        {!preview && (
          <Button
            variant="link"
            className="flex items-center gap-2 px-0"
            onClick={() => {
              router.back();
            }}
          >
            <ArrowLeftIcon className="size-6" />
            Cofnij
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Offer header */}
        <div className="flex flex-col items-center gap-2">
          <h1
            className="text-3xl font-bold leading-none"
            style={{ overflowWrap: "break-word", wordBreak: "break-word" }}
          >
            {data.name}
          </h1>
          <p
            className="flex text-lg text-muted-foreground"
            style={{ overflowWrap: "break-word", wordBreak: "break-word" }}
          >
            {data.shortDescription}
          </p>
        </div>

        {/* Offer location & price */}
        <APIProviderWrapper>
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-2">
                <DollarSign className="size-8 text-neo-dark-gray" />
                <span className="text-xl font-semibold">{data.price} zł</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="size-8 text-neo-dark-gray" />
                <span className="text-lg">{data.locationName}</span>
              </div>
            </div>
            <div className="h-full min-h-[200px] w-full overflow-hidden rounded-md max-lg:aspect-[21/9]">
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
            {(!data.files || data.files.length === 0) && (
              <div className="flex h-44 w-full items-center justify-center rounded-md bg-gray-200 max-sm:h-36">
                <span className="text-gray-400">Brak zdjęć</span>
              </div>
            )}
          </div>

          <div className="flex w-full justify-start md:justify-end">
            {session ? (
              preview ? (
                <Button className="flex gap-2" size="lg" variant="secondary">
                  {!data.users.image ? (
                    <div className="size-10 shrink-0 animate-pulse overflow-hidden rounded-full bg-neo-pink-hover"></div>
                  ) : (
                    <Image
                      src={data.users.image}
                      alt={data.users.name}
                      width={40}
                      height={40}
                      className="size-10 shrink-0 overflow-hidden rounded-full"
                    />
                  )}
                  <span className="text-lg">Skontaktuj się</span>
                </Button>
              ) : (
                <Link href={`/chat/${data.users.id}`}>
                  <Button className="flex gap-2" size="lg" variant="secondary">
                    {!data.users.image ? (
                      <div className="size-10 shrink-0 animate-pulse overflow-hidden rounded-full bg-neo-pink-hover"></div>
                    ) : (
                      <Image
                        src={data.users.image}
                        alt={data.users.name}
                        width={40}
                        height={40}
                        className="size-10 shrink-0 overflow-hidden rounded-full"
                      />
                    )}
                    <span className="text-lg">Skontaktuj się</span>
                  </Button>
                </Link>
              )
            ) : (
              <button
                className="flex items-center gap-4 rounded-full bg-neo-gray px-6 py-3.5 text-lg font-semibold text-black shadow-md transition-colors hover:bg-neo-gray-hover"
                onClick={() => signIn("google")}
              >
                <Icon name="google" className="size-8 stroke-none" />
                Zaloguj się aby móc się skontaktować
              </button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
