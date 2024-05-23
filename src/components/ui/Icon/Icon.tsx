import React from "react";

interface IconProps {
  name: string;
  className?: string;
  fill?: string;
}

export const Icon = ({ name, className, fill }: IconProps) => (
  <svg className={`${className}`} fill={fill}>
    <use xlinkHref={`#${name}`} />
  </svg>
);
