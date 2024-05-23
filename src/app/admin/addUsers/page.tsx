"use client";

import { useEffect } from "react";
import { trpc } from "../../_trpc/client";

export default function AdminPanel() {
  const addUsers = trpc.addUsers.useMutation();

  useEffect(() => {
    const fetchUsers = async () => {
      await addUsers.mutateAsync();
    };

    void fetchUsers();
  }, []);

  return <div>szybkie dodawanie userów :{")"}</div>;
}
