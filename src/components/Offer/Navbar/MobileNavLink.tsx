import React from "react";
import Link, { type LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "~/lib/utils";

export const MobileNavLink = ({
  children,
  ...props
}: {
  children: React.ReactNode;
} & LinkProps) => {
  const pathname = usePathname();

  return (
    <Link {...props}>
      <div
        className={cn(
          "text-neo-gray transition-colors",
          pathname === props.href && "text-neo-sage",
        )}
      >
        {children}
      </div>
    </Link>
  );
};
