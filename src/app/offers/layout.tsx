export default function OfferLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex h-screen flex-col">{children}</div>;
}
