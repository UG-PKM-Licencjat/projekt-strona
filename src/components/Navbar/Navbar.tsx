"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Icon } from "../ui/Icon/Icon";
import { signIn, signOut, useSession } from "next-auth/react";
import UserMenu from "./UserMenu";
import { usePathname } from "next/navigation";
import SkeletonCard from "~/components/ui/SkeletonCard/SkeletonCard";
import { NavbarLink } from "./NavbarLink";
import { MobileNavLink } from "./MobileNavLink";
import { cn } from "~/lib/utils";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/Button/Button";

const filterList: Array<string> = [];

export const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const closeDrawer = () => setDrawerOpen(false);
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
                  className="flex items-center gap-2 rounded-full bg-neo-gray px-4 py-2.5 font-semibold text-black shadow-md transition-colors hover:bg-neo-gray-hover"
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
          <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
            <DrawerTrigger>
              {!session && (
                <Icon name="user" className="size-10 text-neo-gray" />
              )}
              {session && (
                <Avatar>
                  <AvatarImage
                    src={session.user.image!}
                    alt={session.user.name!}
                    referrerPolicy="no-referrer"
                  />
                  <AvatarFallback>
                    {session.user.firstName[0]}
                    {session.user.lastName[0]}
                  </AvatarFallback>
                </Avatar>
              )}
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle className="font-header text-2xl text-black">
                  {session?.user.name}
                </DrawerTitle>
              </DrawerHeader>
              {!session && (
                <div className="flex items-center justify-center">
                  <button
                    className="flex items-center gap-4 rounded-full bg-neo-gray px-6 py-4 text-lg font-semibold text-black shadow-md transition-colors hover:bg-neo-gray-hover"
                    onClick={() => signIn("google")}
                  >
                    <Icon name="google" className="size-8 stroke-none" />
                    Zaloguj się przez Google
                  </button>
                </div>
              )}
              {session && (
                <div className="grid grid-cols-2 gap-4 p-8 text-xl font-semibold">
                  <Link
                    href="/profile"
                    onClick={closeDrawer}
                    className="flex aspect-square size-full flex-col items-center justify-center rounded-lg bg-neo-pink p-4 text-white"
                  >
                    <Icon name="user" className="size-14" />
                    Profil
                  </Link>
                  <Link
                    href="/chat"
                    onClick={closeDrawer}
                    className="flex aspect-square size-full flex-col items-center justify-center rounded-lg bg-neo-sage p-4 text-white"
                  >
                    <Icon name="message-square" className="size-14" />
                    Czat
                  </Link>

                  {session.user?.admin && (
                    <Link
                      href="/admin"
                      onClick={closeDrawer}
                      className="col-span-2 flex aspect-[2/1] size-full flex-col items-center justify-center rounded-lg bg-neo-mantis p-4 text-white"
                    >
                      <Icon name="shield" className="size-14" />
                      Panel Administratora
                    </Link>
                  )}
                </div>
              )}
              <DrawerFooter>
                <div className="flex items-center justify-around">
                  <DrawerClose>
                    <Button variant="ghost" className="text-black">
                      Zamknij
                    </Button>
                  </DrawerClose>
                  {session && (
                    <Button
                      onClick={() => signOut({ callbackUrl: "/" })}
                      variant="secondary"
                      className="flex items-center gap-2"
                    >
                      <Icon name="logout" className="size-8" />
                      Wyloguj się
                    </Button>
                  )}
                </div>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
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
