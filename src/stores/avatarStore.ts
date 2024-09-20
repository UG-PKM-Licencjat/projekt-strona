import { type ClientUploadedFileData } from "uploadthing/types";
import { create } from "zustand";
import { uploadFiles } from "~/components/uploadthing";

interface AvatarStore {
  gotSessionImage: boolean;
  avatarUrl: string;
  avatar: File | undefined;
  setAvatar: (avatar: File) => void;
  setAvatarUrl: (avatarUrl: string) => void;
  uploadAvatar: () => Promise<ClientUploadedFileData<null> | undefined>;
}

export const useAvatarStore = create<AvatarStore>((set, get) => ({
  gotSessionImage: false,
  avatarUrl: "",
  avatar: undefined,
  setAvatar: (avatar) =>
    set({ avatar, avatarUrl: URL.createObjectURL(avatar) }),
  setAvatarUrl: (avatarUrl) => set({ avatarUrl, gotSessionImage: true }),
  uploadAvatar: async () => {
    const avatar = get().avatar;
    if (!avatar) return undefined;
    return uploadFiles("avatarUploader", {
      files: [avatar],
    })
      .then((uploadedFiles) => {
        if (!uploadedFiles) return;
        return uploadedFiles[0];
      })
      .catch((error) => {
        console.error(error);
        return undefined;
      });
  },
}));
