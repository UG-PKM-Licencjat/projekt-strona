import React from "react";
import { Icon } from "~/components/ui/Icon/Icon";

export default function OfferLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="fixed bottom-10 right-10 cursor-pointer rounded-full bg-primary p-4">
        <Icon
          name="message-square"
          className="size-8 stroke-primary-foreground"
        />
      </div>
      {children}
    </div>
  );
}
