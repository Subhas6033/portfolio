import mongoose from "mongoose";

const profileImageSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  imageName: { type: String, default: "" },
  fileKey: { type: String, default: "" },
}, { timestamps: true });

profileImageSchema.pre("save", async function (next) {
  if (this.isNew) {
    await this.constructor.deleteMany({ _id: { $ne: this._id } });
  }
  next();
});

export const ProfileImage = mongoose.model('ProfileImage', profileImageSchema);