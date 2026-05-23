import {
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react";

const serverUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3500";

export const UploadButton = generateUploadButton({
  url: `${serverUrl}/api/resume/uploadthing`,
});

export const UploadDropzone = generateUploadDropzone({
  url: `${serverUrl}/api/resume/uploadthing`,
});

export const ProfileImageUploadButton = generateUploadButton({
  url: `${serverUrl}/api/profile/uploadthing`,
});

export const EducationFileUploadButton = generateUploadButton({
  url: `${serverUrl}/api/education/uploadthing`,
});

export const ExperienceFileUploadButton = generateUploadButton({
  url: `${serverUrl}/api/experiences/uploadthing`,
});

export const ProjectImageUploadButton = generateUploadButton({
  url: `${serverUrl}/api/projects/uploadthing`,
});
