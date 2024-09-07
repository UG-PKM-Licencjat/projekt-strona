import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "src/components/ui/avatar";
import Link from "next/link";
import { Icon } from "../ui/Icon/Icon";
import { Button } from "../ui/Button/Button";
import { signIn } from "next-auth/react";

export const Navbar = () => (
  // <nav className="sticky top-0 z-50 flex w-full items-center justify-between bg-pink-700 px-10 py-4">
    /*{/* <div className="flex items-center gap-8 font-semibold text-white">
      <Link href="/">Home</Link>
      <Link href="#">Offers</Link>
      <Link href="#">About</Link>
    </div>
    <Link href="#">
      <Avatar>
        <AvatarImage
          src="https://utfs.io/f/2d3da5b8-2b91-40b1-801a-f17f936fd1e3-n92lk7.jpg"
          alt="avatar"
        />
        <AvatarFallback>XD</AvatarFallback>
      </Avatar>
    </Link>
  </nav>*/
  // TODO PRofile (logout), url ignore filter, chat, admin if admin, offers
  <div className="bg-neo-castleton text-white">
    <div className="container flex flex-col p-4">
      <div className="flex flex-row justify-between items-center">
        <Icon
          name="logo"
          className="h-[50px] max-md:h-7"
          viewBox="0 0 151 44"
        />
        <Button
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
        </Button>
      </div>
    </div>
  </div>
);
