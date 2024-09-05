import React, { useEffect } from "react";
import { cn } from "~/utils/cn";

export default function SkeletonCard() {
  const colors = ["bg-neo-pink", "bg-neo-castleton", "bg-neo-sage"];

  const random = Math.floor(Math.random() * colors.length);
  const color = colors[random];

  return <div className={cn("h-40 rounded-lg", color)}></div>;
}
