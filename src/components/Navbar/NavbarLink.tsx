import React from "react";
import Link, { type LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "~/lib/utils";

export const NavbarLink = ({
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
          "flex items-center gap-2 text-lg text-neo-gray transition-colors hover:text-neo-sage",
          pathname === props.href && "text-neo-sage",
        )}
      >
        {children}
      </div>
    </Link>
  );
};
