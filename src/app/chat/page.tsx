import Link from "next/link";
import { Button } from "~/components/ui/Button/Button";

export default function Chat() {
  return (
    <div className="flex w-full items-center justify-center">
      <div className="mx-auto max-w-lg rounded-xl bg-white p-8 shadow-lg">
        <h1 className="text-neo-green-dark mb-4 text-2xl font-semibold">
          Wybierz jedną z konwersacji
        </h1>
        <p className="mb-6 text-lg text-gray-600">
          Skontaktuj się z artystą poprzez oferty lub wybierz konwersację z
          panelu z boku.
        </p>
        <Link href="/search">
          <Button className="w-full">Wyszukaj ofertę</Button>
        </Link>
        <p className="mt-3 text-red-500">
          <strong>UWAGA</strong>
          <br />
          Serwis czatu korzysta z darmowego deployu w serwisie render. W
          przypadku nie używania serwisu deploy zostaje uśpiony i przy pierwszym
          użyciu potrzeba chwili na jego uruchomienie (~5min)
        </p>
      </div>
    </div>
  );
}
