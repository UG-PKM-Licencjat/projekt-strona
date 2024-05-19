"use client";

import { trpc } from "../../_trpc/client";

export default function AdminPanel() {
  const hello = trpc.getHello.useQuery();

  if (!hello.data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p>{hello.data.greeting}</p>
    </div>
  );
}
