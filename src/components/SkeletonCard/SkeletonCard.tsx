import React, { useEffect, useMemo } from "react";
import { cn } from "~/utils/cn";

/**
 * Komponent reprezentujący szkielet karty z ofertą, który pojawia się podczas ładowania danych.
 */
export default function SkeletonCard() {
  const colors = useMemo(
    () => ["bg-neo-pink/50", "bg-neo-castleton/50", "bg-neo-sage/50"],
    [],
  );
  const [color, setColor] = React.useState(colors[0]);
  const [randomDelay, setRandomDelay] = React.useState(2);

  useEffect(() => {
    const random = Math.floor(Math.random() * colors.length);
    setColor(colors[random]);
    setRandomDelay(Math.random() * 2);
  }, [colors]);

  return (
    <div
      className={cn("h-40 animate-pulse rounded-lg", color)}
      style={{ animationDelay: `${randomDelay}s` }}
    ></div>
  );
}
