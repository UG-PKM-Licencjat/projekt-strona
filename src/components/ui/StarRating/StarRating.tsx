"use client";
import React, { useEffect, useState } from "react";
import { Icon } from "../Icon/Icon";

export const StarRating = ({
  currentRating,
  maxRating = 5,
  editable = false,
  onChange,
}: {
  currentRating: number;
  maxRating?: number;
  editable?: boolean;
  onChange?: (rating: number) => void;
}) => {
  if (currentRating > maxRating) {
    currentRating = maxRating;
  }
  // TODO maybe add number rating display
  const [stars, setStars] = useState(Math.round(currentRating));

  useEffect(() => {
    if (onChange) {
      onChange(stars);
    }
  }, [stars, onChange]);

  const changeScore = (score: number) => {
    setStars(score);
    // TODO add api call etc
  };

  if (!editable) {
    return (
      <div className="flex items-center justify-center rounded-full bg-gray-800 p-2">
        <div className="flex flex-row items-center">
          <div className="h-8 w-2" />
          {Array.from({ length: maxRating }, (_, index) => (
            <Icon
              key={index}
              name="star"
              className={`size-8 stroke-none ${index < stars ? "fill-yellow-500" : "fill-gray-300"}`}
            />
          ))}
          <div className="h-8 w-2"></div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex items-center justify-center rounded-full bg-gray-800 p-2">
        <div className="flex flex-row items-center">
          <div className="h-8 w-2" onClick={() => changeScore(0)} />
          {Array.from({ length: maxRating }, (_, index) => (
            <Icon
              key={index}
              name="star"
              className={`size-8 stroke-none ${index < stars ? "fill-yellow-500" : "fill-gray-300"}`}
              onClick={() => changeScore(index + 1)}
            />
          ))}
          <div className="h-8 w-2"></div>
        </div>
      </div>
    );
  }
};
