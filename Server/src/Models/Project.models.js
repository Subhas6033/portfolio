import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  category: { type: String, required: true },
  imageURL: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  githubLink: { type: String, default: "" },
  liveLink: { type: String, default: "" }
}, { timestamps: true });

export const Project = mongoose.model('Project', projectSchema);