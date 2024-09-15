import { Icon } from "~/components/ui/Icon/Icon";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="box-border flex h-full w-full flex-1 items-center justify-center overflow-y-auto bg-neo-castleton">
        <div className="rounded-xlg md:[@media(max-height:750px)]: w-full rounded-xl bg-none sm:h-5/6 sm:w-9/12 md:bg-neo-gray">
          <div className="w-full justify-between rounded-lg px-6 py-10 align-middle sm:px-12">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
