import React from "react";
import { cn } from "~/utils/cn";

interface ButtonProps {
  /*
   * Zawartość przycisku, wewnętrzny tekst i/lub ikona/y
   */
  children: React.ReactNode;
  /*
   * Funkcja wywoływana po kliknięciu przycisku
   */
  onClick: () => void;
  /*
   * Dodatkowe stylowanie tailwind dla przycisku
   */
  className?: string;
  /*
   * Wariant przycisku
   */
  variant?: "primary" | "secondary" | "ghost";
}

export const Button = ({ ...props }: ButtonProps) => {
  const { children, onClick, className, variant } = props;
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-md border-2 border-transparent bg-violet-900 px-8 py-2 text-white transition duration-200 hover:border-violet-900 hover:bg-white hover:text-violet-900",
        className,
      )}
    >
      {children}
    </button>
  );
};

// stworzenie klas dla różnych buttonów i zastanowić się jak to zaimplementować, czy może zrobić custom klasy w tailwindzie?
