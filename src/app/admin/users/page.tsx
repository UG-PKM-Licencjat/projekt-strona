"use client";

import { useEffect, useState } from "react";
import { trpc } from "../../_trpc/client";

export default function AdminPanel() {
  const [users, setUsers] = useState<
    {
      id: string;
      name: string | null;
      email: string;
      emailVerified: string | null;
      image: string | null;
    }[]
  >([]);

  const { data: getUsers, refetch } = trpc.getUsers.useQuery();
  const addUsers = trpc.addUsers.useMutation();

  // TODO: useMemo?
  useEffect(() => {
    const fetchUsers = async () => {
      if (getUsers && getUsers.length > 0) {
        console.log("Fetched users");
        setUsers(getUsers);
      } else {
        console.log("No users fetched");
        await addUsers.mutateAsync();
        const refetchedUsers = await refetch();
        setUsers(refetchedUsers.data!);
        console.log("Refetched users ", refetchedUsers.data);
      }
    };

    void fetchUsers();
  }, []);

  if (!users || users.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {users.map((user) => (
        <p key={user.id}>
          {user.id} - {user.name} - {user.email}
        </p>
      ))}
    </div>
  );
}
