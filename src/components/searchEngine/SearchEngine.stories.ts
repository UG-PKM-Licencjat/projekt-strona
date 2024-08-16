import type { Meta, StoryObj } from "@storybook/react";
import { SearchEngine } from "./SearchEngine";

const meta = {
  title: "Components/SearchEngine",
  component: SearchEngine,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SearchEngine>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
