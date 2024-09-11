import React from "react";
import Link, { type LinkProps } from "next/link";
import { Icon } from "~/components/ui/Icon/Icon";
import type { IconType } from "~/components/ui/SvgSymbols/SvgSymbols";
import { usePathname } from "next/navigation";
import { cn } from "~/lib/utils";

export const NavbarLink = ({
  children,
  icon,
  ...props
}: {
  children: React.ReactNode;
  icon?: IconType;
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
        {!!icon && <Icon name={icon} className="size-6" />}
        {children}
      </div>
    </Link>
  );
};
