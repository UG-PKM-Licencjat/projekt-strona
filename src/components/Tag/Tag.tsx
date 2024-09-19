import React from "react";

interface TagProps {
  /**
   * zawartość Taga
   */
  label: string;
  className?: string;
  bgColor?: string;
}

/**
 * Tag opisujący profil użytkownika bądź ofertę
 */
export const Tag = ({ label, bgColor, className }: TagProps) => {
  const bg = bgColor ?? "bg-purple-400";
  const cl = className ?? "";
  return (
    <div
      className={`${cl} flex h-10 items-center rounded-lg ${bg} px-4 font-normal text-white`}
    >
      {label}
    </div>
  );
};
