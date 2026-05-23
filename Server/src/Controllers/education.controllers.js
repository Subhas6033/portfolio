import { Education } from "../Models/Education.models.js";
import { asyncHandeler, ApiResponse, ApiError } from "../Utils/index.js";

const getEducation = asyncHandeler(async (req, res) => {
  const education = await Education.find().sort({ createdAt: -1 });
  return res.status(200).json(new ApiResponse(200, education));
});

const createEducation = asyncHandeler(async (req, res) => {
  const { title, institution, period, description, resultUrl, align } = req.body;

  if (!title || !institution || !period) {
    throw new ApiError(400, "Title, institution, and period are required");
  }

  const education = await Education.create({
    title, institution, period, description, resultUrl, align
  });

  return res.status(201).json(new ApiResponse(201, education, "Education created"));
});

const updateEducation = asyncHandeler(async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  const education = await Education.findByIdAndUpdate(id, updates, { new: true });

  if (!education) {
    throw new ApiError(404, "Education not found");
  }

  return res.status(200).json(new ApiResponse(200, education, "Education updated"));
});

const deleteEducation = asyncHandeler(async (req, res) => {
  const { id } = req.params;

  const education = await Education.findByIdAndDelete(id);

  if (!education) {
    throw new ApiError(404, "Education not found");
  }

  return res.status(200).json(new ApiResponse(200, "Education deleted"));
});

export { getEducation, createEducation, updateEducation, deleteEducation };