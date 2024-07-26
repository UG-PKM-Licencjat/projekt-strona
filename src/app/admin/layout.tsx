"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { signOut } from "next-auth/react";
import { Button } from "src/components/ui/Button/Button";
import "~/styles/globals.css";

import Link from "next/link";
import { Icon } from "src/components/ui/Icon/Icon";
import { NavItem } from "./users/nav-item";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = useSession();
  if (!session) {
    redirect("/");
  }
  return (
    <div lang="en" className="h-full overflow-hidden bg-gray-50">
      <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
        <div className="hidden border-r bg-gray-100/40 dark:bg-gray-800/40 lg:block">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-[60px] items-center border-b px-5">
              <Link className="flex items-center gap-2 font-semibold" href="/">
                <Icon
                  name="logo"
                  className="h-6 w-6"
                  fill="currentColor"
                  stroke="none"
                />
                <span className="">Panel Admina</span>
              </Link>
            </div>
            <div className="flex-1 overflow-auto py-2">
              <nav className="grid items-start px-4 text-sm font-medium">
                <NavItem href="/admin/users">
                  <Icon name="users" className="h-4 w-4" strokeWidth="3" />
                  Użytkownicy
                </NavItem>
                <NavItem href="/admin/offers">
                  <Icon
                    name="badge-dollar-sign"
                    className="ml-[-3px] h-5 w-5"
                  />
                  Oferty
                </NavItem>
                <NavItem href="/admin/logs">
                  <Icon name="scroll-text" className="ml-[-3px] h-5 w-5" />
                  Logi
                </NavItem>
                <NavItem href="/admin/tags">
                  <Icon name="tags" className="h-5 w-5" />
                  Tagi
                </NavItem>
              </nav>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <header className="flex h-14 items-center justify-between gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40 lg:h-[60px] lg:justify-end">
            <Link
              className="flex items-center gap-2 font-semibold lg:hidden"
              href="/"
            >
              <Icon name="logo" className="h-6 w-6" />
              <span className="">ACME</span>
            </Link>
            {/* <User /> */}
          </header>
          {children}
        </div>
      </div>
    </div>
  );
}
