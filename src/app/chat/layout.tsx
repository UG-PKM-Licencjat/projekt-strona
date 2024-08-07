export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // we should fetch the messages from the server
  return (
    <div className="flex gap-10">
      <div id="contact-list w-1/4">
        {/* <ConversationsNav usersWithMessages={[]} clickAction={() => {}} /> */}
      </div>
      <main>{children}</main>
    </div>
  );
}
