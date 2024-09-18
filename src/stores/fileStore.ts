import { create } from "zustand";
import { CustomFile } from "~/components/uploadthing";
import { SetStateAction } from "react";

interface FileStore<T> {
  files: T;
  setFiles: (action: SetStateAction<T>) => void;
}

export const useFileStore = create<FileStore<CustomFile[]>>((set) => ({
  files: [],
  setFiles: (newState) =>
    set((store) => ({
      files: typeof newState === "function" ? newState(store.files) : newState,
    })),
}));
