import type { Meta, StoryObj } from "@storybook/react";
import SkeletonCard from "./SkeletonCard";

const meta = {
  title: "Components/SkeletonCard",
  component: SkeletonCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SkeletonCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-52">
      <SkeletonCard />
    </div>
  ),
};
