import React from "react";

interface TagProps {
  /**
   * zawartość Taga
   */
  label: string;
}

/**
 * Primary UI component for user interaction
 */
export const Tag = ({ label }: TagProps) => {
  return <div className="h-10 bg-purple-400 px-2 ">{label}</div>;
};
