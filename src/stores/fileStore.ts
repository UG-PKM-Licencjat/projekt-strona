import { type SetStateAction } from "react";
import { create } from "zustand";
import { type CustomFile } from "~/components/uploadthing";

export type PreviewFile = {
  url: string;
  key: string;
  name: string;
  type: string;
};

interface FileStore<T> {
  touched: boolean;
  files: T;
  previewFiles: PreviewFile[];
  setFiles: (action: SetStateAction<T>) => void;
  setPreviewFiles: (action: SetStateAction<PreviewFile[]>) => void;
  removeFile: (fileKey: string) => void;
  clearFiles: () => void;
}

export const useFileStore = create<FileStore<CustomFile[]>>((set) => ({
  touched: false,
  files: [],
  previewFiles: [],
  setFiles: (newState) =>
    set((store) => {
      const newFiles = (
        typeof newState === "function" ? newState(store.files) : newState
      ).slice(0, 5 - store.previewFiles.length);
      const newPreviewFiles = newFiles.map((file) => ({
        url: file.url,
        key: file.key,
        name: file.name,
        type: file.type,
      }));
      return {
        touched: true,
        files: newFiles,
        previewFiles: [...store.previewFiles, ...newPreviewFiles],
      };
    }),
  setPreviewFiles: (newState) =>
    set((store) => {
      const newPreviewFiles =
        typeof newState === "function"
          ? newState(store.previewFiles)
          : newState;
      return {
        touched: true,
        previewFiles: newPreviewFiles,
      };
    }),
  removeFile: (fileKey) =>
    set((store) => {
      const newFiles = store.files.filter((file) => file.key !== fileKey);
      const newPreviewFiles = store.previewFiles.filter(
        (file) => file.key !== fileKey,
      );
      return {
        touched: true,
        files: newFiles,
        previewFiles: newPreviewFiles,
      };
    }),
  clearFiles: () =>
    set(() => {
      return {
        touched: false,
        files: [],
        previewFiles: [],
      };
    }),
}));
