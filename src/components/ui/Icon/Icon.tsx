import React from "react"; // Path to your icons.svg

interface IconProps {
  name: string;
}

export const Icon = ({ name }: IconProps) => (
  <svg className="h-4 w-4" fill="#FFFFFF" width={50} height={50}>
    <use xlinkHref={`#${name}`} />
  </svg>
);
