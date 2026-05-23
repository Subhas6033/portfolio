import { Experience } from "../Models/Experience.models.js";
import { asyncHandeler, ApiResponse, ApiError } from "../Utils/index.js";

const getExperiences = asyncHandeler(async (req, res) => {
  const experiences = await Experience.find().sort({ createdAt: -1 });
  return res.status(200).json(new ApiResponse(200, experiences));
});

const createExperience = asyncHandeler(async (req, res) => {
  const { title, company, period, location, description, align } = req.body;

  if (!title || !company || !period || !description) {
    throw new ApiError(400, "Title, company, period, and description are required");
  }

  const experience = await Experience.create({
    title, company, period, location, description, align
  });

  return res.status(201).json(new ApiResponse(201, experience, "Experience created"));
});

const updateExperience = asyncHandeler(async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  const experience = await Experience.findByIdAndUpdate(id, updates, { new: true });

  if (!experience) {
    throw new ApiError(404, "Experience not found");
  }

  return res.status(200).json(new ApiResponse(200, experience, "Experience updated"));
});

const deleteExperience = asyncHandeler(async (req, res) => {
  const { id } = req.params;

  const experience = await Experience.findByIdAndDelete(id);

  if (!experience) {
    throw new ApiError(404, "Experience not found");
  }

  return res.status(200).json(new ApiResponse(200, "Experience deleted"));
});

export { getExperiences, createExperience, updateExperience, deleteExperience };