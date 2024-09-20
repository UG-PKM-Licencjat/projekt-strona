"use client";

import { Button } from "~/components/ui/Button/Button";
import Image from "next/image";
import forest from "public/svg/forest.svg";
import forestmini from "public/svg/forestmini.svg";
import { useRouter } from "next/navigation";

export default function Step3() {
  const router = useRouter();

  const onClick = () => {
    router.push("/");
    router.refresh();
  };
  return (
    <>
      <div className="mb-6 h-4 w-auto self-start rounded-lg bg-secondary md:bg-neo-castleton">
        <div className="w-3/3 h-4 self-start rounded-lg bg-neo-pink"></div>
      </div>
      <div className="h-full w-full grid-cols-3 gap-20 xl:grid">
        <div className="col-start-1 col-end-2 flex flex-col items-center justify-center xl:items-start">
          <h1 className="mb-5 w-full text-center font-header text-2xl font-medium leading-none text-primary xl:text-left">
            To już{" "}
            <span className="text-neo-mantis md:text-neo-castleton">
              wszystko!
            </span>
          </h1>
          <p className="text-center font-body text-lg tracking-wide text-neo-gray md:text-neo-dark-gray xl:text-left">
            Teraz możesz korzystać z serwisu Bebop
          </p>
          <div className="h-max w-max md:hidden">
            <Image
              className="flex justify-center"
              src={forestmini}
              alt="forest mini"
            />
          </div>
          <Button
            className="mt-10 w-min justify-center xl:w-auto"
            onClick={onClick}
          >
            Przejdź do strony głównej
          </Button>
        </div>
        <div className="fle col-start-2 col-end-4 hidden h-full items-end xl:flex">
          <Image
            src={forest}
            alt="forest"
            className="mb-10 ml-20 hidden w-4/6 object-contain xl:block"
          />
        </div>
      </div>
    </>
  );
}
