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
import { BrushIcon } from "lucide-react";

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
          <AvatarFallback className="uppercase">
            {session.user.firstName[0]}
            {session.user.lastName[0]}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel className="max-w-60 break-words">
          {session.user.firstName} {session.user.lastName}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {session.user.registered && (
          <>
            <DropdownMenuItem asChild>
              <Link
                href="/profile"
                className="flex cursor-pointer items-center gap-2"
              >
                <Icon name="user" className="size-5" />
                Profil
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href={
                  session.user.isArtist ? "/profile/edit" : "/profile/create"
                }
                className="flex cursor-pointer items-center gap-2"
              >
                <BrushIcon className="size-5" />
                {session.user.isArtist
                  ? "Edytuj profil artysty"
                  : "Stwórz profil artysty"}
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
          </>
        )}
        {!session.user.registered && (
          <DropdownMenuItem asChild>
            <Link
              href="/createaccount"
              className="flex cursor-pointer items-center gap-2"
            >
              <Icon name="user" className="size-5" />
              Dokończ tworzenie profilu
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
  );
};

export default UserMenu;
