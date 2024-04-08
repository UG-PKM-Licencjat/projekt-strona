import React from "react";

interface TagProps {
  /**
   * zawartość Taga
   */
  label: string;
}

/**
 * Tag opisujący profil użytkownika bądź ofertę
 */
export const Tag = ({ label }: TagProps) => {
  return (
    <div className="flex h-10 items-center rounded-lg bg-purple-400 px-4 font-normal text-white">
      {label}
    </div>
  );
};
