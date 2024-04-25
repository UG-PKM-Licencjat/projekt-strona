import React from "react";
import { SearchEngine } from "~/components/SearchEngine/SearchEngine";
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
          className="h-full w-2/5"
        >
          <Image
            src="/img/kontrabas.jpg"
            layout="fill"
            priority={true}
            alt="zdjęcie kontrabasisty grającego koncert"
          />
          {/* TODO naprawić to zdjęcie */}
        </div>
      </header>
      <main>
        <section className="flex bg-white p-10">
          {/* TODO: Popraw ten margines bo to nie może tak być xD  */}
          <div className="mt-6 flex w-1/2 flex-col items-center justify-around">
            <h2 className="text-2xl">O nas</h2>
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
          <div className="flex w-1/2 flex-col items-center justify-around ">
            <h2 className="text-2xl">Lets get started!</h2>
            <div className="flex w-3/4 justify-around">
              <Button>Zaloguj się</Button>
              <Button>Zarejestruj się</Button>
            </div>
          </div>
        </section>
        <section className="bg-gray-100 p-10">
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
        </section>
        <section className="bg-white p-10">
          <h2 className="text-2xl">Nasza misja</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            voluptatibus, quia, quae quod, fugiat quas quos aperiam doloribus
            nemo doloremque autem. Quisquam voluptatibus, quia, quae quod, fug
          </p>
        </section>
      </main>
    </>
  );
}
