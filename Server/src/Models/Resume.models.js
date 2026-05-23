import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
  resumeUrl: { type: String, required: true }
}, { timestamps: true });

export const Resume = mongoose.model('Resume', resumeSchema);