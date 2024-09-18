import { SetStateAction } from "react";
import { create } from "zustand";
import { CustomFile } from "~/components/uploadthing";

interface FileStore<T> {
  touched: boolean;
  files: T;
  setFiles: (action: SetStateAction<T>) => void;
}

export const useFileStore = create<FileStore<CustomFile[]>>((set) => ({
  touched: false,
  files: [],
  setFiles: (newState) =>
    set((store) => ({
      touched: true,
      files: typeof newState === "function" ? newState(store.files) : newState,
    })),
}));
