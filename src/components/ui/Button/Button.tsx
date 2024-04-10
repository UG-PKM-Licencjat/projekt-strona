import React from "react";
import { cn } from "~/utils/cn";

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  variant?: "primary" | "secondary";
}

export const Button = ({ ...props }: ButtonProps) => {
  const { children, onClick, className, variant } = props;
  return (
    <button onClick={onClick} className={cn("", className)}>
      {children}
    </button>
  );
};

// stworzenie klas dla różnych buttonów i zastanowić się jak to zaimplementować, czy może zrobić custom klasy w tailwindzie?
