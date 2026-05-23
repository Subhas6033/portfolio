import { Resume } from "../Models/Resume.models.js";
import { asyncHandeler, ApiResponse, ApiError } from "../Utils/index.js";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

const getResume = asyncHandeler(async (req, res, next) => {
  const resume = await Resume.findOne().sort({ createdAt: -1 });

  if (!resume) {
    return res.status(404).json(new ApiResponse(404, null, "No resume found"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, resume, "Resume fetched successfully"));
});

const updateResume = asyncHandeler(async (req, res, next) => {
  // Guard against undefined req.body
  const body = req.body || {};
  const { url, name, key } = body;

  if (!url || !name || !key) {
    throw new ApiError(
      400,
      "Missing file data (url, name, key) in request body",
    );
  }

  // If a resume already exists, delete the old file from uploadthing
  const existing = await Resume.findOne();

  if (existing?.fileKey) {
    try {
      await utapi.deleteFiles(existing.fileKey);
      console.log("Deleted old resume from uploadthing:", existing.fileKey);
    } catch (err) {
      // Non-fatal — log and continue even if old file deletion fails
      console.warn("Could not delete old uploadthing file:", err.message);
    }
  }

  let resume;

  if (existing) {
    existing.resumeUrl = url;
    existing.resumeFileName = name;
    existing.fileKey = key;
    await existing.save();
    resume = existing;
  } else {
    resume = await Resume.create({
      resumeUrl: url,
      resumeFileName: name,
      fileKey: key,
    });
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        _id: resume._id,
        resumeUrl: resume.resumeUrl,
        resumeFileName: resume.resumeFileName,
        fileKey: resume.fileKey,
      },
      "Resume updated successfully",
    ),
  );
});

const deleteResume = asyncHandeler(async (req, res, next) => {
  const resume = await Resume.findOne();

  if (!resume) {
    throw new ApiError(404, "No resume found to delete");
  }

  // Delete from uploadthing
  if (resume.fileKey) {
    await utapi.deleteFiles(resume.fileKey);
  }

  await resume.deleteOne();

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Resume deleted successfully"));
});

export { getResume, updateResume, deleteResume };
