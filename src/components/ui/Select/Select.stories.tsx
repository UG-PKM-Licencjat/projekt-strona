import type { Meta, StoryObj } from "@storybook/react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./Select";
import { Label } from "../label";

const meta = {
  title: "Components/UI/Select",
  component: Select,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[250px]">
        <SelectValue placeholder="Lokalizacja" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {[...Array(10).keys()].map((number) => (
            <SelectItem key={number} value={`${number}`}>
              Item {number}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <Select>
      <Label>Label</Label>
      <SelectTrigger className="w-[250px]">
        <SelectValue placeholder="Lokalizacja" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {[...Array(10).keys()].map((number) => (
            <SelectItem key={number} value={`${number}`}>
              Item {number}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};
