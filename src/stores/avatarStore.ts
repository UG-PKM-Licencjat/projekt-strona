import { create } from "zustand";
import { uploadFiles } from "~/components/uploadthing";

interface AvatarStore {
  gotSessionImage: boolean;
  avatarUrl: string;
  avatar: File | undefined;
  avatarChanged: boolean;
  setAvatar: (avatar: File) => void;
  setAvatarUrl: (avatarUrl: string) => void;
  uploadAvatar: () => Promise<string | undefined>;
  clearAvatar: () => void;
}

export const useAvatarStore = create<AvatarStore>((set, get) => ({
  gotSessionImage: false,
  avatarUrl: "",
  avatar: undefined,
  avatarChanged: false,
  setAvatar: (avatar) =>
    set({
      avatar,
      avatarUrl: URL.createObjectURL(avatar),
      avatarChanged: true,
    }),
  setAvatarUrl: (avatarUrl) => set({ avatarUrl, gotSessionImage: true }),
  clearAvatar: () => set({ avatar: undefined, avatarChanged: false }),
  uploadAvatar: async () => {
    const avatar = get().avatar;
    if (!avatar) {
      set({ avatarChanged: false });
      return get().avatarUrl;
    }
    return uploadFiles("avatarUploader", {
      files: [avatar],
    })
      .then((uploadedFiles) => {
        if (!uploadedFiles) return;
        set({ avatarChanged: false });
        return uploadedFiles[0]?.url;
      })
      .catch((error) => {
        console.error(error);
        return undefined;
      });
  },
}));
