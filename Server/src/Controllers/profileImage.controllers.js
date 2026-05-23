import { ProfileImage } from "../Models/ProfileImage.models.js";
import { asyncHandeler, ApiResponse, ApiError } from "../Utils/index.js";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

const getProfileImage = asyncHandeler(async (req, res) => {
  const profileImage = await ProfileImage.findOne().sort({ createdAt: -1 });

  if (!profileImage) {
    return res.status(200).json(new ApiResponse(200, null, "No profile image found"));
  }

  return res.status(200).json(new ApiResponse(200, profileImage));
});

const updateProfileImage = asyncHandeler(async (req, res) => {
  const body = req.body || {};
  const { url, name, key } = body;

  if (!url || !name || !key) {
    throw new ApiError(400, "Missing file data (url, name, key) in request body");
  }

  const existing = await ProfileImage.findOne();

  if (existing?.fileKey) {
    try {
      await utapi.deleteFiles(existing.fileKey);
    } catch (err) {
      console.warn("Could not delete old uploadthing file:", err.message);
    }
  }

  let profileImage;

  if (existing) {
    existing.imageUrl = url;
    existing.imageName = name;
    existing.fileKey = key;
    await existing.save();
    profileImage = existing;
  } else {
    profileImage = await ProfileImage.create({
      imageUrl: url,
      imageName: name,
      fileKey: key,
    });
  }

  return res.status(200).json(
    new ApiResponse(200, {
      _id: profileImage._id,
      imageUrl: profileImage.imageUrl,
      imageName: profileImage.imageName,
      fileKey: profileImage.fileKey,
    }, "Profile image updated successfully"),
  );
});

export { getProfileImage, updateProfileImage };