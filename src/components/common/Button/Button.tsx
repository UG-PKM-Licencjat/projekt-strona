import React from "react";
import { cn } from "~/utils/cn";
import { type VariantProps, cva } from "class-variance-authority";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  onClick?: () => void;
}
const buttonVariants = cva(
  "rounded-md border-2 border-transparent transition duration-200 text-center",
  {
    variants: {
      variant: {
        primary:
          "bg-violet-900 text-white hover:bg-white hover:border-violet-900 hover:text-violet-900",
        secondary:
          "bg-blue-950 text-white hover:bg-white hover:border-blue-950 hover:text-blue-950",
        outline:
          "bg-transparent text-violet-900 border-violet-900 hover:bg-violet-900 hover:text-white",
        error:
          "bg-orange-500 text-white hover:bg-white hover:border-orange-500 hover:text-orange-500",
        success:
          "bg-green-900 text-white hover:bg-white hover:border-green-900 hover:text-green-900",
        warning:
          "bg-amber-500 text-white hover:bg-white hover:border-amber-500 hover:text-amber-500",
      },
      size: {
        sm: "h-[32px] w-[96px] text-sm",
        md: "h-[44px] w-[132px] text-base",
        lg: "h-[60px] w-[160px] text-xl",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

export { Button };
