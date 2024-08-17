import { Icon } from "~/components/ui/Icon/Icon";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="bg-neo-castleton  box-border h-full ">
        <div className=" flex  w-screen flex-row items-center justify-between font-bold sm:mb-5">
          <h1 className="ml-10 text-left  text-2xl text-primary">Bebooops</h1>
          <Icon
            className="mr-10  block sm:hidden"
            name="menu-bar"
            width={30}
            height={30}
          />
        </div>

        <div className="flex  w-screen items-center justify-center sm:h-5/6 ">
          <div className="md:bg-neo-gray rounded-xlg flex h-full  w-full justify-center overflow-auto rounded-xl  bg-none   sm:w-9/12">
            <div className="  h-full w-full justify-between  rounded-lg px-14 py-10 align-middle ">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
