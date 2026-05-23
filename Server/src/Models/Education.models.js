import mongoose from "mongoose";

const educationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  institution: { type: String, required: true },
  period: { type: String, required: true },
  description: { type: String, default: "" },
  resultUrl: { type: String, default: "" },
  align: { type: String, enum: ['left', 'right'], default: 'left' }
}, { timestamps: true });

export const Education = mongoose.model('Education', educationSchema);