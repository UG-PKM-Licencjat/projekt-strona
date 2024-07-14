import type { Meta, StoryObj } from "@storybook/react";
import { PreviewDropzone, type CustomFile, type ExpandedRouteConfig } from ".";
import type { SetStateAction } from "react";

// TODO figure out how to show files in the preview

let files: SetStateAction<CustomFile[]> = [];

const setFiles = (value: SetStateAction<CustomFile[]>) => {
  files = value;
};

const startUpload = (files: CustomFile[]) => {
  console.log("Uploading files", files);
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
    routeConfig,
    startUpload,
    isUploading: false,
    className: "",
    showUploadButton: true,
    disabled: false,
  },
};
