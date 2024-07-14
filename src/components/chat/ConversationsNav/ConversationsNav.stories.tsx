import type { Meta, StoryObj } from "@storybook/react";

import ConversationsNav from "./ConversationsNav";

const meta = {
  component: ConversationsNav,
} satisfies Meta<typeof ConversationsNav>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
