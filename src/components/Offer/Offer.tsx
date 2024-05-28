import React from "react";

interface OfferProps {
  name: string;
  tags: string[];
  description: string;
}

export const Offer = ({ name, description, tags }: OfferProps) => (
  <div className="m-4 flex flex-col items-start justify-center gap-4 rounded-lg border-2 border-pink-700 px-10 py-6">
    <div className="flex items-center justify-center gap-6">
      {/* Image placeholder */}
      <div className="h-24 w-24 rounded-full bg-gray-200 bg-cover bg-center" />
      <div className="flex flex-col items-start justify-around">
        <div className="text-3xl font-bold uppercase text-slate-600">
          {name}
        </div>
        <p className=" font-bold text-slate-500">placeholder</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <div
              key={tag}
              className="cursor-pointer rounded bg-purple-400 px-2 py-[0.1rem] text-xs font-semibold text-white hover:bg-purple-500"
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    </div>
    <div>
      <h1 className="text-2xl font-semibold text-slate-500">O MNIE</h1>
      <div className="font-semibold">{description}</div>
    </div>
  </div>
);
