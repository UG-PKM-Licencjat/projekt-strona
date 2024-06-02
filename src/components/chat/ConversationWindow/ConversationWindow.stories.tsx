import type { Meta, StoryObj } from "@storybook/react";

import ConversationWindow from "./ConversationWindow";

const meta = {
  component: ConversationWindow,
} satisfies Meta<typeof ConversationWindow>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: [],
  },
};
