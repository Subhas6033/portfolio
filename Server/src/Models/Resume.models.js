import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    resumeUrl: { type: String, default: "" },
    resumeFileName: { type: String, default: "" },

    // fileKey is the uploadthing unique identifier — needed to delete the
    // old file from uploadthing storage when a new resume is uploaded.
    fileKey: { type: String, default: "" },
  },
  { timestamps: true },
);

// Ensure only one resume document ever exists in the collection.
// Before saving a new resume, delete any existing ones so getResume()
// always returns the single latest record without needing a sort.
resumeSchema.pre("save", async function (next) {
  if (this.isNew) {
    await this.constructor.deleteMany({ _id: { $ne: this._id } });
  }
  next();
});

export const Resume = mongoose.model("Resume", resumeSchema);
