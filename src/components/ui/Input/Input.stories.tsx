import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";
import { Label } from "../label";

const meta = {
  title: "Components/UI/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Placeholder",
    type: "text",
  },
};

export const WithLabel: Story = {
  args: {
    placeholder: "Placeholder",
    type: "text",
  },
  render: (args) => (
    <div>
      <Label>Label</Label>
      <Input {...args} />
    </div>
  ),
};
