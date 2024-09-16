import type { Meta, StoryObj } from "@storybook/react";
import { Navbar } from "./Navbar";
import type { Session } from "next-auth";

const meta = {
  title: "Components/Navbar",
  component: Navbar,
  tags: ["autodocs"],
} satisfies Meta<typeof Navbar>;

export default meta;

type Story = StoryObj<typeof meta>;

const mockSession: Session = {
  user: {
    id: "1",
    admin: false,
    firstName: "John",
    lastName: "Doe",
    name: "John Doe",
    email: "john@doe.com",
    image: "https://utfs.io/f/2d3da5b8-2b91-40b1-801a-f17f936fd1e3-n92lk7.jpg",
  },
  expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString(),
};

export const Default: Story = {
  args: {
    session: mockSession,
  }
};
