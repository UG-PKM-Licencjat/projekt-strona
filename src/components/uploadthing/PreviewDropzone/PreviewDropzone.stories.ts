import type { Meta, StoryObj } from "@storybook/react";
import type { SetStateAction } from "react";
import { PreviewDropzone } from ".";
import { type CustomFile, type ExpandedRouteConfig } from "../utils";

let files: SetStateAction<CustomFile[]> = [];

const setFiles = (value: SetStateAction<CustomFile[]>) => {
  files = value;
};

const removeFile = (fileKey: string) => {
  setFiles((prev) => prev.filter((f) => f.key !== fileKey));
};

const routeConfig = {
  image: {
    maxFileSize: "8MB",
    maxFileCount: 3,
  },
  video: {
    maxFileSize: "16MB",
    maxFileCount: 3,
  },
} satisfies ExpandedRouteConfig | undefined;

const meta = {
  title: "Components/PreviewDropzone",
  component: PreviewDropzone,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof PreviewDropzone>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    files,
    setFiles,
    removeFile,
    routeConfig,
    isUploading: false,
    className: "",
    showUploadButton: true,
    disabled: false,
  },
};
