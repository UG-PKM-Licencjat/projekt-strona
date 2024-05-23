"use client";

import { useEffect } from "react";
import { trpc } from "../../_trpc/client";
import { useRouter } from "next/navigation";

export default function AdminPanel() {
  const addUsers = trpc.addUsers.useMutation();
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      await addUsers.mutateAsync();
      setTimeout(() => {
        void router.push("/admin");
      }, 300);
    };

    void fetchUsers();
  }, []);

  return <div>szybkie dodawanie userów :{")"}</div>;
}
