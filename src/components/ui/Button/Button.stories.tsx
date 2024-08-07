import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta = {
  title: "Components/UI/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  args: {
    children: "Button",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

const sizes = ["lg", "md", "sm"] as const;

export const Default: Story = {
  args: {
    variant: "default",
    children: "Default",
  },
  render: (args) => (
    <div className="flex items-center gap-2">
      {sizes.map((size) => (
        <Button size={size} key={size} {...args} />
      ))}
    </div>
  ),
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary",
  },
  render: (args) => (
    <div className="flex items-center gap-2">
      {sizes.map((size) => (
        <Button size={size} key={size} {...args} />
      ))}
    </div>
  ),
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Outline",
  },
  render: (args) => (
    <div className="flex items-center gap-2">
      {sizes.map((size) => (
        <Button size={size} key={size} {...args} />
      ))}
    </div>
  ),
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "Destructive",
  },
  render: (args) => (
    <div className="flex items-center gap-2">
      {sizes.map((size) => (
        <Button size={size} key={size} {...args} />
      ))}
    </div>
  ),
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Ghost",
  },
  render: (args) => (
    <div className="flex items-center gap-2">
      {sizes.map((size) => (
        <Button size={size} key={size} {...args} />
      ))}
    </div>
  ),
};

export const Link: Story = {
  args: {
    variant: "link",
    children: "Link",
  },
  render: (args) => (
    <div className="flex items-center gap-2">
      {sizes.map((size) => (
        <Button size={size} key={size} {...args} />
      ))}
    </div>
  ),
};
