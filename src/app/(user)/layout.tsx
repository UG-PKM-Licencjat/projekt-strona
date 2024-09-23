export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex w-full flex-1 items-center justify-center bg-neo-castleton">
        <div className="w-full justify-between rounded-lg bg-transparent px-6 py-10 align-middle sm:w-9/12 sm:px-12 md:h-[700px] md:bg-neo-gray 2xl:h-[800px]">
          {children}
        </div>
      </div>
    </>
  );
}
