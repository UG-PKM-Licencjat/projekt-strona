"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { signOut } from "next-auth/react";
import { Button } from "~/components/common/Button/Button";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = useSession();
  if (!session) {
    redirect("/");
  }
  return (
    <>
      <nav>
        <a href="/">Home</a>
        <a href="/admin/users">Użytkownicy</a>
        <a href="/admin/posts">Ogłoszenia</a>
        <Button
          onClick={async () => {
            await signOut({ callbackUrl: window.location.origin });
          }}
        >
          {" "}
          Wyloguj się
        </Button>
      </nav>
      <main>{children}</main>
    </>
  );
}
