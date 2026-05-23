import { createUploadthing } from "uploadthing/express";

const f = createUploadthing({
  fetch: (...args) => fetch(...args),
});

export const uploadRouter = {
  resumeUploader: f({
    blob: {
      maxFileSize: "5MB",
      maxFileCount: 1,
    },
  })
    .middleware(({ req }) => {
      return { uploadedAt: new Date().toISOString() };
    })
    .onUploadComplete(({ metadata, file }) => {
      return {
        url: file.ufsUrl,
        name: file.name,
        size: file.size,
      };
    }),

  profileImageUploader: f({
    image: {
      maxFileSize: "2MB",
      maxFileCount: 1,
    },
  })
    .middleware(({ req }) => {
      return { uploadedAt: new Date().toISOString() };
    })
    .onUploadComplete(({ metadata, file }) => {
      return {
        url: file.ufsUrl,
        name: file.name,
        size: file.size,
      };
    }),

  educationFileUploader: f({
    blob: {
      maxFileSize: "5MB",
      maxFileCount: 1,
    },
  })
    .middleware(({ req }) => {
      return { uploadedAt: new Date().toISOString() };
    })
    .onUploadComplete(({ metadata, file }) => {
      return {
        url: file.ufsUrl,
        name: file.name,
        size: file.size,
      };
    }),

  experienceFileUploader: f({
    blob: {
      maxFileSize: "5MB",
      maxFileCount: 1,
    },
  })
    .middleware(({ req }) => {
      return { uploadedAt: new Date().toISOString() };
    })
    .onUploadComplete(({ metadata, file }) => {
      return {
        url: file.ufsUrl,
        name: file.name,
        size: file.size,
      };
    }),

  projectImageUploader: f({
    image: {
      maxFileSize: "2MB",
      maxFileCount: 1,
    },
  })
    .middleware(({ req }) => {
      return { uploadedAt: new Date().toISOString() };
    })
    .onUploadComplete(({ metadata, file }) => {
      return {
        url: file.ufsUrl,
        name: file.name,
        size: file.size,
      };
    }),
};
