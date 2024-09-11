import React from "react";
import { cn } from "src/utils/cn";

interface OfferProps {
  name: string;
  tags: string[];
  description: string;
  className?: string;
}

/**
 * Pojedyncza karta oferty
 */
export const Offer = ({ name, description, tags, className }: OfferProps) => (
  <div
    className={cn(
      "flex h-full max-h-[20rem] flex-col items-start justify-around gap-4 rounded-lg border-2 border-pink-700 bg-white px-8 py-8 shadow-md hover:bg-gray-100",
      className,
    )}
  >
    <div className="flex items-center justify-center gap-6">
      {/* Image placeholder */}
      <div className="h-24 w-24 flex-shrink-0 rounded-full bg-gray-200 bg-cover bg-center" />
      <div className="flex flex-col items-start justify-around">
        <div className="text-3xl font-bold uppercase text-blue-950">{name}</div>
        <p className="text-lg font-bold text-slate-600">placeholder</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <div
              key={index}
              className="cursor-pointer rounded bg-blue-900/60 px-3 py-[0.1rem] text-sm font-semibold text-white hover:bg-blue-900/40"
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    </div>
    <div className="flex flex-col items-start justify-start gap-2 overflow-y-clip">
      <h1 className="text-2xl font-semibold text-slate-500">O MNIE</h1>
      <div className="break-words font-semibold">{description}</div>
    </div>
  </div>
);
