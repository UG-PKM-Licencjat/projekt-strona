import { Button } from "~/components/ui/Button/Button";
import { Icon } from "~/components/ui/Icon/Icon";

export default function Step3e() {
  return (
    <>
      <div className="md:bg-neo-castleton mb-6 h-4 w-auto self-start rounded-lg bg-secondary">
        {/*  TODO with of progress bar responsiveness or not? */}
        <div className="bg-neo-pink w-3/3 h-4 self-start rounded-lg"></div>
      </div>
      <div
        className="h-full grid-cols-3 gap-20 2xl:grid
      "
      >
        <div className="col-start-1 col-end-2 flex h-full flex-col items-center justify-center 2xl:items-start ">
          <h1 className="font-header mb-5 w-full text-center text-2xl font-medium leading-none  text-primary 2xl:text-left">
            To już{" "}
            <span className="md:text-neo-castleton  text-neo-mantis ">
              wszystko!
            </span>
          </h1>
          <p className="md:text-neo-dark-gray text-neo-gray font-body text-center text-lg tracking-wide 2xl:text-left">
            Teraz możesz korzystać z serwisu Bebop
          </p>
          <div className=" h-max w-max md:hidden ">
            <Icon
              className="flex justify-center"
              name="forestmini"
              fill="dfs"
              width="300"
              height="300"
            />
          </div>
          <Button className="mt-10 w-min justify-center 2xl:w-auto">
            Przejdź do strony głównej
          </Button>
        </div>
        <div className="col-start-2 col-end-4 hidden h-max 2xl:block">
          <Icon name="forest" width="1000" height="1000" />
        </div>
      </div>
    </>
  );
}
