import { Navbar } from "~/components/Offer/Navbar/Navbar";

export default function OfferLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col">
      <Navbar />
      {children}
    </div>
  );
}
