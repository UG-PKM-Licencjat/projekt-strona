import React from "react";

// TODO: check vids mapping for self-hosted videos/images or services other than youtube (?)

export const OfferSegment = ({
  heading,
  info,
  type = "list",
}: {
  heading: string;
  info?: string[];
  type?: "list" | "video" | "link";
}) => {
  return (
    <div className="flex flex-col items-start justify-center gap-[1.75rem]">
      <h1 className="text-4xl font-semibold uppercase text-slate-600">
        {heading}
      </h1>
      <div className="flex items-center justify-start divide-x divide-slate-600">
        {!info ? (
          <div className="border-l border-slate-600 pl-6 text-lg font-medium leading-snug text-slate-500">
            Brak informacji
          </div>
        ) : type === "list" ? (
          <>
            <div></div>
            <ul className="list-outside list-disc pl-12 font-medium leading-snug text-slate-500">
              {info.map((desc, index) => (
                <li key={index}>{desc}</li>
              ))}
            </ul>
          </>
        ) : type === "video" ? (
          <div className="flex gap-4">
            {info.map((link, index) => (
              <iframe
                width="352"
                height="198"
                src={link}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                key={index}
              ></iframe>
            ))}
          </div>
        ) : (
          <>
            <div></div>
            <ul className="list-outside list-disc pl-12 font-medium leading-snug text-slate-500">
              {info.map((link, index) => (
                <li key={index}>
                  <a href={link} target="_blank" rel="noreferrer">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};
