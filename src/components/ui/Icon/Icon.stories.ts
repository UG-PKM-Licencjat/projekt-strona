import type { Meta, StoryObj } from "@storybook/react";
import { Icon } from "./Icon";

const meta: Meta<typeof Icon> = {
  title: "Components/UI/Icon",
  component: Icon,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    fill: {
      control: "color",
    },
    stroke: {
      control: "color",
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Magnifier: Story = {
  args: {
    name: "magnifier",
    className: "size-10",
    stroke: "#000000",
  },
};
