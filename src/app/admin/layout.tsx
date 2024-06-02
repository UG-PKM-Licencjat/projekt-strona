"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { signOut } from "next-auth/react";
import { Button } from "~/components/ui/Button/Button";

import "~/styles/globals.css";

import Link from "next/link";
import { Icon } from "~/components/ui/Icon/Icon";
import { NavItem } from "./nav-item";

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
    <div lang="en" className="h-full bg-gray-50">
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
                <span className="">ACME</span>
              </Link>
            </div>
            <div className="flex-1 overflow-auto py-2">
              <nav className="grid items-start px-4 text-sm font-medium">
                <NavItem href="/">
                  <Icon name="users" className="h-4 w-4" />
                  Users
                </NavItem>
                <NavItem href="/settings">
                  <Icon name="settings" className="h-4 w-4" />
                  Settings
                </NavItem>
                <NavItem href="https://vercel.com/templates/next.js/admin-dashboard-tailwind-postgres-react-nextjs">
                  <Icon
                    name="logo"
                    className="h-4 w-4"
                    fill="currentColor"
                    stroke="none"
                  />
                  Deploy
                </NavItem>
                <Button
                  onClick={async () => {
                    await signOut({ callbackUrl: window.location.origin });
                  }}
                >
                  {" "}
                  Wyloguj się
                </Button>
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
