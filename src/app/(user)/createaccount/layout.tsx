import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();
  if (!session) {
    redirect("/");
  }
  const isRegistered = session?.user.registered;
  if (isRegistered) redirect("/");
  return <>{children}</>;
}
