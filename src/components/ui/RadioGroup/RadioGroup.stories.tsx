import type { Meta, StoryObj } from "@storybook/react";
import { RadioGroup, RadioGroupLabelItem } from "./RadioGroup";

const meta: Meta<typeof RadioGroup> = {
  title: "Components/UI/RadioGroup",
  component: RadioGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <RadioGroup>
      <RadioGroupLabelItem value="tak" id="r1">
        Tak, chcę się reklamować na Bebop
      </RadioGroupLabelItem>
      <RadioGroupLabelItem value="nie" id="r2">
        Nie, chcę tylko przeglądać oferty
      </RadioGroupLabelItem>
    </RadioGroup>
  ),
};
