import { createUploadthing, type FileRouter } from "uploadthing/next";
// import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

// TODO add middleware and auth

// const auth = (req: Request) => ({ id: "fakeId" }); // Fake auth function

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  galleryUploader: f(
    {
      image: { maxFileCount: 5 },
      video: { maxFileCount: 5 },
    },
    {
      awaitServerData: false,
    },
  ).onUploadComplete(() => {
    console.log("Gallery uploaded");
  }),
  avatarUploader: f(
    {
      image: { maxFileCount: 1 },
    },
    {
      awaitServerData: false,
    },
  ).onUploadComplete(() => {
    console.log("Avatar uploaded");
  }),
  
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

export type FileRouterEndpoints = keyof OurFileRouter;
