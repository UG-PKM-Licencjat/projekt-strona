import { MapPin, Star } from "lucide-react";
import Image from "next/image";

export interface Artist {
  id: number;
  name: string;
  professions: string[];
  description: string;
  priceRange: string;
  cities: string[];
  rating: number;
  imageUrl: string;
}

const ArtistCard = ({ artist }: { artist: Artist }) => (
  <div className="overflow-hidden rounded-lg bg-[#f0e4d7] shadow-md">
    <div className="p-4">
      <div className="mb-4 flex items-start justify-between">
        <img
          src={artist.imageUrl}
          alt={artist.name}
          className="h-20 w-20 rounded-full border-2 border-[#5f8d4e] object-cover"
        />
        <div className="rounded-full bg-[#5f8d4e] px-3 py-1 text-sm font-semibold text-[#f0e4d7]">
          {artist.priceRange}
        </div>
      </div>
      <h3 className="mb-2 text-lg font-semibold text-[#2d6a4f]">
        {artist.name}
      </h3>
      <div className="mb-3 flex flex-wrap gap-2">
        {artist.professions.map((profession, index) => (
          <span
            key={index}
            className="rounded-full bg-[#97b085] px-2 py-1 text-xs text-[#f0e4d7]"
          >
            {profession}
          </span>
        ))}
      </div>
      <p className="mb-4 line-clamp-2 text-sm text-[#4a6741]">
        {artist.description}
      </p>
      <div className="flex items-center justify-between text-sm text-[#2d6a4f]">
        <div className="flex items-center gap-1">
          <MapPin size={14} />
          <span>{artist.cities.join(", ")}</span>
        </div>
        <div className="flex items-center gap-1">
          <Star size={14} className="text-[#97b085]" />
          <span>{artist.rating}</span>
        </div>
      </div>
    </div>
    <button className="w-full bg-[#2d6a4f] py-2 text-[#f0e4d7] transition duration-300 hover:bg-[#4a6741]">
      View Profile
    </button>
  </div>
);

export default ArtistCard;
