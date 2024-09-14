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
    title: "Galeria",
    description:
      "Każdy artysta powinien mieć swoje portfolio. Dodaj tutaj zdjęcia i filmy, którymi chcesz się pochwalić w swojej ofercie.",
    content: <Step3 />,
    icon: "user",
  },
  {
    title: "Tytuł i opis",
    description:
      "W tym miejscu uzupełnij tytuł swojej działaności i krótki opis, który pozwoli zrozumieć szukającemu, czym się zajmujesz i co oferujesz. Tytuł powinien jak najlepiej opisywać to czym się zajmujesz, w celu łatwiejszego znalezienia. Ten tytuł i opis są tym co wyświetli się w wynikach wyszukiwarki, więc dobrze zastanów się co chcesz w nich zawrzeć.",
    content: <Step1 />,
    icon: "user",
  },
  {
    title: "Tagi",
    description:
      "Następnym krokiem jest wybór tagów. Tagi to słowa klucze, które jeszcze bardziej usprawniają wyszukiwanie ofert. Dodaj ich kilka, aby ułatwić szukającym dotarcie do twojej oferty!",
    content: <Step2 />,
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
