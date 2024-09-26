import { MapPin, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Tag } from "../Tag/Tag";

export interface Offer {
  id: string;
  name: string;
  ratingsSum: number | null;
  votes: number | null;
  price: number | null;
  shortDescription: string;
  locationName: string | null;
  distance: number | null;
  image: string | null;
  tags: string[];
}

const OfferCard = ({ offer }: { offer: Offer }) => (
  // console.log(tags);
  <div className="flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-md">
    <div className="flex h-full flex-col justify-between p-4">
      <div>
        <div className="mb-4 flex h-20 items-start justify-between">
          <Image
            src={offer.image ?? ""}
            alt={offer.name}
            width={100}
            height={100}
            sizes="100px"
            className="h-20 w-20 rounded-full border-2 border-neo-sea object-cover"
          />
          <div className="flex h-20 flex-1 flex-col items-end justify-between">
            {offer.price && (
              <div className="w-fit rounded-full bg-neo-castleton px-3 py-1 text-sm font-semibold text-white">
                {offer.price} zł
              </div>
            )}
          </div>
        </div>
        <div className="flex h-20 flex-row flex-wrap gap-2">
          {offer.tags.map((tag) => (
            <Tag
              className="h-fit w-max text-nowrap rounded bg-neo-mantis px-1.5 py-1 text-base"
              key={tag}
            >
              {tag}
            </Tag>
          ))}
        </div>
        <h3 className="mb-2 line-clamp-1 text-lg font-semibold text-neo-castleton">
          {offer.name}
        </h3>
        <p className="mb-4 line-clamp-2 text-sm text-neo-castleton">
          {offer.shortDescription}
        </p>
      </div>
      <div className="flex items-center justify-between text-sm text-neo-castleton">
        <div className="flex items-center gap-1">
          <MapPin size={14} />
          <span>
            {offer.locationName} +{offer.distance}km
          </span>
        </div>
        {offer.ratingsSum && offer.votes && (
          <div className="flex items-center gap-1">
            <Star size={14} className="text-neo-castleton" />
            <span>{(offer.ratingsSum / 2 / offer.votes).toFixed(1)}</span>
            {/* TODO: rating */}
          </div>
        )}
      </div>
    </div>
    <Link href={`/offers/${offer.id}`}>
      <div className="w-full bg-neo-castleton py-2 text-center text-white transition duration-300 hover:bg-neo-castleton-hover">
        Sprawdź
      </div>
    </Link>
  </div>
);

export default OfferCard;
