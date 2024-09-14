import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import { type IconType } from "~/components/ui/SvgSymbols/SvgSymbols";

export const steps: {
  nav: string;
  title: string;
  description: string;
  content: React.ReactNode;
  icon: IconType;
}[] = [
  {
    nav: "Tytuł i opis",
    title: "Tytuł i opis",
    description:
      "W tym miejscu uzupełnij tytuł swojej działaności i krótki opis, który pozwoli zrozumieć szukającemu, czym się zajmujesz i co oferujesz. Tytuł powinien jak najlepiej opisywać to czym się zajmujesz, w celu łatwiejszego znalezienia. Ten tytuł i opis są tym co wyświetli się w wynikach wyszukiwarki, więc dobrze zastanów się co chcesz w nich zawrzeć.",
    content: <Step1 />,
    icon: "user",
  },
  {
    nav: "Galeria",
    title: "Galeria",
    description: "Mama powiedziała mi: „nie ufaj im”",
    content: <Step2 />,
    icon: "user",
  },
  {
    nav: "Linki",
    title: "Linki",
    description: "Posłuchaj, mama chce dobrze",
    content: <Step3 />,
    icon: "user",
  },
  {
    nav: "Miasto i cena",
    title: "Miasto i cena",
    description: "Mama powiedziała mi: „nie ufaj”",
    content: <Step3 />,
    icon: "user",
  },
  {
    nav: "Podsumowanie",
    title: "Podsumowanie",
    description: "Się nie wygłupiaj na miarę ich potrzeb",
    content: <Step3 />,
    icon: "user",
  },
];
