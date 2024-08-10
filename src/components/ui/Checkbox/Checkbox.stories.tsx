import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Components/UI/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="grid gap-2">
      <Checkbox id="c1" checked>
        Tak, chcę się reklamować na Bebop
      </Checkbox>
      <Checkbox id="c2">Nie, chcę tylko przeglądać oferty</Checkbox>
    </div>
  ),
};
