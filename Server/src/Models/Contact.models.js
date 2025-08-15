import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      lowercase: false,
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
      match: [/^\d{10}$/, "Please enter a valid 10-digit mobile number"],
    },
    subject: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      minlength: [5, "Minimum 50 characters are required"],
      maxlength: [250, "You reached your character limit"],
    },
  },
  { timestamps: true }
);

export const Contact = mongoose.model("Contact", contactSchema);