import { getServerAuthSession } from "~/server/auth";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();
  if (!session) {
    redirect("/");
  }
  return (
    <div className="flex flex-1 flex-col bg-neo-castleton">
      <div className="flex flex-1 sm:p-20">{children}</div>
    </div>
  );
}
