import type { Meta, StoryObj } from "@storybook/react";
import { Offer } from "./Offer";

const meta = {
  title: "Components/Offer",
  component: Offer,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Offer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "IMIE NAZWISKO",
    tags: ["hashtag1", "hashtag2"],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
};
