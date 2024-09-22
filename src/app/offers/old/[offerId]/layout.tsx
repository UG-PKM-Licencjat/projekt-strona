import Link from "next/link";
import { redirect } from "next/navigation";
import { Icon } from "~/components/ui/Icon/Icon";

export default function OfferLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
