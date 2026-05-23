import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  period: { type: String, required: true },
  location: { type: String, default: "" },
  description: { type: String, required: true },
  fileUrl: { type: String, default: "" },
  fileName: { type: String, default: "" },
  fileKey: { type: String, default: "" },
  align: { type: String, enum: ['left', 'right'], default: 'left' }
}, { timestamps: true });

export const Experience = mongoose.model('Experience', experienceSchema);