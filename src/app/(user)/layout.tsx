export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-neo-castleton box-border flex h-screen items-center justify-center">
      <div className="bg-neo-gray rounded-xlg flex  h-4/5 w-4/5 rounded-xl ">
        {children}
      </div>
    </div>
  );
}
