import React from "react";
import Link from "next/link";
import { Icon } from "../ui/Icon/Icon";
import { Button } from "../ui/Button/Button";
import { signIn, useSession } from "next-auth/react";
import { type Session } from "next-auth";
import UserMenu from "./UserMenu";
import { usePathname } from "next/navigation";

const filterList: Array<string> = []

export const Navbar = () => {
  const { data: session } = useSession();
  const pathname = usePathname()

  if (filterList.includes(pathname))
    return <></> 

  return <nav className="sticky top-0 z-50 bg-neo-castleton text-white">
    <div className="container flex flex-col p-4">
      <div className="flex flex-row justify-between items-center">
        <Link href="/">
          <Icon
            name="logo"
            className="h-[50px] max-md:h-7"
            viewBox="0 0 151 44"
          />
        </Link>
        {buildNavbarElements(session)}
      </div>
    </div>
  </nav>
};

const buildNavbarElements = (session: Session | null): JSX.Element => (
  <div className="flex gap-3">
    <Link href="/offers">Oferty</Link>
    {!session && <Button
      className="rounded-full bg-white px-4 py-2 text-green-900 shadow-md"
      variant={null}
      size="sm"
      onClick={() =>
        signIn("google", {
          callbackUrl: "http://localhost:3000",
        })
      }
    >
      Sign in with Google
    </Button>}
    {session &&
      <>
        <Link href="/chat">Wiadomości</Link>
        <div className="relative">
          <UserMenu session={session} />
        </div>
      </> 
    }
  </div>
)