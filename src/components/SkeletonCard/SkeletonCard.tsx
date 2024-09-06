import React, { useEffect } from "react";
import { cn } from "~/utils/cn";

/**
 * Komponent reprezentujący szkielet karty z ofertą, który pojawia się podczas ładowania danych.
 */
export default function SkeletonCard() {
  const colors = ["bg-neo-pink/50", "bg-neo-castleton/50", "bg-neo-sage/50"];

  const random = Math.floor(Math.random() * colors.length);
  const color = colors[random];

  const randomDelay = Math.random() * 2; // w sekundach

  return (
    <div
      className={cn("h-40 animate-pulse rounded-lg", color)}
      style={{ animationDelay: `${randomDelay}s` }}
    ></div>
  );
}
