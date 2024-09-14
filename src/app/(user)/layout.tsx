import { Icon } from "~/components/ui/Icon/Icon";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div
        className="box-border h-full overflow-visible bg-neo-castleton" //h-[calc(100vh-72px)] sm:h-[calc(100vh-82px)]
      >
        <div className="flex w-screen items-center justify-center sm:h-5/6">
          <div className="rounded-xlg flex h-full min-h-96 w-full justify-center rounded-xl bg-none sm:w-9/12 md:bg-neo-gray">
            <div className="h-full w-full justify-between rounded-lg px-6 py-10 align-middle sm:px-12">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
