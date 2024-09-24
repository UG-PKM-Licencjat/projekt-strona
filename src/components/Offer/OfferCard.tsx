import { MapPin, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export interface Offer {
  id: string;
  name: string;
  ratingsSum: number | null;
  votes: number | null;
  price: number | null;
  shortDescription: string;
  locationName: string | null;
  distance: number | null;
  users: {
    image: string | null;
  };
}

const OfferCard = ({ offer }: { offer: Offer }) => (
  <div className="flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-md">
    <div className="flex h-full flex-col justify-between p-4">
      <div>
        <div className="mb-4 flex items-start justify-between">
          <Image
            src={offer.users.image ?? ""}
            alt={offer.name}
            width={40}
            height={40}
            className="h-20 w-20 rounded-full border-2 border-[#5f8d4e] object-cover"
          />
          {offer.price && (
            <div className="rounded-full bg-neo-castleton px-3 py-1 text-sm font-semibold text-[#f0e4d7]">
              {offer.price} zł
            </div>
          )}
        </div>
        <h3 className="mb-2 text-lg font-semibold text-[#2d6a4f]">
          {offer.name}
        </h3>
        <p className="mb-4 line-clamp-2 text-sm text-[#4a6741]">
          {offer.shortDescription}
        </p>
      </div>
      <div className="flex items-center justify-between text-sm text-[#2d6a4f]">
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
