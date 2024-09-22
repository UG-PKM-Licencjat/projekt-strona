import Image from "next/image";
import notfound from "public/svg/notfound.svg";
import { Button } from "~/components/ui/Button/Button";
import Link from "next/link";

export default function Custom404() {
  return (
    <div className="mt-10 flex flex-col items-center justify-center px-4">
      <div className="text-center">
        <Image
          src={notfound}
          width={400}
          height={400}
          alt="404 Error Illustration"
          className="mx-auto mb-8"
        />
        <h1 className="mb-4 text-2xl font-bold text-gray-800 xl:text-3xl">
          Nie znaleźliśmy strony
        </h1>
        <p className="mb-8 text-lg text-gray-600 sm:text-xl">
          Przepraszamy, strona mogła zostać usunięta lub adres jest
          nieprawidłowy.
        </p>
        <Button className="bg-neo-pink px-4 py-2 font-bold text-white">
          <Link href="/">Wróć na stronę główną</Link>
        </Button>
      </div>
    </div>
  );
}
