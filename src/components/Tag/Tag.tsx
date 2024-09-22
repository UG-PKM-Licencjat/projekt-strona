import React from "react";
import { cn } from "~/lib/utils";

interface TagProps {
  /**
   * zawartość Taga
   */
  children: React.ReactNode;
  className?: string;
}

/**
 * Tag opisujący profil użytkownika bądź ofertę
 */
export const Tag = ({ children, className }: TagProps) => {
  return (
    <div
      className={cn(
        `flex h-10 select-none items-center rounded-md bg-neo-mantis px-4 font-normal text-white`,
        className,
      )}
    >
      {children}
    </div>
  );
};
