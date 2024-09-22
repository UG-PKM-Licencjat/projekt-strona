"use client";

import { Button } from "src/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import error500 from "public/svg/error500.svg";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mt-10 flex flex-col items-center justify-center px-4">
      <div className="text-center">
        <Image
          src={error500}
          width={400}
          height={400}
          alt="404 Error Illustration"
          className="mx-auto mb-8"
        />
        <h1 className="mb-4 text-2xl font-bold text-gray-800 xl:text-3xl">
          Wystąpił błąd
        </h1>
        <p className="mb-8 text-lg text-gray-600 sm:text-xl">
          Przepraszamy, coś poszło nie tak. Spróbuj ponownie później.
        </p>
        <Button
          className="text-md rounded bg-neo-pink px-4 py-2 font-bold text-white transition duration-300"
          onClick={reset}
        >
          Odśwież stronę
        </Button>

        <Button className="text-md rounded bg-neo-pink px-4 py-2 font-bold text-white transition duration-300">
          <Link href="/">Wróć na stronę główną</Link>
        </Button>
      </div>
    </div>
  );
}
