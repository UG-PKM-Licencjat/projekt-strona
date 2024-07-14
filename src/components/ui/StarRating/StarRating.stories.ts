import type { Meta, StoryObj } from "@storybook/react";
import { StarRating } from ".";

const meta = {
  title: "Components/UI/StarRating",
  component: StarRating,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof StarRating>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    currentRating: 3,
    maxRating: 5,
    editable: true,
  },
};
