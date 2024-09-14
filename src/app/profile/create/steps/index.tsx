import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import { type IconType } from "~/components/ui/SvgSymbols/SvgSymbols";

export const steps: {
  title: string;
  description: string;
  content: React.ReactNode;
  icon: IconType;
}[] = [
  {
    title: "Opisz siebie",
    description: "Lorem ipsum kurwa nie wiem co tu dać xDD",
    content: <Step1 />,
    icon: "user",
  },
  {
    title: "Galeria",
    description: "Mama powiedziała mi: „nie ufaj im”",
    content: <Step2 />,
    icon: "user",
  },
  {
    title: "Linki",
    description: "Posłuchaj, mama chce dobrze",
    content: <Step3 />,
    icon: "user",
  },
  {
    title: "Miasto i cena",
    description: "Mama powiedziała mi: „nie ufaj”",
    content: <Step3 />,
    icon: "user",
  },
  {
    title: "Podsumowanie",
    description: "Się nie wygłupiaj na miarę ich potrzeb",
    content: <Step3 />,
    icon: "user",
  },
];
