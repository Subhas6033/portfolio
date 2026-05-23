import { Resume } from "../Models/Resume.models.js";
import { asyncHandeler, ApiResponse, ApiError } from "../Utils/index.js";

const getResume = asyncHandeler(async (req, res) => {
  let resume = await Resume.findOne().sort({ createdAt: -1 });

  if (!resume) {
    resume = await Resume.create({ resumeUrl: "" });
  }

  return res.status(200).json(new ApiResponse(200, resume));
});

const updateResume = asyncHandeler(async (req, res) => {
  const { resumeUrl } = req.body;

  if (!resumeUrl) {
    throw new ApiError(400, "Resume URL is required");
  }

  let resume = await Resume.findOne();

  if (resume) {
    resume.resumeUrl = resumeUrl;
    await resume.save();
  } else {
    resume = await Resume.create({ resumeUrl });
  }

  return res.status(200).json(new ApiResponse(200, resume, "Resume updated"));
});

export { getResume, updateResume };