import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "src/components/ui/avatar";
import Link from "next/link";

// Placeholder - modify if needed

export const Navbar = () => (
  <div className="sticky top-0 z-50 flex w-full items-center justify-between bg-pink-700 px-10 py-4">
    <div className="flex items-center gap-8 font-semibold text-white">
      <Link href="/">Home</Link>
      <Link href="#">Offers</Link>
      <Link href="#">About</Link>
    </div>
    {/* TODO make this a dropdown? */}
    <Link href="#">
      <Avatar>
        {/* Placeholder image */}
        <AvatarImage
          src="https://utfs.io/f/2d3da5b8-2b91-40b1-801a-f17f936fd1e3-n92lk7.jpg"
          alt="avatar"
        />
        <AvatarFallback>XD</AvatarFallback>
      </Avatar>
    </Link>
  </div>
);
