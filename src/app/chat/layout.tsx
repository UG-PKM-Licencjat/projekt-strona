export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-10">
      <div id="contact-list w-1/4">
        <div id="list"></div>
        <button>+</button>
      </div>
      <main>{children}</main>
    </div>
  );
}
