import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "~/components/ui/avatar";
import Link from "next/link";

// Placeholder - modify if needed

export const Navbar = () => (
  <div className="flex w-full items-center justify-between bg-pink-700 px-10 py-4">
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
          src="https://i.pinimg.com/736x/dc/e1/8e/dce18e21ab55156563e17affb71314fc.jpg"
          alt="avatar"
        />
        <AvatarFallback>XD</AvatarFallback>
      </Avatar>
    </Link>
  </div>
);
