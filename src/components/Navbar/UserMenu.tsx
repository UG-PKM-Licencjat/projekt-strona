import { useState } from "react";
import { type Session } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { User } from "lucide-react";

interface UserMenuProps {
  session: Session;
}

const UserMenu = ({ session }: UserMenuProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="relative">
      <button
        onClick={toggleMenu}
        className="flex items-center focus:outline-none"
      >
        <User />
      </button>

      {isMenuOpen && (
        <div className="absolute right-0 z-50 mt-2 w-48 rounded-md bg-white shadow-lg">
          <ul className="py-2">
            <li>
              <Link
                href="/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Profil
              </Link>
            </li>
            {session.user?.admin && (
              <li>
                <Link
                  href="/admin"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Panel Administratora
                </Link>
              </li>
            )}
            <li>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
              >
                Wyloguj
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
