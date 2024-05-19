export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <nav>
        <a href="/">Home</a>
        <a href="/admin/users">Użytkownicy</a>
        <a href="/admin/posts">Ogłoszenia</a>
      </nav>
      <main>{children}</main>
    </>
  );
}
