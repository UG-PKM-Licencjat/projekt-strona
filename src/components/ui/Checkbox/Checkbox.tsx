"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { Label } from "../label";

import { cn } from "~/lib/utils";

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & {
    id: string | number;
  }
>(({ className, children, ...props }, ref) => (
  <Label
    htmlFor={props.id}
    className="flex min-h-16 cursor-pointer items-center gap-6 rounded-lg bg-neo-gray px-6 py-2 tracking-wide text-black ring ring-inset ring-transparent drop-shadow-md transition-all has-[button[aria-checked=true]]:ring-neo-pink"
  >
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(
        "peer size-9 shrink-0 rounded bg-neo-pink/30 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-neo-pink data-[state=checked]:text-neo-gray",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className={cn("flex items-center justify-center text-current")}
      >
        <Check className="size-7 stroke-neo-gray stroke-[4]" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
    {children}
  </Label>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
