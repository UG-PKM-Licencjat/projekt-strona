import type { Meta, StoryObj } from "@storybook/react";

import Message from "./Message";

const meta = {
  component: Message,
  tags: ["autodocs"],
} satisfies Meta<typeof Message>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: "text",
    isFromMe: true,
  },
};
