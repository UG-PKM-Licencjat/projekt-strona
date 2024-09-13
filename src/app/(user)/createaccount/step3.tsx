import { Button } from "~/components/ui/Button/Button";
import { Icon } from "~/components/ui/Icon/Icon";
import { Link } from "lucide-react";

export default function Step3() {

  return (
    <>
      <div className="mb-6 h-4 w-auto self-start rounded-lg bg-secondary md:bg-neo-castleton">
        <div className="w-3/3 h-4 self-start rounded-lg bg-neo-pink"></div>
      </div>
      <div
        className="h-full grid-cols-3 gap-20 2xl:grid
      "
      >
        <div className="col-start-1 col-end-2 flex h-full flex-col items-center justify-center 2xl:items-start ">
          <h1 className="mb-5 w-full text-center font-header text-2xl font-medium leading-none  text-primary 2xl:text-left">
            To już{" "}
            <span className="text-neo-mantis  md:text-neo-castleton ">
              wszystko!
            </span>
          </h1>
          <p className="text-center font-body text-lg tracking-wide text-neo-gray md:text-neo-dark-gray 2xl:text-left">
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
          <Button
            className="mt-10 w-min justify-center 2xl:w-auto"
           
          >
            <Link href="/">Przejdź do strony głównej</Link>
          </Button>
        </div>
        <div className="col-start-2 col-end-4 hidden h-max 2xl:block">
          <Icon name="forest" width="1000" height="1000" />
        </div>
      </div>
    </>
  );
}
