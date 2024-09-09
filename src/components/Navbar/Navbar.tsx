import React from "react";
import Link from "next/link";
import { Icon } from "../ui/Icon/Icon";
import { signIn, useSession } from "next-auth/react";
import UserMenu from "./UserMenu";
import { usePathname } from "next/navigation";
import SkeletonCard from "~/components/ui/SkeletonCard/SkeletonCard";
import { NavbarLink } from "./NavbarLink";

const filterList: Array<string> = [];

export const Navbar = () => {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  if (filterList.includes(pathname)) return <></>;

  return (
    <nav className="fixed z-50 w-full bg-neo-castleton max-sm:bottom-10 sm:sticky sm:top-0">
      <div className="container hidden flex-col p-4 text-white sm:flex">
        <div className="flex flex-row items-center justify-between">
          <Link href="/">
            <Icon
              name="logo"
              className="hidden sm:flex sm:h-[50px]"
              viewBox="0 0 151 44"
            />
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
  );
};
