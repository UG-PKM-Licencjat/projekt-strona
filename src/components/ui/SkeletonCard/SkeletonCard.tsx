import React, { useEffect } from "react";
import { cn } from "~/lib/utils";

const colors = [
  "bg-neo-pink/50",
  "bg-neo-castleton/50",
  "bg-neo-sage/50",
  "bg-neo-mantis/50",
];

/**
 * Komponent reprezentujący szkielet karty z ofertą, który pojawia się podczas ładowania danych.
 */
export default function SkeletonCard({
  randomColor = false,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  randomColor?: boolean;
}) {
  const [color, setColor] = React.useState(colors[0]);

  useEffect(() => {
    const random = Math.floor(Math.random() * colors.length);
    setColor(colors[random]);
  }, []);

  return (
    <div
      className={cn(
        "animate-pulse rounded-lg bg-neo-dark-gray",
        className,
        randomColor ? color : null,
      )}
      {...props}
    ></div>
  );
}
