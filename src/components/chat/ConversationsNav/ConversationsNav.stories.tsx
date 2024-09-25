import type { Meta, StoryObj } from "@storybook/react";

import ConversationsNav, { type UserWithMessage } from "./ConversationsNav";

const meta = {
  component: ConversationsNav,
} satisfies Meta<typeof ConversationsNav>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    usersWithMessages: [
      {
        unread: true,
        userId: "1",
        name: "John",
        lastMessage: "Hello",
        image: "https://picsum.photos/200",
      },
    ],
    clickAction: (user: UserWithMessage) => console.log(user),
  },
};
