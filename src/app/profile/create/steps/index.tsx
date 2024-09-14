import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Result from "./Result";
import { Tag, FileText, Images, Coins, BadgeCheck } from "lucide-react";
import React from "react";

export const steps: {
  title: string;
  description: string;
  content: React.ReactNode;
  icon: React.ReactNode;
}[] = [
  {
    title: "Tytuł i opis",
    description:
      "W tym miejscu uzupełnij tytuł swojej działaności i krótki opis, który pozwoli zrozumieć szukającemu, czym się zajmujesz i co oferujesz. Tytuł powinien jak najlepiej opisywać to czym się zajmujesz, w celu łatwiejszego znalezienia. Ten tytuł i opis są tym co wyświetli się w wynikach wyszukiwarki, więc dobrze zastanów się co chcesz w nich zawrzeć.",
    content: <Step1 />,
    icon: <FileText className="size-6 text-black" />,
  },
  {
    title: "Tagi",
    description:
      "Następnym krokiem jest wybór tagów. Tagi to słowa klucze, które jeszcze bardziej usprawniają wyszukiwanie ofert. Dodaj ich kilka, aby ułatwić szukającym dotarcie do twojej oferty!",
    content: <Step2 />,
    icon: <Tag className="size-6 text-black" />,
  },
  {
    title: "Galeria",
    description:
      "Każdy artysta powinien mieć swoje portfolio. Dodaj tutaj zdjęcia i filmy, którymi chcesz się pochwalić w swojej ofercie.",
    content: <Step3 />,
    icon: <Images className="size-6 text-black" />,
  },
  {
    title: "Miasto i cena",
    description:
      "Ostatnim krokiem jest ustalenie lokalizacji i ceny. Wybierz obszar swojego działania i orientacyjną cenę usługi, aby szukający mógł zorientować się czy stać go na twoje usługi 😉",
    content: <Step4 />,
    icon: <Coins className="size-6 text-black" />,
  },
  {
    title: "Podsumowanie",
    description:
      "Sprawdź czy jesteś zadowolony z widoku oferty. Masz możliwość powrócić do wcześniej uzupełnianych sekcji i poprawić to co Twoim zdaniem nie pasuje. Jeżeli wszystko wygląda dobrze, to to już koniec. Zapisz stworzone widoki i pozostaje czekać na kontakt od szukających 😄",
    content: <Result />,
    icon: <BadgeCheck className="size-6 text-black" />,
  },
];
