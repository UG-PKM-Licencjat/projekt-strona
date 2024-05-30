import * as React from "react";

type DefaultProps = React.SVGProps<SVGSVGElement>;

interface IconProps extends DefaultProps {
  /**
   * Icon name
   */
  name: string;
  /**
   * Custom classes
   */
  className?: string;
  /**
   * Icon fill color
   */
  fill?: string;
  /**
   * Icon stroke width
   */
  strokeWidth?: string;
  /**
   * Icon stroke color
   */
  stroke?: string;
  strokeLinecap?: "round" | "butt" | "square" | "inherit" | undefined;
  strokeLinejoin?: "round" | "inherit" | "miter" | "bevel" | undefined;
  viewBox?: string;
  xmlns?: string;
}

export const Icon = ({
  name,
  className,
  fill = "none",
  strokeWidth = "2",
  stroke = "currentColor",
  strokeLinecap = "round",
  strokeLinejoin = "round",
  viewBox = "0 0 24 24",
  xmlns = "http://www.w3.org/2000/svg",
  ...props
}: IconProps) => (
  <svg
    className={`${className}`}
    fill={fill}
    strokeWidth={strokeWidth}
    stroke={stroke}
    strokeLinecap={strokeLinecap}
    strokeLinejoin={strokeLinejoin}
    viewBox={viewBox}
    xmlns={xmlns}
    {...props}
  >
    <use xlinkHref={`#${name}`} />
  </svg>
);
