import { useState } from "react";
import { type Session } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { Icon } from "../ui/Icon/Icon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

interface UserMenuProps {
  session: Session;
}

const UserMenu = ({ session }: UserMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
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
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{session.user.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link
            href="/profile"
            className="flex cursor-pointer items-center gap-2"
          >
            <Icon name="user" className="size-5" />
            Profil
          </Link>
        </DropdownMenuItem>
        {session.user?.admin && (
          <DropdownMenuItem asChild>
            <Link
              href="/admin"
              className="flex cursor-pointer items-center gap-2"
            >
              <Icon name="shield" className="size-5" />
              Panel Administratora
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem asChild>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex w-full cursor-pointer items-center gap-2"
          >
            <Icon name="logout" className="size-5" />
            Wyloguj się
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

    // <div className="relative">
    //   <button
    //     onClick={toggleMenu}
    //     className="flex items-center focus:outline-none"
    //   >
    //     <User />
    //   </button>

    //   {isMenuOpen && (
    //     <div className="absolute right-0 z-50 mt-2 w-48 rounded-md bg-white shadow-lg">
    //       <ul className="py-2">
    //         <li>
    //           <Link
    //             href="/profile"
    //             className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
    //           >
    //             Profil
    //           </Link>
    //         </li>
    //         {session.user?.admin && (
    //           <li>
    //             <Link
    //               href="/admin"
    //               className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
    //             >
    //               Panel Administratora
    //             </Link>
    //           </li>
    //         )}
    //         <li>
    //           <button
    //             onClick={() => signOut({ callbackUrl: "/" })}
    //             className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
    //           >
    //             Wyloguj
    //           </button>
    //         </li>
    //       </ul>
    //     </div>
    //   )}
    // </div>
  );
};

export default UserMenu;
