"use client";
import { Button } from "~/components/ui/Button/Button";
import { useRouter } from "next/navigation";
import { Checkbox } from "~/components/ui/Checkbox/Checkbox";
import { Label } from "~/components/ui/label";
export default function Step2() {
  const router = useRouter();
  return (
    <>
      <div className="md:bg-neo-castleton mb-6 h-4 w-auto self-start rounded-lg bg-secondary">
        {/*  TODO with of progress bar responsiveness or not? */}
        <div className="bg-neo-pink h-4 w-2/3 self-start rounded-lg"></div>
      </div>
      <div className="col flex h-full">
        <div className="flex h-full w-full flex-col justify-between pb-10 ">
          <div>
            <div>
              <h1 className="font-header mb-4   self-start text-start text-2xl font-medium leading-none text-primary">
                Czy jesteś
                <br className="sm:hidden" />
                <span className="md:text-neo-castleton text-neo-mantis">
                  {" "}
                  artystą?
                </span>
              </h1>
              <p className=" text-neo-dark-gray ">
                Wiemy, że w każdym drzemie artysta
              </p>
            </div>

            <div className="  flex flex-col justify-between gap-5 pt-10">
              <Checkbox id="artist">
                <div className=" ">Tak, chcę się reklamować na Bebopl</div>
              </Checkbox>
              <Checkbox id="artist2">
                Nie, chcę tylko przeglądać oferty{" "}
              </Checkbox>
            </div>
          </div>

          <div className=" flex flex-col  justify-between gap-5 sm:flex-row ">
            <Button className="sm:w-1/2" variant={"outline"}>
              Wróć
            </Button>
            <Button
              className="sm:w-1/2"
              onClick={() => router.push("/createaccount/step2/step3")}
            >
              Zakończ
            </Button>
          </div>
        </div>
        <div className=" hidden h-full w-full justify-end xl:block ">
          <div className="h-full pb-10">
            <img
              src="/svgs/illustration2.svg"
              className="ml-20 hidden h-full  w-3/4 object-cover xl:block"
            />
          </div>
        </div>
      </div>
    </>
  );
}
