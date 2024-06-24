import type { Meta, StoryObj } from "@storybook/react";

import ConversationWindow from "./ConversationWindow";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

const meta = {
  component: ConversationWindow,
  tags: ["autodocs"],
  decorators: [
    (Story) => {
      const session: Session = {
        user: {
          id: "1",
          admin: true,
        },
        expires: "2025-01-01T00:00:00.000Z",
      };
      return (
        <SessionProvider session={session}>
          <Story />
        </SessionProvider>
      );
    },
  ],
} satisfies Meta<typeof ConversationWindow>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: [
      {
        from: "1",
        to: "321",
        timestamp: "2021-03-30",
        message: "Hello",
      },
      {
        from: "321",
        to: "1",
        timestamp: "2021-03-31",
        message: "Hey",
      },
    ],
  },
};
