import Image from "next/image";
import { useEffect } from "react";

export default function ConversationsNav({
  usersWithMessages,
  clickAction,
}: {
  usersWithMessages: Array<UserWithMessage>;
  clickAction: (user: UserWithMessage) => void;
}) {
  return (
    <div className="h-screen w-72 overflow-y-auto border-r border-gray-300 bg-gray-100">
      <ul className="m-0 list-none p-0">
        {usersWithMessages.map((user) => (
          <li
            key={user.userId}
            className="flex cursor-pointer items-center border-b border-gray-300 p-2 transition duration-300 hover:bg-gray-200"
            onClick={() => clickAction(user)}
          >
            <div className="flex items-center">
              {
                <img
                  src={user.image}
                  alt={user.name}
                  width={40}
                  height={40}
                  className="mr-3 h-10 w-10 rounded-full"
                />
              }
              <div className="flex flex-col">
                <p className="m-0 font-bold">{user.name}</p>
                <p className="m-0 text-sm text-gray-600">{user.lastMessage}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export interface UserWithMessage {
  userId: string;
  name: string;
  lastMessage: string;
  image: string;
}
