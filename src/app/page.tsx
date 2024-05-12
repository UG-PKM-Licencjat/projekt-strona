import React from "react";
import { SearchEngine } from "~/components/searchEngine/SearchEngine";
import { Button } from "~/components/ui/Button/Button";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <header className="flex h-[500px] justify-between bg-pink-700">
        <div className="flex h-full w-3/5 flex-col justify-around pl-20">
          <h1 className="text-4xl text-white">ARTYŚCI-APKA</h1>
          <SearchEngine />
        </div>
        <div
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 20% 100%)",
          }}
          className="h-full w-fit"
        >
          <Image
            src="/img/kontrabas.jpg"
            className="hidden object-cover lg:block"
            height={500}
            width={600}
            alt="zdjęcie kontrabasisty grającego koncert"
          />
        </div>
      </header>
      <main className="mt-5">
        <section className="flex gap-52 bg-white p-10">
          <div className="flex w-1/2 flex-col items-center justify-around gap-7">
            <h1 className="text-4xl">Kim jesteśmy?</h1>
            <p className="text-center">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
              voluptatibus, quia, quae quod, fugiat quas quos aperiam doloribus
              nemo doloremque autem. Quisquam voluptatibus, quia, quae quod,
              fugiat quas quos aperiam doloribus nemo doloremque autem. Quisquam
              voluptatibus, quia, quae quod, fugiat quas quos aperiam doloribus
              nemo doloremque autem. Quisquam voluptatibus, quia, quae quod,
              fugiat quas quos aperiam doloribus nemo doloremque autem.
            </p>
          </div>
          <div className="flex w-1/2 flex-col items-center justify-around gap-7">
            <h1 className="text-4xl">Dołącz do nas</h1>
            <div className="flex justify-around gap-24">
              <Button>Zaloguj się</Button>
              <Button>Zarejestruj się</Button>
            </div>
          </div>
        </section>
        <section className="bg-gray-100 p-10">
          <div className="flex flex-col justify-around gap-7">
            <h2 className="text-2xl">Nasze cele</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
              voluptatibus, quia, quae quod, fugiat quas quos aperiam doloribus
              nemo doloremque autem. Quisquam voluptatibus, quia, quae quod,
              fugiat quas quos aperiam doloribus nemo doloremque autem. Quisquam
              voluptatibus, quia, quae quod, fugiat quas quos aperiam doloribus
              nemo doloremque autem. Quisquam voluptatibus, quia, quae quod,
              fugiat quas quos aperiam doloribus nemo doloremque autem.
            </p>
          </div>
        </section>
        <section className="bg-white p-10">
          <div className="flex flex-col justify-around gap-7">
            <h2 className="text-2xl">Nasza misja</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
              voluptatibus, quia, quae quod, fugiat quas quos aperiam doloribus
              nemo doloremque autem. Quisquam voluptatibus, quia, quae quod, fug
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
