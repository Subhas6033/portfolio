import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    mobileNumber: {
      type: String,
      required: true,
      unique: true,
      match: [/^\d{10}$/, "Please enter a valid 10-digit mobile number"],
    },
    subject: {
      type: String,
      required: Boolean,
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      min: [50, "Minimum 50 character is required"],
      max: [250, "You reach your character limits"],
    },
  },
  { timestamps: true }
);

export const Contact = mongoose.model("Contact", contactSchema);
