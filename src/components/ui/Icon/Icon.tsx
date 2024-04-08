import React from "react";

interface IconProps {
  name: string;
  style?: string;
  fill?: string;
}

export const Icon = ({ name, style, fill }: IconProps) => (
  <svg className={`${style}`} fill={fill}>
    <use xlinkHref={`#${name}`} />
  </svg>
);
