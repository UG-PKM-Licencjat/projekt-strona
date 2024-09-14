import { MapPin, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export interface Offer {
  id: string;
  name: string;
  price: number | null;
  about: string | null;
  skills: unknown;
  files: unknown;
  links: unknown;
  location: string | null;
}

const OfferCard = ({ offer }: { offer: Offer }) => (
  <div className="overflow-hidden rounded-lg bg-[#f0e4d7] shadow-md">
    <div className="p-4">
      <div className="mb-4 flex items-start justify-between">
        <img
          src="https://picsum.photos/200/300"
          alt={offer.name}
          className="h-20 w-20 rounded-full border-2 border-[#5f8d4e] object-cover"
        />
        {offer.price && (
          <div className="rounded-full bg-[#5f8d4e] px-3 py-1 text-sm font-semibold text-[#f0e4d7]">
            {offer.price} zł
          </div>
        )}
      </div>
      <h3 className="mb-2 text-lg font-semibold text-[#2d6a4f]">
        {offer.name}
      </h3>
      <p className="mb-4 line-clamp-2 text-sm text-[#4a6741]">{offer.about}</p>
      <div className="flex items-center justify-between text-sm text-[#2d6a4f]">
        <div className="flex items-center gap-1">
          <MapPin size={14} />
          <span>{offer.location}</span>
        </div>
        <div className="flex items-center gap-1">
          <Star size={14} className="text-[#97b085]" />
          <span>5.0</span>
          {/* TODO: rating */}
        </div>
      </div>
    </div>
    <Link href={`/offers/${offer.id}`}>
      <div className="w-full bg-[#2d6a4f] py-2 text-center text-[#f0e4d7] transition duration-300 hover:bg-[#4a6741]">
        Sprawdź
      </div>
    </Link>
  </div>
);

export default OfferCard;
