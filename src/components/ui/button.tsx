import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "~/utils/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap tracking-wider text-lg rounded-lg font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        secondary:
          "bg-neo-castleton text-neo-gray hover:bg-neo-castleton-hover",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-2 border-neo-pink bg-transparent text-neo-pink hover:bg-neo-pink hover:text-neo-gray",
        default: "bg-neo-pink text-neo-gray hover:bg-neo-pink-hover",
        ghost: "hover:bg-black/20 hover:text-black",
        link: "text-neo-castleton underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-11 px-8 text-base rounded-md",
        md: "h-14 px-8",
        lg: "h-16 px-11",
        icon: "size-14",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
