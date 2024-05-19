"use client";

import { trpc } from "../../_trpc/client";

export default function AdminPanel() {
  const users = trpc.getUsers.useQuery();

  if (!users.data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {users.data.map((user) => (
        <p key={user}>{user}</p>
      ))}
    </div>
  );
}
