"use client";

import { useEffect } from "react";
import { Button } from "src/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import error500 from "public/svg/error500.svg";
import { trpc } from "~/trpc/react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const log = trpc.clientLog.useMutation();

  useEffect(() => {
    log.mutate({
      message: error.message,
      additionalInfo: "error",
      tags: ["ERROR", "FRONTEND"],
    });
  }, []);

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
          Przepraszamy, coś poszło nie tak.
        </p>
        <div className="flex flex-col items-center gap-4">
          <Button
            className="text-md rounded bg-neo-sage px-4 py-2 font-bold text-white hover:bg-neo-sage-hover"
            onClick={reset}
          >
            Odśwież stronę
          </Button>

          <Button className="text-md rounded bg-neo-pink px-4 py-2 font-bold text-white hover:bg-neo-pink-hover">
            <Link href="/">Wróć na stronę główną</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
