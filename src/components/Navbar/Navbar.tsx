import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Icon } from "../ui/Icon/Icon";
import { signIn, useSession } from "next-auth/react";
import UserMenu from "./UserMenu";
import { usePathname } from "next/navigation";
import SkeletonCard from "~/components/ui/SkeletonCard/SkeletonCard";
import { NavbarLink } from "./NavbarLink";
import { MobileNavLink } from "./MobileNavLink";
import { cn } from "~/lib/utils";

const filterList: Array<string> = [];

export const Navbar = () => {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const direction = useScrollDirection();

  if (filterList.includes(pathname)) return <></>;

  return (
    <>
      <nav className="sticky top-0 z-50 flex bg-neo-castleton max-sm:hidden">
        <div className="container flex-col p-4 text-white">
          <div className="flex flex-row items-center justify-between">
            <Link href="/">
              <Icon name="logo" className="h-[50px]" viewBox="0 0 151 44" />
            </Link>
            <div className="flex items-center gap-6">
              <NavbarLink href="/offers" icon="magnifier">
                <span className="hidden sm:flex">Szukaj</span>
              </NavbarLink>
              {session && (
                <>
                  <NavbarLink href="/chat" icon="message-square">
                    Chat
                  </NavbarLink>
                  <UserMenu session={session} />
                </>
              )}
              {!session && status === "loading" && (
                <>
                  <SkeletonCard className="h-5 w-44 rounded" />
                </>
              )}
              {!session && status === "unauthenticated" && (
                <button
                  className="flex items-center gap-2 rounded-full bg-neo-gray px-4 py-2.5 font-semibold text-neo-castleton shadow-md transition-colors hover:bg-neo-gray-hover"
                  onClick={() => signIn("google")}
                >
                  <Icon name="google" className="size-6 stroke-none" />
                  Zaloguj się przez Google
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
      <nav
        className={cn(
          "fixed bottom-0 z-50 flex w-full items-center justify-center transition-transform sm:hidden",
          direction === "down" && "translate-y-[200%]",
        )}
      >
        <div className="flex w-full items-center justify-around bg-neo-castleton p-4">
          <MobileNavLink href="/">
            <Icon name="home" className="size-10" />
          </MobileNavLink>
          <MobileNavLink href="/offers">
            <Icon name="magnifier" className="size-10" />
          </MobileNavLink>
          <Icon name="user" className="size-10 text-neo-gray" />
        </div>
      </nav>
    </>
  );
};

function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<"up" | "down" | null>(
    null,
  );

  useEffect(() => {
    let lastScrollY = window.scrollY;
    // function to run on scroll
    const updateScrollDirection = () => {
      const scrollY = window.scrollY;
      const direction = scrollY > lastScrollY ? "down" : "up";
      if (direction !== scrollDirection) {
        setScrollDirection(direction);
      }
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };
    window.addEventListener("scroll", updateScrollDirection); // add event listener
    return () => {
      window.removeEventListener("scroll", updateScrollDirection); // clean up
    };
  }, [scrollDirection]); // run when scroll direction changes

  return scrollDirection;
}
