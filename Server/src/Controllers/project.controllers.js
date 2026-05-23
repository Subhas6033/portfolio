import { Project } from "../Models/Project.models.js";
import { asyncHandeler, ApiResponse, ApiError } from "../Utils/index.js";

const getProjects = asyncHandeler(async (req, res) => {
  const projects = await Project.find().sort({ createdAt: -1 });
  return res.status(200).json(new ApiResponse(200, projects));
});

const createProject = asyncHandeler(async (req, res) => {
  const { category, imageURL, title, description, githubLink, liveLink } = req.body;

  if (!category || !imageURL || !title || !description) {
    throw new ApiError(400, "Category, imageURL, title, and description are required");
  }

  const project = await Project.create({
    category, imageURL, title, description, githubLink, liveLink
  });

  return res.status(201).json(new ApiResponse(201, project, "Project created"));
});

const updateProject = asyncHandeler(async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  const project = await Project.findByIdAndUpdate(id, updates, { new: true });

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  return res.status(200).json(new ApiResponse(200, project, "Project updated"));
});

const deleteProject = asyncHandeler(async (req, res) => {
  const { id } = req.params;

  const project = await Project.findByIdAndDelete(id);

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  return res.status(200).json(new ApiResponse(200, "Project deleted"));
});

export { getProjects, createProject, updateProject, deleteProject };