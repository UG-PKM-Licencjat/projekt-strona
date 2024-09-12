"use client";
import React from "react";
import { Icon } from "src/components/ui/Icon/Icon";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import SkeletonCard from "~/components/ui/SkeletonCard/SkeletonCard";
import { trpc } from "~/trpc/react";

export default function Home() {
  // // TO DO WHEN OFFERS FETCHING IS READY
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   if (isLoading) {
  //     const intervalId = setInterval(() => {
  //       // Symulacja zmiany stanu isLoading po pewnym czasie
  //       if (Math.random() > 0.8) {
  //         setIsLoading(false);
  //       }
  //     }, 1000); // Powtarzanie co 1 sekundę

  //     // Czyszczenie interwału po zmianie isLoading
  //     return () => clearInterval(intervalId);
  //   }
  // }, [isLoading]);

  const session = useSession();
  const getRegistationStep1 = trpc.user.getRegistationStep.useQuery();


  useEffect(() => {
    const url = window.location.href;
    if (session != null) {
      const step = getRegistationStep1.data
      console.log("step", step);

      // switch (step) {
      //  case 2:
      //     break;
      //   case 0:
      //     redirect(url + "/createaccount");
      //   case 1:
      //     redirect(url + "/createaccount");
       

      //   default:
      //     break;
      // }
    }
  }, [session]);

  return (
    <div className="min-h-screen bg-neo-castleton text-white">
      <header className="container flex h-[500px] flex-col pt-4">
        <div className="relative mx-10 flex flex-1 flex-col justify-center gap-10">
          <h1 className="ml-5 mt-4 text-5xl max-lg:text-4xl">
            Poczuj <span className="text-neo-sage">rytm...</span>
          </h1>
          <h2 className="mt-2 flex w-2/3 justify-end pl-10 text-4xl text-black max-lg:text-3xl">
            <span className="text-neo-sage">...</span>
            na weselu swojej babci
          </h2>
          <Icon
            className="absolute right-14 h-full max-md:hidden"
            name="girl-pointing"
            stroke="transparent"
            viewBox="0 0 204 410"
          />
        </div>
      </header>

      {/* Categories Section */}
      <section className="bg-white px-10 py-8 text-black">
        <div className="mx-auto max-w-4xl">
          <h4 className="mb-4 text-2xl font-bold">Kategorie</h4>
          <div className="grid grid-cols-2 gap-4 text-lg sm:grid-cols-3">
            <div>
              <h5 className="font-semibold">Muzyka</h5>
              <ul>
                <li>zespoły</li>
                <li>soliści</li>
                <li>reszta</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold">Performance</h5>
              <ul>
                <li>taniec</li>
                <li>magik</li>
                <li>kuglarz</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold">Rękodzieła</h5>
              <ul>
                <li>obrazy</li>
                <li>rzeźby</li>
                <li>portrety</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold">Wideo i fotografia</h5>
              <ul>
                <li>sesje zdjęciowe</li>
                <li>filmowcy</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold">Obróbka komputerowa</h5>
              <ul>
                <li>montowanie</li>
                <li>mix</li>
                <li>photoshop</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Promoted Offers Section */}
      <section className="bg-gray-100 px-10 py-8">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {[...Array<number>(9)].map((el, idx) => {
            return <SkeletonCard key={idx} className="h-40" randomColor />;
          })}
        </div>
      </section>
    </div>
  );
}
