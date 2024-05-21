export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div id="contact-list">
        <div id="list"></div>
        <button>+</button>
      </div>
      <main>{children}</main>
    </>
  );
}
