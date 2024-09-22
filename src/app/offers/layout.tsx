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
  return (
    <div className="flex flex-1 flex-col bg-neo-castleton">
      <div className="flex flex-1 md:px-20 md:py-10">{children}</div>
    </div>
  );
}
