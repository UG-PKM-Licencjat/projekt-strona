import React from "react";
import Link from "next/link";
import { Icon } from "../ui/Icon/Icon";
import { signIn, useSession } from "next-auth/react";
import { type Session } from "next-auth";
import UserMenu from "./UserMenu";
import { usePathname } from "next/navigation";

const filterList: Array<string> = [];

export const Navbar = () => {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  if (filterList.includes(pathname)) return <></>;

  return (
    <nav className="sticky top-0 z-50 bg-neo-castleton text-white">
      <div className="container flex flex-col p-4">
        <div className="flex flex-row items-center justify-between">
          <Link href="/">
            <Icon
              name="logo"
              className="h-[50px] max-md:h-7"
              viewBox="0 0 151 44"
            />
          </Link>
          {status}
          {buildNavbarElements(session)}
        </div>
      </div>
    </nav>
  );
};

const buildNavbarElements = (session: Session | null): JSX.Element => (
  <div className="flex items-center gap-3">
    <Link href="/offers">Oferty</Link>
    {!session && (
      <button
        className="flex items-center gap-2 rounded-full bg-neo-gray px-4 py-2.5 font-semibold text-neo-castleton shadow-md transition-colors hover:bg-neo-gray-hover"
        onClick={() => signIn("google")}
      >
        <Icon name="google" className="size-6 stroke-none" />
        Sign in with Google
      </button>
    )}
    {session && (
      <>
        <Link href="/chat">Wiadomości</Link>
        <div className="relative">
          <UserMenu session={session} />
        </div>
      </>
    )}
  </div>
);
